const seccionAtaque = document.getElementById('seleccionar-ataque')
const seccionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('reiniciar')

const seccionSeleccionMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')

const contenedorAtaques = document.getElementById('contenedor-ataques')


let inputGorila 
let inputLeopardo 
let inputZorro

let ataqueFuegobt 
let ataqueAguabt
let ataqueTierrabt 

let ataqueJugadorSec
let ataqueEnemigo

let vidasJugador = 3 
let vidasEnemigo = 3

let mascotaJugador
let opcionDeMokepones

let botones = []

let ataquesMokeponEnemigo

let indexAtaqueJugador
let indexAtaqueEnemigo

let victoriasJugador = 0
let victoriasEnemigo = 0

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let mokepones = []

let gorila = new Mokepon("Gorila", "./assets/gorila.png", 5)
let leopardo = new Mokepon("Leopardo", "./assets/leopardo.png", 5)
let zorro = new Mokepon("Zorro", "./assets/zorro.png", 5)

gorila.ataques.push(
    {nombre: "tierra", id: "boton-tierra"},
    {nombre: "tierra", id: "boton-tierra"},
    {nombre: "tierra", id: "boton-tierra"},
    {nombre: "agua", id: "boton-agua"},
    {nombre: "fuego", id: "boton-fuego"}
)

leopardo.ataques.push(
    {nombre: "agua", id: "boton-agua"},
    {nombre: "agua", id: "boton-agua"},
    {nombre: "agua", id: "boton-agua"},
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "tierra", id: "boton-tierra"}
)

zorro.ataques.push(
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "fuego", id: "boton-fuego"},
    {nombre: "agua", id: "boton-agua"},
    {nombre: "tierra", id: "boton-tierra"}
)

mokepones.push(gorila, leopardo, zorro)

function iniciarJuego()
{
    seccionAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>   
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        spanVidasJugador.innerHTML = vidasJugador
        spanVidasEnemigo.innerHTML = vidasEnemigo

        inputGorila = document.getElementById('Gorila')
        inputLeopardo = document.getElementById('Leopardo')
        inputZorro = document.getElementById('Zorro')
    })

    seccionReiniciar.style.display = 'none'
    //Agregar el atributo de escucha de eventos, para este caso se escucha el evento de click sobr el boton.
    //@param: click, tipo de acción a escuchar del botón
    //@param: funcióv+n, función a ejecutar al hacer click en el botón, tipo de acción a escuchar del botón
    botonMascotaJugador.addEventListener('click', seleccionarMascota)
    botonReiniciar.addEventListener('click', reiniciar)
}

function seleccionarMascota()
{
    seccionSeleccionMascota.style.display = 'none'
    seccionAtaque.style.display = 'flex'

    if(inputGorila.checked)
    {
        spanMascotaJugador.innerHTML = inputGorila.id
        mascotaJugador = inputGorila.id
    }
    else if(inputLeopardo.checked)
    {
        spanMascotaJugador.innerHTML = inputLeopardo.id
        mascotaJugador = inputLeopardo.id
    }
    else if(inputZorro.checked)
    {
        spanMascotaJugador.innerHTML = inputZorro.id
        mascotaJugador = inputZorro.id
    }
    else
    {
        alert('Debe seleccionar una mascota')
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo()
{
    mascotaAleatoria = mokepones[aleatorio(0,mokepones.length-1)]
    spanMascotaEnemigo.innerHTML = mascotaAleatoria.nombre
    ataquesMokeponEnemigo = mascotaAleatoria.ataques

    botonesAtaques()
}

function botonesAtaques()
{   
    extraerAtaques(mascotaJugador).forEach(ataque => {
        botonAtaqueMascota = `
        <button id = ${ataque.id} class="boton-de-ataque BAtaque"> ${ataque.nombre} </button> 
        `
        contenedorAtaques.innerHTML += botonAtaqueMascota
    })

    ataqueFuegobt = document.getElementById('boton-fuego')
    ataqueAguabt = document.getElementById('boton-agua')
    ataqueTierrabt = document.getElementById('boton-tierra')

    botones = document.querySelectorAll(".BAtaque")

    secuenciaAtaque()
}

function extraerAtaques(nombreMasctota)
{
    let resAtaque 
    mokepones.forEach(mokepon => {
        if(mokepon.nombre === nombreMasctota)
        {
            resAtaque = mokepon.ataques
        }
    })

    return resAtaque
}

function secuenciaAtaque()
{
    botones.forEach(boton =>{
        boton.addEventListener("click", (e) => {

            let elemento = document.createElement('p')
            elemento.textContent = e.target.textContent.trim()
            ataquesDelJugador.appendChild(elemento)
            ataqueJugadorSec = e.target.textContent.trim()
            
            ataqueAleatorioEnemigo()
        })
    })
}

function ataqueAleatorioEnemigo()
{
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length-1)

    let elemento = document.createElement("p")
    let ataqueAct = ataquesMokeponEnemigo[ataqueAleatorio].nombre
    elemento.textContent = ataqueAct
    ataqueEnemigo = ataqueAct

    ataquesDelEnemigo.appendChild(elemento)

    resultado()
}


function crearMensaje(mensaje)
{
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = mensaje
    nuevoAtaqueDelJugador.innerHTML = ataqueJugadorSec
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    // ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    // ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal)
{
    document.getElementById('resultado').innerHTML = resultadoFinal
    
    ataqueFuegobt.disabled = true

    ataqueAguabt.disabled = true

    ataqueTierrabt.disabled = true

    seccionReiniciar.style.display = 'block'

}


function resultado()
{
    if(ataqueJugadorSec == ataqueEnemigo)
    {
        crearMensaje("EMPATE")
    }
    else if(ataqueJugadorSec == "fuego" && ataqueEnemigo == "tierra")
    {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }
    else if(ataqueJugadorSec == "agua" && ataqueEnemigo == "fuego")
    {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo

    }
    else if(ataqueJugadorSec == "tierra" && ataqueEnemigo == "agua")
    {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo

    }
    else{
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador

    }
    revisarVidas()
}

function revisarVidas()
{
    if(vidasJugador > 0 && vidasEnemigo == 0)
    {
        crearMensajeFinal("HAS GANADO LA GUERRA")
    }
    else if(vidasEnemigo > 0 && vidasJugador == 0)
    {
        crearMensajeFinal("HAS PERDIDO LA GUERRA :(")
    }
}

function reiniciar()
{
    location.reload()
}

function aleatorio(min, max)
{
    return Math.floor(Math.random()*(max-min+1)) + min;
}

//Acción que escucha cuando el evento de carga total de la pagina se completó
window.addEventListener('load', iniciarJuego)