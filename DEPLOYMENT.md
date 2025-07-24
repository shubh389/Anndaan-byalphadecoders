# Deploying to Vercel

This app is configured for deployment on Vercel with both frontend and backend functionality.

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/yourrepo)

## Manual Deployment Steps

1. **Install Vercel CLI** (if not already installed):

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy from project root**:

   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? `Y`
   - Which scope? (choose your account/team)
   - Link to existing project? `N` (for first deployment)
   - What's your project's name? (enter your preferred name)
   - In which directory is your code located? `./`

## What happens during deployment:

- **Frontend**: React SPA is built and served statically
- **Backend**: Express API routes are deployed as Vercel serverless functions
- **Routing**: SPA routing is handled with fallback to `index.html`
- **API**: All `/api/*` routes are handled by the serverless function

## Project Structure for Vercel:

```
├── api/
│   └── index.ts          # Vercel serverless function
├── dist/spa/             # Built React app (auto-generated)
├── client/               # React frontend source
├── server/               # Express backend source
└── vercel.json           # Vercel configuration
```

## Environment Variables

If your app uses environment variables, add them in the Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables (e.g., `DATABASE_URL`, `API_KEY`, etc.)

## Custom Domain

To use a custom domain:

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

- **API not working**: Check the Vercel function logs in the dashboard
- **Routing issues**: Ensure `vercel.json` rewrites are correct
- **Build failures**: Check build logs and ensure all dependencies are listed in `package.json`
