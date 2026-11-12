document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('bannerCookies');
    const btnAceptar = document.getElementById('btnAceptarCookies');
    const btnRechazar = document.getElementById('btnRechazarCookies');

    // Revisar si el usuario ya tomó una decisión anteriormente
    const preferenciaCookies = localStorage.getItem('daegro_cookies_consent');

    if (!preferenciaCookies && banner) {
        banner.hidden = false;
    }

    function guardarPreferencia(estado) {
        localStorage.setItem('daegro_cookies_consent', estado);
        banner.hidden = true;
        
        if (estado === 'aceptadas') {
            // Aquí activarías scripts de terceros (ej. Google Analytics) en el futuro
            console.log('Cookies analíticas activadas.');
        }
    }

    if (btnAceptar) btnAceptar.addEventListener('click', () => guardarPreferencia('aceptadas'));
    if (btnRechazar) btnRechazar.addEventListener('click', () => guardarPreferencia('necesarias'));
});
