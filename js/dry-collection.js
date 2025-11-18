// Выдвижная панель для dry-food 

(function () {
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