const fs = require('fs');
const path = require('path');

// Example: https://my-app.test
const host = process.env.APP_URL ? process.env.APP_URL.split('//')[1] : '';

// Check if command is: "npm run hot" or "npm run hot with-https"
const isHotWithSSL =
  process.argv.includes('with-https') && process.argv.includes('--hot');

const hmrOptions = {
  // Setting "host" to "0.0.0.0" is required, if you are visiting
  // your app via http://127.0.0.1:8000 or http://localhost:8000
  host: isHotWithSSL ? host : '0.0.0.0',
  port: '8080'
};

// This will be used in mix.webpackConfig(...)
let devServer = {};

if (process.env.NODE_ENV === 'development') {
  if (isHotWithSSL) {
    process.argv.push('--https');

    devServer = {
      https: {
        // Make sure these certificates exists,
        // otherwise it will throw an error.
        key: fs.readFileSync(
          path.resolve(
            process.env.HOME,
            `.config/valet/Certificates/${host}.key`
          )
        ),
        cert: fs.readFileSync(
          path.resolve(
            process.env.HOME,
            `.config/valet/Certificates/${host}.crt`
          )
        )
      }
    };
  }
}

module.exports = {
  hmrOptions,
  devServer
};
