import { clerkClient } from '@clerk/clerk-sdk-node';

// This is a simpler middleware approach for React Router applications
// In a React Router app, we don't need the full middleware functionality that Next.js offers
// Instead, we'll use the Protected Routes pattern we implemented in App.tsx

// Export a simple verification function that can be used in components if needed
export async function verifyAuth(token) {
  try {
    const client = clerkClient();
    const { sub, sid } = await client.verifyToken(token);
    return { userId: sub, sessionId: sid };
  } catch (error) {
    return null;
  }
}

// No matchers needed for React Router - we handle protected routes in App.tsx component 