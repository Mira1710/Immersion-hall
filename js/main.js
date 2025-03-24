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
        const offsetX = 1;
        const offsetY = 1;


        const vwToPx = (vw) => (window.innerWidth * vw) / 100;

        const x = event.clientX + vwToPx(offsetX);
        const y = event.clientY + vwToPx(offsetY);

        // Проверка границ, чтобы стекло не выходило за пределы экрана
        const maxX = window.innerWidth - glass.offsetWidth;
        const maxY = window.innerHeight - glass.offsetHeight;

        glass.style.left = `${Math.min(Math.max(x, 0), maxX)}px`;
        glass.style.top = `${Math.min(Math.max(y, 0), maxY)}px`;
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

        // Остановка игры через 30 секунд
        setTimeout(() => {
            clearInterval(noteGenerator);
            alert(`Игра окончена! Поймано нот: ${caughtNotes}`);
            resetGame();
        }, 30000);
    }


    function createNote() {
        const note = document.createElement('img');
        note.classList.add('note');
        note.src = 'img/note.svg'; // Ваш SVG-файл ноты
        note.style.left = `${Math.random() * 90}%`;
        note.style.top = `-40px`;
        notesContainer.appendChild(note);

        note.addEventListener('click', () => {
            note.src = 'img/purple-note.svg';
            setTimeout(() => note.remove(), 200);
            caughtNotes++;
            scoreElement.textContent = `Поймано нот: ${caughtNotes}`;
        });
        return note;
    }

    function moveNote(note, speed) {
        let position = -40;
        const interval = setInterval(() => {
            position += 2;
            note.style.top = `${position}px`;

            if (position > 300) {
                clearInterval(interval);
                note.remove();
            }
        }, speed);
    }

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

    function resetGame() {
        notesContainer.innerHTML = '';
        gameScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    }


    // Резонанс тишины
    document.querySelector('.start_game2').addEventListener('click', function() {
        const imageContainer = document.querySelector('.image-container');
        const button = document.querySelector('.start_game2');
        let timeLeft = 120; // 2 минуты в секундах

        // Удаляем исходное изображение
        const dynamicImage = document.getElementById('dynamicImage');
        dynamicImage.remove();

        // Создаем новый элемент SVG-круга
        const svgNS = "http://www.w3.org/2000/svg";
        const svgElement = document.createElementNS(svgNS, "svg");
        svgElement.setAttribute("width", "150");
        svgElement.setAttribute("height", "150");
        svgElement.setAttribute("viewBox", "0 0 100 100");
        svgElement.classList.add("circle-animation");

        const circleElement = document.createElementNS(svgNS, "circle");
        circleElement.setAttribute("cx", "50");
        circleElement.setAttribute("cy", "50");
        circleElement.setAttribute("r", "40");
        circleElement.setAttribute("stroke", "#4C0095");
        circleElement.setAttribute("stroke-width", "1");
        circleElement.setAttribute("fill", "none");

        svgElement.appendChild(circleElement);
        imageContainer.appendChild(svgElement);

        button.disabled = true;
        button.style.cursor = 'default';

        const timerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            button.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                svgElement.remove();
                imageContainer.innerHTML = '<img id="dynamicImage" src="./img/initial-image.svg" alt="Initial Image">'; // Возвращаем исходное изображение
                button.textContent = 'Старт';
                button.disabled = false;
                button.style.cursor = 'pointer';
                alert('Теперь ваши мысли в покое!');
            } else {
                timeLeft--;
            }
        }, 1000);
    });

    // Эхо зала
    let activeSeat = null;
    document.querySelector(".start_game3").addEventListener("click", function() {
        this.style.display = "none";
        let hall = document.getElementById("hall");
        hall.style.display = "block";

        let seatPositions = [
            { top: "5%", left: "5%", text: "Звук в этой зоне будет восприниматься с небольшими отражениями от потолка и боковой стены. Из-за удалённости от сцены, звук будет несколько приглушённым и рассеянным. Однако, благодаря эффектам отражений, можно ощутить лёгкое эхо, что придаёт звуку оттенок отдалённости и мягкости." },
            { top: "5%", left: "47%", text: "В верхнем центре звук будет более чётким и ярким, чем в боковых частях. Это связано с тем, что зона расположена ближе к акустическому фокусу, но всё ещё испытывает легкие отражения от потолка и стен. Звук будет несколько смазанным, но сохраняет большую чёткость и разборчивость." },
            { top: "5%", left: "90%", text: "В правой верхней зоне звук будет также немного приглушённым и рассеянным, что создаст эффект отдалённости от сцены. Однако в этой части возможны слабые отражения от стен и потолка, что придаёт звуку лёгкую тёплоту и мягкость." },
            { top: "85%", left: "5%", text: "Звук в левой нижней части будет насыщенным и чётким, так как эта зона находится ближе к источнику звука. Здесь акустические волны будут распространяться более прямолинейно, без сильных отражений, создавая яркое и мощное восприятие звука." },
            { top: "85%", left: "47%", text: "В центре нижней части зала звук будет максимально ярким и чётким, так как эта зона расположена прямо перед сценой. Эхо и отражения минимальны, и звук будет восприниматься как чистый и насыщенный, с максимальной интенсивностью." },
            { top: "85%", left: "90%", text: "В правой нижней части звук будет таким же ярким и чётким, как и в левой нижней, но с лёгкими отражениями от правой стороны. Это придаёт звуку тёплые оттенки и слегка сглаживает его интенсивность, но он остаётся достаточно насыщенным и сбалансированным." },
            { top: "45%", left: "5%", text: "В боковой левой зоне звук будет мягким и округлым, так как волны будут распространяться вдоль боковой стены и частично поглощаться её поверхностью. Это создаст ощущение гармонии, но звук будет немного приглушённым, создавая атмосферу уединения." },
            { top: "45%", left: "90%", text: "В правой боковой зоне звук будет немного более ярким и чётким, чем в левой, из-за расположения относительно правой стены. Он будет мягким и округлым, с минимальными отражениями, создавая гармоничное восприятие звуковой атмосферы, но слегка приглушённым по сравнению с центральными позициями." }
        ];

        let tooltip = document.getElementById("tooltip");
        let activeSeat = null;

        // Стили для центрированной подсказки
        tooltip.style.position = "absolute";
        tooltip.style.top = "50%";
        tooltip.style.left = "50%";
        tooltip.style.transform = "translate(-50%, -50%)";
        tooltip.style.width = "80%";
        tooltip.style.maxWidth = "600px";
        tooltip.style.backgroundColor = "rgba(76, 0, 149, 0.95)";
        tooltip.style.color = "white";
        tooltip.style.zIndex = "1000";
        tooltip.style.display = "none";

        seatPositions.forEach(pos => {
            let seat = document.createElement("div");
            seat.className = "seat";
            seat.style.top = pos.top;
            seat.style.left = pos.left;
            seat.dataset.text = pos.text;
            hall.appendChild(seat);

            seat.addEventListener("click", function(event) {
                if (activeSeat === this) {
                    this.classList.remove("active");
                    tooltip.style.display = "none";
                    activeSeat = null;
                    return;
                }


                if (activeSeat) {
                    activeSeat.classList.remove("active");
                }

                this.classList.add("active");
                activeSeat = this;

                tooltip.textContent = this.dataset.text;
                tooltip.style.display = "block";

                event.stopPropagation();
            });
        });
    });

    document.addEventListener("click", function(event) {
        let tooltip = document.getElementById("tooltip");
        tooltip.style.display = "none";

        if (activeSeat) {
            activeSeat.classList.remove("active");
            activeSeat = null;
        }
    });




































































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