document.addEventListener('DOMContentLoaded', () => {
        // --- LÓGICA DEL MENÚ DE HAMBURGUESA ---
    const btnHamburguesa = document.getElementById('btnHamburguesa');
    const menuNavegacion = document.getElementById('menuNavegacion');
    const enlacesMenu = document.querySelectorAll('#menuNavegacion a');

    // Alternar apertura al dar clic en las 3 rayitas
    btnHamburguesa.addEventListener('click', () => {
        btnHamburguesa.classList.toggle('activo'); // Activa la animación a 'X'
        menuNavegacion.classList.toggle('menu-abierto'); // Despliega el menú
    });

    // Cerrar el menú automáticamente cuando se da clic en una opción (Inicio, Sistemas, etc.)
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', () => {
            btnHamburguesa.classList.remove('activo');
            menuNavegacion.classList.remove('menu-abierto');
        });
    });

    // ==========================================
    // --- LÓGICA DEL SIMULADOR DE CRÉDITO ---
    // ==========================================
    const rangeMonto = document.getElementById('rangeMonto');
    const rangePlazo = document.getElementById('rangePlazo');
    const txtMonto = document.getElementById('txtMonto');
    const txtPlazo = document.getElementById('txtPlazo');
    const calcPagoAnual = document.getElementById('calcPagoAnual');

    function calcularCredito() {
        const monto = parseInt(rangeMonto.value);
        const plazo = parseInt(rangePlazo.value);
        
        // Formatear texto del Monto actual en pesos mexicanos
        txtMonto.textContent = `$${monto.toLocaleString('es-MX')} MXN`;
        
        // Formatear texto del Plazo actual
        txtPlazo.textContent = `${plazo} ${plazo === 1 ? 'Año' : 'Años'}`;
        
        // Fórmula básica referencial: (Capital / Plazo) + Interés Estimado Promedio Anual (14% base)
        const capitalAnual = monto / plazo;
        const interesEstimadoAnual = monto * 0.06;
        const pagoAnualTotal = Math.round(capitalAnual + (interesEstimadoAnual / (plazo === 1 ? 1 : 1.5)));

        // Inyectar el resultado formateado en la tarjeta de salida
        calcPagoAnual.textContent = `$${pagoAnualTotal.toLocaleString('es-MX')} MXN`;
    }

    // Escuchar el movimiento continuo de los controles deslizantes
    rangeMonto.addEventListener('input', calcularCredito);
    rangePlazo.addEventListener('input', calcularCredito);

    // Inicializar el cálculo al cargar la página por primera vez
    calcularCredito();

    // ==========================================
    // --- INTEGRACIÓN SEGURO CON WHATSAPP ---
    // ==========================================
    const formWhatsApp = document.getElementById('formContactoWhatsApp');

    if (formWhatsApp) {
        formWhatsApp.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir recarga física de la página
            
            // Capturar las variables del formulario
            const nombre = document.getElementById('cNombre').value;
            const telefono = document.getElementById('cTelefono').value;
            const ubicacion = document.getElementById('cUbicacion').value || 'No especificada';
            const cultivo = document.getElementById('cCultivo').value || 'No especificado';
            const interes = document.getElementById('cInteres').value;
            const mensaje = document.getElementById('cMensaje').value || 'Sin detalles adicionales';

            // Redactar el texto codificado de manera segura para la URL de WhatsApp
            const textoMensaje = `Hola DAEGRO, solicito información.%0A%0A` +
                                 `• *Nombre:* ${nombre}%0A` +
                                 `• *Teléfono:* ${telefono}%0A` +
                                 `• *Ubicación:* ${ubicacion}%0A` +
                                 `• *Cultivo/Proyecto:* ${cultivo}%0A` +
                                 `• *Interés:* ${interes}%0A` +
                                 `• *Mensaje:* ${mensaje}`;

            // Número de WhatsApp principal del negocio de tus socios (en formato internacional)
            const numeroTelefonoNegocio = "528713990921"; 

            // Abrir una nueva pestaña segura con la API de WhatsApp conteniendo el texto
            window.open(`https://wa.me{numeroTelefonoNegocio}?text=${textoMensaje}`, '_blank');
            
            formWhatsApp.reset(); // Limpiar el formulario localmente
        });
    }

});
