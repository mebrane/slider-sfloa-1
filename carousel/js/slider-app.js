


//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
//# sourceMappingURL=underscore-min.map
// Some normal jQuery stuff
(function () {

	// Initialized selector
	var SamMoon = {
		init: function () {
			'use strict';

			// Convert collection to gallery
			this.galleryBuilder();

			
			return;

		},

	

		galleryBuilder: function() {

			// Do not do anything in edit mode
			// if (this.isEditMode()) {
			// 	return;
			// }

			var options = {
				insertAfter: ''
			};

			// Carousel data
			var data = [];
			var currentIndex = 0;

			// The current gallery
			var $gallery = null;
			var $currentImage = null;
			var $currentNav = null;
			var timer = null;

			build();

			return;

			function bindings(context) {
				$('.gallery-navigation ul li a').on('click', jumpToNav);
				$('.gallery-arrows a').on('click', jumpToNextPrev);
				$(window).resize(resizeDelay);

				// Set first
				jumpByIndex(0);
			}

			function jumpToNextPrev() {
				$gallery = $(this).closest('.voidray-slider-gallery');
				var moveBy = $(this).hasClass('next') ? 1 : -1 ;
				currentIndex = parseInt(currentIndex) + moveBy;
				if (currentIndex < 0) currentIndex = data.length - 1;
				if (currentIndex >= data.length) currentIndex = 0;
				jumpByIndex(currentIndex);
			}

			// Jump to the clicked nav index
			function jumpToNav() {
				$gallery = $(this).closest('.voidray-slider-gallery');
				jumpByIndex($(this).attr('index'));
			}

			function jumpByIndex(index) {
				// Set current index
				currentIndex = index;

				// Change nav link
				jumpToLink(index);

				// Change image in gallery
				jumpToImage(index);

				// Change description
				jumpToDescription(index);

				// Animate the dot
				animateDot();
			}

			function animateDot() {
				var $dot = $('.gallery-navigation .dot', $gallery);
				$dot.addClass('clicked');
				setTimeout(function(){
					$dot.removeClass('clicked');
				}, 500);
			}

			function jumpToDescription(index) {
				var $desc = $('.gallery-descriptions .gallery-description[index=' + index + ']', $gallery);
				var $active = $('.gallery-descriptions .gallery-description.active', $gallery);
				$active.removeClass('active');
				$desc.addClass('active');
			}

			function jumpToImage(index) {
				var $img = $('.gallery-slides .gallery-slide[index=' + index + ']', $gallery);
				$currentImage = $img;
				var $nav = $img.closest('.slide-container');
				$currentNav = $nav;
				$('.gallery-slide', $nav).removeClass('active');
				$img.addClass('active');
				sizeImage();
			}

			function resizeDelay() {
				clearTimeout(timer);
				timer = setTimeout(sizeImage, 50);
			}

			function sizeImage() {
				if (!$currentImage) return;
				var width = $currentImage.outerWidth();
				var pos = $currentImage.position();
				var x = pos.left + (width / 2);
				$currentNav.css({
					transform: 'translateX(-'+ x +'px)'
				});
			}

			function jumpToLink(index) {
				var $link = $('.gallery-navigation ul li a[index=' + index + ']', $gallery);
				var $nav = $link.closest('ul');
				$('li a', $nav).removeClass('active');
				$link.addClass('active');
				var width = $link.outerWidth();
				var pos = $link.position();
				var x = pos.left + (width / 2);
				$nav.css({
					transform: 'translateX(-'+ x +'px)'
				});
			}

			function build() {

				// Get gallery data
				$('.summary-block-setting-design-carousel').each(function() {
					make(this);
				});
			}

			function make(carousel) {
				if (!carousel) return;

				// Get the closest squarespace block
				var $block = $(carousel).closest('.sqs-block');

				// Determine if it's in a page or index
				var $content = $(carousel).closest('.page-content');

				// Make the carousel 100% wide
				// this.make100Width(carousel);

				// Get the data
				$('.sqs-gallery-design-carousel-slide', carousel).each(function(){
					data.push({
						index:  data.length,
						image: 	$('.img-wrapper img', this).attr('data-src'),
						title: 	$('.summary-title a', this).text(),
						url: 		$('.summary-title a', this).attr('href'),
						body:		$('.summary-excerpt p', this).text()
					});
				});

				// Insert the HTML
				$content.before(getHTML());
				bindings();
			}

			// Build HTML
			function getHTML() {
				return '<div class="voidray-slider-gallery">' +
						'<div class="gallery-navigation">' + getNavLinks() + '<span class="dot"></span></div>' +
						'<div class="gallery-container">' +
							'<div class="gallery-arrows"><a class="prev"></a><a class="next"></a></div>' +
							'<div class="gallery-descriptions">' + getDescriptions() + '</div>' +
							'<div class="gallery-slides"><div class="slide-container">' + getSlides() + '</div></div>' +
						'</div>' +
					'</div>';
			}

			// Build navigation links
			function getNavLinks() {
				return '<ul>' + data.map(function(d){
					return '<li><a index="' + d.index + '">' + d.title + '</a></li>';
				}).join('') + '</ul>';
			}

			// Build navigation links
			function getDescriptions() {
				return data.map(function(d){
						return '<div index="' + d.index + '" class="gallery-description"><h3>' + d.title + '</h3><div class="text">' + d.body + '</div></div>';
					}).join('');
			}

			// Build slides
			function getSlides() {
				return data.map(function(d){
					return '<div index="' + d.index + '" class="gallery-slide"><div class="image" style="background-image: url(' + d.image + ')"></div></div>';
				}).join('');
			}

		},

	};

	// Run the app
	$(document).ready(function () {
		SamMoon.init();
	});

})();
