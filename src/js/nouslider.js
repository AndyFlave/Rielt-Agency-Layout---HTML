$(function () {
	let slider = document.querySelector('.slider-row__unit');

	noUiSlider.create(slider, {
		start: [20, 80],
		connect: true,
		range: {
			'min': 0,
			'max': 100
		}
	});
})