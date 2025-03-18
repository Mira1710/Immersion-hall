document.addEventListener("DOMContentLoaded", function () {
    // Создаю шум на фон
    grained('#homepages', {})

    let options = {
    "animate": true,
    "patternWidth": 100,
    "patternHeight": 100,
    "grainOpacity": 0.13,
    "grainDensity": 1,
    "grainWidth": 1,
    "grainHeight": 1
}

    grained("#homepages", options);
    window.addEventListener('resize', () => {
        grained("#homepages", options);
    });

    window.addEventListener('scroll', () => {
        grained("#homepages", options);
    });

// Создаю анимированный градиент

    const gradientBackgrounds = document.querySelectorAll('.gradient-background');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const color1 = `rgba(${Math.round(x * 255)}, ${Math.round(y * 255)}, 150, 1)`;
        const color2 = `rgba(${Math.round((1 - x) * 255)}, ${Math.round((1 - y) * 255)}, 200, 1)`;

        gradientBackgrounds.forEach(element => {
            element.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
        });
    });

    // Создаю эффект для курсора

    const glass = document.getElementById('glass');

    function moveElement(event) {
        const offsetX = 10;

        const x = event.clientX + offsetX;
        const y = event.clientY;

        glass.style.left = `${event.clientX}px`;
        glass.style.top = `${event.clientY}px`;
    }

    document.addEventListener('mousemove', moveElement);


    const hlImage = document.querySelector('.hl');
    const turbulence = document.querySelector('#water-effect feTurbulence');

    if (!hlImage || !turbulence) {
        console.error('Элементы не найдены!');
        return;
    }

    hlImage.addEventListener('mousemove', (e) => {
        const rect = hlImage.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        turbulence.setAttribute('baseFrequency', `${x * 0.05} ${y * 0.05}`);
    });

    hlImage.addEventListener('mouseleave', () => {
        turbulence.setAttribute('baseFrequency', '0.01 0.01');
    });































































































































})