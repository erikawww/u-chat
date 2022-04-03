// botones
let btnIngresar = document.querySelector('.ingresar')
let btnRegistrar = document.querySelector('.registrar')
let aRegistro = document.querySelector('#aRegistro')
let aIngreso = document.querySelector('#aIngreso')

// pantallas
let inicio = document.querySelector('.inicio')
let ingreso  = document.querySelector('.ingreso')
let registro = document.querySelector('.registro')
// Todas las pantallas
let pantallas = document.querySelectorAll('.screen')




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

