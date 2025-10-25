// RESEND Email Service - Modern Production-Ready Email with React Email Templates
// No Gmail app passwords needed! 🚀

import { Resend } from 'resend'
import { render } from '@react-email/components'
import PasswordResetEmailTemplate from '../components/emails/PasswordResetEmail'

// Initialize Resend client
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  
  if (!apiKey) {
    console.log('⚠️ RESEND_API_KEY not configured. Using development mode.')
    return null
  }
  
  return new Resend(apiKey)
}

// Beautiful HTML email template
function createPasswordResetEmailHTML(resetUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your NexTo Password</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f8f9fa;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #9333ea 0%, #7c3aed 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .content { 
            padding: 40px 30px; 
          }
          .button { 
            display: inline-block; 
            padding: 16px 32px; 
            background: linear-gradient(135deg, #9333ea 0%, #7c3aed 100%); 
            color: white; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: 600; 
            margin: 20px 0;
            transition: transform 0.2s;
          }
          .button:hover {
            transform: translateY(-1px);
          }
          .button-container {
            text-align: center;
            margin: 30px 0;
          }
          .url-box {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            padding: 15px;
            border-radius: 6px;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 14px;
            word-break: break-all;
            margin: 20px 0;
          }
          .warning { 
            background: #fff3cd; 
            border-left: 4px solid #ffc107; 
            padding: 15px; 
            margin: 25px 0; 
            border-radius: 4px;
          }
          .warning strong {
            color: #856404;
          }
          .footer { 
            text-align: center; 
            margin-top: 40px; 
            padding-top: 30px;
            border-top: 1px solid #e9ecef;
            color: #6c757d; 
            font-size: 14px; 
          }
          .logo {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🚀 NexTo</div>
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <p>Hello there! 👋</p>
            <p>We received a request to reset your password for your <strong>NexTo</strong> account.</p>
            <p>Click the button below to securely reset your password:</p>
            
            <div class="button-container">
              <a href="${resetUrl}" class="button">🔐 Reset My Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <div class="url-box">${resetUrl}</div>
            
            <div class="warning">
              <strong>⚠️ Important Security Information:</strong>
              <ul style="margin: 10px 0;">
                <li>This link will <strong>expire in 1 hour</strong> for your security</li>
                <li>If you didn't request this reset, you can safely ignore this email</li>
                <li>Never share this link with anyone</li>
                <li>We will never ask for your password via email</li>
              </ul>
            </div>
            
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
            
            <p>Stay productive! 💜<br>
            <strong>The NexTo Team</strong></p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} NexTo - Your Premium Task Management Solution</p>
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Plain text version for email clients that don't support HTML
function createPasswordResetEmailText(resetUrl: string): string {
  return `
🚀 NexTo - Password Reset Request

Hello!

We received a request to reset your password for your NexTo account.

Click the link below to reset your password:
${resetUrl}

⚠️ IMPORTANT SECURITY INFORMATION:
- This link will expire in 1 hour for your security
- If you didn't request this reset, you can safely ignore this email
- Never share this link with anyone
- We will never ask for your password via email

If you have any questions or need assistance, please contact our support team.

Stay productive!
The NexTo Team

© ${new Date().getFullYear()} NexTo - Your Premium Task Management Solution
This is an automated email. Please do not reply to this message.
  `
}

// Development mode fallback
function sendEmailInDevelopment(to: string, resetUrl: string): boolean {
  console.log('🔐 PASSWORD RESET EMAIL (Development Mode)')
  console.log('=========================================')
  console.log(`📧 To: ${to}`)
  console.log(`🔗 Reset URL: ${resetUrl}`)
  console.log('📱 Beautiful email would be sent via Resend')
  console.log('=========================================')
  console.log('')
  console.log('🚀 To enable real emails with Resend:')
  console.log('1. Get free API key: https://resend.com/')
  console.log('2. Add RESEND_API_KEY=re_your_key_here to .env.local')
  console.log('3. Set EMAIL_SERVICE=resend in .env.local')
  console.log('')
  return true
}

// Main email sending function
export async function sendPasswordResetEmailWithResend(
  email: string,
  resetUrl: string
): Promise<boolean> {
  const emailService = process.env.EMAIL_SERVICE || 'development'
  
  console.log(`📧 Sending password reset email via ${emailService}`)
  console.log(`📧 To: ${email}`)
  console.log(`🔗 Reset URL: ${resetUrl}`)
  
  // Development mode
  if (emailService === 'development') {
    return sendEmailInDevelopment(email, resetUrl)
  }
  
  // Production mode with Resend + React Email Template
  if (emailService === 'resend') {
    const resend = getResendClient()
    
    if (!resend) {
      console.log('⚠️ Resend not configured, falling back to development mode')
      return sendEmailInDevelopment(email, resetUrl)
    }
    
    try {
      console.log('📧 Sending email via Resend with React Email template...')
      
      // Render React Email template
      const emailHtml = await render(PasswordResetEmailTemplate({ 
        resetUrl, 
        userEmail: email 
      }))
      
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'NexTo Support <onboarding@resend.dev>',
        to: [email],
        subject: '🔐 Reset Your NexTo Password',
        html: emailHtml,
        // Also include a plain text version
        text: createPasswordResetEmailText(resetUrl),
      })
      
      if (error) {
        console.error('❌ Resend error:', error)
        console.log('📧 Falling back to development mode')
        return sendEmailInDevelopment(email, resetUrl)
      }
      
      console.log('✅ Password reset email sent successfully via Resend!')
      console.log('📧 Email ID:', data?.id)
      console.log('🎨 Used React Email template for professional design')
      return true
      
    } catch (error) {
      console.error('❌ Unexpected error sending email:', error)
      console.log('📧 Falling back to development mode')
      return sendEmailInDevelopment(email, resetUrl)
    }
  }
  
  // Fallback to development mode for unknown services
  console.log(`⚠️ Unknown email service: ${emailService}`)
  return sendEmailInDevelopment(email, resetUrl)
}

// Export for backward compatibility
export { sendPasswordResetEmailWithResend as sendPasswordResetEmail }