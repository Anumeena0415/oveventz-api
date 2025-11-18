#!/usr/bin/env node

/**
 * Environment Setup Script for OccasionSuper Frontend
 * 
 * This script helps you create the .env.local file with EmailJS configuration.
 * Run this script with: node setup-env.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envPath = path.join(__dirname, '.env.local');

console.log('🚀oveventz EmailJS Environment Setup\n');
console.log('This script will help you create the .env.local file with your EmailJS configuration.\n');
console.log('You can find these values in your EmailJS dashboard at https://www.emailjs.com/\n');

const questions = [
  {
    key: 'VITE_BACKEND_URL',
    question: 'Enter your Backend URL (default: https://ovevents.onrender.com): ',
    default: 'https://ovevents.onrender.com'
  },
  {
    key: 'VITE_EMAILJS_SERVICE_ID',
    question: 'Enter your EmailJS Service ID: ',
    required: true
  },
  {
    key: 'VITE_EMAILJS_TEMPLATE_ID',
    question: 'Enter your EmailJS Template ID: ',
    required: true
  },
  {
    key: 'VITE_EMAILJS_PUBLIC_KEY',
    question: 'Enter your EmailJS Public Key: ',
    required: true
  }
];

const envVars = {};

function askQuestion(index) {
  if (index >= questions.length) {
    createEnvFile();
    return;
  }

  const q = questions[index];
  const prompt = q.default ? `${q.question}[${q.default}] ` : q.question;

  rl.question(prompt, (answer) => {
    const value = answer.trim() || q.default || '';
    
    if (q.required && !value) {
      console.log('❌ This field is required. Please enter a value.\n');
      askQuestion(index);
      return;
    }

    envVars[q.key] = value;
    askQuestion(index + 1);
  });
}

function createEnvFile() {
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n') + '\n';

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ Environment file created successfully at:', envPath);
    console.log('\n📧 Your EmailJS configuration is now ready!');
    console.log('\nNext steps:');
    console.log('1. Start your development server: npm run dev');
    console.log('2. Go to the admin panel');
    console.log('3. Create a vendor user and test the email functionality');
    console.log('\nFor more details, see EMAIL_SETUP.md');
  } catch (error) {
    console.error('❌ Error creating environment file:', error.message);
  }

  rl.close();
}

// Check if .env.local already exists
if (fs.existsSync(envPath)) {
  rl.question('⚠️  .env.local already exists. Do you want to overwrite it? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      askQuestion(0);
    } else {
      console.log('Setup cancelled.');
      rl.close();
    }
  });
} else {
  askQuestion(0);
}
