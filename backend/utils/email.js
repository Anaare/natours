const { Resend } = require('resend');
const { convert } = require('html-to-text');

const buildWelcomeEmail = require('../templates/WelcomeEmail');
const buildPasswordResetEmail = require('../templates/PasswordResetEmail');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = process.env.RESEND_FROM;
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  getTemplateHTML(template) {
    if (template === 'WELCOME') {
      return buildWelcomeEmail(this.firstName, this.url);
    }
    if (template === 'PASSWORD_RESET') {
      return buildPasswordResetEmail(this.firstName, this.url);
    }
    throw new Error(`Unknown template: ${template}`);
  }

  async send(template, subject) {
    const html = this.getTemplateHTML(template);
    const text = convert(html);

    await this.resend.emails.send({
      from: this.from,
      to: this.to,
      subject,
      html,
      text,
    });
  }

  async sendWelcome() {
    await this.send('WELCOME', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'PASSWORD_RESET',
      'Your password reset token (valid for only 10 minutes)',
    );
  }
};
