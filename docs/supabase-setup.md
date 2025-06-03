# Supabase Setup Guide for CENSUS Application

This guide explains how to set up your Supabase project - our primary database provider - and configure the necessary environment variables for deploying the shadcn-table (CENSUS) application on Vercel.

## 1. Supabase Project Details

The project is already set up with the following details:

- **Project ID**: `wutrykwsqftiweqwhhtd`
- **Project Name**: shadcn-table
- **Project URL**: `https://wutrykwsqftiweqwhhtd.supabase.co`

## 2. Supabase Credentials

The necessary credentials for environment variables are:

### Database URL

Use the following format, replacing `[YOUR-PASSWORD]` with your database password:
```
postgres://postgres:[YOUR-PASSWORD]@db.wutrykwsqftiweqwhhtd.supabase.co:5432/postgres
```

### Supabase URL and Keys

- **Supabase URL**: `https://wutrykwsqftiweqwhhtd.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1dHJ5a3dzcWZ0aXdlcXdoaHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NzE3NDYsImV4cCI6MjA2NDU0Nzc0Nn0.W_diRJq1ZRY1raysfEN1iephXKMSJsbu0SioYCsNnIY`
- **Service Role Key** (for admin operations): `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1dHJ5a3dzcWZ0aXdlcXdoaHRkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODk3MTc0NiwiZXhwIjoyMDY0NTQ3NzQ2fQ.016gNuCDqNrJAprbvSMtji_w2mF9eY51Q9bnVFEkXY4`

## 3. Set Up Environment Variables in Vercel

When deploying to Vercel, you need to add these environment variables:

1. Go to your project in the Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `DATABASE_URL`: Your Supabase PostgreSQL connection string
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

Example:
```
DATABASE_URL=postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Save your changes
5. Redeploy your application

## 4. Initialize Your Database Schema

After connecting your application to Supabase, you need to initialize your database schema:

1. Run the database migrations locally using:
   ```
   pnpm run db:push
   ```
   This will apply the Drizzle schema to your Supabase database

2. Seed the database with initial data:
   ```
   pnpm run db:seed
   ```

## 5. Verify the Connection

After deploying with the correct environment variables:

1. Visit your deployed application
2. Verify that you can interact with the data table
3. Try the authentication features if implemented

## Troubleshooting

If you encounter issues:

1. **Database Connection Errors**: Verify your `DATABASE_URL` is correct and includes the proper password
2. **Authentication Errors**: Check that your Supabase URL and anon key are correctly set
3. **CORS Issues**: Make sure your site's domain is added to the allowed origins in Supabase

For local development, continue to use the Docker setup as specified in the README, but update your `.env` file with your Supabase credentials for testing authentication and other Supabase-specific features.
