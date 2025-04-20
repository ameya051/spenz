// @ts-nocheck
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
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

interface MonthlyReportData {
  stats: {
    totalIncome: number;
    totalExpenses: number;
    byCategory: Record<string, number>;
    transactionCount: number;
  };
  month: string;
  insights: string[];
}

export async function sendMonthlyInsightsEmail(
  to: string,
  userName: string,
  reportData: MonthlyReportData
) {
  try {
    const { stats, month, insights } = reportData;
    const formatCurrency = (amount: number) => 
      new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject: `Your Monthly Financial Report - ${month}`,
      html: `
        <h1>Monthly Financial Report - ${month}</h1>
        <p>Hello ${userName},</p>
        
        <h2>Monthly Overview</h2>
        <p><strong>Total Income:</strong> ${formatCurrency(stats.totalIncome)}</p>
        <p><strong>Total Expenses:</strong> ${formatCurrency(stats.totalExpenses)}</p>
        <p><strong>Net Savings:</strong> ${formatCurrency(stats.totalIncome - stats.totalExpenses)}</p>
        <p><strong>Total Transactions:</strong> ${stats.transactionCount}</p>
        
        <h2>Spending by Category</h2>
        ${Object.entries(stats.byCategory)
          .map(([category, amount]) => 
            `<p><strong>${category}:</strong> ${formatCurrency(amount)}</p>`
          )
          .join('')}
        
        <h2>AI-Generated Insights</h2>
        ${insights.map(insight => `<p>• ${insight}</p>`).join('')}
        
        <p>Login to your account to view detailed analytics and manage your finances.</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('Failed to send monthly insights email:', error);
    return false;
  }
}

