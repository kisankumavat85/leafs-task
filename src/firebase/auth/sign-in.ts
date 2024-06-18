import firebaseApp from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);

export default async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return { user: res.user, error: false, message: "User logged in" };
  } catch (error) {
    return { error: true, message: "Invalid email or password" };
  }
}
