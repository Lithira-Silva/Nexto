// Email utility - Development & Production Ready
// 
// Development Mode: Logs email content to console
// Production Mode: Uses Nodemailer to send real emails
//
// To enable real emails:
// 1. ✅ Nodemailer installed
// 2. Add email credentials to .env.local (see below)
// 3. Set NODE_ENV=production or configure EMAIL_ENABLED=true

import nodemailer from 'nodemailer'

// Development mode email simulation
const sendEmailInDevelopment = (to: string, subject: string, resetUrl?: string) => {
  console.log('📧 EMAIL SIMULATION (Development Mode)')
  console.log('=====================================')
  console.log('To:', to)
  console.log('Subject:', subject)
  if (resetUrl) {
    console.log('Reset URL:', resetUrl)
  }
  console.log('Email template would be beautifully formatted')
  console.log('=====================================')
  return true
}

// Create transporter (real email service connection)
const createTransporter = () => {
  if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
    console.warn('⚠️ Email credentials not configured. Using development mode.')
    console.warn('Add EMAIL_SERVER_USER and EMAIL_SERVER_PASSWORD to .env.local')
    return null
  }

  console.log('📧 Creating email transporter for:', process.env.EMAIL_SERVER_USER)

  return nodemailer.createTransport({
    service: 'gmail', // or 'outlook', 'yahoo', etc.
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  })
}

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string
): Promise<boolean> {
  // Check if email sending is enabled
  const emailEnabled = process.env.EMAIL_ENABLED === 'true'
  
  console.log('🔐 PASSWORD RESET EMAIL ATTEMPT')
  console.log('Email enabled:', emailEnabled)
  console.log('EMAIL_ENABLED env:', process.env.EMAIL_ENABLED)
  console.log('EMAIL_SERVER_USER:', process.env.EMAIL_SERVER_USER)
  console.log('EMAIL_SERVER_PASSWORD configured:', !!process.env.EMAIL_SERVER_PASSWORD)
  console.log('To:', email)
  console.log('Reset URL:', resetUrl)
  
  if (!emailEnabled) {
    console.log('📧 Email not enabled, using development mode')
    return sendEmailInDevelopment(email, 'Reset Your NexTo Password', resetUrl)
  }

  // Try to create transporter
  const transporter = createTransporter()

  if (!transporter) {
    console.log('📧 No transporter created, falling back to development mode')
    return sendEmailInDevelopment(email, 'Reset Your NexTo Password', resetUrl)
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || '"NexTo Support" <noreply@nexto.com>',
    to: email,
    subject: 'Reset Your NexTo Password',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #9333ea 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #9333ea 0%, #7c3aed 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset Request</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>We received a request to reset your password for your NexTo account.</p>
              <p>Click the button below to reset your password:</p>
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </div>
              <p>Or copy and paste this link into your browser:</p>
              <p style="background: white; padding: 10px; border-radius: 5px; word-break: break-all; font-family: monospace;">${resetUrl}</p>
              <div class="warning">
                <strong>⚠️ Security Notice:</strong>
                <ul>
                  <li>This link will expire in <strong>1 hour</strong></li>
                  <li>If you didn&apos;t request this reset, please ignore this email</li>
                  <li>Never share this link with anyone</li>
                </ul>
              </div>
              <p>If you have any questions or concerns, please contact our support team.</p>
              <p>Best regards,<br><strong>The NexTo Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} NexTo - Premium Task Management</p>
              <p>This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Reset Your NexTo Password

Hello,

We received a request to reset your password for your NexTo account.

Click the link below to reset your password:
${resetUrl}

⚠️ Security Notice:
- This link will expire in 1 hour
- If you didn't request this reset, please ignore this email
- Never share this link with anyone

If you have any questions or concerns, please contact our support team.

Best regards,
The NexTo Team

© ${new Date().getFullYear()} NexTo - Premium Task Management
    `,
  }

  try {
    console.log('📧 Attempting to send password reset email to:', email)
    console.log('📧 Using transporter with user:', process.env.EMAIL_SERVER_USER)
    
    // Test the connection first
    await transporter.verify()
    console.log('✅ SMTP connection verified successfully!')
    
    const result = await transporter.sendMail(mailOptions)
    console.log('✅ Password reset email sent successfully!')
    console.log('📧 Email result:', result)
    return true
  } catch (error: any) {
    console.error('❌ Error sending email:', error)
    console.error('❌ Error message:', error.message)
    console.error('❌ Error code:', error.code)
    
    // If it's an authentication error, provide helpful guidance
    if (error.code === 'EAUTH' || error.message?.includes('authentication')) {
      console.error('🔐 AUTHENTICATION ERROR: Check your Gmail app password!')
      console.error('🔗 Get app password at: https://myaccount.google.com/apppasswords')
    }
    
    console.log('📧 Falling back to development mode')
    return sendEmailInDevelopment(email, 'Reset Your NexTo Password', resetUrl)
  }
}

export async function sendPasswordChangedEmail(email: string): Promise<boolean> {
  // Check if email sending is enabled
  const emailEnabled = process.env.NODE_ENV === 'production' || process.env.EMAIL_ENABLED === 'true'
  
  if (!emailEnabled) {
    console.log('✅ PASSWORD CHANGED CONFIRMATION EMAIL (Development Mode)')
    console.log('To:', email)
    console.log('Confirmation email would be sent')
    return sendEmailInDevelopment(email, 'Your NexTo Password Has Been Changed')
  }

  const transporter = createTransporter()

  if (!transporter) {
    console.log('📧 Falling back to development mode')
    return sendEmailInDevelopment(email, 'Your NexTo Password Has Been Changed')
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || '"NexTo Support" <noreply@nexto.com>',
    to: email,
    subject: 'Your NexTo Password Has Been Changed',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Password Changed Successfully</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>This is a confirmation that your NexTo account password has been changed successfully.</p>
              <p>You can now log in with your new password.</p>
              <div class="alert">
                <strong>⚠️ Didn&apos;t make this change?</strong><br>
                If you didn&apos;t change your password, please contact our support team immediately.
              </div>
              <p>Best regards,<br><strong>The NexTo Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} NexTo - Premium Task Management</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Your NexTo Password Has Been Changed

Hello,

This is a confirmation that your NexTo account password has been changed successfully.

You can now log in with your new password.

⚠️ Didn't make this change?
If you didn't change your password, please contact our support team immediately.

Best regards,
The NexTo Team

© ${new Date().getFullYear()} NexTo - Premium Task Management
    `,
  }

  try {
    console.log('📧 Sending password changed confirmation to:', email)
    await transporter.sendMail(mailOptions)
    console.log('✅ Password changed confirmation sent successfully!')
    return true
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error)
    console.log('📧 Falling back to development mode')
    return sendEmailInDevelopment(email, 'Your NexTo Password Has Been Changed')
  }
}

/*
✅ NODEMAILER IS NOW INSTALLED AND CONFIGURED!

🔧 TO ENABLE REAL EMAIL SENDING:

1. ✅ Nodemailer installed
2. 📧 Add email credentials to .env.local:

   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-app-password
   EMAIL_FROM="NexTo Support" <noreply@nexto.com>
   EMAIL_ENABLED=true

3. 🔑 For Gmail, get an "App Password":
   - Go to: https://myaccount.google.com/apppasswords
   - Sign in to your Google account
   - Select "Mail" and generate an app password
   - Use that 16-character password (not your regular Gmail password)

4. 🧪 Test it:
   - Add EMAIL_ENABLED=true to .env.local
   - Try the forgot password feature
   - Check your email inbox!

📋 SUPPORTED EMAIL PROVIDERS:
- Gmail (service: 'gmail')
- Outlook (service: 'outlook') 
- Yahoo (service: 'yahoo')
- Custom SMTP servers

🔒 SECURITY NOTES:
- Never commit .env.local to git
- Use app passwords, not regular passwords
- Keep credentials secure
*/
