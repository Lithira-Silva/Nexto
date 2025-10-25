# OAuth Setup Guide for NexTo

This guide will help you set up Google and Facebook OAuth authentication for your NexTo application.

## 🔧 Required Packages Installed

The following packages have been installed:
- `next-auth` - Authentication library for Next.js
- `@next-auth/firebase-adapter` - Firebase adapter for NextAuth
- `@google-cloud/firestore` - Google Cloud Firestore client
- `react-icons` - Popular icons including Google and Facebook icons

## 🚀 Setup Instructions

### 1. Google OAuth Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.developers.google.com/
   - Create a new project or select existing one

2. **Enable Google+ API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
   - Also enable "Google Identity" API

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Set Application type: "Web application"
   - Add Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)

4. **Copy Credentials**
   - Copy Client ID and Client Secret
   - Add them to your `.env.local` file:
   ```bash
   GOOGLE_CLIENT_ID=your-google-client-id-here
   GOOGLE_CLIENT_SECRET=your-google-client-secret-here
   ```

### 2. Facebook OAuth Setup

1. **Go to Facebook Developers**
   - Visit: https://developers.facebook.com/
   - Create a new app or use existing one

2. **Add Facebook Login Product**
   - In your app dashboard, click "Add Product"
   - Select "Facebook Login" and set it up

3. **Configure Facebook Login Settings**
   - Go to Facebook Login > Settings
   - Add Valid OAuth Redirect URIs:
     - `http://localhost:3000/api/auth/callback/facebook` (development)
     - `https://yourdomain.com/api/auth/callback/facebook` (production)

4. **Get App Credentials**
   - Go to Settings > Basic
   - Copy App ID and App Secret
   - Add them to your `.env.local` file:
   ```bash
   FACEBOOK_CLIENT_ID=your-facebook-app-id-here
   FACEBOOK_CLIENT_SECRET=your-facebook-app-secret-here
   ```

### 3. NextAuth Configuration

Update your `.env.local` file with the following:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key-here-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Facebook OAuth Configuration  
FACEBOOK_CLIENT_ID=your-facebook-app-id-here
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret-here
```

## 🔐 Security Notes

1. **NEXTAUTH_SECRET**: Generate a secure random string for production
   ```bash
   # Generate a secure secret
   openssl rand -base64 32
   ```

2. **Environment Variables**: Never commit your `.env.local` file to version control

3. **Domain Validation**: Make sure to update redirect URIs when deploying to production

## ✅ Features Added

1. **Google Sign-In Button** - Allows users to authenticate with Google
2. **Facebook Sign-In Button** - Allows users to authenticate with Facebook  
3. **Modern UI Design** - OAuth buttons match your purple theme
4. **Error Handling** - Proper error messages for failed authentication
5. **Session Management** - Automatic session handling with NextAuth
6. **Type Safety** - Full TypeScript support with custom type definitions

## 🎨 UI Features

- **Purple Theme Consistency** - OAuth buttons match your app's design
- **Smooth Animations** - Hover effects and transitions
- **Responsive Design** - Works on all device sizes
- **Accessibility** - Proper focus states and screen reader support
- **Professional Icons** - Google and Facebook brand icons

## 🧪 Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`

3. Test the OAuth buttons (will show errors until you configure the APIs)

4. Once configured, users can sign in with their Google or Facebook accounts

## 📝 Next Steps

1. Configure Google and Facebook OAuth as described above
2. Test the authentication flow
3. Customize the user experience after successful login
4. Set up production environment variables
5. Deploy with proper redirect URIs

## 🔄 Integration with Existing Auth

The OAuth authentication works alongside your existing email/password authentication. Users can choose their preferred sign-in method.

## 🎯 Production Deployment

Remember to:
1. Update `NEXTAUTH_URL` to your production domain
2. Add production redirect URIs to Google and Facebook
3. Use environment variables for all secrets
4. Test thoroughly in production environment