// botones
let btnIngresar = document.querySelector('.ingresar')
let btnRegistrar = document.querySelector('.registrar')
let aRegistro = document.querySelector('#aRegistro')
let aIngreso = document.querySelector('#aIngreso')
let enviar = document.querySelector('#enviar')
let menu = document.querySelector('.hamburger')
let verClave = document.querySelector('.fa-eye-slash')
let ocultarClave = document.querySelector('.fa-eye')
let botonclave = document.querySelector('.contenedor-clave span')
let clave = document.querySelector('.clave')
let icono = document.querySelector('i')
// pantallas
let inicio = document.querySelector('.inicio')
let ingreso  = document.querySelector('.ingreso')
let registro = document.querySelector('.registro')
let chat = document.querySelector('.container-chat')
let load = document.querySelector('.loading')
// Todas las pantallas
let pantallas = document.querySelectorAll('.screen')
// componentes
let navLinks = document.querySelector('.nav-links')
let contMjs = document.querySelector('.container-mensajes')
let bgcChat = document.querySelector('.bgc-chat')
let userData = document.querySelector('.user-data')
let userPic = document.querySelector('.user-photo')
let userInfo = document.querySelector('user-info')





// Función para pasar a siguiente pantalla y ocultar la anterior.
let nextScreen = (pantalla)=>{
    pantallas.forEach((pantalla)=>{
        pantalla.style.display="none"
    })
    pantalla.style.display="block"
}

btnIngresar.addEventListener('click', ()=>{
    nextScreen(ingreso)
})

btnRegistrar.addEventListener('click', ()=>{
    nextScreen(registro)
})

aIngreso.addEventListener('click', ()=>{
    nextScreen(ingreso)
})
aRegistro.addEventListener('click', ()=>{
    nextScreen(registro)
})

// abrir y cerrar menu
let abrirMenu = ()=>{
    menu.addEventListener('click', ()=>{
        menu.classList.toggle('is-active')
        if (menu.classList.contains('is-active')){
            navLinks.classList.add('active-menu')
            // navLinks.style.width= "60%";
            // navLinks.style.opacity= "1";
            // navLinks.style.visibility="visible";
            // chat.style.overflow="hidden"
            // bgcChat.style.zIndex="2"
            // bgcChat.style.backgroundColor="rgba(0, 0, 0, 0.5)";
        }else{
            navLinks.classList.remove('active-menu')
            // navLinks.style.width= "0";

            // bgcChat.style.backgroxundColor="transparent" 
        }
    })
}
abrirMenu()


// ver y ocultar contraseña
botonclave.addEventListener('click', ()=>{

    clave.classList.toggle('active')
    if (clave.classList.contains('active')){
        icono.classList.remove("fa-eye-slash")
        icono.classList.add("fa-eye")
        clave.setAttribute('type', 'text')
    }else{
        clave.setAttribute('type', 'password')
        icono.classList.add("fa-eye-slash")
        icono.classList.remove("fa-eye")
    }
})


    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
    import { 
    getDatabase, 
    ref, 
    onValue, 
    onChildAdded, 
    query, 
    orderByChild, 
    push,
    } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
    import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    // signInWithRedirect,
    // createUserWithEmailAndPassword,
    // signInWithEmailAndPassword,
    // updatePassword,
    // sendPasswordResetEmail,
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
    //  let titulo = document.getElementById('titulo')
    //  let desc = document.getElementById('desc')
    // let load = document.getElementById('load')
    //  let chat = document.getElementById('chat')
    let nombreUsuario = document.querySelector('.nombreUsuario')
    let pic = document.querySelector('.user-photo img')
    let mail = document.querySelector('.mailUsuario')
    let mensaje = document.getElementById('mensaje')
    let login = document.getElementById('login')
    // let logGoogle = document.getElementById('logGoogle')
    let logOut = document.querySelector('#logOut')

    
    enviar.addEventListener('click',()=>{
    traemeData()
    });

    onValue(refTextos, (snap)=>{
        let data = snap.val();
        load.style.display="none";

    });
    onChildAdded(queryMensajes, (snap)=>{
        let data = snap.val();
        let key = snap.key;
        agregarMsg(data)
        load.style.display="none"
    })

    const agregarMsg = (msj)=>{
        let item = `<li class="burbuja" id="${msj.fecha}"><span>${msj.author}: </span>${msj.mensaje}</li>`
        contMjs.innerHTML += item
        // let item = document.createElement('li')
        // item.classList.add("burbuja")
        // let txt = document.createTextNode(msj.author+' : '+msj.mensaje)
        // item.appendChild(txt)
        // item.setAttribute('id',msj.fecha)
        // contMjs.appendChild(item)
        document.getElementById(msj.fecha).scrollIntoView({block: 'start', behavior: "smooth"})
    }

    let clicks = document.addEventListener('keyup', (e)=>{
        if (e.keyCode === 13){
        e.preventDefault();
        enviar.click();
        }
    })

    const traemeData = ()=>{
        let fecha = Date.now()
        // let hora = Date()
        let msj = {
            author: nombreUsuario,
            mensaje: mensaje.value,
            fecha: fecha,
            // hora: hora,
        }
        if (mensaje.value.trim() != ""){
            push(refMensajes, msj)
            // nombre.value = "";
            mensaje.value = "";
        }else {
            console.log('mensaje vacío')
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
                let nombreUsuario = result.user.displayName
                let pic = result.user.photoURL
                let mail = result.user.email
                
                cargarProfile()
                // chatAction.style.display="block";
                // logGoogle.style.display="none"
                // nextScreen(chat)
                // load.style.display="block"
                console.log('logeado: ', logUser)
            }
        )  
    }

let cargarProfile =()=>{
                    let modeloUser =`<div class="user-photo">
                        <img src="${pic}" alt="tu foto perfil">
                    </div>
                    <div class="user-info">
                        <h3 class="nombreUsuario">${nombreUsuario}</h3>
                        <p class="mailUsuario">${mail}</p>
                    </div>`
    userData.innerHTML = modeloUser
}
    
const desLog = ()=>{
    signOut(auth).then(()=>{
    nextScreen(inicio)
    inicio.style.display="grid"

    })
}
logOut.addEventListener('click', ()=>{
    desLog()
    navLinks.classList.remove('active-menu')
    menu.classList.remove('is-active')
    nextScreen(inicio)
    inicio.style.display="grid"


})


onAuthStateChanged(auth, (user)=>{
    if (user){
        //  nombre.value =
        nombreUsuario = user.displayName 
        mail = user.email
        pic = user.photoURL
        // user.displayName
        nextScreen(chat)
        cargarProfile()

        // console.log(user.displayName)
        //  chat.style.display="block"
        //  logGoogle.style.display="none"
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
