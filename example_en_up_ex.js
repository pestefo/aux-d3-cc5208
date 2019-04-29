/**************************************************************************************
 *  Archivo: example_en_up_ex.js
 *   
 * 	El objetivo de este script es entender el sistema de asociación de datos con 
 *  elementos del DOM que provee D3.
 *  
 *	El archivo cuenta con 4 snippets inicialmente comentados los cuales deben ser
 *  descomentados por separado para la realización correcta del ejercicio. Una vez
 *  descomentado el snippet, se debe refrescar la página:
 * 
 *					http://localhost:8080/example_en_up_ex.html
 *
 *  Luego de ejecutado un snippet, comentarlo nuevamente para descomentar el siguiente 
 *  y ejecutarlo.
 *
 +	Ejercicio basado en el siguiente tutorial: https://youtu.be/OZXYk_bgQGQ
 *  Más información en la documentación oficial de D3: https://bost.ocks.org/mike/join/
 *
 *  Pablo Estefó - pestefo@dcc.uchile.cl / CC5208 - Otoño 2018
 ***************************************************************************************/

// Inicialización de variables

var svg 	= d3.select("body")
			.append("svg")
			.attr("width", 700)
			.attr("height", 700);
var datos;

/**************************************************************************************
 *
 *  (1) ENTER - Ejemplo 1
 *   
 * 	Cantidad de datos > Cantidad de DOM elements
 *  
 ***************************************************************************************/

// // Cantidad de datos = 2
// datos 	= [10,20];

// // Cantidad de DOM elements = 0
// svg.selectAll("circle")		// 1. Seleccionamos todos los circulos existentes: ninguno
// 	.data(datos)			// 2. Asociamos los datos a los circulos seleccionados: 
// 							//    ningún dato fue asociado ya que no hay circulos
// 	.enter()				// 3. Seleccionamos todos los datos que no han sido 
// 							// asociados a algun elemento: los dos datos ([10,20])
// 		.append("circle")	// 4. Les asociamos un elementos de tipo círculo con los 
// 							//    los siguientes atributos.
// 		.attr("cx", function(d){ return d*10; })    					
// 		.attr("cy", 100)	
// 		.attr("r",  function(d){ return d; })
// 		.attr("fill", "green");			

// // Resultado: aparecen dos círculos verdes alineados horizontalmente con sus atributos
// // de posición horizontal y radio derivados de sus datos asociados



/**************************************************************************************
 *
 * 	(2) ENTER - Ejemplo 2
 *  
 *  Cantidad de datos > Cantidad de DOM elements
 *  
 ***************************************************************************************/

// // Cantidad de datos = 2
// datos 	= [10,20];


// // Cantidad de DOM elements = 1 
// var circle1 = svg.append("circle")
// 				.attr("cx", 50)
// 				.attr("cy", 50)
// 				.attr("r", 5)
//              .attr("fill", "orange");

// svg.selectAll("circle")		// 1. Seleccionamos todos los círculos existentes: circle1		
// 	.data(datos)			// 2. Asociamos los datos a los círculos seleccionados: 
// 							//    circle1 <-> datos[0] (10)
// 	.enter()				// 3. Seleccionamos todos los datos que no fueron asociados 
// 							//    anteriormente: datos[1] (20)
// 		.append("circle")	// 4. Los atributos del nuevo círculo están asociados a datos[1]
//  		.attr("cx", function(d){ return d*10; })  // cx = datos[1]*10 = 20*10 = 200  					
// 		.attr("cy", 100)						  // cy = 100	
// 		.attr("r",  function(d){ return d; })	  // r = datos[1] = 20
// 		.attr("fill", "green");					  // coloreamos verde	

// // Resultado: aparecen dos círculos, el primero (circle1) de color negro y posicionado
// // más arriba. El segundo tiene sus atributos asociados a datos[1]. 		  



/**************************************************************************************
 *
 * (3) UPDATE
 *
 * Cantidad de datos = Cantidad de DOM elements
 *
 ***************************************************************************************/


// // Cantidad de datos = 2
// datos 	= [10,20];


// // Cantidad de DOM elements = 2 
// var circle1 = svg.append("circle")
// 				.attr("cx", 100)
// 				.attr("cy", 100)
// 				.attr("r", 5)
//              .attr("fill", "orange");

// var circle2 = svg.append("circle")
// 				.attr("cx", 150)
// 				.attr("cy", 100)
// 				.attr("r", 10)
//              .attr("fill", "pink");				

// // UPDATE 
// svg.selectAll("circle")		// 1. Seleccionamos todos los círculos existentes: circle1		
// 	.data(datos)			// 2. Asociamos los datos a los círculos seleccionados: 
// 							//    circle1 <-> 10 (datos[0]), circle2 <-> 20 (datos[1])
// 							// 3. Todas las modificaciones de atributos se aplican
// 							//    en los elementos asociados: circle1 y  circle2
// 							//    Es decir, estamos actualizando atriburos de los elementos		
// 	.attr("cx", function(d){ return d*10; })  
// 	.attr("cy", 100)						  
// 	.attr("r",  function(d){ return d; })	  
// 	.attr("fill", "green");	

// // Resultado: aparecen circle1 y circle2 con sus atributos actualizados


/**************************************************************************************
 *
 *  (3) EXIT: retorna los elementos que no fueron asociados a datos
 *   
 * 	Cantidad de datos < Cantidad de DOM elements
 *  
 ***************************************************************************************/

// // Cantidad de datos = 1
// datos 	= [10];


// // Cantidad de DOM elements = 2 
// var circle1 = svg.append("circle")
//              .attr("cx", 100)
//              .attr("cy", 100)
//              .attr("r", 5)
//              .attr("fill", "orange");

// var circle2 = svg.append("circle")
//              .attr("cx", 150)
//              .attr("cy", 100)
//              .attr("r", 10)
//              .attr("fill", "pink");              			

// svg.selectAll("circle")		// 1. Seleccionamos todos los círculos existentes: 
// 							//	  circle1 y circle2		
// 	.data(datos)			// 2. Asociamos los datos a los círculos seleccionados: 
// 							//    circle1 <-> 10 (datos[0])
// 	.exit()					// 3. exit() entrega todos los elementos que no fueron 
// 							//     asociados anteriormente: circle2
// 	.remove()				// 4. Podemos cambiar sus atributos si queremos, o bien,
// 							// 	  podemos quitarlo a través del método: remove()

// // Resultado: aparece solamente circle1 con sus atributos especificados al comienzo
// // ya que circle2 fue eliminado.