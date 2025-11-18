import "./libs/splide.min.js"

(function () {

	Splide.defaults = {
		pagination: false,
	}

	function createSwiper(swiperSelector, options) {
		const hasSwiper = !!document.querySelector(swiperSelector);
		if (hasSwiper) {
			let splide = new Splide(swiperSelector, options);
			splide.mount();

			return splide;
		}
	}

	// ---------------------------------------------------------------------------------------------------

	createSwiper("#splide_start", {
		type: "fade",
	})

	createSwiper("#splide_collection-1", {
		gap: 28,
		fixedWidth: 388,
		padding: {
			left: "calc((100vw - 100%) / 2)",
			right: "calc((100vw - 100%) / 2)",
		},
		omitEnd: true,
		focus: 0,

		breakpoints: {
			767: {
				fixedWidth: 282,
				gap: 10,
			}
		}
	})

	createSwiper("#splide_collection-2", {
		gap: 28,
		fixedWidth: 388,
		padding: {
			left: "calc((100vw - 100%) / 2)",
			right: "calc((100vw - 100%) / 2)",
		},
		omitEnd: true,
		focus: 0,

		breakpoints: {
			767: {
				fixedWidth: 282,
				gap: 10,
			}
		}
	})

	createSwiper("#splide_collection-3", {
		perPage: 4,
		gap: 32,
		padding: "calc((100vw - 100%) / 2)",

		breakpoints: {
			1399: {
				perPage: 3,
			},
			1023: {
				perPage: 2,
				gap: 24,
			},
			629: {
				perPage: 1,
				gap: 10,
				padding: "calc((100vw - 100%) / 2 + 40px)",
			},
		}
	})

	createSwiper("#splide_collection-4", {
		perPage: 4,
		gap: 32,
		padding: "calc((100vw - 100%) / 2)",

		breakpoints: {
			1399: {
				perPage: 3,
			},
			1023: {
				perPage: 2,
				gap: 24,
			},
			629: {
				perPage: 1,
				gap: 10,
				padding: "calc((100vw - 100%) / 2 + 40px)",
			},
		}
	})

	createSwiper("#splide_news", {
		perPage: 4,
		gap: 28,
		padding: "calc((100vw - 100%) / 2)",
		omitEnd: true,
		focus: 0,

		breakpoints: {
			1300: {
				perPage: 3,
			},
			1023: {
				perPage: 2,
				gap: 10,
			},
			700: {
				fixedWidth: 244,
			},
		}
	})

	createSwiper("#splide_dry-collection", {
		perPage: 3,
		arrows: false,
		gap: 24,
		padding: "var(--container-padding)",

		breakpoints: {
			1260: {
				perPage: 2,
			},
			1023: {
				gap: 10,
			},
			767: {
				perPage: 1,
			}
		}
	})

	const pyramidSplide = createSwiper("#splide_pyramid", {
		type: "fade",
		arrows: false,
		drag: false,
	})

	const preventiveSplide = createSwiper("#splide_preventive", {
		type: "fade",
		arrows: false,
		drag: false,
	})

	// scroll swiper
	function scrollLockInit(splide, section) {
		const html = document.querySelector("html");
		const sectionElement = document.querySelector(section);
		const splideElement = sectionElement.querySelector(".splide");

		let isScrollLocked = false;
		let lastScrollTime = 0; // Время последнего скролла
		const scrollDelay = 500; // Задержка в мс (0.5 секунды)
		let allScenesIsPlayed = false;

		// Функция проверки, находится ли центр блока в центре экрана
		function isCenterInView() {
			const rect = splideElement.getBoundingClientRect();
			const blockCenter = rect.top + rect.height / 2;
			const windowCenter = window.innerHeight / 2;
			return Math.abs(blockCenter - windowCenter) < 50; // Допустимая погрешность (50px)
		}

		// Функция для плавной прокрутки к центру блока
		function scrollToBlockCenter() {
			// Получаем координаты блока относительно документа
			const blockRect = splideElement.getBoundingClientRect();
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
			sectionElement.style.pointerEvents = "none";
			isScrollLocked = true;
			html.classList.add("slide-showed");
		}

		// Разблокировка скролла
		function unlockScroll() {
			sectionElement.style.pointerEvents = "unset";
			isScrollLocked = false;
			allScenesIsPlayed = true;
			html.classList.remove("slide-showed");
		}

		function onLockedScroll() {
			// Определяем лимит сцен в зависимости от ширины экрана
			const maxScenes = splide.length

			// Разблокируем скролл при достижении последней сцены
			if (splide.index >= maxScenes - 1) {
				unlockScroll();
				return;
			}

			// Задержка для смены сцен
			const now = Date.now();
			if (now - lastScrollTime > scrollDelay) { // Проверяем задержку
				lastScrollTime = now;
				splide.go(">")
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

		sectionElement.addEventListener("click", (e) => {
			const clickedClose = e.target.closest(".close");
			const clickedSkip = e.target.closest(".skip-animation");

			if (clickedClose || clickedSkip) {
				unlockScroll()
				splide.go(splide.length - 1)
			}

			if (clickedSkip) {
				clickedSkip.style.display = "none"
			}
		})
	}

	// Переход по слайду по клику на ленту
	document.querySelector(".pyramid.mobile")
		?.addEventListener("click", (e) => {
			const clickedTape = e.target.closest(".tape");

			if (!clickedTape) return

			if (clickedTape.classList.contains("red")) {
				pyramidSplide.go(1)
			}
			if (clickedTape.classList.contains("purple")) {
				pyramidSplide.go(2)
			}
			if (clickedTape.classList.contains("green")) {
				pyramidSplide.go(3)
			}
			if (clickedTape.classList.contains("blue")) {
				pyramidSplide.go(4)
			}
			if (clickedTape.classList.contains("yellow")) {
				pyramidSplide.go(5)
			}
		})

	scrollLockInit(pyramidSplide, ".pyramid.mobile",)
	scrollLockInit(preventiveSplide, ".preventive")
}());