
var mouseX = mouseY = null;
onmousemove = function (e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
}

$(function () {
	var canvas = document.getElementById("canvas");
	if (canvas != null) {
		var context = canvas.getContext("2d");


		var options = {
			fps: 25,
			barPixels: 5,
			closeVelocity: 0.025,
			farVelocity: 0.007,
			noMouseVelocity: 0,
			percentHeight: 0.05,
			widthEfectFast: 0.1
		}

		var graphic = canvas.width * (options.widthEfectFast / 2),
			nBars = Math.ceil(canvas.width / options.barPixels);
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

		var nBarsAnt = 0;
		var loop = function () {
			// Limpa o objeto canvas atual:
			context.clearRect(0, 0, canvas.width, canvas.height);

			// Resize canvas:
			canvas.width = $('#banner').width();
			canvas.height = $('#banner').height();

			graphic = canvas.width * (options.widthEfectFast / 2);
			nBars = Math.ceil(canvas.width / options.barPixels);

			if (nBars != nBarsAnt) {
				for (i = 0; i < nBars; i++) {
					objetive[i] = verifyLimits(Math.random());
					current[i] = verifyLimits(Math.random());
				}
				nBarsAnt = nBars;
			}

			var x = 0, y, p;
			// Percorre todos os pontos para desenhar:
			for (i in current) {
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

				// Configurando as mudanças na altura:
				if (i == 0) continue;
				if (Math.abs(objetive[i] - current[i]) < 0.02)
					sinal++;
				else if (current[i] > objetive[i])
					current[i] -= current[i] * p;
				else if (current[i] < objetive[i])
					current[i] += current[i] * p;

				y = canvas.height - (canvas.height * current[i]);

				// Desenhando:
				context.beginPath()
				var grd = context.createLinearGradient(0, 0, canvas.width, canvas.height);
				grd.addColorStop(0, "#1f3884");
				grd.addColorStop(1, "#169ecd");
				context.arc(x, y, 5, 0, 2 * Math.PI);
				context.lineWidth = 4;
				context.strokeStyle = "#000000";
				context.stroke();
				context.fillStyle = grd;
				context.fill();

				context.moveTo(x, y);
				y = canvas.height - (canvas.height * current[i - 1]);

				context.lineTo(x - options.barPixels, y);
				context.strokeStyle = "rgba(255, 255, 255, 0.2)";
				context.lineWidth = 2;
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
		// window.addEventListener('click', function(){
		// 	window.location = canvas.toDataURL();
		// }, false);
	}
	var interval = window.setInterval(loop, 1000 / options.fps);
});