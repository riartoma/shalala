var botonEmprezar = document.getElementById("botonEmprezar");
var rojo = document.getElementById("rojo");
var azul = document.getElementById("azul");
var amarillo = document.getElementById("amarillo");
var verde = document.getElementById("verde");

var jugadorSimon;
var nombreJugador = document.getElementById("jugadorNombre");
var puntajeJugador = document.getElementById("puntajeJugador");
var nivelJuego = document.getElementById("nivelJuego");
var ULTIMO_NIVEL = 2;

class Jugador {
    /* Esta es la clase jugador la cual permitira crear un objeto el cual tendra nombre y puntaje  */
    constructor(nombre, puntaje) {
        this.nombre = nombre;
        this.puntuntaje = puntaje;
    }
}
class Jugador1 extends Jugador {
    /* Esta clase funciona como herencia la cual va a heredar los atributos de la clase jugador y se le adicionara el atributo nivel, también tedra el metodo de mostrar información del jugador y el metodo de aumentar la puntación  */
    constructor(nombre, puntuntaje, nivel) {
        super(nombre, puntuntaje);
        this.nivel = nivel;
    }
    mostrarInformacionJugador() {
        /** Esta clase permitira mostrar la informacion del jugador en la ventana del navegador por medio de etiquetas html con la propiedad innerHTML */
        nombreJugador.innerHTML = this.nombre;
        puntajeJugador.innerHTML = this.puntuntaje;
        nivelJuego.innerHTML = this.nivel + 1;
    }
    aumentarPuntaje() {
        this.puntuntaje += 5;


    }
}


class JuegoSimonDice {
    /* Esta clase es la que va a tener todas las funcionalidades del juego cuyos atributos son funciones siendo llamadas */
    constructor() {
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarSecuencia();
        this.siguienteNivel();
    }

    inicializar() {
        /** Da inicio al juego creando los atributos del nivel y el color */
        this.elegirColor = this.elegirColor.bind(this);
        this.señalBotonEmpezar();

        this.nivel = 1;
        this.colores = {
            rojo,
            verde,
            azul,
            amarillo
        }
    }

    señalBotonEmpezar() {
        /** Este metodo permitira evaluar si el boton de inicio tiene la clase ocultar, la elimine y sino que la agregue */
        if (botonEmprezar.classList.contains("ocultar")) {
            botonEmprezar.classList.remove("ocultar");

        } else {
            botonEmprezar.classList.add("ocultar"); //elimina el boton de comenzar con un estilo css
        }
    }

    generarSecuencia() {
        /** Crea un array el cual almacena numeros del 0 al 3 la cual a hacer referencia a los colores por medio de una funcion de numeros aleatorios  */
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4)); //numero entre 0 y 3 
    }

    siguienteNivel() {
        /** Esta funcion permite crear el nivel del juego y va a utilizar la secuencia y se la mostrara al usuario luego de ello los colores estaran al pediente de la secuencia que haga el usuario */
        this.subNivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();

    }

    cambiarNumeroAColor(numero) {
        /** Esta funcion permitira recibir los numeros del 0 al 3 y cada numero me va retornar el color que tienen los elemtos html  */
        switch (numero) {
            case 0:
                return "rojo";

                //no se coloca break xq nunca se va ejecutar por el return
            case 1:
                return "azul";

            case 2:
                return "amarillo";

            case 3:
                return "verde";

        }
    }

    cambiarColorANumero(color) {
        /** Esta funcion es la que me permite validar la secuencia utilizada por el usuario */
        switch (color) {
            case "rojo":
                return 0;

                //no se coloca break xq nunca se va ejecutar por el return
            case "azul":
                return 1;

            case "amarillo":
                return 2;

            case "verde":
                return 3;

        }
    }

    iluminarSecuencia() {
        /** Esta funcion mostrara la secuencia en la pantalla de los colores al iluminar dependiendo del nivel en el que se encuentre el jugador */
        for (let i = 0; i < this.nivel; i++) {
            let color = this.cambiarNumeroAColor(this.secuencia[i]);

            setTimeout(() => {
                this.iluminarColor(color);
            }, 1000 * i);
        }
    }
    iluminarColor(color) {
        /** Agregara la clase css al elemento que se debe iluminar */
        this.colores[color].classList.add("marca");
        setTimeout(() => this.apagarColor(color), 400);
    }

    apagarColor(color) {
        /** Esta funcion me permitira eliminar la clase css luego de un tiempo para seguir con la secuencia */
        this.colores[color].classList.remove("marca");
    }
    agregarEventosClick() {
        /** Esta funcion me permitira que los colores recibar la accion del usuario con su propia secuencia */
        this.colores.rojo.addEventListener("click", this.elegirColor);
        this.colores.verde.addEventListener("click", this.elegirColor);

        this.colores.amarillo.addEventListener("click", this.elegirColor);

        this.colores.azul.addEventListener("click", this.elegirColor);
    }

    eliminarEventosClick() {
        /** Esta funcion eliminara la accion de que el usuario pueda interactuar con sus colores cuando se este mostrando la secuencia */

        this.colores.rojo.removeEventListener("click", this.elegirColor);
        this.colores.verde.removeEventListener("click", this.elegirColor);

        this.colores.amarillo.removeEventListener("click", this.elegirColor);

        this.colores.azul.removeEventListener("click", this.elegirColor);

    }

    elegirColor(ev) {
        /** Esta funcion es la que va permitir al usuario la secuencia ya mostrada  */
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.cambiarColorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if (numeroColor === this.secuencia[this.subNivel]) {
            this.subNivel++;

            if (this.subNivel === this.nivel) {
                this.nivel++;
                this.eliminarEventosClick();
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoJuego();
                } else {
                    setTimeout(this.siguienteNivel.bind(this), 2000);
                }
            }
            jugadorSimon.aumentarPuntaje();
            jugadorSimon.nivel = this.subNivel;
            jugadorSimon.mostrarInformacionJugador();
        } else {
            this.perdioJuego();
            jugadorSimon.nivel = 0;
            jugadorSimon.mostrarInformacionJugador();
        }
    }

    ganoJuego() {
        /** Esta  funcion me va a mostrar un aviso un poco mas diseñado utilizando un servicio de la nube el cual se llama sweetalert el cual me permite ventanas modales y emergentes con un diseño mucho mejor */
        Swal.fire({
                title: 'Felicidades Ganastes!!',
                width: 600,
                padding: '3em',
                backdrop: `
            #7daaf3e5
          url("https://image.jimcdn.com/app/cms/image/transf/none/path/s7a7866289313eaaa/image/ic40cdc0a8567dd93/version/1405717919/image.gif")
          left top
          no-repeat
        `
            })
            .then(() => {
                /** Esta funcion permite volver a jugar despues de ganar el juego */
                this.inicializar();
                // jugadorSimon.puntuntaje = 0;
            })
    }

    perdioJuego() {
        /** Mostrara un aviso de que fallo en la secuencia e iniciara de nuevo el juego eliminando los eventos que el usuario ejecuto */
        Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Haz perdido, vuelve a jugar',

            })
            .then(() => {

                this.eliminarEventosClick();
                this.inicializar();

            })
    }
}

function empezarJuego() {
    /** Esta funcion es la que va ser llamada por el boton html   */
    jugadorSimon.mostrarInformacionJugador();

    window.juego = new JuegoSimonDice();
}

function preguntar() {
    /** Validara de que el campo no este vacio y que sea solo letras */
    var nombreJugador2;
    do {
        nombreJugador2 = prompt("Ingrese su Nombre");
        while (!isNaN(nombreJugador2)) {
            nombreJugador2 = prompt("Ingrese su Nombre, debes ingresar un nombre");
        }

    } while (nombreJugador2 === false);
    return new Jugador1(nombreJugador2, 0, 0);
}
jugadorSimon = preguntar();