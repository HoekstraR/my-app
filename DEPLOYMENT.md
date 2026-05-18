# Deployment Guide

This starter template is pre-configured for successful Vercel deployments.

## Before Every Deployment

**Always run this command before pushing to Git/Vercel:**

```bash
npm run pre-deploy
```

This ensures:
- ✅ Code quality (ESLint)
- ✅ Type safety (TypeScript with strict Vercel settings)
- ✅ Successful production build

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Before deploying
npm run pre-deploy

# If all checks pass, push to Git
git add .
git commit -m "Your message"
git push
```

## Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
npm run lint:full    # Run lint + type-check
npm run verify       # Run all checks + build
npm run pre-deploy   # Same as verify (recommended before deploy)
```

## TypeScript Configuration

This project uses **strict TypeScript settings** that match Vercel's build environment:

- ✅ Strict null checks
- ✅ No unused variables
- ✅ No implicit returns
- ✅ And more...

**Why?** These settings ensure your code will build successfully on Vercel without surprises.

## Common Issues

### Build passes locally but fails on Vercel?

1. Make sure you ran `npm run pre-deploy` before pushing
2. Check that all environment variables are set in Vercel dashboard
3. Verify package.json and package-lock.json are committed

### TypeScript errors?

Run `npm run type-check` to see all type errors with detailed messages.

### ESLint errors?

Run `npm run lint` to see all linting issues.

## Vercel Deployment

### Automatic (Recommended)

1. Push your code to GitHub
2. Import repository in Vercel
3. Vercel automatically deploys on every push to main

### Manual

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Best Practices

1. ✅ Always run `npm run pre-deploy` before pushing
2. ✅ Fix all errors before deploying
3. ✅ Test locally with `npm run build`
4. ✅ Use Vercel preview deployments for testing
5. ✅ Never commit `.env` files

---

**Remember:** If `npm run pre-deploy` passes, your Vercel deployment will succeed! 🚀
