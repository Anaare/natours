module.exports = function buildPasswordResetEmail(firstName, url) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Reset your password</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
    <div style="max-width: 580px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px;">
      <p>Hi ${firstName} 🎉🙏</p>

      <p>
        Forgot your password? Follow a link to recover it. If you didn't forget your password, please ignore this email!
      </p>

      <div style="margin: 30px 0;">
        <a
          href="${url}"
          style="
            background-color: #04aa6d;
            padding: 12px 18px;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
          "
        >
          Reset your password
        </a>
      </div>
    </div>
  </body>
</html>
`;
};
