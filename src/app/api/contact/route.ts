import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.strato.de',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  })
}

export async function POST(request: NextRequest) {
  try {
    // Check env vars first
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Contact form error: SMTP_USER or SMTP_PASS not configured')
      return NextResponse.json(
        { success: false, message: 'Email service is not configured. Please contact us directly at info@megarobotics.de' },
        { status: 503 }
      )
    }

    const formData = await request.formData()

    const name = formData.get('name') as string | null
    const email = formData.get('email') as string | null
    const company = (formData.get('company') as string | null) || ''
    const phone = (formData.get('phone') as string | null) || ''
    const country = (formData.get('country') as string | null) || ''
    const industry = (formData.get('industry') as string | null) || ''
    const applicationArea = (formData.get('applicationArea') as string | null) || ''
    const projectStage = (formData.get('projectStage') as string | null) || ''
    const inquiryType = (formData.get('inquiryType') as string | null) || ''
    const productFamily = (formData.get('productFamily') as string | null) || ''
    const manufacturerOrProduct =
      (formData.get('manufacturerOrProduct') as string | null) || ''
    const subject = formData.get('subject') as string | null
    const message = formData.get('message') as string | null
    const consent = formData.get('consent') as string | null
    const file = formData.get('file') as File | null

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Require consent
    if (consent !== 'true') {
      return NextResponse.json(
        { success: false, message: 'Please confirm the privacy consent to send your inquiry.' },
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
      ? `Robotics Inquiry: ${subject.trim()}`
      : applicationArea.trim()
        ? `Robotics Inquiry — ${applicationArea.trim()}`
        : `Robotics Inquiry from ${name.trim()}`

    const transporter = createTransporter()

    const escape = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

    const meta: { label: string; value: string }[] = [
      { label: 'Name', value: name.trim() },
      { label: 'Email', value: email.trim() },
      { label: 'Company', value: company.trim() },
      { label: 'Phone', value: phone.trim() },
      { label: 'Country', value: country.trim() },
      { label: 'Industry', value: industry.trim() },
      { label: 'Inquiry type', value: inquiryType.trim() },
      { label: 'Product family', value: productFamily.trim() },
      { label: 'Manufacturer / product', value: manufacturerOrProduct.trim() },
      { label: 'Application area', value: applicationArea.trim() },
      { label: 'Project stage', value: projectStage.trim() },
      { label: 'Subject', value: subject?.trim() || '' },
    ].filter((row) => row.value)

    const textBody = [
      ...meta.map((row) => `${row.label}: ${row.value}`),
      '',
      'Message:',
      message.trim(),
    ].join('\n')

    const htmlMetaRows = meta
      .map(
        (row) => `
            <tr>
              <td style="padding: 6px 0; color: #6b7280; width: 130px; vertical-align: top;"><strong>${escape(row.label)}:</strong></td>
              <td style="padding: 6px 0; color: #111827;">${
                row.label === 'Email'
                  ? `<a href="mailto:${escape(row.value)}">${escape(row.value)}</a>`
                  : escape(row.value)
              }</td>
            </tr>`,
      )
      .join('')

    // Send email to admin
    await transporter.sendMail({
      from: `"MegaRobotics Contact" <${process.env.SMTP_FROM || 'info@megarobotics.de'}>`,
      to: process.env.SMTP_TO || 'info@megarobotics.de',
      replyTo: email.trim(),
      subject: emailSubject,
      text: textBody,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
          <h2 style="color: #111827;">New Robotics Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            ${htmlMetaRows}
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <div style="color: #374151; white-space: pre-wrap;">${escape(message.trim())}</div>
          ${attachments.length > 0 ? `<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" /><p style="color: #6b7280; font-size: 12px;">Attachment: ${escape(file!.name)} (${(file!.size / 1024).toFixed(1)} KB)</p>` : ''}
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">Sent via MegaRobotics contact form at ${new Date().toISOString()} — consent confirmed by sender.</p>
        </div>
      `,
      attachments,
    })

    // Send confirmation email to sender (non-blocking — don't fail if this fails)
    try {
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
    } catch (confirmError) {
      console.error('Failed to send confirmation email:', confirmError)
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
    })
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error))
    const errCode = (error as { code?: string })?.code
    console.error('Contact form error:', err.message, 'Code:', errCode)

    // Return specific message based on error type
    let userMessage = 'Something went wrong. Please try again.'
    if (errCode === 'ECONNREFUSED' || errCode === 'ECONNRESET' || errCode === 'ETIMEDOUT') {
      userMessage = 'Could not connect to email server. Please email us directly at info@megarobotics.de'
    } else if (errCode === 'EAUTH') {
      userMessage = 'Email authentication failed. Please email us directly at info@megarobotics.de'
    }

    return NextResponse.json(
      { success: false, message: userMessage },
      { status: 500 }
    )
  }
}
