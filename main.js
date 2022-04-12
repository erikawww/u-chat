
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
    import { 
    getDatabase, 
    ref, 
    onValue, 
    onChildAdded, 
    // onChildChanged, 
    // onChildRemoved, 
    query, 
    orderByChild, 
    // limitToFirst,
    limitToLast,
    // startAt,
    // set,
    push,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updatePassword,
    sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyBTEtPhgZBt_ID3njKiHYjwKRoR9aNwAg4",
    authDomain: "u-chat-882d4.firebaseapp.com",
    databaseURL: "https://u-chat-882d4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "u-chat-882d4",
    storageBucket: "u-chat-882d4.appspot.com",
    messagingSenderId: "390122048282",
    appId: "1:390122048282:web:1a472311dd7de0478c7aa3",
    measurementId: "G-QNB3FEPL1Q"
    };

 // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getDatabase();
 // Referencias
    const refTextos = ref(db, "textos/")
    const refMensajes = ref(db, "mensajes/")
 // Querys
    const queryMensajes = query(refMensajes, orderByChild('fecha/'))
    // const querylimitToFirst = query(refMensajes, limitToLast(2))

 // variables
    let titulo = document.getElementById('titulo')
    let desc = document.getElementById('desc')
    let load = document.getElementById('load')
    let chat = document.getElementById('chat')
    let nombre = document.getElementById('nombre')
    let mensaje = document.getElementById('mensaje')
    let login = document.getElementById('log')
    let logGoogle = document.getElementById('logGoogle')
    let logOut = document.getElementById('logOut')
    let chatAction = document.getElementById('chatAction')
  
    let enviar = document.getElementById('enviar')
    
    enviar.addEventListener('click',()=>{
    traemeData()
    });

    onValue(refTextos, (snap)=>{
        let data = snap.val();
        titulo.innerHTML = data.titulo;
        desc.innerHTML = data.desc;
        load.style.display="none";

    });
    onChildAdded(queryMensajes, (snap)=>{
        let data = snap.val();
        let key = snap.key;
        agregarMsg(data)
        // console.log(key, 'onChildAdded queryMensajes: ',data)
        load.style.display="none"
    })

    const agregarMsg = (msj)=>{
        let li_ = document.createElement('li')
        li_.classList.add("burbuja")
        let txt = document.createTextNode(msj.author+' : '+msj.mensaje)
        li_.appendChild(txt)
        li_.setAttribute('id',msj.fecha)
        chat.appendChild(li_)
        document.getElementById(msj.fecha).scrollIntoView({block: 'end', behavior: "smooth"})
    }

    let clicks = document.addEventListener('keyup', (e)=>{
        if (e.keyCode === 13){
        e.preventDefault();
        enviar.click();
        }
    })

    const traemeData = ()=>{
        var fecha = Date.now()
        let msj = {
            author: nombre.value,
            mensaje: mensaje.value,
            fecha: fecha,
        }
        if (nombre.value != "" && mensaje.value != ""){
            push(refMensajes, msj)
            nombre.value = "";
            mensaje.value = "";
        }else{
            alert('hay q respetar')
        }
        console.log(msj)

    }
    const auth = getAuth()
    login.addEventListener('click', ()=>{
        logearUsuario()
    })
        
    const logearUsuario = ()=>{
        auth.languageCode = "es"
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then((result)=>{
                let logUser = {
                    uid: result.user.uid,
                    username: result.user.displayName,
                    profile_picture: result.user.photoURL,
                    email: result.user.email
                }
                nombre.value = result.user.displayName
                chatAction.style.display="block";
                logGoogle.style.display="none"

                console.log('logeado: ', logUser)
            }
        )  
    }
    const desLog = ()=>{
        signOut(auth).then(()=>{
            chatAction.style.display="none"
            logGoogle.style.display="block"
        })
    }
    logOut.addEventListener('click', ()=>{
        desLog()
    })

    onAuthStateChanged(auth, (user)=>{
        if (user){
            nombre.value = user.displayName
            chatAction.style.display="block"
            logGoogle.style.display="none"
        }else{
            null
        }
    })


    // REGISTRAR CON E-MAIL

    // let email = document.getElementById('createmail').value
    // let password = document.getElementById('createpassword').value

    // registrarConEmail = ()=>{
    //     createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredencial)=>{
    //         const user = userCredencial.user
    //     })
    //     .catch((error)=>{
    //         const errorCode = error.code
    //         const errorMessage = error.message
    //     })
    // }
// let logEmail = ()=>{
//     let email = document.getElementById('createmail').value
//     let password = document.getElementById('createpassword').value
//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredencial)=>{
//             const user = userCredencial.user
//         })
//         .catch((error)=>{
//             const errorCode = error.code
//             const errorMessage = error.message
//         })

// }
// CAMBIAR CONTRASEÑA
// let cambiarPass = ()=>{
//     updatePassword(user, newPass).then((res)=>{
//         console.log(res)
//     })
// }

