import nodemailer from 'nodemailer';

// Configure your email transport
const transporter = nodemailer.createTransport({
  // Replace with your email provider details
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Boolean(process.env.EMAIL_SECURE),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
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
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Budget Alert: 50% of your budget has been spent',
      html: `
        <h1>Budget Alert</h1>
        <p>You've spent ${percentage}% of your budget.</p>
        <p>
          <strong>Budget Amount:</strong> ${new Intl.NumberFormat('en-US', { 
            style: 'currency', currency: 'USD' 
          }).format(budgetAmount)}
        </p>
        <p>
          <strong>Amount Spent:</strong> ${new Intl.NumberFormat('en-US', { 
            style: 'currency', currency: 'USD' 
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