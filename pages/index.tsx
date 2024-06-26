import { NextPage } from 'next';

const IndexPage: NextPage = () => (
  <>
    <DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TypeScript HTML Example</title>
    </head>
    <body>
      <!-- <canvas id="gameCanvas1" width="500" height="500"></canvas>
      <canvas id="gameCanvas2" width="500" height="500"></canvas> -->
      <form id="sign-up-form">
        <input type="email" id="email-input" required>
        <input type="password" id="password-input" required>
        <button type="submit">Sign Up</button>
      </form>

      <script src="dist/test.js" type="module"></script>
    </body>
    </html>
  </>
);

export default IndexPage;
