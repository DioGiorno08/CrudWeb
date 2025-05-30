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
              <td>${integrante.nombre}</td>
              <td>${integrante.apellido}</td>
               <td>${integrante.correo}</td>
         <td> 
            <button>Editar</button>
            <button>Eliminar</button>
          </td>
         </tr>
        `;
    });
    }

    ObtenerIntegrantes();