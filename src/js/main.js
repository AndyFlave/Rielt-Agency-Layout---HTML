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

	$('.callback-list').hover(
		function () {
			$('.callback-list__drop-down').slideDown();
		},
		function () {
			$('.callback-list__drop-down').hide();
		}
	)

	$('.city').hover(
		function () {
			$('.city__item_drop').slideDown();
		},
		function () {
			$('.city__item_drop').hide();
		}
	)

	// $('.callback-list').hover(
	// 	function () {
	// 		$('.callback-list__drop-down').slideDown();
	// 	},
	// 	function () {
	// 		$('.callback-list__drop-down').slideUp();
	// 	}
	// )

	hamburger.on('click', toggleMenu);

	$(window).resize(closeMenu);
});