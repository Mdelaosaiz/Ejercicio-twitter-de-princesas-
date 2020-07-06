//Array que uso de ejemplo antes de tener la información con el Fetch.
// const princesas = [
//   {
//     "name":"Ariel del Mar",
//     "email":"dangerousRedHair@example.com",
//     "phone":"0424-4724697",
//     "comment":"Ahora que estamos en fase 3 ¿Alguna amigui se apunta a una mariscada el Sábado?",
//     "picture":"http://beta.adalab.es/ejercicio-fin-de-semana-promo-j/data/images/ariel.jpg"
//  }
// ]

//para crear un string con el artículo:
function creaArticulo (obj){
  let article = "<article class=\"princess-articles\">";
  article+="<div class=\"photo\">";
  article+="<img class= \"js-photo\" src=\"" + obj.picture + "\" alt=\"foto princesa Ariel\">";
  article+="</div>";
  article+="<div class=\"info\">";
  article+="<h2 class=\"name\">"+ obj.name + "</h2>";
  article+="<p class=\"comment\">" + obj.comment + "</p>";
  article+="</div>";
  article+="</article>";

  return article;
  
}
// console.log (creaArticulo (princesas [0]));

//para añadir el string en el html:

function pintaArticulo (obj){
let princessDiv = document.querySelector ('.wrapper');
princessDiv.innerHTML += creaArticulo(obj);
}
// pintaArticulo(princesas[0]);

// recorre el array y llama a la función pintaArticulo para cada objeto:
function cargaArticulos (array){
for (let item of array){
  pintaArticulo (item);
}
}

//función para hacer que el fondo del artículo cambie de color
function cambiaFondo (ev){
ev.currentTarget.classList.toggle("background");
// si ese artículo está seleccionado, se añade a la lista de favoritos y si no, se quita.
if (ev.currentTarget.classList.contains ("background") ){
  listaFavoritos.push (ev.currentTarget);
}else { //como no se puede poner un remove en JS, tenemos que hacerlo con un "splice". Para ello buscamos la posición del artículo.
   let index = listaFavoritos.indexOf (ev.currentTarget);
   //mayor o igual que 0 porque si es -1 significa que NO está en la lista!!
   if (index >=0){
     listaFavoritos.splice(index, 1);
    }
  }
}
//A partir de aquí tenemos el código qeu CARGA las cosas en la página, si se borra esto, la página se queda en blanco!.
//dejamos aquí fuera la lista donde vamos a poner las favoritas.La dejo fuera porque si no, no pueden acceder las demás funciones y no pueden metero sacar los artículos.
const listaFavoritos = [];

//hacemos el fech para obtener la información a pintar (en lugar del array de princesas que había al principio)

fetch('https://beta.adalab.es/ejercicios-extra/js-fetch-arrays-princesas-disney/data/users.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    cargaArticulos (data);

   let articles= document.querySelectorAll (".princess-articles");
   

   for (let articulo of articles){
   articulo.addEventListener('click', cambiaFondo);

}

  });