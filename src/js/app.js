(function () {
	"use strict";

	var App = function App () {
		var _self = this
			,_slideshow;

		function init () {
			_slideshow = new Slideshow();
		}

		init();
	};


	var Slideshow = function Slideshow () {
		var _self = this
			,_obj = $('.slideshowWrap')
			,_slides = $('.slide', _obj)
			,_nav = $('.nav-slideshow')
			,_navItem = $('a', _nav)
			,_interval;

		function init () {
			bindEvents();
			startTimer();
		}

		function activateSlide (index) {
			var newActiveSlide = _slides.eq(index)
				,activeSlide = $('.slide.active');

			activeSlide.removeClass('active');
			newActiveSlide.addClass('active');
		}

		function activateNavItem (index) {
			var parents = _navItem.parents()
				,newActiveItem = _navItem.eq(index).parent();

			parents.removeClass('active');
			newActiveItem.addClass('active');
		}

		function bindEvents () {
			_navItem.bind('click', function (ev) {
				var target = $(ev.currentTarget);

				ev.preventDefault();

				handleClick(target);
			});
		}

		function handleClick (target) {
			var parent = target.parent()
				,index = parent.index();

			resetTimer(index);
			activateSlide(index);
			activateNavItem(index);
		}

		function startTimer (startVal) {
			var length = _slides.size()
				,counter = ( startVal ) ? startVal : 0;

			console.log(length);

			_interval = window.setInterval(function () {
				if ( counter < length ) {
					activateSlide(counter);
					activateNavItem(counter);	
					counter++;
				} else {
					counter = 0;
				}
				
			}, 5000);
		}

		function resetTimer (startVal) {
			window.clearInterval(_interval);
			startTimer(startVal);
		}

		init();
	};

	var app = window.app;
	app = new App();

}());