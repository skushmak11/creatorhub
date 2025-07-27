interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

interface EmailServiceConfig {
  service: string;
  fromEmail: string;
  fromName: string;
  apiKey?: string;
  domain?: string;
  region?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}

class EmailService {
  private config: EmailServiceConfig;

  constructor() {
    this.config = {
      service: import.meta.env.VITE_EMAIL_SERVICE || 'mock',
      fromEmail: import.meta.env.VITE_FROM_EMAIL || 'noreply@creatorhub.com',
      fromName: import.meta.env.VITE_FROM_NAME || 'CreatorHub',
      apiKey: import.meta.env.VITE_SENDGRID_API_KEY || import.meta.env.VITE_MAILGUN_API_KEY,
      domain: import.meta.env.VITE_MAILGUN_DOMAIN,
      region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    };
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    try {
      if (!email || !resetToken) {
        throw new Error('Email and reset token are required');
      }

      const resetUrl = `${window.location.origin}/reset-password/${resetToken}`;
      
      const emailData: EmailData = {
        to: email.trim().toLowerCase(),
        subject: 'Reset Your CreatorHub Password',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #1e293b; font-size: 28px; font-weight: bold; margin: 0;">CreatorHub</h1>
              <p style="color: #64748b; font-size: 16px; margin: 8px 0 0 0;">Content Creator Management Platform</p>
            </div>
            
            <div style="background-color: #f8fafc; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
              <h2 style="color: #4f46e5; font-size: 24px; font-weight: 600; margin: 0 0 16px 0;">Reset Your Password</h2>
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
                You requested a password reset for your CreatorHub account. Click the button below to create a new password.
              </p>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="${resetUrl}" style="background-color: #4f46e5; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; transition: background-color 0.2s;">
                  Reset Password
                </a>
              </div>
              
              <p style="color: #ef4444; font-size: 14px; margin: 16px 0 0 0; font-weight: 500;">
                ⚠️ This link will expire in 1 hour for security reasons.
              </p>
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 24px;">
              <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin: 0 0 8px 0;">
                If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
              </p>
              <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin: 0;">
                If you're having trouble clicking the button, copy and paste this URL into your browser: <br>
                <span style="color: #4f46e5; word-break: break-all;">${resetUrl}</span>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                This email was sent by CreatorHub. For support, contact us at support@creatorhub.com
              </p>
            </div>
          </div>
        `,
        from: `${this.config.fromName} <${this.config.fromEmail}>`
      };

      await this.sendEmail(emailData);
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw new Error('Failed to send password reset email. Please try again later.');
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    try {
      if (!email || !name) {
        throw new Error('Email and name are required');
      }

      const emailData: EmailData = {
        to: email.trim().toLowerCase(),
        subject: 'Welcome to CreatorHub!',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #1e293b; font-size: 28px; font-weight: bold; margin: 0;">CreatorHub</h1>
              <p style="color: #64748b; font-size: 16px; margin: 8px 0 0 0;">Content Creator Management Platform</p>
            </div>
            
            <div style="background-color: #f0f9ff; padding: 24px; border-radius: 12px; margin-bottom: 24px; border-left: 4px solid #4f46e5;">
              <h2 style="color: #4f46e5; font-size: 24px; font-weight: 600; margin: 0 0 16px 0;">
                Welcome to CreatorHub, ${name}! 🎉
              </h2>
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Thank you for joining CreatorHub, the comprehensive platform designed specifically for content creators like you.
              </p>
              
              <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                <h3 style="color: #1e293b; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
                  Here's what you can do with your new account:
                </h3>
                <ul style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;">📺 Connect and manage multiple YouTube channels</li>
                  <li style="margin-bottom: 8px;">📊 Track performance with advanced analytics</li>
                  <li style="margin-bottom: 8px;">📅 Plan your content with our calendar tools</li>
                  <li style="margin-bottom: 8px;">👥 Connect with other creators in our community</li>
                  <li style="margin-bottom: 8px;">💰 Monitor your monetization and revenue</li>
                  <li style="margin-bottom: 0;">🎬 Upload, edit, and organize your video content</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="${window.location.origin}" style="background-color: #4f46e5; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">
                  Get Started Now
                </a>
              </div>
            </div>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
              <h3 style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">
                Need Help Getting Started?
              </h3>
              <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin: 0;">
                Our support team is here to help! If you have any questions or need assistance setting up your account, 
                don't hesitate to reach out to us at support@creatorhub.com
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                This email was sent by CreatorHub. For support, contact us at support@creatorhub.com
              </p>
            </div>
          </div>
        `,
        from: `${this.config.fromName} <${this.config.fromEmail}>`
      };

      await this.sendEmail(emailData);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      throw new Error('Failed to send welcome email. Please try again later.');
    }
  }

  private async sendEmail(emailData: EmailData): Promise<void> {
    try {
      if (this.config.service === 'mock') {
        return this.sendMockEmail(emailData);
      }

      switch (this.config.service) {
        case 'sendgrid':
          return this.sendWithSendGrid(emailData);
        case 'mailgun':
          return this.sendWithMailgun(emailData);
        case 'aws-ses':
          return this.sendWithAWSSES(emailData);
        default:
          throw new Error(`Unsupported email service: ${this.config.service}`);
      }
    } catch (error) {
      console.error('Email service error:', error);
      throw error;
    }
  }

  private async sendMockEmail(emailData: EmailData): Promise<void> {
    console.log('📧 Mock Email Service - Email would be sent:');
    console.log('Service:', this.config.service);
    console.log('To:', emailData.to);
    console.log('Subject:', emailData.subject);
    console.log('From:', emailData.from);
    console.log('HTML Content Preview:', emailData.html.substring(0, 200) + '...');
    
    // Simulate network delay for realistic UX
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate occasional failures for testing error handling
        if (Math.random() < 0.05) {
          console.log('❌ Mock email failed (simulated)');
          reject(new Error('Simulated email service failure'));
        } else {
          console.log('✅ Mock email sent successfully');
          resolve();
        }
      }, Math.random() * 1000 + 500); // 500-1500ms delay
    });
  }

  private async sendWithSendGrid(emailData: EmailData): Promise<void> {
    if (!this.config.apiKey) {
      throw new Error('SendGrid API key not configured. Please set VITE_SENDGRID_API_KEY in your environment variables.');
    }

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: emailData.to }],
          subject: emailData.subject,
        }],
        from: { email: this.config.fromEmail, name: this.config.fromName },
        content: [{
          type: 'text/html',
          value: emailData.html,
        }],
      }),
    });

    if (!response.ok) {
      throw new Error(`SendGrid API error: ${response.status} ${response.statusText}`);
    }
  }

  private async sendWithMailgun(emailData: EmailData): Promise<void> {
    if (!this.config.apiKey || !this.config.domain) {
      throw new Error('Mailgun API key and domain not configured. Please set VITE_MAILGUN_API_KEY and VITE_MAILGUN_DOMAIN in your environment variables.');
    }

    const formData = new FormData();
    formData.append('from', `${this.config.fromName} <${this.config.fromEmail}>`);
    formData.append('to', emailData.to);
    formData.append('subject', emailData.subject);
    formData.append('html', emailData.html);

    const response = await fetch(`https://api.mailgun.net/v3/${this.config.domain}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`api:${this.config.apiKey}`)}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Mailgun API error: ${response.status} ${response.statusText}`);
    }
  }

  private async sendWithAWSSES(emailData: EmailData): Promise<void> {
    if (!this.config.accessKeyId || !this.config.secretAccessKey) {
      throw new Error('AWS SES credentials not configured. Please set VITE_AWS_ACCESS_KEY_ID and VITE_AWS_SECRET_ACCESS_KEY in your environment variables.');
    }

    // TODO: Implement AWS SES integration
    // Note: AWS SES integration would typically require AWS SDK
    // For browser environments, you'd need to use AWS Cognito or a backend proxy
    
    console.log('🚧 AWS SES integration not yet implemented. Configure VITE_EMAIL_SERVICE=mock for development.');
    throw new Error('AWS SES integration not yet implemented. Please use mock mode for development.');
  }

  // Utility method to validate email format
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Public method to test email service configuration
  async testConfiguration(): Promise<{ success: boolean; message: string }> {
    try {
      if (this.config.service === 'mock') {
        return { success: true, message: 'Mock email service is configured and ready.' };
      }

      // Test configuration for each service
      switch (this.config.service) {
        case 'sendgrid':
          if (!this.config.apiKey) {
            return { success: false, message: 'SendGrid API key is missing.' };
          }
          return { success: true, message: 'SendGrid configuration appears valid.' };
        
        case 'mailgun':
          if (!this.config.apiKey || !this.config.domain) {
            return { success: false, message: 'Mailgun API key or domain is missing.' };
          }
          return { success: true, message: 'Mailgun configuration appears valid.' };
        
        case 'aws-ses':
          if (!this.config.accessKeyId || !this.config.secretAccessKey) {
            return { success: false, message: 'AWS SES credentials are missing.' };
          }
          return { success: true, message: 'AWS SES configuration appears valid.' };
        
        default:
          return { success: false, message: `Unknown email service: ${this.config.service}` };
      }
    } catch (error) {
      return { success: false, message: `Configuration test failed: ${error}` };
    }
  }
}

export const emailService = new EmailService();
