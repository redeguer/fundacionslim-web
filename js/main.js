function forgotpass(){
	var url      = window.location.href;
	var cont     = url.search("valid");
	var cont_num = url.substr(cont+6, url.length);

	if (cont>0) {
		if (cont_num=="1") {
			$('#recuperar_pass_pre').css('display','none');
			$('#recuperar_pass_pos').css('display','block');
		}
		else{
			$('#recuperar_pass_pre').css('display','block');
			$('#recuperar_pass_pos').css('display','none');
		}
	}
	else{
		$('#recuperar_pass_pre').css('display','block');
		$('#recuperar_pass_pos').css('display','none');
	}
}
function edita_perfil(nombre_upload,mail_upload,nombre_edit,mail_edit,img_url_File,token){
	var urlredit = 'https://fundacioncsapidevel.azurewebsites.net/api/account/update';
	var credentials = "Bearer" + " " + token;

	if (nombre_upload=="" && mail_upload!="") {
		var email=mail_upload;

		var JPDF={
			Name: nombre_edit,
			Email: email,
			Gender: "male",
			FacebookID: "",
			Image: img_url_File
		};

		$.ajax({
			type:"PUT",
			async: false,
			url:urlredit,
			data:JPDF,
			beforeSend:function(request){
				request.withCredentials=true;
				request.setRequestHeader("Authorization",credentials);
			},
			success:function(resp){
				document.cookie = "username="+email+";";
				location.reload();
			},
			error:function(e){
				console.log(e,JPDF);
				alert(nombre_upload,mail_upload,nombre_edit,mail_edit,img_url_File,token);
			}
		});
	};
	if (nombre_upload!="" && mail_upload=="") {
		var email = mail_edit;
		var nombre=nombre_upload;

		var JPDF={
			Name: nombre,
			Email: email,
			Gender: "male",
			FacebookID: "",
			Image: img_url_File
		};

		$.ajax({
			type:"PUT",
			async: false,
			url:urlredit,
			data:JPDF,
			beforeSend:function(request){
				request.withCredentials=true;
				request.setRequestHeader("Authorization",credentials);
			},
			success:function(resp){
				document.cookie = "nombre="+nombre+";";
				document.cookie = "username="+email+";";
				location.reload();
			},
			error:function(e){
				console.log(e,JPDF);
			}
		});
	}
	if(nombre_upload!="" && mail_upload!=""){
		var nombre=nombre_upload;
		var email=mail_upload;

		var JPDF={
			Name: nombre,
			Email: email,
			Gender: "male",
			FacebookID: "",
			Image: img_url_File
		};

		$.ajax({
			type:"PUT",
			async: false,
			url:urlredit,
			data:JPDF,
			beforeSend:function(request){
				request.withCredentials=true;
				request.setRequestHeader("Authorization",credentials);
			},
			success:function(resp){
				document.cookie = "nombre="+nombre+";";
				document.cookie = "username="+email+";";
				location.reload();
			},
			error:function(e){
				console.log(e,JPDF);
			}
		});
	}
}
function facebook_div(nombre,email,id,url_fb){
	document.cookie = "access=valido;";
	document.cookie = "nombre="+nombre+";";
	var url_perfil = window.location.href;
	var n = url_perfil.search("perfil.html");
    var html   = "";
    var lg_row = "";

	var html_perfil       = "";
	var html_img_fb       = "";
	var menu_lg           = "";
	var html_perfil_mobil = "";
    
    html_img_fb+="<img src='"+url_fb+"' class='img-circle'>";
    
    html+="<a href='https://twitter.com/Fund_CarlosSlim' target='_blank'><div id='sn-tw' class='sn-ind' style='margin-top: 5px'></div></a>";
    html+="<a href='https://www.facebook.com/FundacionCarlosSlim' target='_blank'><div id='sn-fb' class='sn-ind' style='margin-top: 5px'></div></a>";
    html+="<p id='logout-face' class='perfil-text-login'><a href='perfil.html'><span class='lg_name'>Hola" + " " + nombre +"</span></a>/<span id='cerrar-sesion-fb' onclick='prueba()'>Cerrar sesión</span></p>";
    
    $("#sub-social-networks").html(html);
	
	lg_row+="<div id='lg-mobil-fb' class='col-sm-12 col-xs-12'>";
		lg_row+="<div class='container'>";
			lg_row+="<a href='perfil.html'><img src='"+url_fb+"' class='img-circle' style='width:40px; height:40px; margin-top:-2px'> <p class='perfil-text-login-mobil'>Hola" + " " + nombre +"</p></a>";
		lg_row+="</div>";
	lg_row+="</div>";

	menu_lg+= "<li id='li-lg'><span class='txt_menu_mobil_resp' onclick='prueba()'>&nbsp;Cerrar Sesión</span></li>";
	
	$("#lg_name").html(menu_lg);
	$( "header" ).after( lg_row );

    document.getElementById('cuadro-login').style.display = "none";
       // document.getElementById('menu_mobil').style.display = "none";

    document.getElementById('menu_mobil').style.top = "-650px";

    $("#perfil-left").html(html_img_fb);
}
function facebook_login(){

	function statusChangeCallback(response) {
	    if (response.status === 'connected') {
	      // Logged into your app and Facebook.
	      testAPI();
	    } 
	    else if (response.status === 'not_authorized') {
	      // The person is logged into Facebook, but not your app.
	      document.getElementById('status').innerHTML = 'Please log ' +
	      'into this app.';
	    } 
	    else {
	      // The person is not logged into Facebook, so we're not sure if
	      // they are logged into this app or not.
	      document.getElementById('status').innerHTML = 'Please log ' +
	      'into Facebook.';
	    }
	}

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  window.checkLoginState=function() {
    FB.getLoginStatus(function(response) {
      	statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1607848596150574',
      cookie     : true, 
      xfbml      : true, 
      version    : 'v2.2' 
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };

  
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

    function testAPI() {
      	console.log('Welcome!  Fetching your information.... ');
      	FB.api('/me', function(response) {

      		document.cookie = "fbid="+response.id+";";
		    
		    var url_fb = 'https://graph.facebook.com/'+response.id+'/picture?type=large&return_ssl_resources=1';
		    console.log(response);
			
		    var urlregister="https://fundacioncsapidevel.azurewebsites.net/api/Account/Register";
			var nombre=response.name;
			var email=response.email;
			var id=response.id;

		    var JPDF={
				Name: nombre,
				Email: email,
				Gender: 'male',
				FacebookID: id,
				Image: url_fb
			};
			
			$.ajax({
				type:"POST",
				url:urlregister,
				data:JPDF,
				success:function(resp){
		    		document.cookie = "photo="+url_fb+";";
					facebook_div(nombre,email,id,url_fb);
				},
				error:function(e){
					facebook_div(nombre,email,id,url_fb);
				}
			});

			var JFB={
				Email: email,
				FacebookID: id
			};

			$.ajax({
				type:"POST",
				url:"https://fundacioncsapidevel.azurewebsites.net/api/Account/Login",
				data:JFB,
				success:function(resp){
					document.cookie = "username="+email+";";
					document.cookie = "token="+resp.access_token+";";
					document.cookie = "photo="+resp.userImage+";";
					// console.log(resp);
				},
				error:function(e){
					console.log(e,JFB);
				}
			});
		});
    }
}
function header(){
	var header = "";
	var container = ""; 
	var menu_mobil = "";
	var header_tag = "";
	var lg_row = "";
	var menu_lg = "";

	header_tag+="<div class='container'>";
		header_tag+="<div class='row'>";
			header_tag+="<div class='col-sm-12 col-xs-12'>";
				/*header_tag+="<div id='logo'><a href='index.html'><img src='img/logo.png' style='max-height:40px;'></a></div>";
				header_tag+="<div id='portal-name'><i>Portafolio Digital</i></div>";
				header_tag+="<div id='social-networks'>";*/
					header_tag+="<div id='barra-buscador-nav' class='col-md-4 col-sm-9 col-xs-9' style='display:none;'>";
		                header_tag+="<form action='consulta.php' method='GET' id='form-id'>";
		                  	header_tag+="<div class='input-group'>";
								header_tag+="<input type='text' name='word' id='busca-nav' class='form-control' placeholder='Diabetes, Hipertensión, Obesidad, etc.' aria-describedby='basic-addon2'>";
								header_tag+="<span class='input-group-addon' id='basic-addon2'><span class='glyphicon glyphicon-search' aria-hidden='true'></span></span>";
		                  	header_tag+="</div>";
		                header_tag+="</form>";
	              	header_tag+="</div> ";
	              	header_tag+="<div id='sub-social-networks'>";
	              		/*header_tag+="<div id='sn-youtube' class='sn-ind'></div>";*/
						header_tag+="<a href='https://twitter.com/Fund_CarlosSlim' target='_blank'><div id='sn-tw' class='sn-ind'></div></a>";
						header_tag+="<a href='https://www.facebook.com/FundacionCarlosSlim' target='_blank'><div id='sn-fb' class='sn-ind'></div></a>";
						/*header_tag+="<div id='sn-pinterest' class='sn-ind'></div>";
						header_tag+="<div id='sn-gplus' class='sn-ind'></div>";*/
						header_tag+="<div id='sn-lgin' class='sn-ind'></div>";
	              	header_tag+="</div>";
	            header_tag+="</div>";
				header_tag+="<div id='btn-menu-mob'>";
					header_tag+="<img src='img/menu.png' class='menu-img'>";
				header_tag+="</div>";
				header_tag+="<div id='btn-search-mob'>";
					header_tag+="<img src='img/search-icon.png' onclick='mob_search()' class='search-img'>";
				header_tag+="</div>";
			header_tag+="</div>";
		header_tag+="</div>";
	header_tag+="</div>";
	$("header").html(header_tag);

	
	header+="<div class='container'>";
		header+="<div id='navbar'>";
			header+="<ul class='navli'>";
				header+="<div style='float:left; width:4%;'><a href='index.html'><li id='li-inicio'><span id='txt-mob-incio'>Inicio<span></li></a></div>";
				header+="<div style='float:left; width:9%;'><a href='noticias.php' class='hiper-practicas'><li id='li-noticias' style='position: relative;float: left;bottom: 20px;'>Actualidad en Salud</li></a></div>";
				header+="<div class='liquidCol10' style='width:12%;'><a href='practicas-clinicas.html' class='hiper-practicas'><li id='li-practicas' style='position: relative;float: left;bottom: 20px;'>Guias de Práctica Clínica</li></a></div>";
				header+="<div class='liquidCol10'><li id='li-calculadora' style='position: relative;float: left;bottom: 20px;'>Calculadora de Salud</li></div>";
				header+="<div class='liquidCol10'><li id='li-vademecum'>Vademécum</li></div>";
				header+="<div class='liquidCol10'><li id='li-linea-vida'>Linea de Vida</li></div>";
				header+="<div class='liquidCol10'><a class='vacc_link' href='vacunacion.html'><li id='li-conoce' style='position: relative;float: left;bottom: 20px;'>Esquema de Vacunación</li></a></div>";
				header+="<div class='liquidCol10'><a class='vacc_link' href='pieenso.html'><li id='li-pieenso' style='position: relative;float: left;bottom: 20px;'>Pieenso en la operación</li></a></div>";
				header+="<li id='li-descarga' onclick='showDwnloadMdl();'><span class='texto-li-descarga'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Descarga / Actualizar App</span></li>";
				header+="<li id='logo-slim-mob'></li>";
			header+="</ul>";
		header+="</div>";
	header+="</div> ";
	$("nav").html(header);

	container+="<div class='container'>";
		container+="<div class='row'>";
			container+="<div id='menu-noticias' class='menu col-md-11'>";
				container+="<div class='row'>";
				container+="</div>";
			container+="</div>";
			container+="<div id='menu-practicas' class='menu'>";
				container+="<div class='row'>";
					container+="<a href='seccion-catalogo.html?seccion=cronicas' class='hiper-practicas'>";
						container+="<div class='btn-pract col-md-2 col-sm-2'>";
							container+="<div class='btn-red'></div>";
							container+="<img src='img/cronicas.png' class='img-pract'>";
							container+="<p class='btn-title-pract'>Enfermedades Crónicas</p>";
						container+="</div>";
					container+="</a>";
					container+="<a href='seccion-catalogo.html?seccion=materna' class='hiper-practicas'>";
						container+="<div class='btn-pract col-md-2 col-sm-2'>";
							container+="<div class='btn-purple'></div>";
							 container+="<img src='img/materna.png' class='img-pract'>";
							container+="<p class='btn-title-pract'>Materno-Infantil</p>";
						container+="</div>";
					container+="</a>";
					container+="<a href='seccion-catalogo.html?seccion=ninez' class='hiper-practicas'>";
						container+="<div class='btn-pract col-md-2 col-sm-2'>";
							container+="<div class='btn-orange'></div>";
							container+="<img src='img/ninez.png' class='img-pract'>";
							container+="<p class='btn-title-pract'>Enfermedades de la niñez</p>";
						container+="</div>";
					container+="</a>";
					container+="<a href='seccion-catalogo.html?seccion=infecciosas' class='hiper-practicas'>";
						container+="<div class='btn-pract col-md-2 col-sm-2'>";
							container+="<div class='btn-blue'></div>";
							container+="<img src='img/infecciosas.png' class='img-pract'>";
							container+="<p class='btn-title-pract'>Enfermedades infecciosas frecuentes</p>";
						container+="</div>	";
					container+="</a>";


					container+="<a href='http://www.cenetec.salud.gob.mx/contenidos/gpc/catalogoMaestroGPC.html' target='_blank' class='hiper-practicas'>";
						container+="<div class='btn-pract col-md-2 col-sm-2'>";
							container+="<div class='btn-green'></div>";
							container+="<img src='img/otros.png' class='img-pract'>";
							container+="<p class='btn-title-pract' style='padding-top:5px;'>Otros</p>";
						container+="</div>	";
					container+="</a>";

				container+="</div>";
			container+="</div>";
			container+="<div id='menu-calculadora' class='menu col-md-11'>";
				container+="<div class='row'>";
					container+="<div style='text-align:center !important;'>";

						container+="<div class='hintModal'><a href='imc.html'><div id='btn-calc-mc' class='class=hintModal  btn-calc col-md-2 col-sm-2'>";
							container+="<img src='img/calc6.png'>";
							container+="<p>Calculadora de índice de masa corporal (IMC)</p>";
						container+="</div></a><div class='hintModal_container' style='margin-top:180px; margin-left:120px;'>Es la medida más habitual para determinar si una persona presenta pre-obesidad, obesidad, peso normal o desnutrición, fue desarrollada por Adolphe Quételet y es reconocida internacionalmente como el mejor de los indicadores nutricionales. No aplica para ser usada en niños o jóvenes menores de 18 años.</div></div>";


						

						container+="<div class='hintModal'><a href='actividad.html'><div id='btn-calc-af' class='btn-calc col-md-2 col-sm-2'>";
							container+="<img src='img/calc1.png'>";
							container+="<p>Calculadora de actividad física</p>";
						container+="</div></a><div class='hintModal_container' style='margin-top:180px; margin-left:350px;'>Permite recomendar la intensidad y tipo de ejercicios para las personas que iniciarían su actividad física y sobre todo reconocer cuando el ejercicio esta contra indicado en tanto no se haga una valoración médica. Se basa en el PAR-Q (cuestionario de aptitud para la intensidad física) desarrollado por la 'Sociedad Canadiense para el Ejercicio'. </div></div>";
						
						container+="<div class='hintModal'><a href='calorico.html'><div id='btn-calc-gc' class='btn-calc col-md-2 col-sm-2'>";
							container+="<img src='img/calc2.png'>";
							container+="<p>Calculadora de gasto calórico</p>";
						container+="</div></a><div class='hintModal_container' style='margin-top:180px; margin-left:580px;'>Permite calcular y recomendar el consumo calórico diario de un individuo en base a su peso, estatura y edad y sexo. Está basada en la ecuación de Harris-Benedict </div></div>";
						
						container+="<div class='hintModal'><a href='cardio.html'><div id='btn-calc-rc' class='btn-calc col-md-2 col-sm-2'>";
							container+="<img src='img/calc4.png'>";
							container+="<p>Calculadora de riesgo cardiovascular</p>";
						container+="</div></a><div class='hintModal_container' style='margin-top:180px; margin-left:800px;'>Esta escala utiliza la recomendación de la organización mundial de la salud y estima el riesgo que tiene la persona en los próximos 10 años de desarrollar enfermedad cardio vascular cerebral infarto al miocardio o angina de pecho. Es particularmente útil en las personas mayores de 40 años y utiliza la escala de Framingham</div></div>";
						
						container+="<div class='hintModal'><a href='renal.html'><div id='btn-calc-fr' class='btn-calc col-md-2 col-sm-2'>";
							container+="<img src='img/calc5.png'>";
							container+="<p>Calculadora de función renal</p>";
						container+="</div></a><div class='hintModal_container' style='margin-top:180px; margin-left:1000px;'>Se usa para estimar la filtración glomerular y poder valorar a partir de ella la función renal. Este cálculo es particularmente útil en los estadios iniciales de la falla renal y se basa en la fórmula de Cockcroft y Gault.</div></div>";
					container+="</div>";
				container+="</div>";
			container+="</div>";
			container+="<div id='menu-vademecum' class='menu col-md-11'>";
				container+="<div class='row'>";
					container+="<div class='col-md-4 col-sm-4'>";
						container+="<img src='img/vademecum.jpg' class='img-rounded img-menu-vade'>";
					container+="</div>";
					container+="<div class='col-md-7 col-sm-8'>";
						container+="<div class='texto-vademecum'>";
							container+="<h4>Vademécum 2015</h4>";
							container+="<p>Guía con información sobre los medicamentos, incluyendo dosis, presentaciones, vía de administración, indicaciones terapéuticas, contraindicaciones, reacciones secundarias y adversas</p>";
							//container+="<a href='http://www.medicamentos.com.mx/systems/producto_list.asp?bd=&se='>";
								container+="<button class='btn btn-success' id='vademecumDisclaim' onclick='showDisclaim()'>CONSULTAR</button>";
							//container+="</a>";
						container+="</div>";
					container+="</div>";
				container+="</div>";
			container+="</div>";
			container+="<div id='menu-linea-vida' class='menu'>";
				container+="<div class='row'>";
					container+="<a href='vida.html?url=http://clikisalud.net/manuales/tusalud/manual1.html' class='hiper-practicas'>";
						container+="<div class='btn-pract col-md-2 col-sm-2'>";
							container+="<div class='btn-real-purple'></div>";
							container+="<img src='img/linea/carreola.png' class='img-pract'>";
							container+="<p class='btn-title-pract'>0 a 6 <br>años</p>";
						container+="</div>";
					container+="</a>";
					container+="<a href='vida.html?url=http://clikisalud.net/manuales/tusalud/manual6-12.html' class='hiper-practicas'>";
						container+="<div class='btn-pract col-md-2 col-sm-2'>";
							container+="<div class='btn-real-purple'></div>";
							 container+="<img src='img/linea/nina.png' class='img-pract'>";
							container+="<p class='btn-title-pract'>7 a 12 <br>años</p>";
						container+="</div>";
					container+="</a>";
					container+="<a href='vida.html?url=http://clikisalud.net/manuales/tusalud/manual13-17.html' class='hiper-practicas'>";
						container+="<div class='btn-pract col-md-2 col-sm-2'>";
							container+="<div class='btn-real-purple'></div>";
							container+="<img src='img/linea/nino.png' class='img-pract'>";
							container+="<p class='btn-title-pract'>13 a 17 <br>años</p>";
						container+="</div>";
					container+="</a>";
					container+="<a href='vida.html?url=http://clikisalud.net/manuales/tusalud/manual18-39.html' class='hiper-practicas'>";
						container+="<div class='btn-pract col-md-2 col-sm-2'>";
							container+="<div class='btn-real-purple'></div>";
							container+="<img src='img/linea/mujer.png' class='img-pract'>";
							container+="<p class='btn-title-pract'>18 a 39 <br>años</p>";
						container+="</div>	";
					container+="</a>";
					container+="<a href='vida.html?url=http://clikisalud.net/manuales/tusalud/manual40-69.html' class='hiper-practicas'>";
						container+="<div class='btn-pract col-md-2 col-sm-2'>";
							container+="<div class='btn-real-purple'></div>";
							container+="<img src='img/linea/hombre.png' class='img-pract'>";
							container+="<p class='btn-title-pract'>40 a 69 <br>años</p>";
						container+="</div>	";
					container+="</a>";
					container+="<a href='vida.html?url=http://clikisalud.net/manuales/tusalud/manual70.html' class='hiper-practicas'>";
						container+="<div class='btn-pract col-md-2 col-sm-2'>";
							container+="<div class='btn-real-purple'></div>";
							container+="<img src='img/linea/carreola.png' class='img-pract'>";
							container+="<p class='btn-title-pract'>70 años<br>y más</p>";
						container+="</div>	";
					container+="</a>";
				container+="</div>";
			container+="</div>";
		container+="</div>";
	container+="</div>";

	$("#nav-menu").html(container);

	$( "body" ).append( "<section id='menu_mobil' style='top:240px !important;'></section>" );

	menu_mobil+= "<div class='col-sm-12' >";
		menu_mobil+= "<a href='index.html'><li id='li-inicio-mob'>&nbsp;<span id='txt-mob-incio-resp'>Inicio<span></li></a>";
	menu_mobil+= "</div>";
	menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
		menu_mobil+= "<a href='noticias.php' class='hiper-practicas'><li id='li-noticias'><span class='txt_menu_mobil_resp'>Kiosko Científico</span></li></a>";
	menu_mobil+= "</div>";
	menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
		menu_mobil+= "<a href='practicas-clinicas.html' class='hiper-practicas'><li id='li-practicas'><span class='txt_menu_mobil_resp'>Guias de Práctica Clínica</span></li></a>";
	menu_mobil+= "</div>";
	menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
		menu_mobil+= "<li id='li-calculadora' onclick='menu_mobil_calculadoras()'><span class='txt_menu_mobil_resp'>Calculadoras de Salud</span><span><img class='arrow_sub_menu' src='img/arrow.png'></span></li>";
	menu_mobil+= "</div>";
	menu_mobil+= "<div id='sub_calculadoras'>";
		menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
			menu_mobil+= "<a href='actividad.html'><li id='calcu1'><span class='txt_menu_mobil_resp'>&nbsp;<img class='sub_menu' src='img/pesa.png'>Calculadora de actividad física</span></li></a>";
		menu_mobil+= "</div>";
		menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
			menu_mobil+= "<a href='calorico.html'><li id='calcu2'><span class='txt_menu_mobil_resp'>&nbsp;<img class='sub_menu' src='img/flama.png'>Calculadora de gasto calórico</span></li></a>";
		menu_mobil+= "</div>";
		menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
			menu_mobil+= "<a href='imc.html'><li id='calcu3'><span class='txt_menu_mobil_resp'>&nbsp;<img class='sub_menu' src='img/bascula.png'>Calculadora de Índice de Masa Corporal</span></li></a>";
		menu_mobil+= "</div>";
		menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
			menu_mobil+= "<a href='cardio.html'><li id='calcu4'><span class='txt_menu_mobil_resp'>&nbsp;<img class='sub_menu' src='img/corázon.png'>Calculadora de riesgo cardiovascular</span></li></a>";
		menu_mobil+= "</div>";
		menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
			menu_mobil+= "<a href='renal.html'><li id='calcu5'><span class='txt_menu_mobil_resp'>&nbsp;<img class='sub_menu' src='img/órgano.png'>Calculadora de función renal</span></li></a>";
		menu_mobil+= "</div>";
	menu_mobil+= "</div>";
	menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
		menu_mobil+= "<a href='vademecum.html'><li id='li-vademecum'><span class='txt_menu_mobil_resp'>Vademécum</span></li></a>";
	menu_mobil+= "</div>";
	menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
		menu_mobil+= "<li id='li-linea-vida' onclick='menu_mobil_vida()'><span class='txt_menu_mobil_resp'>Linea de vida</span><span><img class='arrow_sub_menu' src='img/arrow.png'></span></li>";
	menu_mobil+= "</div>";
	menu_mobil+="<div id='sub_vida'>";
		menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
			menu_mobil+= "<a href='vida.html?url=http://clikisalud.net/manuales/tusalud/manual1.html' class='hiper-practicas'><li id='vida1'><span class='txt_menu_mobil_resp'>&nbsp;<img class='sub_menu' src='img/carreola_off.png'>0 a 6 años</span></li></a>";
		menu_mobil+= "</div>";
		menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
			menu_mobil+= "<a href='vida.html?url=http://clikisalud.net/manuales/tusalud/manual6-12.html' class='hiper-practicas'><li id='vida2'><span class='txt_menu_mobil_resp'>&nbsp;<img class='sub_menu' src='img/niña_off.png'>7 a 12 años</span></li></a>";
		menu_mobil+= "</div>";
		menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
			menu_mobil+= "<a href='vida.html?url=http://clikisalud.net/manuales/tusalud/manual13-17.html' class='hiper-practicas'><li id='vida3'><span class='txt_menu_mobil_resp'>&nbsp;<img class='sub_menu' src='img/niño_off.png'>13 a 17 años</span></li></a>";
		menu_mobil+= "</div>";
		menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
			menu_mobil+= "<a href='vida.html?url=http://clikisalud.net/manuales/tusalud/manual18-39.html' class='hiper-practicas'><li id='vida4'><span class='txt_menu_mobil_resp'>&nbsp;<img class='sub_menu' src='img/mujer_off.png'>18 a 39 años</span></li></a>";
		menu_mobil+= "</div>";
		menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
			menu_mobil+= "<a href='vida.html?url=http://clikisalud.net/manuales/tusalud/manual40-69.html' class='hiper-practicas'><li id='vida5'><span class='txt_menu_mobil_resp'>&nbsp;<img class='sub_menu' src='img/hombre_off.png'>40 a 69 años</span></li></a>";
		menu_mobil+= "</div>";
		menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
			menu_mobil+= "<a href='vida.html?url=http://clikisalud.net/manuales/tusalud/manual70.html' class='hiper-practicas'><li id='vida6'><span class='txt_menu_mobil_resp'>&nbsp;<img class='sub_menu' src='img/anciana_off.png'>70 años y más</span></li></a>";
		menu_mobil+= "</div>";
	menu_mobil+= "</div>";
	menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
		menu_mobil+="<a class='vacc_link' href='vacunacion.html'><li id='li-conoce'><span class='txt_menu_mobil_resp'>Esquema de Vacunación</span></li></a>";
	menu_mobil+= "</div>";
	menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
		menu_mobil+= "<li id='li-descarga-mob'><span class='txt_menu_mobil_resp'>Descargar</span></li>";
	menu_mobil+= "</div>";
	menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
		menu_mobil+= "<li id='li-fb'><span class='txt_menu_mobil_resp'>Facebook</span></li>";
	menu_mobil+= "</div>";
	menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
		menu_mobil+= "<li id='li-twt'><span class='txt_menu_mobil_resp'>Twitter</span></li>";
	menu_mobil+= "</div>";
	menu_mobil+= "<div class='col-sm-12 menu_mob_sec' >";
		menu_mobil+= "<div id='lg_name'>";
			menu_mobil+= "<li id='li-lg'><span class='txt_menu_mobil_resp'>Iniciar Sesión</span></li>";
		menu_mobil+= "</div>";
	menu_mobil+= "</div>";

	$("#menu_mobil").html(menu_mobil);
	
	var lista = document.cookie.split(";");
	for (i in lista) {
		var busca = lista[i].search("nombre");
		var busca1 = lista[i].search("access");
		var busca2 = lista[i].search("photo");
		var busca3 = lista[i].search("fbid");
		
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

		if (busca2 > -1) {
			micookie2=lista[i]
			var igual2 = micookie2.indexOf("=");
			var photo = micookie2.substring(igual2+1);
		}

		if (busca3 > -1) {
			micookie3=lista[i]
			var igual3 = micookie3.indexOf("=");
			var fbid_cond = micookie3.substring(igual3+1);
		}
	}



	if (access=="valido") {

		var html="";
		html+="<a href='https://twitter.com/Fund_CarlosSlim' target='_blank'><div id='sn-tw' class='sn-ind' style='margin-top: 5px'></div></a>";
		html+="<a href='https://www.facebook.com/FundacionCarlosSlim' target='_blank'><div id='sn-fb' class='sn-ind' style='margin-top: 5px'></div></a>";
		if (fbid_cond) {
			html+="<p class='perfil-text-login'><a href='perfil.html'><span class='lg_name'>Hola" + " " + nombre +"</span></a>/<span id='cerrar-sesion-fb' onclick='prueba()'>Cerrar sesión</span></p>";
		}
		else{
			html+="<p class='perfil-text-login'><a href='perfil.html'><span class='lg_name'>Hola" + " " + nombre +"</span></a>/<span id='cerrar-sesion'>Cerrar sesión</span></p>";
			if (photo) {
				lg_row+="<div id='lg-mobil' class='col-sm-12 col-xs-12' style='margin-top:-30px'>";
					lg_row+="<div class='container info_user_mobil'>";
						lg_row+="<a href='perfil.html'><img src='"+photo+"' style='max-width:70px; margin-left:-10px !important'> <p class='perfil-text-login-mobil' style='margin-left:60px'>Hola" + " " + nombre +"</p></a>";
					lg_row+="</div>";
				lg_row+="</div>";
			}
			else{
				lg_row+="<div id='lg-mobil' class='col-sm-12 col-xs-12' style='margin-top:-30px'>";
					lg_row+="<div class='container'>";
						lg_row+="<a href='perfil.html'><img src='img/ico_perfil3.png'> <p class='perfil-text-login-mobil'>Hola" + " " + nombre +"</p></a>";
					lg_row+="</div>";
				lg_row+="</div>";
			}
		}
		$("#sub-social-networks").html(html);

		menu_lg+= "<li id='li-lg'><span id='cerrar-sesion-perfil' class='txt_menu_mobil_resp'>&nbsp;Cerrar Sesión</span></li>";
		
		$("#lg_name").html(menu_lg);
		$( "header" ).after( lg_row );
	}
	else{
		menu_lg+= "<li id='li-lg'><span class='txt_menu_mobil_resp'>&nbsp;Iniciar Sesión</span></li>";
		
		$("#lg_name").html(menu_lg);
	}

	var url_perfil = window.location.href;
	var n = url_perfil.search("perfil.html");
	if (n>=0) {
		/**********************************/
		var edit_box = "";
		if (fbid_cond) {
			edit_box +="<div id='edita_perfil_box'>";
				edit_box +="<img id='cerrar_cuadro_edita' src='img/cerrar.png'  style='padding-right: 10px;padding-top: 10px;'>";
				edit_box +="<div id='img_perfil_edit'>";
					edit_box +="<div id='div_img_edita'>";
						edit_box +="<img id='img_edita' src='"+photo+"' class='img-circle'";
					edit_box +="</div>";
					edit_box +="<form id='form1' name='form1' method='post' enctype='multipart/form-data'>";
						edit_box +="<input id='uploadFile' placeholder='Choose File' disabled='disabled' />";

						edit_box +="<div class='fileUpload btn btn-primary'>";
							edit_box +="<span>Selecciona una imágen</span>";
							edit_box +="<input id='uploadBtn' type='file' class='upload' />";
						edit_box +="</div>";
						edit_box +="<br><br>";

						edit_box +="<div>";
							edit_box +="<p class='edit-title-form'>Nombre:</p>";
							edit_box +="<input type='text' class='input-form-edit' name='nombre' id='nombre' placeholder='Edita tu nombre'/>";
						edit_box +="</div>";
						edit_box +="<br>";

						edit_box +="<div style='margin-top: 20px'>";

							edit_box +="<input type='hidden' name='email' id='email' value=''>";
						edit_box +="</div>";

						edit_box +="<div id='btn-edit-save'>";
							edit_box +="<div class='fileUpload btn btn-primary'>";
								edit_box +="<span>Guardar</span>";
								edit_box +="<input type='submit' class='upload'/>";
							edit_box +="</div>";
						edit_box +="</div>";
					edit_box +="</form> ";
				edit_box +="</div>";
			edit_box +="</div>";
		} 
		else{
			edit_box +="<div id='edita_perfil_box'>";
				edit_box +="<img id='cerrar_cuadro_edita' src='img/cerrar.png'>";
				edit_box +="<div id='img_perfil_edit'>";
					edit_box +="<div id='div_img_edita'>";
						edit_box +="<img id='img_edita' src='"+photo+"' class='img-circle'>";
					edit_box +="</div>";
					edit_box +="<form id='form1' name='form1' method='post' enctype='multipart/form-data'>";
						edit_box +="<input id='uploadFile' placeholder='Choose File' disabled='disabled' />";

						edit_box +="<div class='fileUpload btn btn-primary'>";
							edit_box +="<span>Selecciona una imágen</span>";
							edit_box +="<input id='uploadBtn' type='file' class='upload' />";
						edit_box +="</div>";
						edit_box +="<br><br>";

						edit_box +="<div>";
							edit_box +="<p class='edit-title-form'>Nombre:</p>";
							edit_box +="<input type='text' class='input-form-edit' name='nombre' id='nombre' placeholder='Edita tu nombre'/>";
						edit_box +="</div>";
						edit_box +="<br>";

						edit_box +="<div>";
							edit_box +="<p class='edit-title-form'>Correo:</p>";
							edit_box +="<input type='text' name='email' id='email' class='input-form-edit' placeholder='Edita tu Correo'/>";
						edit_box +="</div>";

						edit_box +="<div class='password-edit'>";
							edit_box +="<a href='change_pass.html'><i>Cambiar Contraseña</i></a>";
						edit_box +="</div>";

						edit_box +="<div id='btn-edit-save'>";
							edit_box +="<div class='fileUpload btn btn-primary'>";
								edit_box +="<span>Guardar</span>";
								edit_box +="<input type='submit' class='upload'/>";
							edit_box +="</div>";
						edit_box +="</div>";
					edit_box +="</form> ";
				edit_box +="</div>";
			edit_box +="</div>";
		}

		$("#cuadro_editar_perfil").html(edit_box); 
		/**********************************/

		if (micookie2!="photo=NULL") {
			var igual2 = micookie2.indexOf("=");
			var photo = micookie2.substring(igual2+1);
			
			var html_img_perfil     = "";
			var html_img_perfil_mob = "";

			html_img_perfil_mob+="<img style='max-width:200px !important;margin-left:-15px' src='"+photo+"' class='img-circle'>";
			html_img_perfil+="<img style='max-width:200px !important' src='"+photo+"' class='img-circle'>";
			
			$("#perfil-left").html(html_img_perfil);
			$("#perfil-left-mob").html(html_img_perfil_mob);
		}
		else{
			html_mob="";
			html_mob+="<img style='max-width:200px !important' id='img_edita' src='img/perfil.jpg' class='img-circle'>";
			$("#div_img_edita").html(html_mob); 
		}

		html= "";
		html+="<h3>"+nombre+"</h3>";
		html+="<h4 id='muestra_edicion'>";
		html+="Editar perfil";
		html+="</h4>";
		
		$("#perfil-right").html(html);

		
		html_mob= "";
		html_mob+="<div class='row'>";
		html_mob+="<h3>"+nombre+"</h3>";
		html_mob+="</div>";
		html_mob+="<div class='row'>";
		html_mob+="<h4 id='muestra_edicion_mob'>";
		html_mob+="Editar perfil";
		html_mob+="</h4>";
		html_mob+="</div>";

		$("#perfil-right-mob").html(html_mob);

		document.getElementById("uploadBtn").onchange = function () {
		    document.getElementById("uploadFile").value = this.value;
		};
	};
}
function most_visited(){
	var top_visited1 = "";
	var top_visited2 = "";
	var top_visited3 = "";
	var band = 1;
	var tam1 = "mv-tam1";
	var tam2 = "mv-tam2";
	var tam3 = "mv-tam3";	

	$.ajax({
		type:"GET",
		dataType: "json",
		data: "",
		url: "https://fundacioncsapidevel.azurewebsites.net/api/statistics/mostvisited"
	})

	.done(function(data) {
		var info = data.Metrics;
		// console.log(info);
		for (var i = 1; i < 4; i++) {
			if ((info[i-1].PagePath.length == 1 || info[i-1].PagePath.indexOf("/index.html") > -1) && band==1){
				top_visited1+="<a href='index.html'><span class='mv-tam"+i+" mv-blue'>Home</span></a>";
				band = 0;
			}
			if (info[i-1].PagePath.indexOf("/noticias.php") > -1){
				top_visited1+="<a href='noticias.php'><span class='mv-tam"+i+" mv-blue'>Kiosko Científico</span></a>";
			}
			if (info[i-1].PagePath.indexOf("/practicas-clinicas") > -1){
				top_visited1+="<a href='practicas-clinicas.html'><span class='mv-tam"+i+" mv-blue'>Práctica Clínica</span></a>";
			}
			if (info[i-1].PagePath.indexOf("/actividad.html") > -1){
				top_visited1+="<a href='actividad.html'><span class='mv-tam"+i+" mv-blue'>Actividad Física</span></a>";
			}
			if (info[i-1].PagePath.indexOf("/calorico.html") > -1){
				top_visited1+="<a href='calorico.html'><span class='mv-tam"+i+" mv-blue'>Gasto Calórico</span></a>";
			}
			if (info[i-1].PagePath.indexOf("/imc.html") > -1){
				top_visited1+="<a href='imc.html'><span class='mv-tam"+i+" mv-blue'>Masa Corporal</span></a>";
			}

			if (info[i-1].PagePath.indexOf("?seccion=cronicas") > -1){
				top_visited1+="<a href='seccion-catalogo.html?seccion=cronicas'><span class='mv-tam"+i+" mv-blue'>Enfermedades Crónicas</span></a>";
			}

			if (info[i-1].PagePath.indexOf("vademecum.html") > -1){
				top_visited1+="<a href='vademecum.html'><span class='mv-tam"+i+" mv-blue'>Vademecum</span></a>";
			}

			if (info[i-1].PagePath.indexOf("?seccion=materna") > -1){
				top_visited1+="<a href='seccion-catalogo.html?seccion=materna'><span class='mv-tam"+i+" mv-blue'>Materno-Infantil</span></a>";
			}
			if (info[i-1].PagePath.indexOf("?seccion=ninez") > -1){
				top_visited1+="<a href='seccion-catalogo.html?seccion=ninez'><span class='mv-tam"+i+" mv-blue'>Niñez</span><a>";
			}
			if (info[i-1].PagePath.indexOf("?seccion=infecciosas") > -1){
				top_visited1+="<a href='seccion-catalogo.html?seccion=infecciosas'><span class='mv-tam"+i+" mv-blue'>Infecciones</span></a>";
			}

			if (info[i-1].PagePath.indexOf("/cardio.html") > -1){
				top_visited1+="<a href='cardio.html'><span class='mv-tam"+i+" mv-blue'>Cardiovascular</span></a>";
			}
			if (info[i-1].PagePath.indexOf("/renal.html") > -1){
				top_visited1+="<a href='renal.html'><span class='mv-tam"+i+" mv-blue'>Función Renal</span></a>";
			}
			if (info[i-1].PagePath.indexOf("/vacunacion.html") > -1){
				top_visited1+="<a href='vacunacion.html'><span class='mv-tam"+i+" mv-blue'>Vacunación</span></a>";
			}
		};

		for (var i = 1; i < 4; i++) {
			if (i==1) {
				if ((info[i+3].PagePath.length == 1 || info[i+3].PagePath.indexOf("/index.html") > -1) && band==1){
					top_visited2+="<a href='index.html'><span class='"+tam2+" mv-blue'>Home</span></a>";
					band = 0;
				}
				if (info[i+3].PagePath.indexOf("/noticias.php") > -1){
					top_visited2+="<a href='noticias.php'><span class='"+tam2+" mv-blue'>Kiosko Científico</span></a>";
				}

				if (info[i+3].PagePath.indexOf("?seccion=cronicas") > -1){
					top_visited2+="<a href='seccion-catalogo.html?seccion=cronicas'><span class='"+tam2+" mv-blue'>Enfermedades Crónicas</span></a>";
				}

				if (info[i+3].PagePath.indexOf("vademecum") > -1){
					top_visited2+="<a href='vademecum.html'><span class='"+tam2+" mv-blue'>Vademecum</span></a>";
				}

				if (info[i+3].PagePath.indexOf("?seccion=materna") > -1){
					top_visited2+="<a href='seccion-catalogo.html?seccion=materna'><span class='"+tam2+" mv-blue'>Materno-Infantil</span></a>";
				}
				if (info[i+3].PagePath.indexOf("?seccion=ninez") > -1){
					top_visited2+="<a href='seccion-catalogo.html?seccion=ninez'><span class='"+tam2+" mv-blue'>Niñez</span><a>";
				}
				if (info[i+3].PagePath.indexOf("?seccion=infecciosas") > -1){
					top_visited2+="<a href='seccion-catalogo.html?seccion=infecciosas'><span class='"+tam2+" mv-blue'>Infecciones</span></a>";
				}
				
				if (info[i+3].PagePath.indexOf("/practicas-clinicas") > -1){
					top_visited2+="<a href='practicas-clinicas.html'><span class='"+tam2+" mv-blue'>Práctica Clínica</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/actividad.html") > -1){
					top_visited2+="<a href='actividad.html'><span class='"+tam2+" mv-blue'>Actividad Física</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/calorico.html") > -1){
					top_visited2+="<a href='calorico.html'><span class='"+tam2+" mv-blue'>Gasto Calórico</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/imc.html") > -1){
					top_visited2+="<a href='imc.html'><span class='"+tam2+" mv-blue'>Masa Corporal</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/cardio.html") > -1){
					top_visited2+="<a href='cardio.html'><span class='"+tam2+" mv-blue'>Cardiovascular</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/renal.html") > -1){
					top_visited2+="<a href='renal.html'><span class='"+tam2+" mv-blue'>Función Renal</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/vacunacion.html") > -1){
					top_visited2+="<a href='vacunacion.html'><span class='"+tam2+" mv-blue'>Vacunación</span></a>";
				}
			};
			if (i==2) {
				if ((info[i+3].PagePath.length == 1 || info[i+3].PagePath.indexOf("/index.html") > -1) && band==1){
					top_visited2+="<a href='index.html'><span class='"+tam1+" mv-blue'>Home</span></a>";
					band = 0;
				}
				if (info[i+3].PagePath.indexOf("/noticias.php") > -1){
					top_visited2+="<a href='noticias.php'><span class='"+tam1+" mv-blue'>Kiosko Científico</span></a>";
				}
				if (info[i+3].PagePath.indexOf("?seccion=cronicas") > -1){
					top_visited2+="<a href='seccion-catalogo.html?seccion=cronicas'><span class='"+tam1+" mv-blue'>Enfermedades Crónicas</span></a>";
				}
				if (info[i+3].PagePath.indexOf("vademecum") > -1){
					top_visited2+="<a href='vademecum.html'><span class='"+tam1+" mv-blue'>Vademecum</span></a>";
				}
				if (info[i+3].PagePath.indexOf("?seccion=materna") > -1){
					top_visited2+="<a href='seccion-catalogo.html?seccion=materna'><span class='"+tam1+" mv-blue'>Materno-Infantil</span></a>";
				}
				if (info[i+3].PagePath.indexOf("?seccion=ninez") > -1){
					top_visited2+="<a href='seccion-catalogo.html?seccion=ninez'><span class='"+tam1+" mv-blue'>Niñez</span><a>";
				}
				if (info[i+3].PagePath.indexOf("?seccion=infecciosas") > -1){
					top_visited2+="<a href='seccion-catalogo.html?seccion=infecciosas'><span class='"+tam1+" mv-blue'>Infecciones</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/practicas-clinicas") > -1){
					top_visited2+="<a href='practicas-clinicas.html'><span class='"+tam1+" mv-blue'>Práctica Clínica</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/actividad.html") > -1){
					top_visited2+="<a href='actividad.html'><span class='"+tam1+" mv-blue'>Actividad Física</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/calorico.html") > -1){
					top_visited2+="<a href='calorico.html'><span class='"+tam1+" mv-blue'>Gasto Calórico</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/imc.html") > -1){
					top_visited2+="<a href='imc.html'><span class='"+tam1+" mv-blue'>Masa Corporal</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/cardio.html") > -1){
					top_visited2+="<a href='cardio.html'><span class='"+tam1+" mv-blue'>Cardiovascular</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/renal.html") > -1){
					top_visited2+="<a href='renal.html'><span class='"+tam1+" mv-blue'>Función Renal</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/vacunacion.html") > -1){
					top_visited2+="<a href='vacunacion.html'><span class='"+tam1+" mv-blue'>Vacunación</span></a>";
				}
			};
			if (i==3) {
				if ((info[i+3].PagePath.length == 1 || info[i+3].PagePath.indexOf("/index.html") > -1) && band==1){
					top_visited2+="<a href='index.html'><span class='"+tam3+" mv-blue'>Home</span></a>";
					band = 0;
				}
				if (info[i+3].PagePath.indexOf("/noticias.php") > -1){
					top_visited2+="<a href='noticias.php'><span class='"+tam3+" mv-blue'>Kiosko Científico</span></a>";
				}
				if (info[i+3].PagePath.indexOf("vademecum") > -1){
					top_visited2+="<a href='vademecum.html'><span class='"+tam3+" mv-blue'>Vademecum</span></a>";
				}
				if (info[i+3].PagePath.indexOf("?seccion=cronicas") > -1){
					top_visited2+="<a href='seccion-catalogo.html?seccion=cronicas'><span class='"+tam3+" mv-blue'>Enfermedades Crónicas</span></a>";
				}
				if (info[i+3].PagePath.indexOf("?seccion=materna") > -1){
					top_visited2+="<a href='seccion-catalogo.html?seccion=materna'><span class='"+tam3+" mv-blue'>Materno-Infantil</span></a>";
				}
				if (info[i+3].PagePath.indexOf("?seccion=ninez") > -1){
					top_visited2+="<a href='seccion-catalogo.html?seccion=ninez'><span class='"+tam3+" mv-blue'>Niñez</span><a>";
				}
				if (info[i+3].PagePath.indexOf("?seccion=infecciosas") > -1){
					top_visited2+="<a href='seccion-catalogo.html?seccion=infecciosas'><span class='"+tam3+" mv-blue'>Infecciones</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/practicas-clinicas") > -1){
					top_visited2+="<a href='practicas-clinicas.html'><span class='"+tam3+" mv-blue'>Práctica Clínica</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/actividad.html") > -1){
					top_visited2+="<a href='actividad.html'><span class='"+tam3+" mv-blue'>Actividad Física</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/calorico.html") > -1){
					top_visited2+="<a href='calorico.html'><span class='"+tam3+" mv-blue'>Gasto Calórico</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/imc.html") > -1){
					top_visited2+="<a href='imc.html'><span class='"+tam3+" mv-blue'>Masa Corporal</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/cardio.html") > -1){
					top_visited2+="<a href='cardio.html'><span class='"+tam3+" mv-blue'>Cardiovascular</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/renal.html") > -1){
					top_visited2+="<a href='renal.html'><span class='"+tam3+" mv-blue'>Función Renal</span></a>";
				}
				if (info[i+3].PagePath.indexOf("/vacunacion.html") > -1){
					top_visited2+="<a href='vacunacion.html'><span class='"+tam3+" mv-blue'>Vacunación</span></a>";
				}
			};
		};

		for (var i = 1; i < 4; i++) {
			if (i==3) {
				if ((info[i+6].PagePath.length == 1 || info[i+6].PagePath.indexOf("/index.html") > -1) && band==1){
					top_visited3+="<a href='index.html'><span class='"+tam2+" mv-blue'>Home</span></a>";
					band = 0;
				}
				if (info[i+6].PagePath.indexOf("/noticias.php") > -1){
					top_visited3+="<a href='noticias.php'><span class='"+tam2+" mv-blue'>Kiosko Científico</span></a>";
				}
				if (info[i+6].PagePath.indexOf("?seccion=cronicas") > -1){
					top_visited3+="<a href='seccion-catalogo.html?seccion=cronicas'><span class='"+tam2+" mv-blue'>Enfermedades Crónicas</span></a>";
				}
				if (info[i+6].PagePath.indexOf("vademecum") > -1){
					top_visited3+="<a href='vademecum.html'><span class='"+tam2+" mv-blue'>Vademecum</span></a>";
				}
				if (info[i+6].PagePath.indexOf("?seccion=materna") > -1){
					top_visited3+="<a href='seccion-catalogo.html?seccion=materna'><span class='"+tam2+" mv-blue'>Materno-Infantil</span></a>";
				}
				if (info[i+6].PagePath.indexOf("?seccion=ninez") > -1){
					top_visited3+="<a href='seccion-catalogo.html?seccion=ninez'><span class='"+tam2+" mv-blue'>Niñez</span><a>";
				}
				if (info[i+6].PagePath.indexOf("?seccion=infecciosas") > -1){
					top_visited3+="<a href='seccion-catalogo.html?seccion=infecciosas'><span class='"+tam2+" mv-blue'>Infecciones</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/practicas-clinicas") > -1){
					top_visited3+="<a href='practicas-clinicas.html'><span class='"+tam2+" mv-blue'>Práctica Clínica</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/actividad.html") > -1){
					top_visited3+="<a href='actividad.html'><span class='"+tam2+" mv-blue'>Actividad Física</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/calorico.html") > -1){
					top_visited3+="<a href='calorico.html'><span class='"+tam2+" mv-blue'>Gasto Calórico</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/imc.html") > -1){
					top_visited3+="<a href='imc.html'><span class='"+tam2+" mv-blue'>Masa Corporal</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/cardio.html") > -1){
					top_visited3+="<a href='cardio.html'><span class='"+tam2+" mv-blue'>Cardiovascular</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/renal.html") > -1){
					top_visited3+="<a href='renal.html'><span class='"+tam2+" mv-blue'>Función Renal</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/vacunacion.html") > -1){
					top_visited3+="<a href='vacunacion.html'><span class='"+tam2+" mv-blue'>Vacunación</span></a>";
				}
			};
			if (i==1) {
				if ((info[i+6].PagePath.length == 1 || info[i+6].PagePath.indexOf("/index.html") > -1) && band==1){
					top_visited3+="<a href='index.html'><span class='"+tam1+" mv-blue'>Home</span></a>";
					band = 0;
				}
				if (info[i+6].PagePath.indexOf("?seccion=cronicas") > -1){
					top_visited3+="<a href='seccion-catalogo.html?seccion=cronicas'><span class='"+tam1+" mv-blue'>Enfermedades Crónicas</span></a>";
				}
				if (info[i+6].PagePath.indexOf("vademecum") > -1){
					top_visited3+="<a href='vademecum.html'><span class='"+tam1+" mv-blue'>Vademecum</span></a>";
				}
				if (info[i+6].PagePath.indexOf("?seccion=materna") > -1){
					top_visited3+="<a href='seccion-catalogo.html?seccion=materna'><span class='"+tam1+" mv-blue'>Materno-Infantil</span></a>";
				}
				if (info[i+6].PagePath.indexOf("?seccion=ninez") > -1){
					top_visited3+="<a href='seccion-catalogo.html?seccion=ninez'><span class='"+tam1+" mv-blue'>Niñez</span><a>";
				}
				if (info[i+6].PagePath.indexOf("?seccion=infecciosas") > -1){
					top_visited3+="<a href='seccion-catalogo.html?seccion=infecciosas'><span class='"+tam1+" mv-blue'>Infecciones</span></a>";
				}

				if (info[i+6].PagePath.indexOf("/noticias.php") > -1){
					top_visited3+="<a href='noticias.php'><span class='"+tam1+" mv-blue'>Kiosko Científico</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/practicas-clinicas") > -1){
					top_visited3+="<a href='practicas-clinicas.html'><span class='"+tam1+" mv-blue'>Práctica Clínica</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/actividad.html") > -1){
					top_visited3+="<a href='actividad.html'><span class='"+tam1+" mv-blue'>Actividad Física</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/calorico.html") > -1){
					top_visited3+="<a href='calorico.html'><span class='"+tam1+" mv-blue'>Gasto Calórico</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/imc.html") > -1){
					top_visited3+="<a href='imc.html'><span class='"+tam1+" mv-blue'>Masa Corporal</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/cardio.html") > -1){
					top_visited3+="<a href='cardio.html'><span class='"+tam1+" mv-blue'>Cardiovascular</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/renal.html") > -1){
					top_visited3+="<a href='renal.html'><span class='"+tam1+" mv-blue'>Función Renal</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/vacunacion.html") > -1){
					top_visited3+="<a href='vacunacion.html'><span class='"+tam1+" mv-blue'>Vacunación</span></a>";
				}
			};
			if (i==2) {
				if ((info[i+6].PagePath.length == 1 || info[i+6].PagePath.indexOf("/index.html") > -1) && band==1){
					top_visited3+="<a href='index.html'><span class='"+tam3+" mv-blue'>Home</span></a>";
					band = 0;
				}
				if (info[i+6].PagePath.indexOf("/noticias.php") > -1){
					top_visited3+="<a href='noticias.php'><span class='"+tam3+" mv-blue'>Kiosko Científico</span></a>";
				}
				if (info[i+6].PagePath.indexOf("?seccion=cronicas") > -1){
					top_visited3+="<a href='seccion-catalogo.html?seccion=cronicas'><span class='"+tam3+" mv-blue'>Enfermedades Crónicas</span></a>";
				}
				if (info[i+6].PagePath.indexOf("vademecum") > -1){
					top_visited3+="<a href='vademecum.html'><span class='"+tam3+" mv-blue'>Vademecum</span></a>";
				}
				if (info[i+6].PagePath.indexOf("?seccion=materna") > -1){
					top_visited3+="<a href='seccion-catalogo.html?seccion=materna'><span class='"+tam3+" mv-blue'>Materno-Infantil</span></a>";
				}
				if (info[i+6].PagePath.indexOf("?seccion=ninez") > -1){
					top_visited3+="<a href='seccion-catalogo.html?seccion=ninez'><span class='"+tam3+" mv-blue'>Niñez</span><a>";
				}
				if (info[i+6].PagePath.indexOf("?seccion=infecciosas") > -1){
					top_visited3+="<a href='seccion-catalogo.html?seccion=infecciosas'><span class='"+tam3+" mv-blue'>Infecciones</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/practicas-clinicas") > -1){
					top_visited3+="<a href='practicas-clinicas.html'><span class='"+tam3+" mv-blue'>Práctica Clínica</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/actividad.html") > -1){
					top_visited3+="<a href='actividad.html'><span class='"+tam3+" mv-blue'>Actividad Física</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/calorico.html") > -1){
					top_visited3+="<a href='calorico.html'><span class='"+tam3+" mv-blue'>Gasto Calórico</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/imc.html") > -1){
					top_visited3+="<a href='imc.html'><span class='"+tam3+" mv-blue'>Masa Corporal</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/cardio.html") > -1){
					top_visited3+="<a href='cardio.html'><span class='"+tam3+" mv-blue'>Cardiovascular</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/renal.html") > -1){
					top_visited3+="<a href='renal.html'><span class='"+tam3+" mv-blue'>Función Renal</span></a>";
				}
				if (info[i+6].PagePath.indexOf("/vacunacion.html") > -1){
					top_visited3+="<a href='vacunacion.html'><span class='"+tam3+" mv-blue'>Vacunación</span></a>";
				}
			};
		};
    	
    	$("#mv-txt1").html(top_visited1);
    	$("#mv-txt2").html(top_visited2);
    	$("#mv-txt3").html(top_visited3);
		    
	});
}
function prueba() {
	FB.logout(function(response) {
        // Person is now logged out
    });
    document.cookie = "access=novalido;";
	document.cookie = "token=NULL;";
	document.cookie = "username=NULL;";
	document.cookie = "nombre=NULL;";
	document.cookie = "photo=NULL;";
	window.location = "index.html";
}
function mob_search(){
	header_tag = "";
	header_tag+="<div id='top-blue-line'></div>";
	header_tag+="<div class='col-md-11 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-11 col-xs-offset-1'>";
        header_tag+="<form action='consulta.php' method='GET' id='form-id' style='margin-top: 7px !important; width:85%'>";
      		header_tag+="<img src='img/cerrar.png' onclick='header_show()' style='float:right; margin-top: 5px;margin-left:20px'>";
          	header_tag+="<div class='input-group'>";
				header_tag+="<input type='text' name='word' style='width:100% !important' class='form-control' placeholder='Diabetes, Hipertensión, Obesidad, etc.' aria-describedby='basic-addon2'>";
				header_tag+="<span class='input-group-addon' id='basic-addon2'><span class='glyphicon glyphicon-search' aria-hidden='true'></span></span>";
          	header_tag+="</div>";
      		header_tag+="<input type='submit' value='Submit' style='position:relative;float:right;margin-right: 45px; margin-top:-30px;width:40px;opacity:0'>";
        header_tag+="</form>";
  	header_tag+="</div> ";
  	$("header").html(header_tag);
}
function header_show(){
	header_tag = "";
	header_tag+="<div id='top-blue-line'></div>";
	header_tag+="<div class='container'>";
		header_tag+="<div class='row'>";
			header_tag+="<div class='col-sm-12 col-xs-12'>";
				header_tag+="<div id='logo'><img src='img/logo.png' style='max-height:40px;'></div>";
				header_tag+="<div id='portal-name'><i>Portafolio Digital</i></div>";
				header_tag+="<div id='social-networks'>";
					header_tag+="<div id='barra-buscador-nav' class='col-md-4 col-sm-9 col-xs-9' style='display:none;'>";
		                header_tag+="<form action='consulta.php' method='GET' id='form-id'>";
		                  	header_tag+="<div class='input-group'>";
								header_tag+="<input type='text' name='word' id='busca-nav' class='form-control' placeholder='Diabetes, Hipertensión, Obesidad, etc.' aria-describedby='basic-addon2'>";
								header_tag+="<span class='input-group-addon' id='basic-addon2'><span class='glyphicon glyphicon-search' aria-hidden='true'></span></span>";
		                  	header_tag+="</div>";
		                header_tag+="</form>";
	              	header_tag+="</div> ";
	              	header_tag+="<div id='sub-social-networks' style='width:103%;'>";
						header_tag+="<a href='https://twitter.com/Fund_CarlosSlim' target='_blank'><div id='sn-tw' class='sn-ind'></div></a>";
						header_tag+="<a href='https://www.facebook.com/FundacionCarlosSlim' target='_blank'><div id='sn-fb' class='sn-ind'></div></a>";
						header_tag+="<div id='sn-lgin' class='sn-ind'></div>";
	              	header_tag+="</div>";
	            header_tag+="</div>";
				header_tag+="<div id='btn-menu-mob' onclick='menu_mob_sow()'>";
					header_tag+="<img src='img/menu.png' class='menu-img'>";
				header_tag+="</div>";
				header_tag+="<div id='btn-search-mob'>";
					header_tag+="<img src='img/search-icon.png' onclick='mob_search()' class='search-img'>";
				header_tag+="</div>";
			header_tag+="</div>";
		header_tag+="</div>";
	header_tag+="</div>";
	$("header").html(header_tag);
}
function enterImgFb(){
	document.getElementById("icon_fb").src = "img/ico_facebook_over.png";
}
function outImgFb(){
	document.getElementById("icon_fb").src = "img/ico_facebook.png";
}
function enterImgTwt(){
	document.getElementById("icon_twt").src = "img/ico_twitter_over.png";
}
function outImgTwt(){
	document.getElementById("icon_twt").src = "img/ico_twitter.png";
}
function busqueda_pdf(){
	var params_not="";
	var arr_cronicas_busqueda = [];
	var arr_materno_busqueda = [];
	var arr_ninez_busqueda = [];
	var arr_infecciosas_busqueda = [];
	var urlpar_not=window.location.search.substr(1);
	var vals=new Array();

	if(urlpar_not){
		params_not=urlpar_not.split('&');
		for(i=0;i<params_not.length;i++){
			aux=params_not[i].split('=');
			vals[i]=decodeURIComponent(aux[1]);
		}
	}
	var url_search = vals[0].replace("+"," ");
	var url_search_lower = url_search.toLowerCase();

	var actividad = url_search_lower.search("física");
	var calorico = url_search_lower.search("calórico");
	var imc = url_search_lower.search("masa");
	var cardio = url_search_lower.search("cardiovascular");
	var renal = url_search_lower.search("renal");
	var calculadoras = url_search_lower.search("calculadoras");

	if (actividad >=0) {
		document.getElementById('actividad').style.display = "block";
		document.getElementById('calorico').style.display = "none";
		document.getElementById('imc').style.display = "none";
		document.getElementById('cardio').style.display = "none";
		document.getElementById('renal').style.display = "none";
	};
	if (calorico >=0) {
		document.getElementById('actividad').style.display = "none";
		document.getElementById('calorico').style.display = "block";
		document.getElementById('imc').style.display = "none";
		document.getElementById('cardio').style.display = "none";
		document.getElementById('renal').style.display = "none";
	};
	if (imc >=0) {
		document.getElementById('actividad').style.display = "none";
		document.getElementById('calorico').style.display = "none";
		document.getElementById('imc').style.display = "block";
		document.getElementById('cardio').style.display = "none";
		document.getElementById('renal').style.display = "none";
	};
	if (cardio >=0) {
		document.getElementById('actividad').style.display = "none";
		document.getElementById('calorico').style.display = "none";
		document.getElementById('imc').style.display = "none";
		document.getElementById('cardio').style.display = "block";
		document.getElementById('renal').style.display = "none";
	};
	if (renal >=0) {
		document.getElementById('actividad').style.display = "none";
		document.getElementById('calorico').style.display = "none";
		document.getElementById('imc').style.display = "none";
		document.getElementById('cardio').style.display = "none";
		document.getElementById('renal').style.display = "block";
	};
	if (calculadoras >=0) {
		document.getElementById('actividad').style.display = "block";
		document.getElementById('calorico').style.display = "block";
		document.getElementById('imc').style.display = "block";
		document.getElementById('cardio').style.display = "block";
		document.getElementById('renal').style.display = "block";
	};

	if (actividad < 0 && calorico < 0 && imc < 0 && cardio < 0 && renal < 0 && calculadoras < 0) {
		document.getElementById('calculadoras').style.display = "none";
	};

	
	var params={
  		word:url_search,
		page:"1",
		pagesize:"100"
	};
	$.ajax({
		type:"GET",
		dataType: "json",
		data: params,
		url: "https://fundacioncsapidevel.azurewebsites.net/api/pdf/search"
	})
	.done(function(data) {
		var info = data.Data;
		var total = data.Total;
		html_cronicas="";
		html_materno="";
		html_ninez="";
		html_infecciosas="";

		html_cronicas_mob="";
		html_materno_mob="";
		html_ninez_mob="";
		html_infecciosas_mob="";

		if (info.length==0) {
			document.getElementById('practica_clinica').style.display = "none";
		};
		for (var i = 0; i < info.length; i++) {
			if (info[i].CategoryID==1) {
				arr_cronicas_busqueda.push(info[i]);
			}
			if (info[i].CategoryID==2) {
				arr_materno_busqueda.push(info[i]);
			}
			if (info[i].CategoryID==3) {
				arr_ninez_busqueda.push(info[i]);
			}
			if (info[i].CategoryID==4) {
				arr_infecciosas_busqueda.push(info[i]);
			}
		};
		/**********************************/
		var k = 4;
		var l = 8;
		var y = (arr_cronicas_busqueda.length+1) % 4;
		var z = Math.floor(arr_cronicas_busqueda.length/4);
		if (y != 0) {
			z++;
		};
		for(i=1;i<2;i++){
			html_cronicas+= "<div class='item active'>";
			for (var j = 0; j < arr_cronicas_busqueda.length; j++) {
				if ((j+1) > 4) {
					break;
				};
				try{
					html_cronicas+="<div class='pdf-prev'>";
					html_cronicas+="<div style='background-image:url("+arr_cronicas_busqueda[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
					html_cronicas+="<a href='vista.php?url_pdf="+arr_cronicas_busqueda[j].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_cronicas_busqueda[j].Category.Description+"/"+arr_cronicas_busqueda[j].Description+"/"+arr_cronicas_busqueda[j].Name+"&nombre="+arr_cronicas_busqueda[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
					html_cronicas+="<p class='pdf-para'>"+arr_cronicas_busqueda[j].Name+"</p>";
					html_cronicas+="</div>";
				}catch(err){
					console.log(err.message);
				}
			};
			html_cronicas+="</div>";
		}
		for(i=1;i<(z-1);i++){
			html_cronicas+= "<div class='item'>";
			for (j = k; j < l; j++) {
				try{
					html_cronicas+="<div class='pdf-prev'>";
					html_cronicas+="<div style='background-image:url("+arr_cronicas_busqueda[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
					html_cronicas+="<a href='vista.php?url_pdf="+arr_cronicas_busqueda[j].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_cronicas_busqueda[j].Category.Description+"/"+arr_cronicas_busqueda[j].Description+"/"+arr_cronicas_busqueda[j].Name+"&nombre="+arr_cronicas_busqueda[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
					html_cronicas+="<p class='pdf-para'>"+arr_cronicas_busqueda[j].Name+"</p>";
					html_cronicas+="</div>";
				}catch(err){
					console.log(err.message);
				}
			};
			k= k+4;
			l= l+4;
			html_cronicas+="</div>";
		}
		for(i=(z-1); i < z ;i++){
			html_cronicas+= "<div class='item'>";
			for (j = k; j < (l-2); j++) {
				try{
					html_cronicas+="<div class='pdf-prev'>";
					html_cronicas+="<div style='background-image:url("+arr_cronicas_busqueda[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
					html_cronicas+="<a href='vista.php?url_pdf="+arr_cronicas_busqueda[j].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_cronicas_busqueda[j].Category.Description+"/"+arr_cronicas_busqueda[j].Description+"/"+arr_cronicas_busqueda[j].Name+"&nombre="+arr_cronicas_busqueda[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
					html_cronicas+="<p class='pdf-para'>"+arr_cronicas_busqueda[j].Name+"</p>";
					html_cronicas+="</div>";
				}catch(err){
					console.log(err.message);
				}
			};
			html_cronicas+="</div>";
		}

		if ($(window).width()<1000) {
			for (var i = 0; i < arr_cronicas_busqueda.length; i++) {
				html_cronicas_mob+="<div class='pdf-prev-search'>";
		            html_cronicas_mob+="<div style='background-image:url("+arr_cronicas_busqueda[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-search'></div>";
		            html_cronicas_mob+="<a href='vista.php?url_pdf="+arr_cronicas_busqueda[i].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_cronicas_busqueda[i].Category.Description+"/"+arr_cronicas_busqueda[i].Description+"/"+arr_cronicas_busqueda[i].Name+"&nombre="+arr_cronicas_busqueda[i].Name+"' target='_blank'><button class='btn btn-consulta-pdf-search' style='background-color: red;'>Consultar</button></a>";
		            html_cronicas_mob+="<p class='pdf-para-search'>"+arr_cronicas_busqueda[i].Name+"</p>";
	      		html_cronicas_mob+="</div>";
			};
		};

		$("#cronicas-cont").html(html_cronicas);
		$("#section-cronicas-search").html(html_cronicas_mob);
		var k = 4;
		var l = 8;
		var y = (arr_materno_busqueda.length+1) % 4;
		var z = Math.floor(arr_materno_busqueda.length/4);
		if (y != 0) {
			z++;
		};
		for(i=1;i<2;i++){
			html_materno+= "<div class='item active'>";
			for (var j = 0; j < arr_materno_busqueda.length; j++) {
				if ((j+1) > 4) {
					break;
				};
				try{
					html_materno+="<div class='pdf-prev'>";
					html_materno+="<div style='background-image:url("+arr_materno_busqueda[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
					html_materno+="<a href='vista.php?url_pdf="+arr_materno_busqueda[j].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_materno_busqueda[j].Category.Description+"/"+arr_materno_busqueda[j].Description+"/"+arr_materno_busqueda[j].Name+"&nombre="+arr_materno_busqueda[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
					html_materno+="<p class='pdf-para'>"+arr_materno_busqueda[j].Name+"</p>";
					html_materno+="</div>";
				}catch(err){
					console.log(err.message);
				}
			};
			html_materno+="</div>";
		}
		for(i=1;i<(z-1);i++){
			html_materno+= "<div class='item'>";
			for (j = k; j < l; j++) {
				try{
					html_materno+="<div class='pdf-prev'>";
					html_materno+="<div style='background-image:url("+arr_materno_busqueda[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
					html_materno+="<a href='vista.php?url_pdf="+arr_materno_busqueda[j].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_materno_busqueda[j].Category.Description+"/"+arr_materno_busqueda[j].Description+"/"+arr_materno_busqueda[j].Name+"&nombre="+arr_materno_busqueda[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
					html_materno+="<p class='pdf-para'>"+arr_materno_busqueda[j].Name+"</p>";
					html_materno+="</div>";
				}catch(err){
					console.log(err.message);
				}
			};
			k= k+4;
			l= l+4;
			html_materno+="</div>";
		}
		for(i=(z-1); i < z ;i++){
			html_materno+= "<div class='item'>";
			for (j = k; j < (l-2); j++) {
				try{
					html_materno+="<div class='pdf-prev'>";
					html_materno+="<div style='background-image:url("+arr_materno_busqueda[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
					html_materno+="<a href='vista.php?url_pdf="+arr_materno_busqueda[j].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_materno_busqueda[j].Category.Description+"/"+arr_materno_busqueda[j].Description+"/"+arr_materno_busqueda[j].Name+"&nombre="+arr_materno_busqueda[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
					html_materno+="<p class='pdf-para'>"+arr_materno_busqueda[j].Name+"</p>";
					html_materno+="</div>";
				}catch(err){
					console.log(err.message);
				}
			};
			html_materno+="</div>";
		}
		if ($(window).width()<1000) {
			for (var i = 0; i < arr_materno_busqueda.length; i++) {
				html_materno_mob+="<div class='pdf-prev-search'>";
		            html_materno_mob+="<div style='background-image:url("+arr_materno_busqueda[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-search'></div>";
		            html_materno_mob+="<a href='vista.php?url_pdf="+arr_materno_busqueda[i].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_materno_busqueda[i].Category.Description+"/"+arr_materno_busqueda[i].Description+"/"+arr_materno_busqueda[i].Name+"&nombre="+arr_materno_busqueda[i].Name+"' target='_blank'><button class='btn btn-consulta-pdf-search' style='background-color: #f80084;'>Consultar</button></a>";
		            html_materno_mob+="<p class='pdf-para-search'>"+arr_materno_busqueda[i].Name+"</p>";
	      		html_materno_mob+="</div>";
			};
		};
		$("#section-materna-search").html(html_materno_mob);
		$("#materno-cont").html(html_materno);
		var k = 4;
		var l = 8;
		var y = (arr_ninez_busqueda.length+1) % 4;
		var z = Math.floor(arr_ninez_busqueda.length/4);
		if (y != 0) {
			z++;
		};
		for(i=1;i<2;i++){
			html_ninez += "<div class='item active'>";
			for (var j = 0; j < arr_ninez_busqueda.length; j++) {
				if ((j+1) > 4) {
					break;
				};
				try{
					html_ninez+="<div class='pdf-prev'>";
					html_ninez+="<div style='background-image:url("+arr_ninez_busqueda[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
					html_ninez+="<a href='vista.php?url_pdf="+arr_ninez_busqueda[j].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_ninez_busqueda[j].Category.Description+"/"+arr_ninez_busqueda[j].Description+"/"+arr_ninez_busqueda[j].Name+"&nombre="+arr_ninez_busqueda[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
					html_ninez+="<p class='pdf-para'>"+arr_ninez_busqueda[j].Name+"</p>";
					html_ninez+="</div>";
				}catch(err){
					console.log(err.message);
				}
			};
			html_ninez+="</div>";
		}
		for(i=1;i<(z-1);i++){
			html_ninez += "<div class='item'>";
			for (j = k; j < l; j++) {
				try{
					html_ninez+="<div class='pdf-prev'>";
					html_ninez+="<div style='background-image:url("+arr_ninez_busqueda[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
					html_ninez+="<a href='vista.php?url_pdf="+arr_ninez_busqueda[j].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_ninez_busqueda[j].Category.Description+"/"+arr_ninez_busqueda[j].Description+"/"+arr_ninez_busqueda[j].Name+"&nombre="+arr_ninez_busqueda[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
					html_ninez+="<p class='pdf-para'>"+arr_ninez_busqueda[j].Name+"</p>";
					html_ninez+="</div>";
				}catch(err){
					console.log(err.message);
				}
			};
			k= k+4;
			l= l+4;
			html_ninez+="</div>";
		}
		for(i=(z-1); i < z ;i++){
			html_ninez += "<div class='item'>";
			for (j = k; j < (l-2); j++) {
				try{
					html_ninez+="<div class='pdf-prev'>";
					html_ninez+="<div style='background-image:url("+arr_ninez_busqueda[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
					html_ninez+="<a href='vista.php?url_pdf="+arr_ninez_busqueda[j].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_ninez_busqueda[j].Category.Description+"/"+arr_ninez_busqueda[j].Description+"/"+arr_ninez_busqueda[j].Name+"&nombre="+arr_ninez_busqueda[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
					html_ninez+="<p class='pdf-para'>"+arr_ninez_busqueda[j].Name+"</p>";
					html_ninez+="</div>";
				}catch(err){
					console.log(err.message);
				}
			};
			html_ninez+="</div>";
		}
		if ($(window).width()<1000) {
			for (var i = 0; i < arr_ninez_busqueda.length; i++) {
				html_ninez_mob+="<div class='pdf-prev-search'>";
		            html_ninez_mob+="<div style='background-image:url("+arr_ninez_busqueda[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-search'></div>";
		            html_ninez_mob+="<a href='vista.php?url_pdf="+arr_ninez_busqueda[i].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_ninez_busqueda[i].Category.Description+"/"+arr_ninez_busqueda[i].Description+"/"+arr_ninez_busqueda[i].Name+"&nombre="+arr_ninez_busqueda[i].Name+"' target='_blank'><button class='btn btn-consulta-pdf-search' style='background-color: #ff7f00;'>Consultar</button></a>";
		            html_ninez_mob+="<p class='pdf-para-search'>"+arr_ninez_busqueda[i].Name+"</p>";
	      		html_ninez_mob+="</div>";
			};
		};
		$("#section-ninez-search").html(html_ninez_mob);
		$("#ninez-cont").html(html_ninez);
		var k = 4;
		var l = 8;
		var y = (arr_infecciosas_busqueda.length+1) % 4;
		var z = Math.floor(arr_infecciosas_busqueda.length/4);
		if (y != 0) {
			z++;
		};
		for(i=1;i<2;i++){
			html_infecciosas += "<div class='item active'>";
			for (var j = 0; j < arr_infecciosas_busqueda.length; j++) {
				if ((j+1) > 4) {
					break;
				};
				try{
					html_infecciosas+="<div class='pdf-prev'>";
					html_infecciosas+="<div style='background-image:url("+arr_infecciosas_busqueda[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
					html_infecciosas+="<a href='vista.php?url_pdf="+arr_infecciosas_busqueda[j].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_infecciosas_busqueda[j].Category.Description+"/"+arr_infecciosas_busqueda[j].Description+"/"+arr_infecciosas_busqueda[j].Name+"&nombre="+arr_infecciosas_busqueda[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
					html_infecciosas+="<p class='pdf-para'>"+arr_infecciosas_busqueda[j].Name+"</p>";
					html_infecciosas+="</div>";
				}catch(err){
					console.log(err.message);
				}
			};
			html_infecciosas+="</div>";
		}
		for(i=1;i<(z-1);i++){
			html_infecciosas += "<div class='item'>";
			for (j = k; j < l; j++) {
				try{
					html_infecciosas+="<div class='pdf-prev'>";
					html_infecciosas+="<div style='background-image:url("+arr_infecciosas_busqueda[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
					html_infecciosas+="<a href='vista.php?url_pdf="+arr_infecciosas_busqueda[j].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_infecciosas_busqueda[j].Category.Description+"/"+arr_infecciosas_busqueda[j].Description+"/"+arr_infecciosas_busqueda[j].Name+"&nombre="+arr_infecciosas_busqueda[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
					html_infecciosas+="<p class='pdf-para'>"+arr_infecciosas_busqueda[j].Name+"</p>";
					html_infecciosas+="</div>";
				}catch(err){
					console.log(err.message);
				}
			};
			k= k+4;
			l= l+4;
			html_infecciosas+="</div>";
		}
		for(i=(z-1); i < z ;i++){
			html_infecciosas += "<div class='item'>";
			for (j = k; j < (l-2); j++) {
				try{
					html_infecciosas+="<div class='pdf-prev'>";
					html_infecciosas+="<div style='background-image:url("+arr_infecciosas_busqueda[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
					html_infecciosas+="<a href='vista.php?url_pdf="+arr_infecciosas_busqueda[j].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_infecciosas_busqueda[j].Category.Description+"/"+arr_infecciosas_busqueda[j].Description+"/"+arr_infecciosas_busqueda[j].Name+"&nombre="+arr_infecciosas_busqueda[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
					html_infecciosas+="<p class='pdf-para'>"+arr_infecciosas_busqueda[j].Name+"</p>";
					html_infecciosas+="</div>";
				}catch(err){
					console.log(err.message);
				}
			};
			html_infecciosas+="</div>";
		}
		if ($(window).width()<1000) {
			for (var i = 0; i < arr_infecciosas_busqueda.length; i++) {
				html_infecciosas_mob+="<div class='pdf-prev-search'>";
		            html_infecciosas_mob+="<div style='background-image:url("+arr_infecciosas_busqueda[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-search'></div>";
		            html_infecciosas_mob+="<a href='vista.php?url_pdf="+arr_infecciosas_busqueda[i].MediaObject[1].PDFMediaObject.URL+"&url_fav="+arr_infecciosas_busqueda[i].Category.Description+"/"+arr_infecciosas_busqueda[i].Description+"/"+arr_infecciosas_busqueda[i].Name+"&nombre="+arr_infecciosas_busqueda[i].Name+"' target='_blank'><button class='btn btn-consulta-pdf-search' style='background-color: #0090d7;'>Consultar</button></a>";
		            html_infecciosas_mob+="<p class='pdf-para-search'>"+arr_infecciosas_busqueda[i].Name+"</p>";
	      		html_infecciosas_mob+="</div>";
			};
		};
		$("#section-infecciosas-search").html(html_infecciosas_mob);
		$("#infeccionsas-cont").html(html_infecciosas);
		/**********************************/
		if (arr_cronicas_busqueda.length >=1) {
			document.getElementById('section-cronicas').style.display = "block";
		};
		if (arr_materno_busqueda.length >=1) {
			document.getElementById('section-materna').style.display = "block";
		};
		if (arr_ninez_busqueda.length >=1) {
			document.getElementById('section-ninez').style.display = "block";
		};
		if (arr_infecciosas_busqueda.length >=1) {
			document.getElementById('section-infecciosas').style.display = "block";
		};
	});
}

function noticias_content_container(){
	var params_not="";
	var urlpar_not=window.location.search.substr(1);
	var vals=new Array();

	if(urlpar_not){
		params_not=urlpar_not.split('&');
		for(i=0;i<params_not.length;i++){
			aux=params_not[i].split('=');
			vals[i]=decodeURIComponent(aux[1]);
		}
	}
	var url_search = vals[0].replace("+"," ");
  	
  	var params={
  		word:url_search,
		page:"1",
		pagesize:"100"
	};
	$.ajax({
		type:"GET",
		dataType: "json",
		data: params,
		url: "https://fundacioncsapidevel.azurewebsites.net/api/news/search"
	})
	.done(function(data) {
		var info = data.Data;
		var total = data.Total;
		html="";
		html_dem="";
		var url_get = "";
		j = 6; 
		k = 12;
		if (info.length==0) {
			document.getElementById('noticias_container').style.display = "none";
			document.getElementById('noticias').style.display = "none";
		};
		if (info.length<7) {
			document.getElementById('btn_noticias_sec_busqueda').style.display = "none";
		};
		for (var i = 0; i < info.length; i++) {
			url_get = info[i].ID;
			if ((i+1) > 6) {
				break;
			};
			html+="<a href='noticias.php?new="+url_get+"&img="+info[i].ImageUrl+"&title="+info[i].Title+"&teaser="+info[i].Teaser+"'><div class='noticia-prev'>";
			html+="<div style='background-image:url("+info[i].ImageUrl+")' class='img-noticia-prev'></div>";
			html+="<p class='noticia-para'>"+info[i].Title+"</p>";
			html+="</div></a>";
		};

		for (i = 0; i < 4; i++) {
			html_dem+="<div id='busqueda_news_block_"+(i+1).toString()+"' class='new_sec_all'>";
			for (var j = j; j < k; j++) {
				if ((j+1) > info.length) {

					break;
				};
				url_get = info[j].ID;
				html_dem+="<a href='noticias.php?new="+url_get+"&img="+info[i].ImageUrl+"&title="+info[i].Title+"&teaser="+info[i].Teaser+"'><div class='noticia-prev'>";
				html_dem+="<div style='background-image:url("+info[j].ImageUrl+")' class='img-noticia-prev'></div>";
				html_dem+="<p class='noticia-para'>"+info[j].Title+"</p>";
				html_dem+="</div></a>";
			}
			k = k+6;
			html_dem+="</div>";
		};

		$("#busqueda_primera_seccion").html(html);
		$("#busqueda_dem_news").html(html_dem);
	});
}
var action1=true;
function menu_mobil_vida(){
	if(action1){
		action1=false;
		$( "#sub_vida" ).fadeIn( "slow" );
	}else{
		action1=true
		$( "#sub_vida" ).fadeOut( "fast" );
	}
}
var action2=true;
function menu_mobil_calculadoras(){
	if(action2){
		action2=false;
		$( "#sub_calculadoras" ).fadeIn( "slow" );
	}else{
		action2=true
		$( "#sub_calculadoras" ).fadeOut( "fast" );
	}
}



var cont_new_busqueda;
function muestra_noticias_busqueda(){
	if (!cont_new_busqueda) {
		cont_new_busqueda = 1;
	}
	$("#busqueda_news_block_"+cont_new_busqueda).addClass(function(index){  
		cont_new_busqueda = cont_new_busqueda + 1;
		if (cont_new==6) {
			document.getElementById('btn_noticias_sec_busqueda').style.display = "none";
		};
		return 'show';
	});
	return true;
}
function noticias_index_fun(){
	var params={
		page:"1",
		pagesize:"4",
		orderby:"DESC",
    	show:"2"
	};
	$.ajax({
		type:"GET",
		dataType: "json",
		data: params,
		url: "https://fundacioncsapidevel.azurewebsites.net/api/news"
	})
	.done(function( data ) {
		var info = data.Data;
	    var total = data.Total;

		html="";

		html+="<div class='col-md-12'>";
			html+="<p class='section-title'>Kiosko Científico</p>";
		html+="</div>";
		html+="<div class='clearfix'></div>";
		html+="<div id='btn-not1' style='background-image:url("+info[0].ImageUrl+")'>";
			html+="<a class='noticias_index_fun' href='noticias.php?new="+info[0].ID+"&img="+info[0].ImageUrl+"&title="+info[0].Title+"&teaser="+info[0].Teaser+"'><div id='over-not1' class='over-noticia' style='overflow:hidden'><p>"+info[0].Title+"</p></div>";
		html+="</div>";
		html+="<div id='sec-not2'>";
			html+="<div id='btn-not2' style='background-image:url("+info[1].ImageUrl+")'>";
				html+="<a class='noticias_index_fun' href='noticias.php?new="+info[1].ID+"&img="+info[1].ImageUrl+"&title="+info[1].Title+"&teaser="+info[1].Teaser+"'><div id='over-not2' class='over-noticia' style='overflow:hidden'><p>"+info[1].Title+"</p></div>";
			html+="</div>";
			html+="<div id='btn-not3' style='background-image:url("+info[2].ImageUrl+")'>";
				html+="<a class='noticias_index_fun' href='noticias.php?new="+info[2].ID+"&img="+info[2].ImageUrl+"&title="+info[2].Title+"&teaser="+info[2].Teaser+"'><div id='over-not3' class='over-noticia' style='overflow:hidden'><p>"+info[2].Title+"</p></div>";
			html+="</div>";
		html+="</div>";
		html+="<div id='btn-not4' style='background-image:url("+info[3].ImageUrl+")'>";
			html+="<a class='noticias_index_fun' href='noticias.php?new="+info[3].ID+"&img="+info[3].ImageUrl+"&title="+info[3].Title+"&teaser="+info[3].Teaser+"'><div id='over-not4' class='over-noticia' style='overflow:hidden'><p>"+info[3].Title+"</p></div>";
		html+="</div>";
		$("#noticias_index").html(html);
	});
}
function menu_noticias(){
	var params={
		page:"1",
		pagesize:"4",
		orderby:"DESC",
    	show:"2"
	};
	$.ajax({
		type:"GET",
		dataType: "json",
		data: params,
		url: "https://fundacioncsapidevel.azurewebsites.net/api/news"
	})
	.done(function( data ) {
		var info = data.Data;
	    var total = data.Total;
		html="";
		html += "<div class='row'>";
			html += "<div class='col-md-2 col-sm-2'>";
				html += "<img src='"+info[0].ImageUrl+"' class='img-rounded'>";
			html += "</div>";
			html += "<div class='col-md-4 col-sm-4'>";
				html += "<div class='texto-noticia'>";
					html += "<h5>"+info[0].Title+"</h5>";
					html += "<p id='txt-n1' class='hidden-text'>"+info[0].Teaser+"</p>";
					html += "<a href='noticias.php?"+"&img="+info[0].ImageUrl+"&title="+info[0].Title+"&teaser="+info[0].Teaser+"'><button class='btn btn-primary'>Ver más...</button></a>";
					html += "<a href='https://twitter.com/Fund_CarlosSlim' target='_blank'><div class='sn-ind sn-tws'></div></a>";
					html += "<a href='https://www.facebook.com/FundacionCarlosSlim' target='_blank'><div class='sn-ind sn-fbs'></div></a>";
				html += "</div>";
			html += "</div>";
			html += "<div class='col-md-2 col-sm-2'>";
				html += "<img src='"+info[1].ImageUrl+"' class='img-rounded'>";
			html += "</div>";
			html += "<div class='col-md-4 col-sm-4'>";
				html += "<div class='texto-noticia'>";
					html += "<h5>"+info[1].Title+"</h5>";
					html += "<p class='hidden-text'>"+info[1].Teaser+"</p>";
					html += "<a href='actualidadEnSalud.php?"+"&img="+info[1].ImageUrl+"&title="+info[1].Title+"&teaser="+info[1].Teaser+"'><button class='btn btn-primary'>Ver más...</button></a>";
					html += "<a href='https://twitter.com/Fund_CarlosSlim' target='_blank'><div class='sn-ind sn-tws'></div></a>";
					html += "<a href='https://www.facebook.com/FundacionCarlosSlim' target='_blank'><div class='sn-ind sn-fbs'></div></a>";
				html += "</div>";
			html += "</div>";
		html += "</div>";
		$("#menu-noticias").html(html);
	});
  /**********************************/
}

function scroll_index(){
	$(window).scroll(function() {
     	if($(window).scrollTop() > 100) {
        	 document.getElementById('barra-buscador-nav-consulta').style.display = "block";
        	// getData();
     	}
     	if($(window).scrollTop() < 100) {
        	 document.getElementById('barra-buscador-nav-consulta').style.display = "none";
        	// getData();
     	}
    	if($(window).scrollTop() > 200) {
        	 document.getElementById('barra-buscador-nav').style.display = "block";
        	// getData();
     	}
     	if($(window).scrollTop() < 200) {
        	 document.getElementById('barra-buscador-nav').style.display = "none";
        	// getData();
     	}
	});
}
var action=true;
function menu_mob_sow(){
	if(action){
		action=false;
		$( "#menu_mobil" ).stop().animate({
			opacity: "1",
			top: "240"
		}, 800 );
	}else{
		action=true
		$( "#menu_mobil" ).stop().animate({
			opacity: "0.5",
			top: "-650"
		}, 400 );
	}
}
$( document ).ready(function(e) {
	$(".rec-password").click(function(){
		window.location = "change_prev.html";
	});
	$("#muestra_edicion").click(function(){
		document.getElementById('edita_perfil_box').style.display = "block";
		document.getElementById('cortina').style.display = "block";
		document.body.style.overflow = 'hidden';
	});
	$("#muestra_edicion_mob").click(function(){
		document.getElementById('edita_perfil_box').style.display = "block";
		document.getElementById('cortina').style.display = "block";
		document.body.style.overflow = 'hidden';
	});
	$("#cerrar_cuadro_edita").click(function(){
		document.getElementById('edita_perfil_box').style.display = "none";
		document.getElementById('cortina').style.display = "none";
		document.body.style.overflow = 'auto';
	});
	$( "#btn-menu-mob" ).click(function() {
		if(action){
			action=false;
			$( "#menu_mobil" ).stop().animate({
				opacity: "1",
				top: "240"
			}, 800 );
		}else{
			action=true
			$( "#menu_mobil" ).stop().animate({
				opacity: "0.5",
				top: "-650"
			}, 400 );
		}
	});
	setTimeout(function(){ 
		$('.banner_noticias').css('width',$('.banner_noticias').width()+ 40 + 'px'); 
	}, 100);
	
	$( "#form_post_contra" ).submit(function( event ) {
	  	event.preventDefault();
  		var urlredit = 'https://fundacioncsapidevel.azurewebsites.net/api/Account/ResetPassword';
		var email_post = $("#email-post").val();
		var pass = $("#pass").val();
		var confirm_pass = $("#confirm_pass").val();

  		if ($("#email-post").val()!="") {
  			if (pass == confirm_pass) {
  				var JPDF={
					Email: email_post,
					Password: pass,
					ConfirmPassword: confirm_pass
					
				};

				$.ajax({
					type:"POST",
					url:urlredit,
					data:JPDF,
					success:function(resp){
						console.log(resp);
						document.getElementById('pre_pass').style.display         ='none' ;
						document.getElementById('post_pass').style.display        ='block';
						document.getElementById('form_post_contra').style.display ='none' ;
					},
					error:function(e){
						console.log(e,JPDF);
						alert("No se ha encontrado este correo en la base de datos!");
						document.getElementById('pre_pass').style.display         ='block';
						document.getElementById('post_pass').style.display        ='none' ;
						document.getElementById('form_post_contra').style.display ='block';
					}
				});
  			}
  			else{
  				alert("Las contraseñas no coinciden");
  			}
  		}
  		else{
  			alert("Correo necesario para continuar!");
  		}
	});

	$( "#form_prev_contra" ).submit(function( event ) {
	  	event.preventDefault();
		var mail_upload    = $("#email-prest").val();

  		if ($("#email-prest").val()!="") {
	  		var urlredit = 'https://fundacioncsapidevel.azurewebsites.net/api/Account/ForgotPassword';
			var email=$("#email-prest").val();

	  		var JPDF={
				Email: email
				
			};

			$.ajax({
				type:"POST",
				url:urlredit,
				data:JPDF,
				success:function(resp){
					console.log(resp);
					document.getElementById('pre_pass').style.display = 'none';
					document.getElementById('form_prev_contra').style.display = 'none';
					document.getElementById('post_pass').style.display = 'block';

				},
				error:function(e){
					console.log(e,JPDF);
				}
			});
  		}
  		else{
  			alert("Correo necesario para continuar!");
  		}
	});

	$( "#form1" ).submit(function( event ) {
	  	event.preventDefault();
	  	var lista = document.cookie.split(";");
		for (i in lista) {
			var busca1 = lista[i].search("nombre");
			var busca2 = lista[i].search("username");
			var busca3 = lista[i].search("fbid");
			var busca = lista[i].search("token");

			if (busca > -1) {
				micookie   = lista[i]
				var igual  = micookie.indexOf("=");
				var token  = micookie.substring(igual+1);
			}
			if (busca1 > -1) {
				micookie1       = lista[i]
				var igual1      = micookie1.indexOf("=");
				var nombre_edit = micookie1.substring(igual1+1);
			}
			if (busca2 > -1) {
				micookie2       = lista[i];
				var igual2      = micookie2.indexOf("=");
				var mail_edit   = micookie2.substring(igual2+1);
			}
			if (busca3 > -1) {
				micookie3  = lista[i];
				var igual3 = micookie3.indexOf("=");
				var fb_id  = micookie3.substring(igual3+1);
			}
		}

		var img_upload 	   = $("#uploadFile").val();
		var nombre_upload  = $("#nombre").val();
		var mail_upload    = $("#email").val();

	  	if (img_upload!="") {
	  		var file_ext = img_upload.replace(/^.*\./, '');
	  		file_ext = file_ext.toLowerCase();
	  		if (file_ext=="jpg" || file_ext=="png") {
		  		var ImgFile=$("#uploadBtn")[0].files[0];
				var fdata=new FormData();
				fdata.append('file',ImgFile);
				$.ajax({
					url:"http://fundacioncsapidevel.azurewebsites.net/api/Account/Upload",
					type:"POST",
					data:fdata,
					cache:false,
					processData:false,
					contentType:false,
					beforeSend:function(request){
						request.withCredentials=true;
						request.setRequestHeader("Authorization","bearer" + " " + token);
					},
					success:function(path){
						img_url_File=path;
						document.cookie = "photo="+img_url_File+";";
						
						edita_perfil(nombre_upload,mail_upload,nombre_edit,mail_edit,img_url_File,token);
						location.reload();
					},
					error:function(error){
						console.log(error);
					}
				});
			}
			else{
				alert("Solo se aceptan imágenes 'jpg' y 'png'");
			}
	  	}
	  	else{
	  		if ($("#nombre").val()=="" && $("#email").val()!="") {
		  		var urlredit = 'https://fundacioncsapidevel.azurewebsites.net/api/account/update';
				var email=$("#email").val();

		  		var JPDF={
					Name: nombre_edit,
					Email: email,
					Gender: "male",
					FacebookID: ""
					
				};

				$.ajax({
					type:"PUT",
					url:urlredit,
					data:JPDF,
					beforeSend:function(request){
						request.withCredentials=true;
						request.setRequestHeader("Authorization","Bearer" + " " + token);
					},
					success:function(resp){
						document.cookie = "username="+email+";";
						location.reload();
					},
					error:function(e){
						console.log(e,JPDF);
					}
				});
	  		};
	  		if ($("#nombre").val()!="" && $("#email").val()=="") {
	  			var urlredit = 'https://fundacioncsapidevel.azurewebsites.net/api/account/update';
				var email = mail_edit;
				var nombre=$("#nombre").val();

		  		var JPDF={
					Name: nombre,
					Email: email,
					Gender: "male",
					FacebookID: ""
					
				};

				$.ajax({
					type:"PUT",
					url:urlredit,
					data:JPDF,
					beforeSend:function(request){
						request.withCredentials=true;
						request.setRequestHeader("Authorization","Bearer" + " " + token);
					},
					success:function(resp){
						document.cookie = "nombre="+nombre+";";
						document.cookie = "username="+email+";";
						location.reload();
					},
					error:function(e){
						console.log(e,JPDF);
					}
				});
	  		}
	  		if($("#nombre").val()!="" && $("#email").val()!=""){
		  		var urlredit = 'https://fundacioncsapidevel.azurewebsites.net/api/account/update';
		  		var nombre=$("#nombre").val();
				var email=$("#email").val();

		  		var JPDF={
					Name: nombre,
					Email: email,
					Gender: "male",
					FacebookID: ""
					
				};

				$.ajax({
					type:"PUT",
					url:urlredit,
					data:JPDF,
					beforeSend:function(request){
						request.withCredentials=true;
						request.setRequestHeader("Authorization","Bearer" + " " + token);
					},
					success:function(resp){
						document.cookie = "nombre="+nombre+";";
						document.cookie = "username="+email+";";
						location.reload();
					},
					error:function(e){
						console.log(e,JPDF);
					}
				});
	  		}
	  	}
	  	
	});
	$( "#form-registro" ).submit(function( event ) {
	  	event.preventDefault();
	  	if ($("#nombre").val()=="") {
	  		$("#nombre").popover("show");
	  	};
	  	if ($("#email-registro").val()=="") {
	  		$("#email-registro").popover("show");
	  	};
	  	if ($("#password-registro").val()=="") {
	  		$("#password-registro").popover("show");
	  	};
	  	if ($("#password_confirm").val()=="") {
	  		$("#password_confirm").popover("show");
	  	};
	  	if ($("#nombre").val()!=""&&$("#email-registro").val()!=""&&$("#password-registro").val()!=""&&$("#password_confirm").val()) {
			if ($("#password-registro").val() == $("#password_confirm").val()) {
	  			var urlregister="http://fundacioncsapidevel.azurewebsites.net/api/Account/Register";
				var nombre=$("#nombre").val();
				var email=$("#email-registro").val();
				var password=$("#password-registro").val();
				var password_confirm=$("#password_confirm").val();
				var JPDF={
					Name: nombre,
					Email: email,
					Gender: 'male',
					Password: password,
					ConfirmPassword: password_confirm
				};
				// var jstring = JSON.stringify(JPDF);
				// console.log(jstring);
				$.ajax({
					type:"POST",
					url:urlregister,
					data:JPDF,
					success:function(resp){
						var http = new XMLHttpRequest();
						var url = "http://fundacioncsapidevel.azurewebsites.net/api/Account/Login";
						var params = "Email=" + email + "&Password=" + password;
						// "Email=antonio.nava@icomsys.com.mx&Password=2ccbj#CCBJ"
						http.open("POST", url, true);

						//Send the proper header information along with the request
						http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						http.setRequestHeader("Content-length", params.length);
						http.setRequestHeader("Connection", "close");

						http.onreadystatechange = function() {//Call a function when the state changes.
						  	if(http.readyState == 4 && http.status == 200) {
						  		var json=eval('('+http.responseText+')');
						  		document.cookie = "access=valido;";
						  		document.cookie = "nombre="+json.name+";";
						  		location.reload();
						  	}
						}
						http.send(params);
					},
					error:function(e){
						$("#nombre").val()=="";
						$("#email-registro").val()=="";
						$("#password-registro").val()=="";
						$("#password_confirm").val()=="";
						alert("Usuario existente en el sistema. Intente nuevamente.");
					}
				});
		  	}
		  	else{
		  		$('#password_confirm').popover('show');
		  	}
	  	};
	});
	$( "#form-login" ).submit(function( event ) {
	  	event.preventDefault();
	  	var email=$("#email-login").val();
		var password=$("#password-login").val();
	  	var http = new XMLHttpRequest();
		var url = "http://fundacioncsapidevel.azurewebsites.net/api/Account/Login";
		var params = "Email=" + email + "&Password=" + password;
		// "Email=antonio.nava@icomsys.com.mx&Password=2ccbj#CCBJ"
		http.open("POST", url, true);

		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.setRequestHeader("Content-length", params.length);
		http.setRequestHeader("Connection", "close");

		http.onreadystatechange = function() {//Call a function when the state changes.
		  	if(http.readyState == 4 && http.status == 200) {
		  		var json=eval('('+http.responseText+')');
		  		document.cookie = "access=valido;";
		  		document.cookie = "token="+json.access_token+";";
		  		document.cookie = "username="+json.userName+";";
		  		document.cookie = "nombre="+json.name+";";
		  		if (json.userImage) {
		  			document.cookie = "photo="+json.userImage+";";
		  		};
		  		// console.log(json,document.cookie);
		  		location.reload();
		  	}
		  	if(http.status == 400){
		  		document.getElementById('alert-danger-login').style.display = "block";
		  		setTimeout(function(){ 
		  			$( "#alert-danger-login" ).fadeTo( "slow", 0 );
		  		}, 4000);
		  		setTimeout(function(){ 
			  		$( "#alert-danger-login" ).fadeTo( "fast", 1);
			  		document.getElementById('alert-danger-login').style.display = "none";
			  		document.getElementById('cargando-login').style.display = "none";
			  		document.getElementById('btn-login-aceptar').style.display = "block";
		  		}, 5000);
		  	}
		}
		http.send(params);
	});
	

	$("#nombre").click(function(){
		$("#nombre").popover("hide");
	});
	$("#email-registro").click(function(){
		$("#email-registro").popover("hide");

	});
	$("#password-registro").click(function(){
		$("#password-registro").popover("hide");

	});
	$("#password_confirm").click(function(){
		$("#password_confirm").popover("hide");

	});
	$('#btn-cerrar-login').click(function(){
	    document.getElementById('cuadro-login').style.display = "none";
	});
	$('#btn-login-aceptar').click(function(){
	    document.getElementById('cargando-login').style.display = "block";
	    document.getElementById('btn-login-aceptar').style.display = "none";
	});
	$('#cerrar-sesion').click(function(){
		var lista = document.cookie.split(";");
		for (i in lista) {
			var busca = lista[i].search("token");
			var busca1 = lista[i].search("username");
			if (busca1 > -1) {
				micookie1=lista[i]
			}
			if (busca > -1) {
				micookie=lista[i]
			}

		}
		var igual1 = micookie1.indexOf("=");
		var igual = micookie.indexOf("=");
		
		var username = micookie1.substring(igual1+1);
		var token = micookie.substring(igual+1);
		
		console.log(token);
		console.log(username);
	  	
	  	var http = new XMLHttpRequest();
		var url = "http://fundacioncsapidevel.azurewebsites.net/api/Account/Logout";
		var params = "Email=" + username + "&Token=" + token;
		// "Email=antonio.nava@icomsys.com.mx&Password=2ccbj#CCBJ"
		http.open("POST", url, true);

		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.setRequestHeader("Content-length", params.length);
		http.setRequestHeader("Connection", "close");

		http.onreadystatechange = function() {//Call a function when the state changes.
		  	if(http.status == 200) {
		  		document.cookie = "access=novalido;";
		  		document.cookie = "token=NULL;";
		  		document.cookie = "username=NULL;";
		  		document.cookie = "nombre=NULL;";
		  		document.cookie = "photo=NULL;";
		  		// console.log(document.cookie);
		  		location.reload();
		  	}
		  	if(http.status == 404){
		  		alert("Error.Intente nuevamente");
		  	}
		}
		http.send(params);
	});
	$('#cerrar-sesion-perfil').click(function(){
		document.cookie = "access=novalido;";
		document.cookie = "token=NULL;";
		document.cookie = "username=NULL;";
		document.cookie = "nombre=NULL;";
		document.cookie = "photo=NULL;";
		location.reload();
	});
	$('#btn-aceptar-registro').click(function(){
	    document.getElementById('btn-aceptar-registro').style.display = "none";
	    document.getElementById('cargando-registro').style.display = "block";
	    document.getElementById('cancela').style.display = "none";
	    setTimeout(function(){ 
	    	$( "#btn-aceptar-registro" ).css({
				"margin-left": "270px",
				"margin-top": "-30px"
		    });
		    $( "#cancela" ).css({
				"margin-top": "10px",
				"margin-left": "30px"
		    });
	    	document.getElementById('btn-aceptar-registro').style.display = "block";
		    document.getElementById('cargando-registro').style.display = "none";
		    document.getElementById('cancela').style.display = "block";
	    }, 3000);
	});
	$('#btn-cerrar-registro').click(function(){
	    document.getElementById('cuadro-registro').style.display = "none";
	    $("#nombre").popover("hide");
		$("#email-registro").popover("hide");
		$("#password-registro").popover("hide");
		$("#password_confirm").popover("hide");
	});
	$('#sn-lgin').click(function(){
		var html = "";
		html +="<div class='cortina'></div>";
		$("#cuadro_logeo").before(html);
	    document.getElementById('cuadro-login').style.display = "block";
	});
	$('#li-lg').click(function(){
	    document.getElementById('cuadro-login').style.display = "block";
	});
	$('#register').click(function(){
	    document.getElementById('cuadro-login').style.display = "none";
	    document.getElementById('cuadro-registro').style.display = "block";
	});
	$('#cancela').click(function(){
	    document.getElementById('cuadro-login').style.display = "block";
	    document.getElementById('cuadro-registro').style.display = "none";
	});
	$("#nav-menu").hide();
	var mobile=(($(window).width()<1000)?true:false);
	if(mobile){
		var width_sec_not2 = $("#sec-not2").width();
		width_sec_not2 = (width_sec_not2/2)-5;
		$("#btn-not2").width(width_sec_not2);
		$("#btn-not3").width(width_sec_not2);
		$("#btn-not1").height($("#btn-not1").width());
		$("#btn-not2").height($("#btn-not2").width());
		$("#btn-not3").height($("#btn-not3").width());
		$("#btn-not4").height($("#btn-not4").width());
		$("#over-not1").css("top",($("#btn-not1").width()-55));
		$("#over-not2").css("top",($("#btn-not2").width()-55));
		$("#over-not3").css("top",($("#btn-not3").width()-55));
		$("#over-not4").css("top",($("#btn-not4").width()-55));
	}
	// $(window).resize(function (){
	// 	mobile=(($(window).width()<1000)?true:false);
	// 	if(mobile){
	// 		var width_sec_not2 = $("#sec-not2").width();
	// 		width_sec_not2 = (width_sec_not2/2)-5;
 // 			$("#btn-not2").width(width_sec_not2);
	// 		$("#btn-not3").width(width_sec_not2);
	// 		$("#btn-not1").height($("#btn-not1").width());
	// 		$("#btn-not2").height($("#btn-not2").width());
	// 		$("#btn-not3").height($("#btn-not3").width());
	// 		$("#btn-not4").height($("#btn-not4").width());
	// 		$("#over-not1").css("top",($("#btn-not1").width()-55));
	// 		$("#over-not2").css("top",($("#btn-not2").width()-55));
	// 		$("#over-not3").css("top",($("#btn-not3").width()-55));
	// 		$("#over-not4").css("top",($("#btn-not4").width()-55));

	// 	}else{
	// 		window.location="";
	// 	}
	// });
	var actMenu=false;
	var btnAct;
	var menuAct;
	var timeout;
	$("#li-noticias").mouseover(function(){
		if(!mobile){
			resetAll();	
			$("#"+this.id).css({"background-color":"#02387d","color":"#fff","background-image":"url(img/not-on.png)"});
			btnAct="#"+this.id;
			actMenu=true;
			$("#menu-noticias").show();
			$("#nav-menu").slideDown();
		}
	});
	$("#li-practicas").mouseover(function(){
		if(!mobile){
			resetAll();	
			$("#"+this.id).css({"background-color":"#ffa500","color":"#fff","background-image":"url(img/prac-on.png)","float": "left", "position":"relative", "bottom":"20px"});
			btnAct="#"+this.id;
			$("#menu-practicas").show();
			actMenu=true;
			$("#nav-menu").slideDown("fast");
		}
	});
	$("#li-calculadora").mouseover(function(){
		if(!mobile){
			resetAll();	
			$("#"+this.id).css({"background-color":"#1dbdef","color":"#fff","background-image":"url(img/calc-on.png)","float":"left", "position":"relative", "bottom":"20px"});
			btnAct="#"+this.id;
			$("#menu-calculadora").show();
			actMenu=true;
			$("#nav-menu").slideDown("fast");
		}
	});
	$("#li-vademecum").mouseover(function(){
		if(!mobile){
			resetAll();	
			$("#"+this.id).css({"background-color":"#a0b654","color":"#fff","background-image":"url(img/vade-on.png)","float":"left", "position":"relative", "bottom":"20px"});
			btnAct="#"+this.id;
			$("#menu-vademecum").show();
			actMenu=true;
			$("#nav-menu").slideDown("fast");
		}
	});
	$("#li-linea-vida").mouseover(function(){
		if(!mobile){
			resetAll();	
			$("#"+this.id).css({"background-color":"#9f3ccd","color":"#fff","background-image":"url(img/linea/icono_linea_on.png)","float":"left", "position":"relative", "bottom":"20px"});
			btnAct="#"+this.id;
			$("#menu-linea-vida").show();
			actMenu=true;
			$("#nav-menu").slideDown("fast");
		}
	});
	$("#li-conoce").mouseover(function(){
		if(!mobile){
			resetAll();	
			$("#"+this.id).css({"background-color":"#ff7f00","color":"#fff","background-image":"url(img/mas-on.png)","float":"left", "position":"relative", "bottom":"20px"});
			btnAct="#"+this.id;
			$("#menu-conoce").show();
			actMenu=true;
			$("#nav-menu").slideDown("fast");
		}
	});

	$("#li-pieenso").mouseover(function(){
		if(!mobile){
			resetAll();	
			$("#"+this.id).css({"background-color":"#e8514b","color":"#fff","background-image":"url(img/icono_over_pieenso.png)","float":"left", "position":"relative", "bottom":"20px"});
			btnAct="#"+this.id;
			$("#menu-conoce").show();
			actMenu=true;
			$("#nav-menu").slideDown("fast");
		}
	});

	$("#navbar ul li").mouseout(function(){
		actMenu=false;
		timeout = setTimeout(function(){hideMenu();}, 500);
	});
	$(".menu").mouseover(function(){
		actMenu=true;
	});
	$(".menu").mouseout(function(){
		actMenu=false;
		timeout = setTimeout(function(){hideMenu();}, 500);
	});
	function hideMenu(){
		if(!actMenu){
			$("#nav-menu").slideUp("fast",function(){
				resetAll();
				clearTimeout(timeout);
			});
		}	
	}
	function resetAll(){
		$(".menu").hide();
		$("#li-noticias").css({"background-color":"","color":"#777","background-image":"url(img/not-off.png)"});
		$("#li-practicas").css({"background-color":"","color":"#777","background-image":"url(img/prac-off.png)"});
		$("#li-calculadora").css({"background-color":"","color":"#777","background-image":"url(img/calcu-off.png)"});
		$("#li-vademecum").css({"background-color":"","color":"#777","background-image":"url(img/vade-off.png)"});
		$("#li-conoce").css({"background-color":"","color":"#777","background-image":"url(img/mas-off.png)"});
		$("#li-linea-vida").css({"background-color":"","color":"#777","background-image":"url(img/linea/icono_linea_off.png)"});
		$("#li-pieenso").css({"background-color":"","color":"#777","background-image":"url(img/icono_pienso.png)"});

	}
	$("#btn-prac-herr").mouseover(function(e){
		$("#btn-prac-herr hr").css("background-color","#81421A");
		$("#btn-prac-herr p").css("color","#fff");
	});
	$("#btn-prac-herr").mouseout(function(e){
		if(!mobile){
			$("#btn-prac-herr hr").css("background-color","#ff7f00");
			$("#btn-prac-herr p").css("color","#000");
		}
	});
	$("#btn-calc-herr").mouseover(function(e){
		$("#btn-calc-herr hr").css("background-color","#81421A");
		$("#btn-calc-herr p").css("color","#fff");
	});
	$("#btn-calc-herr").mouseout(function(e){
		if(!mobile){
			$("#btn-calc-herr hr").css("background-color","#008df6");
			$("#btn-calc-herr p").css("color","#000");
		}
	});
	$("#btn-vade-herr").mouseover(function(e){
		$("#btn-vade-herr hr").css("background-color","#81421A");
		$("#btn-vade-herr p").css("color","#fff");
	});
	$("#btn-vade-herr").mouseout(function(e){
		if(!mobile){
			$("#btn-vade-herr hr").css("background-color","#0ab654");
			$("#btn-vade-herr p").css("color","#000");
		}
	});
});

function showDwnloadMdl (){
	$('.dialog_content').dialogModal({
			topOffset: 0,
			onOkBut: function() {},
			onCancelBut: function() {},
			onLoad: function(el, current) {},
			onClose: function() {},
			onChange: function(el, current) {
				if(current == 3){
					el.find('.dialogModal_header span').text('Page 3');
					$.ajax({url:'ajax.html'}).done(function(content){
						el.find('.dialogModal_content').html(content);
					});
				}
			}
		});
}

function showDisclaim(){
	console.log('okok');
	$('.dialog_content2').dialogModal({
			topOffset: 0,
			onOkBut: function() {},
			onCancelBut: function() {},
			onLoad: function(el, current) {},
			onClose: function() {},
			onChange: function(el, current) {
				if(current == 3){
					el.find('.dialogModal_header span').text('Page 3');
					$.ajax({url:'ajax.html'}).done(function(content){
						el.find('.dialogModal_content').html(content);
					});
				}
			}
		});
}

function loadPrivacy(){
	console.log('loadPrivacy');
	$('.dialog_content3').dialogModal({
			topOffset: 0,
			onOkBut: function() {},
			onCancelBut: function() {},
			onLoad: function(el, current) {},
			onClose: function() {},
			onChange: function(el, current) {
				if(current == 3){
					el.find('.dialogModal_header span').text('Page 3');
					$.ajax({url:'ajax.html'}).done(function(content){
						el.find('.dialogModal_content').html(content);
					});
				}
			}
		});
}

function send2vademecum (){
	window.open('http://www.medicamentos.com.mx/systems/xt_sign.asp?instituto_v=71TF1A','_blank');
}
