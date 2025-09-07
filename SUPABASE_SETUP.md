# 🚀 Supabase Backend Setup for NexTo

## Quick Setup Guide

### 1. Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name:** `nexto-tasks`
   - **Database Password:** Choose a strong password
   - **Region:** Choose closest to your location
6. Click "Create new project" (takes ~2 minutes)

### 2. Get Your Credentials
1. Go to Project Settings → API
2. Copy these values:
   - **Project URL** (something like `https://abc123.supabase.co`)
   - **Project API Keys → anon public** (long string starting with `eyJ`)

### 3. Update Environment Variables
1. Open `.env.local` in your project root
2. Replace the placeholder values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

### 4. Create Database Schema
1. In Supabase Dashboard, go to "SQL Editor"
2. Copy the contents of `database/schema.sql`
3. Paste into SQL Editor
4. Click "Run" to create tables and setup

### 5. Test Connection
1. Restart your development server: `npm run dev`
2. Go to `http://localhost:3002`
3. Try creating a new task
4. Check Supabase Dashboard → Table Editor → tasks

## ✅ What You Get

- **Real-time Updates:** Tasks sync instantly across tabs/devices
- **Persistent Storage:** Data is saved permanently in PostgreSQL
- **Type Safety:** Full TypeScript support
- **Scalability:** Can handle thousands of users
- **Security:** Row Level Security enabled
- **Performance:** Optimized with indexes

## 🔐 Security Features

- **Row Level Security (RLS):** Users can only see their own tasks
- **Environment Variables:** API keys are secure
- **HTTPS:** All data encrypted in transit
- **PostgreSQL:** Enterprise-grade database

## 🚀 Next Steps (Optional)

### Add Authentication
```bash
npm install @supabase/auth-helpers-nextjs
```

### Add Real-time Subscriptions
```typescript
// Listen for task changes
supabase
  .channel('tasks')
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'tasks' 
  }, (payload) => {
    // Update UI automatically
  })
  .subscribe()
```

### Deploy to Production
- **Vercel:** Automatic deployment from GitHub
- **Environment Variables:** Add to Vercel dashboard
- **Custom Domain:** Connect your domain

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 🆘 Troubleshooting

### Common Issues:
1. **Environment variables not working:** Restart dev server after changing `.env.local`
2. **Connection errors:** Check your Supabase URL and API key
3. **RLS blocking requests:** Make sure user_id policies are correct
4. **Localhost not working:** Use 127.0.0.1 instead of localhost

Need help? Check the Supabase Discord or GitHub issues!
