# Backend Architecture - Packaging Glamour Employee Portal

## Overview

The application uses a **hybrid backend architecture** combining **Firebase** and **Airtable** for different purposes:

---

## 🔐 Firebase Authentication & Firestore

### What Firebase Handles:
1. **User Authentication** (Firebase Auth)
   - Email/Password authentication
   - User session management
   - Login/Logout functionality
   - Email verification
   - Password reset emails

2. **User Profile Data** (Firestore Database)
   - User metadata (department, displayName, email)
   - Links Firebase UID to employee records
   - Fast access to user department for role-based access control
   - Creation timestamps

### Firebase Structure:
```
Firebase Auth:
- UID: abc123
- Email: john@packglamour.com
- Email Verified: true
- Display Name: John Doe

Firestore Collection "users":
- Document ID: abc123 (same as Firebase UID)
  - displayName: "John Doe"
  - email: "john@packglamour.com"
  - department: "Production"
  - emailVerified: true
  - createdAt: "2025-12-16T..."
```

---

## 📊 Airtable - Business Data Backend

### What Airtable Handles:
All business operations data, HR management, and operational records.

### Airtable Base Structure:

#### Base 1: Employee Management
- **Employees Table**: Complete employee records (position, hire date, manager, address, emergency contacts)
- **Attendance Table**: Clock in/out records, work hours, attendance status
- **Leave Requests Table**: Vacation requests, sick leave, approval workflow

#### Base 2: Operations Management
- **Production Orders Table**: Customer orders, production status, assignments
- **Inventory Items Table**: Stock levels, warehouse locations, suppliers
- **Deliveries Table**: Delivery scheduling, tracking, proof of delivery

#### Base 3: Customer & Sales Management
- **Customers Table**: Client information, account managers, credit limits
- **Sales Leads Table**: Sales pipeline, lead tracking, follow-ups

#### Base 4: Financial Management
- **Invoices Table**: Billing, payment tracking, invoice status
- **Expenses Table**: Business expenses, approval workflow, receipts

#### Base 5: System Administration
- **User Permissions Table**: Fine-grained access control
- **Audit Logs Table**: System activity tracking, compliance

---

## 🔄 How They Work Together

### User Signup Flow:
1. User fills signup form with email, password, name, and **department**
2. Firebase Auth creates user account
3. Firebase sends **email verification email**
4. User redirected to `/verify-email` page
5. Firestore stores user metadata with department
6. (Optional) Create corresponding Airtable employee record

### Login Flow:
1. User logs in with email/password
2. Firebase Auth validates credentials
3. Check if email is verified → if not, redirect to `/verify-email`
4. Fetch user department from Firestore
5. Apply role-based access control based on department
6. Load business data from Airtable as needed

### Password Reset Flow:
1. User clicks "Forgot Password" on login page
2. Enters email address
3. Firebase sends **password reset email** with secure link
4. User clicks link in email → redirected to Firebase-hosted reset page
5. User enters new password
6. Password updated in Firebase Auth
7. User can login with new password

---

## ✅ Email Verification Status

### ✨ Email Verification is NOW WORKING!

When a user signs up:
1. ✅ Account is created in Firebase Auth
2. ✅ **Verification email is automatically sent**
3. ✅ User is redirected to `/verify-email` page
4. ✅ User clicks link in email to verify
5. ✅ User returns and clicks "I've Verified My Email"
6. ✅ System checks `emailVerified` status
7. ✅ If verified → access granted to dashboard
8. ✅ If not verified → stays on verification page
9. ✅ Can resend verification email if needed

### Email Verification Page Features:
- Clear instructions for users
- "Resend Email" button
- "I've Verified My Email" refresh button
- Logout option to use different account
- Automatic redirect if already verified

---

## ✅ Password Reset Status

### ✨ Password Reset is WORKING!

The forgot password flow:
1. ✅ User navigates to `/forgot-password`
2. ✅ Enters email address
3. ✅ Firebase sends **reset email** with secure link
4. ✅ Email includes:
   - Reset link (valid for 1 hour)
   - Security notice
   - Branded from Firebase
5. ✅ User clicks link → Firebase-hosted reset page
6. ✅ User enters new password (min 6 characters)
7. ✅ Password updated in Firebase
8. ✅ Success confirmation shown
9. ✅ User can login with new password

### Forgot Password Page Features:
- Email input with validation
- Error handling (user-not-found, invalid-email)
- Success confirmation after sending
- Cancel button to return to login
- Professional UI matching the app theme

---

## 🎯 Why This Hybrid Approach?

### Firebase Advantages:
- ✅ Built-in authentication security
- ✅ Email verification out-of-the-box
- ✅ Password reset functionality
- ✅ Fast session management
- ✅ Secure token-based auth
- ✅ Free tier for small teams

### Airtable Advantages:
- ✅ Spreadsheet-like interface for data management
- ✅ Non-technical staff can manage data
- ✅ Rich field types (attachments, links, formulas)
- ✅ Built-in views and filters
- ✅ Easy to create reports
- ✅ No backend coding required
- ✅ Webhook support for real-time updates
- ✅ Mobile app for on-the-go access

### Best of Both Worlds:
- **Firebase** = Authentication, security, user management
- **Airtable** = Business data, operations, reporting
- Clean separation of concerns
- Each tool does what it does best

---

## 🔧 Environment Variables Needed

### Firebase (Already Configured):
```env
VITE_FIREBASE_API_KEY=AIzaSyAgeAeFQzlbw3uDzfIHiSsEnwNC_DLgQPw
VITE_FIREBASE_AUTH_DOMAIN=packaging-glamour-portal.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=packaging-glamour-portal
VITE_FIREBASE_STORAGE_BUCKET=packaging-glamour-portal.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=132098094476
VITE_FIREBASE_APP_ID=1:132098094476:web:09a595d60a714db57392a9
VITE_FIREBASE_MEASUREMENT_ID=G-V11CX5MDM5
```

### Airtable (To Be Configured):
```env
VITE_AIRTABLE_API_KEY=your_api_key_here
VITE_AIRTABLE_BASE_EMPLOYEES=base_id_here
VITE_AIRTABLE_BASE_OPERATIONS=base_id_here
VITE_AIRTABLE_BASE_SALES=base_id_here
VITE_AIRTABLE_BASE_FINANCIAL=base_id_here
VITE_AIRTABLE_BASE_SYSTEM=base_id_here
```

---

## 📋 Setup Checklist

### Firebase Setup (✅ DONE):
- [x] Create Firebase project
- [x] Enable Email/Password authentication
- [x] Enable Firestore database
- [x] Configure email verification
- [x] Configure password reset
- [x] Add environment variables to `.env`
- [x] Add environment variables to Cloudflare Pages

### Airtable Setup (📝 TODO):
1. Create 5 Airtable bases following `AIRTABLE_SCHEMA.md`
2. Set up tables with correct field types
3. Generate API key from Airtable account settings
4. Copy Base IDs from each base URL
5. Add all environment variables to `.env`
6. Add all environment variables to Cloudflare Pages
7. Test connections from admin pages

---

## 🚀 Current Status

### Working Features:
- ✅ User signup with department selection
- ✅ **Email verification with auto-send**
- ✅ **Password reset via email**
- ✅ Login with email/password
- ✅ Role-based access control (department-based)
- ✅ Department-filtered app modules
- ✅ User profile with department display
- ✅ Logout functionality
- ✅ Protected routes
- ✅ Email verification enforcement

### Ready for Airtable Integration:
- ✅ Complete Airtable service with all API methods
- ✅ Admin dashboard UI (System Admin)
- ✅ Employee management UI (HR)
- ✅ Attendance tracking UI
- ✅ Leave request management UI
- ⏳ Awaiting Airtable base setup and API keys

---

## 📧 Email Templates

### Verification Email (Firebase Default):
- Subject: "Verify your email for Packaging Glamour"
- Contains verification link
- Link expires in 1 hour
- Professional Firebase branding

### Password Reset Email (Firebase Default):
- Subject: "Reset your password for Packaging Glamour"
- Contains reset link
- Link expires in 1 hour
- Security warning about unsolicited emails
- Professional Firebase branding

### Customization Options:
You can customize these emails in Firebase Console:
1. Go to Authentication → Templates
2. Edit Email verification template
3. Edit Password reset template
4. Add custom branding, logos, colors
5. Modify email copy and language

---

## 🔒 Security Features

### Authentication Security:
- ✅ Secure password hashing (Firebase)
- ✅ Token-based session management
- ✅ Email verification required
- ✅ Password reset with secure links
- ✅ Automatic session timeout
- ✅ Protected API endpoints

### Data Security:
- ✅ Firestore security rules (user-specific data)
- ✅ Airtable API key authentication
- ✅ Environment variables for sensitive data
- ✅ No hardcoded credentials
- ✅ HTTPS-only connections

### Access Control:
- ✅ Department-based permissions
- ✅ Route-level protection
- ✅ App-level access control
- ✅ Email verification enforcement
- ✅ Audit logging (Airtable)

---

## 📞 Support & Troubleshooting

### Common Issues:

**"Email verification not received"**
- Check spam/junk folder
- Use "Resend Email" button
- Verify email address is correct
- Check Firebase email delivery in console

**"Password reset email not received"**
- Check spam/junk folder
- Verify email address exists in system
- Firebase shows "user-not-found" if email doesn't exist
- Try again after a few minutes

**"Stuck on verification page after verifying"**
- Click "I've Verified My Email" button
- This refreshes the page and checks verification status
- May take a few seconds for Firebase to update

**"Can't access certain apps"**
- Check your department assignment
- Only apps assigned to your department are visible
- Contact HR or IT admin to change department
- Management department has access to all apps

---

## 🎨 Branding Customization

To fully brand the authentication emails:

1. **Firebase Console** → Authentication → Templates
2. Customize email templates with:
   - Company logo
   - Brand colors
   - Custom messaging
   - Contact information
   - Social media links

3. **Custom Domain** (Optional):
   - Set up custom email domain in Firebase
   - Emails will come from `noreply@packglamour.com`
   - Increases trust and deliverability

---

## Summary

**Backend:** Hybrid Firebase + Airtable
**Authentication:** ✅ Firebase Auth (working)
**Email Verification:** ✅ Working (auto-send on signup)
**Password Reset:** ✅ Working (via Forgot Password page)
**User Data:** Firebase Firestore
**Business Data:** Airtable (ready, awaiting setup)
**Security:** ✅ Email verification enforced
**Status:** Production-ready for auth, awaiting Airtable configuration
