// @ts-nocheck
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

// Configure email transport with OAuth2
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    accessToken: oauth2Client.getAccessToken(),
  },
});

export async function sendBudgetThresholdEmail(
  to: string,
  budgetAmount: number,
  spentAmount: number,
  percentage: number
) {
  try {
    console.log("hi");
    
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject: `Budget Alert: ${percentage}% of your budget has been spent`,
      html: `
        <h1>Budget Alert</h1>
        <p>You've spent ${percentage}% of your budget.</p>
        <p>
          <strong>Budget Amount:</strong> ${new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'INR'
      }).format(budgetAmount)}
        </p>
        <p>
          <strong>Amount Spent:</strong> ${new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'INR'
      }).format(spentAmount)}
        </p>
        
        <p>Login to your account to review your spending.</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('Failed to send budget notification email:', error);
    return false;
  }
}
