import axios from 'axios';
import { getAuth } from 'firebase/auth';

const getFirebaseToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    return token;
  } else {
    throw new Error('User not authenticated');
  }
};

export {getFirebaseToken}
