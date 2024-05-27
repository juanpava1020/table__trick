document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.container-fluid.tm-mt-60');



    async function traerRestauranteEspecifico() {
        const url = `http://localhost:8080/api/sistemareservas/v1/restaurante/1eacdc47-489b-49b3-b521-781a74a8c055`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            pintarDatos(data); 
    
            console.log(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    } 
    


    traerRestauranteEspecifico(); 


  

    function pintarDatos(data) {
        container.innerHTML = ""; 

        container.innerHTML = `
        <div class="row mb-4">
        <h2 class="col-12 tm-text-primary">
        HELLO ${data.nombreComercial.toUpperCase()}!
        </h2>
    </div>
    <div class="row tm-mb-74 tm-row-1640">            
        <div class="col-lg-5 col-md-6 col-12 mb-3">
            <img src="img/about.jpg" alt="Image" class="img-fluid">
        </div>
        <div class="col-lg-7 col-md-6 col-12">
            <div class="tm-about-img-text">
                <p class="mb-4"> Propietaria: ${data.nombrePropietario +" "+ data.apellidoPropietario}</p>
                <p>NIT: ${data.nit}</p>
                <p>Email: ${data.email}</p>
                <p>Registration Date: ${data.fecha_registro}</p>
                <p>Location: ${data.ubicacion}</p>
                <p>Maximum Capacity: ${data.capacidad_maxima}</p>
                <p>Specialty: ${data.especialidad}</p>                
            </div>                
        </div>
    </div>
        `        
    }

})