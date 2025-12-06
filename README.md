# ⚔️ Medieval Combat Arena - JS RPG

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

> **Simulador de combate por turnos estilo "Arcade" desarrollado con Vanilla JavaScript.**
> Elige tu héroe, entra en la arena y derrota a todos los rivales para convertirte en el Campeón Supremo.

---

## 🎮 Descripción del Proyecto

Este proyecto transforma un sistema de batalla clásico de rol (RPG) basado en consola a una **Experiencia Web Completa**. El juego implementa un **Modo Torneo** donde el jugador debe sobrevivir a una serie de combates consecutivos contra la IA.

El objetivo principal fue aplicar conceptos avanzados de programación como **Orientación a Objetos (POO)**, manejo del **DOM** y persistencia de datos, todo sin utilizar frameworks externos.

### ✨ Características Principales

* **Sistema de Clases (POO):** 4 arquetipos únicos (Guerrero, Mago, Arquero, Bandido) que heredan de una clase padre `Personaje`.
* **Modo Torneo (Persistencia):** El estado del torneo y la lista de enemigos se guardan en `localStorage`, permitiendo avanzar de nivel entre diferentes páginas.
* **Interfaz Reactiva:** Barras de vida dinámicas, logs de batalla en tiempo real y animaciones de daño con CSS puro.
* **Diseño Responsivo:** Adaptado completamente para jugarse en escritorio y dispositivos móviles.
* **Estética Dark Fantasy:** Interfaz inmersiva con estilo medieval oscuro, fuentes góticas y efectos visuales.

---

## 🕹️ Cómo Jugar

1.  **Pantalla de Inicio:** Pulsa en "Entrar al Torneo".
2.  **Selección de Personaje:** Elige tu clase favorita. Cada una tiene estadísticas diferentes de Vida y Velocidad.
    * *Tip:* El Bandido tiene una mecánica de golpe crítico especial.
3.  **La Arena:**
    * Pulsa **ATACAR** para realizar tu movimiento.
    * Observa el registro de batalla para ver el daño causado.
    * Espera el contraataque del enemigo.
4.  **Progreso:** Si ganas, avanzarás al siguiente nivel contra otro oponente. Si pierdes, el torneo termina.

---

## 🛠️ Tecnologías y Conceptos Aplicados

* **JavaScript (ES6 Modules):** Uso de `import/export` para separar la lógica de clases (`characters.js`) de la lógica de la interfaz (`arena.js`).
* **DOM Manipulation:** Creación dinámica de elementos HTML y actualización de estilos (barras de vida) en tiempo real.
* **Local Storage:** Gestión de estado global para mantener la selección del jugador y el progreso de los enemigos a través de múltiples sesiones/páginas.
* **CSS3 Animations:** Uso de `@keyframes` para efectos de "temblor" al recibir daño y transiciones suaves.
* **Flexbox & Grid:** Maquetación responsiva para asegurar una buena experiencia en móviles.

---

## 📂 Estructura del Proyecto

```bash
/
├── index.html          # Pantalla de Bienvenida (Landing)
├── css/
│   ├── style.css       # Estilos generales y landing
│   ├── choose.css      # Estilos de selección de personaje
│   └── arena.css       # Estilos de la batalla
├── js/
│   ├── characters.js   # Lógica pura (Clases y Herencia)
│   ├── script.js       # Lógica de selección
│   └── arena.js        # Motor del juego y torneo
├── pages/
│   ├── choose.html     # Pantalla de Selección
│   └── arena.html      # Pantalla de Combate
└── assets/             # Imágenes de personajes y fondos