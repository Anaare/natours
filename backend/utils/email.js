const nodemailer = require('nodemailer');
const { convert } = require('html-to-text');

const buildWelcomeEmail = require('../templates/WelcomeEmail');
const buildPasswordResetEmail = require('../templates/PasswordResetEmail');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = process.env.EMAIL_FROM;
  }

  // -----------------------------
  // 1. Select the correct template
  // -----------------------------
  getTemplateHTML(template) {
    if (template === 'WELCOME') {
      return buildWelcomeEmail(this.firstName, this.url);
    }
    if (template === 'PASSWORD_RESET') {
      return buildPasswordResetEmail(this.firstName, this.url);
    }
    throw new Error(`Unknown template: ${template}`);
  }

  // -----------------------------
  // 2. Create SMTP transport (Brevo)
  // -----------------------------
  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // -----------------------------
  // 3. Send email
  // -----------------------------
  async send(template, subject) {
    const html = this.getTemplateHTML(template);
    const text = convert(html);

    console.log('STEP: Sending email via Brevo SMTP...');

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text,
    };

    const info = await this.newTransport().sendMail(mailOptions);

    console.log('STEP: Brevo SMTP response:', info);

    return info;
  }

  // -----------------------------
  // 4. Public methods
  // -----------------------------
  async sendWelcome() {
    return this.send('WELCOME', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    return this.send(
      'PASSWORD_RESET',
      'Your password reset token (valid for only 10 minutes)',
    );
  }
};
