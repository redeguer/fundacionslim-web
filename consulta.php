<!DOCTYPE html>
<html>
    <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Portafolio Digital</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
	<link rel="stylesheet" type="text/css" href="css/consulta.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" type="text/css" href="fonts/fonts.css">
	<script src="js/jquery-1.11.2.min.js"></script>		
	<script src="js/bootstrap.min.js"></script>
	<script src="js/main.js"></script>
	<script src="js/practicas.js"></script>       
    </head>
    <body>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-65771429-1', 'auto');
            ga('send', 'pageview');

        </script>
        <style type="text/css">
        	#cuadro-login,
	    	#cuadro-registro{
	    		margin-top: -30px !important;
	    	}
	    	@media(max-width: 1000px){
				#cancela{
		        	margin-top: -40px !important;
		        }
	    	}
	    	@media(max-width: 900px){
				#cancela{
					margin-top: -36px !important;
				}
	    	}
	    	@media(max-width: 760px){
				#cancela{
					margin-top: -45px !important;
				}
	    	}
	    	@media(max-width: 700px){
				#cancela{
					margin-top: -40px !important;
				}
	    	}
	    	@media(max-width: 600px){
				#cancela{
					margin-top: -29px !important;
				}
	    	}
	    	@media(max-width: 600px){
				#cancela{
					margin-top: -19px !important;
				}
	    	}
	    	@media(max-width: 450px){
				#cancela{
					margin-top: -30px !important;
					margin-left: 0px !important;
					margin-right: -30px !important;
				}
			}
        </style>
	<div id="cuadro-login" style="margin-top: 0px;">
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
                <input type="text" name="nombre" id="nombre" class="form-registro-index"><br>
                <p class="seccion-registro-index">
                        E-mail
                </p><br>
                <input type="text" name="email" id="email-registro" class="form-registro-index"><br>
                <p class="seccion-registro-index">
                        Contraseña
                </p><br>
                <input type="password" name="password" id="password-registro" class="form-registro-index"><br>
                <p class="seccion-registro-index">
                        Confirma contraseña
                </p><br>
                <input type="password" name="password_confirm" id="password_confirm" class="form-registro-index"><br>
                <img src="img/cancelar.png" class="btn-registro" id="cancela" style="margin-left: 10px;margin-top:-25px">
                <input type="image" src="img/aceptar.png" class="btn-registro" style="margin-top: 15px;"/>
        </form>
	</div> 
    <script>
        $(window).scroll(function() {
            if($(window).scrollTop() > 100) {
                     document.getElementById('barra-buscador-nav').style.display = "block";
            }
            if($(window).scrollTop() < 100) {
                     document.getElementById('barra-buscador-nav').style.display = "none";
            }
        });
		facebook_login();
    </script>
	<header>         
    </header>	
  	<nav>
	</nav>
	<section id="nav-menu">
	</section>
    <script type="text/javascript">
	    header();
        menu_noticias();
	</script>   
	<section id="buscador" class="container">
        <div class="row container-fluid">				
            <div class="col-md-12 col-sm-12 col-xs-12" style="margin-top: 10px">
                    <h3>¿Qué estás buscando?</h3>
            </div>
			<div id="barra-buscador" class="col-md-6 col-md-offset-3 col-sm-12 col-xs-12">
				<form action="consulta.php" method="GET" id="form-id">
					<div class="input-group">
						<input type="text" name="word" id="busca" class="form-control" placeholder="Ejemplos: Diabetes, Hipertensión, Obesidad, etc." aria-describedby="basic-addon2">
						<span class="input-group-addon" id="basic-addon2"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></span>
					</div>
				</form>
			</div>
        </div>
	</section>

		<section id="practica_clinica">
				<div class="container">
	                <div class="col-md-12 col-sm-12 col-xs-12">
						<h2><a href="practicas-clinicas.html" style="color: black; position:relative;">Práctica Clinica</a></h2>            
	                </div>
				</div>
               
				<section id="section-cronicas" class="container" style="margin-top:-50px !important">
			      	<div class="container-fluid row">
				        <div class="subseccion">
				          	<a href="seccion-catalogo.html?seccion=cronicas">
					            <div id="nom_cronicas" class="nombre-seccion">
					              	<div class="center-vert">
						                <img src="img/cronicas.png">
						                <p>Enfermedades Crónicas</p>
					              	</div>
					            </div>
				          	</a>
				    
				          	<div class="contenedor-pdfs">
					            <div id="carousel-example-generic5" data-interval="false" class="carousel slide carousel-size" data-ride="carousel">
					              <!-- Wrapper for slides -->
					              	<div class="carousel-inner carousel-inner-cronicas carousel-inner-cronicas" role="listbox"  id="cronicas-cont">
					              	</div>
					              	<div>
						                <a id="next_btn5" class="right carousel-control" href="#carousel-example-generic5" role="button" data-slide="next">
							                <img src="img/flecha.png" width="26px" height="26px" class="flecha-carousel">
							                <span class="sr-only">Next</span>
						                </a>
					              	</div>
					            </div>
				          	</div>
			          		<div id="chevron-right" class="chevron-pdf-list"></div>
				        </div>
			      	</div>
			    </section>
			    <div id="section-cronicas-search" class="container row" style="padding-left: 5% !important">
			    </div>
			    <section id="section-materna" class="container" style="margin-top:-50px !important">
			      <div class="container-fluid row">
			        <div class="subseccion">
			          <a href="seccion-catalogo.html?seccion=materna">
			            <div id="nom_materna" class="nombre-seccion">
			              <div class="center-vert">
			                <img src="img/materna.png">
			                <p>Salud Materno-Infantil</p>
			              </div>
			            </div>
			          </a>
			          <div id="chevron-left" class="chevron-pdf-list"></div>
			          <div id="prueba-cont" class="contenedor-pdfs">
			            <div id="carousel-example-generic1" data-interval="false" class="carousel slide carousel-size" data-ride="carousel">
			              <!-- Wrapper for slides -->
			              <div class="carousel-inner carousel-inner-materno" role="listbox" id="materno-cont">
			                
			              </div>

			              <!-- Controls -->
			              <!-- <div>
			                <a id="prev_btn1" class="left carousel-control" href="#carousel-example-generic1" role="button" data-slide="prev">
			                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
			                <span class="sr-only">Previous</span>
			                </a>
			              </div>   -->
			              <div>
			                <a id="next_btn1" class="right carousel-control" href="#carousel-example-generic1" role="button" data-slide="next">
			                <img src="img/flecha.png" width="26px" height="26px" class="flecha-carousel">
			                <span class="sr-only">Next</span>
			                </a>
			              </div>
			            </div>
			          </div>
			          <div id="chevron-right" class="chevron-pdf-list"></div>
			        </div>
			      </div>
			    </section>
			    <div id="section-materna-search" class="container row" style="padding-left: 5% !important">
			    </div>
			    <section id="section-ninez" class="container" style="margin-top:-50px !important">
			      <div class="container-fluid row">
			        <div class="subseccion">
			          <a href="seccion-catalogo.html?seccion=ninez">
			            <div id="nom_ninez" class="nombre-seccion">
			              <div class="center-vert">
			                <img src="img/ninez.png">
			                <p>Enfermedades de la Niñez</p>
			              </div>
			            </div>
			          </a>
			          <div id="chevron-left" class="chevron-pdf-list"></div>
			          <div class="contenedor-pdfs">
			            <div id="carousel-example-generic3" data-interval="false" class="carousel slide carousel-size" data-ride="carousel">
			              <!-- Wrapper for slides -->
			              <div class="carousel-inner carousel-inner-ninez" role="listbox" id="ninez-cont">
			                
			              </div>
			              <div>
			                <a id="next_btn3" class="right carousel-control" href="#carousel-example-generic3" role="button" data-slide="next">
			                <img src="img/flecha.png" width="26px" height="26px" class="flecha-carousel">
			                <span class="sr-only">Next</span>
			                </a>
			              </div>
			            </div>
			          </div>
			          <div id="chevron-right" class="chevron-pdf-list"></div>
			        </div>
			      </div>
			    </section>
			    <div id="section-ninez-search" class="container row" style="padding-left: 5% !important">
			    </div>
			    <section id="section-infecciosas" class="container" style="margin-top:-50px !important">
			      <div class="container-fluid row">
			        <div class="subseccion">
			          <a href="seccion-catalogo.html?seccion=infecciosas">
			            <div id="nom_infecciosas" class="nombre-seccion">
			              <div class="center-vert">
			                <img src="img/infecciosas.png">
			                <p>Enfermedades Infecciosas Frecuentes</p>
			              </div>
			            </div>
			          </a>
			          <div id="chevron-left" class="chevron-pdf-list"></div>
			          <div id="prueba-cont" class="contenedor-pdfs">
			            <div id="carousel-example-generic4" data-interval="false" class="carousel slide carousel-size" data-ride="carousel">
			              <!-- Wrapper for slides -->
			              <div class="carousel-inner carousel-inner-infecciosas" role="listbox" id="infecciosas-cont">
			                
			              </div>

			              <div>
			                <a id="next_btn4" class="right carousel-control" href="#carousel-example-generic4" role="button" data-slide="next">
			                <img src="img/flecha.png" width="26px" height="26px" class="flecha-carousel">
			                <span class="sr-only">Next</span>
			                </a>
			              </div>
			            </div>
			          </div>
			          <div id="chevron-right" class="chevron-pdf-list"></div>
			        </div>
			      </div>
			    </section>
			    <div id="section-infecciosas-search" class="container row" style="padding-left: 5% !important">
			    </div>
			</section>
		<section id="consulta">
			<div id="noticias_container" class="container" style="margin-top:30px">
				<h2><a href="noticias.html" style="color: black">Noticias</a></h2>
			</div>
		    <section id="noticias" class="container" style="margin-top:-40px">
				<div id="busqueda_all-news">
					<div id="busqueda_primera_seccion">
						<div class="noticia-prev">
					        <img src="img/cargando.gif" style="width:50px;float:right;margin-right:43%;margin-top: 130px">
						</div>
						<div class="noticia-prev">
					        <img src="img/cargando.gif" style="width:50px;float:right;margin-right:43%;margin-top: 130px">
						</div>
						<div class="noticia-prev">
					        <img src="img/cargando.gif" style="width:50px;float:right;margin-right:43%;margin-top: 130px">
						</div>
						<div class="noticia-prev">
					        <img src="img/cargando.gif" style="width:50px;float:right;margin-right:43%;margin-top: 130px">
						</div>
						<div class="noticia-prev">
					        <img src="img/cargando.gif" style="width:50px;float:right;margin-right:43%;margin-top: 130px">
						</div>
						<div class="noticia-prev">
					        <img src="img/cargando.gif" style="width:50px;float:right;margin-right:43%;margin-top: 130px">
						</div>
					</div>
					<div id="busqueda_dem_news">
						<div id="busqueda_news_block_1" class="new_sec_all">
							<div class="noticia-prev">
								<div class="img-noticia-prev"></div>
								<p class="noticia-para">noticias, seccion 2</p>
							</div>
							<div class="noticia-prev">
								<div class="img-noticia-prev"></div>
								<p class="noticia-para">noticias, seccion 2</p>
							</div>
							<div class="noticia-prev">
								<div class="img-noticia-prev"></div>
								<p class="noticia-para">noticias, seccion 2</p>
							</div>
							<div class="noticia-prev">
								<div class="img-noticia-prev"></div>
								<p class="noticia-para">noticias, seccion 2</p>
							</div>
							<div class="noticia-prev">
								<div class="img-noticia-prev"></div>
								<p class="noticia-para">noticias, seccion 2</p>
							</div>
							<div class="noticia-prev">
								<div class="img-noticia-prev"></div>
								<p class="noticia-para">noticias, seccion 2</p>
							</div>
						</div>
						<div id="busqueda_news_block_2" class="new_sec_all">
							<div class="noticia-prev">
								<div class="img-noticia-prev"></div>
								<p class="noticia-para">noticias, seccion 2</p>
							</div>
							<div class="noticia-prev">
								<div class="img-noticia-prev"></div>
								<p class="noticia-para">noticias, seccion 2</p>
							</div>
							<div class="noticia-prev">
								<div class="img-noticia-prev"></div>
								<p class="noticia-para">noticias, seccion 2</p>
							</div>
							<div class="noticia-prev">
								<div class="img-noticia-prev"></div>
								<p class="noticia-para">noticias, seccion 2</p>
							</div>
							<div class="noticia-prev">
								<div class="img-noticia-prev"></div>
								<p class="noticia-para">noticias, seccion 2</p>
							</div>
							<div class="noticia-prev">
								<div class="img-noticia-prev"></div>
								<p class="noticia-para">noticias, seccion 2</p>
							</div>
						</div>
        			</div>
				</div>
				<div class="row container">
					<div class="col-md-12 col-sm-12 col-xs-12">
						<div id="btn_noticias_sec_busqueda" class="btn_noticias_sec_all" onclick="muestra_noticias_busqueda()"><i>Más Noticias...</i></div>
					</div>
				</div>
	    	</section>
			
		    <section id="calculadoras" class="container">
				<h2>Calculadoras</h2>
				<div class="row container-fluid">
						<div id="actividad" class="col-md-3">
							<a href="actividad.html"><div id="btn-calc-af" class="btn-calc">
								<img src="img/calc1.png">
								<p>Calculadora de actividad física</p>
								</div>
							</a>
						</div>
						<div id="calorico" class="col-md-2">
							<a href="calorico.html"><div id="btn-calc-gc" style="font-size:13px" class="btn-calc">
								<img src="img/calc2.png">
								<p>Calculadora de gasto calórico</p>
								</div>
							</a>
						</div>
						<div id="imc" class="col-md-2">
							<a href="imc.html"><div id="btn-calc-mc" style="font-size:13px" class="btn-calc">
								<img src="img/calc3.png">
								<p>Calculadora de índice de masa corporal (IMC)</p>
								</div>
							</a>
						</div>
						<div id="cardio" class="col-md-2">
							<a href="cardio.html"><div id="btn-calc-rc" style="font-size:13px" class="btn-calc">
								<img src="img/calc4.png">
								<p>Calculadora de riesgo cardiovascular</p>
								</div>
							</a>
						</div>
						<div id="renal" class="col-md-3">
							<a href="renal.html"><div id="btn-calc-fr" style="font-size:13px" class="btn-calc">
								<img src="img/calc5.png">
								<p>Calculadora de función renal</p>
								</div>
							</a>
						</div>
				</div>
				<div class="row container">
				</div>
			
				<div class="row container">
				</div>
				<div class="row container">
				</div>
		    </section>
		</section>
		<script type="text/javascript">
			busqueda();
			noticias_content_container();
			busqueda_pdf();
		</script>
		<section id="mas-visitados" class="container">
			<div class="row container-fluid">
				<div class="col-md-12 col-sm-12 col-xs-12 col-lg-12">
					<hr>
					<div id="calc-list" class="col-md-5 col-sm-4 col-xs-12">
						<p>Calculadoras de Salud</p>
						<ul style="float:left">
							<li>Calculadora de índice de masa corporal (IMC)</li>
							<li>Calculadora de riesgo cardiovascular</li>
							<li>Calculadora de función renal</li>
							<li>Calculadora de gasto calórico</li>
							<li>Esquema de Vacunación</li>
							<li>Calculadora de actividad física</li>
						</ul>
					</div>
					<div id="calc-list-mob">
						<p>Calculadoras de Salud</p>
						<div class="list-mob-el btn-primary btn-cal-fisica">Calculadora de actividad física</div>
						<div class="list-mob-el btn-primary btn-cal-calorico">Calculadora de gasto calórico</div>
						<div class="list-mob-el btn-primary btn-cal-masa">Calculadora de índice de masa corporal (IMC)</div>
						<div class="list-mob-el btn-primary btn-cal-riesgo">Calculadora de riesgo cardiovascular</div>
						<div class="list-mob-el btn-primary btn-cal-renal">Calculadora de función renal</div>
					</div>
					<div class="visitados">
						<p>Más Visitados</p>
						<div id="mv-txt1">
						</div>
						<div id="mv-txt2">
						</div>
						<div id="mv-txt3">
						</div>
						<script type="text/javascript">
							most_visited();
						</script>
					</div>
				</div>
			</div>
		</section>
	<footer>
			<div  class="container" style="width:430px; height:50px;">
                
				<a href="http://www.fundacioncarlosslim.org/"><div id="logo-foot"><img src="img/logo-black.png"></div></a>
				<a href="http://www.fundacioncarlosslim.org/"><div id="logo-foot-mob"><img src="img/logo-black.png"></div></a>
			</div>
		</footer>
		<div class="bottom-line-right">
			<p>Aviso de privacidad</p>
		</div>
		<div class="bottom-line">
			<div id="aviso-priv" onclick="loadPrivacy()"><img style="max-width:22px;" src="img/aviso.png">&nbsp;Aviso de privacidad</div>
		</div>
		<script type="text/javascript">
			var lista = document.cookie.split(";");
			for (i in lista) {
				var busca = lista[i].search("nombre");
				var busca1 = lista[i].search("access");
				
				if (busca > -1) {
					micookie=lista[i]
					var igual = micookie.indexOf("=");
					var nombre = micookie.substring(igual+1);
				}

				if (busca1 > -1) {
					micookie1=lista[i]
					var igual1 = micookie1.indexOf("=");
					var access = micookie1.substring(igual1+1);
				}
			}

			if (access=="valido") {
				var html="";
				html+="<div id='sn-tw' class='sn-ind' style='margin-top: 5px'></div>";
				html+="<div id='sn-fb' class='sn-ind' style='margin-top: 5px'></div>";
				html+="<p class='perfil-text-login'>Hola" + " " + nombre +"/<span id='cerrar-sesion'>Cerrar sesión</span></p>";
				$("#sub-social-networks").html(html);
			};
		</script>
	</body>
</html>