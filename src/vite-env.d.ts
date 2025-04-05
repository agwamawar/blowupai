
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_GOOGLE_CLIENT_SECRET: string
  
  // Added environment variables for server-side services
  readonly FIREBASE_PROJECT_ID: string
  readonly FIREBASE_CLIENT_EMAIL: string
  readonly FIREBASE_PRIVATE_KEY: string
  readonly VERTEX_PROJECT_ID: string
  readonly VERTEX_LOCATION: string
  readonly VERTEX_CLIENT_EMAIL: string
  readonly VERTEX_PRIVATE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
