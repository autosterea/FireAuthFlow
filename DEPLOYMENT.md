# Deployment Guide

This guide covers deploying your Firebase Authentication app to various hosting platforms.

## Prerequisites

- Completed Firebase setup
- Working authentication locally
- Production Firebase configuration

## Platform-Specific Deployments

### 1. Replit Deployment

Replit provides one-click deployment for this project.

#### Steps:
1. **Fork/Import Project**
   - Import this repository to Replit
   - Or fork if already on Replit

2. **Set Environment Variables**
   - Go to the "Secrets" tab in Replit
   - Add your Firebase environment variables:
     ```
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

3. **Run the Project**
   - Click the "Run" button
   - Your app will be available at `https://your-repl-name.your-username.repl.co`

4. **Update Firebase Authorized Domains**
   - Add your Replit URL to Firebase Console > Authentication > Settings > Authorized domains

#### Replit Benefits:
- Automatic HTTPS
- Built-in environment variables
- Zero configuration deployment
- Automatic restarts

### 2. Vercel Deployment

Vercel provides excellent React deployment with automatic builds.

#### Steps:
1. **Connect GitHub Repository**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables**
   - In Vercel dashboard > Settings > Environment Variables
   - Add your Firebase variables:
     ```
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

4. **Deploy**
   - Click "Deploy"
   - Your app will be available at `https://your-app.vercel.app`

5. **Update Firebase Authorized Domains**
   - Add your Vercel URL to Firebase authorized domains

#### Vercel Benefits:
- Automatic deployments on git push
- Preview deployments for pull requests
- Custom domains
- Analytics

### 3. Netlify Deployment

Netlify offers simple static site hosting with continuous deployment.

#### Steps:
1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Set Environment Variables**
   - Go to Site settings > Environment variables
   - Add your Firebase variables:
     ```
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

4. **Deploy**
   - Click "Deploy site"
   - Your app will be available at `https://your-app.netlify.app`

5. **Update Firebase Authorized Domains**
   - Add your Netlify URL to Firebase authorized domains

#### Netlify Benefits:
- Form handling
- Serverless functions
- Branch previews
- Custom domains

### 4. Firebase Hosting

Deploy directly to Firebase for optimal integration.

#### Steps:
1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory to `dist`
   - Configure as single-page app: Yes
   - Don't overwrite index.html

4. **Build Your App**
   ```bash
   npm run build
   ```

5. **Deploy**
   ```bash
   firebase deploy
   ```

6. **Your app will be available at:**
   ```
   https://your-project-id.web.app
   ```

#### Firebase Hosting Benefits:
- Tight Firebase integration
- Global CDN
- Automatic SSL
- Custom domains

## Environment Variables for Production

### Required Variables
```env
VITE_FIREBASE_API_KEY=your_production_api_key
VITE_FIREBASE_PROJECT_ID=your_production_project_id
VITE_FIREBASE_APP_ID=your_production_app_id
```

### Setting Variables by Platform

#### Replit
- Secrets tab in the workspace

#### Vercel
- Dashboard > Settings > Environment Variables

#### Netlify
- Site settings > Environment variables

#### Others
- Check your platform's documentation for environment variable configuration

## Post-Deployment Checklist

### 1. Update Firebase Configuration
- [ ] Add production domain to Firebase Authorized domains
- [ ] Test authentication flow on production
- [ ] Verify user creation in Firebase Console

### 2. Test Core Functionality
- [ ] Home page loads correctly
- [ ] Google sign-in works
- [ ] User dashboard displays correctly
- [ ] Sign-out functionality works
- [ ] Protected routes are secure

### 3. Performance Optimization
- [ ] Check Lighthouse scores
- [ ] Optimize images if any
- [ ] Enable compression if available
- [ ] Set up monitoring/analytics

### 4. Security Review
- [ ] Verify authorized domains are correct
- [ ] Check Firebase Security Rules if using Firestore
- [ ] Review API key restrictions
- [ ] Ensure environment variables are secure

## Monitoring and Maintenance

### Firebase Monitoring
- Monitor authentication metrics in Firebase Console
- Set up alerts for unusual activity
- Review user growth and engagement

### Application Monitoring
- Use Vercel Analytics, Netlify Analytics, or Google Analytics
- Monitor error rates and performance
- Set up uptime monitoring

### Updates and Maintenance
- Keep dependencies updated
- Monitor for Firebase SDK updates
- Review and update documentation
- Regular security audits

## Troubleshooting Deployment Issues

### Common Problems

1. **Build Fails**
   ```
   Error: Environment variables not found
   ```
   - Ensure all `VITE_` prefixed variables are set
   - Check variable names match exactly

2. **Authentication Not Working**
   ```
   Error: This domain is not authorized
   ```
   - Add your production domain to Firebase Authorized domains
   - Wait a few minutes for changes to propagate

3. **App Not Loading**
   ```
   404 Error on refresh
   ```
   - Configure your hosting platform for single-page applications
   - Set up proper redirect rules

4. **CORS Errors**
   ```
   Cross-origin request blocked
   ```
   - Ensure your domain is in Firebase authorized domains
   - Check API key restrictions in Google Cloud Console

### Getting Help

1. **Check deployment logs** on your hosting platform
2. **Review Firebase Console** for authentication errors
3. **Test locally** with production environment variables
4. **Check platform documentation** for specific issues
5. **Create an issue** in this project's repository

## Custom Domain Setup

### 1. Purchase Domain
- Use any domain registrar (Namecheap, GoDaddy, etc.)

### 2. Configure DNS
- Point domain to your hosting platform
- Follow platform-specific DNS configuration

### 3. Update Firebase
- Add custom domain to Firebase Authorized domains
- Update any hardcoded URLs in your app

### 4. SSL Certificate
- Most platforms provide automatic SSL
- Verify HTTPS is working correctly

## Scaling Considerations

### Traffic Growth
- Monitor Firebase Authentication quotas
- Consider Firebase Authentication pricing
- Plan for database scaling if using Firestore

### Performance
- Implement code splitting if app grows
- Optimize bundle size
- Use caching strategies

### Security
- Regular security audits
- Monitor for suspicious activity
- Keep dependencies updated

---

**Your Firebase Authentication app is now ready for production!** 🚀