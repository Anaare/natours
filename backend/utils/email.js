const nodemailer = require('nodemailer');
const { convert } = require('html-to-text');
const ReactDOMServer = require('react-dom/server');
const React = require('react');

// Specific email templates MUST be imported here

const WelcomeEmail = require('../templates/WelcomeEmail').default;
const {
  default: PasswordResetEmail,
} = require('../templates/PasswordResetEmail');

const getTemplateComponent = (templateName) => {
  switch (templateName) {
    case 'WELCOME':
      return WelcomeEmail;
    case 'PASSWORD_RESET':
      return PasswordResetEmail;
    default:
      throw new Error(`Template component for '${templateName}' not found.`);
  }
};

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Ana Arevadze <${process.env.EMAIL_FROM}>`;
  }
  // 1. Create a transporter
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const TemplateComponent = getTemplateComponent(template);

    const templateProps = {
      firstName: this.firstName,
      url: this.url,
    };
    // Send the actual email
    // 1. Render React component to HTML string
    const html = ReactDOMServer.renderToString(
      React.createElement(TemplateComponent, templateProps),
    );

    // 2. Convert HTML to plain text
    const text = convert(html, {
      wordwrap: 130,
    });
    // If I'm using gmail I'll need to activate 'less secure app' in gmail option
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text,
    };

    // 3. Create a transport and send email

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
