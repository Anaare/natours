import BaseEmailTemplate from "../../../backend/templates/BaseEmailTemplate";

const WelcomeEmail = ({ firstName, url }) => {
  const welcomeContent = (
    <React.Fragment>
      <p>Welcome to Natours, we're glad to have you 🎉🙏</p>
      <p>
        We're all a big family here, so make sure to upload your user photo so
        we get to know you a bit better!
      </p>
      <p className="last">- Ana A</p>
    </React.Fragment>
  );

  return (
    <BaseEmailTemplate
      subject="Welcome to the Natours Family!"
      firstName={firstName}
      content={welcomeContent}
      buttonLink={url}
      buttonText="Upload user photo"
    />
  );
};

export default WelcomeEmail;
