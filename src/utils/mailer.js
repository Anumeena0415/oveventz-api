// // const nodemailer = require('nodemailer');
// // const dotenv = require('dotenv');

// // dotenv.config();

// // // Resolve env vars with sensible fallbacks and types
// // const resolvedHost = process.env.EMAIL_HOST || process.env.SMTP_HOST || '';
// // const resolvedPort = Number(process.env.EMAIL_PORT || process.env.SMTP_PORT || 587);
// // const resolvedUser = process.env.EMAIL_USER || process.env.SMTP_USER || '';
// // const resolvedPass = process.env.EMAIL_PASS || process.env.SMTP_PASS || '';
// // const resolvedService = process.env.EMAIL_SERVICE || process.env.SMTP_SERVICE || '';

// // console.log('Email configuration:', {
// //     host: resolvedHost,
// //     port: resolvedPort,
// //     user: resolvedUser,
// //     service: resolvedService,
// //     hasPassword: !!resolvedPass
// // });

// // // Determine secure: prefer explicit env, else infer from port
// // const envSecure = process.env.EMAIL_SECURE || process.env.SMTP_SECURE; 
// // const resolvedSecure = typeof envSecure !== 'undefined' ? String(envSecure) === 'true' : String(resolvedPort) === '465';

// // // TLS handling: allow self-signed in non-production unless explicitly overridden
// // let rejectUnauthorized = true;
// // if (process.env.EMAIL_TLS_REJECT_UNAUTHORIZED === 'false') {
// //     rejectUnauthorized = false;
// // } else if ((process.env.NODE_ENV || 'development') !== 'production' && !process.env.EMAIL_TLS_REJECT_UNAUTHORIZED) {
// //     // Default to allowing self-signed in dev if not explicitly set
// //     rejectUnauthorized = false;
// // }

// // let transporter;

// // try {
// //     if (resolvedService && !resolvedHost) {
// //         // Use well-known service if provided (e.g., 'gmail', 'sendgrid', etc.)
// //         transporter = nodemailer.createTransport({
// //             service: resolvedService,
// //             auth: { user: resolvedUser, pass: resolvedPass },
// //         });
// //     } else {
// //         // Direct host configuration
// //         transporter = nodemailer.createTransport({
// //             host: resolvedHost,
// //             port: resolvedPort,
// //             secure: resolvedSecure,
// //             auth: { user: resolvedUser, pass: resolvedPass },
// //             requireTLS: !resolvedSecure && resolvedPort === 587 ? true : undefined,
// //             tls: {
// //                 rejectUnauthorized,
// //             },
// //         });
// //     }
// // } catch (cfgErr) {
// //     console.error('Failed to configure SMTP transporter:', cfgErr);
// // }

// // if (transporter) {
// //     transporter.verify((error) => {
// //         if (error) console.log('SMTP connection failed:', error);
// //         else console.log('SMTP connection successful');
// //     });
// // }

// // module.exports = transporter;





// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');

// dotenv.config();

// const isProduction = (process.env.NODE_ENV || 'development') === 'production';

// // Resolve configuration from env with flexibility
// const resolved = {
//   service: process.env.SMTP_SERVICE || process.env.EMAIL_SERVICE || '',
//   host: process.env.SMTP_HOST || process.env.EMAIL_HOST || '',
//   port: Number(process.env.SMTP_PORT || process.env.EMAIL_PORT || 0),
//   user: process.env.SMTP_USER || process.env.EMAIL_USER || '',
//   pass: process.env.SMTP_PASS || process.env.EMAIL_PASS || '',
//   secureEnv: typeof process.env.SMTP_SECURE !== 'undefined' ? String(process.env.SMTP_SECURE) === 'true' : undefined,
// };

// // Infer secure based on port if not explicitly set
// const inferredSecure = resolved.secureEnv !== undefined
//   ? resolved.secureEnv
//   : String(resolved.port) === '465';

// // TLS policy: reject in prod by default, allow in dev unless overridden
// const envReject = process.env.SMTP_TLS_REJECT_UNAUTHORIZED;
// let rejectUnauthorized = isProduction;
// if (typeof envReject !== 'undefined') {
//   rejectUnauthorized = String(envReject) !== 'false';
// } else if (!isProduction) {
//   rejectUnauthorized = false;
// }

// let transporter;

// try {
//   if (resolved.service && !resolved.host) {
//     // Use a well-known service (e.g., gmail, sendgrid)
//     transporter = nodemailer.createTransport({
//       service: resolved.service,
//       auth: { user: resolved.user, pass: resolved.pass },
//       pool: true,
//       maxConnections: 3,
//       maxMessages: 50,
//       connectionTimeout: 15_000,
//       greetingTimeout: 10_000,
//       socketTimeout: 20_000,
//       tls: { rejectUnauthorized },
//       logger: !isProduction,
//     });
//   } else {
//     // Direct host/port configuration
//     transporter = nodemailer.createTransport({
//       host: resolved.host,
//       port: resolved.port || 587,
//       secure: inferredSecure,
//       auth: { user: resolved.user, pass: resolved.pass },
//       requireTLS: !inferredSecure,
//       pool: true,
//       maxConnections: 3,
//       maxMessages: 50,
//       connectionTimeout: 15_000,
//       greetingTimeout: 10_000,
//       socketTimeout: 20_000,
//       tls: { rejectUnauthorized },
//       logger: !isProduction,
//     });
//   }
// } catch (cfgErr) {
//   console.error('Failed to configure SMTP transporter:', cfgErr);
// }

// if (!transporter) {
//   // Create a stub that fails fast with a clear message instead of crashing the app
//   module.exports = {
//     sendMail: async () => {
//       throw new Error('Email not configured. Please set SMTP_SERVICE or SMTP_HOST/PORT/USER/PASS.');
//     },
//     verify: (cb) => cb && cb(new Error('Email not configured')),
//   };
// } else {
//   transporter.verify((error) => {
//     if (error) {
//       console.error('SMTP connection failed:', error && error.message ? error.message : error);
//     } else {
//       console.log('SMTP connection successful');
//     }
//   });
//   module.exports = transporter;
// }



const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Use nodemailer transporter (same as server.js)
const smtpHost = process.env.SMTP_HOST?.trim();
const smtpPort = parseInt(process.env.SMTP_PORT?.trim() || "587");
const smtpUser = process.env.SMTP_USER?.trim();
const smtpPass = process.env.SMTP_PASS?.trim();

// Validate SMTP configuration
const isProduction = process.env.NODE_ENV === 'production';

console.log("📧 SMTP Configuration Check:", {
  environment: isProduction ? 'production' : 'development',
  host: smtpHost || '❌ MISSING',
  port: smtpPort || '❌ MISSING',
  user: smtpUser ? smtpUser.replace(/(.{2}).+(@.+)/, "$1****$2") : '❌ MISSING',
  passSet: !!smtpPass,
  allSet: !!(smtpHost && smtpPort && smtpUser && smtpPass)
});

// Check if all required credentials are present
if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
  console.error("❌ CRITICAL: SMTP credentials are missing!");
  console.error("Required environment variables:");
  console.error("  - SMTP_HOST:", smtpHost ? "✅" : "❌ MISSING");
  console.error("  - SMTP_PORT:", smtpPort ? "✅" : "❌ MISSING");
  console.error("  - SMTP_USER:", smtpUser ? "✅" : "❌ MISSING");
  console.error("  - SMTP_PASS:", smtpPass ? "✅" : "❌ MISSING");
  
  // Create a stub transporter that throws clear errors
  const stubTransporter = {
    sendMail: async (options) => {
      throw new Error(
        `SMTP not configured. Missing: ${!smtpHost ? 'SMTP_HOST ' : ''}${!smtpPort ? 'SMTP_PORT ' : ''}${!smtpUser ? 'SMTP_USER ' : ''}${!smtpPass ? 'SMTP_PASS' : ''}. ` +
        `Please set these environment variables in your production environment (Vercel/Render).`
      );
    },
    verify: (callback) => {
      if (callback) {
        callback(new Error("SMTP not configured"));
      }
    }
  };
  
  module.exports = stubTransporter;
} else {
  // Create transporter with proper configuration
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates (needed for some SMTP servers)
    },
    // Connection pool settings for better reliability in production
    pool: true,
    maxConnections: 1,
    maxMessages: 3,
    rateDelta: 1000,
    rateLimit: 5,
    // Increase timeout settings for Render/production
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 60000, // 60 seconds
  });

  // Verify email configuration asynchronously (non-blocking)
  // Don't block module loading if email verification fails
  setTimeout(() => {
    transporter.verify((error, success) => {
      if (error) {
        console.error("⚠️ Email configuration warning in mailer.js:", error.message);
        console.error("⚠️ Error code:", error.code);
        console.error("⚠️ Error command:", error.command);
        if (error.response) {
          console.error("⚠️ SMTP Response:", error.response);
        }
        console.error("⚠️ Email will be tested when first email is sent");
      } else {
        console.log("✅ Email transporter ready in mailer.js");
        console.log("✅ SMTP connection verified successfully");
      }
    });
  }, 2000); // Verify after 2 seconds (non-blocking)

  module.exports = transporter;
}
