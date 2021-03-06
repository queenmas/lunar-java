
//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;

//al cargar por completo la página...
window.onload = function(){
	
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");
	
	document.getElementById("bottomplay").onclick = function () {
		document.getElementById("bottomplay").style.display = "none";
		document.getElementById("bottomplay2").style.display = "block";
		stop();
		
	}
	document.getElementById("bottomplay2").onclick = function () {
		document.getElementById("bottomplay2").style.display = "none";
		document.getElementById("bottomplay").style.display = "block";
		start();
	}

		document.getElementById("actmotor").onclick = function () {
		document.getElementById("actmotor").style.display = "none";
		document.getElementById("actmotor2").style.display = "block";
		motorOn();
		
	}
	document.getElementById("actmotor2").onclick = function () {
		document.getElementById("actmotor2").style.display = "none";
		document.getElementById("actmotor").style.display = "block";
		motorOff();
	}
	
	//definición de eventos
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	//encender/apagar el motor al hacer click en la pantalla
	//document.onclick = function () {
		//if (devicewidth<961){
			//if (a==g){
				//motorOn();
			//} else {
				//motorOff();
			//}
		//}
	//}
	document.onkeydown = function(event){
		if (event.keyCode==32){
			motorOn();
		}
	}
	document.onkeyup = motorOff;
	
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	
	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones
function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*500);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	//actualizar marcadores
	velocidad.innerHTML=v.toFixed(2);
	altura.innerHTML=y.toFixed(2);
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop();
	}
}
function motorOn(){
	//el motor da aceleración a la nave
	if (c > 0) a=-g;
	//mientras el motor esté activado gasta combustible
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
}
function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
}
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ) c = 0;
	combustible.innerHTML=c.toFixed(2);	
}