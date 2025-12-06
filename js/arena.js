import { Guerrero, Mago, Arquero, Bandido } from "./characters.js";

const claseJugador = localStorage.getItem('hero')
let enemigos = JSON.parse(localStorage.getItem('enemigos') || [])
let nivelActual = localStorage.getItem('nivelActual')

if (!claseJugador) window.location.href = 'choose.html'

if (enemigos.length === 0) {
    window.addEventListener('load', () => {
        const modal = document.getElementById('modal-fin');
        const titulo = document.getElementById('modal-titulo');
        const mensaje = document.getElementById('modal-mensaje');
        const btn = document.getElementById('btn-continuar');

        // Configuración de CAMPEÓN
        modal.classList.remove('hidden'); // Mostrar modal
        titulo.innerText = "🏆 CAMPEÓN SUPREMO 🏆";
        titulo.classList.add('texto-campeon'); // Clase nueva para CSS dorado
        mensaje.innerHTML = "Has derrotado a todos los rivales.<br>Tu leyenda será recordada por siempre.";
        
        btn.innerText = "VOLVER AL INICIO";
        btn.onclick = () => {
            localStorage.clear(); // Limpiamos para jugar de nuevo
            window.location.href = '../index.html';
        };
        
        // Efecto visual: Confeti o fondo especial (opcional)
        document.querySelector('.modal-content').classList.add('borde-campeon');
    });
    
    // Detenemos el resto del script para que no busque jugadores que no existen
    throw new Error("Torneo Completado"); 
}


const claseEnemigoActual = enemigos[0].trim()

console.log("Clase del Jugador:", `"${claseJugador}"`); // Las comillas verán si hay espacios
console.log("Clase del Enemigo:", `"${claseEnemigoActual}"`);

function crearPersonaje(clase, nombre) {
    if (clase === 'Guerrero') return new Guerrero(nombre)
    if (clase === 'Mago') return new Mago(nombre)
    if (clase === 'Arquero') return new Arquero(nombre)
    if (clase === 'Bandido') return new Bandido(nombre)
    console.error(`❌ ERROR CRÍTICO: La clase "${clase}" no tiene constructor.`);
    return new Guerrero(nombre, 100);
}


const jugador = crearPersonaje(claseJugador, "TU")
const enemigo = crearPersonaje(claseEnemigoActual, "CPU")

console.log(enemigo);


document.getElementById('num-nivel').innerText = nivelActual

//Datos del jugador
document.getElementById('nombre-jugador').innerText = jugador.nombre
document.getElementById('img-jugador').src = `/assets/${claseJugador}.png`
document.getElementById('vida-valor-jugador').innerText = `${jugador.vida}/${jugador.vidaMax}`


//Datos del enemigo
document.getElementById('nombre-enemigo').innerText = enemigo.nombre
document.getElementById('img-enemigo').src = `/assets/${claseEnemigoActual}.png`
document.getElementById('vida-valor-enemigo').innerText = `${enemigo.vida}/${enemigo.vidaMax}`

const modal = document.getElementById('modal-fin');
const tituloModal = document.getElementById('modal-titulo');
const mensajeModal = document.getElementById('modal-mensaje');
const btnContinuar = document.getElementById('btn-continuar');


function finalizarCombate(victoria) {
    modal.classList.remove('hidden'); // Mostrar modal

    if (victoria) {
        tituloModal.innerText = "VICTORIA";
        mensajeModal.innerText = `Has derrotado a ${claseEnemigoActual}. Prepárate para el siguiente.`;

        // Configurar botón para siguiente nivel
        btnContinuar.onclick = () => {
            enemigos.shift();
            localStorage.setItem('enemigos', JSON.stringify(enemigos));
            localStorage.setItem('nivelActual', parseInt(nivelActual) + 1);
            window.location.reload();
        };
    } else {
        tituloModal.innerText = "HAS MUERTO"; // Estilo Dark Souls
        tituloModal.classList.add('derrota-texto'); // Texto rojo
        document.querySelector('.modal-content').style.borderColor = "red";
        mensajeModal.innerText = "Tu alma se ha perdido en la arena...";

        // Configurar botón para reiniciar
        btnContinuar.innerText = "REINTENTAR";
        btnContinuar.onclick = () => {
            localStorage.clear();
            window.location.href = '../index.html';
        };
    }
}

const btnBatalla = document.getElementById('btn-atacar')
const logDiv = document.getElementById('log-batalla')


function actualizarBarras() {
    document.getElementById('vida-jugador').style.width = (jugador.vida / jugador.vidaMax * 100) + "%"
    document.getElementById('vida-valor-jugador').innerText = `${jugador.vida}/${jugador.vidaMax}`
    document.getElementById('vida-enemigo').style.width = (enemigo.vida / enemigo.vidaMax * 100) + "%"
    document.getElementById('vida-valor-enemigo').innerText = `${enemigo.vida}/${enemigo.vidaMax}`
}


btnBatalla.addEventListener('click', () => {
    if (!jugador.estaVivo() || !enemigo.estaVivo()) return


    document.querySelector('.jugador').classList.add('atacando');
    setTimeout(() => document.querySelector('.jugador').classList.remove('atacando'), 200);

    document.querySelector('.enemigo').classList.add('herido');
    setTimeout(() => document.querySelector('.enemigo').classList.remove('herido'), 500);

    const msgJugador = jugador.atacar(enemigo)
    logDiv.innerHTML = `<p class="player-log">${msgJugador}</p>` + logDiv.innerHTML
    actualizarBarras()


    if (!enemigo.estaVivo()) {
        finalizarCombate(true); // LLAMAMOS A NUESTRA FUNCIÓN
        return;
    }

    setTimeout(() => {

        document.querySelector('.enemigo').classList.add('atacando');
        setTimeout(() => document.querySelector('.enemigo').classList.remove('atacando'), 200);

        const msgEnemigo = enemigo.atacar(jugador)
        logDiv.innerHTML = `<p class="cpu-log">${msgEnemigo}</p>` + logDiv.innerHTML

        document.querySelector('.jugador').classList.add('herido');
        setTimeout(() => document.querySelector('.jugador').classList.remove('herido'), 500);

        if (!jugador.estaVivo()) {
            finalizarCombate(false); // LLAMAMOS A NUESTRA FUNCIÓN
        }
    }, 800)
})


