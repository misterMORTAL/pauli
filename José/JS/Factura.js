const formDetalle = document.getElementById("formDetalle");

const ndias = document.getElementById("ndias");
const descripcion1 = document.getElementById("descripcion1");
const dias = document.getElementById("dias");
const total = document.getElementById("total");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const btnGuardar = document.getElementById("btnGuardar");

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const acompañantes = document.getElementById("acompañantes");
const horallegada = document.getElementById("horallegada");
const horasalida = document.getElementById("horasalida");
const formcabecera = document.getElementById("formcabecera");

let facturas =[];
let arregloDetalle = [];
let arregloProductos = [
    {id: 1,nombre : "Habitacion individual  ", precio:   20,},
    {id: 2,nombre : "Habiacion doble  ", precio:   30,},
    {id: 3,nombre : "Habiacion familiar ", precio:   40,},
    {id: 4,nombre : "Habiacion suite golden", precio:   50,},
];
const llenarProductos = () =>{
    arregloProductos.forEach((p)=>{

        const option = document.createElement("option");
     option.value = p.id;
     option.innerText = p.nombre;
     descripcion1.appendChild(option);

    });
};
llenarProductos();
const getNombreProductoById =(id)=>{
const objProducto = arregloProductos.find((p)=>{
if (p.id === +id ){
    return p;
}
});
return objProducto.nombre;
};
const redibujarTabla =()=>{
    cuerpoTabla.innerHTML = "";
    arregloDetalle.forEach((detalle)=>{
        let fila = document.createElement("tr");
        fila.innerHTML = ` <td>${detalle.cant}</td>
                         <td>${getNombreProductoById(detalle.descripcion)}</td>
                         <td>${detalle.pUnit}</td>
                         <td>${detalle.pTotal}</td>`
                         let tdEliminar = document.createElement("td");   
                         let botonEliminar = document.createElement("button");
                         botonEliminar.classList.add("btn","btn-danger");
                         botonEliminar.innerText = "Eliminar"
                         tdEliminar.appendChild(botonEliminar);
                         fila.appendChild(tdEliminar);
                         cuerpoTabla.appendChild(fila);

    });
};
formDetalle.onsubmit=(e)=>{
        e.preventDefault();
const objDetalle = {
 cant: ndias.value,
 descripcion: descripcion1.value,
 pUnit: dias.value,
 pTotal: total.value,

}
arregloDetalle.push(objDetalle);
redibujarTabla();
console.log(objDetalle);
};
btnGuardar.onclick = () =>{
let objFactura = {
   nombre:nombre.value,
   email:email.value,
   telefono:telefono.value,
   acompañantes:acompañantes.value,
   horallegada:horallegada.value,
   horasalida:horasalida.value,
   detalle: arregloDetalle,
};
facturas.push(objFactura);
formcabecera.reset();
formDetalle.reset();
localStorage.setItem("facturas",JSON.stringify(facturas));
console.log(objFactura);
};