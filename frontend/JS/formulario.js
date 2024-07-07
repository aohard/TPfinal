//Componentes
const form = document.getElementById('formContact');

// Guia de resolucion de error
document.addEventListener("DOMContentLoaded", function() {
    const ayudaEnlace = document.querySelector('.form-help a');

    ayudaEnlace.addEventListener('click', function(event) {
        event.preventDefault(); 

        const mensajeAyuda = "Instrucciones para completar el formulario:\n\n" +
                             "1. Completa los campos obligatorios marcados con asterisco (*).\n" +
                             "2. Ingresa tu nombre en el campo 'Nombre'.\n" +
                             "3. Ingresa tu apellido en el campo 'Apellido'.\n" +
                             "4. Ingresa tu correo electrónico en el campo 'Email'.\n" +
                             "5. Selecciona tu país en el campo 'País'.\n" +
                             "6. Lee y acepta los términos y condiciones marcando la casilla correspondiente.\n" +
                             "7. Haz clic en el botón 'Enviar' para enviar el formulario.\n\n" +
                             "¡Gracias por completar el formulario!";

        alert(mensajeAyuda);
    });
});

// Validador de mail
document.addEventListener("DOMContentLoaded", function() {
    const emailInput = document.getElementById('email');
    
    
    form.addEventListener('submit', function(event) {
        if (!validateEmail(emailInput.value)) {
            alert('Por favor, ingresa una dirección de correo electrónico válida.');
            event.preventDefault(); // Evitar el envío del formulario
        }
    });
    
    // Función para validar el formato de correo electrónico utilizando una expresión regular
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar formato de email
        return regex.test(email);
    }
});



//validador de checkbox
document.addEventListener("DOMContentLoaded", function() {

    form.addEventListener('submit', function(event) {
       
        const termsCheckbox = form.querySelector('#terms');
        if (!termsCheckbox.checked) {
            alert('Por favor, acepta los términos y condiciones.');
            event.preventDefault(); 
            return;
        }
        
        
        const camposObligatorios = form.querySelectorAll('[required]');
        let faltanCompletar = false;

        camposObligatorios.forEach(function(campo) {
            if (!campo.value.trim()) { 
                faltanCompletar = true;
            }
        });

        
        if (faltanCompletar) {
            alert('Por favor, completa todos los campos obligatorios.');
            event.preventDefault(); 
        }
    });
});