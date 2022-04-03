// botones
let btnIngresar = document.querySelector('.ingresar')
let btnRegistrar = document.querySelector('.registrar')
let aRegistro = document.querySelector('#aRegistro')
let aIngreso = document.querySelector('#aIngreso')
let enviar = document.querySelector('#enviar')
let menu = document.querySelector('.hamburger')
// pantallas
let inicio = document.querySelector('.inicio')
let ingreso  = document.querySelector('.ingreso')
let registro = document.querySelector('.registro')
let chat = document.querySelector('.container-chat')
// Todas las pantallas
let pantallas = document.querySelectorAll('.screen')
// componentes
let navLinks = document.querySelector('.nav-links')



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
        }else{
            navLinks.classList.remove('active-menu')
            
        }
    })
}

abrirMenu()