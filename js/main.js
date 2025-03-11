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

    let selectedDifficulty = null;
    let selectedGenre = null;
    const startButton = document.getElementById("start-btn");

    document.querySelectorAll(".difficulty-btn").forEach(p => {
        p.addEventListener("click", () => {
            selectedDifficulty = p.dataset.difficulty;
            highlightSelection(".difficulty-btn", p);
            checkStartCondition();
        });
    });
    function highlightSelection(selector, selectedElement) {
        document.querySelectorAll(selector).forEach(el => el.classList.remove("selected"));
        selectedElement.classList.add("selected");
    }
    function checkStartCondition() {
        if (selectedDifficulty && selectedGenre) {
            startButton.removeAttribute("disabled");
            startButton.classList.add("active");
        }
    }
    startButton.addEventListener("click", () => {
        if (selectedDifficulty && selectedGenre) {
            startGame(selectedDifficulty, selectedGenre);
        }
    });

































































































































})