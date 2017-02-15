/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function () {

		var $window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function () {
			window.setTimeout(function () {
				$body.removeClass('is-loading');
			}, 0);
		});

		// Touch mode.
		if (skel.vars.mobile)
			$body.addClass('is-touch');

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Prioritize "important" elements on medium.
		skel.on('+medium -medium', function () {
			$.prioritize(
				'.important\\28 medium\\29',
				skel.breakpoint('medium').active
			);
		});

		// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

		// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

		// Off-Canvas Navigation.

		// Title Bar.
		$(
			'<div id="titleBar">' +
			'<a href="#navPanel" class="toggle"></a>' +
			'<span class="title">' +
			'<a href="index.html"><img src="images/logo.png" /></a></span>' +
			'</div>'
		)
			.appendTo($body)

		// Navigation Panel.
		$(
			'<div id="navPanel">' +
			'<nav>' +
			$('#nav').navList() +
			'</nav>' +
			'</div>'
		)
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'left',
				target: $body,
				visibleClass: 'navPanel-visible'
			});

		// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
		if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
			$('#titleBar, #navPanel, #page-wrapper')
				.css('transition', 'none');

		// Parallax.
		// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (skel.vars.browser == 'ie'
			|| skel.vars.mobile) {

			$.fn._parallax = function () {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function () {

				$(this).each(function () {

					var $this = $(this),
						on, off;

					on = function () {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function () {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function () {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					skel.on('change', function () {

						if (skel.breakpoint('medium').active)
							(off)();
						else
								(on)();

					});

				});

				return $(this);

			};

			$window
				.on('load resize', function () {
					$window.trigger('scroll');
				});

		}

		// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function () {

				var $this = $(this),
					on, off;

				on = function () {

					// Use main <img>'s src as this spotlight's background.
					$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Enable transitions (if supported).
					if (skel.canUse('transition')) {

						var top, bottom, mode;

						// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

						// Add scrollex.
						$this.scrollex({
							mode: mode,
							top: top,
							bottom: bottom,
							initialize: function (t) { $this.addClass('inactive'); },
							terminate: function (t) { $this.removeClass('inactive'); },
							enter: function (t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

					}

				};

				off = function () {

					// Clear spotlight's background.
					$this.css('background-image', '');

					// Disable transitions (if supported).
					if (skel.canUse('transition')) {

						// Remove scrollex.
						$this.unscrollex();

					}

				};

				skel.on('change', function () {

					if (skel.breakpoint('medium').active)
						(off)();
					else
							(on)();

				});

			});

		// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function () {

				var $this = $(this),
					on, off;

				on = function () {

					if (skel.canUse('transition')) {

						$this.scrollex({
							top: 250,
							bottom: 0,
							initialize: function (t) { $this.addClass('inactive'); },
							terminate: function (t) { $this.removeClass('inactive'); },
							enter: function (t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

					}

				};

				off = function () {

					if (skel.canUse('transition'))
						$this.unscrollex();

				};

				skel.on('change', function () {

					if (skel.breakpoint('medium').active)
						(off)();
					else
							(on)();

				});

			});

		// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();
		$banner.append("<canvas id='canvas' width='" + $banner.width() +
			"' height='" + $banner.height() + "'></canvas>");

		$(".title img").css({ height: $(".title").height() - 0.25 * $(".title").height() });
	});

	var mouseX = mouseY = 100;
	onmousemove = function (e) {
		mouseX = e.pageX;
		mouseY = e.pageY;
	}

	$(function () {
		var canvas = document.getElementById("canvas");
		if (canvas != null) {
			var context = canvas.getContext("2d");


			var options = {
				barPixels: 4,
				closeVelocity: 0.04,
				farVelocity: 0.0075,
				noMouseVelocity: 0,
				percentHeight: 0.05,
				widthEfectFast: 0.1
			}

			var graphic = canvas.width * (options.widthEfectFast / 2),
				nBars = Math.ceil(canvas.width / options.barPixels),
				objetive = [],
				current = [],
				sinal = 0;

			var verifyLimits = function (random) {
				if (random < options.percentHeight)
					random = options.percentHeight
				else if (random > (1 - options.percentHeight))
					random = 1 - options.percentHeight
				return random;
			}

			for (i = 0; i < nBars; i++) {
				objetive[i] = verifyLimits(Math.random());
				current[i] = verifyLimits(Math.random());
			}

			var loop = function () {
				// Limpa o objeto canvas atual:
				context.clearRect(0, 0, canvas.width, canvas.height);

				var x = 0, y, p;
				// Percorre todos os pontos para desenhar:
				for (i in current) {
					// Configurando mudanças movimento do mouse:
					if (mouseY >= canvas.offsetTop &&
						mouseX >= canvas.offsetLeft &&
						mouseY <= (canvas.offsetTop + canvas.height) &&
						mouseX <= (canvas.offsetLeft + canvas.width))
						if ((x + graphic) > mouseX && (x - graphic) < mouseX)
							p = options.closeVelocity;
						else
							p = options.farVelocity;
					else
						p = options.noMouseVelocity;

					// Configurando as mudanças na altura:
					if (Math.abs(objetive[i] - current[i]) < 0.02)
						sinal++;
					else if (current[i] > objetive[i])
						current[i] -= current[i] * p;
					else if (current[i] < objetive[i])
						current[i] += current[i] * p;
					if (i == 0) continue;

					y = canvas.height - (canvas.height * current[i]);

					// Desenhando:
					context.beginPath()
					var grd = context.createLinearGradient(0, 0, canvas.width, canvas.height);
					grd.addColorStop(0, "#1f3884");
					//grd.addColorStop(1, "#53c3c2")
					grd.addColorStop(1, "#169ecd");
					context.arc(x, y, 5, 0, 2 * Math.PI);
					context.strokeStyle = "#000000";
					context.stroke();
					context.fillStyle = grd;
					context.fill();

					context.moveTo(x, y);
					y = canvas.height - (canvas.height * current[i - 1]);

					context.lineTo(x - options.barPixels, y);
					context.strokeStyle = "rgba(255, 255, 255, 0.2)";
					context.stroke();
					context.closePath();
					x = x + options.barPixels;
				}
				if (sinal > nBars) {
					for (i in objetive)
						objetive[i] = verifyLimits(Math.random());
					sinal = 0;
				}
			}

		}
		var interval = window.setInterval(loop, 75);
	});
})(jQuery);