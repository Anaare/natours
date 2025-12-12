const nodemailer = require('nodemailer');
const { convert } = require('html-to-text');

const buildWelcomeEmail = require('../templates/WelcomeEmail');
const buildPasswordResetEmail = require('../templates/PasswordResetEmail');

const getTemplateHTML = (templateName, firstName, url) => {
  switch (templateName) {
    case 'WELCOME':
      return buildWelcomeEmail(firstName, url);
    case 'PASSWORD_RESET':
      return buildPasswordResetEmail(firstName, url);
    default:
      throw new Error(`Unknown email template: ${templateName}`);
  }
};

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Ana Arevadze <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html =
      template === 'WELCOME'
        ? buildWelcomeEmail(this.firstName, this.url)
        : buildPasswordResetEmail(this.firstName, this.url);

    const text = convert(html, { wordwrap: 130 });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text,
    };

    await this.newTransport().sendMail(mailOptions);
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
