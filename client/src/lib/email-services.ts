// Production-ready email services that don't require Gmail app passwords
// These are practical solutions for real applications

export interface EmailServiceConfig {
  type: 'sendgrid' | 'resend' | 'mailgun' | 'smtp'
  apiKey?: string
  from: string
  smtpConfig?: {
    host: string
    port: number
    user: string
    password: string
  }
}

// 1. SENDGRID (Recommended - Free tier: 100 emails/day)
export const sendGridConfig: EmailServiceConfig = {
  type: 'sendgrid',
  apiKey: process.env.SENDGRID_API_KEY,
  from: process.env.EMAIL_FROM || '"NexTo Support" <noreply@nexto.com>'
}

// 2. RESEND (Modern, developer-friendly - Free tier: 3000 emails/month)
export const resendConfig: EmailServiceConfig = {
  type: 'resend',
  apiKey: process.env.RESEND_API_KEY,
  from: process.env.EMAIL_FROM || '"NexTo Support" <noreply@nexto.com>'
}

// 3. MAILGUN (Popular choice - Free tier: 5000 emails/month)
export const mailgunConfig: EmailServiceConfig = {
  type: 'mailgun',
  apiKey: process.env.MAILGUN_API_KEY,
  from: process.env.EMAIL_FROM || '"NexTo Support" <noreply@nexto.com>'
}

// 4. SMTP (For custom email servers)
export const smtpConfig: EmailServiceConfig = {
  type: 'smtp',
  from: process.env.EMAIL_FROM || '"NexTo Support" <noreply@nexto.com>',
  smtpConfig: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || ''
  }
}

// Easy email sending with multiple service support
export async function sendEmailWithService(
  to: string,
  subject: string,
  htmlContent: string,
  textContent: string
): Promise<boolean> {
  const service = process.env.EMAIL_SERVICE || 'development'
  
  console.log(`📧 Sending email via ${service} service to: ${to}`)
  
  try {
    switch (service) {
      case 'sendgrid':
        return await sendWithSendGrid(to, subject, htmlContent, textContent)
      case 'resend':
        return await sendWithResend(to, subject, htmlContent, textContent)
      case 'mailgun':
        return await sendWithMailgun(to, subject, htmlContent, textContent)
      case 'smtp':
        return await sendWithSMTP(to, subject, htmlContent, textContent)
      default:
        // Development mode - just log
        console.log('🔐 PASSWORD RESET EMAIL (Development Mode)')
        console.log('To:', to)
        console.log('Subject:', subject)
        console.log('HTML Content Length:', htmlContent.length)
        return true
    }
  } catch (error) {
    console.error('❌ Email sending failed:', error)
    return false
  }
}

// SendGrid implementation
async function sendWithSendGrid(to: string, subject: string, html: string, text: string): Promise<boolean> {
  try {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    const msg = {
      to,
      from: sendGridConfig.from,
      subject,
      text,
      html,
    }
    
    await sgMail.send(msg)
    console.log('✅ Email sent via SendGrid successfully!')
    return true
  } catch (error) {
    console.error('❌ SendGrid error:', error)
    return false
  }
}

// Resend implementation
async function sendWithResend(to: string, subject: string, html: string, text: string): Promise<boolean> {
  try {
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    const { data, error } = await resend.emails.send({
      from: resendConfig.from,
      to,
      subject,
      text,
      html,
    })
    
    if (error) {
      throw error
    }
    
    console.log('✅ Email sent via Resend successfully!')
    return true
  } catch (error) {
    console.error('❌ Resend error:', error)
    return false
  }
}

// Mailgun implementation
async function sendWithMailgun(to: string, subject: string, html: string, text: string): Promise<boolean> {
  try {
    const formData = require('form-data')
    const Mailgun = require('mailgun.js')
    
    const mailgun = new Mailgun(formData)
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
    })
    
    const domain = process.env.MAILGUN_DOMAIN
    
    const data = {
      from: mailgunConfig.from,
      to,
      subject,
      text,
      html,
    }
    
    await mg.messages.create(domain, data)
    console.log('✅ Email sent via Mailgun successfully!')
    return true
  } catch (error) {
    console.error('❌ Mailgun error:', error)
    return false
  }
}

// SMTP implementation (for custom servers)
async function sendWithSMTP(to: string, subject: string, html: string, text: string): Promise<boolean> {
  try {
    const nodemailer = require('nodemailer')
    
    const transporter = nodemailer.createTransporter({
      host: smtpConfig.smtpConfig!.host,
      port: smtpConfig.smtpConfig!.port,
      secure: smtpConfig.smtpConfig!.port === 465,
      auth: {
        user: smtpConfig.smtpConfig!.user,
        pass: smtpConfig.smtpConfig!.password,
      },
    })
    
    const mailOptions = {
      from: smtpConfig.from,
      to,
      subject,
      text,
      html,
    }
    
    await transporter.sendMail(mailOptions)
    console.log('✅ Email sent via SMTP successfully!')
    return true
  } catch (error) {
    console.error('❌ SMTP error:', error)
    return false
  }
}