const { OAuth2Client } = require("google-auth-library");

// Google Sign In
const clientId = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);

export const verifyGoogleUser = async (token: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });

    const payload = await ticket?.getPayload();

    const { sub, email, name } = payload;
    return {
      userId: sub,
      email,
      name,
    };
  } catch (error) {
    console.log("error", error);
    return { userId: undefined, email: undefined, name: undefined };
  }
};
