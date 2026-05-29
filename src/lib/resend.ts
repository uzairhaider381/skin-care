import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';

export const isResendConfigured = 
  resendApiKey && 
  resendApiKey !== 're_123456789...';

export const resend = isResendConfigured ? new Resend(resendApiKey) : null;
