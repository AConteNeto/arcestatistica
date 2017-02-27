<!DOCTYPE HTML>
<!--
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>

<head>
	<title>ARC - Contato</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->
	<link rel="stylesheet" href="assets/css/main.css" />
	<link rel="icon" href="images/icon.png" type="image/png">
	<!--[if lte IE 9]><link rel="stylesheet" href="assets/css/ie9.css" /><![endif]-->
	<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]-->
	<?php 
		include('register.php')
	?>
</head>

<body>
	<div id="page-wrapper">

		<!-- Header -->
		<header id="header">
			<h1 id="logo"><a href="index.php"><img src="images/logo.png" /></a></h1>
			<nav id="nav">
				<ul>
					<li><a href="index.php">Home</a></li>
					<li>
						<a href="#footer" class="scrolly">Contato</a>
					</li>
				</ul>
			</nav>
		</header>

		<!-- Main -->
		<div id="main" class="wrapper style1">
			<div class="container">
				<h2>Fale Conosco</h2>

				<!-- Form -->
				<section>
					<h3>Envie-nos uma mensagem</h3>
					<form id="emailForm" method="post" action="#">
						<div class="row uniform 50%">
							<div class="6u 12u$(xsmall)">
								<input type="text" name="name" id="name" value="" placeholder="Nome" />
							</div>
							<div class="6u$ 12u$(xsmall)">
								<input type="email" name="email" id="email" value="" placeholder="Email" />
							</div>
							<div class="12u$">
								<textarea name="message" id="message" placeholder="Entre com sua mensagem" rows="6"></textarea>
							</div>
							<div class="12u$">
								<div class="select-wrapper">
									<select name="category" id="category">
													<option value="">- Categoria -</option>
													<option value="1">Atendimento</option>
													<option value="2">Suporte Técnico</option>
												</select>
								</div>
							</div>
							<div class="6u 12u$(medium)">
								<input type="checkbox" id="copy" name="copy">
								<label for="copy">Enviar uma copia dessa mensagem para meu Email</label>
							</div>
							<div class="12u$">
								<ul class="actions">
									<li><input type="button" onclick="sendMail()" value="Enviar" class="special" /></li>
									<li><input type="reset" value="Limpar" /></li>
								</ul>
							</div>
						</div>
					</form>

					<h3>Ligue para nós</h3>
					<ul id="fone" class="alt">
						<li>Fone: (41) 99959-1993 <br> Tratar com: Rogério Souza </li>
					</ul>
				</section>
			</div>
		</div>

		<!-- Footer -->
		<footer id="footer">
			<ul class="icons">
				<li>
					<a href="https://www.facebook.com/ARC-Consultoria-e-An%C3%A1lise-Estat%C3%ADstica-1235203846532692/" class="icon alt fa-facebook">
						<span class="label">Facebook</span></a>
				</li>
				<li><a href="mailto:arcestatistica@gmail.com" class="icon alt fa-envelope"><span class="label">Email</span></a></li>
				<li><a href="#fone" class="icon alt fa-phone"><span class="label">Fone</span></a></li>
			</ul>
			<ul class="copyright">
				<li>&copy; ARC. Todos os direitos reservados.</li>
			</ul>
		</footer>

	</div>

	<!-- Scripts -->
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/jquery.scrolly.min.js"></script>
	<script src="assets/js/jquery.dropotron.min.js"></script>
	<script src="assets/js/jquery.scrollex.min.js"></script>
	<script src="assets/js/skel.min.js"></script>
	<script src="assets/js/util.js"></script>
	<!--[if lte IE 8]><script src="assets/js/ie/respond.min.js"></script><![endif]-->
	<script src="assets/js/main.js"></script>
</body>

</html>