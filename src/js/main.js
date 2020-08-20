$(function () {
	let hamburger = $('.hamburger');

	function toogleClassHamburger() {
		hamburger.toggleClass('active')
	}

	function toggleClassHtml() {
		$('html').toggleClass('active');
	}

	function toggleMenu() {
		toogleClassHamburger();
		toggleClassHtml();
	}

	function closeMenu() {
		if ($(window).width() >= 768) {
			hamburger.removeClass('active')
			$('html').removeClass('active');
		}
	}

	hamburger.on('click', toggleMenu);

	$(window).resize(closeMenu);
});