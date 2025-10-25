import { NextRequest, NextResponse } from 'next/server'
import { sendPasswordResetEmail } from '../../../../lib/email-resend'

// In a real application, you would:
// 1. Verify the email exists in your database
// 2. Generate a secure reset token (use crypto.randomBytes)
// 3. Store the token with expiration in your database
// 4. Send an email with the reset link using Resend email service

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Simulate checking if email exists in database
    // In production, query your actual database
    const emailExists = true // Replace with actual database check

    if (!emailExists) {
      // For security, don't reveal if email exists or not
      // Return success even if email doesn't exist
      return NextResponse.json(
        { 
          message: 'If an account exists with this email, you will receive password reset instructions.',
          success: true 
        },
        { status: 200 }
      )
    }

    // Generate reset token (in production, use crypto.randomBytes)
    const resetToken = generateResetToken()
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // In production, save token to database:
    // await db.users.update({
    //   where: { email },
    //   data: {
    //     resetToken: await hashToken(resetToken),
    //     resetTokenExpiry
    //   }
    // })

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`

    // Send password reset email using Resend
    try {
      await sendPasswordResetEmail(email, resetUrl)
      console.log('✅ Password reset email sent successfully to:', email)
    } catch (emailError) {
      console.error('❌ Failed to send email:', emailError)
      // Continue anyway - don't fail the request if email fails
    }

    // Also log for development
    console.log('🔐 Password Reset Details:')
    console.log('- Email:', email)
    console.log('- Reset URL:', resetUrl)
    console.log('- Token:', resetToken)

    return NextResponse.json(
      { 
        message: 'Password reset instructions have been sent to your email.',
        success: true,
        // Remove these in production:
        dev: {
          resetUrl,
          token: resetToken
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again.' },
      { status: 500 }
    )
  }
}

// Helper function to generate reset token
function generateResetToken(): string {
  // In production, use: crypto.randomBytes(32).toString('hex')
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Helper function to hash token (implement in production)
// async function hashToken(token: string): Promise<string> {
//   const crypto = require('crypto')
//   return crypto.createHash('sha256').update(token).digest('hex')
// }

// Helper function to send email (implement in production)
// async function sendPasswordResetEmail(params: {
//   to: string
//   resetUrl: string
//   expiryTime: string
// }) {
//   // Use SendGrid, Mailgun, or similar service
//   // Example with SendGrid:
//   // await sgMail.send({
//   //   to: params.to,
//   //   from: 'noreply@nexto.com',
//   //   subject: 'Password Reset Request',
//   //   html: `
//   //     <h1>Password Reset Request</h1>
//   //     <p>Click the link below to reset your password:</p>
//   //     <a href="${params.resetUrl}">Reset Password</a>
//   //     <p>This link will expire in ${params.expiryTime}.</p>
//   //   `
//   // })
// }
