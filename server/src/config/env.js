import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CLIENT_URL = process.env.CLIENT_URL;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!MONGO_URI) {
  throw new Error(
    "MONGO_URI is missing in environment variables"
  );
}

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET is missing in environment variables"
  );
}