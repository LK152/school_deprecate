import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { app } from '../config/firebase.config';

export const db = getFirestore(app);
export const auth = getAuth(app);