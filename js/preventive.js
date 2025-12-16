/*
Этот файл для присвоения классов частям svg изображения, для выделения цветом
*/

const preventive = document.querySelector(".preventive");
const bigCircles = preventive.querySelectorAll(".big .circle");
const bigWaves = preventive.querySelectorAll(".big .wave");

const midCircles = preventive.querySelectorAll(".mid .circle");
const midWaves = preventive.querySelectorAll(".mid .wave");

const smallCircles = preventive.querySelectorAll(".small .circle");
const smallWaves = preventive.querySelectorAll(".small .wave");

bigCircles[0].classList.add("active")
bigWaves[0].classList.add("active")
midCircles[0].classList.add("active")
smallCircles[0].classList.add("active")

function setWave(waveIndexes) {
	bigWaves.forEach(el => {
		el.classList.remove("active")
	})
	midWaves.forEach(el => {
		el.classList.remove("active")
	})
	smallWaves.forEach(el => {
		el.classList.remove("active")
	})

	waveIndexes.forEach(index => {
		bigWaves[index].classList.add("active")
	})
}

export function onSplideMove(currentSlide) {
	if (currentSlide === 6) {
		bigCircles.forEach(el => {
			el.classList.add("active")
		})
		midCircles.forEach(el => {
			el.classList.add("active")
		})
		smallCircles.forEach(el => {
			el.classList.add("active")
		})
	} else {
		bigCircles.forEach(el => {
			el.classList.remove("active")
		})
		bigCircles[currentSlide].classList.add("active")

		midCircles.forEach(el => {
			el.classList.remove("active")
		})
		midCircles[currentSlide].classList.add("active")

		smallCircles.forEach(el => {
			el.classList.remove("active")
		})
		smallCircles[currentSlide].classList.add("active")
	}

	if (currentSlide === 0) {
		setWave([0])
	}

	if (currentSlide === 1) {
		setWave([1, 7])
	}
	if (currentSlide === 2) {
		setWave([2, 6])
	}
	if (currentSlide === 3) {
		setWave([3, 9])
	}
	if (currentSlide === 4) {
		setWave([4, 8])
	}
	if (currentSlide === 5) {
		setWave([5])
	}
	if (currentSlide === 6) {
		bigWaves.forEach(el => {
			el.classList.add("active")
		})
		midWaves.forEach(el => {
			el.classList.add("active")
		})
		smallWaves.forEach(el => {
			el.classList.add("active")
		})
	}
}