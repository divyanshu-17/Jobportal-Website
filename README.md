
Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

## Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Demo Accounts

After running the seed command, you can use these accounts:

**Student**

```text
Email: student@jobportal.com
Password: Password123
```

**Recruiter**

```text
Email: recruiter@jobportal.com
Password: Password123
```

## API Overview

### User Routes

```text
POST /api/v1/user/register
POST /api/v1/user/login
GET  /api/v1/user/logout
POST /api/v1/user/profile/update
```

### Job Routes

```text
POST /api/v1/job/post
GET  /api/v1/job/get
GET  /api/v1/job/get/:id
GET  /api/v1/job/getadminjobs
```

### Company Routes

```text
POST /api/v1/company/register
GET  /api/v1/company/get
GET  /api/v1/company/get/:id
PUT  /api/v1/company/update/:id
```

### Application Routes

```text
GET  /api/v1/application/apply/:id
GET  /api/v1/application/get
GET  /api/v1/application/:id/applicants
POST /api/v1/application/status/:id/update
```

## Notes

- User and job data is saved in MongoDB.
- The seed command adds sample jobs and demo accounts for local testing.
- Cloudinary credentials are optional. Without them, the app still works locally, but file uploads will not be stored online.
- The bookmark/save-for-later UI is currently visual only and can be connected to a backend model in a future update.

## Future Improvements

- Add email verification with OTP
- Add password reset
- Add real bookmark/save-for-later functionality
- Add pagination for job listings
- Add recruiter dashboard analytics
- Add resume parsing
- Improve production deployment configuration

## License

This project is for learning and portfolio use.
