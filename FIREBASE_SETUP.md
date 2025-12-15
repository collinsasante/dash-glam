# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication for the Packaging Glamour employee portal.

## Prerequisites

- A Google account
- Access to [Firebase Console](https://console.firebase.google.com/)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter your project name (e.g., "packaging-glamour-portal")
4. Accept the Firebase terms and click **Continue**
5. Disable Google Analytics (optional) or configure it as needed
6. Click **Create project**
7. Wait for the project to be created, then click **Continue**

## Step 2: Register Your Web App

1. In the Firebase Console, click the **Web icon** (`</>`) to add a web app
2. Enter an app nickname (e.g., "Packaging Glamour Portal")
3. Do NOT check "Set up Firebase Hosting" (we're using Cloudflare Pages)
4. Click **Register app**
5. Copy the Firebase configuration object - you'll need these values:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```
6. Click **Continue to console**

## Step 3: Enable Email/Password Authentication

1. In the Firebase Console, click **Authentication** in the left sidebar
2. Click **Get started** if this is your first time
3. Click on the **Sign-in method** tab
4. Find **Email/Password** in the list of providers
5. Click on it to expand
6. Toggle the **Enable** switch to ON
7. Click **Save**

## Step 4: Configure Environment Variables

### For Local Development:

1. Create a `.env` file in the root directory of your project:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and replace the placeholder values with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. Save the file

### For Cloudflare Pages:

1. Go to your [Cloudflare Pages dashboard](https://dash.cloudflare.com/)
2. Select your project (dash-glam)
3. Click on **Settings** → **Environment variables**
4. Add the following variables for **Production** (and Preview if needed):
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

5. Click **Save** for each variable

## Step 5: Configure Authorized Domains

1. In Firebase Console, go to **Authentication** → **Settings** tab
2. Scroll down to **Authorized domains**
3. Add your production domain (e.g., `your-app.pages.dev` or your custom domain)
4. Click **Add domain**

## Step 6: Test Your Setup

### Local Testing:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:5173`
3. Try to sign up with a new account
4. Check Firebase Console → Authentication → Users to verify the account was created

### Production Testing:

1. Push your changes to GitHub (if not already done)
2. Cloudflare Pages will automatically deploy
3. Visit your production URL
4. Test sign up and sign in functionality

## Security Recommendations

### 1. Email Verification (Recommended)

Enable email verification to ensure users have valid email addresses:

1. In Firebase Console → Authentication → Settings
2. Click **Edit** next to Email verification template
3. Customize the email template if needed
4. Update your signup logic to send verification emails

### 2. Password Requirements

The current implementation enforces:
- Minimum 6 characters (Firebase default)
- You can add stronger requirements in the SignUp component

### 3. Authorized Domains

Only add domains you control to prevent unauthorized usage:
- Your production domain
- Your preview/staging domains
- `localhost` for development

### 4. API Key Security

The Firebase API key in your `.env` file is safe to expose in client-side code because:
- It's only used to identify your Firebase project
- Firebase Security Rules protect your data
- However, ensure your `.env` file is in `.gitignore`

### 5. Set up Firebase Security Rules

If you add Firestore or Storage later, always configure security rules.

## Troubleshooting

### "Firebase: Error (auth/invalid-credential)"
- Verify your environment variables are set correctly
- Check that Email/Password authentication is enabled in Firebase Console

### "Firebase: Error (auth/network-request-failed)"
- Check your internet connection
- Verify the API key and project configuration

### Users can't sign in
- Verify Email/Password authentication is enabled
- Check that the user exists in Firebase Console → Authentication → Users
- Clear browser cache and try again

### Environment variables not loading
- Ensure variable names start with `VITE_` prefix
- Restart the development server after changing `.env`
- For Cloudflare Pages, redeploy after adding variables

## Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Cloudflare Pages Environment Variables](https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables)
