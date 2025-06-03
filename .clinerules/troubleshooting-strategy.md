## Brief overview
This set of guidelines outlines the approach for troubleshooting and deploying applications in this Next.js/Shadcn UI project, with specific focus on error handling and deployment strategies.

## Error handling strategy
- Use the sequential thinking MCP tool when encountering persistent errors that are difficult to solve
- Break down complex error scenarios into step-by-step analysis
- Revisit previous assumptions when errors persist despite attempted solutions

## Database configuration
- Prefer using local Docker database for development when possible
- Fall back to environment variable bypassing (SKIP_ENV_VALIDATION=1) when database connection issues occur
- Maintain separate database configuration strategies for development and production

## Deployment workflow
- Build the application with `next build` (using environment validation skipping if necessary)
- Verify the build locally before deployment using a non-default port (e.g., 4000)
- Use appropriate environment variables for different deployment targets

## Alternative solutions
- When primary approaches fail, always have fallback strategies prepared
- Consider serverless deployment options that don't require database setup for initial testing
- Use port specification (PORT=xxxx) when default ports are unavailable

## Port management
- Default development port is 3000
- Use alternative ports (4000, 5000, etc.) when defaults are already in use
- Check for port conflicts with `lsof -i :<port>` before starting services
