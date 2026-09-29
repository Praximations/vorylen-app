import { createPlatformSession } from "@praximations/client";
import { sessionStorage } from "../device/sessionStorage";

const apiUrl = process.env.EXPO_PUBLIC_PRAXIMATION_API_URL;
const authUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const authKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
export const session = apiUrl && authUrl && authKey ? createPlatformSession({ apiUrl, authUrl, authKey }, sessionStorage) : null;
