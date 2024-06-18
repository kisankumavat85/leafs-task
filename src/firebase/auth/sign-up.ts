import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import firebaseApp from "../config";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export const signUp = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, {
      displayName: name,
    });

    const document = doc(db, "users", res.user.uid);
    await setDoc(document, {
      email,
      password,
      name,
      uid: res.user.uid,
    });

    return { user: res.user, error: false, message: "User registered" };
  } catch (error) {
    return { error: true, message: "Could not register user" };
  }
};
