document.addEventListener('DOMContentLoaded', function() {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const toggleLinks = document.querySelectorAll('.toggle');

    toggleLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelector('.sign-in-form').classList.toggle('hide');
            document.querySelector('.sign-up-form').classList.toggle('hide');
        });
    });

    signInForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const loginName = document.getElementById('loginName').value;
        const loginPassword = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://localhost:8080/api/sistemareservas/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: loginName,
                    password: loginPassword
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Login exitoso',
                    text: 'Has iniciado sesión correctamente'
                }).then(() => {
                    // Redirigir a otra página o actualizar la interfaz
                    window.location.href = "../../software_empresa/index.html";
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login fallido',
                    text: 'Credenciales incorrectas'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error. Por favor intenta nuevamente'
            });
        }
    });

    signUpForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const registerName = document.getElementById('registerName').value;
        const registerEmail = document.getElementById('registerEmail').value;
        const registerPassword = document.getElementById('registerPassword').value;

        try {
            const response = await fetch('http://localhost:8080/api/sistemareservas/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: registerName,
                    email: registerEmail,
                    password: registerPassword
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'Te has registrado correctamente'
                }).then(() => {
                    // Redirigir a otra página o actualizar la interfaz
                    // window.location.href = '/dashboard';
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registro fallido',
                    text: 'No se ha podido completar el registro'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error. Por favor intenta nuevamente'
            });
        }
    });
});
