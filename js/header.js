(function () {
	const headMenu = document.querySelector(".head-menu")

	const burger = document.querySelector(".burger")

	burger.addEventListener("click", () => {
		burger.classList.toggle("opened");
		headMenu.classList.toggle("opened");
	})
}())