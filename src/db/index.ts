import { env } from "@/env.js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { supabase } from "@/lib/supabase";

import * as schema from "./schema";

// Supabase is our primary database provider
// We use Drizzle ORM with the Supabase PostgreSQL database for data operations
const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema });
