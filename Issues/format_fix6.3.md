Run pnpm lint:fix
  pnpm lint:fix
  if [ $? -ne 0 ]; then
    echo "Linting issues detected. Please fix them manually."
    exit 1
  fi
  shell: /usr/bin/bash -e {0}
  env:
    FORCE_COLOR: 3
    NEXT_PUBLIC_SUPABASE_URL: 
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 
    SUPABASE_SERVICE_ROLE_KEY: 
    PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin

> shadcn-table@0.1.0 lint:fix /home/runner/work/CENSUS/CENSUS
> biome check . --write

./src/app/_components/csv-preview-sheet.tsx:160:33 lint/nursery/useSortedClasses  FIXABLE  ━━━━━━━━━━

  ! These CSS classes should be sorted.
  
    158 │                   <FormLabel>CSV File</FormLabel>
    159 │                   <div
  > 160 │                     className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center transition-colors ${
        │                                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    161 │                       isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
    162 │                     }`}
  
  i Unsafe fix: Sort the classes.
  
    158 158 │                     <FormLabel>CSV File</FormLabel>
    159 159 │                     <div
    160     │ - ····················className={`border-2·border-dashed·rounded-md·p-6·flex·flex-col·items-center·justify-center·transition-colors·${
        160 │ + ····················className={`flex·flex-col·items-center·justify-center·rounded-md·border-2·border-dashed·p-6·transition-colors·${
    161 161 │                         isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
    162 162 │                       }`}
  

./src/app/_components/csv-preview-sheet.tsx:170:35 lint/nursery/useSortedClasses  FIXABLE  ━━━━━━━━━━

  ! These CSS classes should be sorted.
  
    168 │                       <svg
    169 │                         xmlns="http://www.w3.org/2000/svg"
  > 170 │                         className="h-10 w-10 text-muted-foreground mb-2"
        │                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    171 │                         fill="none"
    172 │                         viewBox="0 0 24 24"
  
  i Unsafe fix: Sort the classes.
  
    168 168 │                         <svg
    169 169 │                           xmlns="http://www.w3.org/2000/svg"
    170     │ - ························className="h-10·w-10·text-muted-foreground·mb-2"
        170 │ + ························className="mb-2·h-10·w-10·text-muted-foreground"
    171 171 │                           fill="none"
    172 172 │                           viewBox="0 0 24 24"
  

./src/app/_components/csv-preview-sheet.tsx:184:41 lint/nursery/useSortedClasses  FIXABLE  ━━━━━━━━━━

  ! These CSS classes should be sorted.
  
    182 │                       <p className="mb-1 font-medium">
    183 │                         Drag and drop your CSV file here, or{" "}
  > 184 │                         <span className="text-primary cursor-pointer">browse</span>
        │                                         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    185 │                       </p>
    186 │                       <p className="text-xs text-muted-foreground">
  
  i Unsafe fix: Sort the classes.
  
    182 182 │                         <p className="mb-1 font-medium">
    183 183 │                           Drag and drop your CSV file here, or{" "}
    184     │ - ························<span·className="text-primary·cursor-pointer">browse</span>
        184 │ + ························<span·className="cursor-pointer·text-primary">browse</span>
    185 185 │                         </p>
    186 186 │                         <p className="text-xs text-muted-foreground">
  

./src/app/_components/csv-preview-sheet.tsx:186:36 lint/nursery/useSortedClasses  FIXABLE  ━━━━━━━━━━

  ! These CSS classes should be sorted.
  
    184 │                         <span className="text-primary cursor-pointer">browse</span>
    185 │                       </p>
  > 186 │                       <p className="text-xs text-muted-foreground">
        │                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    187 │                         Supports CSV files up to 10MB
    188 │                       </p>
  
  i Unsafe fix: Sort the classes.
  
    184 184 │                           <span className="text-primary cursor-pointer">browse</span>
    185 185 │                         </p>
    186     │ - ······················<p·className="text-xs·text-muted-foreground">
        186 │ + ······················<p·className="text-muted-foreground·text-xs">
    187 187 │                           Supports CSV files up to 10MB
    188 188 │                         </p>
  

./src/app/_components/csv-upload-sheet.tsx:198:32 lint/nursery/useSortedClasses  FIXABLE  ━━━━━━━━━━

  ! These CSS classes should be sorted.
  
    197 │               {(uploadStatus === "uploading" || uploadStatus === "processing") && (
  > 198 │                 <div className="space-y-2 my-4">
        │                                ^^^^^^^^^^^^^^^^
    199 │                   <Progress value={uploadProgress} className="w-full" />
    200 │                   <p className="text-sm text-muted-foreground">
  
  i Unsafe fix: Sort the classes.
  
    196 196 │   
    197 197 │                 {(uploadStatus === "uploading" || uploadStatus === "processing") && (
    198     │ - ················<div·className="space-y-2·my-4">
        198 │ + ················<div·className="my-4·space-y-2">
    199 199 │                     <Progress value={uploadProgress} className="w-full" />
    200 200 │                     <p className="text-sm text-muted-foreground">
  

./src/app/_components/csv-upload-sheet.tsx:200:32 lint/nursery/useSortedClasses  FIXABLE  ━━━━━━━━━━

  ! These CSS classes should be sorted.
  
    198 │                 <div className="space-y-2 my-4">
    199 │                   <Progress value={uploadProgress} className="w-full" />
  > 200 │                   <p className="text-sm text-muted-foreground">
        │                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    201 │                     {uploadStatus === "uploading" ? "Uploading file..." : "Processing CSV data..."}
    202 │                     {uploadProgress > 0 && ` (${Math.round(uploadProgress)}%)`}
  
  i Unsafe fix: Sort the classes.
  
    198 198 │                   <div className="space-y-2 my-4">
    199 199 │                     <Progress value={uploadProgress} className="w-full" />
    200     │ - ··················<p·className="text-sm·text-muted-foreground">
        200 │ + ··················<p·className="text-muted-foreground·text-sm">
    201 201 │                       {uploadStatus === "uploading" ? "Uploading file..." : "Processing CSV data..."}
    202 202 │                       {uploadProgress > 0 && ` (${Math.round(uploadProgress)}%)`}
  

./src/app/_lib/validations.ts:78:7 lint/style/noUnusedTemplateLiteral  FIXABLE  ━━━━━━━━━━━━━━━━━━━━

  × Do not use template literals if interpolation and special-character handling are not needed.
  
    76 │     .refine(
    77 │       (file) => file.size <= MAX_FILE_SIZE,
  > 78 │       `File size must be less than 10MB`,
       │       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    79 │     ),
    80 │   title: z.string().min(1, "Title is required"),
  
  i Unsafe fix: Replace with string literal
  
     76  76 │       .refine(
     77  77 │         (file) => file.size <= MAX_FILE_SIZE,
     78     │ - ······`File·size·must·be·less·than·10MB`,
         78 │ + ······"File·size·must·be·less·than·10MB",
     79  79 │       ),
     80  80 │     title: z.string().min(1, "Title is required"),
  

./src/app/_lib/validations.ts:97:7 lint/style/noUnusedTemplateLiteral  FIXABLE  ━━━━━━━━━━━━━━━━━━━━

  × Do not use template literals if interpolation and special-character handling are not needed.
  
    95 │     .refine(
    96 │       (file) => file.size <= MAX_FILE_SIZE,
  > 97 │       `File size must be less than 10MB`,
       │       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    98 │     ),
    99 │ });
  
  i Unsafe fix: Replace with string literal
  
     95  95 │       .refine(
     96  96 │         (file) => file.size <= MAX_FILE_SIZE,
     97     │ - ······`File·size·must·be·less·than·10MB`,
         97 │ + ······"File·size·must·be·less·than·10MB",
     98  98 │       ),
     99  99 │   });
  

./src/components/ui/progress.tsx:20:7 lint/a11y/useFocusableInteractive ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × The HTML element with the interactive role "progressbar" is not focusable.
  
    18 │       {...props}
    19 │     >
  > 20 │       <div
       │       ^^^^
  > 21 │         className="h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out"
        ...
  > 26 │         role="progressbar"
  > 27 │       />
       │       ^^
    28 │     </div>
    29 │   )
  
  i A non-interactive HTML element that is not focusable may not be reachable for users that rely on keyboard navigation, even with an added role like "progressbar".
  
  i Add a tabIndex attribute to make this element focusable.
  

check ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some errors were emitted while applying fixes.
  

Skipped 8 suggested fixes.
If you wish to apply the suggested (unsafe) fixes, use the command biome check --fix --unsafe

Checked 120 files in 179ms. Fixed 7 files.
Found 3 errors.
Found 6 warnings.
 ELIFECYCLE  Command failed with exit code 1.
Error: Process completed with exit code 1.