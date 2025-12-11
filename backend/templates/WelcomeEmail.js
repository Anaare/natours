module.exports = function buildWelcomeEmail(firstName, url) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Welcome to the Natours Family!</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
    <div style="max-width: 580px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px;">
      <p>Hi ${firstName}, Welcome to Natours, we're glad to have you 🎉🙏</p>

      <p>
        We're all a big family here, so make sure to upload your user photo so we get to know you a bit better!
      </p>
      <p class="last">- Ana A</p>
    </div>
  </body>
</html>
`;
};
