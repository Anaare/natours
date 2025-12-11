import BaseEmailTemplate from './BaseEmailTemplate';
import React from 'react';

const PasswordResetEmail = ({ firstName, url }) => {
  const passwordUpdateContent = (
    <React.Fragment>
      <p>Hi {firstName} 🎉🙏</p>
      <p>
        Forgot your password? Follow a link to recover it. If you didn't forget
        your password, please ignore this email!
      </p>
    </React.Fragment>
  );

  return (
    <BaseEmailTemplate
      subject="Reset your password"
      firstName={firstName}
      content={passwordUpdateContent}
      buttonLink={url}
      buttonText="Reset your password"
    />
  );
};

export default PasswordResetEmail;
