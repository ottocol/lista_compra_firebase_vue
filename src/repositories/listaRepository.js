import {db, auth} from '../config/firebaseConfig'
import {doc, collection, query, getDoc, getDocs, setDoc, addDoc, deleteDoc, where} from 'firebase/firestore'

async function getItems() {
    if (!auth.currentUser) throw new Error("usuario no autentificado")
    let q = query(collection(db, "items"), where('uid','==', auth.currentUser.uid))  
    let snapshot = await getDocs(q)
    let results = snapshot.docs.map(item => {
        return {
            id: item.id,
            ...item.data()
        }
    })
    return results
}

async function addItem(nombre) {
    if (!auth.currentUser) throw new Error("usuario no autentificado")
    let nuevo = {nombre: nombre, uid:auth.currentUser.uid, comprado:false}
    let newRef = await addDoc(collection(db, "items"), nuevo)
    return {id: newRef.id, ...nuevo} 
}

async function setItemComprado(id, comprado) {
    if (!auth.currentUser) throw new Error("usuario no autentificado")
    let itemRef = doc(db, "items", id)
    let ok = await itemExisteYHayPermisos(itemRef)
    if (ok) {
        await setDoc(itemRef, {comprado: comprado}, {merge:true})
    }    
}

async function updateItem(id, nuevoNombre) {
    if (!auth.currentUser) throw new Error("usuario no autentificado")
    let itemRef = doc(db, "items", id)
    let ok = await itemExisteYHayPermisos(itemRef)
    if (ok) {
        await setDoc(itemRef, {nombre: nuevoNombre}, {merge:true})
    }
}

async function deleteItem(id) {
    if (!auth.currentUser) throw new Error("usuario no autentificado")
    let itemRef = doc(db, "items", id)
    let ok = await itemExisteYHayPermisos(itemRef)
    if (ok) {
        await deleteDoc(itemRef) 
    }   
}


async function itemExisteYHayPermisos(ref) {
    let itemSnapshot = await getDoc(ref)
    if (!itemSnapshot.exists()) throw new Error("El item no existe")
    if (itemSnapshot.data().uid != auth.currentUser.uid) throw new Error("No tienes permisos")
    return true 
}

export {getItems, addItem, updateItem, setItemComprado, deleteItem}