document.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos
    const botonAsesoria = document.querySelector('#inicio button');
    const modal = document.getElementById('modalContacto');
    const botonCerrar = document.querySelector('.boton-cerrar');
    const formulario = document.getElementById('formularioRiego');

    // 1. Abrir Modal al presionar el botón principal y desplazar pantalla
    botonAsesoria.addEventListener('click', () => {
        // Primero hacemos visible el modal quitando la clase que lo oculta
        modal.classList.remove('modal-oculto');
        modal.classList.add('modal-visible');

        // Autodesplazamiento suave directo hacia el recuadro del formulario
        const cuadroContenido = document.querySelector('.contenido-modal');
        cuadroContenido.scrollIntoView({ 
            behavior: 'smooth', // Hace que el movimiento sea sutil y fluido
            block: 'center'     // Centra el formulario perfectamente en tu pantalla
        });
    });


    // 2. Cerrar Modal al presionar la 'X'
    botonCerrar.addEventListener('click', () => {
        cerrarModal();
    });

    // 3. Cerrar Modal si hacen clic fuera del cuadro blanco
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });

    function cerrarModal() {
        modal.classList.remove('modal-visible');
        modal.classList.add('modal-oculto');
    }

    // 4. Procesar el formulario de forma segura (Prevenir recarga de página)
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se refresque, manteniendo el estado local
        
        // Capturar datos simulando una validación previa
        const nombreVal = document.getElementById('nombre').value;
        const hectareasVal = document.getElementById('hectareas').value;
        const cultivoVal = document.getElementById('cultivo').value;

        console.log('Datos listos para enviar de forma segura:', { nombreVal, hectareasVal, cultivoVal });
        
        alert(`¡Perfecto ${nombreVal}! Hemos registrado tu solicitud para un sistema de riego en ${hectareasVal} hectáreas de ${cultivoVal}.`);
        formulario.reset();
        cerrarModal();
    });
});
