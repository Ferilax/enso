(function () {
	// Конфигурация слайд-шоу
	const PYRAMID_CONFIG = {
		maxScenes: {
			desktop: 7,  // Макс. сцен для десктопа (ширина >= 1440px)
			mobile: 6,  // Макс. сцен для мобильных (ширина < 1440px)
		},
		breakpoint: 1440,
	};

	const pyramidDesktop = document.querySelector(".pyramid.desktop");
	const tapes = pyramidDesktop.querySelectorAll(".fake-tapes > .tape");
	const pyramidDesktopAllScenes = document.querySelectorAll(".pyramid.desktop [data-scene]");
	const pyramidDesktopSkip = document.querySelector(".pyramid.desktop .skip-animation");

	const html = document.querySelector("html");


	function init(slideShowSection, allScenes, skipButton, SLIDE_SHOW_CONFIG) {
		let currentScene = 1;
		// Текущая активная сцена
		/*
			Обновляет видимость сцены, добавляя соответствующий класс:
			- "active" для текущей сцены
			- "completed" для пройденных сцен
			- "inactive" для будущих сцен
		*/
		function updateSceneVisibility(sceneElement, sceneNumber) {
			// Сначала удаляем все возможные классы
			sceneElement.classList.remove("active", "completed", "inactive");
			// Определяем состояние сцены и добавляем нужный класс
			if (sceneNumber === currentScene) {
				sceneElement.classList.add("active");
			} else if (sceneNumber < currentScene) {
				sceneElement.classList.add("completed");
			} else {
				sceneElement.classList.add("inactive");
			}
		}

		// Обновляет видимость всех сцен на основе текущего номера (currentScene)
		function updateAllScenes() {
			// Сохраняем текущую сцену в data-атрибут
			slideShowSection.dataset.currentScene = currentScene;
			// Применяем обновление ко всем сценам
			allScenes.forEach((sceneElement) => {
				const sceneNumber = Number(sceneElement.dataset.scene);
				updateSceneVisibility(sceneElement, sceneNumber);
			});
		}

		// Переключает на следующую сцену
		function goToNextScene(maxScenes) {
			if (currentScene < maxScenes) {
				currentScene++
			}
			// Применяем изменения
			updateAllScenes();
		}

		// Переключает на последнюю сцену
		function goToEndScene(maxScenes) {
			currentScene = maxScenes
			// Применяем изменения
			updateAllScenes();
		}

		// Инициализация
		updateAllScenes();

		// -----------------------------------------------------------------------------------------------------

		let isScrollLocked = false;
		let lastScrollTime = 0; // Время последнего скролла
		const scrollDelay = 500; // Задержка в мс (0.5 секунды)
		let allScenesIsPlayed = false;

		// Функция проверки, находится ли центр блока в центре экрана
		function isCenterInView() {
			const rect = slideShowSection.getBoundingClientRect();
			const blockCenter = rect.top + rect.height / 2;
			const windowCenter = window.innerHeight / 2;
			return Math.abs(blockCenter - windowCenter) < 50; // Допустимая погрешность (50px)
		}

		// Функция для плавной прокрутки к центру блока
		function scrollToBlockCenter() {
			// Получаем координаты блока относительно документа
			const blockRect = slideShowSection.getBoundingClientRect();
			const blockTop = blockRect.top + window.scrollY;
			const blockHeight = blockRect.height;
			// Вычисляем позицию для скролла (центр блока - половина высоты окна)
			const scrollToPosition = blockTop + blockHeight / 2 - window.innerHeight / 2;
			// Плавный скролл
			window.scrollTo({
				top: scrollToPosition,
				behavior: "smooth"
			});
		}

		// Блокировка скролла
		function lockScroll() {
			pyramidDesktop.style.pointerEvents = "none";
			isScrollLocked = true;
			html.classList.add("slide-showed");
		}

		// Разблокировка скролла
		function unlockScroll() {
			pyramidDesktop.style.pointerEvents = "unset";
			skipButton.style.display = "none";
			isScrollLocked = false;
			allScenesIsPlayed = true;
			html.classList.remove("slide-showed");
		}

		function onLockedScroll() {
			// Определяем лимит сцен в зависимости от ширины экрана
			const isDesktop = window.innerWidth >= SLIDE_SHOW_CONFIG.breakpoint;
			const maxScenes = isDesktop
				? SLIDE_SHOW_CONFIG.maxScenes.desktop
				: SLIDE_SHOW_CONFIG.maxScenes.mobile;

			// Разблокируем скролл при достижении последней сцены
			if (currentScene >= maxScenes) {
				unlockScroll();
				return;
			}

			// Задержка для смены сцен
			const now = Date.now();
			if (now - lastScrollTime > scrollDelay) { // Проверяем задержку
				lastScrollTime = now;
				goToNextScene(maxScenes);
			}
		}

		// Запрещаем скролл колесом мыши/тачпадом при блокировке
		document.addEventListener("scroll", () => {
			if (!isScrollLocked && !allScenesIsPlayed && isCenterInView()) {
				scrollToBlockCenter();
				lockScroll();
			}
		});

		document.addEventListener("wheel", () => {
			if (isScrollLocked) {
				onLockedScroll();
			}
		});

		document.addEventListener("touchmove", () => {
			if (isScrollLocked) {
				onLockedScroll();
			}
		});

		// skip
		skipButton.addEventListener("click", () => {
			goToEndScene(SLIDE_SHOW_CONFIG.maxScenes.desktop);
			unlockScroll()
		})
	}

	init(
		pyramidDesktop,
		pyramidDesktopAllScenes,
		pyramidDesktopSkip,
		PYRAMID_CONFIG
	);

	// Переход по слайду по клику на ленту
	tapes.forEach((tape) => {
		tape.addEventListener("click", () => {
			console.log(1)
			if (tape.classList.contains("red-tape")) {
				pyramidDesktop.dataset.currentScene = 3;
			}
			if (tape.classList.contains("purple-tape")) {
				pyramidDesktop.dataset.currentScene = 4;
			}
			if (tape.classList.contains("green-tape")) {
				pyramidDesktop.dataset.currentScene = 5;
			}
			if (tape.classList.contains("blue-tape")) {
				pyramidDesktop.dataset.currentScene = 6;
			}
			if (tape.classList.contains("yellow-tape")) {
				pyramidDesktop.dataset.currentScene = 7;
			}
		})
	})

}());

