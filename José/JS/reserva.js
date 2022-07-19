window.onload = function(){

    //Hacemos referencia a los objetos en el formulario.
    
    const selectElement = document.forms[0].categoria;
    
    //Accedemos a algunos objetos por su id.
    
    const container = document.getElementById("container");
    
    const container2 = document.getElementById("sabores");
    
    //El boton de envio.
    
    const sendButton = document.getElementById("send-button");
    
    const finish = document.getElementById("finish");
    
    //Utilizaremos dos eventos, cuando se envie el formulario
    
    sendButton.addEventListener('click', validate);
    
    finish.addEventListener('click', ReservacionCompleta);
    
    //Cuando se cambie el primer campo, es decir, la categoria, el elemento select.
    
    selectElement.addEventListener('change', showProducts);
    
    product_list = [];
    
    var ids = 0;
    
    var elementos = document.forms[0].elements;
    
    function validate(e){
    //Creamos nuestra funcion de validacion
        e.preventDefault();
    
    
        var patron = /^\s+/;
        var opciones = ["Simple","Completa","Lujo"];
        let categoria = elementos[0];
    
        //.trim() elimina espacios al principio y final de un texto.
        let sabor = elementos[1].value.trim();
    
        var cantidad = elementos[2].value;
    //El sabor nuestro segundo campo no puede ser nulo, no puede tener longitud de 0, la tercera condicion indica que no pueden ser solo espacios vacios
        if (categoria.selectedIndex == 0){
            return false;
        }
    
        else if (!opciones.includes(sabor)){
            console.log("Opción inválida");
            return false;
        } 
    
        else if(sabor == null || sabor.length == 0 || patron.test(sabor) || /\d+/.test(sabor)){
            return false;
        }else if(cantidad == null ||isNaN(cantidad) || cantidad <=0 || cantidad>99) { 
            return false;
        }else{
            addProduct();
            //e.preventDefault();
        }
        if (product_list.length >0){
            finish.style.display = "block";
        }
    }
    
    function showProducts(){
        if(selectElement.value=="Habitacion Familiar"){
            container2.textContent = "Simple (20.00), Completa (30.00), Lujo (60.00)";
        }
        else if (selectElement.value=="HabitacionD"){
            container2.textContent = "Simple (20.00), Completa (30.00), Lujo (60.00)";
        }
        if(selectElement.value=="HabitacionI"){
            container2.textContent = "Simple (20.00), Completa (30.00), Lujo (60.00)";
        }
        else if (selectElement.value=="Suite"){
            container2.textContent = "Simple (20.00), Completa (30.00), Lujo (60.00)";
        }
    }
    
    function addProduct () { 
        //event.preventDefault(); 
        var id = ids;
        let sabor = elementos[1].value.trim();
        var categoria = elementos[0].value;
        var tamaño = document.forms[0].size.value;
    
        //Éstos son los checkbox
        var c1 = document.getElementById("1 niño");
        var c2 = document.getElementById("2 niños");
        var c3 = document.getElementById("3 niños");
        var c4 = document.getElementById("4 niños");
    
        var acompañantes = [c1,c2,c3,c4];
    
        var producto = new Producto(id, categoria, sabor,elementos[2].value, tamaño, acompañantes);
        console.log(producto.id);
        ids+=1;
        const element = document.createElement('div');
    
           element.className ="card";
    
    element.innerHTML = 
    
    `<p><strong>${categoria} de ${producto.sabor}</strong><br>
    
    Cantidad: ${producto.cantidad}   Precio: ${producto.precio}   Acompañantes: ${producto.extras}4 c/u
    
    Total a pagar: ${producto.getTotal()}</p>
    
    <input type="button" class="button" name="delete" value="Eliminar">`;
    
        container.appendChild(element);
        product_list.push(producto);
        document.forms[0].reset();
        console.log(product_list);
    
        container.removeEventListener("click", deleteProduct);
        container.addEventListener("click", function(e){
    
        console.log(e.target+": "+e.target.name+" "+ producto.id);
        if(e.target.name === 'delete'){
            deleteProduct(e.target, producto.id);
        }
    
    });
        return false;
    
    }
    
    function ReservacionCompleta(){
        var total = 0;
        for(i=0; i< product_list.length; i++){
             console.log(product_list[i]);
             total+=product_list[i].getTotal();
        }
        alert("Monto total a pagar: "+total);
    }
    
    function deleteProduct(element, id){
        if(element.name === 'delete'){
            element.parentElement.remove();
            if(product_list.length>0){
                //console.log("Eliminado: "+ product_list[id].tipo +" de "+ product_list[id].sabor);
                product_list.splice(id,1);
                ids-=1;
            }
                console.log("Productos: "+ product_list.length);
        }else{
    
            return;
        }
    
    }
    
    function Producto(id, tipo, sabor, cantidad, tamaño, acompañantes){
        this.id = id;
        this.tipo = tipo;
        this.sabor = sabor;
        this.cantidad = cantidad;
        this.tamaño = tamaño;
        this.extras="";
    
        console.log("ID: "+id);
    
        switch (sabor){
            case "Simple":
                this.precio = 20.00;
                break;
    
            case "Completa":
                this.precio = 30.00;
                break;
    
            case "Lujo":
                this.precio = 60.00;
                break;
    
           
        }
        this.subtotal = this.cantidad*this.precio;
    
        var envase = 0;
    
        if(this.tamaño == "pequeño"){
            envase+=10.00;
        }
        else if(this.tamaño == "mediano"){
            envase+=20.00;
    
        }else{
            envase+=40.00;
        }
    
        var adicional = 0;
    
        for (var i=0; i<acompañantes.length;i++){
               if(acompañantes[i].checked == true){
                   adicional+=4.00;
                   this.extras+=acompañantes[i].value+", ";
               }
        }
    
        this.getTotal = function (){
            var total = this.subtotal + envase + adicional;
            return total;
        }  
    
    }
}