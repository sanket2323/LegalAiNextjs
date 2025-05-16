import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Save user to Firestore
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);
    
    // If the user doesn't exist, create a new document
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        // Map user to your existing user structure if needed
        id: user.uid, // Assuming your Session type uses 'id'
        name: user.displayName,
        image: user.photoURL
      });
    } else {
      // Update the last login time
      await setDoc(userRef, {
        lastLogin: serverTimestamp()
      }, { merge: true });
    }
    
    return user;
  } catch (error) {
    console.error('Error signing in with Google', error);
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    window.location.href = '/'; // Redirect to home page after logout
  } catch (error) {
    console.error('Error signing out', error);
    throw error;
  }
};