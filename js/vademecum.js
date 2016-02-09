function vad_selection(param){
	console.log($('').val());

	document.getElementById('vademecum_selection').style.display = "block";
	document.getElementById('vademecum_main').style.display      = "none";

	var html = "";
	console.log('quibooo');
	$('#vaDisclm').notifyModal({
			duration : 2500,
			placement : 'center',
			overlay : true,
			type : 'notify',
			onClose : function() {}
		});
}
$(document).ready(function(e){
	$('.carousel').carousel({
		interval: 0
	});
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
		    myFunction(xhttp);
		}
	}
	xhttp.open("GET", "dummy.xml", true);
	xhttp.send();

	var band1 = false;
	var band2 = false;
	var band3 = false;
	var band4 = false;
	var band5 = false;
	var band6 = false;
	var band7 = false;

	$("#title_vad1").click(function(){
		if (!band1) {
			$("#flecha_vad1").addClass("opt_vad_rot");
			$("#sub_vad1").stop().animate({
				height: "100",
				opacity: "1"
			}, 200 );
			band1 = true;
		}
		else{
			$("#flecha_vad1").removeClass("opt_vad_rot");
			$("#sub_vad1").stop().animate({
				height: "0",
				opacity: "0"
			}, 200 );
			band1 = false;
		}
	});
	$("#title_vad2").click(function(){
		if (!band2) {
			$("#flecha_vad2").addClass("opt_vad_rot");
			$("#sub_vad2").stop().animate({
				height: "100",
				opacity: "1"
			}, 200 );
			band2 = true;
		}
		else{
			$("#flecha_vad2").removeClass("opt_vad_rot");
			$("#sub_vad2").stop().animate({
				height: "0",
				opacity: "0"
			}, 200 );
			band2 = false;
		}
	});
	$("#title_vad3").click(function(){
		if (!band3) {
			$("#flecha_vad3").addClass("opt_vad_rot");
			$("#sub_vad3").stop().animate({
				height: "100",
				opacity: "1"
			}, 200 );
			band3 = true;
		}
		else{
			$("#flecha_vad3").removeClass("opt_vad_rot");
			$("#sub_vad3").stop().animate({
				height: "0",
				opacity: "0"
			}, 200 );
			band3 = false;
		}
	});
	$("#title_vad4").click(function(){
		if (!band4) {
			$("#flecha_vad4").addClass("opt_vad_rot");
			$("#sub_vad4").stop().animate({
				height: "100",
				opacity: "1"
			}, 200 );
			band4 = true;
		}
		else{
			$("#flecha_vad4").removeClass("opt_vad_rot");
			$("#sub_vad4").stop().animate({
				height: "0",
				opacity: "0"
			}, 200 );
			band4 = false;
		}
	});
	$("#title_vad5").click(function(){
		if (!band5) {
			$("#flecha_vad5").addClass("opt_vad_rot");
			$("#sub_vad5").stop().animate({
				height: "100",
				opacity: "1"
			}, 200 );
			band5 = true;
		}
		else{
			$("#flecha_vad5").removeClass("opt_vad_rot");
			$("#sub_vad5").stop().animate({
				height: "0",
				opacity: "0"
			}, 200 );
			band5 = false;
		}
	});
	$("#title_vad6").click(function(){
		if (!band6) {
			$("#flecha_vad6").addClass("opt_vad_rot");
			$("#sub_vad6").stop().animate({
				height: "100",
				opacity: "1"
			}, 200 );
			band6 = true;
		}
		else{
			$("#flecha_vad6").removeClass("opt_vad_rot");
			$("#sub_vad6").stop().animate({
				height: "0",
				opacity: "0"
			}, 200 );
			band6 = false;
		}
	});
	$("#title_vad7").click(function(){
		if (!band7) {
			$("#flecha_vad7").addClass("opt_vad_rot");
			$("#sub_vad7").stop().animate({
				height: "100",
				opacity: "1"
			}, 200 );
			band7 = true;
		}
		else{
			$("#flecha_vad7").removeClass("opt_vad_rot");
			$("#sub_vad7").stop().animate({
				height: "0",
				opacity: "0"
			}, 200 );
			band7 = false;
		}
	});
	function myFunction(xml) {
	    var w,x,y,z,a, i,item,html="",html_item="",html_pag="", xmlDoc;
	    var cell1 = [];
	    var cell5 = [];
		var cell2 = [];
		var cell3 = [];
		var cell4 = [];
	    
	    xmlDoc = xml.responseXML;
	    
	    w = xmlDoc.getElementsByTagName("id");
		x = xmlDoc.getElementsByTagName("reactivo");
		y = xmlDoc.getElementsByTagName("nombre");
	    z = xmlDoc.getElementsByTagName("cellfin");
	    a = xmlDoc.getElementsByTagName("indi");
	    var cont = (w.length+1) % 15;
	    var pag = Math.floor(w.length/15);
	    if (cont != 0) {
	      pag++;
	    };
	    $('#vademecum_indice').text(w.length);
	    for (i = 0; i < w.length; i++) {
	    	cell1.push(a[i].childNodes[0].nodeValue);
	        cell5.push(w[i].childNodes[0].nodeValue);
	        cell2.push(x[i].childNodes[0].nodeValue);
	        cell3.push(y[i].childNodes[0].nodeValue);
	        cell4.push(z[i].childNodes[0].nodeValue);
	    };
	    for (i = 0; i < 15; i++) { 
	    	if (i % 2 == 1) {
	    		html += "<div class='row_non col-md-12' onclick='vad_selection("+cell5[i]+")'>";
					html += "<div class='vad_cell cell_prim'><p>"+cell2[i]+"</p></div>";
					html += "<div class='vad_cell cell_mid'><p>"+cell3[i]+"</p></div>";
					html += "<div class='vad_cell cell_mid'>";
						html += "<p>"+cell1[i]+"</p>";
					html += "</div>";
					html += "<div class='vad_cell cell_fin'>";
						html += "<p>"+cell4[i]+"</p>";
					html += "</div>";
				html += "</div>   ";
	    	}
	    	else{
	    		html += "<div class='row_par col-md-12' onclick='vad_selection("+cell5[i]+")'>";
					html += "<div class='vad_cell cell_prim'><p>"+cell2[i]+"</p></div>";
					html += "<div class='vad_cell cell_mid'><p>"+cell3[i]+"</p></div>";
					html += "<div class='vad_cell cell_mid'>";
						html += "<p>"+cell1[i]+"</p>";
					html += "</div>";
					html += "<div class='vad_cell cell_fin'>";
						html += "<p>"+cell4[i]+"</p>";
					html += "</div>";
				html += "</div>   ";
	    	}
	    	$("#first").html(html);
	    }
	    if (w.length>15) {
	    	item = 15;
	    	var item_limit = 30;
		   	for (i=1;i < pag; i++) {
		   		html_item+="<div class='item'>";
		    	for (item; item<(item_limit);item++) {
		    		if (item>=w.length) {
		    			break;
		    		};
	    			if (item % 2 == 1) {
			    		html_item += "<div class='row_non col-md-12' onclick='vad_selection("+cell5[item]+")'>";
							html_item += "<div class='vad_cell cell_prim'><p>"+cell2[item]+"</p></div>";
							html_item += "<div class='vad_cell cell_mid'><p>"+cell3[item]+"</p></div>";
							html_item += "<div class='vad_cell cell_mid'>";
								html_item += "<p>"+cell1[item]+"</p>";
							html_item += "</div>";
							html_item += "<div class='vad_cell cell_fin'>";
								html_item += "<p>"+cell4[item]+"</p>";
							html_item += "</div>";
						html_item += "</div>   ";
			    	}
			    	else{
			    		html_item += "<div class='row_par col-md-12' onclick='vad_selection("+cell5[item]+")'>";
							html_item += "<div class='vad_cell cell_prim'><p>"+cell2[item]+"</p></div>";
							html_item += "<div class='vad_cell cell_mid'><p>"+cell3[item]+"</p></div>";
							html_item += "<div class='vad_cell cell_mid'>";
								html_item += "<p>"+cell1[item]+"</p>";
							html_item += "</div>";
							html_item += "<div class='vad_cell cell_fin'>";
								html_item += "<p>"+cell4[item]+"</p>";
							html_item += "</div>";
						html_item += "</div>   ";
			    	}
	    		};	
	    		item_limit = item + 15;
				html_item+="</div>";
		    };
		    $("#first").after(html_item);
	    }
	    for (var i = 0; i<pag; i++) {
	    	if (i==0) {
	    		html_pag+="<div data-target='#carousel-vademecum' class='btn btn-default btn-group active' role='group' data-slide-to='"+i+"'>"+(i+1)+"</div>";
	    	}
	    	else{
	    		html_pag+="<div data-target='#carousel-vademecum' class='btn btn-default btn-group' role='group' data-slide-to='"+i+"'>"+(i+1)+"</div>";
	    	}
	    };
	    $("#carr_pag").html(html_pag);
	}
});