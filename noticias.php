<?php
  $new=$_GET["new"];
  $img=$_GET["img"];
  $teaser=$_GET["teaser"];
  $title=$_GET["title"];
  if (strlen($teaser)>150) {
    $teaser = substr($teaser, 0, 151);
  }

  $url_share = "http://fundacioncsportafolio.azurewebsites.net/noticias.php?new=".$new."&img=".$img."&title=".$title."&teaser=".$teaser;

?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv='Content-Type' content='text/html;' />
    <meta charset='UTF-8'/>
      <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
      <meta name='viewport' content='width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'/>
      <link rel='stylesheet' type='text/css' href='css/main.css'>
      <link rel='stylesheet' type='text/css' href='css/practicas.css'>
      <link rel='stylesheet' type='text/css' href='fonts/fonts.css'>
      <link type="text/css" rel="stylesheet" href="css/popModal.css">
    
      <script src='js/jquery-1.11.2.min.js'></script> 
      <script src="js/bootstrap.min.js"></script>
    
      <script src='js/main.js'></script>
      <script src='js/practicas.js'></script> 
      <script src='moment/moment.js'></script>
      <script src='moment/locale/es.js'></script>
      <title>Noticias</title>
      <meta property="fb:app_id"       content="1607848596150574" />
      <meta property="og:type"         content="article" />
      <meta property='og:title'        content='<?php echo $title?>'>
      <meta property='og:description'  content='<?php echo $teaser?>'>
      <meta property='og:image'        content='<?php echo $img;?>'>
      <meta property="og:url"          content="<?php echo $url_share;?>">
      
      <meta name="twitter:card"        content="photo" />
      <meta name="twitter:site"        content="@Fund_CarlosSlim" />
      <meta name="twitter:title"       content="<?php echo $title?>" />
      <meta name="twitter:image"       content="<?php echo $img;?>" />
      <meta name="twitter:url"         content="<?php echo $url_share;?>" />

      <script type='text/javascript' src='//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-55c22268918d81f9' async='async'></script> 
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
    <script>
      facebook_login();
    </script>
    <style type="text/css">
      #lg-mobil,
      #lg-mobil-fb {
        margin-top: 40px !important;
      }
      @media(max-width: 450px){
        #cancela{
          margin-top: -2px !important;
          margin-left: 0px !important;
          margin-right: -30px !important;
        }
      }
    </style>
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
    <div id="cuadro-login" style="margin-top: 5%;">
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
    <div id="cuadro-registro" style="margin-top: 5% !important;">
      <img src="img/cerrar.png" id="btn-cerrar-registro">
      <p class="titulo-registro-index">Registro</p>
          <p class="seccion-registro-index" style="margin-top:-20px">
            Nombre
          </p><br>
          <input type="text" name="email" id="email" class="form-registro-index"><br>
          <p class="seccion-registro-index">
            E-mail
          </p><br>
          <input type="text" name="email" id="email" class="form-registro-index"><br>
          <p class="seccion-registro-index">
            Contraseña
          </p><br>
          <input type="password" name="password" id="password" class="form-registro-index"><br>
          <p class="seccion-registro-index">
            Confirma contraseña
          </p><br>
          <input type="password" name="password" id="password" class="form-registro-index"><br>
          <img src="img/cancelar.png" class="btn-registro" id="cancela" style="margin-left: 10px">
          <img src="img/aceptar.png" class="btn-registro">
    </div>
    <!-- <div id="slider-noticias-item" class="container row" style="position:relative;top:200px;">
    </div> -->
    <div class="col-md-12" style="padding-top: 300px;">
	<?php if (!isset($new)){ ?>
	<?php }else {?>
	<?php }?>
      <div id="all-news">
        <div id="primera_seccion">
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
        <div id="dem_news">
          <div id="news_block_1" class="new_sec_all">
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
          <div id="news_block_2" class="new_sec_all">
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
    </div>
    <div class="container">
      <div id="btn_noticias_id_all" class="btn_noticias_sec_all" onclick="muestra_noticias()" style="margin-bottom: 0px"><i>Más Noticias...</i></div>
      <div id="btn_noticias_id_ant" class="btn_noticias_sec_ant" onclick="noticias(1,100,'ASC',1)" style="margin-bottom: 0px"><i>...Noticias más antiguas</i></div>
      <div id="btn_noticias_id_act" class="btn_noticias_sec_ant" onclick="noticias(1,100,'DESC',0)" style="margin-bottom: 0px"><i>...Noticias más actuales</i></div>
    </div>
    
    <div id="noticia_indi_mobil">
      <div class='container' style=' margin-top: 30px;'>
        <div class=''>
          <div class='col-sm-12 col-md-12 col-lg-12 post-image-mobil'>
          </div>
          <div class='col-sm-12 col-md-12 col-lg-12 div_title_not_mobil' style="display: none; height:150px;background-color:#efedee; margin-top:10px;padding:10px; padding-left:7%;padding-right:4%;padding-bottom:0px; width: 100% !important">
            <div class=''>
              <p class='col-sm-12 col-md-12 col-lg-12' style="padding-left: 0px !important;">
                <span class="post-title"></span><br>

              </p>
                <div class="row">
                    <div class="col-md-6">
                        <p class="post-time" style="font-size: 16px"></p>
                    </div>
                    <div class="col-md-6">
                        <p class="share_section">
                        <div style="float:left;" class="addthis_sharing_toolbox"></div><span style="float:left;">Compartir</span>
                        </p>
                    </div>
                </div>

            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col-sm-12 col-md-12 col-lg-12 noticia_div_para'>
            <p class="post-content"></p>
          </div>
        </div>
      </div>
    </div>
    <div id="noticia_indi" style="display:none">
      <div class='container' style='position:relative; margin-top: 30px;'>
        <div class='row'>
          <div class='col-sm-5 col-md-5 col-lg-5 recibe-cubo post-image' style="height:350px">
          </div>
          <div class='col-sm-7 col-md-7 col-lg-7 recibe-cubo' style="height:350px;background-color:#efedee; padding:20px">
            <div class=''>
              <p class='col-sm-12 col-md-12 col-lg-12'>
                <span class="post-title"><p class="loading_message" style="font-size:25px;margin-left:15%"><i>CARGANDO...</i></p></span><br>

              </p>

                <div class="row">
                    <div class="col-md-6">
                        <p class="post-time" style="font-size: 16px; margin-left: 20px;"></p>
                    </div>
                    <div class="col-md-6">
                        <p class="share_section">
                        <div style="float:right;margin-right: 20px" class="addthis_sharing_toolbox"></div><span style="float:right;margin-right:30px">Compartir</span>
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col-sm-12 col-md-12 col-lg-12 noticia_div_para'>
            <p class="post-content"></p>
          </div>
        </div>
      </div>
      <script type="text/javascript">
        function getUrlParameter(param){
          //var decode = encodeURI(window.location);
          var pageUrl = window.location.search.substring(1);
          var urlVariables = pageUrl.split('&');
          for(var l=0;l<urlVariables.length;l++){
              var paramName = urlVariables[l].split('=');
              if (paramName[l] = param) {
                  return paramName[l+1];
              } else {
                  return "";
              }
          }
        }
        if (getUrlParameter("new")) {
          document.getElementById('btn_noticias_id_all').style.display = "none";
          document.getElementById('all-news').style.display = "none";
          document.getElementById('noticia_indi').style.display = "block";
          var id = getUrlParameter("new");
          var params={
            page:"1",
            pagesize:"100",
            orderby:"DESC",
            show:"2"
          };
          var url_new_id = "https://fundacioncsapidevel.azurewebsites.net/api/news/" + id;
          $.ajax({
            type:"GET",
            dataType: "json",
            url: url_new_id
          })
          .done(function( data ) {


            document.getElementById('btn_noticias_id_ant').style.display = "none";
            var postImage = data.ImageUrl;
            var postDate = moment(data.CreatedAt,'YYYYMMDD').format('LL');
            $(".post-image").css({"background-image":"url("+postImage+")"});
            $(".post-image-mobil").css({"display":"block","background-image":"url("+postImage+")"});
            $(".div_title_not_mobil").css({"display":"block"});
            $(".loading_message").css({"display":"none"});

            $('.post-title').html(data.Title);
            $('.post-time').html(postDate);
            $('.post-content').html(data.Content);
            var html = data.Title;

          });
        };
      </script>
    </div>
    <div class="border-important"></div>
    <section id="mas-visitados" class="container">
      <div class="row container-fluid">
        <div class="col-md-12 col-sm-12 col-xs-12 col-lg-12">
          <hr>
          <div id="calc-list" class="col-md-5 col-sm-4 col-xs-12">
            <p>Calculadoras de Salud</p>
            <ul style="float:left">
              <li>Calculadora de índice de Masa Corporal</li>
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
            <div class="list-mob-el btn-primary btn-cal-masa">Calculadora de Índice de Masa Corporal</div>
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

    <div id="dialog_content" class="dialog_content" style="display:none;">
        <div class="dialogModal_header">Descargar ahora <font class="blueModalTitle">Portafolio Digital</font> en el Móvil y USB. Es gratis.</div>
        <div class="dialogModal_content">
        <img src="img/downloadAppModal.jpg" style="width:100%;">
        <a href="https://play.google.com/store/apps/details?id=com.icom.portafoliosalud&hl=es_419" target="_blank"><div style="width: 165px; position: relative; z-index: 50;bottom: 237px;left: 61%;height: 50px;background-color: transparent;cursor: pointer;"></div></a><a href="http://icom-systems.com/portafolio-digital/entrega9Dic/dist_091215.zip" target="_blank"><div style="width: 165px; position: relative; z-index: 50;bottom: 180px;left: 61%;height: 50px;background-color: transparent;cursor: pointer;"></div></a>
        </div>
        <!--<div class="dialogModal_footer">
          <button type="button" class="btn btn-primary" data-dialogmodal-but="next">Next</button>
          <button type="button" class="btn btn-default" data-dialogmodal-but="cancel">Cancel</button>
        </div>-->
      </div>

      <div id="dialog_content2" class="dialog_content2" style="display:none;">
        <div class="dialogModal_header">Sobre la información de <font class="blueModalTitle">medicamentos</font> en el  <font class="blueModalTitle">VADEMECUN</font>  del Portafolio Digital de la FCS</div>
        <div class="dialogModal_content" style="margin:10px;">
          <div style="padding-top:50px;">La FCS establece que las recomendaciones que se proporcionan en esta aplicación son de carácter informativo  y <font class="blueModalTitle">no substituyen</font> de ninguna manera las recomendaciones médicas y/o un especialista en la materia. El uso que se haga de esta aplicación <font class="blueModalTitle">es responsabilidad exclusiva del usuario.</div><div style="padding-top:15px;"></font> La base de datos de medicamentos se actualiza periódicamente con el objeto de recoger las últimas modificaciones y novedades habidas e integradas por parte del equipo proveedor. La FCS no tiene ningún fin comercial por lo que <font class="blueModalTitle">NO recomienda marca</font> alguna.</div>
          <div align="center" style="padding-top:50px;padding-bottom:50px;"><button onclick="send2vademecum()" class="calc-btn-send">Aceptar</button></div>
        </div>
        <!--<div class="dialogModal_footer">
          <button type="button" class="btn btn-primary" data-dialogmodal-but="next">Next</button>
          <button type="button" class="btn btn-default" data-dialogmodal-but="cancel">Cancel</button>
        </div>-->
      </div>

      <div id="dialog_content3" class="dialog_content3" style="display:none;">
        <div class="dialogModal_header">AVISO DE PRIVACIDAD</div>
        <div class="dialogModal_content" style="margin:10px;">
          <div style="padding-top:50px;">Aviso dirigido a los titulares de datos personales que obran en posesión de la Fundación Carlos Slim, A.C. 
Fundación Carlos Slim, A.C. (en lo sucesivo la “Fundación”), con domicilio en calle Lago Zurich No. 245, Edificio Presa Falcón, Piso 20, Colonia Granada Ampliación, Delegación Miguel Hidalgo, C.P. 11529, en México, Distrito Federal, hace de su conocimiento que los datos personales de usted, incluyendo los sensibles, que actualmente o en el futuro obren en nuestras bases de datos, serán tratados y/o utilizados por la Iniciativa de capacitación y/o por aquellos terceros que, por la naturaleza de sus trabajos o funciones tengan la necesidad de tratar y/o utilizar sus datos personales; con el propósito de i) cumplir con aquellas obligaciones que se derivan de la relación jurídica existente entre usted como titular de los datos personales y la Iniciativa de capacitación, ii) utilizar y/o tratar sus datos personales con fines estadísticos, iii) utilizar y/o tratar sus datos personales con fines publicitarios y de fomento, promoción y difusión de acciones sociales, iv) difundir, comunicar y/o publicar sus datos personales en cualquier medio de comunicación electrónico, v) utilizar sus datos personales como base de referencia, y vi) enviarle a su domicilio invitaciones a eventos organizados por la Iniciativa de capacitación. 
La “Fundación” podrá transferir los datos personales que obren en sus bases de datos a terceras personas, nacionales o extranjeras, como pudieran ser de manera enunciativa: Asociaciones Civiles, Instituciones de Asistencia Privada, Organismos Descentralizados, Instituciones de Crédito y Hospitales Públicos y/o Privados, salvo que los titulares respectivos manifiesten expresamente su oposición, en términos de lo dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (la Ley). 
Los titulares podrán ejercer sus derechos de acceso, rectificación, cancelación u oposición y la revocación del consentimiento a partir del 6 de enero de 2012, mediante el envío de una solicitud a la siguiente dirección electrónica dg@fundacioncarlosslim.org Todas las solicitudes que sean enviadas al Instituto, independiente del medio utilizado por los titulares, deberán: 
Incluir el nombre del titular y domicilio u otro medio para comunicarle la respuesta a su solicitud. 
Acompañar los documentos oficiales que acrediten la identidad del titular. 
Incluir una descripción clara y precisa de los datos personales respecto de los cuales ejercitará los derechos que les confiere la Ley. 
Incluir cualquier elemento o documento que facilite la localización de los datos personales de que se traten. 
La “Fundación” tendrá el derecho de cambiar, modificar, complementar y/o alterar el presente aviso, en cualquier momento, en cuyo caso se hará de su conocimiento a través de su publicación en la siguiente página web: fundacioncarlosslim.org

        </div>
        <!--<div class="dialogModal_footer">
          <button type="button" class="btn btn-primary" data-dialogmodal-but="next">Next</button>
          <button type="button" class="btn btn-default" data-dialogmodal-but="cancel">Cancel</button>
        </div>-->
      </div>


    <script src="js/popModal.js"></script>
  </body>
  <script type="text/javascript">
    noticias(1,100,"DESC",0);
  </script>
</html>
<!-- /***********************************************/ -->