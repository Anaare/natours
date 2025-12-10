import BaseEmailTemplate from './BaseEmailTemplate';
import React from 'react';

const PasswordResetEmail = ({ firstName, url }) => {
  const passwordUpdateContent = (
    <React.Fragment>
      <p>Hi {firstName} 🎉🙏</p>
      <p>
        Forgot your password? Submit a PATCH request with your new password and
        passwordConfirm to:
        <a href={url}>{url}</a>. If you didn't forget your password, please
        ignore this email!
      </p>
      <p>(Website for this action not yet implemented.)</p>
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
