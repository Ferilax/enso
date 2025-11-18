// Выдвижная панель для dry-food 

(function () {
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

	const slider = document.querySelector("#splide_dry-collection")

	slider.addEventListener("click", function (e) {
		const clickedStructureTrigger = e.target.closest(".show-structure")
		const clickedSlide = e.target.closest(".splide__slide")
		const clickedClose = e.target.closest(".structure-close")

		if (clickedClose) {
			clickedSlide.querySelector(".structure-body")
				.classList.remove("active")
		}

		if (clickedStructureTrigger) {
			clickedSlide.querySelector(".structure-body")
				.classList.add("active")
		}
	})
}())