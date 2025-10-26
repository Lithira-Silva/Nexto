// FAST Email Service - Optimized for Speed
// Uses Resend with lightweight HTML templates (no React Email compilation)

import { Resend } from 'resend'

// Initialize Resend client
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  
  if (!apiKey) {
    console.log('⚠️ RESEND_API_KEY not configured. Using development mode.')
    return null
  }
  
  return new Resend(apiKey)
}

// Lightweight HTML template (no React compilation needed)
function createFastPasswordResetHTML(resetUrl: string, userEmail: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your NexTo Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
  <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #9333ea 0%, #7c3aed 100%); color: white; padding: 40px 30px; text-align: center;">
      <div style="font-size: 24px; font-weight: 700; margin-bottom: 10px;">🚀 NexTo</div>
      <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Password Reset Request</h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 30px;">
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">Hello! 👋</p>
      
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
        We received a request to reset your password for your <strong>NexTo</strong> account (${userEmail}).
      </p>
      
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
        Click the button below to securely reset your password:
      </p>
      
      <!-- Reset Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #9333ea 0%, #7c3aed 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
          🔐 Reset My Password
        </a>
      </div>
      
      <p style="color: #374151; font-size: 14px; line-height: 1.5; margin-bottom: 16px;">
        Or copy and paste this link into your browser:
      </p>
      
      <div style="background: #f8f9fa; border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px; margin: 20px 0;">
        <a href="${resetUrl}" style="color: #9333ea; font-size: 14px; word-break: break-all; font-family: monospace;">${resetUrl}</a>
      </div>
      
      <!-- Security Warning -->
      <div style="background: #fefce8; border-left: 4px solid #eab308; padding: 15px; margin: 25px 0; border-radius: 4px;">
        <p style="color: #92400e; font-weight: 600; font-size: 14px; margin: 0 0 8px 0;">⚠️ Important Security Information:</p>
        <p style="color: #a16207; font-size: 14px; margin: 0; line-height: 1.5;">
          • This link will <strong>expire in 1 hour</strong> for your security<br/>
          • If you didn&apos;t request this reset, you can safely ignore this email<br/>
          • Never share this link with anyone<br/>
          • We will never ask for your password via email
        </p>
      </div>
      
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
        If you have any questions or need assistance, please don&apos;t hesitate to contact our support team.
      </p>
      
      <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 8px;">
        Stay productive! 💜
      </p>
      <p style="color: #111827; font-weight: 600; font-size: 16px; margin: 0;">
        The NexTo Team
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background: #f3f4f6; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">
        © ${new Date().getFullYear()} NexTo - Your Premium Task Management Solution
      </p>
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        This is an automated email. Please do not reply to this message.
      </p>
    </div>
    
  </div>
</body>
</html>
  `
}

// Plain text version
function createFastPasswordResetText(resetUrl: string): string {
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

Stay productive!
The NexTo Team

© ${new Date().getFullYear()} NexTo - Your Premium Task Management Solution
  `
}

// Development mode fallback
function sendEmailInDevelopment(to: string, resetUrl: string): boolean {
  console.log('🔐 PASSWORD RESET EMAIL (Development Mode)')
  console.log('=========================================')
  console.log(`📧 To: ${to}`)
  console.log(`🔗 Reset URL: ${resetUrl}`)
  console.log('📱 Fast email template ready')
  console.log('=========================================')
  return true
}

// FAST email sending function (no React compilation)
export async function sendPasswordResetEmailFast(
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
  
  // Production mode with Resend (FAST - no React compilation)
  if (emailService === 'resend') {
    const resend = getResendClient()
    
    if (!resend) {
      console.log('⚠️ Resend not configured, falling back to development mode')
      return sendEmailInDevelopment(email, resetUrl)
    }
    
    try {
      console.log('⚡ Sending email via Resend (Fast Mode)...')
      
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'NexTo Support <onboarding@resend.dev>',
        to: [email],
        subject: '🔐 Reset Your NexTo Password',
        html: createFastPasswordResetHTML(resetUrl, email),
        text: createFastPasswordResetText(resetUrl),
      })
      
      if (error) {
        console.error('❌ Resend error:', error)
        console.log('📧 Falling back to development mode')
        return sendEmailInDevelopment(email, resetUrl)
      }
      
      console.log('✅ Password reset email sent successfully via Resend!')
      console.log('📧 Email ID:', data?.id)
      console.log('⚡ Fast mode - no React compilation needed')
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
export { sendPasswordResetEmailFast as sendPasswordResetEmail }