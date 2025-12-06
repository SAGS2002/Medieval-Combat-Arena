


const botones = document.querySelectorAll('.type')
const todasLasClases = ['Guerrero','Mago','Arquero','Bandido']


botones.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const miClase = e.target.dataset.tipo

        const enemigos = todasLasClases.filter(c => c != miClase)

        localStorage.setItem('hero', miClase)
        localStorage.setItem('enemigos', JSON.stringify(enemigos))
        localStorage.setItem('nivelActual', 1)
        
        window.location.href = 'arena.html'
    })
})


