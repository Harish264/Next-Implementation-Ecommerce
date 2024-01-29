import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
  try {
    // Extract the JWT from the "token" cookie, or an empty string if the cookie is not present
    const token = request.cookies.get("token")?.value || "";

    // Verify and decode the JWT using the provided secret (TOKEN_SECRET)
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    // Return the "id" property from the decoded JWT payload
    return decodedToken.id;
  } catch (error) {
    // If there's an error during JWT verification, throw an error with the error message
    throw new Error(error.message);
  }
};
