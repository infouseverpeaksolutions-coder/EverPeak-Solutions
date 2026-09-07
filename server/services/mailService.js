const nodemailer = require('nodemailer');

const createTransporter = () => {
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT || '587', 10);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  if (!user || !pass || pass === 'YOUR_EMAIL_PASSWORD') {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.EMAIL_SECURE === 'true' || port === 465,
    auth: { user, pass },
  });
};

const sendEnquiryEmail = async (enquiryData) => {
  const { full_name, email, phone, city, company_name, service, budget, project_details, created_at } = enquiryData;
  const recipient = 'career.everpeaksolutions@gmail.com';
  const formattedDate = new Date(created_at || Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const textContent = `
========================================
NEW WEBSITE ENQUIRY — EVERPEAK SOLUTIONS
========================================

Name: ${full_name}
Email: ${email}
Phone: ${phone}
City: ${city || 'N/A'}
Company: ${company_name || 'N/A'}
Service: ${service}
Budget: ${budget || 'Not Specified'}

Project Details:
${project_details}

Submitted At: ${formattedDate} (IST)
========================================
  `.trim();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0A0A0C; color: #FFFFFF; margin: 0; padding: 24px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #111114; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 32px; }
        .header { border-bottom: 2px solid #6D00FF; padding-bottom: 16px; margin-bottom: 24px; }
        .title { color: #FFFFFF; font-size: 22px; font-weight: bold; margin: 0; }
        .tagline { color: #8A00FF; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
        .field-group { margin-bottom: 16px; }
        .label { color: #A6A6B0; font-size: 12px; text-transform: uppercase; font-weight: 600; }
        .value { color: #FFFFFF; font-size: 15px; margin-top: 4px; font-weight: 500; }
        .details-box { background-color: #050505; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; margin-top: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #E0E0E6; }
        .footer { margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px; text-align: center; font-size: 12px; color: #A6A6B0; }
        .badge { display: inline-block; background: linear-gradient(135deg, #6D00FF, #D000FF); color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="title">EverPeak Solutions</div>
          <div class="tagline">Elevate, Innovate, Dominate</div>
        </div>

        <div style="margin-bottom: 24px;">
          <span class="badge">New Client Lead</span>
        </div>

        <div class="field-group">
          <div class="label">Full Name</div>
          <div class="value">${full_name}</div>
        </div>

        <div class="field-group">
          <div class="label">Email Address</div>
          <div class="value"><a href="mailto:${email}" style="color: #D000FF; text-decoration: none;">${email}</a></div>
        </div>

        <div class="field-group">
          <div class="label">Phone / WhatsApp</div>
          <div class="value"><a href="tel:${phone}" style="color: #D000FF; text-decoration: none;">${phone}</a></div>
        </div>

        <div class="field-group">
          <div class="label">City / Location</div>
          <div class="value">${city || 'N/A'}</div>
        </div>

        <div class="field-group">
          <div class="label">Company Name</div>
          <div class="value">${company_name || 'N/A'}</div>
        </div>

        <div class="field-group">
          <div class="label">Service Required</div>
          <div class="value" style="color: #8A00FF; font-weight: 700;">${service}</div>
        </div>

        <div class="field-group">
          <div class="label">Estimated Budget</div>
          <div class="value">${budget || 'Not specified'}</div>
        </div>

        <div class="field-group">
          <div class="label">Project Details</div>
          <div class="details-box">${project_details}</div>
        </div>

        <div class="field-group" style="margin-top: 24px;">
          <div class="label">Submitted At</div>
          <div class="value" style="font-size: 13px; color: #A6A6B0;">${formattedDate}</div>
        </div>

        <div class="footer">
          EverPeak Solutions Notification System • Indore, MP
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.log(`[MailService Info] SMTP credentials not fully configured or placeholder. Logged enquiry for ${full_name} <${email}>.`);
      return { success: true, simulated: true };
    }

    const info = await transporter.sendMail({
      from: `"EverPeak Solutions" <${process.env.EMAIL_USER || 'no-reply@everpeaksolutions.in'}>`,
      to: recipient,
      replyTo: email,
      subject: 'New Website Enquiry — EverPeak Solutions',
      text: textContent,
      html: htmlContent,
    });

    console.log('[MailService Success] Notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[MailService Error] Failed to send email notification:', error.message);
    // Return gracefully so submission succeeds in database
    return { success: false, error: error.message };
  }
};

module.exports = { sendEnquiryEmail };
