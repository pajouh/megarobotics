import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
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

    // Send notification email to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'info@megarobotics.de',
      to: process.env.SMTP_TO || 'info@megarobotics.de',
      subject: `New Newsletter Subscriber: ${email}`,
      text: `New newsletter subscription from: ${email}\n\nSubscribed at: ${new Date().toISOString()}`,
      html: `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subscribed at:</strong> ${new Date().toISOString()}</p>
      `,
    })

    // Send confirmation email to subscriber
    await transporter.sendMail({
      from: `"MegaRobotics" <${process.env.SMTP_FROM || 'info@megarobotics.de'}>`,
      to: email,
      subject: 'Welcome to MegaRobotics Newsletter!',
      text: 'Thank you for subscribing to the MegaRobotics newsletter! You will receive the latest robotics news, product reviews, and industry insights directly to your inbox.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111827;">Welcome to MegaRobotics!</h2>
          <p style="color: #4b5563;">Thank you for subscribing to our newsletter.</p>
          <p style="color: #4b5563;">You will receive the latest robotics news, product reviews, and industry insights directly to your inbox.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">MegaRobotics - megarobotics.de</p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Thanks for subscribing! Check your inbox to confirm.',
    })
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
