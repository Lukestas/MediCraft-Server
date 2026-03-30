process.loadEnvFile();
export const PORT = process.env.PORT ?? 3001;
export const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS?.split(',') ?? [];
export const MONGODB_API = process.env.MONGODB_API ?? '';

