import { handlers } from "@/server/auth/config"

/**
 * API route for authentication (NextAuth.js handlers).
 * Handles authentication requests via GET and POST methods.
 */
export const { GET, POST } = handlers