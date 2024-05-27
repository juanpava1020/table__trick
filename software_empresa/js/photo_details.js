//Selectores 
const form = document.getElementById("editForm");

document.addEventListener("DOMContentLoaded", function() {
    // Obtener el ID de reserva almacenado en localStorage
    const selectedBookingId = localStorage.getItem('selectedBookingId');
    console.log(selectedBookingId);

    if (!selectedBookingId) {
        console.error('No se ha encontrado un ID de reserva en el almacenamiento local.');
        return; // Salir de la función si no hay ID de reserva
    }

    cargarDatosEspecificos(selectedBookingId);

    async function cargarDatosEspecificos(bookingId) {
        try {
            const url = `http://localhost:8080/api/sistemareservas/v1/reserva/${bookingId}`;
            console.log(url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); 

            console.log(data);
            
            // Guardar idCliente e idRestaurante en variables globales
            window.idCliente = data.cliente.id;
            window.idRestaurante = data.restaurante.id;

            pintarDatos(data);
            document.getElementById("inputType").value = data.tipo
            document.getElementById("inputTime").value = data.hora
            document.getElementById("inputDate").value = data.fecha
            document.getElementById("inputDescription").value = data.descripcion
            document.getElementById("inputAmount").value = data.cantidadPersonas

        } catch (error) {
            console.log("Error: ",  error + " catch");
        }
    }

    // Selectores (Importantes para pintar)
    function dataUpdate() {
        const type  = document.getElementById("inputType").value
        const time  = document.getElementById("inputTime").value
        const date  = document.getElementById("inputDate").value
        const description = document.getElementById("inputDescription").value
        const amount = document.getElementById("inputAmount").value

        console.log(type);
        console.log(time);
        console.log(date);
        console.log(description);
        console.log(amount);

        const updateBooking = {
            "hora": time,
            "fecha": date,
            "tipo": type,
            "cantidadPersonas": amount,
            "descripcion": description,
            "idCliente": window.idCliente, // Usar idCliente almacenado globalmente
            "idRestaurante": window.idRestaurante // Usar idRestaurante almacenado globalmente
        }

        return updateBooking;
    }

    async function postData() {
        const dataToUpdate = dataUpdate(); // Llamar a la función dataUpdate para obtener los datos actualizados

        const selectedBookingId = localStorage.getItem('selectedBookingId');
        const url = `http://localhost:8080/api/sistemareservas/v1/reserva/${selectedBookingId}`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToUpdate) // Llamar a la función dataUpdate para obtener los datos actualizados
        });
        return response.json();
    }

    async function deleteData() {
        const selectedBookingId = localStorage.getItem('selectedBookingId');
        const url = `http://localhost:8080/api/sistemareservas/v1/reserva/${selectedBookingId}`
        
        await fetch(url, {
            method: "DELETE", 
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    function pintarDatos(data) {
        //Donde vamos a inyectar
        const infoDiv = document.getElementById('info-details');
        infoDiv.innerHTML = `
            <div class="tm-bg-gray tm-video-details">
                <p class="mb-4">
                    Nombre: ${data.cliente.nombre}
                </p>
                <p class="mb-4">
                    Type: ${data.tipo}
                </p>
                <p class="mb-4">
                    Amount: ${data.cantidadPersonas}
                </p>
                <p class="mb-4">
                    Description: ${data.descripcion}
                </p>
                <p class="mb-4">
                    Date: ${data.fecha}
                </p>
                <p class="mb-4">
                    Time: ${data.hora}
                </p>
                <p class="mb-4">
                    Restaurant: ${data.restaurante.nombreComercial}
                </p>
                <div class="text-center mb-5 d-flex justify-content-center">
                    <a href="#" id="editBtn" class="btn btn-primary tm-btn-big mr-3" data-toggle="modal" data-target="#editModal">Edit</a>
                    <a href="#" id="deleteBtn" class="btn btn-danger tm-btn-big">Delete</a>
                </div>  
            </div>
        `;

        const editBtn = document.getElementById("editBtn");
        const deleteBtn = document.getElementById("deleteBtn");
        const saveChangesBtn = document.getElementById("saveChangesBtn");

        editBtn.addEventListener("click", function() {
            const editModal = new bootstrap.Modal(document.getElementById('editModal'));
            editModal.show();
        });

        deleteBtn.addEventListener("click", function() {
            // Mostrar SweetAlert para confirmar la eliminación
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Esta acción no se puede deshacer",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteData(); 
                    alert("Eliminado correctamente")
                    window.location.href = 'index.html';
                }
            });
        });

        saveChangesBtn.addEventListener("click", async function() {
            // Realizar la lógica para guardar los cambios aquí
            await postData(); 
            location.reload();
            // Cerrar el modal y esperar a que se complete
        });
    }

    // Ocultar el modal de edición al inicio
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.hide();

    // Escuchar el evento hidden.bs.modal para realizar acciones después de cerrar el modal
    $('#editModal').on('hidden.bs.modal', function (e) {
        // Restablecer el fondo opaco después de cerrar el modal
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    });

    cargarDatosEspecificos();
});
