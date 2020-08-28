$(function () {
	let hamburger = $('.hamburger');
	let mobileMenu = $('.mobile-menu');

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


	function AppendContentMenu(elemClass, boxClass) {
		this.elem = $(elemClass);
		this.box = $(boxClass);
		this.childrenBox = $(boxClass).children();

		this.appendMenu = function () {
			if ($(window).width() < 768 && !this.childrenBox.is(this.elem)) {
				this.elem.clone().appendTo(this.box);
				// $('.header').find(this.elem).detach();
			} else if ($(window).width() >= 768) {
				// this.elem.parent().appendTo();
				this.childrenBox.remove();
			}
		}
	}
	new AppendContentMenu('.logotype', '.mobile-menu').appendMenu();
	new AppendContentMenu('.navigation', '.mobile-menu').appendMenu();
	new AppendContentMenu('.city', '.mobile-menu').appendMenu();
	new AppendContentMenu('.phones', '.mobile-menu').appendMenu();


	function CustomHover(elemClass, dropListClass) {
		this.hover = function () {
			$(elemClass).hover(
				function () {
					$(dropListClass).slideDown();
				},
				function () {
					$(dropListClass).hide();
				}
			)
		}
	}
	new CustomHover('.callback-list', '.callback-list__drop-down').hover();
	new CustomHover('.city', '.city__item_drop').hover();


	$('.catalog__slider').owlCarousel({
		loop: true,
		autoplay: true,
		autoplaySpeed: 2000,
		autoplayTimeout: 4000,
		margin: 0,
		items: 1,
		dots: false
		// dotsContainer: $(this).find('.catalog__item-dots')
	})



	hamburger.on('click', toggleMenu);

	$(window).resize(function () {
		closeMenu();

		new AppendContentMenu('.logotype', '.mobile-menu').appendMenu();
		new AppendContentMenu('.navigation', '.mobile-menu').appendMenu();
		new AppendContentMenu('.city', '.mobile-menu').appendMenu();
		new AppendContentMenu('.phones', '.mobile-menu').appendMenu();

	});

});