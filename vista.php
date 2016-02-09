    <!DOCTYPE html>
<html>
	<head>
		<?php
			$url_pdf = $_GET['url_pdf'];
			$nombre  = $_GET['nombre']; 
			$id_pdf  = $_GET['id_pdf'];
		?>
		<script type="text/javascript">
			var url_pdf = {"key":"<?php echo $url_pdf;  ?>"}
		</script>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Practicas Clínicas</title>
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
		<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
		<link rel="stylesheet" type="text/css" href="css/main.css">
		<link rel="stylesheet" type="text/css" href="css/practicas.css">
		<script src="js/jquery-1.11.2.min.js"></script>		
		<script src="js/lib/pdf.js"></script>
		<script src="bower_components/angular/angular.js"></script>
		<script src="bower_components/angular-pdf/dist/angular-pdf.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/main.js"></script>
		<script src="js/practicas.js"></script>	
	</head>
	<body>
	    <style type="text/css">
	    	#btn-menu-mob{
				display: none !important;
			}
			#cuadro-login,
	    	#cuadro-registro{
	    		margin-top: -100px !important;
	    	}
			@media(max-width: 1000px){
	    		#btn-aceptar-registro{
					margin-top: 0px !important;
					margin-bottom: -9px;
	    		}
				#cancela{
				}
	    	}
	    	@media(max-width: 900px){
				#cancela{
					margin-top: -16px !important;
				}
	    	}
	    	@media(max-width: 700px){
				#btn-aceptar-registro{
					margin-top: 7px !important;
	    		}
				#cancela{
					margin-top: -10px !important;
				}
	    	}
	    </style>
		<header>
			<div id="top-blue-line"></div>			
			<div class="container">
				<div class="row">
					<div id="logo"><img src="img/logo.png" style="max-height:40px;margin-left:5%"></div>
					<div id="portal-name-pdf"><i>Portafolio Digital</i></div>
					<div id="btn-menu-mob">&#9776;</div>
					<div id="btn-search-mob"></div>
				</div>
			</div>

			<div id="controls" class="controls">
				<div class="container">
					<?php 
						if (strlen($nombre)<90) {
							echo "<p class='container titulo_vista' style='margin-top:-15px'>";
							echo $nombre;
							echo "</p>";
						}
						else{
							echo "<p class='container titulo_vista'>";
							echo $nombre;
							echo "</p>";
						}
					?>
				</div>
				<div class="container">
					<DIV id="btn_fav_agrega" class="btn-favoritos-check" onclick="document.getElementById('save_msg').style.display = 'block'; 
																				  document.getElementById('btn_fav_agrega').style.display = 'none';">
				        <form method="POST" id="form-fav">
								<!-- <p style="margin-top:-15px;">
									FAVORITOS
								</p>
								<input type='submit' class='fav_pdf'/> -->
								<?php
									echo "<button type='submit' class='btn btn_fav_vista'>Favoritos</button>"; 
								?>
								<input type='hidden' name='id_pdf' id='id_pdf' value='<?php echo $id_pdf; ?>'>
				        </form>
					</DIV>
					<DIV id="btn_fav_elimina" class="btn-favoritos-check" onclick="document.getElementById('save_msg').style.display = 'block';
																				   document.getElementById('btn_fav_elimina').style.display = 'none';">
				        <form method="POST" id="form-fav-delete">
								<!-- <p style="margin-top:-15px;">
									ELIMINAR DE FAVORITOS
								</p>
								<input type='submit' class='fav_pdf'/> -->
								<?php
									echo "<button type='submit' class='btn btn_fav_vista'>Eliminar de favoritos</button>"; 
								?>
								<input type='hidden' name='id_pdf' id='id_pdf' value='<?php echo $id_pdf; ?>'>
				        </form>
					</DIV>
					<?php
						echo '<a href="whatsapp://send?text=Compartiendo información: '.$url_pdf.'"><button class="btn btn-descarga btn_descarga_vista" style="margin-left: 9px;">Whatsapp</button></a>';
						echo "<a href='".$url_pdf."' target='_blank'><button class='btn btn-descarga btn_descarga_vista'>Descargar</button></a>";			
					?>
				</div>
				<DIV id="save_msg" class="container-fluid" style="display:none;position:relative;float:right;margin-top:-40px;margin-right:100px">
			        <p>
			        	<I>CARGANDO...</I>
			        </p>
				</DIV>
			</div>
		</header>	
		<div id="cortina" class="cortina"></div>
			<section id="cuadro_logeo">
			    <div id="cuadro-login" style="margin-top: 0px;z-index:200;">
					<img src="img/cerrar.png" id="btn-cerrar-login">
					<p class="titulo-registro-index">Inicio de Sesión</p>
					<fb:login-button scope="public_profile,email" onlogin="checkLoginState();" id="btn_facebook" size="large">
						<span id="overflow">Inicia sesión con</span> facebook
						</fb:login-button>
						<br><br>
						<img src="img/linea.png" class="linea-registro-index"> o <img src="img/linea.png" class="linea-registro-index"> <br>
						<form method="POST" id="form-login">
							<p class="seccion-registro-index">
								E-mail
							</p><br>
							<input type="text" name="email" id="email-login" class="form-registro-index">
							<br>
							<p class="seccion-registro-index">
								Contraseña
							</p><br>
							<div class="alert alert-danger" role="alert" id="alert-danger-login" style="width:220px;font-size: 20px;position: relative;float:right; margin-top: -30px;margin-bottom:-10px;margin-right: 39px; display:none"><strong>Datos Incorrectos!</strong></div>
							<input type="password" name="password" id="password-login" class="form-registro-index"><br>
							<a href="#">
			  				<p class="rec-password">
			  					¿Olvidaste tu contraseña?
			  				</p>
							</a>
							<img src="img/cargando.gif" style="width:30px;float:right;margin-right:100px;display:none" id="cargando-login">
							<input type="image" src="img/inicio_sesion.png" class="btn-face-login" id="btn-login-aceptar"/> <br> <br><br>
						</form>
						<p class="link-registro">
							¿Aún no tienes cuenta? <a href="#" id="register">Regístrate</a>
						</p>
				</div>
				<div id="cuadro-registro" style="margin-top: 0px;">
					<img src="img/cerrar.png" id="btn-cerrar-registro">
					<p class="titulo-registro-index">Registro</p>

					<form method="POST" id="form-registro" action="perfil_registro.php">
						<p class="seccion-registro-index" style="margin-top:-20px">
							Nombre
						</p><br>
						<input type="text" name="nombre" id="nombre" class="form-registro-index" data-container="body" title="Campo Obligatorio" data-toggle="popover" data-placement="right" data-content="Escribe tu nombre, para idetificar tu sesión"><br>
						<p class="seccion-registro-index">
							E-mail
						</p><br>
						<input type="text" name="email" id="email-registro" class="form-registro-index"data-container="body" title="Campo Obligatorio" data-toggle="popover" data-placement="right" data-content="Tu correo es necesario para completar este registro."><br>
						<p class="seccion-registro-index">
							Contraseña
						</p><br>
						<input type="password" name="password" id="password-registro" class="form-registro-index"data-container="body" title="Campo Obligatorio" data-toggle="popover" data-placement="right" data-content="Es necesario una contraseña para poder acceder a una sesión."><br>
						<p class="seccion-registro-index">
							Confirma contraseña
						</p><br>
						<input type="password" name="password_confirm" id="password_confirm" class="form-registro-index"data-container="body" title="Campo Obligatorio" data-toggle="popover" data-placement="right" data-content="Ha ocurrido un error, las contraseñas no coinciden!"><br>
						<img src="img/cancelar.png" class="btn-registro" id="cancela" style="margin-left: 10px;margin-top:-25px">
						<input type="image" src="img/aceptar.png" class="btn-registro" style="margin-top: 15px;" id="btn-aceptar-registro"/>
						<img src="img/cargando.gif" style="width:40px;float:right;margin-right:200px;display:none" id="cargando-registro">
					</form>
				</div>
		    </section>
		<div class="container pdf_controls_components" ng-app="app">
			
			<div class="row" ng-controller="pdfCtrl">

				<div class="col-md-12" style="margin-top:2%">
				  	<ng-pdf template-url="partials/viewer.html" canvasid="pdf" scale="1.5"></ng-pdf>

				</div>

			</div>

		</div>
	</body>
    <script type="text/javascript">
    	fav_pdf_valid(<?php echo $id_pdf; ?>);
    </script>
	<script src="js/app.js"></script>
</html>
