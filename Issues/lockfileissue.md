**Finalizing CI pipeline advice**

The question is about the CI pipeline with pnpm, and I think I can provide an accurate answer based on what I know, without browsing. The `pnpm` frozen-lockfile behavior is fairly standard. I can suggest using the `--no-frozen-lockfile` option to avoid issues, and advise Cline to always keep the lockfile updated. I think it's also wise to create a rule in the pipeline to ensure this issue doesn't happen again. I feel pretty confident about this approach!

**Providing solution steps for Cline CI issue**

The issue occurs when `pnpm install` fails due to an outdated lockfile (`frozen-lockfile` error). The solution is to either:

1. Keep the lockfile updated by running `pnpm install` (without the frozen flag) locally and committing the changes.
2. As a quick fix, use `--no-frozen-lockfile` in CI pipelines to bypass the mismatch.

To prevent this, Cline can create a rule in its configuration to auto-run `pnpm install` and commit updated lockfiles after changes to `package.json`. Adding this into pre-commit hooks can be helpful too.

Thought for 25 seconds

### What went wrong

| Step                         | Error                                               | Root cause                                                                                                                                                                                                                             |
| ---------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install` (all CI jobs) | **ERR\_PNPM\_OUTDATED\_LOCKFILE / frozen-lockfile** | In CI, pnpm defaults to `--frozen-lockfile`. Your `pnpm-lock.yaml` is no longer in sync with `package.json` (e.g. new/changed deps such as `@dnd-kit/core`, `@radix-ui/*`, etc.). When the hashes don’t match, the install is aborted. |

---

### Bullet-proof fix

1. **Regenerate & commit a fresh lockfile** (preferred)

   ```bash
   pnpm install          # updates pnpm-lock.yaml
   git add pnpm-lock.yaml
   git commit -m "chore: sync lockfile"
   ```

   CI will now pass with the default frozen mode.

2. **—or— Tell CI to ignore the frozen state** (quick, safe fallback)
   Add `--no-frozen-lockfile` to every install step:

   ```yaml
   - uses: pnpm/action-setup@v4
     with: { version: 10.9.0 }
   - name: Install deps
     run: pnpm install --no-frozen-lockfile
   ```

---

### Clean workflow example (all three jobs)

```yaml
jobs:
  common-env: &env
    NEXT_PUBLIC_SUPABASE_URL:  ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
    NEXT_PUBLIC_SUPABASE_ANON_KEY:  ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
    SUPABASE_SERVICE_ROLE_KEY:  ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}

  format:
    runs-on: ubuntu-latest
    env: *env
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 10.9.0 }
      - run: pnpm install --no-frozen-lockfile
      - run: pnpm lint:fix

  lint:
    runs-on: ubuntu-latest
    env: *env
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 10.9.0 }
      - run: pnpm install --no-frozen-lockfile
      - run: pnpm lint

  typecheck:
    runs-on: ubuntu-latest
    env: *env
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 10.9.0 }
      - run: pnpm install --no-frozen-lockfile
      - run: pnpm typecheck
```

---

### **Rule for CLINE (one-time setup)**

Add the following to your `cline.rules.yaml` (or equivalent) so every CI-orchestrated install is safe:

```yaml
rules:
  - name: enforce-pnpm-install
    when: ci        # any job executed inside CI
    run: |
      if grep -q "\"package.json\"" "$(git diff --name-only HEAD HEAD~1)"; then
        echo "package.json changed – syncing lockfile"
        pnpm install
        git add pnpm-lock.yaml
        git commit -m "chore(cline): auto-sync lockfile"
      fi
      pnpm install --no-frozen-lockfile
```

*Effect*:

* If a commit touches `package.json`, Cline regenerates & commits the lockfile automatically.
* Regardless, installs always include `--no-frozen-lockfile`, eliminating the error forever.

---

#### TL;DR

* **Root cause**: lockfile out of sync; CI uses frozen mode.
* **Reliable cure**: keep `pnpm-lock.yaml` updated **or** pass `--no-frozen-lockfile`.
* **Permanent safeguard**: Cline rule above auto-syncs and forces the flag.
