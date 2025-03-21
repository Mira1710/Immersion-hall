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
        // выбор сложности
        const difficultyButtons = document.querySelectorAll('.difficulty-btn');
        difficultyButtons.forEach(button => {
            button.addEventListener('click', () => {
                difficultyButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

    // выбор жанра
const genreButtons = document.querySelectorAll('.genre-btn');
genreButtons.forEach(button => {
    button.addEventListener('click', () => {
        genreButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    })
})

    // создаю игру
    const startScreen = document.getElementById('screen_game');
    const gameScreen = document.getElementById('game-screen');
    const startButton = document.querySelector('.start_game');
    const notesContainer = document.getElementById('notes-container');
    const scoreElement = document.getElementById('score');
    let caughtNotes = 0

    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedDifficulty = button.getAttribute('data-difficulty');
            difficultyButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Обработка выбора жанра
    genreButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedGenre = button.getAttribute('data-genre');
            genreButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Начало игры
    startButton.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        caughtNotes = 0
        scoreElement.textContent = 'Поймано нот: 0';
        startGame(selectedDifficulty, selectedGenre);
    });

    // Логика игры
    function startGame(difficulty, genre) {
        const noteSpeed = getNoteSpeed(difficulty);
        const notesInterval = getNotesInterval(difficulty);

        // Генерация нот
        const noteGenerator = setInterval(() => {
            const note = createNote();
            moveNote(note, noteSpeed);
        }, notesInterval);

        // Остановка игры через 30 секунд (для примера)
        setTimeout(() => {
            clearInterval(noteGenerator);
            alert(`Игра окончена! Поймано нот: ${caughtNotes}`); // Показываем количество пойманных нот
            resetGame();
        }, 30000);
    }

// Обновляем счётчик при клике на ноту
    note.addEventListener('click', () => {
        note.style.backgroundColor = 'purple';
        setTimeout(() => note.remove(), 200);
        caughtNotes++;
        scoreElement.textContent = `Поймано нот: ${caughtNotes}`; // Обновляем счётчик на экране
    });

    // Создание ноты (SVG)
    function createNote() {
        const note = document.createElement('img');
        note.classList.add('note');
        note.src = 'img/note.svg'; // Ваш SVG-файл ноты
        note.style.left = `${Math.random() * 90}%`;
        note.style.top = `-40px`;
        notesContainer.appendChild(note);

        // Обработка клика по ноте
        note.addEventListener('click', () => {
            note.src = 'img/purple-note.svg'; // Фиолетовая нота (ваш SVG)
            setTimeout(() => note.remove(), 200); // Удаляем ноту через 200 мс
            caughtNotes++; // Увеличиваем счётчик пойманных нот
            scoreElement.textContent = `Поймано нот: ${caughtNotes}`; // Обновляем счётчик на экране
        });

        return note;
    }


    // Движение ноты
    function moveNote(note, speed) {
        let position = -40;
        const interval = setInterval(() => {
            position += 2;
            note.style.top = `${position}px`;

            // Удаление ноты, если она вышла за пределы экрана
            if (position > 300) {
                clearInterval(interval);
                note.remove();
            }
        }, speed);
    }

    // Получение скорости нот в зависимости от сложности
    function getNoteSpeed(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 50;
            case 'medium':
                return 30;
            case 'hard':
                return 10;
            default:
                return 50;
        }
    }

    // Интервал генерации нот в зависимости от сложности
    function getNotesInterval(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 1500;
            case 'medium':
                return 1000;
            case 'hard':
                return 500;
            default:
                return 1500;
        }
    }

    // Сброс игры
    function resetGame() {
        notesContainer.innerHTML = ''; // Очистка контейнера с нотами
        gameScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    }









        // анимированный футер
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