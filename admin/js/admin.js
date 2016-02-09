$(document).ready(function(e){
	var pages=0;
	var pdfRows=new Array();
	var thpdf="<tr class='info'><th>Nombre</th><th>Categoria</th><th>Descripción</th><th>Archivo</th><th>Ver/Editar</th><th>Borrar</th></tr>";
	var oFile;
	var oImg="img/no-thumb.jpg";
	var idpdf;

	var categories;
	var subcategories;

	var authToken=null;

	var urls={
		categories 	  : "https://fundacioncsapidevel.azurewebsites.net/api/PDFCategories",
		subcategories : "https://fundacioncsapidevel.azurewebsites.net/api/PDFSubCategories",
		PDFlist 	  : "https://fundacioncsapidevel.azurewebsites.net/api/PDF/",
		login 		  : "https://fundacioncsapidevel.azurewebsites.net/api/Account/Login",
		logout 		  : "https://fundacioncsapidevel.azurewebsites.net/api/Account/Logout",
		fupload 	  : "https://fundacioncsapidevel.azurewebsites.net/api/PDF/upload",
		news 		  : "https://fundacioncsapidevel.azurewebsites.net/api/news/",
		newsCat 	  : "https://fundacioncsapidevel.azurewebsites.net/api/newscategories/"
	};

	/** FUNCIONES GENERALES**/

	///función para lanzar pop ups recibe mensaje y la clase a aplicar al popup
	function showMessage(div,message,clase){
		$(div).removeClass();
		$(div).addClass("alert");
		$(div).addClass(clase);
		$(div).text(message);
		$(div).fadeIn("fast");
		setTimeout(function(){
			$(div).fadeOut("fast");
		},2000);
	};

	//Verifica la sesión si existe inicializa la página
	window.verifySession=function(pag){
		if(getCookie("username")==""){
			window.location="index.html";
		}else{
			switch(pag){
				case 1:
					cargarPdfs();
					break;
				case 2:
					loadCategories();
					break;
				case 3:
					loadNews(1,6,"DESC");
					loadNewsCat();
					break;
				default:
					break;
			}
		}
	}

	function getCookie(key){
		var cookArray=document.cookie.split(";");
		for(i=0;i<cookArray.length;i++){
			param=cookArray[i].split('=');
			param[0]=param[0].replace(/ /g,'');
			if(param[0].toString()==key){
				param[1]=param[1].replace(/ /g,'');
				return param[1];
			};
		}
		return null;
	}

	function setCookie(nom,val){
		document.cookie=nom+"="+val;
	}

	function delCookies(){
		setCookie("username","");
		setCookie("email","");
		setCookie("token","");
	}

	///Pone una vista previa de la imagen a subir, recibe el input y el div donde se visualizará
	function prevImage(input,divd,divm){
		if(input.files&&input.files[0]){
			var reader=new FileReader();
			reader.onload=function(e){
				var nomimg=$(input).val().split(/(\\|\/)/g).pop().split('.');
				var ext=nomimg[nomimg.length-1].toLowerCase();
				if((ext=="png")||(ext=="jpeg")||(ext=="jpg")){
					$(divd).css({"background-image":"url("+e.target.result+")"});
				}else{
					showMessage(divm,"Solo imágenes","alert-danger");
					$(divd).css({"background-image":"url("+oImg+")"});
					reset_field($(input));
				}
			}
			reader.readAsDataURL(input.files[0]);
		}
	}

	///Recibe como parámetro y resetea el campo
	function reset_field (e) {
    	e.wrap('<form>').parent('form').trigger('reset');
    	e.unwrap();
	};

	///Crea una petición
	function createRequest(method,url){
		var xhr = new XMLHttpRequest();
		if("withCredentials" in xhr){
			xhr.open(method,url,true);
		}else if(typeof XDomainRequest != "undefined"){
			xhr= new XDomainRequest();
			xhr.open(method,url,true);
		}else{
			xhr=null;
		}
		return xhr;
	}

	//Cierre de sesión actual 
	$("#li-adm-logout").click(function(){
		console.log(document.cookie);
		var jlogut={
			Email:getCookie("email"),
			Token:getCookie("token")
		}
		console.log(jlogut);
		$.ajax({
			type:"POST",
			url: urls.logout,
			data:jlogut,
			success:function(resp){
				console.log(resp);
			},
			error:function(error){
				console.log(error);
			}
		}).done(function(){
			delCookies();
			console.log(document.cookie);
			window.location="index.html";
		});
	});

	/** FIN DE FUNCIONES GENERALES**/

	/** FUNCIONES DE LOGIN A CONSOLA **/

	//Login form
	$("#adm-login-form").submit(function(e){
		e.preventDefault();
		var username=$("#loginUsername").val();
		var password=$("#loginPassword").val();
		var jlogin={
			Email:username,
			Password:password
		};
		if(username!=""||password!=""){
			$.ajax({
				type:"POST",
				dataType:"json",
				url:urls.login,
				data:jlogin,
				success:function(user){
					document.cookie="username="+user.name;
					document.cookie="token="+user.access_token.replace(/ /g,'');
					document.cookie="email="+username;
					window.location="consola.html";
				},error:function(error){
					showMessage("#admin-responses","Verifique sus datos","alert-warning");			
					console.log(error);
				}
			});
		}else{
			showMessage("#admin-responses","Debe llenar todos los campos","alert-warning");			
		}
	});

	/** FIN DE FUNCIONES A LOGIN**/

	/** FUNCIONES DE ADMIN DE PDFS **/

	//Carga el listado de PDF existentes y las categorias en las formularios
	function cargarPdfs(){
		//Carga de pdf
		$("#load-list-pdf").fadeIn();
		$.ajax({
			type:"GET",
			dataType: "json",
			url: urls.PDFlist,
			beforeSend:function(request){
				request.withCredentials=true;
				request.setRequestHeader("Authorization",getCookie("token")+" "+getCookie("tokenType"));
			},
			success:function(data){
				$("#table-pdf").html(thpdf);
				$("#load-list-pdf").hide();
				pdfRows=new Array();
				pages=Math.ceil(data.length/6);
				for(var i=0;i<data.length;i++){
					rows="<tr>";
					idpdf=data[i].ID;
					rows="<tr>";
					rows+="<td>"+data[i].Name+"</td>";
					category=data[i].Category;
					rows+="<td>"+category.Description+"</td>";
					rows+="<td>"+data[i].Description+"</td>";
					rows+="<td><a target='_blank' href=\""+data[i].MediaObject[1].PDFMediaObject.URL+"\">Ver</td>";
					rows+="<td onclick='editpdf(\""+idpdf+"\")'><img style='max-width:30px; cursor:pointer;' src='img/view-on.png'></td>";
					rows+="<td onclick='deletepdf(\""+idpdf+"\")'><img style='max-width:30px; cursor:pointer;' src='img/delete-on.png'></td>";
					rows+="</tr>";
					pdfRows.push(rows);
					if(i<6){
						$("#table-pdf").append(rows);
					};
				}
				if(pages>1){
					for(var j=0;j<pages;j++){
						if(j==0){
							punto="<div id='pdfp"+j+"' class='round-pager pager-sel' onclick='gotoPDFPage("+j+")'>"+(j+1)+"</div>";
						}else{
							punto="<div id='pdfp"+j+"' class='round-pager' onclick='gotoPDFPage("+j+")'>"+(j+1)+"</div>";
						}
						$("#cont-pdf-pager").append(punto);
					}
				}
				if(data.length==0){
					$("#table-pdf").html("<p>No hay registros</p>");
				}
			},
			error:function(){
				console.log("Error al cargar el Repositorio");
			}
		});
		
		//carga de categorias en los select
		$.ajax({
			type:"GET",
			url:urls.categories,
			dataType:"json",
			success:function(listaC){
				for(i=0;i<listaC.length;i++){
					$("#pdf-category").append($("<option>",{
						value:listaC[i].ID,
						text:listaC[i].Description
					}));
					$("#new-pdf-category").append($("<option>",{
						value:listaC[i].ID,
						text:listaC[i].Description
					}));
				}
			},error:function(error){
				console.log(error);
			}
		});

		//carga de subcategorias en los select
		$.ajax({
			type:"GET",
			url:urls.subcategories,
			dataType:"json",
			success:function(listaS){
				for(i=0;i<listaS.length;i++){
					$("#pdf-subcat").append($("<option>",{
						value:listaS[i].ID,
						text:listaS[i].Description
					}));
					$("#new-pdf-subcat").append($("<option>",{
						value:listaS[i].ID,
						text:listaS[i].Description
					}));
				}
			},error:function(error){
				console.log(error);
			}
		});
	}
	
	//Cierra el pop-up de edición	
	$("#btn-cancelar-pdf").click(function(){
		disFormPDF(true);
		$("#cont-edit-pdf").slideUp("fast");
	});

	//Habilita la edición de PDFs
	$("#btn-edit-pdf").click(function(){
		disFormPDF(false);
	});

	///Formulario de edicicón de PDFs
	$("#edit-pdf-form").submit(function(e){
		$("#btn-submit-pdf").prop("disabled",true);
		$("#btn-cancelar-pdf").prop("disabled",true);
		$("#load-edit-pdf").show();
		var urlEdit=urls.PDFlist+idpdf;
		var nompdf=$("#pdf-name").val();
		var descpdf=$("#pdf-desc").val();
		var keywordspdf=$("#pdf-keywords").val();
		var catID=parseInt($("#pdf-category").val());
		var subID=parseInt($("#pdf-subcat").val());
		var MOid1=parseInt($("#media-obj1").val());
		var PMOid1=parseInt($("#pdf-media-ob1").val());
		var MOid2=parseInt($("#media-obj2").val());
		var PMOid2=parseInt($("#pdf-media-ob2").val());
		var JPDF;
		imgChange=document.getElementById("pdf-image").files.length>0;
		pdfChange=document.getElementById('pdf-file').files.length>0;

		if(imgChange){
			var imgFile=$("#pdf-image")[0].files[0];
			var fdata=new FormData();
			fdata.append('file',imgFile);
			$.ajax({
				url:urls.fupload,
				type:"POST",
				data:fdata,
				cache:false,
				processData:false,
				contentType:false,
				async:false,
				beforeSend:function(request){
					request.withCredentials=true;
					request.setRequestHeader("Authorization",getCookie("token")+" "+getCookie("tokenType"));
				},
				success:function(path){
					oImg=path;
				},
				error:function(error){
					console.log(error);
				}
			});
		};

		if(pdfChange){
			var pdfFile=$("#pdf-file")[0].files[0];
			var fdata=new FormData();
			fdata.append('file',pdfFile);
			$.ajax({
				url:urls.fupload,
				type:"POST",
				data:fdata,
				cache:false,
				async:false,
				processData:false,
				contentType:false,
				beforeSend:function(request){
					request.withCredentials=true;
					request.setRequestHeader("Authorization",getCookie("token")+" "+getCookie("tokenType"));
				},
				success:function(path){
					oFile=path;
				},
				error:function(error){
					console.log(error);
				}
			});
		};
		
		JPDF={
			ID:idpdf,
			Name:nompdf,
			Description:descpdf,
			MediaObject:[
				{
					ID:MOid1,
					PDFMediaObjectID:PMOid1,
					PDFMediaObject:
					{
						ID:PMOid1,
						Type:"thumbnail",
						URL:oImg
					}
				},
				{
					ID:MOid2,
					PDFMediaObjectID:PMOid2,
					PDFMediaObject:
					{
						ID:PMOid2,
						Type:"pdf",
						URL:oFile
					}
				}
			],
			CategoryID:catID,
			SubCategoryID:subID,
			Keywords:keywordspdf
		}

		$.ajax({
			type:"PUT",
			url:urlEdit,
			data:JPDF,
			beforeSend:function(request){
				request.withCredentials=true;
				request.setRequestHeader("Authorization",getCookie("token")+" "+getCookie("tokenType"));
			},
			success:function(){
				showMessage("#editpdf-response","Guardado Correctamente","alert-success");
				setTimeout(function(){
					location.reload();
				},2000);
			},
			error:function(error){
				showMessage("#editpdf-response","No se pudo guardar","alert-danger");
				$("#btn-submit-pdf").prop("disabled",false);
				$("#btn-cancelar-pdf").prop("disabled",false);
				$("#load-edit-pdf").hide();
			}
		});
		e.preventDefault();
	});

	//Al seleccionar cambio de imagen
	$("#pdf-image").change(function(){
		prevImage(this,"#prev-img-pdf","#editpdf-response");
	});

	//Al seleccionar un pdf 
	$("#pdf-file").change(function(){
		var nomarc=$("#pdf-file").val().split(/(\\|\/)/g).pop();
		var divnom=$("#pdf-file").val().split(/(\\|\/)/g).pop().split('.');
		var ext=divnom[divnom.length-1].toLowerCase();
		if(ext=="pdf"){
			$("#link-pdf-file").text(nomarc);
		}else{
			showMessage("#editpdf-response","Solo archivos pdf","alert-danger");
			reset_field($("#pdf-file"));
			$("#link-pdf-file").text("");
		}
	});

	//Para habilitar o deshabilitar formulario de pdfs
	function disFormPDF(val){
		$(".form-control").attr("disabled",val);
		$("#pdf-image").attr("disabled",val);
		$("#pdf-file").attr("disabled",val);
		$("#btn-submit-pdf").attr("disabled",val);
	}
	//

	///Cambia la página de pdfs cargados
	window.gotoPDFPage=function(page){
		var ini=page*6;
		$("#table-pdf").html(thpdf);
		$(".round-pager").removeClass("pager-sel");
		$("#pdfp"+page).addClass("pager-sel");
		for(var i=ini;i<(ini+6);i++){
			$("#table-pdf").append(pdfRows[i]);
		}
	}

	///Función que carga el pdf que se va ver y/o editar
	window.editpdf=function(id){
		urlEsp=urls.PDFlist+id
		idpdf=parseInt(id);
		$("#load-edit-pdf").show();
		$("#cont-edit-pdf").slideDown("fast",function(){
			$.ajax({
				type: "GET",
				dataType: "json",
				url: urlEsp,
				beforeSend:function(request){
					request.withCredentials=true;
					request.setRequestHeader("Authorization",getCookie("token")+" "+getCookie("tokenType"));
				},
				success:function(data){
					$("#load-edit-pdf").hide();
					$("#pdf-name").val(data.Name);
					$("#pdf-desc").val(data.Description);
					$("#pdf-category").val(data.Category.ID);
					$("#pdf-subcat").val(data.SubCategoryID);
					$("#media-obj1").val(data.MediaObject[0].ID);
					$("#pdf-media-ob1").val(data.MediaObject[0].PDFMediaObject.ID);
					$("#prev-img-pdf").css({"background-image":"url("+data.MediaObject[0].PDFMediaObject.URL+")"});
					$("#media-obj2").val(data.MediaObject[1].ID);
					$("#pdf-keywords").val(data.Keywords);
					$("#pdf-media-ob2").val(data.MediaObject[1].PDFMediaObject.ID);
					$("#link-pdf-file").html("<a href="+data.MediaObject[1].PDFMediaObject.URL+" target='_blank'>Ver</a>");
					oFile=data.MediaObject[1].PDFMediaObject.URL;
					oImg=data.MediaObject[0].PDFMediaObject.URL;
					disFormPDF(true);					
				},
				error:function(){
					showMessage("#editpdf-response","No se pudo cargar el recurso","label-warning");
					$("#cont-edit-pdf").slideUp("fast");
					idpdf=-1;
				}
			});
		});
	}

	//Función para borrar el registro de pdf
	window.deletepdf=function(id){
		var urldelete=urls.PDFlist+id;
		if(confirm("¿Desea eliminar el PDF?")){
			$.ajax({
				type: "DELETE",
				url: urldelete,
				beforeSend:function(request){
					request.withCredentials=true;
					request.setRequestHeader("Authorization",getCookie("token")+" "+getCookie("tokenType"));
				},
				success:function(resp){
					showMessage("#pdf-responses","Borrado Correctamente","alert-success");
					setTimeout(function(){
						location.reload();
					},2000);
				},
				error: function(resp){
					showMessage("#pdf-responses","No se pudo borrar","alert-warning");
				}
			})
		}else{
			showMessage("#pdf-responses","Cancelación de borrado","alert-warning");
		}
	}


	// Abre el pop-up para nuevo recurso PDF
	$("#btn-new-pdf").click(function(){
		disFormPDF(false);
		$("#cont-new-pdf").slideDown("fast");
	});

	//Selecciona una imagen 
	$("#new-pdf-image").change(function(){
		prevImage(this,"#new-img-pdf","#newpdf-response");
	});

	//Cancelar creación
	$("#btn-cancel-npdf").click(function(){
		$("#new-pdf-form")[0].reset();
		$("#new-img-pdf").css("background-image","url(img/no-thumb.jpg)");
		$("#cont-new-pdf").slideUp("fast");
	});

	$("#new-pdf-file").change(function(){
		var nomarc=$(this).val().split(/(\\|\/)/g).pop();
		var divnom=$(this).val().split(/(\\|\/)/g).pop().split('.');
		var ext=divnom[divnom.length-1].toLowerCase();
		if(ext=="pdf"){
			$("#name-pdf-file").text(nomarc);
		}else{
			showMessage("#newpdf-response","Solo archivos pdf","alert-danger");
			reset_field($("#new-pdf-file"));
			$("#name-pdf-file").text("");
		}
	});

	//Submit del formulario de nuevo recurso de pdf
	$("#new-pdf-form").submit(function(e){
		$("#btn-sub-npdf").prop("disabled",true);
		$("#btn-cancel-npdf").prop("disabled",true);
		$("#load-new-pdf").show();
		var nompdf=$("#new-pdf-name").val();
		var descpdf=$("#new-pdf-desc").val();
		var keywordspdf=$("#new-pdf-keywords").val();
		var catID=parseInt($("#new-pdf-category").val());
		var subID=parseInt($("#new-pdf-subcat").val());
		var fdata=new FormData();
		var imgFile=$("#new-pdf-image")[0].files[0];
		var pdfFile=$("#new-pdf-file")[0].files[0];
		var urlPDF="error";
		var urlImg="error";
		fdata.append('file',imgFile);

		$.ajax({
			url:urls.fupload,
			type:"POST",
			data:fdata,
			cache:false,
			async:false,
			processData:false,
			contentType:false,
			success:function(path){
				urlImg=path;
			},error:function(error){
				console.log(error);
			}
		});

		fdata=new FormData();
		fdata.append('file',pdfFile);
		$.ajax({
			url:urls.fupload,
			type:"POST",
			data:fdata,
			cache:false,
			async:false,
			processData:false,
			contentType:false,
			success:function(path){
				urlPDF=path;
			},error:function(error){
				console.log(error);
			}
		});
			
		var JPDF={
			Name:nompdf,
			Description:descpdf,
			MediaObject:[
				{
					PDFMediaObject:{
						Type:"thumbnail",
						URL:urlImg
					}
				},
				{
					PDFMediaObject:{
						Type:"file",
						URL:urlPDF
					}
				}
			],
			CategoryID:catID,
			SubCategoryID:subID,
			Keywords: keywordspdf
		};

		$.ajax({
			type:"POST",
			url:urls.PDFlist,
			data:JPDF,
			beforeSend:function(request){
				request.withCredentials=true;
				request.setRequestHeader("Authorization",getCookie("token")+" "+getCookie("tokenType"));
			},
			success:function(resp){
				showMessage("#newpdf-response","Guardado Correctamente","alert-success");			
				setTimeout(function(){
					location.reload();
				},2500);
			},
			error:function(){
				showMessage("#newpdf-response","Error al guardar","alert-danger");	
				$("#btn-sub-npdf").prop("disabled",false);
				$("#load-new-pdf").fadeOut("fast");
				$("#btn-cancel-npdf").prop("disabled",false);
			}
		});
		e.preventDefault();
		
	});

	/** FUNCIONES DE CATEGORIAS Y SUBCATEGORIAS**/

	var catRows;
	var subRows;

	window.loadCategories=function(){
		$.ajax({
			type:"GET",
			dataType: "json",
			url: urls.categories,
			success:function(data){
				$("#table-category").html("");
				var rows="";
				catRows=new Array();
				pages=Math.ceil(data.length/3);
				for(var i=0;i<data.length;i++){
					rows="<tr>";
					idcat=data[i].ID;
					rows="<tr>";
					rows+="<td>"+idcat+"</td>";
					rows+="<td>"+data[i].Description+"</td>";
					rows+="<td onclick='editCat(\""+idcat+"\")'><img style='max-width:30px; cursor:pointer;' src='img/view-on.png'></td>";
					rows+="<td onclick='deleteCat(\""+idcat+"\")'><img style='max-width:30px; cursor:pointer;' src='img/delete-on.png'></td>";
					rows+="</tr>";
					catRows.push(rows);
					if(i<3){
						$("#table-category").append(rows);
					};
				}
				if(pages>1){
					for(var j=0;j<pages;j++){
						if(j==0){
							punto="<div id='catP"+j+"' class='round-pager pager-sel' onclick='gotoCatPage("+j+")'>"+(j+1)+"</div>";
						}else{
							punto="<div id='catP"+j+"' class='round-pager' onclick='gotoCatPage("+j+")'>"+(j+1)+"</div>";
						}
						$("#cont-category-pager").append(punto);
					}
				}
				if(data.length==0){
					$("#table-category").html("<p>No hay registros</p>");
				}
			},
			error:function(error){
				console.log(error);
			}
		});

		$.ajax({
			type:"GET",
			dataType: "json",
			url: urls.subcategories,
			success:function(data){
				$("#table-subcat").html("");
				var rows="";
				subRows=new Array();
				pages=Math.ceil(data.length/3);
				for(var i=0;i<data.length;i++){
					rows="<tr>";
					idsub=data[i].ID;
					rows="<tr>";
					rows+="<td>"+idsub+"</td>";
					rows+="<td>"+data[i].Description+"</td>";
					rows+="<td onclick='editSub(\""+idsub+"\")'><img style='max-width:30px; cursor:pointer;' src='img/view-on.png'></td>";
					rows+="<td onclick='deleteSub(\""+idsub+"\")'><img style='max-width:30px; cursor:pointer;' src='img/delete-on.png'></td>";
					rows+="</tr>";
					subRows.push(rows);
					if(i<3){
						$("#table-subcat").append(rows);
					};
				}
				if(pages>1){
					for(var j=0;j<pages;j++){
						if(j==0){
							punto="<div id='subP"+j+"' class='round-pager pager-sel' onclick='gotoSubPage("+j+")'>"+(j+1)+"</div>";
						}else{
							punto="<div id='subP"+j+"' class='round-pager' onclick='gotoSubPage("+j+")'>"+(j+1)+"</div>";
						}
						$("#cont-subcat-pager").append(punto);
					}
				}
				if(data.length==0){
					$("#table-subcat").html("<p>No hay registros</p>");
				}
			},
			error:function(error){
				console.log("Error: "+error);
			}
		});

	}

	$("#btn-new-category").click(function(){
		$("#cont-new-cat").slideDown("fast");
	});

	$("#btn-cancel-ncat").click(function(){
		$("#new-category-form")[0].reset();
		$("#cont-new-cat").slideUp();
	});
	
	$("#btn-new-subcat").click(function(){
		$("#cont-new-subcat").slideDown();
	});

	$("#btn-cancel-nsubcat").click(function(){
		$("#new-subcat-form")[0].reset();
		$("#cont-new-subcat").slideUp();
	});

	$("#btn-edit-cat").click(function(){
		$("#btn-submit-cat").attr("disabled",false);
		$("#cat-desc").attr("disabled",false);
	});

	$("#btn-edit-sub").click(function(){
		$("#btn-submit-sub").attr("disabled",false);
		$("#sub-desc").attr("disabled",false);
	});

	$("#btn-cancel-ecat").click(function(){
		$("#edit-cat-form")[0].reset();
		$("#cont-edit-cat").slideUp("fast");
	});

	$("#btn-cancel-esub").click(function(){
		$("#edit-sub-form")[0].reset();
		$("#cont-edit-sub").slideUp("fast");
	});

	window.editCat=function(id){
		var urlSinCat="";
		$.ajax({
			type:"POST",
			url:urlSinCat,
			success:function(data){
				$("#cont-edit-cat").slideDown("fast");
				$("#category-id").val(data.ID);
				$("#cat-desc").val(data.Description);
			},
			error:function(err){
				showMessage("No se pudo abrir la categoría","alert-danger");
			}
		})
	}

	window.editSub=function(id){
		var urlSinSub="";
		$.ajax({
			type:"POST",
			url:urlEdSub,
			success:function(data){
				$("#cont-edit-sub").slideDown("fast");
				$("#category-id").val(data.ID);
				$("#cat-desc").val(data.Description);	
			},
			error:function(err){
				showMessage("No se pudo abrir la Subcategoria","alert-danger");
			}
		});
	}

	window.deleteCat=function(id){
		urlDelCat="";
		if(confirm("¿Esá seguro de que desea borrar esta categoría?")){
			$.ajax({
				type:"GET",
				url:urlDelCat
			}).done(function(){
				showMessage("Borrado correctamente","alert-success");
			});
		}else{
			showMessage("No se borro","alert-warning");	
		}
	}

	window.deleteSub=function(id){
		urlDelSub="";
		if(confirm("¿Esá seguro de que desea borrar esta Subcategoria?")){
			$.ajax({
				type:"GET",
				url:urlDelSub
			}).done(function(){
				showMessage("Borrado correctamente","alert-success");
			});
		}else{
			showMessage("No se borro","alert-warning");	
		}
	}

	///Cambia la página de categorias cargadas
	window.gotoCatPage=function(page){
		var ini=page*3;
		$("#table-category").html("");
		$(".round-pager").removeClass("pager-sel");
		$("#catp"+page).addClass("pager-sel");
		for(var i=ini;i<(ini+3);i++){
			$("#table-category").append(catRows[i]);
		}
	}

	///Cambia la página de pdfs cargados
	window.gotoSubPage=function(page){
		var ini=page*3;
		$("#table-subcat").html("");
		$(".round-pager").removeClass("pager-sel");
		$("#subp"+page).addClass("pager-sel");
		for(var i=ini;i<(ini+6);i++){
			$("#table-subcat").append(subRows[i]);
		}
	}

	/************
	FUNCIONES DE LAS NOTICIAS
	************/

	var newRows;
	var thnews="<tr class='info'><th>Titulo</th><th>Categoria</th><th>Fecha</th><th>Ver/Editar</th><th>Borrar</th></tr>";
	//Carga las noticias en la tabla
	function loadNews(page,pagesize,orderby){
		
		var params={
			page:page,
			pagesize:pagesize,
			orderby:orderby
		};

		$("#table-news").html("");
		$("#load-list-news").show();
		$.ajax({
			type:"GET",
			dataType: "json",
			data: params,
			url: urls.news,
			success:function(data){
				$("#load-list-news").hide();
				info=data.Data;
				var pages=Math.ceil(data.Total/pagesize);
				$("#table-news").html(thnews);
				var rows="";
				for(var i=0;i<info.length;i++){
					rows="<tr>";
					idnew=info[i].ID;
					rows="<tr>";
					rows+="<td>"+info[i].Title+"</td>";
					rows+="<td>"+info[i].NewsCategory.Description+"</td>";
					rows+="<td>"+info[i].PublishDate.substring(0,10)+"</td>";
					rows+="<td onclick='editNews(\""+idnew+"\")'><img style='max-width:30px; cursor:pointer;' src='img/view-on.png'></td>";
					rows+="<td onclick='deleteNews(\""+idnew+"\")'><img style='max-width:30px; cursor:pointer;' src='img/delete-on.png'></td>";
					rows+="</tr>";
					$("#table-news").append(rows);
				};
				$("#cont-news-pager").html("");
				if(pages>1){
					for(var j=0;j<pages;j++){
						if(j==(page-1)){
							punto="<div id='newP"+j+"' class='round-pager pager-sel' onclick='gotoNewPage("+j+")'>"+(j+1)+"</div>";
						}else{
							punto="<div id='newP"+j+"' class='round-pager' onclick='gotoNewPage("+j+")'>"+(j+1)+"</div>";
						}
						$("#cont-news-pager").append(punto);
					}
				};

				if(data.length==0){
					$("#table-news").html("<p>No hay registros</p>");
				};
			},
			error:function(error){
				console.log(error);
			}
		});
	};

	function loadNewsCat(){
		$.ajax({
			type:"GET",
			url:urls.newsCat,
			dataType:"json",
			success:function(listaC){
				for(i=0;i<listaC.length;i++){
					$("#new-news-category").append($("<option>",{
						value:listaC[i].ID,
						text:listaC[i].Description
					}));
					$("#edit-news-category").append($("<option>",{
					 	value:listaC[i].ID,
					 	text:listaC[i].Description
					}));
				}
			},error:function(error){
				console.log(error);
			}
		});
	};

	window.gotoNewPage=function(n){
		var page=n+1;
		var pagesize=6;
		loadNews(page,pagesize,"DESC");
	}

	$("#btn-new-news").click(function(){
		$("#cont-new-news").slideDown("fast");
		disFormNews(false);
	});

	$("#btn-cancel-nnews").click(function(){
		$("#new-news-form")[0].reset();
		$("#cont-new-news").slideUp("fast");
	});

	$("#new-news-form").submit(function(e){
		e.preventDefault();
		var title=$("#new-news-title").val();
		var teaser=$("#new-news-teaser").val();
		var cont=$("#new-news-text").val();
		var urlNot=$("#new-news-url").val();
		var urlImg=$("#new-news-img").val();
		var catID=$("#new-news-category").val();
		var today=$("#new-news-date").val()+" "+getHour();
		var obj={
			Title:title,
			Teaser:teaser,
			NewsCategoryID:catID,
			ImageURL:urlImg,
			OriginalURL:urlNot,
			Content:cont,
			Active:true,
			PublishDate:today	
		}
		$.ajax({
			type:"POST",
			url:urls.news,
			data:obj,
			success:function(resp){
				showMessage("#newnews-response","Guardado Correctamente","alert-success");
				setTimeout(function(){
					location.reload();					
				},2000);
			},error:function(error){
				showMessage("#newnews-response","No se pudo Guardar","alert-danger");
				console.log(error);
			}
		});
	});

	function getHour() {
		d = new Date();
		fecha=d.getUTCHours()+":";
		fecha+=d.getUTCMinutes()+":";
		fecha+=d.getUTCSeconds();
		return fecha;
	};

	window.editNews=function (ide){
		$("#load-edit-news").show();
		$.ajax({
			type:"GET",
			dataType: "json",
			url: urls.news+ide,
			success:function(data){
				disFormNews(true);
				$("#load-edit-news").hide();
				$("#edit-news-id").val(ide);
				$("#edit-news-title").val(data.Title);
				$("#edit-news-teaser").val(data.Teaser);
				$("#edit-news-text").val(data.Content);
				$("#edit-news-url").val(data.OriginalUrl);
				$("#edit-news-img").val(data.ImageUrl);
				$("#edit-news-category").val(data.NewsCategoryID);
				$("#edit-news-date").val(data.PublishDate.substring(0,10));
				$("#cont-edit-news").slideDown("fast");
			},
			error:function(error){
				console.log(error);
			}
		});
	}

	$("#btn-edit-news").click(function(){
		disFormNews(false);
	});

	$("#btn-cancel-enews").click(function(){
		$("#edit-news-form")[0].reset();
		$("#cont-edit-news").slideUp("fast");
	});

	function disFormNews(val){
		$(".form-control").attr("disabled",val);
		$("#submit-edit-news").attr("disabled",val);
	}

	$("#edit-news-form").submit(function(e){
		e.preventDefault();
		var ID=$("#edit-news-id").val();
		var title=$("#edit-news-title").val();
		var teaser=$("#edit-news-teaser").val();
		var cont=$("#edit-news-text").val();
		var urlNot=$("#edit-news-url").val();
		var urlImg=$("#edit-news-img").val();
		var catID=$("#edit-news-category").val();
		var today=$("#edit-news-date").val()+" "+getHour();
		var obj={
			ID:ID,
			Title:title,
			Teaser:teaser,
			NewsCategoryID:catID,
			ImageURL:urlImg,
			OriginalURL:urlNot,
			Content:cont,
			Active:true,
			PublishDate:today	
		}
		console.log(obj);
		$.ajax({
			type:"PUT",
			url:urls.news+ID,
			data:obj,
			success:function(resp){
				showMessage("#editnews-response","Guardado Correctamente","alert-success");
				setTimeout(function(){
					location.reload();					
				},2000);
			},error:function(error){
				showMessage("#editnews-response","No se pudo Guardar","alert-danger");
				console.log(error);
			}
		});

	});

	/*$("#new-news-date").datepicker({
    	format: "yyyy-mm-dd",
    	todayBtn: true,
    	language: "es",
    	todayHighlight: true
	});

	$("#edit-news-date").datepicker({
    	format: "yyyy-mm-dd",
    	todayBtn: true,
    	language: "es",
    	todayHighlight: true
	});*/

	window.deleteNews=function(ide){
		if(confirm("¿Desea Eliminar la Noticia?")){
			$.ajax({
				type: "DELETE",
				url: urls.news+ide,
				beforeSend:function(request){
					request.withCredentials=true;
					request.setRequestHeader("Authorization",getCookie("token")+" "+getCookie("tokenType"));
				},
				success:function(resp){
					showMessage("#news-responses","Borrado Correctamente","alert-success");
					setTimeout(function(){
						location.reload();
					},2000);
				},
				error: function(resp){
					showMessage("#news-responses","No se pudo borrar","alert-warning");
				}
			})
		}else{
			showMessage("#news-responses","Cancelación de borrado","alert-warning");
		}		
	}

	$("#btn-view-news").click(function(){
		loadNews(1,6,"DESC");
	});

	$("#btn-new-catnews").click(function(){
		$("#cont-new-catnews").slideDown("fast");
		disFormNews(false);
	});

	$("#btn-cancel-ncatnews").click(function(){
		$("#cont-new-catnews").slideUp("fast");
		$("#new-catnews-form")[0].reset();
	});

	$("#new-catnews-form").submit(function(e){
		e.preventDefault();
		var desc=$("#new-txt-catnews").val();
		var obj={
			Description:desc
		};
		$.ajax({
			type:"POST",
			url:urls.newsCat,
			data:obj,
			success:function(info){
				showMessage("#newcatnews-responses","Categoria creada correctamente","alert-success");
				setTimeout(function(){
					location.reload();
				});
			},
			error:function(error){
				showMessage("#newcatnews-responses","Categoria creada correctamente","alert-warning");
				console.log(error);
			}
		});
	});

	$("#btn-view-newscat").click(function(){
		viewNewscat();
	});

	var thcats="<tr class='info'><th>ID</th><th>Categoria</th><th>Ver/Editar</th><th>Borrar</th></tr>";

	function viewNewscat(){

		$("#table-news").html("");
		$("#load-list-news").show();
		$.ajax({
			type:"GET",
			dataType: "json",
			url: urls.newsCat,
			success:function(data){
				$("#load-list-news").hide();
				var pages=Math.ceil(data.length/6);
				$("#table-news").html(thcats);
				var rows="";
				for(var i=0;i<data.length;i++){
					rows="<tr>";
					idnewscat=data[i].ID;
					rows="<tr>";
					rows+="<td>"+idnewscat+"</td>";
					rows+="<td>"+data[i].Description+"</td>";
					rows+="<td onclick='editNewscat(\""+idnewscat+"\")'><img style='max-width:30px; cursor:pointer;' src='img/view-on.png'></td>";
					rows+="<td onclick='deleteNewscat(\""+idnewscat+"\")'><img style='max-width:30px; cursor:pointer;' src='img/delete-on.png'></td>";
					rows+="</tr>";
					$("#table-news").append(rows);
				};
				$("#cont-news-pager").html("");
				if(pages>1){
					for(var j=0;j<pages;j++){
						if(j==(page-1)){
							punto="<div id='newP"+j+"' class='round-pager pager-sel' onclick='gotoCatPage("+j+")'>"+(j+1)+"</div>";
						}else{
							punto="<div id='newP"+j+"' class='round-pager' onclick='gotoCatPage("+j+")'>"+(j+1)+"</div>";
						}
						$("#cont-news-pager").append(punto);
					}
				};

				if(data.length==0){
					$("#table-news").html("<p>No hay registros</p>");
				};
			},
			error:function(error){
				console.log(error);
			}
		});
	};

	/************
	FIN FUNCIONES DE LAS NOTICIAS
	************/
});





