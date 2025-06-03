#!/bin/bash

# Exit on error
set -e

echo "Starting build process for shadcn-table with Supabase integration..."

# Check if we have required environment variables or use defaults from vercel.json
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  echo "Using NEXT_PUBLIC_SUPABASE_URL from vercel.json"
  export NEXT_PUBLIC_SUPABASE_URL="https://wutrykwsqftiweqwhhtd.supabase.co"
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
  echo "Using NEXT_PUBLIC_SUPABASE_ANON_KEY from vercel.json"
  export NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1dHJ5a3dzcWZ0aXdlcXdoaHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NzE3NDYsImV4cCI6MjA2NDU0Nzc0Nn0.W_diRJq1ZRY1raysfEN1iephXKMSJsbu0SioYCsNnIY"
fi

# Always skip env validation during build
export SKIP_ENV_VALIDATION=1

# Make sure .env file exists (important for local development)
if [ ! -f .env ]; then
  echo "Creating .env file from .env.example.supabase"
  cp .env.example.supabase .env
fi

echo "Installing dependencies..."
npm install --legacy-peer-deps

echo "Building application..."
npm run build

echo "Build completed successfully!"
