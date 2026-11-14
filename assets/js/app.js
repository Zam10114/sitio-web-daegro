document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // --- LÓGICA DEL MENÚ DE HAMBURGUESA ---
    // ==========================================
    const btnHamburguesa = document.getElementById('btnHamburguesa');
    const menuNavegacion = document.getElementById('menuNavegacion');
    const controlMenu = document.querySelector('.control-menu');

    if (btnHamburguesa && menuNavegacion) {
        const enlacesMenu = menuNavegacion.querySelectorAll('a');

        function establecerMenu(abierto) {
            btnHamburguesa.classList.toggle('activo', abierto);
            menuNavegacion.classList.toggle('menu-abierto', abierto);
            btnHamburguesa.setAttribute('aria-expanded', String(abierto));
        }

        btnHamburguesa.addEventListener('click', () => {
            const estaAbierto = btnHamburguesa.getAttribute('aria-expanded') === 'true';
            establecerMenu(!estaAbierto);
        });

        enlacesMenu.forEach(enlace => {
            enlace.addEventListener('click', () => establecerMenu(false));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && btnHamburguesa.getAttribute('aria-expanded') === 'true') {
                establecerMenu(false);
                btnHamburguesa.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (
                controlMenu &&
                btnHamburguesa.getAttribute('aria-expanded') === 'true' &&
                !controlMenu.contains(e.target)
            ) {
                establecerMenu(false);
            }
        });
    }

    // ==========================================
    // --- LÓGICA DEL SIMULADOR DE CRÉDITO ---
    // ==========================================
    const rangeMonto = document.getElementById('rangeMonto');
    const rangePlazo = document.getElementById('rangePlazo');
    const txtMonto = document.getElementById('txtMonto');
    const txtPlazo = document.getElementById('txtPlazo');
    const calcPagoAnual = document.getElementById('calcPagoAnual');
    const resumenCredito = document.getElementById('resumenCredito');

    const TASA_ANUAL_REFERENCIA = 0.14;
    let ultimoResumenSimulado = '';

    function calcularPagoAnual(monto, anios, tasa) {
        if (tasa === 0) return monto / anios;
        return monto * tasa / (1 - Math.pow(1 + tasa, -anios));
    }

    function calcularCredito() {
        const monto = parseInt(rangeMonto.value, 10);
        const plazo = parseInt(rangePlazo.value, 10);

        const montoFormateado = `$${monto.toLocaleString('es-MX')} MXN`;
        const plazoTexto = `${plazo} ${plazo === 1 ? 'Año' : 'Años'}`;

        txtMonto.textContent = montoFormateado;
        txtPlazo.textContent = plazoTexto;

        const pagoAnualTotal = Math.round(calcularPagoAnual(monto, plazo, TASA_ANUAL_REFERENCIA));
        const pagoAnualTexto = `$${pagoAnualTotal.toLocaleString('es-MX')} MXN`;
        calcPagoAnual.textContent = pagoAnualTexto;

        const totalAPagar = pagoAnualTotal * plazo;
        const intereses = totalAPagar - monto;

        resumenCredito.textContent =
            `${plazo} ${plazo === 1 ? 'pago anual' : 'pagos anuales'} · ` +
            `Total a pagar: $${totalAPagar.toLocaleString('es-MX')} MXN ` +
            `(intereses: $${intereses.toLocaleString('es-MX')} MXN)`;

        ultimoResumenSimulado =
            `Solicito información para financiamiento agrícola (Simulador: ${montoFormateado} a ${plazoTexto}, pago anual estimado ${pagoAnualTexto}).`;
    }

    if (rangeMonto && rangePlazo && txtMonto && txtPlazo && calcPagoAnual && resumenCredito) {
        rangeMonto.addEventListener('input', calcularCredito);
        rangePlazo.addEventListener('input', calcularCredito);
        calcularCredito();
    }

    // ==========================================
    // --- BUSCADOR DE RECURSOS TÉCNICOS ---
    // ==========================================
    const inputBusqueda = document.getElementById('inputBuscarRecursos');
    const estadoBusqueda = document.getElementById('estadoBusqueda');
    const tarjetasArticulo = document.querySelectorAll('.tarjeta-articulo');

    function normalizar(texto) {
        return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    if (inputBusqueda && estadoBusqueda) {
        inputBusqueda.addEventListener('input', () => {
            const consulta = normalizar(inputBusqueda.value.trim());
            let visibles = 0;

            tarjetasArticulo.forEach(tarjeta => {
                const texto = [...tarjeta.querySelectorAll('.categoria-articulo, h3, p')]
                    .map(el => el.textContent)
                    .join(' ');
                const coincide = normalizar(texto).includes(consulta);
                tarjeta.hidden = !coincide;
                if (coincide) visibles++;
            });

            if (consulta === '') {
                estadoBusqueda.textContent = '';
            } else if (visibles === 0) {
                estadoBusqueda.textContent = 'No encontramos artículos con ese tema.';
            } else {
                estadoBusqueda.textContent = `${visibles} ${visibles === 1 ? 'artículo encontrado' : 'artículos encontrados'}.`;
            }
        });
    }

    // ==========================================
    // --- PRELLENADO INTELIGENTE EN FORMULARIO ---
    // ==========================================
    const cInteres = document.getElementById('cInteres');
    const cMensaje = document.getElementById('cMensaje');
    const btnTramitarCredito = document.getElementById('btnTramitarCredito');
    const enlacesPrefill = document.querySelectorAll('.js-prefill-contacto');

    function prellenarContacto(interes, mensaje) {
        if (cInteres && interes) {
            const existeOpcion = [...cInteres.options].some(opt => opt.value === interes);
            if (existeOpcion) cInteres.value = interes;
        }
        if (cMensaje && mensaje) {
            cMensaje.value = mensaje;
        }
    }

    if (btnTramitarCredito) {
        btnTramitarCredito.addEventListener('click', () => {
            prellenarContacto('Financiamiento Agrícola (Caja Solidaria)', ultimoResumenSimulado);
        });
    }

    enlacesPrefill.forEach(enlace => {
        enlace.addEventListener('click', () => {
            prellenarContacto(enlace.dataset.interes, enlace.dataset.mensaje);
        });
    });

    // ==========================================
    // --- INTEGRACIÓN SEGURA CON WHATSAPP ---
    // ==========================================
    const formWhatsApp = document.getElementById('formContactoWhatsApp');
    const estadoFormulario = document.getElementById('estadoFormulario');

    if (formWhatsApp) {
        formWhatsApp.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('cNombre').value;
            const telefono = document.getElementById('cTelefono').value;
            const ubicacion = document.getElementById('cUbicacion').value || 'No especificada';
            const cultivo = document.getElementById('cCultivo').value || 'No especificado';
            const interes = document.getElementById('cInteres').value;
            const mensaje = document.getElementById('cMensaje').value || 'Sin detalles adicionales';

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

            const numeroTelefonoNegocio = '528713990921';
            const url = `https://wa.me/${numeroTelefonoNegocio}?text=${encodeURIComponent(texto)}`;

            const ventana = window.open(url, '_blank', 'noopener,noreferrer');

            if (ventana) {
                if (estadoFormulario) {
                    estadoFormulario.hidden = true;
                    estadoFormulario.textContent = '';
                }
                formWhatsApp.reset();
            } else if (estadoFormulario) {
                estadoFormulario.textContent = 'Tu navegador bloqueó la ventana emergente. ';
                const enlaceDirecto = document.createElement('a');
                enlaceDirecto.href = url;
                enlaceDirecto.target = '_blank';
                enlaceDirecto.rel = 'noopener noreferrer';
                enlaceDirecto.textContent = 'Haz clic aquí para abrir WhatsApp';
                estadoFormulario.appendChild(enlaceDirecto);
                estadoFormulario.hidden = false;
            }
        });
    }
});
