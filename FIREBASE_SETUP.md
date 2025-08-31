# Firebase Setup Guide

This guide provides detailed step-by-step instructions for setting up Firebase Authentication for FireAuthFlow.

## Prerequisites

- A Google account
- Basic understanding of Firebase
- Access to Firebase Console

## Step 1: Create Firebase Project

1. **Navigate to Firebase Console**
   - Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Sign in with your Google account

2. **Create New Project**
   - Click "Create a project" or "Add project"
   - Enter a project name (e.g., "my-auth-app")
   - Choose whether to enable Google Analytics (optional)
   - Accept terms and click "Create project"
   - Wait for project creation to complete

## Step 2: Set Up Authentication

1. **Navigate to Authentication**
   - In your Firebase project dashboard
   - Click "Authentication" in the left sidebar
   - Click "Get started" if this is your first time

2. **Configure Sign-in Methods**
   - Go to the "Sign-in method" tab
   - Find "Google" in the list of providers
   - Click on "Google"
   - Toggle "Enable" to ON
   - Add your support email (required)
   - Click "Save"

## Step 3: Register Your Web App

1. **Add Web App**
   - Go to Project Settings (gear icon at top left)
   - Scroll down to "Your apps" section
   - Click the web icon (`</>`) to add a web app
   - Enter an app nickname (e.g., "Firebase Auth Demo")
   - Check "Also set up Firebase Hosting" if you plan to use Firebase Hosting
   - Click "Register app"

2. **Get Configuration**
   - You'll see a configuration object that looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyC...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```
   - Copy the `apiKey`, `projectId`, and `appId` values
   - You'll need these for your environment variables

## Step 4: Configure Authorized Domains

1. **Add Development Domain**
   - In Authentication > Settings > Authorized domains
   - Click "Add domain"
   - Add `localhost` for local development
   - If using Replit, add your Replit URL (e.g., `your-repl-name.your-username.repl.co`)

2. **Add Production Domain**
   - When you deploy, add your production domain
   - Examples: `yourapp.vercel.app`, `yourapp.netlify.app`

## Step 5: Environment Configuration

Create a `.env` file in your project root with these values:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

**Replace the placeholder values with your actual Firebase configuration values.**

## Step 6: Test Your Setup

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Navigate to the login page**
   - Open http://localhost:5000/login
   - Click "Continue with Google"
   - Complete the Google sign-in flow

3. **Verify authentication**
   - You should be redirected to the dashboard
   - Your user information should be displayed
   - Check the Firebase Console > Authentication > Users to see your user

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Check that your API key is correct in the `.env` file
   - Ensure the environment variable is prefixed with `VITE_`

2. **"This domain is not authorized for OAuth operations"**
   - Add your domain to Authorized domains in Firebase Console
   - For local development, ensure `localhost` is added

3. **Popup blocked error**
   - The app automatically falls back to redirect flow
   - Allow popups for your domain or use redirect flow

4. **User not appearing in Firebase Console**
   - Check that you're looking at the correct Firebase project
   - Verify the project ID in your configuration

### Additional Configuration

#### Custom Domain (Optional)
If you have a custom domain:
1. Add it to Authorized domains
2. Update your Firebase Hosting configuration if using Firebase Hosting

#### Email Templates (Optional)
Customize email templates in Authentication > Templates:
- Email verification
- Password reset
- Email address change

## Security Best Practices

1. **Restrict API Key Usage**
   - In Google Cloud Console, restrict your API key to specific websites
   - Add only your production domains

2. **Set Up Security Rules**
   - If using Firestore, configure proper security rules
   - Ensure users can only access their own data

3. **Monitor Usage**
   - Check Firebase Console regularly for unusual activity
   - Set up budget alerts in Google Cloud Console

## Next Steps

After successful setup:

1. **Customize the UI** to match your brand
2. **Add additional auth providers** (GitHub, Facebook, etc.)
3. **Implement user profiles** with Firestore
4. **Set up email verification** if required
5. **Deploy to production** and update authorized domains

## Support

If you encounter issues:
- Check the [Firebase Documentation](https://firebase.google.com/docs/auth)
- Review common issues in this project's GitHub issues
- Create a new issue with detailed error messages

---

**Developed and open sourced by [Autosterea](https://autosterea.com)**

Created by [Ravi Dewangan](https://github.com/autosterea) • Available on [GitHub](https://github.com/autosterea/FireAuthFlow)