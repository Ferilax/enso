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
		padding: {
			left: "calc((100vw - 100%) / 2)",
			right: "calc((100vw - 100%) / 2)",
		},
	})

	createSwiper("#splide_collection-4", {
		perPage: 4,
		gap: 32,
		padding: {
			left: "calc((100vw - 100%) / 2)",
			right: "calc((100vw - 100%) / 2)",
		},
	})

	createSwiper("#splide_news", {
		perPage: 4,
		gap: 28,
		padding: {
			left: "calc((100vw - 100%) / 2)",
			right: "calc((100vw - 100%) / 2)",
		},
	})

	const preventiveSplide = createSwiper("#splide_preventive", {
		type: "fade",
		arrows: false,
		drag: false,
	})

	document.querySelector(".preventive .skip-animation")
		.addEventListener("click", () => {
			preventiveSplide.go(7)
		})

	document.querySelector("#splide_preventive")
		.addEventListener("click", () => {
			preventiveSplide.go(">")
		})

	// Swiper-accordeon ------------------------------------------------------------------
	const swiperAccordeons = document.querySelectorAll(".swiper_accordeon")
	swiperAccordeons.forEach(swiper => {
		swiper.addEventListener("click", (e) => {
			const slides = swiper.querySelectorAll(".slide")
			const clicked = e.target.closest(".slide");

			if (!clicked) return;
			slides.forEach(el => el.classList.remove("active"))
			clicked.classList.add("active")
		})
	})
}());