import { auth } from "../firebaseConfig"; // or wherever your firebase config is

export const getUserToken = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");
  return await user.getIdToken();
};
