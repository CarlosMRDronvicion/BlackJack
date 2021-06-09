/**
 * 2C = dos de treboles (clubs)
 * 2D = dos de DIAMANTES
 * 2H = dos DE HEARTS
 * 2S = dos de Picas (pades)
 */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "K", "Q"];

let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias del HTML

const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");

const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
const puntosHtml = document.querySelectorAll("small");




//esta funcion crea una nueva baraja
const crearDeck = () =>{

    for( let i = 2; i <= 10; i++ ){
        for( let tipo of tipos ){
            deck.push( i + tipo);
        }
        
    }

    for( let tipo of tipos ){
        for( let esp of especiales ){
            deck.push( esp + tipo);
        }
        
    }
    

    // console.log( deck );
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;

}


crearDeck();


//esta funcion me permite tomar una carta
const pedirCarta = () => {

    if ( deck.length === 0){
        throw "No hay cartas en el Deck";
    }


    const carta = deck.pop();

    // console.log(deck);
    // console.log(carta); //carta debe de ser de la baraja
    return carta;
}

// for (let i = 0; i <= 100; i++){ esto es para comprobar que al llegar a 0 muestra el mensaje de no hay cartas
//     pedirCarta();
// }

// pedirCarta();

const valorCarta = ( carta )=>{

    const valor = carta.substring(0, carta.length -1); //lo que se hizo aqui es que estamos extrayendo los numeros de las cartas por lo tanto lo que hicimos con el substring es empezar en el 0 de la carta e ir hasta el digito final de la carta -1 un digito que es la letra

    // let puntos = 0;
    // console.log(valor);

    // if ( isNaN( valor ) ){ //aqui lo que hacemos es que se detecte si es o no un numero
    //     console.log("No es un numero");
    // }else{
    //     console.log("Es un numero");
    //     puntos = valor * 1;  // con este *1 lo que hacemos es convertir el string en numero
    // }
    // console.log(puntos);
//     if ( isNaN( valor ) ){ 
        
//         puntos = ( valor === "A" ) ? 11 : 10; //aqui asignamos un valor a las letras 
//     }else{
        
//         puntos = valor ;  
//     }
//     console.log(puntos);


// };

return ( isNaN( valor )) ?
        (valor === "A") ? 11 : 10
        : valor *1;
};

// const valor = valorCarta( pedirCarta() );
// console.log({valor});

//TURNO DE LA COMPUTADORA

const turnoComputadora = ( puntosMinimos ) => {

    do {
        
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta( carta );
    puntosHtml[1].innerText = puntosComputadora;    

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${ carta }.png`;    
    imgCarta.classList.add ("carta");

    divCartasComputadora.append( imgCarta );

    if( puntosMinimos > 21){
        break;
    }
    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

}




//TURNO DEL JUGADOR 


//Eventos

btnPedir.addEventListener("click", () => {     //lo que hacemos aqui es que cuando se haga click en el boton pedir se realice esa funcion

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHtml[0].innerText = puntosJugador;    //aqui asignamos para que el contador de puntos jugador aumente despues de haber asignado la constante arriba de todo

//  <img class="carta" src="assets/cartas/2C.png"> 

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${ carta }.png`;    //en estas dos lineas estamos definiendo las cartas aleatorias aqui pusimos la comilla esa y el dolar y corchetes para llamar a carta
    imgCarta.classList.add ("carta");

    divCartasJugador.append( imgCarta );

    if (puntosJugador > 21){
        console.warn("Lo siento mucho, perdiste");
        btnPedir.disabled = true;   //esto es para bloquear el boton de pedir otra
        btnDetener.disabled = true; 
        turnoComputadora(puntosJugador);
    }else if( puntosJugador === 21){
        console.warn("21, genial!");
        btnPedir.disabled = true;   
        btnDetener.disabled = true; 
        turnoComputadora(puntosJugador);
    }

    // console.log( puntosJugador );

});



//boton detenr


btnDetener.addEventListener("click", () => {
        
        btnPedir.disabled = true;   
        btnDetener.disabled = true;  
        
        turnoComputadora(puntosJugador);
    
});