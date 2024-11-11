// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";


// https://firebase.google.com/docs/web/setup#available-libraries

// No ponemos configuración porque vamos a ejecutarlo contra los emuladores
//Si quisiéramos usar un backend en la nube habría que poner la configuración
let firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

// Si estamos en modo desarrollo (esta forma de detectarlo solo vale para Vite)
if (import.meta.env.DEV) {
  //si el id del proyecto comienza por "demo" y se ejecuta contra los emuladores
  //no mirará si existe un proyecto en la nube. Si no comienza por "demo", aunque
  //se ejecute en los emuladores el proyecto deberá estar creado en Firebase
  firebaseConfig.projectId = "demo-mi-demo"
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//conectar con los emuladores si estamos en modo desarrollo
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  
}

export { auth, db };


