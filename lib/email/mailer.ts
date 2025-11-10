// lib/email/mailer.ts - Email notification service

import nodemailer from 'nodemailer';
import { Message, RecruiterInfo } from '@/types';

if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
  console.warn('⚠️ Email credentials not configured. Email notifications will not work.');
}

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

/**
 * Format timestamp to readable string
 */
function formatTimestamp(date: Date): string {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Send email notification when a recruiter submits their information
 */
export async function sendRecruiterNotification(
  recruiterInfo: RecruiterInfo,
  chatTranscript: Message[]
): Promise<boolean> {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.warn('⚠️ Email not sent: credentials not configured');
      return false;
    }

    // Create chat transcript HTML
    const transcriptHTML = chatTranscript
      .map(msg => {
        const role = msg.role === 'user' ? '👤 Recruiter' : '🤖 AI Assistant';
        const className = msg.role === 'user' ? 'recruiter-message' : 'assistant-message';
        return `
          <div class="message ${className}">
            <div class="timestamp">
              <strong>${role}</strong> • ${formatTimestamp(msg.timestamp)}
            </div>
            <div class="content">${msg.content}</div>
          </div>
        `;
      })
      .join('');

    // Create email HTML
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `🎯 New Recruiter: ${recruiterInfo.name} from ${recruiterInfo.company}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              line-height: 1.6;
              color: #1a202c;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background: #f7fafc;
            }
            .container {
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0 0 10px 0;
              font-size: 24px;
            }
            .header p {
              margin: 0;
              opacity: 0.9;
            }
            .content {
              padding: 30px 20px;
            }
            .info-section {
              background: #f7fafc;
              border-left: 4px solid #667eea;
              padding: 20px;
              margin-bottom: 25px;
              border-radius: 4px;
            }
            .info-section h2 {
              margin: 0 0 15px 0;
              color: #667eea;
              font-size: 18px;
            }
            .info-row {
              margin: 12px 0;
              font-size: 15px;
            }
            .label {
              font-weight: 600;
              color: #4a5568;
              display: inline-block;
              min-width: 100px;
            }
            .value {
              color: #1a202c;
            }
            .message {
              padding: 15px;
              margin: 12px 0;
              border-radius: 6px;
              font-size: 14px;
            }
            .recruiter-message {
              background: #ebf8ff;
              border-left: 3px solid #4299e1;
            }
            .assistant-message {
              background: #f0fff4;
              border-left: 3px solid #48bb78;
            }
            .timestamp {
              font-size: 12px;
              color: #718096;
              margin-bottom: 8px;
            }
            .content {
              color: #2d3748;
              line-height: 1.5;
            }
            .cta-section {
              text-align: center;
              padding: 25px 20px;
              background: #f7fafc;
            }
            .cta-button {
              display: inline-block;
              background: #667eea;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              transition: background 0.3s;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #718096;
              font-size: 13px;
              border-top: 1px solid #e2e8f0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 New Recruiter Contact!</h1>
              <p>Someone is interested in connecting with you</p>
            </div>

            <div class="content">
              <div class="info-section">
                <h2>📋 Recruiter Details</h2>
                <div class="info-row">
                  <span class="label">Name:</span>
                  <span class="value">${recruiterInfo.name}</span>
                </div>
                <div class="info-row">
                  <span class="label">Company:</span>
                  <span class="value">${recruiterInfo.company}</span>
                </div>
                <div class="info-row">
                  <span class="label">Email:</span>
                  <span class="value">
                    <a href="mailto:${recruiterInfo.email}" style="color: #667eea;">${recruiterInfo.email}</a>
                  </span>
                </div>
                <div class="info-row">
                  <span class="label">Position:</span>
                  <span class="value">${recruiterInfo.role}</span>
                </div>
                ${recruiterInfo.message ? `
                <div class="info-row" style="margin-top: 15px;">
                  <span class="label" style="display: block; margin-bottom: 8px;">Message:</span>
                  <div style="background: white; padding: 12px; border-radius: 4px; border: 1px solid #e2e8f0;">
                    ${recruiterInfo.message}
                  </div>
                </div>
                ` : ''}
              </div>

              <div class="info-section">
                <h2>💬 Conversation Transcript</h2>
                ${transcriptHTML}
              </div>
            </div>

            <div class="cta-section">
              <a href="mailto:${recruiterInfo.email}" class="cta-button">
                📧 Reply to ${recruiterInfo.name}
              </a>
            </div>

            <div class="footer">
              <p>This email was automatically sent by your AI Portfolio Assistant</p>
              <p style="margin-top: 5px;">
                Received: ${formatTimestamp(new Date())}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      // Plain text fallback
      text: `
New Recruiter Contact

Name: ${recruiterInfo.name}
Company: ${recruiterInfo.company}
Email: ${recruiterInfo.email}
Role: ${recruiterInfo.role}
${recruiterInfo.message ? `\nMessage: ${recruiterInfo.message}` : ''}

Chat Transcript:
${chatTranscript.map(msg => {
  const role = msg.role === 'user' ? 'Recruiter' : 'AI';
  return `[${role}] ${msg.content}`;
}).join('\n\n')}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('✅ Email notification sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to send email notification:', error);
    return false;
  }
}

/**
 * Test email configuration
 */
export async function testEmailConfiguration(): Promise<boolean> {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error('❌ Email credentials not configured');
      return false;
    }

    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return true;
  } catch (error) {
    console.error('❌ Email configuration test failed:', error);
    return false;
  }
}