# Raqm — mtalha.me

Personal portfolio with a self-built CMS admin panel.

## Stack
Next.js 14 (App Router) · TypeScript · Tailwind CSS v4 · PostgreSQL · Prisma · Server Actions · Vercel Blob

## Local setup

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL, SESSION_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD_HASH
node scripts/hash-password.js "yourpassword"   # generates ADMIN_PASSWORD_HASH
npx prisma db push
npx prisma db seed
npm run dev
```

Public site: http://localhost:3000  
Admin panel: http://localhost:3000/admin/login  

## Deployment
Deployed on Vercel. Requires:
- A Postgres connection string (Neon/Supabase/Vercel Postgres)
- Vercel Blob storage integration enabled for image uploads
- Environment variables set in the Vercel dashboard
