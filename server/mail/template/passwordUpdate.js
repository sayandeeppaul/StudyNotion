exports.passwordUpdated = (email, name) => {
  return;
  `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Course Registration Confirmation</title>
  </head>
  <style>
    body {
      background-color: #ffffff;
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.4;
      margin: 0;
      padding: 0;
      color: #333333;
    }
    .container {
      max-width: 600px;
      text-align: center;
      margin: 0 auto;
      border: 2px solid black;
      padding: 20px;
    }
    .message {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .body {
      margin-bottom: 20px;
    }

    .support {
      font-size: 14px;
      color: #999999;
      margin-top: 20px;
    }
    .highlight {
      font-weight: bold;
    }
    .mail {
      text-decoration: none;
    }
  </style>
  <body>
    <div class="container">
      <a href="#">
        <img
          src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
          alt="Company Logo"
          width="200px"
        />
      </a>
      <div class="message">Password Update Confirmation</div>
      <div class="body">
        <p>Hey ${name},</p>
        <p>
          Your password has been successfully updated for the email <span class="highlight">${email}</span>.
        </p>
        <p>
          If you did not request this password change, please contact us immediately to secure your account.
        </p>
      </div>
      <div class="support">
        If you have any queries or need assistance, plase feel free to reach out
        to us at <a class="mail" href="mailto:">company@gmail.com</a>.We are
        here to help you!
      </div>
    </div>
  </body>
</html>
    `;
};
