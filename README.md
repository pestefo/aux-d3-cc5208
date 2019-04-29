# Tutorial D3.js

Disponible en: https://gist.github.com/pestefo/5507a73038d18bd9b0ace414398731ac

## Cómo vamos a trabajar con d3.js

Para comenzar a trabajar debes seguir los siguiente pasos:

1. En una consola lanzar un servidor desde la ubicación del archivo `index.html` de esta forma:

   ```bash
   $ python -m http.server 8080 		# Python 3.x 	
   $ python -m SimpleHTTPServer 8080	# Python 2.7.x	
   ```

   Esto tiene como finalidad servir en forma local el archivo de datos y la librería (y cualquier otro archivo que necesitemos utilizar).
   

2. Abre tu navegador web favorito y dirígete a `http://localhost:8080`.

3. Cada vez que hagas alguna modificación al código debes refrescar la página para ver los cambios.



## DOM Elements  (Document Object Model)
Estándar para representar un documento HTML, XML o XHTML.

Los documentos HTML consisten básicamente de dos elementos principales: `<head>` y `<body>`.

Dentro de `<head>` define la cabecera del documento. Allí se declaran las librerías, scripts (`<script>`), hojas de estilo CSS (`<style>`) y otros meta-datos (`<title>`, `<meta>`, etc). El contenido dentro de esta etiqueta no se muestra al usuario.

El `<body>` es el cuerpo del documento y contiene los objetos que estructuran su contenido:

- `<p>` para párrafos, `<label>` para texto
- `<a>` para hipervínculos
- `<div>` para divisiones dentro de la página
- etc...

Ej: `<div id="myDiv" class="container"> ... </div>` es un objeto de tipo *div* y con atributos *id* y *class*.

Se puede acceder a este objeto de tres manera

1. Por tipo: `d3.select("div")` 
	. Por id: `d3.select("#myDiv")`	
3. Por clase: `d3.select(".container")`
  

### SVG: Scalable Vector Graphics

Formato de gráficos vectoriales bidimensionales. Ampliamente soportado por navegadores.

```html
<div id="chart">
    <svg width="200" height="200">
    	<circle cx="50" cy="100" r="40" stroke="green" stroke-width="4" fill="yellow" />
    </svg>
</div>
```



## Primeros pasos en D3

Para esto vamos a insertar el código javascript dentro de la etiqueta `<script type="text/javascript"> ... </script>` del archivo `plantilla.html` ( http://localhost:8080/plantilla.html )

1. Crear svg en el div de id chart

```javascript
var svg = d3.select("#chart") // Retorna el DIV con id="chart" 
    .append("svg") // Adjunta un elemento de tipo SVG y lo retorna
    .attr("width", 700) // Seteamos el ancho a 200px 
    .attr("height", 400) // Seteamos el alto a 200px
```

2. Crear un círculo:

```javascript
var circle = svg.append("circle") // Adjuntamos un elemento circle al SVG
    .attr("cx", 50) // Posicionamos el elemento en (50,50)
    .attr("cy", 50)
    .attr("r", 40) // Radio 40 px
    .style("fill", "pink") // Color de fondo rosado
    .style("stroke", "green") // Color del borde verde
    .style("stroke-width", 5) // Grosor del borde 5px
```

3. Asociar datos a archivos.

```javascript
# Comentar el snippet anterior (var circle = svg.app... )
var my_data = [1, 2, 3, 4, 5];
var circles = svg.selectAll("circle")
    .data(my_data)
    .enter()
    	.append("circle")
    	.attr("cx", function(d) { return 80 * d })
    	.attr("cy", 40)
    	.attr("r", 30)
    	.style("fill", "pink")
    	.style("stroke", "green")
    	.style("stroke-width", 5);
```

-	Cuando la data ha sido asociada a los elementos, no es necesario volver a asociarlos (con el operador `data`). D3 va a usar la data ligada anteriorment —> Se puede entonces recomputar las propiedades sin tener que entregar los datos nuevamente
### Asociación entre DOM y datos:  enter(), update y exit():

**D3 enlaza datos a elementos del DOM**

Al asociar existen 3 posibilidades:

1. La cantidad de datos **=** cantidad de elementos (**update**)
2. La cantidad de datos **>** cantidad de elementos (**enter**)
3. La cantidad de datos **<** cantidad de elementos (**exit**)

**Enter**: entrega todos los nodos nuevos, que están entrando a la selección

**Exit** : entrega todos los nodos que se van

**Update**: actualizar los nodos con los datos asociados



Ver ejemplo: http://localhost:8080/example_en_up_ex.html descomentando los snippets en `example_en_up_ex.js`    .

## Crear scatter plot

Acá trabajaremos con el archivo `index.html` ( http://localhost:8080 ) dentro de la etiqueta `<script>` que está justo después del elemento `div#chart` (tipo *div* y id *chart*). 

1. Ocuparemos el archivo `test_data.csv` con cuatro columnas (3 ordinal y 1 nominal categórica) y 8 registros:

   | v1   | v2   | v3   | v4   |
   | ---- | ---- | ---- | ---- |
   | 40   | 40   | 30   | "A"  |
   | 150  | 70   | 10   | "B"  |
   | 20   | 25   | 27   | "B"  |
   | 100  | 10   | 32   | "C"  |
   | 120  | 15   | 20   | "A"  |
   | 110  | 20   | 10   | "C"  |
   | 98   | 60   | 40   | "C"  |
   | 30   | 45   | 38   | "C"  |

2. Leer el archivo csv y crear círculos:

```javascript
d3.csv("test_data.csv", function(error, data) {
    // Casting de String -> Number
    data.forEach(function(d){
        d.v1 = +d.v1;
        d.v2 = +d.v2;
        d.v3 = +d.v3;
    });	
    console.log(data);
    
	var circles = svg.selectAll("circle")
	   		.data(csv_data)
	   		.enter()
	   			.append("circle")
	   			.attr("cx", function(d){ return d.v1 })
	   			.attr("cy", function(d){ return d.v2 })
	   			.attr("r",  function(d){ return d.v3 })
});
```
2. Agregar color:

```javascript
var color = d3.scale.category10()

// Para aplicar el color:
.style("fill", function(d) {
    return color(d.v4)
})

// Más ejemplos: http://bl.ocks.org/aaizemberg/78bd3dade9593896a59d
// 				https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9
```
3. Agregar eje x:

```javascript 
var x = d3.scale.linear()
    .domain([0, d3.max(csv_data, function(d) {
        return +d.v1
    })]) 
    .range([0, width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// Para aplicar la escala en el atributo de posición de un elemento
.attr("cx", function(d) {
    return x(d.v1)
})

// Más información: https://github.com/d3/d3-axis
```

4. Agregar eje y: 

```javascript
var y = d3.scale.linear()
    .domain([0, d3.max(csv_data, function(d) {
        return +d.v2
    })])
    .range([height, 0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

svg.append("g")
    .call(yAxis);

// Para aplicar la escala en el atributo de posición de un elemento
.attr("cy", function(d) {
    return y(d.v2)
})
```

5. Agregar tooltip interactivo:

```javascript
var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

tooltip.on("mouseover",
    function(d) {
        tooltip.html("v4 = " + d.v4)
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
            .style("opacity", 1)
    }).on("mouseout",
    function(d) {
        tooltip.style("opacity", 0)
    });
```

6. Agregar leyenda: 

```javascript
var leyenda = svg.selectAll(".leyenda")
    .data(color.domain())
    .enter()
    .append("g")
    .attr("class", "leyenda")
    .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
    });

leyenda.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

leyenda.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) {
        return d;
    });
```



----

Este documento fue inicialmente escrito por Vanessa Araya (http://vpena.me/) y actualizado y aumentado por Pablo Estefó (https://pestefo.github.io/), Mayo 2018.