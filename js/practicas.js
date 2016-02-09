function get_token(){
  var lista = document.cookie.split(";");
  var token = "NULL";

  for (i in lista) {
    var busca = lista[i].search("token");

    if (busca > -1) {
      micookie   = lista[i]
      var igual  = micookie.indexOf("=");
      token  = micookie.substring(igual+1);
    }
  }
  return token;
}
function favoritos_usu(){ 
  var token = get_token();
  var credentials = "Bearer" + " " + token;

  $.ajax({
    type:"GET",
    url:"https://fundacioncsapidevel.azurewebsites.net/api/pdfuserfavorites",
    beforeSend:function(request){
      request.withCredentials=true;
      request.setRequestHeader("Authorization",credentials);
    },
    success:function(path){
      arr_cronicas = [];
      arr_materno = [];
      arr_ninez = [];
      arr_infecciosas = [];

      for( i= 0; i < path.length; i++){
        if (path[i].PDF.CategoryID == 1) {
          arr_cronicas.push(path[i]);
          console.log(arr_cronicas);
        };
        if (path[i].PDF.CategoryID == 2) {
          arr_materno.push(path[i]);
        };
        if (path[i].PDF.CategoryID == 3) {
          arr_ninez.push(path[i]);
        };
        if (path[i].PDF.CategoryID == 4) {
          arr_infecciosas.push(path[i]);
        };
      }
      if (arr_cronicas.length>0) {
        if ($(window).width()<1000) {
          var html_perfil_cronicas_mob = "";

          console.log('arr_cronicas: ' + arr_cronicas);

          for (var j = 0; j < arr_cronicas.length; j++) {
            html_perfil_cronicas_mob+="<div class='pdf-prev-mob' style='width:42%; margin-right:4%;margin-left:4%;text-align:center'>";
            html_perfil_cronicas_mob+="<div style='background-image:url("+arr_cronicas[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-mob'></div>";
            html_perfil_cronicas_mob+="<a href='vista.php?url_pdf="+arr_cronicas[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_cronicas[j].PDF.ID+"&url_fav="+arr_cronicas[j].PDF.Category.Description+"/"+arr_cronicas[j].PDF.Description+"/"+arr_cronicas[j].PDF.Name+"&nombre="+arr_cronicas[j].PDF.Name+"' target='_blank'><button class='btn  btn-consulta-pdf-mob' style='background-color:#f00007; color: white'>Consultar</button></a>";
            html_perfil_cronicas_mob+="<p class='pdf-para-perfil'>"+arr_cronicas[j].PDF.Name+"</p>";
            html_perfil_cronicas_mob+="</div>";
          };
          document.getElementById('sec_cronicas_perfil').style.display ='block';
          $("#sec_cronicas_perfil").after(html_perfil_cronicas_mob);
        }
        else{
          document.getElementById('sec_cronicas_perfil').style.display = 'none';
        }
        var html="";
        var k = 4;
        var l = 8;
        var y = (arr_cronicas.length+1) % 4;
        var z = Math.floor(arr_cronicas.length/4);
        if (y != 0) {
          z++;
        };
        for(i=1;i<2;i++){
          html += "<div class='item active'>";

          for (var j = 0; j < arr_cronicas.length; j++) {
            if ((j+1) > 4) {
              break;
            };
            try{
              console.log('ok');
              html+="<div class='pdf-prev'>";
              html+="<div style='background-image:url("+arr_cronicas[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
              html+="<a href='vista.php?url_pdf="+arr_cronicas[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_cronicas[j].PDF.ID+"&url_fav="+arr_cronicas[j].PDF.Category.Description+"/"+arr_cronicas[j].PDF.Description+"/"+arr_cronicas[j].PDF.Name+"&nombre="+arr_cronicas[j].PDF.Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
              html+="<p class='pdf-para-perfil'>"+arr_cronicas[j].PDF.Name+"</p>";
              html+="</div>";
            }catch(err){
              console.log(err.message);
            }
          };
          html+="</div>";
        }
        if (arr_cronicas.length>4) {
          for(i=1;i<(z-1);i++){
            html += "<div class='item'>";
            for (j = k; j < l; j++) {
              try{
                html+="<div class='pdf-prev'>";
                html+="<div style='background-image:url("+arr_cronicas[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
                html+="<a href='vista.php?url_pdf="+arr_cronicas[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_cronicas[j].PDF.ID+"&url_fav="+arr_cronicas[j].PDF.Category.Description+"/"+arr_cronicas[j].PDF.Description+"/"+arr_cronicas[j].PDF.Name+"&nombre="+arr_cronicas[j].PDF.Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
                html+="<p class='pdf-para-perfil'>"+arr_cronicas[j].PDF.Name+"</p>";
                html+="</div>";
              }catch(err){
                // console.log(err.message);
              }
            };
            k= k+4;
            l= l+4;
            html+="</div>";
            // console.log(i);
          }
          for(i=(z-1); i < z ;i++){
            html += "<div class='item'>";
            for (j = k; j < (l-2); j++) {
              try{
                html+="<div class='pdf-prev'>";
                html+="<div style='background-image:url("+arr_cronicas[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
                html+="<a href='vista.php?url_pdf="+arr_cronicas[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_cronicas[j].PDF.ID+"&url_fav="+arr_cronicas[j].PDF.Category.Description+"/"+arr_cronicas[j].PDF.Description+"/"+arr_cronicas[j].PDF.Name+"&nombre="+arr_cronicas[j].PDF.Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
                html+="<p class='pdf-para-perfil'>"+arr_cronicas[j].PDF.Name+"</p>";
                html+="</div>";
              }catch(err){
                // console.log(err.message);
              }
            };
            html+="</div>";
          }
        };
        
        $("#cronicas-cont-fav").html(html);
      }
      else{
        document.getElementById('section-cronicas').style.display = 'none';
      }
      if (arr_materno.length>0) {
        if ($(window).width()<1000) {
          var html_perfil_materno_mob = "";

          for (var j = 0; j < arr_materno.length; j++) {
            html_perfil_materno_mob+="<div class='pdf-prev-mob' style='width:42%; margin-right:4%;margin-left:4%;text-align:center'>";
            html_perfil_materno_mob+="<div style='background-image:url("+arr_materno[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-mob'></div>";
            html_perfil_materno_mob+="<a href='vista.php?url_pdf="+arr_materno[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_materno[j].PDF.ID+"&url_fav="+arr_materno[j].PDF.Category.Description+"/"+arr_materno[j].PDF.Description+"/"+arr_materno[j].PDF.Name+"&nombre="+arr_materno[j].PDF.Name+"' target='_blank'><button class='btn  btn-consulta-pdf-mob' style='background-color:#f9339d; color: white'>Consultar</button></a>";
            html_perfil_materno_mob+="<p class='pdf-para-perfil'>"+arr_materno[j].PDF.Name+"</p>";
            html_perfil_materno_mob+="</div>";
          };
          document.getElementById('sec_materno_perfil').style.display ='block';
          $("#sec_materno_perfil").after(html_perfil_materno_mob);
        }
        else{
          document.getElementById('sec_materno_perfil').style.display = 'none';
        }
        var html="";
        var k = 4;
        var l = 8;
        var y = (arr_materno.length+1) % 4;
        var z = Math.floor(arr_materno.length/4);
        if (y != 0) {
          z++;
        };
        for(i=1;i<2;i++){
          html += "<div class='item active'>";
          for (var j = 0; j < arr_materno.length; j++) {
            if ((j+1) > 4) {
              break;
            };
            try{
              html+="<div class='pdf-prev'>";
              html+="<div style='background-image:url("+arr_materno[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
              html+="<a href='vista.php?url_pdf="+arr_materno[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_materno[j].PDF.ID+"&url_fav="+arr_materno[j].PDF.Category.Description+"/"+arr_materno[j].PDF.Description+"/"+arr_materno[j].PDF.Name+"&nombre="+arr_materno[j].PDF.Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
              html+="<p class='pdf-para-perfil'>"+arr_materno[j].PDF.Name+"</p>";
              html+="</div>";
            }catch(err){
              // console.log(err.message);
            }
          };
          html+="</div>";
        }
        if (arr_materno.length>4) {
          for(i=1;i<(z-1);i++){
            html += "<div class='item'>";
            for (j = k; j < l; j++) {
              try{
                html+="<div class='pdf-prev'>";
                html+="<div style='background-image:url("+arr_materno[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
                html+="<a href='vista.php?url_pdf="+arr_materno[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_materno[j].PDF.ID+"&url_fav="+arr_materno[j].PDF.Category.Description+"/"+arr_materno[j].PDF.Description+"/"+arr_materno[j].PDF.Name+"&nombre="+arr_materno[j].PDF.Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
                html+="<p class='pdf-para-perfil'>"+arr_materno[j].PDF.Name+"</p>";
                html+="</div>";
              }catch(err){
                // console.log(err.message);
              }
            };
            k= k+4;
            l= l+4;
            html+="</div>";
            // console.log(i);
          }
          for(i=(z-1); i < z ;i++){
            html += "<div class='item'>";
            for (j = k; j < (l-2); j++) {
              try{
                html+="<div class='pdf-prev'>";
                html+="<div style='background-image:url("+arr_materno[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
                html+="<a href='vista.php?url_pdf="+arr_materno[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_materno[j].PDF.ID+"&url_fav="+arr_materno[j].PDF.Category.Description+"/"+arr_materno[j].PDF.Description+"/"+arr_materno[j].PDF.Name+"&nombre="+arr_materno[j].PDF.Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
                html+="<p class='pdf-para-perfil'>"+arr_materno[j].PDF.Name+"</p>";
                html+="</div>";
              }catch(err){
                // console.log(err.message);
              }
            };
            html+="</div>";
          }
        }
        $("#materno-cont-fav").html(html);
      }
      else{
        document.getElementById('section-materna').style.display = 'none';
      }
      if (arr_ninez.length>0) {
        if ($(window).width()<1000) {
          var html_perfil_ninez_mob = "";

          for (var j = 0; j < arr_ninez.length; j++) {
            html_perfil_ninez_mob+="<div class='pdf-prev-mob' style='width:42%; margin-right:4%;margin-left:4%;text-align:center'>";
            html_perfil_ninez_mob+="<div style='background-image:url("+arr_ninez[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-mob'></div>";
            html_perfil_ninez_mob+="<a href='vista.php?url_pdf="+arr_ninez[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_ninez[j].PDF.ID+"&url_fav="+arr_ninez[j].PDF.Category.Description+"/"+arr_ninez[j].PDF.Description+"/"+arr_ninez[j].PDF.Name+"&nombre="+arr_ninez[j].PDF.Name+"' target='_blank'><button class='btn  btn-consulta-pdf-mob' style='background-color:#FF8B17; color: white'>Consultar</button></a>";
            html_perfil_ninez_mob+="<p class='pdf-para-perfil'>"+arr_ninez[j].PDF.Name+"</p>";
            html_perfil_ninez_mob+="</div>";
          };
          document.getElementById('sec_ninez_perfil').style.display ='block';
          $("#sec_ninez_perfil").after(html_perfil_ninez_mob);
        }
        else{
          document.getElementById('sec_ninez_perfil').style.display = 'none';
        }
        var html="";
        var k = 4;
        var l = 8;
        var y = (arr_ninez.length+1) % 4;
        var z = Math.floor(arr_ninez.length/4);
        if (y != 0) {
          z++;
        };
        for(i=1;i<2;i++){
          html += "<div class='item active'>";
          for (var j = 0; j < arr_ninez.length; j++) {
            if ((j+1) > 4) {
              break;
            };
            try{
              html+="<div class='pdf-prev'>";
              html+="<div style='background-image:url("+arr_ninez[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
              html+="<a href='vista.php?url_pdf="+arr_ninez[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_ninez[j].PDF.ID+"&url_fav="+arr_ninez[j].PDF.Category.Description+"/"+arr_ninez[j].PDF.Description+"/"+arr_ninez[j].PDF.Name+"&nombre="+arr_ninez[j].PDF.Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
              html+="<p class='pdf-para-perfil'>"+arr_ninez[j].PDF.Name+"</p>";
              html+="</div>";
            }catch(err){
              // console.log(err.message);
            }
          };
          html+="</div>";
        }
        if (arr_ninez.length>4) {
          for(i=1;i<(z-1);i++){
            html += "<div class='item'>";
            for (j = k; j < l; j++) {
              try{
                html+="<div class='pdf-prev'>";
                html+="<div style='background-image:url("+arr_ninez[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
                html+="<a href='vista.php?url_pdf="+arr_ninez[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_ninez[j].PDF.ID+"&url_fav="+arr_ninez[j].PDF.Category.Description+"/"+arr_ninez[j].PDF.Description+"/"+arr_ninez[j].PDF.Name+"&nombre="+arr_ninez[j].PDF.Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
                html+="<p class='pdf-para-perfil'>"+arr_ninez[j].PDF.Name+"</p>";
                html+="</div>";
              }catch(err){
                // console.log(err.message);
              }
            };
            k= k+4;
            l= l+4;
            html+="</div>";
            // console.log(i);
          }
          for(i=(z-1); i < z ;i++){
            html += "<div class='item'>";
            for (j = k; j < (l-2); j++) {
              try{
                html+="<div class='pdf-prev'>";
                html+="<div style='background-image:url("+arr_ninez[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
                html+="<a href='vista.php?url_pdf="+arr_ninez[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_ninez[j].PDF.ID+"&url_fav="+arr_ninez[j].PDF.Category.Description+"/"+arr_ninez[j].PDF.Description+"/"+arr_ninez[j].PDF.Name+"&nombre="+arr_ninez[j].PDF.Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
                html+="<p class='pdf-para-perfil'>"+arr_ninez[j].PDF.Name+"</p>";
                html+="</div>";
              }catch(err){
                // console.log(err.message);
              }
            };
            html+="</div>";
          }
        }
        $("#ninez-cont-fav").html(html);
      }
      else{
        document.getElementById('section-ninez').style.display = 'none';
      }
      if (arr_infecciosas.length>0) {
        if ($(window).width()<1000) {
          var html_perfil_infecciosas_mob = "";

          for (var j = 0; j < arr_infecciosas.length; j++) {
            html_perfil_infecciosas_mob+="<div class='pdf-prev-mob' style='width:42%; margin-right:4%;margin-left:4%;text-align:center'>";
            html_perfil_infecciosas_mob+="<div style='background-image:url("+arr_infecciosas[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-mob'></div>";
            html_perfil_infecciosas_mob+="<a href='vista.php?url_pdf="+arr_infecciosas[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_infecciosas[j].PDF.ID+"&url_fav="+arr_infecciosas[j].PDF.Category.Description+"/"+arr_infecciosas[j].PDF.Description+"/"+arr_infecciosas[j].PDF.Name+"&nombre="+arr_infecciosas[j].PDF.Name+"' target='_blank'><button class='btn  btn-consulta-pdf-mob' style='background-color:#00a1f0; color: white'>Consultar</button></a>";
            html_perfil_infecciosas_mob+="<p class='pdf-para-perfil'>"+arr_infecciosas[j].PDF.Name+"</p>";
            html_perfil_infecciosas_mob+="</div>";
          };
          document.getElementById('sec_infecciosas_perfil').style.display ='block';
          $("#sec_infecciosas_perfil").after(html_perfil_infecciosas_mob);
        }
        else{
          document.getElementById('sec_infecciosas_perfil').style.display = 'none';
        }
        var html="";
        var k = 4;
        var l = 8;
        var y = (arr_infecciosas.length+1) % 4;
        var z = Math.floor(arr_infecciosas.length/4);
        if (y != 0) {
          z++;
        };
        for(i=1;i<2;i++){
          html += "<div class='item active'>";
          for (var j = 0; j < arr_infecciosas.length; j++) {
            if ((j+1) > 4) {
              break;
            };
            try{
              html+="<div class='pdf-prev'>";
              html+="<div style='background-image:url("+arr_infecciosas[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
              html+="<a href='vista.php?url_pdf="+arr_infecciosas[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_infecciosas[j].PDF.ID+"&url_fav="+arr_infecciosas[j].PDF.Category.Description+"/"+arr_infecciosas[j].PDF.Description+"/"+arr_infecciosas[j].PDF.Name+"&nombre="+arr_infecciosas[j].PDF.Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
              html+="<p class='pdf-para-perfil'>"+arr_infecciosas[j].PDF.Name+"</p>";
              html+="</div>";
            }catch(err){
              // console.log(err.message);
            }
          };
          html+="</div>";
        }
        if (arr_infecciosas.length>4) {
          for(i=1;i<(z-1);i++){
            html += "<div class='item'>";
            for (j = k; j < l; j++) {
              try{
                html+="<div class='pdf-prev'>";
                html+="<div style='background-image:url("+arr_infecciosas[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
                html+="<a href='vista.php?url_pdf="+arr_infecciosas[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_infecciosas[j].PDF.ID+"&url_fav="+arr_infecciosas[j].PDF.Category.Description+"/"+arr_infecciosas[j].PDF.Description+"/"+arr_infecciosas[j].PDF.Name+"&nombre="+arr_infecciosas[j].PDF.Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
                html+="<p class='pdf-para-perfil'>"+arr_infecciosas[j].PDF.Name+"</p>";
                html+="</div>";
              }catch(err){
                // console.log(err.message);
              }
            };
            k= k+4;
            l= l+4;
            html+="</div>";
            // console.log(i);
          }
          for(i=(z-1); i < z ;i++){
            html += "<div class='item'>";
            for (j = k; j < (l-2); j++) {
              try{
                html+="<div class='pdf-prev'>";
                html+="<div style='background-image:url("+arr_infecciosas[j].PDF.MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
                html+="<a href='vista.php?url_pdf="+arr_infecciosas[j].PDF.MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_infecciosas[j].PDF.ID+"&url_fav="+arr_infecciosas[j].PDF.Category.Description+"/"+arr_infecciosas[j].PDF.Description+"/"+arr_infecciosas[j].PDF.Name+"&nombre="+arr_infecciosas[j].PDF.Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
                html+="<p class='pdf-para-perfil'>"+arr_infecciosas[j].PDF.Name+"</p>";
                html+="</div>";
              }catch(err){
                // console.log(err.message);
              }
            };
            html+="</div>";
          }
        }
        $("#infecciosas-cont-fav").html(html);
      }
      else{
        document.getElementById('section-infecciosas').style.display = 'none';
      } 
      // console.log(path[i].PDF.CategoryID); 
    },
    error:function(error){
      console.log(error);
    }
  });
}
function fav_pdf_valid(id_pdf){
  var token       = get_token();
  var credentials = "Bearer" + " " + token;
  var pdf_fav_url = "https://fundacioncsapidevel.azurewebsites.net/api/pdfuserfavorites/"+id_pdf

  if (token != "NULL") {
    $.ajax({
      type:"GET",
      async: false,
      url:pdf_fav_url,
      beforeSend:function(request){
        request.withCredentials=true;
        request.setRequestHeader("Authorization",credentials);
      },
      success:function(path){
          document.getElementById('btn_fav_agrega').style.display = 'none';
          document.getElementById('btn_fav_elimina').style.display = 'block';   
      },
      error:function(error){
        console.log(error);
        document.getElementById('btn_fav_agrega').style.display = 'block';
        document.getElementById('btn_fav_elimina').style.display = 'none';
      }
    });
  }

  $("#btn_fav_agrega").click(function(){
    if (token == "NULL") {
      alert("Debe iniciar Sesión para poder agregar a Favoritos");
      document.getElementById('cortina').style.display = "block";
      document.getElementById('cuadro-login').style.display = "block";
      if ($(window).height<650) {
        document.body.style.overflow = 'hidden';
    }
  }
  });
  $("#btn-cerrar-login").click(function(){
    document.getElementById('cortina').style.display = "none";
    document.getElementById('cuadro-login').style.display = "none";
    document.getElementById('save_msg').style.display = "none";
    document.getElementById('btn_fav_agrega').style.display = 'block';
    document.body.style.overflow = 'auto';
  });
  $("#btn-cerrar-registro").click(function(){
    document.getElementById('cortina').style.display = "none";
    document.getElementById('cuadro-login').style.display = "none";
    document.getElementById('save_msg').style.display = "none";
    document.getElementById('btn_fav_agrega').style.display = 'block';
    document.body.style.overflow = 'auto';
  });
}
function carrusel_mob(){
  var createCORSRequest = function(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // Most browsers.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // IE8 & IE9
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  };
  var url = 'http://fundacioncsapidevel.azurewebsites.net/api/PDF/';
  var method = 'GET';
  var xhr = createCORSRequest(method, url);
  xhr.onload = function(data) {
    
    var json=eval('('+xhr.responseText+')');
    var carr_mobil = "";
    var carr_mobil_item = "";

    if (json[0].CategoryID==1) {
      carr_mobil+="<div id='titulo-movil1' class='titulo-movil'>";
        carr_mobil+="<p>";
          carr_mobil+="<span class='title-txt-slide'>"+json[0].Name+"</span><br><br>"+json[0].Description+"</p>";
        carr_mobil+="<a href='vista.php?url_pdf="+json[0].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[0].ID+"&nombre="+json[0].Name+"' target='_blank'><button class='btn btn-consulta-movil-pdf'>CONSULTAR</button></a>";
      carr_mobil+="</div>";
    };
    if (json[0].CategoryID==2) {
      carr_mobil+="<div id='titulo-movil2' class='titulo-movil'>";
        carr_mobil+="<p>";
          carr_mobil+="<span class='title-txt-slide'>"+json[0].Name+"</span><br><br>"+json[0].Description+"</p>";
        carr_mobil+="<a href='vista.php?url_pdf="+json[0].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[0].ID+"&nombre="+json[0].Name+"' target='_blank'><button class='btn btn-consulta-movil-pdf'>CONSULTAR</button></a>";
      carr_mobil+="</div>";
    };
    if (json[0].CategoryID==3) {
      carr_mobil+="<div id='titulo-movil3' class='titulo-movil'>";
        carr_mobil+="<p>";
          carr_mobil+="<span class='title-txt-slide'>"+json[0].Name+"</span><br><br>"+json[0].Description+"</p>";
        carr_mobil+="<a href='vista.php?url_pdf="+json[0].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[0].ID+"&nombre="+json[0].Name+"' target='_blank'><button class='btn btn-consulta-movil-pdf'>CONSULTAR</button></a>";
      carr_mobil+="</div>";
    };
    if (json[0].CategoryID==4) {
      carr_mobil+="<div id='titulo-movil4' class='titulo-movil'>";
        carr_mobil+="<p>";
          carr_mobil+="<span class='title-txt-slide'>"+json[0].Name+"</span><br><br>"+json[0].Description+"</p>";
        carr_mobil+="<a href='vista.php?url_pdf="+json[0].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[0].ID+"&nombre="+json[0].Name+"' target='_blank'><button class='btn btn-consulta-movil-pdf'>CONSULTAR</button></a>";
      carr_mobil+="</div>";
    };
    for (var i = 1; i < 3; i++) {
      if (json[i].CategoryID==1) {
        carr_mobil_item+="<div class='item' style='height:400px'>";
        carr_mobil_item+="<div id='titulo-movil1' class='titulo-movil'>";
          carr_mobil_item+="<p>";
            carr_mobil_item+="<span class='title-txt-slide'>"+json[i].Name+"</span><br><br>"+json[i].Description+"</p>";
          carr_mobil_item+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta-movil-pdf'>CONSULTAR</button></a>";
        carr_mobil_item+="</div></div>";
      };
      if (json[i].CategoryID==2) {
        carr_mobil_item+="<div class='item' style='height:400px'>";
        carr_mobil_item+="<div id='titulo-movil2' class='titulo-movil'>";
          carr_mobil_item+="<p>";
            carr_mobil_item+="<span class='title-txt-slide'>"+json[i].Name+"</span><br><br>"+json[i].Description+"</p>";
          carr_mobil_item+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta-movil-pdf'>CONSULTAR</button></a>";
        carr_mobil_item+="</div></div>";
      };
      if (json[i].CategoryID==3) {
        carr_mobil_item+="<div class='item' style='height:400px'>";
        carr_mobil_item+="<div id='titulo-movil3' class='titulo-movil'>";
          carr_mobil_item+="<p>";
            carr_mobil_item+="<span class='title-txt-slide'>"+json[i].Name+"</span><br><br>"+json[i].Description+"</p>";
          carr_mobil_item+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta-movil-pdf'>CONSULTAR</button></a>";
        carr_mobil_item+="</div></div>";
      };
      if (json[i].CategoryID==4) {
        carr_mobil_item+="<div class='item' style='height:400px'>";
        carr_mobil_item+="<div id='titulo-movil4' class='titulo-movil'>";
          carr_mobil_item+="<p>";
            carr_mobil_item+="<span class='title-txt-slide'>"+json[i].Name+"</span><br><br>"+json[i].Description+"</p>";
          carr_mobil_item+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta-movil-pdf'>CONSULTAR</button></a>";
        carr_mobil_item+="</div></div>";
      };
    };
    $("#item1").html(carr_mobil);
    $("#item1").after(carr_mobil_item);
  };
  xhr.onerror = function() {
    // Error code goes here.
  };
  xhr.send();
}
function selected(e){
  var selectBox = document.getElementById($(e).attr("id"));
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  var createCORSRequest = function(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // Most browsers.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // IE8 & IE9
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  };
  var url = 'http://fundacioncsapidevel.azurewebsites.net/api/PDF/';
  var method = 'GET';
  var xhr = createCORSRequest(method, url);
  xhr.onload = function(data) {
    var json=eval('('+xhr.responseText+')');
    html_alfa_cronicas_mob="";
    html_alfa_materno_mob="";
    html_alfa_ninez_mob="";
    html_alfa_infecciosas_mob="";
    arr_mob = []
    for( i= 0; i < json.length; i++){
      arr_mob.push(json[i].Name);
    }
    arr_mob.sort();
    if (selectedValue=="nombre") {
      for (var i = 0; i < arr_mob.length; i++) {
        for (var j = 0; j < arr_mob.length; j++) {
          if (json[j].Name == arr_mob[i]) {
            if (json[j].CategoryID == 1) {
              try{
                html_alfa_cronicas_mob+="<div class='pdf-prev-mob' style='width:42%; margin-right:4%;margin-left:4%;'>";
                html_alfa_cronicas_mob+="<div style='background-image:url("+json[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-mob'></div>";
                html_alfa_cronicas_mob+="<a href='vista.php?url_pdf="+json[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[j].Name+"' target='_blank'><button class='btn  btn-consulta-pdf-mob' style='background-color:#f00007; color: white'>Consultar</button></a>";
                html_alfa_cronicas_mob+="<p class='pdf-para-mob'>"+json[j].Name+"</p>";
                html_alfa_cronicas_mob+="</div>";
              }catch(err){
                console.log(err.message);
              }
              $("#pdf-cat-mob-cronicas").html(html_alfa_cronicas_mob);
            };
            if (json[j].CategoryID == 2) {
              try{
                html_alfa_materno_mob+="<div class='pdf-prev-mob' style='width:42%; margin-right:4%;margin-left:4%;'>";
                html_alfa_materno_mob+="<div style='background-image:url("+json[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-mob'></div>";
                html_alfa_materno_mob+="<a href='vista.php?url_pdf="+json[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[j].Name+"' target='_blank'><button class='btn  btn-consulta-pdf-mob' style='background-color:#f9339d; color: white'>Consultar</button></a>";
                html_alfa_materno_mob+="<p class='pdf-para-mob'>"+json[j].Name+"</p>";
                html_alfa_materno_mob+="</div>";
              }catch(err){
                console.log(err.message);
              }
              $("#pdf-cat-mob-materno").html(html_alfa_materno_mob);
            };
            if (json[j].CategoryID == 3) {
              try{
                html_alfa_ninez_mob+="<div class='pdf-prev-mob' style='width:42%; margin-right:4%;margin-left:4%;'>";
                html_alfa_ninez_mob+="<div style='background-image:url("+json[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-mob'></div>";
                html_alfa_ninez_mob+="<a href='vista.php?url_pdf="+json[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn  btn-consulta-pdf-mob' style='background-color:#FF8B17; color: white'>Consultar</button></a>";
                html_alfa_ninez_mob+="<p class='pdf-para-mob'>"+json[j].Name+"</p>";
                html_alfa_ninez_mob+="</div>";
              }catch(err){
                console.log(err.message);
              }
              $("#pdf-cat-mob-ninez").html(html_alfa_ninez_mob);
            };
            if (json[j].CategoryID == 4) {
              try{
                html_alfa_infecciosas_mob+="<div class='pdf-prev-mob' style='width:42%; margin-right:4%;margin-left:4%;'>";
                html_alfa_infecciosas_mob+="<div style='background-image:url("+json[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-mob'></div>";
                html_alfa_infecciosas_mob+="<a href='vista.php?url_pdf="+json[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn  btn-consulta-pdf-mob' style='background-color:#00a1f0; color: white'>Consultar</button></a>";
                html_alfa_infecciosas_mob+="<p class='pdf-para-mob'>"+json[j].Name+"</p>";
                html_alfa_infecciosas_mob+="</div>";
              }catch(err){
                console.log(err.message);
              }
              $("#pdf-cat-mob-infecciosas").html(html_alfa_infecciosas_mob);
            };
          };       
        };
      };
    };
  };
  xhr.onerror = function() {
    // Error code goes here.
  };
  xhr.send();
}
function cat_mob_pdf(cat){
  // $(cat).attr("id")
  if ($(cat).attr("id") == "sec_cronicas") {
    window.location = "seccion-catalogo.html?seccion=cronicas";
  };
  if ($(cat).attr("id") == "sec_materna") {
    window.location = "seccion-catalogo.html?seccion=materna";
  };
  if ($(cat).attr("id") == "sec_ninez") {
    window.location = "seccion-catalogo.html?seccion=ninez";
  };
  if ($(cat).attr("id") == "sec_infecciosas") {
    window.location = "seccion-catalogo.html?seccion=infecciosas";
  };
}
function carrusel_section(sec){
  if (sec == 1) {
    var html_cronicas_carrusel = "";
    var arr_cronicas_carr = [];
    $.ajax({
      type:"GET",
      url:"https://fundacioncsapidevel.azurewebsites.net/api/PDF/",
      success:function(path){
        for (var i = 0; i < path.length; i++) {
          if (path[i].Category.ID == 1) {
            arr_cronicas_carr.push(path[i]);
          };
        };
        html_cronicas_carrusel+="<div class='item active'>";
          html_cronicas_carrusel+="<div class='row'>";
            html_cronicas_carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
              html_cronicas_carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
              html_cronicas_carrusel+="<div style='background-image:url("+arr_cronicas_carr[0].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/cronicas.png'></div>";
              if (arr_cronicas_carr[0].Name.length>70) {
                html_cronicas_carrusel+="<p class='pdf-para-carr'>"+(arr_cronicas_carr[0].Name).substring(0,70)+"...</p>";
              }
              else{
                html_cronicas_carrusel+="<p class='pdf-para-carr'>"+arr_cronicas_carr[0].Name+"</p>";
              }
              html_cronicas_carrusel+="</div>";
            html_cronicas_carrusel+="</div>";
            html_cronicas_carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
              html_cronicas_carrusel+="<h3>"+arr_cronicas_carr[0].Name+"</h3>";
              if (arr_cronicas_carr[0].Description.length>380) {
                html_cronicas_carrusel+="<p>"+(arr_cronicas_carr[0].Description).substring(0,380)+"...</p>";
              }
              else{
                html_cronicas_carrusel+="<p>"+arr_cronicas_carr[0].Description+"</p>";
              }
              html_cronicas_carrusel+="<a href='vista.php?url_pdf="+arr_cronicas_carr[0].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_cronicas_carr[0].ID+"&url_fav="+arr_cronicas_carr[0].Category.Description+"/"+arr_cronicas_carr[0].Description+"/"+arr_cronicas_carr[0].Name+"&nombre="+arr_cronicas_carr[0].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
              html_cronicas_carrusel+="<a href='"+arr_cronicas_carr[1].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
            html_cronicas_carrusel+="</div>";
          html_cronicas_carrusel+="</div>";
        html_cronicas_carrusel+="</div>";

        html_cronicas_carrusel+="<div class='item'>";
          html_cronicas_carrusel+="<div class='row'>";
            html_cronicas_carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
              html_cronicas_carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
              html_cronicas_carrusel+="<div style='background-image:url("+arr_cronicas_carr[1].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/cronicas.png'></div>";
              if (arr_cronicas_carr[1].Name.length>130) {
                html_cronicas_carrusel+="<p class='pdf-para-carr'>"+(arr_cronicas_carr[1].Name).substring(0,130)+"...</p>";
              }
              else{
                html_cronicas_carrusel+="<p class='pdf-para-carr'>"+arr_cronicas_carr[1].Name+"</p>";
              }
              html_cronicas_carrusel+="</div>";
            html_cronicas_carrusel+="</div>";
            html_cronicas_carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
              html_cronicas_carrusel+="<h3>"+arr_cronicas_carr[1].Name+"</h3>";
              if (arr_cronicas_carr[1].Description.length>380) {
                html_cronicas_carrusel+="<p>"+(arr_cronicas_carr[1].Description).substring(0,380)+"...</p>";
              }
              else{
                html_cronicas_carrusel+="<p>"+arr_cronicas_carr[1].Description+"</p>";
              }
              html_cronicas_carrusel+="<a href='vista.php?url_pdf="+arr_cronicas_carr[1].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_cronicas_carr[1].ID+"&url_fav="+arr_cronicas_carr[1].Category.Description+"/"+arr_cronicas_carr[1].Description+"/"+arr_cronicas_carr[1].Name+"&nombre="+arr_cronicas_carr[1].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
              html_cronicas_carrusel+="<a href='"+arr_cronicas_carr[1].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
            html_cronicas_carrusel+="</div>";
          html_cronicas_carrusel+="</div>";
        html_cronicas_carrusel+="</div>";

        html_cronicas_carrusel+="<div class='item'>";
          html_cronicas_carrusel+="<div class='row'>";
            html_cronicas_carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
              html_cronicas_carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
              html_cronicas_carrusel+="<div style='background-image:url("+arr_cronicas_carr[2].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/cronicas.png'></div>";
              if (arr_cronicas_carr[2].Name.length>130) {
                html_cronicas_carrusel+="<p class='pdf-para-carr'>"+(arr_cronicas_carr[2].Name).substring(0,130)+"...</p>";
              }
              else{
                html_cronicas_carrusel+="<p class='pdf-para-carr'>"+arr_cronicas_carr[2].Name+"</p>";
              }
              html_cronicas_carrusel+="</div>";
            html_cronicas_carrusel+="</div>";
            html_cronicas_carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
              html_cronicas_carrusel+="<h3>"+arr_cronicas_carr[2].Name+"</h3>";
              if (arr_cronicas_carr[2].Description.length>380) {
                html_cronicas_carrusel+="<p>"+(arr_cronicas_carr[2].Description).substring(0,380)+"...</p>";
              }
              else{
                html_cronicas_carrusel+="<p>"+arr_cronicas_carr[2].Description+"</p>";
              }
              html_cronicas_carrusel+="<a href='vista.php?url_pdf="+arr_cronicas_carr[2].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_cronicas_carr[2].ID+"&url_fav="+arr_cronicas_carr[2].Category.Description+"/"+arr_cronicas_carr[2].Description+"/"+arr_cronicas_carr[2].Name+"&nombre="+arr_cronicas_carr[2].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
              html_cronicas_carrusel+="<a href='"+arr_cronicas_carr[2].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
            html_cronicas_carrusel+="</div>";
          html_cronicas_carrusel+="</div>";
        html_cronicas_carrusel+="</div>";

        $("#carousel-practicas-head").html(html_cronicas_carrusel);
      },
      error:function(error){
        console.log(error);
      }
    });
  };
  if (sec == 2) {
    var html_materno_carrusel = "";
    var arr_materno_carr = [];
    $.ajax({
      type:"GET",
      async: false,
      url:"https://fundacioncsapidevel.azurewebsites.net/api/PDF/",
      success:function(path){
        for (var i = 0; i < path.length; i++) {
          if (path[i].Category.ID == 2) {
            arr_materno_carr.push(path[i]);
          };
        };
        html_materno_carrusel+="<div class='item active'>";
          html_materno_carrusel+="<div class='row'>";
            html_materno_carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
              html_materno_carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
              html_materno_carrusel+="<div style='background-image:url("+arr_materno_carr[0].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/materna.png'></div>";
              if (arr_materno_carr[0].Name.length>70) {
                html_materno_carrusel+="<p class='pdf-para-carr'>"+(arr_materno_carr[0].Name).substring(0,70)+"...</p>";
              }
              else{
                html_materno_carrusel+="<p class='pdf-para-carr'>"+arr_materno_carr[0].Name+"</p>";
              }
              html_materno_carrusel+="</div>";
            html_materno_carrusel+="</div>";
            html_materno_carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
              html_materno_carrusel+="<h3>"+arr_materno_carr[0].Name+"</h3>";
              if (arr_materno_carr[0].Description.length>380) {
                html_materno_carrusel+="<p>"+(arr_materno_carr[0].Description).substring(0,380)+"...</p>";
              }
              else{
                html_materno_carrusel+="<p>"+arr_materno_carr[0].Description+"</p>";
              }
              html_materno_carrusel+="<a href='vista.php?url_pdf="+arr_materno_carr[0].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_materno_carr[0].ID+"&url_fav="+arr_materno_carr[0].Category.Description+"/"+arr_materno_carr[0].Description+"/"+arr_materno_carr[0].Name+"&nombre="+arr_materno_carr[0].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
              html_materno_carrusel+="<a href='"+arr_materno_carr[0].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
            html_materno_carrusel+="</div>";
          html_materno_carrusel+="</div>";
        html_materno_carrusel+="</div>";

        html_materno_carrusel+="<div class='item'>";
          html_materno_carrusel+="<div class='row'>";
            html_materno_carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
              html_materno_carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
              html_materno_carrusel+="<div style='background-image:url("+arr_materno_carr[1].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/materna.png'></div>";
              if (arr_materno_carr[1].Name.length>70) {
                html_materno_carrusel+="<p class='pdf-para-carr'>"+(arr_materno_carr[1].Name).substring(0,70)+"...</p>";
              }
              else{
                html_materno_carrusel+="<p class='pdf-para-carr'>"+arr_materno_carr[1].Name+"</p>";
              }
              html_materno_carrusel+="</div>";
            html_materno_carrusel+="</div>";
            html_materno_carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
              html_materno_carrusel+="<h3>"+arr_materno_carr[1].Name+"</h3>";
               if (arr_materno_carr[1].Description.length>380) {
                 html_materno_carrusel+="<p>"+(arr_materno_carr[1].Description).substring(0,380)+"...</p>";
               }
               else{
                 html_materno_carrusel+="<p>"+arr_materno_carr[1].Description+"</p>";
               }
              html_materno_carrusel+="<a href='vista.php?url_pdf="+arr_materno_carr[1].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_materno_carr[1].ID+"&url_fav="+arr_materno_carr[1].Category.Description+"/"+arr_materno_carr[1].Description+"/"+arr_materno_carr[1].Name+"&nombre="+arr_materno_carr[1].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
              html_materno_carrusel+="<a href='"+arr_materno_carr[1].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
            html_materno_carrusel+="</div>";
          html_materno_carrusel+="</div>";
        html_materno_carrusel+="</div>";

        html_materno_carrusel+="<div class='item'>";
          html_materno_carrusel+="<div class='row'>";
            html_materno_carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
              html_materno_carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
              html_materno_carrusel+="<div style='background-image:url("+arr_materno_carr[2].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/materna.png'></div>";
              if (arr_materno_carr[2].Name.length>70) {
                html_materno_carrusel+="<p class='pdf-para-carr'>"+(arr_materno_carr[2].Name).substring(0,70)+"...</p>";
              }
              else{
                html_materno_carrusel+="<p class='pdf-para-carr'>"+arr_materno_carr[2].Name+"</p>";
              }
              html_materno_carrusel+="</div>";
            html_materno_carrusel+="</div>";
            html_materno_carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
              html_materno_carrusel+="<h3>"+arr_materno_carr[2].Name+"</h3>";
               if (arr_materno_carr[2].Description.length>380) {
                 html_materno_carrusel+="<p>"+(arr_materno_carr[2].Description).substring(0,380)+"...</p>";
               }
               else{
                 html_materno_carrusel+="<p>"+arr_materno_carr[2].Description+"</p>";
               }
              html_materno_carrusel+="<a href='vista.php?url_pdf="+arr_materno_carr[2].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_materno_carr[2].ID+"&url_fav="+arr_materno_carr[2].Category.Description+"/"+arr_materno_carr[2].Description+"/"+arr_materno_carr[2].Name+"&nombre="+arr_materno_carr[2].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
              html_materno_carrusel+="<a href='"+arr_materno_carr[2].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
            html_materno_carrusel+="</div>";
          html_materno_carrusel+="</div>";
        html_materno_carrusel+="</div>";

        $("#carousel-practicas-head").html(html_materno_carrusel);
      },
      error:function(error){
        console.log(error);
      }
    });
  };
  if (sec == 3) {
    var html_ninez_carrusel = "";
    var arr_ninez_carr = [];
    $.ajax({
      type:"GET",
      async: false,
      url:"https://fundacioncsapidevel.azurewebsites.net/api/PDF/",
      success:function(path){
        for (var i = 0; i < path.length; i++) {
          if (path[i].Category.ID == 3) {
            arr_ninez_carr.push(path[i]);
          };
        };
        console.log(arr_ninez_carr);
        html_ninez_carrusel+="<div class='item active'>";
          html_ninez_carrusel+="<div class='row'>";
            html_ninez_carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
              html_ninez_carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
              html_ninez_carrusel+="<div style='background-image:url("+arr_ninez_carr[0].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/ninez.png'></div>";
              if (arr_ninez_carr[0].Name.length>70) {
                html_ninez_carrusel+="<p class='pdf-para-carr'>"+(arr_ninez_carr[0].Name).substring(0,70)+"...</p>";
              }
              else{
                html_ninez_carrusel+="<p class='pdf-para-carr'>"+arr_ninez_carr[0].Name+"</p>";
              }
              html_ninez_carrusel+="</div>";
            html_ninez_carrusel+="</div>";
            html_ninez_carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
              html_ninez_carrusel+="<h3>"+arr_ninez_carr[0].Name+"</h3>";
               if (arr_ninez_carr[0].Description.length>380) {
                 html_ninez_carrusel+="<p>"+(arr_ninez_carr[0].Description).substring(0,380)+"...</p>";
               }
               else{
                 html_ninez_carrusel+="<p>"+arr_ninez_carr[0].Description+"</p>";
               }
              html_ninez_carrusel+="<a href='vista.php?url_pdf="+arr_ninez_carr[0].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_ninez_carr[0].ID+"&url_fav="+arr_ninez_carr[0].Category.Description+"/"+arr_ninez_carr[0].Description+"/"+arr_ninez_carr[0].Name+"&nombre="+arr_ninez_carr[0].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
              html_ninez_carrusel+="<a href='"+arr_ninez_carr[0].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
            html_ninez_carrusel+="</div>";
          html_ninez_carrusel+="</div>";
        html_ninez_carrusel+="</div>";
        if (arr_ninez_carr.length>1) {
          html_ninez_carrusel+="<div class='item'>";
            html_ninez_carrusel+="<div class='row'>";
              html_ninez_carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
                html_ninez_carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
                html_ninez_carrusel+="<div style='background-image:url("+arr_ninez_carr[1].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/ninez.png'></div>";
                if (arr_ninez_carr[1].Name.length>70) {
                  html_ninez_carrusel+="<p class='pdf-para-carr'>"+(arr_ninez_carr[1].Name).substring(0,70)+"...</p>";
                }
                else{
                  html_ninez_carrusel+="<p class='pdf-para-carr'>"+arr_ninez_carr[1].Name+"</p>";
                }                html_ninez_carrusel+="</div>";
              html_ninez_carrusel+="</div>";
              html_ninez_carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
                html_ninez_carrusel+="<h3>"+arr_ninez_carr[1].Name+"</h3>";
               if (arr_ninez_carr[1].Description.length>380) {
                 html_ninez_carrusel+="<p>"+(arr_ninez_carr[1].Description).substring(0,380)+"...</p>";
               }
               else{
                 html_ninez_carrusel+="<p>"+arr_ninez_carr[1].Description+"</p>";
               }
                html_ninez_carrusel+="<a href='vista.php?url_pdf="+arr_ninez_carr[1].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_ninez_carr[1].ID+"&url_fav="+arr_ninez_carr[1].Category.Description+"/"+arr_ninez_carr[1].Description+"/"+arr_ninez_carr[1].Name+"&nombre="+arr_ninez_carr[1].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
                html_ninez_carrusel+="<a href='"+arr_ninez_carr[1].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
              html_ninez_carrusel+="</div>";
            html_ninez_carrusel+="</div>";
          html_ninez_carrusel+="</div>";

          html_ninez_carrusel+="<div class='item'>";
            html_ninez_carrusel+="<div class='row'>";
              html_ninez_carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
                html_ninez_carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
                html_ninez_carrusel+="<div style='background-image:url("+arr_ninez_carr[2].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/ninez.png'></div>";
                if (arr_ninez_carr[2].Name.length>70) {
                  html_ninez_carrusel+="<p class='pdf-para-carr'>"+(arr_ninez_carr[2].Name).substring(0,70)+"...</p>";
                }
                else{
                  html_ninez_carrusel+="<p class='pdf-para-carr'>"+arr_ninez_carr[2].Name+"</p>";
                }                html_ninez_carrusel+="</div>";
              html_ninez_carrusel+="</div>";
              html_ninez_carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
                html_ninez_carrusel+="<h3>"+arr_ninez_carr[2].Name+"</h3>";
               if (arr_ninez_carr[2].Description.length>380) {
                 html_ninez_carrusel+="<p>"+(arr_ninez_carr[2].Description).substring(0,380)+"...</p>";
               }
               else{
                 html_ninez_carrusel+="<p>"+arr_ninez_carr[2].Description+"</p>";
               }
                html_ninez_carrusel+="<a href='vista.php?url_pdf="+arr_ninez_carr[2].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_ninez_carr[2].ID+"&url_fav="+arr_ninez_carr[2].Category.Description+"/"+arr_ninez_carr[2].Description+"/"+arr_ninez_carr[2].Name+"&nombre="+arr_ninez_carr[2].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
                html_ninez_carrusel+="<a href='"+arr_ninez_carr[2].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
              html_ninez_carrusel+="</div>";
            html_ninez_carrusel+="</div>";
          html_ninez_carrusel+="</div>";
        };
        $("#carousel-practicas-head").html(html_ninez_carrusel);
      },
      error:function(error){
        console.log(error);
      }
    });
  };
  if (sec == 4) {
    var arr_infecciosas_carr = [];
    var html_infecciosas_carrusel = "";
    $.ajax({
      type:"GET",
      async: false,
      url:"https://fundacioncsapidevel.azurewebsites.net/api/PDF/",
      success:function(path){
        for (var i = 0; i < path.length; i++) {
          if (path[i].Category.ID == 4) {
            arr_infecciosas_carr.push(path[i]);
          };
        };
        html_infecciosas_carrusel+="<div class='item active'>";
          html_infecciosas_carrusel+="<div class='row'>";
            html_infecciosas_carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
              html_infecciosas_carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
              html_infecciosas_carrusel+="<div style='background-image:url("+arr_infecciosas_carr[0].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/infecciosas.png'></div>";
              if (arr_infecciosas_carr[0].Name.length>70) {
                html_infecciosas_carrusel+="<p class='pdf-para-carr'>"+(arr_infecciosas_carr[0].Name).substring(0,70)+"...</p>";
              }
              else{
                html_infecciosas_carrusel+="<p class='pdf-para-carr'>"+arr_infecciosas_carr[0].Name+"</p>";
              }
              html_infecciosas_carrusel+="</div>";
            html_infecciosas_carrusel+="</div>";
            html_infecciosas_carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
              html_infecciosas_carrusel+="<h3>"+arr_infecciosas_carr[0].Name+"</h3>";
               if (arr_infecciosas_carr[0].Description.length>380) {
                 html_infecciosas_carrusel+="<p>"+(arr_infecciosas_carr[0].Description).substring(0,380)+"...</p>";
               }
               else{
                 html_infecciosas_carrusel+="<p>"+arr_infecciosas_carr[0].Description+"</p>";
               }
              html_infecciosas_carrusel+="<a href='vista.php?url_pdf="+arr_infecciosas_carr[0].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_infecciosas_carr[0].ID+"&url_fav="+arr_infecciosas_carr[0].Category.Description+"/"+arr_infecciosas_carr[0].Description+"/"+arr_infecciosas_carr[0].Name+"&nombre="+arr_infecciosas_carr[0].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
              html_infecciosas_carrusel+="<a href='"+arr_infecciosas_carr[0].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
            html_infecciosas_carrusel+="</div>";
          html_infecciosas_carrusel+="</div>";
        html_infecciosas_carrusel+="</div>";

        html_infecciosas_carrusel+="<div class='item'>";
          html_infecciosas_carrusel+="<div class='row'>";
            html_infecciosas_carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
              html_infecciosas_carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
              html_infecciosas_carrusel+="<div style='background-image:url("+arr_infecciosas_carr[1].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/infecciosas.png'></div>";
              if (arr_infecciosas_carr[1].Name.length>70) {
                html_infecciosas_carrusel+="<p class='pdf-para-carr'>"+(arr_infecciosas_carr[1].Name).substring(0,70)+"...</p>";
              }
              else{
                html_infecciosas_carrusel+="<p class='pdf-para-carr'>"+arr_infecciosas_carr[1].Name+"</p>";
              }
              html_infecciosas_carrusel+="</div>";
            html_infecciosas_carrusel+="</div>";
            html_infecciosas_carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
              html_infecciosas_carrusel+="<h3>"+arr_infecciosas_carr[1].Name+"</h3>";
               if (arr_infecciosas_carr[1].Description.length>380) {
                 html_infecciosas_carrusel+="<p>"+(arr_infecciosas_carr[1].Description).substring(0,380)+"...</p>";
               }
               else{
                 html_infecciosas_carrusel+="<p>"+arr_infecciosas_carr[1].Description+"</p>";
               }
              html_infecciosas_carrusel+="<a href='vista.php?url_pdf="+arr_infecciosas_carr[1].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_infecciosas_carr[1].ID+"&url_fav="+arr_infecciosas_carr[1].Category.Description+"/"+arr_infecciosas_carr[1].Description+"/"+arr_infecciosas_carr[1].Name+"&nombre="+arr_infecciosas_carr[1].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
              html_infecciosas_carrusel+="<a href='"+arr_infecciosas_carr[1].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
            html_infecciosas_carrusel+="</div>";
          html_infecciosas_carrusel+="</div>";
        html_infecciosas_carrusel+="</div>";

        html_infecciosas_carrusel+="<div class='item'>";
          html_infecciosas_carrusel+="<div class='row'>";
            html_infecciosas_carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
              html_infecciosas_carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
              html_infecciosas_carrusel+="<div style='background-image:url("+arr_infecciosas_carr[2].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/infecciosas.png'></div>";
              if (arr_infecciosas_carr[2].Name.length>70) {
                html_infecciosas_carrusel+="<p class='pdf-para-carr'>"+(arr_infecciosas_carr[2].Name).substring(0,70)+"...</p>";
              }
              else{
                html_infecciosas_carrusel+="<p class='pdf-para-carr'>"+arr_infecciosas_carr[2].Name+"</p>";
              }
              html_infecciosas_carrusel+="</div>";
            html_infecciosas_carrusel+="</div>";
            html_infecciosas_carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
              html_infecciosas_carrusel+="<h3>"+arr_infecciosas_carr[2].Name+"</h3>";
               if (arr_infecciosas_carr[2].Description.length>380) {
                 html_infecciosas_carrusel+="<p>"+(arr_infecciosas_carr[2].Description).substring(0,380)+"...</p>";
               }
               else{
                 html_infecciosas_carrusel+="<p>"+arr_infecciosas_carr[2].Description+"</p>";
               }
              html_infecciosas_carrusel+="<a href='vista.php?url_pdf="+arr_infecciosas_carr[2].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_infecciosas_carr[2].ID+"&url_fav="+arr_infecciosas_carr[2].Category.Description+"/"+arr_infecciosas_carr[2].Description+"/"+arr_infecciosas_carr[2].Name+"&nombre="+arr_infecciosas_carr[2].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
              html_infecciosas_carrusel+="<a href='"+arr_infecciosas_carr[2].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
            html_infecciosas_carrusel+="</div>";
          html_infecciosas_carrusel+="</div>";
        html_infecciosas_carrusel+="</div>";

        $("#carousel-practicas-head").html(html_infecciosas_carrusel);
      },
      error:function(error){
        console.log(error);
      }
    });
  };
}
function busqueda(){ 
  document.getElementById('section-cronicas').style.display = "none";
  document.getElementById('section-materna').style.display = "none";
  document.getElementById('section-ninez').style.display = "none";
  document.getElementById('section-infecciosas').style.display = "none";

  var form = document.getElementById("form-id");
  document.getElementById("basic-addon2").addEventListener("click", function () {
    form.submit();
  });
  var createCORSRequest = function(method, url) {
  var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // Most browsers.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // IE8 & IE9
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  };

  var urlpar=window.location.search.substr(1);
  var vals=new Array();
  if(urlpar){
    params=urlpar.split('&');
    for(i=0;i<params.length;i++){
      aux=params[i].split('=');
      vals[i]=decodeURIComponent(aux[1]);
    }
  }
  var cronic = -1;
  var matern = -1;
  var niñ = -1;
  var infantil = -1;
  var infecciosas = -1;

  matern = vals[0].indexOf("matern");
  niñ = vals[0].indexOf("niñ");
  infantil = vals[0].indexOf("infantil");
  infecciosas = vals[0].indexOf("infeccio");
  cronic = vals[0].indexOf("cronic");
  if (cronic >= 0) {
    document.getElementById('section-cronicas').style.display = "block";
    document.getElementById('section-materna').style.display = "none";
    document.getElementById('section-ninez').style.display = "none";
    document.getElementById('section-infecciosas').style.display = "none";
  };
  if (matern >= 0) {
    document.getElementById('section-cronicas').style.display = "none";
    document.getElementById('section-materna').style.display = "block";
    document.getElementById('section-ninez').style.display = "none";
    document.getElementById('section-infecciosas').style.display = "none";
  };
  if (niñ >= 0 || infantil >= 0) {
    document.getElementById('section-cronicas').style.display = "none";
    document.getElementById('section-materna').style.display = "none";
    document.getElementById('section-ninez').style.display = "block";
    document.getElementById('section-infecciosas').style.display = "none";
  };
  if (infecciosas >= 0) {
    document.getElementById('section-cronicas').style.display = "none";
    document.getElementById('section-materna').style.display = "none";
    document.getElementById('section-ninez').style.display = "none";
    document.getElementById('section-infecciosas').style.display = "block";
  };

  var url = 'https://fcsapi.azurewebsites.net/api/PDF/Search/'+vals;
  var method = 'GET';
  var xhr = createCORSRequest(method, url);
  xhr.onload = function(data) {
    var json=eval('('+xhr.responseText+')');
  };
  xhr.onerror = function() {
    // Error code goes here.
  };

  xhr.send();
}
function cronicas(){
  if ($(window).width()<=1000) {
    document.getElementById('cronicas-mob').style.display = "block";
    document.getElementById('materna-mob').style.display = "none";
    document.getElementById('ninez-mob').style.display = "none";
    document.getElementById('infecciosas-mob').style.display = "none";
    document.getElementById('banner_cronicas').style.display = "block";
    document.getElementById('banner_materno').style.display = "none";
    document.getElementById('banner_ninez').style.display = "none";
    document.getElementById('banner_infecciosas').style.display = "none";
  }
  else{
    document.getElementById('banner_cronicas').style.display = "block";
    document.getElementById('banner_materno').style.display = "none";
    document.getElementById('banner_ninez').style.display = "none";
    document.getElementById('banner_infecciosas').style.display = "none";
    document.getElementById('cronicas-mob').style.display = "none";
    document.getElementById('materna-mob').style.display = "none";
    document.getElementById('ninez-mob').style.display = "none";
    document.getElementById('infecciosas-mob').style.display = "none";
    document.getElementById('body_nom_cronicas').style.display = "block";
    document.getElementById('body_nom_materna').style.display = "none";
    document.getElementById('body_nom_ninez').style.display = "none";
    document.getElementById('body_nom_infecciosas').style.display = "none";
  }
}
function materna(){
  if ($(window).width()<=1000) {
    document.getElementById('cronicas-mob').style.display = "none";
    document.getElementById('materna-mob').style.display = "block";
    document.getElementById('ninez-mob').style.display = "none";
    document.getElementById('infecciosas-mob').style.display = "none";
    document.getElementById('banner_cronicas').style.display = "none";
    document.getElementById('banner_materno').style.display = "block";
    document.getElementById('banner_ninez').style.display = "none";
    document.getElementById('banner_infecciosas').style.display = "none";
  }
  else{
    document.getElementById('banner_cronicas').style.display = "none";
    document.getElementById('banner_materno').style.display = "block";
    document.getElementById('banner_ninez').style.display = "none";
    document.getElementById('banner_infecciosas').style.display = "none";
    document.getElementById('cronicas-mob').style.display = "none";
    document.getElementById('materna-mob').style.display = "none";
    document.getElementById('ninez-mob').style.display = "none";
    document.getElementById('infecciosas-mob').style.display = "none";
    document.getElementById('body_nom_cronicas').style.display = "none";
    document.getElementById('body_nom_materna').style.display = "block";
    document.getElementById('body_nom_ninez').style.display = "none";
    document.getElementById('body_nom_infecciosas').style.display = "none";
  }
}
function ninez(){
  if ($(window).width()<=1000) {
    document.getElementById('cronicas-mob').style.display = "none";
    document.getElementById('materna-mob').style.display = "none";
    document.getElementById('ninez-mob').style.display = "block";
    document.getElementById('infecciosas-mob').style.display = "none";
    document.getElementById('banner_cronicas').style.display = "none";
    document.getElementById('banner_materno').style.display = "none";
    document.getElementById('banner_ninez').style.display = "block";
    document.getElementById('banner_infecciosas').style.display = "none";
  }
  else{
    document.getElementById('cronicas-mob').style.display = "none";
    document.getElementById('materna-mob').style.display = "none";
    document.getElementById('ninez-mob').style.display = "none";
    document.getElementById('infecciosas-mob').style.display = "none";
    document.getElementById('body_nom_cronicas').style.display = "none";
    document.getElementById('body_nom_materna').style.display = "none";
    document.getElementById('body_nom_ninez').style.display = "block";
    document.getElementById('body_nom_infecciosas').style.display = "none";
    document.getElementById('banner_cronicas').style.display = "none";
    document.getElementById('banner_materno').style.display = "none";
    document.getElementById('banner_ninez').style.display = "block";
    document.getElementById('banner_infecciosas').style.display = "none";
  }
}
function infecciosas(){
  if ($(window).width()<=1000) {
    document.getElementById('cronicas-mob').style.display = "none";
    document.getElementById('materna-mob').style.display = "none";
    document.getElementById('ninez-mob').style.display = "none";
    document.getElementById('infecciosas-mob').style.display = "block";
    document.getElementById('banner_cronicas').style.display = "none";
    document.getElementById('banner_materno').style.display = "none";
    document.getElementById('banner_ninez').style.display = "none";
    document.getElementById('banner_infecciosas').style.display = "block";
  }
  else{
    document.getElementById('cronicas-mob').style.display = "none";
    document.getElementById('materna-mob').style.display = "none";
    document.getElementById('ninez-mob').style.display = "none";
    document.getElementById('infecciosas-mob').style.display = "none";
    document.getElementById('body_nom_cronicas').style.display = "none";
    document.getElementById('body_nom_materna').style.display = "none";
    document.getElementById('body_nom_ninez').style.display = "none";
    document.getElementById('body_nom_infecciosas').style.display = "block";
    document.getElementById('banner_cronicas').style.display = "none";
    document.getElementById('banner_materno').style.display = "none";
    document.getElementById('banner_ninez').style.display = "none";
    document.getElementById('banner_infecciosas').style.display = "block";
  }
}
// function accordian_menu(){
//   document.getElementById('opt-1').style.display = "block";
//   document.getElementById('opt-2').style.display = "block";
//   document.getElementById('opt-3').style.display = "block";
//   document.getElementById('opt-4').style.display = "block";
//   document.getElementById('opt-5').style.display = "block";
//   document.getElementById('opt-6').style.display = "block";
//   document.getElementById('opt-7').style.display = "block";
//   document.getElementById('opt-8').style.display = "block";
//   document.getElementById('opt-9').style.display = "block";
//   document.getElementById('opt-10').style.display = "block";
//   document.getElementById('opt-11').style.display = "block";
//   document.getElementById('opt-12').style.display = "block";
//   $( "#opt-1" ).animate({
//     top: "0px"
//   },100);
//   $( "#opt-2" ).animate({
//     top: "69px"
//   },100);
//   $( "#opt-3" ).animate({
//     top: "135px"
//   },100);
//   $( "#opt-4" ).animate({
//     top: "0px"
//   },100);
//   $( "#opt-5" ).animate({
//     top: "69px"
//   },100);
//   $( "#opt-6" ).animate({
//     top: "135px"
//   },100);
//   $( "#opt-7" ).animate({
//     top: "0px"
//   },100);
//   $( "#opt-8" ).animate({
//     top: "69px"
//   },100);
//   $( "#opt-9" ).animate({
//     top: "135px"
//   },100);
//   $( "#opt-10" ).animate({
//     top: "0px"
//   },100);
//   $( "#opt-11" ).animate({
//     top: "69px"
//   },100);
//   $( "#opt-12" ).animate({
//     top: "135px"
//   },100);
// }
function noticias(page,size,order,opt){
  if (opt==1) {
    document.getElementById('btn_noticias_id_act').style.display = "block";
    document.getElementById('btn_noticias_id_ant').style.display = "none";
  }
  else{
    document.getElementById('btn_noticias_id_act').style.display = "none";
    document.getElementById('btn_noticias_id_ant').style.display = "block";
  }
  /**********************************/
  var params={
    page:page,
    pagesize:size,
    orderby:order,
    show:"2"
  };
  $.ajax({
    type:"GET",
    dataType: "json",
    data: params,
    url: "https://fundacioncsapidevel.azurewebsites.net/api/news"
  })
  .done(function(data) {
    var info = data.Data;
    var total = data.Total;
    // for (var i = 0; i < info.length; i++) {
    //   console.log(info[i]);
    // };
    html="";
    html_dem="";
    var url_get = "";
    j = 6; 
    k = 12;
    for (var i = 0; i < info.length; i++) {

        //console.log(info[i]);
        if( info[i].ID == 289) {
            console.log("Error en el objecto info[i].Teaser de la noticia ID 289:");
            console.log(info[i]);
            info[i].Teaser = '';
            //continue;
        }
      url_get = info[i].ID;
      if ((i+1) > 6) {
        break;
      };
      html+="<a href='noticias.php?new="+url_get+"&img="+info[i].ImageUrl+"&title="+info[i].Title+"&teaser="+info[i].Teaser+"'><div class='noticia-prev'>";
      html+="<div style='background-image:url("+info[i].ImageUrl+")' class='img-noticia-prev'></div>";
      if ((info[i].Title).length>100) {
        html+="<p class='noticia-para'>"+(info[i].Title).substring(0,90)+"...</p>";
      }
      else{
        html+="<p class='noticia-para'>"+(info[i].Title)+"</p>";
      }
      html+="</div></a>";
    };
    for (i = 0; i < 5; i++) {
      html_dem+="<div id='news_block_"+(i+1).toString()+"' class='new_sec_all'>";
      for (var j = j; j < k; j++) {
        if ((j+1) > info.length) {
          break;
        };
        url_get = info[j].ID;
        html_dem+="<a href='noticias.php?new="+url_get+"&img="+info[i].ImageUrl+"&title="+info[i].Title+"&teaser="+info[i].Teaser+"'><div class='noticia-prev'>";
        html_dem+="<div style='background-image:url("+info[j].ImageUrl+")' class='img-noticia-prev'></div>";
  
        if ((info[j].Title).length>100) {
          html_dem+="<p class='noticia-para'>"+(info[j].Title).substring(0,90)+"...</p>";
        }
        else{
          html_dem+="<p class='noticia-para'>"+(info[j].Title)+"</p>";
        }
        html_dem+="</div></a>";
      }
      k = k+6;
      html_dem+="</div>";
    };
    $("#primera_seccion").html(html);
    $("#dem_news").html(html_dem);
  });
}


var cont_new;
function muestra_noticias(){
  
  if (!cont_new) {
    cont_new = 1;
  }

  $("#news_block_"+cont_new).addClass(function(index){  
    cont_new = cont_new + 1;
    if (cont_new==6) {
      document.getElementById('btn_noticias_id_all').style.display = "none";
    };
    return 'show';
  });

  return true;
}

function sec_catalogo(){
  $(".opt-1").mouseout(function(){
    actMenu=false;
    timeout = setTimeout(function(){hide_menu();}, 200);
  });
  $(".opt-2").mouseout(function(){
    actMenu=false;
    timeout = setTimeout(function(){hide_menu();}, 200);
  });
  $(".opt-3").mouseout(function(){
    actMenu=false;
    timeout = setTimeout(function(){hide_menu();}, 200);
  });
  $(".title-text-right").mouseout(function(){
    actMenu=false;
    timeout = setTimeout(function(){hide_menu();}, 200);
  });

  $(".opt-1").mouseover(function(){
    actMenu = true 
    accordian_menu();
  });
  $(".opt-2").mouseover(function(){
    actMenu = true 
    accordian_menu();
  });
  $(".opt-3").mouseover(function(){
    actMenu = true 
    accordian_menu();
  });
  $('.carousel-prev').carousel({
    interval: 0
  });
  
  $('#opt-2').click(function(){
    document.getElementById('cat-section-cronicas-alfa').style.display = "block";
    document.getElementById('cat-section-cronicas').style.display = "none";
    $(".title-text-right").html("Filtrado por: |  Nombre");
  });
  $('#opt-5').click(function(){
    document.getElementById('cat-section-materna-alfa').style.display = "block";
    document.getElementById('cat-section-materna').style.display = "none";
    $(".title-text-right").html("Filtrado por: |  Nombre");
  });
  $('#opt-8').click(function(){
    document.getElementById('cat-section-ninez-alfa').style.display = "block";
    document.getElementById('cat-section-ninez').style.display = "none";
    $(".title-text-right").html("Filtrado por: |  Nombre");
  });
  $('#opt-11').click(function(){
    document.getElementById('cat-section-infecciosas-alfa').style.display = "block";
    document.getElementById('cat-section-infecciosas').style.display = "none";
    $(".title-text-right").html("Filtrado por: |  Nombre");
  });
}
var actMenu=false;
var timeout;
function hide_menu(){
  if(!actMenu){
    document.getElementById('opt-1').style.top = "0px";
    document.getElementById('opt-2').style.top = "0px";
    document.getElementById('opt-3').style.top = "0px";
    document.getElementById('opt-4').style.top = "0px";
    document.getElementById('opt-5').style.top = "0px";
    document.getElementById('opt-6').style.top = "0px";
    document.getElementById('opt-7').style.top = "0px";
    document.getElementById('opt-8').style.top = "0px";
    document.getElementById('opt-9').style.top = "0px";
    document.getElementById('opt-10').style.top = "0px";
    document.getElementById('opt-11').style.top = "0px";
    document.getElementById('opt-12').style.top = "0px";
    document.getElementById('opt-1').style.display = "none";
    document.getElementById('opt-2').style.display = "none";
    document.getElementById('opt-3').style.display = "none";
    document.getElementById('opt-4').style.display = "none";
    document.getElementById('opt-5').style.display = "none";
    document.getElementById('opt-6').style.display = "none";
    document.getElementById('opt-7').style.display = "none";
    document.getElementById('opt-8').style.display = "none";
    document.getElementById('opt-9').style.display = "none";
    document.getElementById('opt-10').style.display = "none";
    document.getElementById('opt-11').style.display = "none";
    document.getElementById('opt-12').style.display = "none";
    clearTimeout(timeout);
  }
}
$( document ).ready(function(e) {
  $(window).resize(function (){
    if ($(window).width()>=900) {
      document.getElementById("banner_cronicas_img").src = "img/banner_cronicas1680.jpg";
      document.getElementById("banner_materno_img").src = "img/banner_materno1680.jpg";
      document.getElementById("banner_ninez_img").src = "img/banner_ninez1680.jpg";
      document.getElementById("banner_infecciosas_img").src = "img/banner_infecciosas1680.jpg";
    }
    if ($(window).width()<900) {
      document.getElementById("banner_cronicas_img").src = "img/banner_cronicas750.jpg";
      document.getElementById("banner_materno_img").src = "img/banner_materno750.jpg";
      document.getElementById("banner_ninez_img").src = "img/banner_ninez750.jpg";
      document.getElementById("banner_infecciosas_img").src = "img/banner_infecciosas750.jpg";
    }
  });
  if ($(window).width()<900) {
      document.getElementById("banner_cronicas_img").src = "img/banner_cronicas750.jpg";
      document.getElementById("banner_materno_img").src = "img/banner_materno750.jpg";
      document.getElementById("banner_ninez_img").src = "img/banner_ninez750.jpg";
      document.getElementById("banner_infecciosas_img").src = "img/banner_infecciosas750.jpg";
    }
  $( "#form_change_pass" ).submit(function( event ) {
    event.preventDefault();
    var token = get_token();
    var credentials = "Bearer" + " " + token;

    var urlredit = 'https://fundacioncsapidevel.azurewebsites.net/api/Account/ChangePassword';
    var old_pass = $("#old_pass").val();
    var new_pass = $("#new_pass").val();
    var confirm_pass = $("#confirm_pass").val();

      if ($("#old_pass").val()!="" && $("#new_pass").val()!="" && $("#confirm_pass").val()!="") {
        if (new_pass == confirm_pass) {
          var JPDF={
            OldPassword: old_pass,
            NewPassword: new_pass,
            ConfirmPassword: confirm_pass
            
          };

          $.ajax({
            type:"PUT",
            url:urlredit,
            data:JPDF,
            beforeSend:function(request){
              request.withCredentials=true;
              request.setRequestHeader("Authorization",credentials);
            },
            success:function(resp){
              console.log(resp);
              document.getElementById('pre_pass_change').style.display   ='none' ;
              document.getElementById('form_change_pass').style.display  ='none' ;
              document.getElementById('post_pass_change').style.display  ='block';
            },
            error:function(e){
              console.log(e,JPDF);
              alert("Ocurrió un error, Intente más tarde!");
              document.getElementById('pre_pass_change').style.display   ='block' ;
              document.getElementById('form_change_pass').style.display  ='block' ;
              document.getElementById('post_pass_change').style.display  ='none';
            }
          });
        }
        else{
          alert("Las contraseñas no coinciden");
        }
      }
      else{
        alert("Todos los campos son necesarios para continuar!");
      }
  });
  
  $( "#form-fav" ).submit(function( event ) {
    event.preventDefault();
    
    var val_id_pdf = $("#id_pdf").val();
    var lista = document.cookie.split(";");
    
    var token = get_token();

    if (token != "NULL") {
      var credentials = "Bearer" + " " + token;

      var JPDFAV={
        PDFID: val_id_pdf
      };

      $.ajax({
        type:"POST",
        url:"https://fundacioncsapidevel.azurewebsites.net/api/pdfuserfavorites",
        data:JPDFAV,
        beforeSend:function(request){
          request.withCredentials=true;
          request.setRequestHeader("Authorization",credentials);
        },
        success:function(path){
          document.getElementById('save_msg').style.display = 'none';
          document.getElementById('btn_fav_agrega').style.display = 'none';
          document.getElementById('btn_fav_elimina').style.display = 'block';
        },
        error:function(error){
          alert("Error al Guardar. Intente más tarde");
        }
      });
    }
    else{
      alert("Debe iniciar Sesión para poder agregar a Favoritos");
    }   
  });

  $( "#form-fav-delete" ).submit(function( event ) {
    event.preventDefault();
    
    var val_id_pdf = $("#id_pdf").val();
    var lista = document.cookie.split(";");
    var token       = get_token();
    var credentials = "Bearer" + " " + token;
    var pdf_fav_url = "https://fundacioncsapidevel.azurewebsites.net/api/pdfuserfavorites/"+val_id_pdf

    if (token != "NULL") {
      $.ajax({
        type:"GET",
        async: false,
        url:pdf_fav_url,
        beforeSend:function(request){
          request.withCredentials=true;
          request.setRequestHeader("Authorization",credentials);
        },
        success:function(path){
          var pdf_fav_delete = "http://fundacioncsapidevel.azurewebsites.net/api/pdfuserfavorites/"+path.ID;
          $.ajax({
            type:"DELETE",
            async: false,
            url:pdf_fav_delete,
            beforeSend:function(request){
              request.withCredentials=true;
              request.setRequestHeader("Authorization",credentials);
            },
            success:function(path){
              document.getElementById('save_msg').style.display = 'none';
              document.getElementById('btn_fav_agrega').style.display = 'block';
              document.getElementById('btn_fav_elimina').style.display = 'none';
            },
            error:function(error){
              console.log(error);
            }
          });  
        },
        error:function(error){
          console.log(error);
        }
      });
    }  
  });

  function informacion_navegador(){
    $("#pdf").height(screen.height-310);
  }
  var datos= new informacion_navegador();
  $('.carousel').carousel();
  var createCORSRequest = function(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // Most browsers.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // IE8 & IE9
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  };

  var url = 'http://fundacioncsapidevel.azurewebsites.net/api/PDF/';
  var method = 'GET';
  var xhr = createCORSRequest(method, url);
  xhr.onload = function(data) {
    var json=eval('('+xhr.responseText+')');
    var carrusel = "";
    var carrusel_item = "";
    for (var i = 0; i < 1; i++) {
      if (json[i].CategoryID==1) {
          carrusel+="<div class='row'>";
          carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
            carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
            carrusel+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/cronicas.png'></div>";
            carrusel+="<p class='pdf-para-carr'>"+json[i].Name+"</p>";
            carrusel+="</div>";
          carrusel+="</div>";
          carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
            carrusel+="<h3>"+json[i].Name+"</h3>";
            carrusel+="<p>"+json[i].Description+"</p>";
            carrusel+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
            carrusel+="<a href='"+json[i].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
          carrusel+="</div>";
        carrusel+="</div>";
      };
      if (json[i].CategoryID==2) {
          carrusel+="<div class='row'>";
          carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
            carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
            carrusel+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/materna.png'></div>";
            carrusel+="<p class='pdf-para-carr'>"+json[i].Name+"</p>";
            carrusel+="</div>";
          carrusel+="</div>";
          carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
            carrusel+="<h3>"+json[i].Name+"</h3>";
            carrusel+="<p>"+json[i].Description+"</p>";
            carrusel+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
            carrusel+="<a href='"+json[i].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
          carrusel+="</div>";
        carrusel+="</div>";
      };
      if (json[i].CategoryID==3) {
          carrusel+="<div class='row'>";
          carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
            carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
            carrusel+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/ninez.png'></div>";
            carrusel+="<p class='pdf-para-carr'>"+json[i].Name+"</p>";
            carrusel+="</div>";
          carrusel+="</div>";
          carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
            carrusel+="<h3>"+json[i].Name+"</h3>";
            carrusel+="<p>"+json[i].Description+"</p>";
            carrusel+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
            carrusel+="<a href='"+json[i].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
          carrusel+="</div>";
        carrusel+="</div>";
      };
      if (json[i].CategoryID==4) {
          carrusel+="<div class='row'>";
          carrusel+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
            carrusel+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
            carrusel+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/infecciosas.png'></div>";
            carrusel+="<p class='pdf-para-carr'>"+json[i].Name+"</p>";
            carrusel+="</div>";
          carrusel+="</div>";
          carrusel+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
            carrusel+="<h3>"+json[i].Name+"</h3>";
            carrusel+="<p>"+json[i].Description.substring(0,180)+"</p>";
            carrusel+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
            carrusel+="<a href='"+json[i].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
          carrusel+="</div>";
        carrusel+="</div>";
      };
    };
    for (var i = 1; i <= 3; i++) {
      if (i==3) {break;};
      if (json[i].CategoryID==1) {
        carrusel_item+="<div class='item' style='margin-top:40px'";
          carrusel_item+="<div class='row'>";
            carrusel_item+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
              carrusel_item+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
              carrusel_item+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/cronicas.png'></div>";
              carrusel_item+="<p class='pdf-para-carr'>"+json[i].Name+"</p>";
              carrusel_item+="</div>";
            carrusel_item+="</div>";
            carrusel_item+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
              carrusel_item+="<h3>"+json[i].Name+"</h3>";
              carrusel_item+="<p>"+json[i].Description+"</p>";
              carrusel_item+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
              carrusel_item+="<a href='"+json[i].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
            carrusel_item+="</div>";
          carrusel_item+="</div>";
        carrusel_item+="</div>";
      };
      if (json[i].CategoryID==2) {
        carrusel_item+="<div class='item' style='margin-top:40px'>";
          carrusel_item+="<div class='row'>";
            carrusel_item+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
              carrusel_item+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
              carrusel_item+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/materna.png'></div>";
              carrusel_item+="<p class='pdf-para-carr'>"+json[i].Name+"</p>";
              carrusel_item+="</div>";
            carrusel_item+="</div>";
            carrusel_item+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
              carrusel_item+="<h3>"+json[i].Name+"</h3>";
              carrusel_item+="<p>"+json[i].Description+"</p>";
              carrusel_item+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
              carrusel_item+="<a href='"+json[i].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
            carrusel_item+="</div>";
          carrusel_item+="</div>";
        carrusel_item+="</div>";
      };
      if (json[i].CategoryID==3) {
        carrusel_item+="<div class='item' style='margin-top:40px'>";
          carrusel_item+="<div class='row'>";
            carrusel_item+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
              carrusel_item+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
              carrusel_item+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/ninez.png'></div>";
              carrusel_item+="<p class='pdf-para-carr'>"+json[i].Name+"</p>";
              carrusel_item+="</div>";
            carrusel_item+="</div>";
            carrusel_item+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
              carrusel_item+="<h3>"+json[i].Name+"</h3>";
              carrusel_item+="<p>"+json[i].Description+"</p>";
              carrusel_item+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
              carrusel_item+="<a href='"+json[i].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
            carrusel_item+="</div>";
          carrusel_item+="</div>";
        carrusel_item+="</div>";
      };
      if (json[i].CategoryID==4) {
        carrusel_item+="<div class='item' style='margin-top:40px'>";
          carrusel_item+="<div class='row'>";
            carrusel_item+="<div style='text-align:center' class='img-slider col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-0'>";
              carrusel_item+="<div class='pdf-prev' style='width:250px; height:270px !important'>";
              carrusel_item+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-car'><img class='img_carr_sec' src='img/infecciosas.png'></div>";
              carrusel_item+="<p class='pdf-para-carr'>"+json[i].Name+"</p>";
              carrusel_item+="</div>";
            carrusel_item+="</div>";
            carrusel_item+="<div class='txt-slider col-sm-9 col-md-10 col-md-offset-1 col-lg-7 col-lg-offset-2'>";
              carrusel_item+="<h3>"+json[i].Name+"</h3>";
              carrusel_item+="<p>"+json[i].Description+"</p>";
              carrusel_item+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta' style='margin-right:10px'>Consultar</button></a>";
              carrusel_item+="<a href='"+json[i].MediaObject[1].PDFMediaObject.URL+"' target='_blank'><button class='btn btn-descarga'>Descargar</button></a>";
            carrusel_item+="</div>";
          carrusel_item+="</div>";
        carrusel_item+="</div>";
      };
    };
    $("#item_active_car").html(carrusel);
    $( "#item_active_car" ).after( carrusel_item );
    var html="";
    var indicators1 = "";
    var indicators2 = "";
    var indicators3 = "";
    var indicators4 = "";
    arr_cronicas = [];
    arr_materno = [];
    arr_ninez = [];
    arr_infecciosas = [];
    for( i= 0; i < json.length; i++){
      if (json[i].CategoryID == 1) {
        arr_cronicas.push(json[i]);
      };
      if (json[i].CategoryID == 2) {
        arr_materno.push(json[i]);
      };
      if (json[i].CategoryID == 3) {
        arr_ninez.push(json[i]);
      };
      if (json[i].CategoryID == 4) {
        arr_infecciosas.push(json[i]);
      };
    }
    var k = 4;
    var l = 8;
    var y = (arr_cronicas.length+1) % 4;
    var z = Math.floor(arr_cronicas.length/4);
    if (y != 0) {
      z++;
    };
    for (var i = 0; i < z ; i++) {
      if (i==0) {
        indicators1+="<li data-target='#carousel-example-generic5' data-slide-to='"+i+"' class='active'></li>";
      }
      else{
        indicators1+="<li data-target='#carousel-example-generic5' data-slide-to='"+i+"'></li>";
      }
    };
    $("#carr_gene_sup1").html(indicators1);
    for(i=1;i<2;i++){
      html += "<div class='item active'>";
      for (var j = 0; j < arr_cronicas.length; j++) {
        if ((j+1) > 4) {
          break;
        };
        try{
          html+="<div class='pdf-prev'>";
          html+="<div style='background-image:url("+arr_cronicas[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
          html+="<a href='vista.php?url_pdf="+arr_cronicas[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_cronicas[j].ID+"&url_fav="+arr_cronicas[j].Category.Description+"/"+arr_cronicas[j].Description+"/"+arr_cronicas[j].Name+"&nombre="+arr_cronicas[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
          html+="<p class='pdf-para'>"+arr_cronicas[j].Name+"</p>";
          html+="</div>";
        }catch(err){
          console.log(err.message);
        }
      };
      html+="</div>";
    }
    for(i=1;i<(z-1);i++){
      html += "<div class='item'>";
      for (j = k; j < l; j++) {
        try{
          html+="<div class='pdf-prev'>";
          html+="<div style='background-image:url("+arr_cronicas[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
          html+="<a href='vista.php?url_pdf="+arr_cronicas[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_cronicas[j].ID+"&url_fav="+arr_cronicas[j].Category.Description+"/"+arr_cronicas[j].Description+"/"+arr_cronicas[j].Name+"&nombre="+arr_cronicas[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
          html+="<p class='pdf-para'>"+arr_cronicas[j].Name+"</p>";
          html+="</div>";
        }catch(err){
          console.log(err.message);
        }
      };
      k= k+4;
      l= l+4;
      html+="</div>";
      // console.log(i);
    }
    for(i=(z-1); i < z ;i++){
      html += "<div class='item'>";
      for (j = k; j < (l-2); j++) {
        try{
          html+="<div class='pdf-prev'>";
          html+="<div style='background-image:url("+arr_cronicas[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
          html+="<a href='vista.php?url_pdf="+arr_cronicas[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_cronicas[j].ID+"&url_fav="+arr_cronicas[j].Category.Description+"/"+arr_cronicas[j].Description+"/"+arr_cronicas[j].Name+"&nombre="+arr_cronicas[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
          html+="<p class='pdf-para'>"+arr_cronicas[j].Name+"</p>";
          html+="</div>";
        }catch(err){
          console.log(err.message);
        }
      };
      html+="</div>";
    }
    $("#cronicas-cont").html(html);
    
    var html="";
    var k = 4;
    var l = 8;
    var y = (arr_materno.length+1) % 4;
    var z = Math.floor(arr_materno.length/4);
    if (y != 0) {
      z++;
    };
    for (var i = 0; i < z ; i++) {
      if (i==0) {
        indicators2+="<li data-target='#carousel-example-generic1' data-slide-to='"+i+"' class='active'></li>";
      }
      else{
        indicators2+="<li data-target='#carousel-example-generic1' data-slide-to='"+i+"'></li>";
      }
    };
    $("#carr_gene_sup2").html(indicators2);
    for(i=1;i<2;i++){
      html += "<div class='item active'>";
      for (var j = 0; j < arr_materno.length; j++) {
        if ((j+1) > 4) {
          break;
        };
        try{
          html+="<div class='pdf-prev'>";
          html+="<div style='background-image:url("+arr_materno[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
          html+="<a href='vista.php?url_pdf="+arr_materno[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_materno[j].ID+"&url_fav="+arr_materno[j].Category.Description+"/"+arr_materno[j].Description+"/"+arr_materno[j].Name+"&nombre="+arr_materno[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
          html+="<p class='pdf-para'>"+arr_materno[j].Name+"</p>";
          html+="</div>";
        }catch(err){
          console.log(err.message);
        }
      };
      html+="</div>";
    }
    for(i=1;i<(z-1);i++){
      html += "<div class='item'>";
      for (j = k; j < l; j++) {
        try{
          html+="<div class='pdf-prev'>";
          html+="<div style='background-image:url("+arr_materno[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
          html+="<a href='vista.php?url_pdf="+arr_materno[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_materno[j].ID+"&url_fav="+arr_materno[j].Category.Description+"/"+arr_materno[j].Description+"/"+arr_materno[j].Name+"&nombre="+arr_materno[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
          html+="<p class='pdf-para'>"+arr_materno[j].Name+"</p>";
          html+="</div>";
        }catch(err){
          console.log(err.message);
        }
      };
      k= k+4;
      l= l+4;
      html+="</div>";
      // console.log(i);
    }
    for(i=(z-1); i < z ;i++){
      html += "<div class='item'>";
      for (j = k; j < (l-2); j++) {
        try{
          html+="<div class='pdf-prev'>";
          html+="<div style='background-image:url("+arr_materno[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
          html+="<a href='vista.php?url_pdf="+arr_materno[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_materno[j].ID+"&url_fav="+arr_materno[j].Category.Description+"/"+arr_materno[j].Description+"/"+arr_materno[j].Name+"&nombre="+arr_materno[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
          html+="<p class='pdf-para'>"+arr_materno[j].Name+"</p>";
          html+="</div>";
        }catch(err){
          // console.log(err.message);
        }
      };
      html+="</div>";
    }
    $("#materno-cont").html(html);
    var html="";
    var k = 4;
    var l = 8;
    var y = (arr_ninez.length+1) % 4;
    var z = Math.floor(arr_ninez.length/4);
    if (y != 0) {
      z++;
    };
    for (var i = 0; i < z ; i++) {
      if (i==0) {
        indicators3+="<li data-target='#carousel-example-generic3' data-slide-to='"+i+"' class='active'></li>";
      }
      else{
        indicators3+="<li data-target='#carousel-example-generic3' data-slide-to='"+i+"'></li>";
      }
    };
    $("#carr_gene_sup3").html(indicators3);
    for(i=1;i<2;i++){
      html += "<div class='item active'>";
      for (var j = 0; j < arr_ninez.length; j++) {
        if ((j+1) > 4) {
          break;
        };
        try{
          html+="<div class='pdf-prev'>";
          html+="<div style='background-image:url("+arr_ninez[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
          html+="<a href='vista.php?url_pdf="+arr_ninez[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_ninez[j].ID+"&url_fav="+arr_ninez[j].Category.Description+"/"+arr_ninez[j].Description+"/"+arr_ninez[j].Name+"&nombre="+arr_ninez[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
          html+="<p class='pdf-para'>"+arr_ninez[j].Name+"</p>";
          html+="</div>";
        }catch(err){
          console.log(err.message);
        }
      };
      html+="</div>";
    }
    for(i=1;i<(z-1);i++){
      html += "<div class='item'>";
      for (j = k; j < l; j++) {
        try{
          html+="<div class='pdf-prev'>";
          html+="<div style='background-image:url("+arr_ninez[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
          html+="<a href='vista.php?url_pdf="+arr_ninez[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_ninez[j].ID+"&url_fav="+arr_ninez[j].Category.Description+"/"+arr_ninez[j].Description+"/"+arr_ninez[j].Name+"&nombre="+arr_ninez[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
          html+="<p class='pdf-para'>"+arr_ninez[j].Name+"</p>";
          html+="</div>";
        }catch(err){
          console.log(err.message);
        }
      };
      k= k+4;
      l= l+4;
      html+="</div>";
      // console.log(i);
    }
    for(i=(z-1); i < z ;i++){
      html += "<div class='item'>";
      for (j = k; j < (l-2); j++) {
        try{
          html+="<div class='pdf-prev'>";
          html+="<div style='background-image:url("+arr_ninez[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
          html+="<a href='vista.php?url_pdf="+arr_ninez[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_ninez[j].ID+"&url_fav="+arr_ninez[j].Category.Description+"/"+arr_ninez[j].Description+"/"+arr_ninez[j].Name+"&nombre="+arr_ninez[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
          html+="<p class='pdf-para'>"+arr_ninez[j].Name+"</p>";
          html+="</div>";
        }catch(err){
          // console.log(err.message);
        }
      };
      html+="</div>";
    }
    $("#ninez-cont").html(html);
    var html="";
    var k = 4;
    var l = 8;
    var y = (arr_infecciosas.length+1) % 4;
    var z = Math.floor(arr_infecciosas.length/4);
    if (y != 0) {
      z++;
    };
    for (var i = 0; i < z ; i++) {
      if (i==0) {
        indicators4+="<li data-target='#carousel-example-generic4' data-slide-to='"+i+"' class='active'></li>";
      }
      else{
        indicators4+="<li data-target='#carousel-example-generic4' data-slide-to='"+i+"'></li>";
      }
    };
    $("#carr_gene_sup4").html(indicators4);
    for(i=1;i<2;i++){
      html += "<div class='item active'>";
      for (var j = 0; j < arr_infecciosas.length; j++) {
        if ((j+1) > 4) {
          break;
        };
        try{
          html+="<div class='pdf-prev'>";
          html+="<div style='background-image:url("+arr_infecciosas[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
          html+="<a href='vista.php?url_pdf="+arr_infecciosas[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_infecciosas[j].ID+"&url_fav="+arr_infecciosas[j].Category.Description+"/"+arr_infecciosas[j].Description+"/"+arr_infecciosas[j].Name+"&nombre="+arr_infecciosas[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
          html+="<p class='pdf-para'>"+arr_infecciosas[j].Name+"</p>";
          html+="</div>";
        }catch(err){
          console.log(err.message);
        }
      };
      html+="</div>";
    }
    for(i=1;i<(z-1);i++){
      html += "<div class='item'>";
      for (j = k; j < l; j++) {
        try{
          html+="<div class='pdf-prev'>";
          html+="<div style='background-image:url("+arr_infecciosas[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
          html+="<a href='vista.php?url_pdf="+arr_infecciosas[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_infecciosas[j].ID+"&url_fav="+arr_infecciosas[j].Category.Description+"/"+arr_infecciosas[j].Description+"/"+arr_infecciosas[j].Name+"&nombre="+arr_infecciosas[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
          html+="<p class='pdf-para'>"+arr_infecciosas[j].Name+"</p>";
          html+="</div>";
        }catch(err){
          console.log(err.message);
        }
      };
      k= k+4;
      l= l+4;
      html+="</div>";
      // console.log(i);
    }
    for(i=(z-1); i < z ;i++){
      html += "<div class='item'>";
      for (j = k; j < (l-2); j++) {
        try{
          html+="<div class='pdf-prev'>";
          html+="<div style='background-image:url("+arr_infecciosas[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
          html+="<a href='vista.php?url_pdf="+arr_infecciosas[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+arr_infecciosas[j].ID+"&url_fav="+arr_infecciosas[j].Category.Description+"/"+arr_infecciosas[j].Description+"/"+arr_infecciosas[j].Name+"&nombre="+arr_infecciosas[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
          html+="<p class='pdf-para'>"+arr_infecciosas[j].Name+"</p>";
          html+="</div>";
        }catch(err){
          // console.log(err.message);
        }
      };
      html+="</div>";
    }
    $("#infecciosas-cont").html(html);
    var html_cronicas="";
    var html_materno="";
    var html_ninez="";
    var html_infecciosas="";

    var cont_cronicas = 0;
    var cont_materno = 0;
    var cont_ninez = 0;
    var cont_infecciosas = 0;
    
    var html_ninez_mob="";
    var html_infecciosas_mob="";
    var html_cronicas_mob="";
    var html_materno_mob="";

    var html_ninez_guias="";
    var html_infecciosas_guias="";
    var html_cronicas_guias="";
    var html_materno_guias="";

    for( i= 0; i < json.length; i++){
      if (json[i].CategoryID == 1) {
        cont_cronicas++;
        try{
          html_cronicas+="<div class='pdf-cat'>";
          html_cronicas+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-cat'></div>";
          html_cronicas+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta-pdf' style='background-color:#f00007; color: white'>Consultar</button></a>";
          html_cronicas+="<p class='pdf-para'>"+json[i].Name+"</p>";
          html_cronicas+="</div>";
        }catch(err){
          console.log(err.message);
        }
        $("#cat-section-cronicas").html(html_cronicas);

        try{
          html_cronicas_mob+="<div class='pdf-prev-mob' style='width:42%; margin-right:4%;margin-left:4%;'>";
          html_cronicas_mob+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-mob'></div>";
          html_cronicas_mob+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn  btn-consulta-pdf-mob' style='background-color:#f00007; color: white'>Consultar</button></a>";
          html_cronicas_mob+="<p class='pdf-para-mob'>"+json[i].Name+"</p>";
          html_cronicas_mob+="</div>";
        }catch(err){
          console.log(err.message);
        }
        $("#pdf-cat-mob-cronicas").html(html_cronicas_mob);
      }
      if(json[i].CategoryID == 2) {
        try{
          cont_materno++;
          html_materno+="<div class='pdf-cat'>";
          html_materno+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-cat'></div>";
          html_materno+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta-pdf' style='background-color:#f80084; color: white'>Consultar</button></a>";
          html_materno+="<p class='pdf-para'>"+json[i].Name+"</p>";
          html_materno+="</div>";
        }catch(err){
          console.log(err.message);
        }
        $("#cat-section-materna").html(html_materno);
        try{
          html_materno_mob+="<div class='pdf-prev-mob' style='width:42%; margin-right:4%;margin-left:4%;'>";
          html_materno_mob+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-mob'></div>";
          html_materno_mob+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn  btn-consulta-pdf-mob' style='background-color:#f9339d; color: white'>Consultar</button></a>";
          html_materno_mob+="<p class='pdf-para-mob'>"+json[i].Name+"</p>";
          html_materno_mob+="</div>";
        }catch(err){
          console.log(err.message);
        }
        $("#pdf-cat-mob-materno").html(html_materno_mob);
      };
      if (json[i].CategoryID == 3) {
        try{
          cont_ninez++;
          html_ninez+="<div class='pdf-cat'>";
          html_ninez+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-cat'></div>";
          html_ninez+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta-pdf' style='background-color:#ff7f00; color: white'>Consultar</button></a>";
          html_ninez+="<p class='pdf-para'>"+json[i].Name+"</p>";
          html_ninez+="</div>";
        }catch(err){
          console.log(err.message);
        }
        $("#cat-section-ninez").html(html_ninez);

        try{
          html_ninez_mob+="<div class='pdf-prev-mob' style='width:42%; margin-right:4%;margin-left:4%;'>";
          html_ninez_mob+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-mob'></div>";
          html_ninez_mob+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn  btn-consulta-pdf-mob' style='background-color:#FF8B17; color: white'>Consultar</button></a>";
          html_ninez_mob+="<p class='pdf-para-mob'>"+json[i].Name+"</p>";
          html_ninez_mob+="</div>";
        }catch(err){
          console.log(err.message);
        }
        $("#pdf-cat-mob-ninez").html(html_ninez_mob);
      }
      if(json[i].CategoryID == 4) {
        try{
          cont_infecciosas++;
          html_infecciosas+="<div class='pdf-cat'>";
          html_infecciosas+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-cat'></div>";
          html_infecciosas+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-consulta-pdf' style='background-color:#00a1f0; color: white'>Consultar</button></a>";
          html_infecciosas+="<p class='pdf-para'>"+json[i].Name+"</p>";
          html_infecciosas+="</div>";
        }catch(err){
          console.log(err.message);
        }
        $("#cat-section-infecciosas").html(html_infecciosas);
        try{
          html_infecciosas_mob+="<div class='pdf-prev-mob' style='width:42%; margin-right:4%;margin-left:4%;'>";
          html_infecciosas_mob+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev-mob'></div>";
          html_infecciosas_mob+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn  btn-consulta-pdf-mob' style='background-color:#00a1f0; color: white'>Consultar</button></a>";
          html_infecciosas_mob+="<p class='pdf-para-mob'>"+json[i].Name+"</p>";
          html_infecciosas_mob+="</div>";
        }catch(err){
          console.log(err.message);
        }
        $("#pdf-cat-mob-infecciosas").html(html_infecciosas_mob);
      };
    }

    $("#num_pdfs_cronicas").text(cont_cronicas);
    $("#num_pdfs_materno").text(cont_materno);
    $("#num_pdfs_ninez").text(cont_ninez);
    $("#num_pdfs_infecciosas").text(cont_infecciosas);
    
    var html="";
    for(i=0;i<4;i++){
      try{
        html+="<div class='pdf-prev'>";
        html+="<div style='background-image:url("+json[i].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-prev'></div>";
        html+="<a href='vista.php?url_pdf="+json[i].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[i].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
        html+="<p class='pdf-para'>"+json[i].Name+"</p>";
        html+="</div>";
      }catch(err){
        // console.log(err.message);
      }
      $("#prueba-fav").html(html);
    }

    html_alfa_cronicas="";
    html_alfa_materno="";
    html_alfa_ninez="";
    html_alfa_infecciosas="";
    arr = []
    for( i= 0; i < json.length; i++){
      arr.push(json[i].Name);
    }
    arr.sort();
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (json[j].Name == arr[i]) {
          if (json[j].CategoryID == 1) {
            try{
              html_alfa_cronicas+="<div class='pdf-cat'>";
              html_alfa_cronicas+="<div style='background-image:url("+json[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-cat'></div>";
              html_alfa_cronicas+="<a href='vista.php?url_pdf="+json[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
              html_alfa_cronicas+="<p class='pdf-para'>"+json[j].Name+"</p>";
              html_alfa_cronicas+="</div>";
            }catch(err){
              console.log(err.message);
            }
            $("#cat-section-cronicas-alfa").html(html_alfa_cronicas);
          };
          if (json[j].CategoryID == 2) {
            try{
              html_alfa_materno+="<div class='pdf-cat'>";
              html_alfa_materno+="<div style='background-image:url("+json[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-cat'></div>";
              html_alfa_materno+="<a href='vista.php?url_pdf="+json[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
              html_alfa_materno+="<p class='pdf-para'>"+json[j].Name+"</p>";
              html_alfa_materno+="</div>";
            }catch(err){
              console.log(err.message);
            }
            $("#cat-section-materna-alfa").html(html_alfa_materno);
          };
          if (json[j].CategoryID == 3) {
            try{
              html_alfa_ninez+="<div class='pdf-cat'>";
              html_alfa_ninez+="<div style='background-image:url("+json[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-cat'></div>";
              html_alfa_ninez+="<a href='vista.php?url_pdf="+json[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
              html_alfa_ninez+="<p class='pdf-para'>"+json[j].Name+"</p>";
              html_alfa_ninez+="</div>";
            }catch(err){
              console.log(err.message);
            }
            $("#cat-section-ninez-alfa").html(html_alfa_ninez);
          };
          if (json[j].CategoryID == 4) {
            try{
              html_alfa_infecciosas+="<div class='pdf-cat'>";
              html_alfa_infecciosas+="<div style='background-image:url("+json[j].MediaObject[0].PDFMediaObject.URL+")' class='img-pdf-cat'></div>";
              html_alfa_infecciosas+="<a href='vista.php?url_pdf="+json[j].MediaObject[1].PDFMediaObject.URL+"&id_pdf="+json[i].ID+"&nombre="+json[j].Name+"' target='_blank'><button class='btn btn-warning btn-consulta-pdf'>Consultar</button></a>";
              html_alfa_infecciosas+="<p class='pdf-para'>"+json[j].Name+"</p>";
              html_alfa_infecciosas+="</div>";
            }catch(err){
              console.log(err.message);
            }
            $("#cat-section-infecciosas-alfa").html(html_alfa_infecciosas);
          };
        };       
      };
    };
  };
  xhr.onerror = function() {
    // Error code goes here.
  };
  xhr.send();
  /*************************/
  });