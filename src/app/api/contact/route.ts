import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.strato.de',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get('name') as string | null
    const email = formData.get('email') as string | null
    const subject = formData.get('subject') as string | null
    const message = formData.get('message') as string | null
    const file = formData.get('file') as File | null

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file && file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: 'File is too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    // Prepare attachment
    const attachments: { filename: string; content: Buffer }[] = []
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      attachments.push({
        filename: file.name,
        content: buffer,
      })
    }

    const emailSubject = subject?.trim()
      ? `Contact Form: ${subject.trim()}`
      : `Contact Form Message from ${name.trim()}`

    // Send email to admin
    await transporter.sendMail({
      from: `"MegaRobotics Contact" <${process.env.SMTP_FROM || 'info@megarobotics.de'}>`,
      to: process.env.SMTP_TO || 'info@megarobotics.de',
      replyTo: email.trim(),
      subject: emailSubject,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nSubject: ${subject?.trim() || '(none)'}\n\nMessage:\n${message.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111827;">New Contact Form Message</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; width: 100px;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; color: #111827;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #111827;"><a href="mailto:${email.trim()}">${email.trim()}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Subject:</strong></td>
              <td style="padding: 8px 0; color: #111827;">${subject?.trim() || '(none)'}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <div style="color: #374151; white-space: pre-wrap;">${message.trim()}</div>
          ${attachments.length > 0 ? `<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" /><p style="color: #6b7280; font-size: 12px;">📎 Attachment: ${file!.name} (${(file!.size / 1024).toFixed(1)} KB)</p>` : ''}
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">Sent via MegaRobotics contact form at ${new Date().toISOString()}</p>
        </div>
      `,
      attachments,
    })

    // Send confirmation email to sender
    await transporter.sendMail({
      from: `"MegaRobotics" <${process.env.SMTP_FROM || 'info@megarobotics.de'}>`,
      to: email.trim(),
      subject: 'We received your message - MegaRobotics',
      text: `Hi ${name.trim()},\n\nThank you for contacting MegaRobotics. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nMegaRobotics Team\nmegarobotics.de`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111827;">Thank you for your message!</h2>
          <p style="color: #4b5563;">Hi ${name.trim()},</p>
          <p style="color: #4b5563;">We have received your message and will get back to you as soon as possible.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">MegaRobotics - megarobotics.de</p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
