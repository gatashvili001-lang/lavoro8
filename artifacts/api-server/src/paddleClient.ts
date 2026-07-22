import { Environment, Paddle } from "@paddle/paddle-node-sdk";

let _paddle: Paddle | null = null;

export function getPaddleClient(): Paddle {
  if (_paddle) return _paddle;
  const key = process.env.PADDLE_API_KEY;
  if (!key) throw new Error("PADDLE_API_KEY is not set");
  _paddle = new Paddle(key, { environment: Environment.production });
  return _paddle;
}

export const PRICE_IDS = {
  employer_monthly: process.env.PADDLE_EMPLOYER_MONTHLY_PRICE_ID ?? "pri_01ky2dh25pr1mjyzpdngq46t54",
  employer_yearly: process.env.PADDLE_EMPLOYER_YEARLY_PRICE_ID ?? "pri_01ky2dh27wjgep26f26qphq0jy",
  seeker_monthly: process.env.PADDLE_SEEKER_MONTHLY_PRICE_ID ?? "pri_01ky2dh2dprzb9x79zkh4n93kg",
};
