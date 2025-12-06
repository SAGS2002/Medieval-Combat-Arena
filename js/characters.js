//Sistema de Batalla RPG

export class Personaje {
    constructor(nombre, vida) {
        this.nombre = nombre
        this.vida = vida
        this.vidaMax = vida
    }

    atacar(objetivo) {

    }


    recibirDmg(cantidad) {
        let dmgFinal = cantidad;

        // Si tiene armadura (asumimos que la armadura es una propiedad dinámica)
        if (this.armadura && this.armadura > 0) {
            let reduccion = Math.floor(cantidad * 0.50);
            dmgFinal = cantidad - reduccion;
            
            // Desgaste de armadura
            this.armadura -= 25;
            if(this.armadura < 0) this.armadura = 0;
            
            console.log(`${this.nombre} bloqueó parte del daño. Armadura restante: ${this.armadura}`);
        }

        this.vida -= dmgFinal;
        if (this.vida < 0) this.vida = 0;

        return dmgFinal; // Devolvemos cuánto dolió para mostrarlo en pantalla
    }

    estaVivo() {
        return this.vida > 0;
    }
}


export class Guerrero extends Personaje {

    constructor(nombre, vida=120, armadura=50, velocidad = 20) {
        super(nombre, vida)
        this.armadura = armadura
        this.velocidad = velocidad
    }

    atacar(objetivo) {
        let dmg = Math.floor(Math.random() * 16) + 10;
        
        let dmgReal = objetivo.recibirDmg(dmg);
        return `${this.nombre} ataca con su espada y causa ${dmgReal} de daño!`;
        }
}


export class Mago extends Personaje {
    constructor(nombre, vida=80, mana=50, velocidad = 50) {
        super(nombre, vida)
        this.mana = mana
        this.velocidad = velocidad
    }

    atacar(objetivo) {
        let dmg = Math.floor(Math.random() * 16) + 10;

        if (this.mana > 0) {
            dmg = Math.floor(dmg * 1.2) + dmg; // Boost de magia
            this.mana -= 15;
        }

        let dmgReal = objetivo.recibirDmg(dmg);
        return `${this.nombre} lanza un hechizo y causa ${dmgReal} de daño! (Maná restante: ${this.mana})`;
    }

}


export class Arquero extends Personaje {
    constructor(nombre, vida=100, critico=50, velocidad = 30) {
        super(nombre, vida)
        this.critico = critico
        this.velocidad = velocidad
    }

    atacar(objetivo) {
        let dmg = Math.floor(Math.random() * 16) + 10;
        let prob = Math.floor(Math.random() * 16) + 10

        if (prob < 15) {
            dmg = Math.floor(dmg * 1.4) + dmg; 
            let dmgReal = objetivo.recibirDmg(dmg);
            return `${this.nombre} lanza una felcha y HACIERTA UN CRITICO CAUSA ${dmgReal} DE DAÑO!`;
        }else{
            let dmgReal = objetivo.recibirDmg(dmg);
            return `${this.nombre} lanza una felcha y causa ${dmgReal} de daño!`;
        }

        
    }

}

export class Bandido extends Personaje {
    constructor(nombre, vida=90, astucia=60, velocidad=60) {
        super(nombre, vida);
        this.astucia = astucia;
        this.velocidad = velocidad;
    }

    atacar(objetivo) {
        let dmg = Math.floor(Math.random() * 16) + 10; // Daño base
        let mensaje = "";

        // Habilidad especial: Golpe Sucio (50% prob)
        if (Math.random() > 0.5) {
            dmg += 10;
            mensaje = `${this.nombre} usó un truco sucio y te pegó CRÍTICO (${dmg} daño)!`;
        } else {
            mensaje = `${this.nombre} te apuñala rápidamente causando ${dmg} de daño.`;
        }

        if (this.astucia>0 && this.vida < 50) {
            this.vida = this.vida + 30
            this.astucia = this.astucia - 20
            mensaje = `${this.nombre} te hizo una mofa y se curó epicamento!`;
        }

        // --- APLICAR DAÑO (Lógica manual) ---
        if (objetivo.armadura > 0) {
            // Si tiene armadura, absorbe un poco
            let danoReducido = Math.floor(dmg - (dmg * 0.2)); // Absorbe 20%
            if (danoReducido < 0) danoReducido = 0;
            
            objetivo.vida -= danoReducido;
            objetivo.armadura -= 10; // Rompe armadura
        } else {
            // Daño directo
            objetivo.vida -= dmg;
        }

        // Evitar vida negativa
        if (objetivo.vida < 0) objetivo.vida = 0;

        return mensaje;
    }
}