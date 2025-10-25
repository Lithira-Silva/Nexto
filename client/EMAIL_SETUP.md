# Email Configuration Guide

## Overview
This guide explains how to enable real email sending for password reset functionality.

## Current Status
- ✅ API endpoints working
- ✅ Token generation working
- ✅ Development mode: URLs logged to console
- ⚠️ Production mode: Needs email service integration

## Quick Start for Development
When you use the forgot password feature:
1. Check the **terminal/console** where `npm run dev` is running
2. Look for: `Password Reset URL: http://localhost:3000/reset-password?token=...`
3. Copy and paste that URL in your browser
4. Reset your password

## Setting Up Real Email Sending

### Option 1: Nodemailer with Gmail (Easiest for Development)

1. Install nodemailer:
```bash
npm install nodemailer
```

2. Add to your `.env.local`:
```env
EMAIL_SERVER_USER=your-gmail@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@nexto.com
```

**Important:** For Gmail, you need an "App Password":
- Go to: https://myaccount.google.com/apppasswords
- Create a new app password
- Use that password (not your regular Gmail password)

### Option 2: SendGrid (Recommended for Production)

1. Sign up at: https://sendgrid.com (Free tier: 100 emails/day)

2. Install SendGrid:
```bash
npm install @sendgrid/mail
```

3. Add to `.env.local`:
```env
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=noreply@nexto.com
```

### Option 3: Resend (Modern Alternative)

1. Sign up at: https://resend.com (Free tier: 100 emails/day)

2. Install Resend:
```bash
npm install resend
```

3. Add to `.env.local`:
```env
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@nexto.com
```

## Implementation Examples

See the example implementations in:
- `/docs/email-examples/nodemailer-example.ts`
- `/docs/email-examples/sendgrid-example.ts`
- `/docs/email-examples/resend-example.ts`

## Email Template

The password reset email should include:
- Clear subject line: "Reset Your NexTo Password"
- Greeting with user's name (if available)
- Reset link with token (expires in 1 hour)
- Security notice
- Support contact information
- Company branding

## Testing

### Development Testing:
- Use the console logs to get reset URLs
- Or set up a test email service like Mailtrap.io

### Production Testing:
- Test with real email addresses
- Verify emails don't go to spam
- Test token expiration
- Test invalid token handling

## Security Checklist

✅ Tokens expire after 1 hour
✅ Tokens are single-use
✅ Reset URLs use HTTPS in production
✅ Emails don't reveal if account exists
✅ Rate limiting on reset requests
✅ Passwords are hashed before storage

## Support

For issues:
- Check spam/junk folder
- Verify email service credentials
- Check API logs for errors
- Test with different email providers
