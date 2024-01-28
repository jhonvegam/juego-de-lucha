const seccionAtaque = document.getElementById('seleccionar-ataque')
const seccionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const ataqueFuegobt = document.getElementById('boton-fuego')
const ataqueAguabt = document.getElementById('boton-agua')
const ataqueTierrabt = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('reiniciar')

const seccionSeleccionMascota = document.getElementById('seleccionar-mascota')
const inputHipodoge = document.getElementById('Gorila')
const inputCapipepo = document.getElementById('Leopardo')
const inputRatigueya = document.getElementById('Zorro')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

let ataqueJugador
let ataqueEnemigo

let vidasJugador = 3
let vidasEnemigo = 3

ataques = ['Agua', 'Tierra','Fuego']

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
    }
}

let gorila = new Mokepon("Gorila", "./assets/gorila.png", 5)
let leopardo = new Mokepon("Leopardo", "./assets/leopardo.png", 5)
let zorro = new Mokepon("Zorro", "./assets/zorro.png", 5)

function iniciarJuego()
{
    seccionAtaque.style.display = 'none'
    seccionReiniciar.style.display = 'none'
    //Agregar el atributo de escucha de eventos, para este caso se escucha el evento de click sobr el boton.
    //@param: click, tipo de acción a escuchar del botón
    //@param: funcióv+n, función a ejecutar al hacer click en el botón, tipo de acción a escuchar del botón
    botonMascotaJugador.addEventListener('click', seleccionarMascota)
    ataqueFuegobt.addEventListener('click', ataqueConFuego)
    ataqueAguabt.addEventListener('click', ataqueConAgua)
    ataqueTierrabt.addEventListener('click', ataqueConTierra)
    botonReiniciar.addEventListener('click', reiniciar)
}

function seleccionarMascota()
{
    seccionSeleccionMascota.style.display = 'none'
    seccionAtaque.style.display = 'flex'

    if(inputHipodoge.checked)
    {
        spanMascotaJugador.innerHTML = 'Gorila'
    }
    else if(inputCapipepo.checked)
    {
        spanMascotaJugador.innerHTML = 'Leopardo'
    }
    else if(inputRatigueya.checked)
    {
        spanMascotaJugador.innerHTML = 'Zorro'
    }
    else
    {
        alert('Debe seleccionar una mascota')
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo()
{
    mascotas = ['Gorila', 'Leopardo','Zorro']
    mascotaAleatoria = mascotas[aleatorio(0,2)]
    spanMascotaEnemigo.innerHTML = mascotaAleatoria
}

function ataqueConFuego()
{
    ataqueJugador = 'Fuego'
    ataqueAleatorioEnemigo()
}

function ataqueConAgua()
{
    ataqueJugador = 'Agua'
    ataqueAleatorioEnemigo()
}

function ataqueConTierra()
{
    ataqueJugador = 'Tierra'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo()
{
    if(aleatorio(1,3) == 1)
    {
        ataqueEnemigo = 'Fuego'
    }
    else if(aleatorio(1,3) == 2)
    {
        ataqueEnemigo = 'Agua'
    }
    else
    {
        ataqueEnemigo = 'Tierra'
    }
    crearMensaje()
}

function crearMensaje()
{
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado()
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

    revisarVidas()
}


function revisarVidas()
{
    if(vidasJugador == 0)
    {
        crearMensajeFinal('PERDISTE LA GUERRA')
    }
    else if(vidasEnemigo == 0)
    {
        crearMensajeFinal('GANASTE LA GUERRA')
    }
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
    res = ''
    if (ataqueJugador == ataqueEnemigo){
        res = 'EMPATE'
    }

    else{
        if(ataqueJugador == 'Tierra' && ataqueEnemigo == 'Agua')
        {
            res = 'GANASTE'
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo

        }

        else if(ataqueJugador == 'Fuego' && ataqueEnemigo == 'Tierra')
        {
            res = 'GANASTE'
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo
        }

       else if(ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego')
        {
            res = 'GANASTE'
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo
        }

        else
        {
            res = 'PERDISTE'
            vidasJugador--
            spanVidasJugador.innerHTML = vidasJugador
        }
    }

    return res
}

function reiniciar()
{
    location.reload()
}

function aleatorio(min, max)
{
    return Math.floor(Math.random()*(max-min)+1)
}

//Acción que escucha cuando el evento de carga total de la pagina se completó
window.addEventListener('load', iniciarJuego)