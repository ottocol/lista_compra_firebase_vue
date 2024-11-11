import {setDoc, doc } from 'firebase/firestore'
import {db} from '../config/firebaseConfig'

function addUsuario(uid, email) {
    return setDoc(doc(db, "usuarios", uid), {
        email: email
    }, {merge: true})
}

export {addUsuario}