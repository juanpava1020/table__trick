document.addEventListener("DOMContentLoaded", function() {
    const pagination = document.getElementById("pagination");
    const prevBtn = pagination.querySelector(".tm-btn-prev");
    const nextBtn = pagination.querySelector(".tm-btn-next");
    const pagingLinksContainer = pagination.querySelector(".tm-paging");

    let selectedNumber = 1; // Variable para almacenar el número seleccionado inicialmente

    // Función para calcular los números de la paginación
    function calcularNumerosPaginacion(selectedNumber) {
        const numerosPagina = [];
        const cantidadNumeros = 4; // Cantidad de números de paginación a mostrar
        let startNumber = selectedNumber - Math.floor(cantidadNumeros / 2);

        // Ajustar el inicio si es menor que 1
        if (startNumber < 1) {
            startNumber = 1;
        }


        console.log(startNumber);
        // Generar números de página consecutivos
        for (let i = 0; i < cantidadNumeros; i++) {
            numerosPagina.push(startNumber + i);
            console.log(numerosPagina);
        }

        return numerosPagina;
    }

    // Función para cargar la información y actualizar la paginación
    async function cargarInformacionYActualizarPaginacion(selectedNumber, consulta = '') {
        try {
            const url = consulta ? `http://localhost:8080/api/sistemareservas/v1/reserva/consulta?nombreCliente=${consulta}&page=${selectedNumber}` 
                                 : `http://localhost:8080/api/sistemareservas/v1/reserva?page=${selectedNumber}`;

                                 

                                 console.log(url);

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Actualizar la paginación
            actualizarPaginacion(selectedNumber);

            // Renderizar los datos
            renderData(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    // Función para actualizar la paginación
    function actualizarPaginacion(selectedNumber) {
        // Limpiar la paginación existente
        pagingLinksContainer.innerHTML = '';

        // Calcular los números de la paginación
        const numerosPagina = calcularNumerosPaginacion(selectedNumber);

        // Agregar los números de la paginación al contenedor
        numerosPagina.forEach(function(numero) {
            const link = document.createElement("a");
            link.href = "javascript:void(0);";
            link.classList.add("tm-paging-link");
            if (numero === selectedNumber) {
                link.classList.add("active");
            }
            link.textContent = numero;
            pagingLinksContainer.appendChild(link);
        });

        // Habilitar o deshabilitar botón "Previous"
        prevBtn.disabled = selectedNumber === 1;
    }

    // Manejar eventos de clic en números de la paginación
    pagingLinksContainer.addEventListener("click", async function(event) {
        const link = event.target;
        if (link.classList.contains("tm-paging-link")) {
            selectedNumber = parseInt(link.textContent); // Actualizar selectedNumber
            await cargarInformacionYActualizarPaginacion(selectedNumber);
        }
    });

    // Manejar evento de clic en botón "Previous"
    prevBtn.addEventListener("click", async function() {
        if (selectedNumber > 1) {
            selectedNumber--; // Decrementar selectedNumber
            await cargarInformacionYActualizarPaginacion(selectedNumber);
        }
    });

    // Manejar evento de clic en botón "Next Page"
    nextBtn.addEventListener("click", async function() {
        selectedNumber++; // Incrementar selectedNumber
        await cargarInformacionYActualizarPaginacion(selectedNumber);
    });

    // Llamar a la función para cargar la información inicial al cargar la página
    cargarInformacionYActualizarPaginacion(selectedNumber);

    // Seleccionar el input de búsqueda y adjuntar evento de input
    const inputBusqueda = document.querySelector('.tm-search-input');
    inputBusqueda.addEventListener('input', async function() {
        const consulta = inputBusqueda.value.trim();
        selectedNumber = 1; // Resetear el número de página al buscar
        await cargarInformacionYActualizarPaginacion(selectedNumber, consulta);
    });

    // Capitalizar palabras de una oración
    function capitalizeWords(sentence) {
        return sentence
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");
    }

    // Función para renderizar datos
    function renderData(data) {
        const galleryDiv = document.getElementById('bookings');
        // Limpiar los resultados anteriores antes de renderizar nuevos resultados
        galleryDiv.innerHTML = '';
    
        let itemsToRender = data.content || data;
        
        
        if (itemsToRender.length > 0) {
            itemsToRender.forEach(item => {
                const bookingContainer = document.createElement('div');
                bookingContainer.classList.add('col-xl-3', 'col-lg-4', 'col-md-6', 'col-sm-6', 'col-12', 'mb-5', 'booking-container');
                bookingContainer.innerHTML = `
                    <figure class="effect-ming tm-video-item">
                        <img src="img/reservation.jpg" alt="Image" class="img-fluid">
                        <figcaption class="d-flex align-items-center justify-content-center name_and_time">
                            <h2>${item.cliente.nombre}</h2>
                            <h2>${item.cliente.apellido}</h2>
                        </figcaption>                    
                    </figure>
                    <div class="d-flex justify-content-between">
                        <span>${item.cliente.email}</span>
                        <span>Phone: ${item.cliente.telefono}</span>
                    </div>
                `;
                // Asignar el ID de reserva al contenedor
                bookingContainer.dataset.bookingId = item.id;
    
                // Agregar el nuevo elemento al contenedor principal
                galleryDiv.appendChild(bookingContainer);
            });
        } else {
            // Si no hay resultados, mostrar un mensaje "Sin resultados"
            const noResultsMessage = document.createElement('h1');
            noResultsMessage.textContent = 'Sin resultados';
            galleryDiv.appendChild(noResultsMessage);
        }
    
        // Adjuntar el evento de clic a los elementos booking-container después de renderizar los datos
        attachClickEventToBookingContainers();
    }

    // Función para adjuntar el evento de clic a los elementos booking-container
    function attachClickEventToBookingContainers() {
        const bookingContainers = document.querySelectorAll('.booking-container');
        bookingContainers.forEach(container => {
            container.addEventListener('click', () => {
                console.log('Clic en booking-container');
                // Obtener el ID del elemento específico
                const bookingId = container.dataset.bookingId; // Suponiendo que el ID se almacena en un atributo data-booking-id

                // Almacenar el ID en localStorage
                localStorage.setItem('selectedBookingId', bookingId);

                // Redirigir a otra vista
                window.location.href = 'photo-detail.html'; // Reemplaza 'otra_vista.html' con la URL de tu otra vista
            });
        });
    }
});



















































































































































































































// Desde acá byron
