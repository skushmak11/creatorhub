/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAIL_SERVICE: string
  readonly VITE_FROM_EMAIL: string
  readonly VITE_FROM_NAME: string
  readonly VITE_SENDGRID_API_KEY: string
  readonly VITE_MAILGUN_API_KEY: string
  readonly VITE_MAILGUN_DOMAIN: string
  readonly VITE_AWS_ACCESS_KEY_ID: string
  readonly VITE_AWS_SECRET_ACCESS_KEY: string
  readonly VITE_AWS_REGION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
