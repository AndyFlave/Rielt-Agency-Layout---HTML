$(function () {
	let hamburger = $('.hamburger');
	let mobileMenu = $('.mobile-menu');

	const toogleClassHamburger = () => hamburger.toggleClass('active')

	const toggleClassHtml = () => $('html').toggleClass('active')

	const toggleMenu = () => {
		toogleClassHamburger();
		toggleClassHtml();
	}

	const closeMenu = () => {
		if ($(window).width() >= 768) {
			hamburger.removeClass('active');
			$('html').removeClass('active');
		}
	}


	const headerPageStyle = () => {
		if (window.location.href !== 'http://localhost:3000/') {
			$('header').addClass('header-page');
		}
	}

	headerPageStyle();

	const setBreadcrumbsCurrentLink = () => {
		let pathname = window.location.pathname;
		let currentLink = $('.breadcrumbs__current');
		if (pathname == '/catalog.html') {
			currentLink.text('Каталог')
		} else if (pathname == '/contacts.html') {
			currentLink.text('Контакты')
		} else if (pathname == '/vacancies.html') {
			currentLink.text('Вакансии')
		}
	}

	setBreadcrumbsCurrentLink();

	function AppendContentMenu(elemClass, boxClass) {
		this.elem = $(elemClass);
		this.box = $(boxClass);
		this.childrenBox = $(boxClass).children();

		this.appendMenu = function () {
			if ($(window).width() < 768 && !this.childrenBox.is(this.elem)) {
				this.elem.clone().appendTo(this.box);
			} else if ($(window).width() >= 768) {
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


	// custom select
	let triggerSelect = $('.custom-select .custom-select__head');
	let elementsSelect = $('.custom-select__list-item');

	const showSelectList = event => {
		let target = $(event.target);

		if (target.parent().hasClass('open')) {
			target.parent().removeClass('open');
			target.next().slideUp();
		} else {
			$('.custom-select').removeClass('open');
			$('.custom-select__list').slideUp();
			target.parent().addClass('open');
			target.next().slideDown();
		}
	}

	const closeSelectList = () => {
		$('.custom-select').removeClass('open');
		$('.custom-select__list').slideUp();
	}

	const renderSelectInput = () => {
		$('.custom-select__list-item_current').each(function (index, el) {
			$(this).parent()
				.parent()
				.find('.custom-select__input')
				.attr('value', $(this).text())
				.next('.custom-select__head').text(`${$(this).text()}`);
			closeSelectList();
		});
	}
	renderSelectInput();

	const setClassItemsList = event => {
		let target = $(event.target);
		target.siblings().removeClass('custom-select__list-item_current');
		target.addClass('custom-select__list-item_current');
		renderSelectInput();
	}


	$('.catalog__slider').owlCarousel({
		loop: true,
		autoplay: true,
		autoplaySpeed: 2000,
		autoplayTimeout: 4000,
		margin: 0,
		items: 1,
		dots: false
	})

	$('.single-slider__top').owlCarousel({
		loop: true,
		animateOut: 'fadeOut',
		autoplaySpeed: 2000,
		autoplayTimeout: 4000,
		margin: 0,
		items: 1,
		dots: false,
		mouseDrag: false,
		touchDrag: false,
	})

	$('.single-slider__bottom').owlCarousel({
		loop: true,
		autoplay: true,
		autoplaySpeed: 2000,
		autoplayTimeout: 4000,
		margin: 7,
		items: 5,
		dots: false,
		URLhashListener: true,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 3
			},
			480: {
				items: 4
			},
			600: {
				items: 5,
			}
		}
	})

	window.location.hash = '';

	$('.single-slider__bottom').on('changed.owl.carousel', event => {
		let item = event.item.index;
		let number = $(`.single-slider__bottom .owl-item:eq(${item}) .single-slider__bottom-img`).attr('data-number');

		window.location.hash = `img-${number}`
	});


	$('.similar-appart__slider').owlCarousel({
		loop: true,
		autoplay: true,
		autoplaySpeed: 2000,
		autoplayTimeout: 4000,
		margin: 20,
		dots: false,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			768: {
				items: 3,
			},
			1080: {
				items: 4,
			}
		}
	})

	const setNouslider = () => {
		let sliders = document.querySelectorAll('.slider-row__unit');

		[].slice.call(sliders).forEach(function (slider, index) {
			noUiSlider.create(slider, {
				start: [0, 80],
				connect: true,
				range: {
					'min': 0,
					'max': 100
				}
			})
		})
	}

	setNouslider();


	// EVENTS

	hamburger.on('click', toggleMenu);
	triggerSelect.on('click', showSelectList);
	elementsSelect.on('click', setClassItemsList);

	$('.catalog-item__button').on('click', e => e.preventDefault())

	$(window).resize(() => {
		closeMenu();

		new AppendContentMenu('.logotype', '.mobile-menu').appendMenu();
		new AppendContentMenu('.navigation', '.mobile-menu').appendMenu();
		new AppendContentMenu('.city', '.mobile-menu').appendMenu();
		new AppendContentMenu('.phones', '.mobile-menu').appendMenu();

	});

});