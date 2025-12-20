# Backend (.env) Configuration

This file contains the environment variables required for the backend server of the Forever E-commerce project. These variables are essential for connecting to the database, handling authentication, and integrating with Cloudinary for file uploads.

## Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT authentication
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `ADMIN_EMAIL` = your_admin_email
- `ADMIN_PASSWORD` = your_admin_password
- `STRIPE_SECRET_KEY` = your_stripe_secret_key

```

## Usage

1. Create a `.env` file in the `backend/` directory.
2. Add your credentials and secrets as shown above.
3. Do not share your `.env` file publicly or commit it to version control.

## Security

- Keep your secrets safe and never expose them in public repositories.
- Use environment variables for sensitive information.

---
```
