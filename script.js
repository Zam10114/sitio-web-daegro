document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DEL MENÚ DE HAMBURGUESA ---
    const btnHamburguesa = document.getElementById('btnHamburguesa');
    const menuNavegacion = document.getElementById('menuNavegacion');
    const enlacesMenu = document.querySelectorAll('#menuNavegacion a');

    // Una sola función decide el estado del menú: así nada queda desincronizado
    function establecerMenu(abierto) {
        btnHamburguesa.classList.toggle('activo', abierto);
        menuNavegacion.classList.toggle('menu-abierto', abierto);
        btnHamburguesa.setAttribute('aria-expanded', String(abierto));
    }

    btnHamburguesa.addEventListener('click', () => {
        const estaAbierto = btnHamburguesa.getAttribute('aria-expanded') === 'true';
        establecerMenu(!estaAbierto);
    });

    // Cerrar al elegir una opción
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', () => establecerMenu(false));
    });

    // Cerrar con Escape y devolver el foco al botón
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && btnHamburguesa.getAttribute('aria-expanded') === 'true') {
            establecerMenu(false);
            btnHamburguesa.focus();
        }
    });

    // ==========================================
    // --- LÓGICA DEL SIMULADOR DE CRÉDITO ---
    // ==========================================
    const rangeMonto = document.getElementById('rangeMonto');
    const rangePlazo = document.getElementById('rangePlazo');
    const txtMonto = document.getElementById('txtMonto');
    const txtPlazo = document.getElementById('txtPlazo');
    const calcPagoAnual = document.getElementById('calcPagoAnual');

    // Tasa anual de referencia (decimal). OJO: 0.18 es solo de práctica, ver nota abajo.
    const TASA_ANUAL_REFERENCIA = 0.18;

    function calcularPagoAnual(monto, anios, tasa) {
        if (tasa === 0) return monto / anios; // evita dividir entre cero
        return monto * tasa / (1 - Math.pow(1 + tasa, -anios));
    }

    function calcularCredito() {
        const monto = parseInt(rangeMonto.value);
        const plazo = parseInt(rangePlazo.value);
        
        // Formatear texto del Monto actual en pesos mexicanos
        txtMonto.textContent = `$${monto.toLocaleString('es-MX')} MXN`;
        
        // Formatear texto del Plazo actual
        txtPlazo.textContent = `${plazo} ${plazo === 1 ? 'Año' : 'Años'}`;
        
        const pagoAnualTotal = Math.round(calcularPagoAnual(monto, plazo, TASA_ANUAL_REFERENCIA));

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
            const texto = [
                'Hola DAEGRO, solicito información.',
                '',
                `• *Nombre:* ${nombre.trim().slice(0, 100)}`,
                `• *Teléfono:* ${telefono.trim().slice(0, 20)}`,
                `• *Ubicación:* ${ubicacion.trim().slice(0, 100)}`,
                `• *Cultivo/Proyecto:* ${cultivo.trim().slice(0, 100)}`,
                `• *Interés:* ${interes}`,
                `• *Mensaje:* ${mensaje.trim().slice(0, 500)}`
            ].join('\n');

            const numeroTelefonoNegocio = "528713990921";
            const url = `https://wa.me/${numeroTelefonoNegocio}?text=${encodeURIComponent(texto)}`;

            window.open(url, '_blank', 'noopener,noreferrer');

            formWhatsApp.reset(); // Limpiar el formulario localmente
        });
    }
});
