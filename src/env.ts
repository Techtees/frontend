import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production', 'preview']).default('development'),
    SESSION_SECRET: z.string().min(32),
    HOST_URL: z.string(),
    S3_ACCESS_KEY_ID: z.string(),
    S3_SECRET_ACCESS_KEY: z.string(),
    S3_ENDPOINT: z.string().url(),
    S3_PUB_LAB_ACCESS_URL: z.string()
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    NEXT_PUBLIC_BASE_ASSET_URL: z.string().url(),

    NEXT_PUBLIC_S3_PUB_LAB_ACCESS_URL: z.string().url(),
    NEXT_PUBLIC_S3_LAB_BUCKET_NAME: z.string(),

    NEXT_PUBLIC_FIREBASE_API_KEY: z.string(),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string(),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string(),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string(),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string(),
    NEXT_PUBLIC_FIREBASE_APP_ID: z.string(),
    NEXT_PUBLIC_FIREBASE_VAPID: z.string()
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV:
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_VERCEL_ENV
        : process.env.NODE_ENV,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_BASE_ASSET_URL: process.env.NEXT_PUBLIC_BASE_ASSET_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    HOST_URL: process.env.HOST_URL,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    NEXT_PUBLIC_S3_LAB_BUCKET_NAME: process.env.NEXT_PUBLIC_S3_LAB_BUCKET_NAME,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_PUB_LAB_ACCESS_URL:
      process.env.S3_PUB_LAB_ACCESS_URL ?? 'pub-e55e56449ffc4dd19126603054d607a9.r2.dev',
    NEXT_PUBLIC_S3_PUB_LAB_ACCESS_URL: process.env.NEXT_PUBLIC_S3_PUB_LAB_ACCESS_URL,

    NEXT_PUBLIC_FIREBASE_API_KEY:
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? 'AIzaSyAFwrZImLqktIZ6Ui44N5Gzbxn4sk6L6AA',
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'nbiotek-5328a.firebaseapp.com',
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'nbiotek-5328a',
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? 'nbiotek-5328a.firebasestorage.app',
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '762574865509',
    NEXT_PUBLIC_FIREBASE_APP_ID:
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '1:762574865509:web:8a6bfba4fb0fb1b2e8b28c',
    NEXT_PUBLIC_FIREBASE_VAPID:
      process.env.NEXT_PUBLIC_FIREBASE_VAPID ??
      'BP7f9QcvbP-0DgzNuGCtTCPJl-T2s5Z7yQxIm5juA8mGQu_nZwBzNXEW49jtKW9e7sgm4wzVJgdg9D1_b7x2_do'
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true
});
