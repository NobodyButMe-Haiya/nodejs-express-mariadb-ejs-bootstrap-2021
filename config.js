import { config } from 'dotenv'
config();
export const host = process.env.host;
export const database = process.env.database;
export const user = process.env.user;
export const password = process.env.password;
