import { auth,db } from '../config/firebaseConfig.js';
import { addUsuario } from '../repositories/usuarioRepository.js';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const registrarUsuario = async (email, password) => {
  try {  
    let cred = await createUserWithEmailAndPassword(auth, email, password)
    return addUsuario(cred.user.uid, cred.user.email)
  }
  catch (error) {
    console.log(error)
  }

};

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logout = () => {
  return signOut(auth);
};

export { registrarUsuario, login, logout };