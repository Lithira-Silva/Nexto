# 📧 Email Setup Guide for NexTo Password Reset

## ✅ Current Status
- ✅ Nodemailer installed
- ✅ Email functions configured
- ✅ Environment variables added to .env.local
- ⚠️ **Action Required**: Configure your email credentials

## 🔧 Setup Instructions

### Step 1: Choose Your Email Provider

#### Option A: Gmail (Recommended for Development)

1. **Create a Gmail App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Sign in to your Google account
   - Click "Select app" → Choose "Mail"
   - Click "Select device" → Choose "Other" → Type "NexTo App"
   - Click "Generate"
   - **Copy the 16-character password** (like: `abcd efgh ijkl mnop`)

2. **Update your .env.local file:**
   ```bash
   EMAIL_ENABLED=true
   EMAIL_SERVER_USER=your-gmail@gmail.com
   EMAIL_SERVER_PASSWORD=abcd efgh ijkl mnop
   EMAIL_FROM="NexTo Support" <noreply@nexto.com>
   ```

#### Option B: Outlook/Hotmail

```bash
EMAIL_ENABLED=true
EMAIL_SERVER_USER=your-email@outlook.com
EMAIL_SERVER_PASSWORD=your-outlook-password
EMAIL_FROM="NexTo Support" <noreply@nexto.com>
```

Update the email.ts service line to:
```typescript
service: 'outlook'
```

#### Option C: Custom SMTP Server

```bash
EMAIL_ENABLED=true
EMAIL_SERVER_HOST=smtp.yourdomain.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@yourdomain.com
EMAIL_SERVER_PASSWORD=your-password
EMAIL_FROM="NexTo Support" <noreply@yourdomain.com>
```

### Step 2: Test the Email Setup

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test forgot password:**
   - Go to: http://localhost:3000/forgot-password
   - Enter your email address
   - Click "Reset Password"

3. **Check the console output:**
   - Look for: `📧 Sending password reset email to: your-email@...`
   - If successful: `✅ Password reset email sent successfully!`
   - If failed: `❌ Error sending email:` (will fall back to development mode)

4. **Check your email inbox:**
   - Look for an email from "NexTo Support"
   - Check spam/junk folder if not in inbox
   - Click the reset link to test the full flow

### Step 3: Troubleshooting

#### Common Issues:

**"Invalid login" error with Gmail:**
- ✅ Make sure you're using an App Password, not your regular password
- ✅ Enable 2-factor authentication on your Google account first
- ✅ Use the 16-character app password exactly as generated

**Email not received:**
- ✅ Check spam/junk folder
- ✅ Verify the EMAIL_FROM address is valid
- ✅ Try a different email provider
- ✅ Check console for error messages

**"Authentication failed" error:**
- ✅ Double-check your username and password
- ✅ Make sure EMAIL_ENABLED=true
- ✅ Restart your dev server after changing .env.local

### Step 4: Production Deployment

For production, consider using:
- **SendGrid** (100 free emails/day): https://sendgrid.com
- **Mailgun** (100 free emails/day): https://mailgun.com
- **AWS SES** (Pay per use): https://aws.amazon.com/ses/

## 🧪 Quick Test Commands

```bash
# Check if environment variables are loaded
echo $EMAIL_ENABLED

# Test email sending (you can add this to a test file)
console.log('Email enabled:', process.env.EMAIL_ENABLED)
console.log('Email user:', process.env.EMAIL_SERVER_USER)
```

## 🔒 Security Best Practices

1. **Never commit .env.local to git**
2. **Use app passwords, not regular passwords**
3. **Rotate passwords regularly**
4. **Use environment-specific credentials**
5. **Monitor email sending quotas**

## 📊 Email Templates

The system includes beautiful HTML email templates with:
- ✅ Responsive design
- ✅ NexTo branding
- ✅ Security warnings
- ✅ Professional formatting
- ✅ Plain text fallbacks

## 🎯 Next Steps

1. Configure your email credentials in .env.local
2. Set EMAIL_ENABLED=true
3. Test the forgot password feature
4. Verify emails are being sent and received
5. Style the email templates to match your brand (optional)

## 📞 Need Help?

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify your email provider settings
3. Test with a simple email service like Gmail first
4. Make sure your firewall isn't blocking SMTP connections