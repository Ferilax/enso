async function loadModules() {
	if (document.querySelector(".splide")) {
		await import("./libs/splide.min.js")
		await import("./sliders.js");
	}

	if (document.querySelector(".tab-system")) {
		import("./tabs.js");
	}

	import("./slide-show.js")

	import("./dry-collection.js")

	import("./header.js")
}

// Запускаем после загрузки DOM
document.addEventListener("DOMContentLoaded", loadModules);