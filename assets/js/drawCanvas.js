(function($) {
	var mouseX = mouseY = null;
	onmousemove = function (e) {
		mouseX = e.pageX;
		mouseY = e.pageY;
	};

	$.fn.drawRandomPoints = function(settings) {
		var options = $.extend({
			fps: 24,
			barPixels: 15,
			closeVelocity: 0.05,
			farVelocity: 0.01,
			noMouseVelocity: 0.005,
			percentHeight: 0.1,
			widthEfectFast: 0.05,
			pointSize: 5
		}, settings);

		
		this.each(function(){
			
			// Verifica se está acima do limite superior e inferior definido nas opções:
			function verifyLimits(random) {
				if (random < options.percentHeight)
					random = options.percentHeight
				else if (random > (1 - options.percentHeight))
					random = 1 - options.percentHeight
				return random;
			}
			
			// Cria o gradiente de cores:
			function createGradient(width, height) {
				var grd = context.createLinearGradient(0, 0, width, height);
				grd.addColorStop(0.05, "#1f367f");
				grd.addColorStop(0.2, "#1b9ac9");
				grd.addColorStop(0.5, "#6ec172");
				grd.addColorStop(0.8, "#1b9ac9");
				grd.addColorStop(0.95, "#1f367f");
				return grd;
			}

			var obj = $(this),
				canvas = $(this).get(0),
				context = canvas.getContext('2d'),
				graphic = canvas.width * (options.widthEfectFast / 2),
				nBars = Math.ceil(canvas.width / options.barPixels);
				current = [],
				objetive = [],
				sinal = 0,
				nBarsAnt = 0,
				grd = createGradient(canvas.width, canvas.height);

			var loop = function () {
				if (obj.parent().width() != canvas.width ||
					obj.parent().height() != canvas.height) {
						canvas.width = obj.parent().width();
						canvas.height = obj.parent().height();
						
						grd = createGradient(canvas.width, canvas.height);
						graphic = canvas.width * (options.widthEfectFast / 2);
						nBars = Math.ceil(canvas.width / options.barPixels);
				}

				context.clearRect(0, 0, canvas.width, canvas.height)

				if (nBars != nBarsAnt) {
					for (i = 0; i <= nBars; i++) {
						objetive[i] = verifyLimits(Math.random());
						current[i] = verifyLimits(Math.random());
					}
					nBarsAnt = nBars;
				}
	
				var x = 0, y, p;
				n = current.length;
				// Percorre todos os pontos para desenhar:
				for (i = 0; i < n; i++) {
					// Configurando mudanças movimento do mouse:
					if (skel.vars.mobile || mouseX == null)
						p = options.farVelocity;
					else
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
	
					y = canvas.height - (canvas.height * current[i]);
	
					// Desenhando as linhas:
					context.beginPath()
						context.moveTo(x, y); // Move contexto para o primeiro ponto;
						var auxY = canvas.height - (canvas.height * current[i + 1]);
						context.lineTo(x + options.barPixels, auxY); // Desenha a linha de contexto até as coordenadas do segundo ponto;
						context.strokeStyle = "rgba(255, 255, 255, 0.2)";
						context.lineWidth = 2;
						context.stroke();
					context.closePath();
					
					// Desenhando pontos:
					context.beginPath();
						context.arc(x, y, options.pointSize, 0, 2 * Math.PI);
						context.lineWidth = 4;
						context.strokeStyle = "#000000";
						context.stroke();
						context.fillStyle = grd;
						context.fill();
					context.closePath();
					
					// Configurando as mudanças na altura:
					if (Math.abs(objetive[i] - current[i]) < 0.02)
						sinal++;
					else if (current[i] > objetive[i])
						current[i] -= current[i] * p;
					else if (current[i] < objetive[i])
						current[i] += current[i] * p;
	
					x += options.barPixels;
				}
				
				if (sinal > nBars) {
					for (i in objetive)
						objetive[i] = verifyLimits(Math.random());
					sinal = 0;
				}
			}
			// window.addEventListener('click', function(){
			// 	window.location = canvas.toDataURL();
			// }, false);
			var interval = window.setInterval(loop, 1000 / options.fps);
		});
	};	
}(jQuery));