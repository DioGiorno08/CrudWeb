const API_URL = "https://retoolapi.dev/5bMOpP/integrantes";



async function ObtenerIntegrantes() {


    const respuesta = await fetch(API_URL);

    //Passamos a JSON la respuesta del servidor
    const data = await respuesta.json();

    MostrarDatos(data);
    
}
//Funcion para crear las filas de la tabla en base a un JSON
//"datos" representara al JSON donde viene la informacion
function MostrarDatos(datos){

    
    //Se llama a la tabla con elemento "id" y luego al tbody
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar código HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla

    datos.forEach(integrante => {
        tabla.innerHTML += `
         <tr>

              <td>${integrante.id}</td>
              <td>${integrante.Nombre}</td>
              <td>${integrante.apellido}</td>
               <td>${integrante.correo}</td>
         <td> 
            <button>Editar</button>
            <button onclick="EliminarPersona(${integrante.id})">Eliminar</button>
          </td>
         </tr>
        `;
    });
    }

    ObtenerIntegrantes();


    //Proceso para agregar un nuevo integrante

    const modal = document.getElementById("mdAgregar");
    const btnAgregar = document.getElementById("btnAgregar");
    const btnCerrar = document.getElementById("btnCerrar");

    btnAgregar.addEventListener("click", ()=>{
        modal.showModal();
    });

    btnCerrar.addEventListener("click", ()=>{
        modal.close();
    })

    //Agregar nuevo integrante desde el formulario
    document.getElementById("frmAgregar").addEventListener("submit", async e => {
        e.preventDefault(); //"e"representa a "submit". Evita que el formulario se envie de un solo.

        //Captura los valores del formulario 
        const Nombre = document.getElementById("txtNombre").value.trim();
        const apellido = document.getElementById("txtApellido").value.trim();
        const correo = document.getElementById("txtEmail").value.trim();

        if(!Nombre || !apellido || !correo){
            alert("Ingrese lo valores correctamente");
            return;
        }

        const respuesta = await fetch(API_URL,{

            method: "POST",
            headers: {'Content-Type': 'application/json'},//Tipo de dato enviado
            body: JSON.stringify({Nombre,apellido,correo})//Datos enviados
    });

    //Verificar si la API responde que los daos fueron enviados correctamente

    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        document.getElementById("frAgregar").reset();

        modal.close();

        ObtenerIntegrantes();
    }
    else{
        alert("El registro no pudo ser agregado");
    }

});


//Funcion para borrar registros



async function EliminarPersona(id){
    const confirmacion = confirm("¿Realmente deseas eliminar el registro?");

    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        //Recargar la tabla despues de eliminar
        ObtenerIntegrantes();
    }


}