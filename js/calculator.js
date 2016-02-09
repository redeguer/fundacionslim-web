var band1=true;
var band2=true;
var band3=true;
$(document).ready(function(e){

    /*** FUNCIONES Y VALORES GENERALES ***/
    $(function(){
      $.scrollIt({
          easing: 'easeInCirc'
      });
    });

    var dragSize=0;
    var docCenter=$(window).width()/2;
    var docWidth=$(document).width();
    var sendWidth=0;
    var sendHeight=310;
    var sendComp=15;
    var initLeft;
    var limitLeft;
    var dragSize=$(".calc-drag-path").width()-20;

    if(docWidth<1000){
       if($(".mob-drag-circle").offset()){
            initLeft=$(".mob-drag-circle").offset().left-5;    //init possition of dragables 
            limitLeft=initLeft+dragSize;                             //limits of draggables
        }  
    }else{
       if($(".calc-drag-circle").offset()){
            initLeft=$(".calc-drag-circle").offset().left-5;    //init possition of dragables 
            limitLeft=initLeft+dragSize;                             //limits of draggables
        } 
    }
    
    //Si existe un cambio de tamaño en la pagina
    $( window ).resize(function() {
        //dragSize=$(".calc-drag-path").width()-20;
        //initLeft=$(".calc-drag-circle").offset().left-5; //init possition of dragables 
        //limitLeft=initLeft+size; //limit of draggable
        location.reload();
    });

    //Radio button personalizado con un atributo group 
    $(".calc-square-sel").click(function(){ 
        if(!$(this).attr("disabled")){
            //Si se quiere des-seleccionar los check
            /*if($(this).text()=="✓"){
                $(this).text("");
                checkRadios();
                return;
            } */   

            var lista=$(".calc-square-sel");
            var group=$(this).attr("group");

            for(i=0;i<lista.length;i++){
                auxGroup=$(lista[i]).attr("group");
                if(auxGroup==group){
                    $(lista[i]).text("");
                }
            }

            $(this).text("✓");
            checkRadios();
            calculateTMB();
        }
        
    });

    if(docWidth>700){
        sendWidth=500;
    }else if(docWidth<=700&&docWidth>560){
        sendWidth=450;

    }else if(docWidth<=560){
        sendWidth=350;
        sendHeight=330;
        sendComp=25;
    }

    //Ventana de enviar correo con resultado
    $("#share_vacc").click(function(){
       openSendForm(); 
    });

    $("#btn-share-activity").click(function(){
       openSendForm(); 
    });
    $("#btn-share-caloric").click(function(){
       openSendForm(); 
    });

    $("#btn-send-imc").click(function(){
       openSendForm(); 
    });

    $("#btn-share-cardio").click(function(){
       openSendForm(); 
    });

    $("#btn-share-renal-calc").click(function(){
       openSendForm(); 
    });

    $("#share_vacc_teen").click(function(){
       openSendForm_teen(); 
    });



    function openSendForm(){
        $(".foot-send-res").fadeOut("fast");
        var marginL=sendWidth/2-sendComp;
        $("#send-result-w").css({"left":docCenter,"margin-left":"-"+marginL+"px"});
        $("#send-result-w").animate({
            width: sendWidth,
            height: sendHeight
        },400,function(){
            $("#send-result-w").animate({
                width: sendWidth-50,
                height: sendHeight-30
            },200);
        });
    };

    function openSendForm_teen(){
        $(".foot-send-res").fadeOut("fast");
        var marginL=sendWidth/2-sendComp;
        $("#send-result-w-teen").css({"left":docCenter,"margin-left":"-"+marginL+"px"});
        $("#send-result-w-teen").animate({
            width: sendWidth,
            height: sendHeight
        },400,function(){
            $("#send-result-w-teen").animate({
                width: sendWidth-50,
                height: sendHeight-30
            },200);
        });
    };


    //cancelar envio de resultado
    $("#calc-cancel-sub").click(function(){
        $("#send-result-w").animate({
            width: 0,
            height: 0
        });
        $("#inputNombreR").val("");
        $("#inputEmailR").val("");
    });

    $("#calc-cancel-sub-teen").click(function(){
        $("#send-result-w-teen").animate({
            width: 0,
            height: 0
        });
        $("#inputNombreR-teen").val("");
        $("#inputEmailR-teen").val("");
    });

    ///Funcion general para la validación de los input
    function inputNumValidation(inpID,dragID,min,max,callback){
        $(inpID).on('change',function(){
            var val=$(inpID).val();
            if(RENumb.test(val)){
                val=(val<min)?min:val;
                val=(val>max)?max:val;
                var offx=initLeft+(dragSize*((val-min)/(max-min)));
                //var offx=initLeft+(320*(val-40)/50);
                $(dragID).offset({left:offx});
                $(dragID).text(val);
                $(inpID).val(val);
            }else{
                $(inpID).val(0);
                $(dragID).text(0);
                $(dragID).offset({left:initLeft+5});
            }
            callback();
        });
    };

    //Función general para agregar los eventos de drag para mouse
    function addDragEvent(divID,inpID,minVal,maxVal,callback,sync,decimal){
        sync=sync || false;
        decimal= decimal || false;
        $(divID).on('mousedown',function(){
            $(this).addClass('calc-moving-circle').parents().on('mousemove',function(e){
                var offsetX=0;
                var offsetY=0;
                var limitTop;
                var mouseY=0;
                if($('.calc-moving-circle').offset()!=undefined){
                    offsetX=$('.calc-moving-circle').offset().left;
                    offsetY=$('.calc-moving-circle').offset().top;
                    limitTop=offsetY+42; 
                    mouseY=e.pageY;
                }
                if(offsetX>initLeft&&offsetX<limitLeft&&mouseY>offsetY&&mouseY<limitTop){
                    var val=((offsetX-initLeft)*(maxVal-minVal))/dragSize;
                    if (decimal){
                        val=Math.round(val*100)/100;
                        val=minVal+val;
                    }else{
                        val=minVal+Math.round(val);                                            
                    }
                    $(inpID).val(val);
                    if(sync){
                        callback();
                    }
                    $('.calc-moving-circle').text(val);
                    $('.calc-moving-circle').offset({
                        left: e.pageX - $('.calc-moving-circle').outerWidth() / 2
                    }).on('mouseup',function(){
                        $(this).removeClass('calc-moving-circle');
                    });
                }else{
                    if(mouseY>offsetY&&mouseY<limitTop){
                       if(offsetX<=initLeft){
                            $('.calc-moving-circle').offset({left:(initLeft+5)});
                            $('.calc-moving-circle').text(minVal);
                            $(inpID).val(minVal);
                       }else{
                            $('.calc-moving-circle').offset({left:(limitLeft-5)});
                            $('.calc-moving-circle').text(maxVal);
                            $(inpID).val(maxVal);
                       }
                    }
                    callback();
                    $(divID).parents().unbind('mousemove');
                    $('.calc-moving-circle').removeClass('calc-moving-circle');    
                }
                e.preventDefault();
            });
        }).on('mouseup',function(){
            callback();
            $('.calc-moving-circle').removeClass('calc-moving-circle');
        });
    }

    //Función general para agregar los eventos de drag para touchScreen
    function addDragTouch(divID,inpID,minVal,maxVal,callback,sync,decimal){
        sync=sync || false;
        decimal= decimal || false;
        $(divID).on({'touchstart':function(){
            $(this).addClass('mob-moving-circle').parents().on('touchmove',function(e){
                var offsetX=0;
                var offsetY=0;
                var limitTop;
                var mouseY=0;
                if($('.mob-moving-circle').offset()!=undefined){
                    offsetX=$('.mob-moving-circle').offset().left;
                    offsetY=$('.mob-moving-circle').offset().top;
                    limitTop=offsetY+42;
                    mouseY=e.originalEvent.touches[0].pageY;
                }
                if(offsetX>initLeft&&offsetX<limitLeft&&mouseY>offsetY&&mouseY<limitTop){
                    var val=((offsetX-initLeft)*(maxVal-minVal))/dragSize;
                    if (decimal){
                        val=Math.round(val*100)/100;
                        val=minVal+val;
                    }else{
                        val=minVal+Math.round(val);                                            
                    }                    
                    $(inpID).val(val);
                    if(sync)
                        callback();
                    $('.mob-moving-circle').text(val);
                    $('.mob-moving-circle').offset({
                        left: e.originalEvent.touches[0].pageX - $('.mob-moving-circle').outerWidth() / 2
                    }).on({'touchend':function(){
                        $(this).removeClass('mob-moving-circle');
                    }});
                }else{
                    if(mouseY>offsetY&&mouseY<limitTop){
                       if(offsetX<=initLeft){
                            $('.mob-moving-circle').offset({left:(initLeft+5)});
                            $('.mob-moving-circle').text(minVal);
                            $(inpID).val(minVal);
                       }else{
                            $('.mob-moving-circle').offset({left:(limitLeft-5)});
                            $('.mob-moving-circle').text(maxVal);
                            $(inpID).val(maxVal);
                       }
                    }
                    callback();
                    $(divID).parents().unbind('touchmove');
                    $('.mob-moving-circle').removeClass('mob-moving-circle');    
                }
                e.preventDefault();
            });
        }}).on({'touchend':function(){
            callback();
            $('.mob-moving-circle').removeClass('mob-moving-circle');
        }});
    }

    /*** FIN DE LAS FUNCIONES Y VALORES GENERALES ***/

    /*** FUNCIONES DE LA CALCULADORA DE IMC ***/

    $("#imc-male").text("✓");
    $("#mob-imc-male").text("✓");
    var divWeiIMC;
    var AIArc;
    var AOArc;
    var arc;

    var contextAntiIn;
    var contextAntiOut;
    var ctxArc,x,y;
    var arcSize;
    var arcStroke;

    if(docWidth<1000){
        divWeiIMC="#mob-imc-drag-weight";
        divHeiIMC="#mob-imc-drag-height";
        divWaiIMC="#mob-imc-drag-waist";
        inpWeiIMC="#mob-imc-input-weight";
        inpHeiIMC="#mob-imc-input-height";
        inpWaiIMC="#mob-imc-input-waist";
        dragClass=".mob-drag-circle";
        IMCResDiv="#mob-imc-value";
        IMCRecDiv="#mob-recommended-weight";
        IMCDesDiv="#mob-imc-indicator-title";
        IMCImgDiv="#mob-imc-image";
        AIArc=document.getElementById("mob-antialiasing-inner-arc");
        AOArc=document.getElementById("mob-antialiasing-outer-arc");
        arc=document.getElementById("mob-imc-arc");
        arcSize=120;
        arcStroke=26;
        dibujaArcos(106,133,120,4,26);
    }else{
        divWeiIMC="#imc-drag-weight";
        divHeiIMC="#imc-drag-height";
        divWaiIMC="#imc-drag-waist";
        inpWeiIMC="#imc-input-weight";
        inpHeiIMC="#imc-input-height";
        inpWaiIMC="#imc-input-waist";
        dragClass=".calc-drag-circle";
        IMCResDiv="#imc-value";
        IMCRecDiv="#recommended-weight";
        IMCDesDiv="#imc-indicator-title";
        IMCImgDiv="#imc-image";
        AIArc=document.getElementById("antialiasing-inner-arc");
        AOArc=document.getElementById("antialiasing-outer-arc");
        arc=document.getElementById("imc-arc");
        arcSize=176;
        arcStroke=38;
        dibujaArcos(157,196,176,2,38);
    }

    /// Dibujar arcos
    function dibujaArcos(radioIn,radioOut,radioArc,borA,borB){
        if(AIArc && AOArc && arc){
            contextAntiIn=AIArc.getContext('2d');
            contextAntiOut=AOArc.getContext('2d');
            ctxArc=arc.getContext('2d');
            
            x=AIArc.width/2;
            y=AIArc.height;
            
            contextAntiIn.beginPath();
           
            contextAntiIn.arc(x,y,radioIn,Math.PI,0);
            contextAntiIn.lineWidth=borA;
            contextAntiIn.clearRect(0,0,AIArc.width,AIArc.height);
            contextAntiIn.strokeStyle="#e7e7e7";
            contextAntiIn.stroke();
            
            x=AOArc.width/2;
            y=AOArc.height;
          
            contextAntiOut.beginPath();
            contextAntiOut.arc(x,y,radioOut,Math.PI,0);
            contextAntiOut.lineWidth=borA;
            contextAntiOut.clearRect(0,0,AIArc.width,AIArc.height);
            contextAntiOut.strokeStyle="#e7e7e7";
            contextAntiOut.stroke();
            
            ctxArc.beginPath();
        
            ctxArc.arc(x,y,radioArc,Math.PI,Math.PI);
            ctxArc.lineWidth=borB;
            ctxArc.strokeStyle="#ffa500";
            ctxArc.stroke();
        }
    }

    endA=Math.PI;
    var imc=0;
    var color="#FA3131";
    ///Radio buttons gender
    $("#imc-male").click(function(){
        if($("#imc-male").text()==""){
            $("#imc-male").text("✓");
            $("#imc-female").text("");
        }
        mueveArco();
    });

    $("#imc-female").click(function(){
        if($("#imc-female").text()==""){
            $("#imc-female").text("✓");
            $("#imc-male").text("");
        }
        mueveArco();
    });

    $("#mob-imc-male").click(function(){
        if($("#mob-imc-male").text()==""){
            $("#mob-imc-male").text("✓");
            $("#mob-imc-female").text("");
        }
        mueveArco();
    });

    $("#mob-imc-female").click(function(){
        if($("#mob-imc-female").text()==""){
            $("#mob-imc-female").text("✓");
            $("#mob-imc-male").text("");
        }
        mueveArco();
    });


    /// Agrear los eventos drag mouse y para touch IMC
    //Peso
    addDragEvent(divWeiIMC,inpWeiIMC,0,150,mueveArco,true);
    addDragTouch(divWeiIMC,inpWeiIMC,0,150,mueveArco,true);
    //Estatura 
    addDragEvent(divHeiIMC,inpHeiIMC,0,210,mueveArco,true);
    addDragTouch(divHeiIMC,inpHeiIMC,0,210,mueveArco,true);
    //Cintura
    addDragEvent(divWaiIMC,inpWaiIMC,0,210,mueveArco,true);
    addDragTouch(divWaiIMC,inpWaiIMC,0,210,mueveArco,true);

    //Agrear los eventos para los input 
    inputNumValidation(inpWeiIMC,divWeiIMC,0,150,mueveArco);
    inputNumValidation(inpHeiIMC,divHeiIMC,0,210,mueveArco);
    inputNumValidation(inpWaiIMC,divWaiIMC,0,210,mueveArco);
    
    /// Reiniciar la calculadora
    $("#imc-btn-reset").click(function(){
        resetIMCVal(); 
    });

    $("#imc-reset-mob").click(function(){
        resetIMCVal();
    });

    // funcion para reinicar los valores de la calcualdora
    function resetIMCVal(){
        $(dragClass).offset({left:initLeft+5});
        $(dragClass).text("0");
        $(IMCResDiv).html("0 Kg/m<sup>2</sup>");
        $(IMCRecDiv).text("0 Kg");
        $(IMCImgDiv).html("<img src='img/hombre/imc4.png'/>");
        $(inpWeiIMC).val("0");
        $(inpHeiIMC).val("0");
        $(inpWaiIMC).val("0");
        $("#imc-male").text("✓");
        $("#mob-imc-male").text("✓");
        $("#imc-female").text("");
        $("#mob-imc-female").text("");
        ctxArc.clearRect(0,0,arc.width,arc.height);
        ctxArc.beginPath();
        ctxArc.arc(x,y,arcSize,Math.PI,Math.PI);
        ctxArc.lineWidth=arcStroke;
        ctxArc.strokeStyle="#ffa500";
        ctxArc.stroke();
    }

    ///Genera el arco con base en los dragables
    function mueveArco(){
        var tall=parseFloat($(divHeiIMC).text())/100;
        var weight=parseFloat($(divWeiIMC).text());
        var waist=parseFloat($(divWaiIMC).text());
        var compensa=0;
        var limite=0;

        var carpeta="img/hombre/";
        
        if($("#imc-male").text()!="" || $("#mob-imc-male").text()!=""){
            compensa=0;
            if(waist>=90){
                carpeta="img/hombreR/";
            }else{
                carpeta="img/hombre/";
            }
        }
        if($("#imc-female").text()!="" || $("#mob-imc-female").text()!=""){
            compensa=1;
            if(waist>=90){
                carpeta="img/mujerR/";
            }else{
                carpeta="img/mujer/";
            }
        }
        if(tall==0) return;
        imc=weight/(Math.pow(tall,2));
        imc=Math.round(imc*100)/100;
        imc+=compensa;
        $(IMCResDiv).html(imc+" kg/m<sup>2</sup>");
        pesoIdeal=24*(Math.pow(tall,2));
        pesoIdeal=Math.round(pesoIdeal*100)/100;
        $(IMCRecDiv).text(pesoIdeal+" kg");
        if(imc<16){
            ctxArc.strokeStyle="#B12821";
            color="#B12821";
            $(IMCImgDiv).html("<img src='"+carpeta+"imc1.png'/>");
            $(IMCDesDiv).text("Delgadez grave");
        }else if(imc>=16&&imc<17){
            ctxArc.strokeStyle="#ffa500";
            color="#ffa500";
            $(IMCImgDiv).html("<img src='"+carpeta+"imc2.png'/>");
            $(IMCDesDiv).text("Delgadez Moderada");
        }else if(imc>=17&&imc<19){
            ctxArc.strokeStyle="#ffa500";
            color="#ffa500";
            $(IMCImgDiv).html("<img src='"+carpeta+"imc3.png'/>");
            $(IMCDesDiv).text("Leve delgadez");
        }else if(imc>=19&&imc<25){
            ctxArc.strokeStyle="#31C44C";
            color="#31C44C";
            $(IMCImgDiv).html("<img src='"+carpeta+"imc4.png'/>");
            $(IMCDesDiv).text("Peso normal");
        }else if(imc>=25&&imc<30){
            ctxArc.strokeStyle="#ffa500";
            color="#ffa500";
            $(IMCImgDiv).html("<img src='"+carpeta+"imc5.png'/>");
            $(IMCDesDiv).text("Pre-obesidad");
        }else if(imc>=30&&imc<35){
            ctxArc.strokeStyle="#ffa500";
            color="#ffa500";
            $(IMCImgDiv).html("<img src='"+carpeta+"imc6.png'/>");
            $(IMCDesDiv).text("Obesidad clase I");
        }else if(imc>=35&&imc<=39){
            ctxArc.strokeStyle="#B12821";
            color="#B12821";
            $(IMCImgDiv).html("<img src='"+carpeta+"imc7.png'/>");
            $(IMCDesDiv).text("Obesidad clase II");
        }else{
            ctxArc.strokeStyle="#B12821";
            color="#B12821";
            $(IMCImgDiv).html("<img src='"+carpeta+"imc8.png'/>");
            $(IMCDesDiv).text("Obesidad clase III");
        }
        //limite=(imc+6)*0.157;
        limite=(imc+14)*.12;
        ctxArc.clearRect(0,0,arc.width,arc.height);
        ctxArc.beginPath();
        ctxArc.arc(x,y,arcSize,0,limite);
        ctxArc.lineWidth=arcStroke;
        ctxArc.stroke();
    }

    ///Formulario de envio de correos 
    $("#form-send-imc").submit(function(e){
        e.preventDefault();
        var weight=$(divWeiIMC).text();
        var height=$(divHeiIMC).text();
        var waist=$(divWaiIMC).text();
        var name=$("#inputNombreR").val();
        var email=$("#inputEmailR").val();
        //var imc=$("#imc-value").text();
        var rec=$(IMCRecDiv).text();
        var desc=$(IMCDesDiv).text();
        var gender="Masculino";

        if($("#imc-female").text()!="" || $("#mob-imc-female").text()!=""){
            gender="Femenino";
        }

        var result='<tr style="font-weight:bold; "><td colspan="3">Hola, '+name+'</td></tr>';
        result += '<tr height="30" align="center" style="font-size:14px;">';
        //titulo de la calculadora
        result += '<td colspan="3">Resultado de Calculadora de índice de masa corporal (IMC)</td></tr>';
        //Resultado
        result += '<tr><td align="center" width="160" height="160">';
        result += '<span style="color:'+color+'; font-size:35px; font-weight:bold;">'+imc+'</span><br>';
        result += '<span style="color:'+color+'; font-size:25px; font-weight:bold;">Kg/m<sup>2</sup></span>';
        result += '</td>';
        //adicionales
        result += '<td colspan="2" style="font-size:14px;">';
        result +='<p>'+desc+'</p>';
        result +='<p>Peso recomiendado: '+rec+'</p>';
        result +='</td></tr>';
        //parametros
        result += '<tr><td colspan="3" style="font-weight:bold; font-size:14px;"><ul>';
        result += '<li>Sexo: <span style="font-weight:normal;">'+gender+'</span></li>';
        result += '<li>Peso(Kg): <span style="font-weight:normal;">'+weight+'</span></li>';
        result += '<li>Estatura(cm): <span style="font-weight:normal;">'+height+'</span></li>';
        result += '<li>Circunferencia de cintura(cm): <span style="font-weight:normal;">'+waist+'</span></li>';
        result +='</ul></td></tr>';
        if(email==""||name==""){
            $(".foot-send-res").text("Llene todos los campos");
            $(".foot-send-res").fadeIn("fast",function(){
                setTimeout(function(){
                    $(".foot-send-res").fadeOut("fast");
                },1000);
            });
        }else{
            $("#btn-submit-imc").prop('disabled',true);
            sendData={
                SendEmail:email,
                Content:result
            };
            $.ajax({
                method: "POST",
                url: "https://fundacioncsapidevel.azurewebsites.net/api/email/sendresults/",
                dataType:"json",
                data: sendData,
                success:function(){
                    $(".foot-send-res").text("Enviado correctamente");
                    $("#inputNombreR").val("");
                    $("#inputEmailR").val("");
                    $(".foot-send-res").fadeIn("fast",function(){
                        setTimeout(function(){
                            $("#btn-submit-imc").prop('disabled',false);
                            $("#send-result-w").animate({
                                width: 0,
                                height: 0
                            });
                        },2000);
                    });
                },
                error:function(e){
                    console.log(e);
                    $(".foot-send-res").text("Error al enviar el correo");
                    $(".foot-send-res").fadeIn("fast",function(){
                        setTimeout(function(){
                            $(".foot-send-res").fadeOut("fast");
                            $("#btn-submit-imc").prop('disabled',false);
                        },2000);
                    });
                }

            });
        }
    });

    /**
        Funciones para vista móvil IMC
    **/
    $("#btn-imc-res2").click(function(){
        $("#btn-imc-res2").addClass("ball-selected");
        $("#btn-imc-res1").removeClass("ball-selected");
        $("#imc-mob-res").stop().animate({
            opacity: 0
        });
        $("#imc-mob-rec").stop().animate({
            opacity: 1
        });
    });
    
     $("#btn-imc-res1").click(function(){
        $("#btn-imc-res1").addClass("ball-selected");
        $("#btn-imc-res2").removeClass("ball-selected");
        $("#imc-mob-rec").stop().animate({
            opacity: 0
        });
        $("#imc-mob-res").stop().animate({
            opacity: 1
        });
    });

    $("#imc-share-mob").click(function(){
        openSendForm();
    });

    /*** FIN DE LA CALCULADORA DE IMC */

    /*** FUNCIONES DE LA CALCULADORA DE RIESGO CARDIO VASCULAR ***/

    //variables globales

    var fullMatrixD=new Array();
    var fullMatrixND=new Array();
    var age=0;
    var currentFullMatrix=fullMatrixD;
    var pressure=0;
    var carColor;
    var cholesterol=0;
    var finalMatrix;
    var pcar=0;

    // Arreglos de diabetes

    var matD00=[[0,0,0,0,0],[2,1,0,0,0],[3,2,2,1,0],[3,3,3,2,1]];
    var matD01=[[0,0,0,0,0],[0,0,0,0,0],[2,1,0,0,0],[3,2,2,1,0]];
    var matD02=[[0,0,0,0,0],[2,2,1,0,0],[3,3,2,2,1],[4,3,3,3,2]];
    var matD03=[[0,0,0,0,0],[1,0,0,0,0],[2,2,1,0,0],[3,3,2,2,1]];
    fullMatrixD[0]=new Array();
    fullMatrixD[0].push(matD00);
    fullMatrixD[0].push(matD01);
    fullMatrixD[0].push(matD02);
    fullMatrixD[0].push(matD03); 

    var matD10=[[0,0,0,0,0],[2,2,1,0,0],[4,3,3,2,1],[4,4,4,3,3]];
    var matD11=[[0,0,0,0,0],[1,0,0,0,0],[3,2,2,1,0],[4,3,3,2,1]];
    var matD12=[[0,0,0,0,0],[2,2,1,0,0],[4,3,3,2,1],[4,4,4,3,3]];
    var matD13=[[0,0,0,0,0],[2,2,0,0,0],[3,3,3,2,1],[4,4,4,3,2]];
    fullMatrixD[1]=new Array();
    fullMatrixD[1].push(matD10);
    fullMatrixD[1].push(matD11);
    fullMatrixD[1].push(matD12);
    fullMatrixD[1].push(matD13); 

    var matD20=[[1,0,0,0,0],[3,3,2,1,0],[4,4,4,3,2],[4,4,4,4,3]];
    var matD21=[[0,0,0,0,0],[2,1,0,0,0],[4,3,3,2,0],[4,4,4,3,2]];
    var matD22=[[1,0,0,0,0],[3,3,2,1,0],[4,4,4,3,1],[4,4,4,4,3]];
    var matD23=[[0,0,0,0,0],[2,2,0,0,0],[4,3,3,2,1],[4,4,4,3,2]];
    fullMatrixD[2]=new Array();
    fullMatrixD[2].push(matD20);
    fullMatrixD[2].push(matD21);
    fullMatrixD[2].push(matD22);
    fullMatrixD[2].push(matD23); 

    var matD30=[[2,0,0,0,0],[4,3,3,2,0],[4,4,4,4,2],[4,4,4,4,4]];
    var matD31=[[0,0,0,0,0],[3,2,1,0,0],[4,4,3,3,0],[4,4,4,4,2]];
    var matD32=[[1,0,0,0,0],[4,3,2,1,0],[4,4,4,3,1],[4,4,4,4,4]];
    var matD33=[[0,0,0,0,0],[3,2,0,0,0],[4,4,3,2,1],[4,4,4,4,3]];
    fullMatrixD[3]=new Array();
    fullMatrixD[3].push(matD30);
    fullMatrixD[3].push(matD31);
    fullMatrixD[3].push(matD32);
    fullMatrixD[3].push(matD33);

    // Arreglos de no diabetes

    var matND00=[[2,1,0,0,0],[3,3,2,2,1],[4,3,3,3,2],[4,4,4,3,3]];
    var matND01=[[0,0,0,0,0],[2,2,1,0,0],[3,3,2,2,1],[4,3,3,3,2]];
    var matND02=[[2,2,1,0,0],[3,3,3,2,2],[4,4,3,3,3],[4,4,4,4,3]];
    var matND03=[[1,0,0,0,0],[3,2,2,1,0],[3,3,3,2,2],[4,4,3,3,3]];
    fullMatrixND[0]=new Array();
    fullMatrixND[0].push(matND00);
    fullMatrixND[0].push(matND01);
    fullMatrixND[0].push(matND02);
    fullMatrixND[0].push(matND03); 

    var matND10=[[2,1,0,0,0],[3,3,3,2,1],[4,4,4,3,3],[4,4,4,4,4]];
    var matND11=[[0,0,0,0,0],[3,2,1,1,0],[4,3,3,2,1],[4,4,4,3,3]];
    var matND12=[[2,2,1,0,0],[4,4,3,3,2],[4,4,4,4,3],[4,4,4,4,4]];
    var matND13=[[1,0,0,0,0],[3,3,2,1,0],[4,4,4,3,2],[4,4,4,4,3]];
    fullMatrixND[1]=new Array();
    fullMatrixND[1].push(matND10);
    fullMatrixND[1].push(matND11);
    fullMatrixND[1].push(matND12);
    fullMatrixND[1].push(matND13); 

    var matND20=[[3,2,1,0,0],[4,4,3,3,1],[4,4,4,4,3],[4,4,4,4,4]];
    var matND21=[[1,0,0,0,0],[3,3,2,1,0],[4,4,4,3,2],[4,4,4,4,3]];
    var matND22=[[2,2,1,0,0],[4,4,3,3,2],[4,4,4,4,3],[4,4,4,4,4]];
    var matND23=[[1,0,0,0,0],[3,3,2,1,0],[4,4,4,3,2],[4,4,4,4,3]];
    fullMatrixND[2]=new Array();
    fullMatrixND[2].push(matND20);
    fullMatrixND[2].push(matND21);
    fullMatrixND[2].push(matND22);
    fullMatrixND[2].push(matND23); 

    var matND30=[[3,2,1,0,0],[4,4,4,3,1],[4,4,4,4,3],[4,4,4,4,4]];
    var matND31=[[1,0,0,0,0],[4,3,3,1,0],[4,4,4,3,2],[4,4,4,4,4]];
    var matND32=[[2,2,1,0,0],[4,4,4,3,2],[4,4,4,4,3],[4,4,4,4,4]];
    var matND33=[[1,0,0,0,0],[4,3,2,1,0],[4,4,4,3,2],[4,4,4,4,4]];
    fullMatrixND[3]=new Array();
    fullMatrixND[3].push(matND30);
    fullMatrixND[3].push(matND31);
    fullMatrixND[3].push(matND32);
    fullMatrixND[3].push(matND33);

    if(docWidth<1000){
        carAgeDiv="#mob-cardio-drag-age";
        carPreDiv="#mob-cardio-drag-pressure";
        carChoDiv="#mob-cardio-drag-cholesterol";
        carAgeInp="#mob-cardio-input-age";
        carPreInp="#mob-cardio-input-pressure";
        carChoInp="#mob-cardio-input-cholesterol";
        finalTableID="#mob-table";
        finalTD="#carMTd";
        dragClass=".mob-drag-circle";
        cardioPercent="#mob-cardio-risk-percent";
        carCall=finalQuadrant;
        fCarCall=checkMobRadios;
        drawMobileMatrix();
    }else{
        carAgeDiv="#cardio-drag-age";
        carPreDiv="#cardio-drag-pressure";
        carChoDiv="#cardio-drag-cholesterol";
        carAgeInp="#cardio-input-age";
        carPreInp="#cardio-input-pressure";
        carChoInp="#cardio-input-cholesterol";
        finalTableID="#finalCardioTable";
        cardioPercent="#cardio-risk-percent";
        dragClass=".calc-drag-circle";
        finalTD="#c";
        carCall=finalQuadrant;
        fCarCall=checkRadios;
        drawBigMatrix(fullMatrixD);
    }
    /** cambios de matriz **/

    $("#radioDiabetesY").click(function(){
        $("#cardio-tables").html("");
        drawBigMatrix(fullMatrixD);
    });

    $("#radioDiabetesN").click(function(){
        $("#cardio-tables").html("");
        drawBigMatrix(fullMatrixND)
    });

    $("#mob-radioDiabetesN").click(function(){
        currentFullMatrix=fullMatrixND;
        checkMobRadios();
    });

    $("#mob-radioDiabetesY").click(function(){
        currentFullMatrix=fullMatrixD;
        checkMobRadios();
    });

    $("#radioDiabetesY").text("");
    $("#mob-radioDiabetesY").text("");

    //Dibuja todas las matrices
    function drawBigMatrix(fullMatrix){
        for(var i=0;i<fullMatrix.length;i++){
            for(var j=0;j<fullMatrix[i].length;j++){
                idTable="tab"+i.toString()+j.toString();
                drawSingleMatrix(fullMatrix[i][j],false,idTable);
            }
        }
        currentFullMatrix=fullMatrix;
    }

    function drawMobileMatrix(){
        var html="<table id='mob-table' class='risk-table'>";
        for(var i=0;i<4;i++){
            html+="<tr>";
            for(var j=0;j<5;j++){
                var idTd="carMTd"+i.toString()+j.toString();
                html+="<td class='gen-td' id='"+idTd+"''></td>";
            }
            html+="</tr>";
        }
        html+="</table>";
        $("#mob-cardio-table").append(html);
        tdW=$("#mob-table td").width();
        $("#mob-table td").css({"height":tdW});
        heiCont=(tdW+2)*4 +10;
        $("#mob-cardio-table").css("height",heiCont+"px");
        $("#cardio-results").css("height",heiCont+"px");
        $("#mob-cardio-percent").offset({top:heiCont/2});
    }

    //Dibuja una matriz
    function drawSingleMatrix(matrix,disabled,id){
        var html="<table id='"+id+"' class='risk-table'>";
        for(var i=0;i<4;i++){
            html+="<tr>";
            for(var j=0;j<5;j++){
                var clase="td"+matrix[i][j];
                if(!disabled){
                     html+="<td id='c"+i.toString()+j.toString()+"' class='"+clase+"'></td>";                    
                }else{
                     html+="<td id='c"+i.toString()+j.toString()+"' class='"+clase+"dis'></td>"; 
                     $(" #c"+i.toString()+j.toString(),table).animate({
                        opacity: op
                     },500)                   
                }
            }
            html+="</tr>"
        }
        html+="</table>";
        $("#cardio-tables").append(html);
    }

    //cambia la opacidad de la matriz
    function opacitySingleMatrix(table,op){
        for(var i=0;i<4;i++){
            for(var j=0;j<5;j++){
                $(" #c"+i.toString()+j.toString(),table).animate({
                    opacity: op
                },500);
            }
        }
    }


    //
    $("#mob-radioFumaY").click(function(){
        checkMobRadios();
    });

    $("#mob-radioFumaN").click(function(){
        checkMobRadios();
    });

    $("#mob-radioMale").click(function(){
        checkMobRadios();
    });

    $("#mob-radioFemale").click(function(){
        checkMobRadios();
    });

    //check mob radios
    function checkMobRadios(){
        var params=0;
        var cols=new Array(0,1,2,3);
        var row=-1;
        var age=parseInt($(carAgeDiv).text());

        if($("#mob-radioFumaY").text()=="✓"){
            pos=cols.indexOf(1);
            if(pos!=-1){
                cols.splice(pos,1);
            }
            pos=cols.indexOf(3);
            if(pos!=-1){
                cols.splice(pos,1);
            }
            params++;
        }

        if($("#mob-radioFumaN").text()=="✓"){
            pos=cols.indexOf(0);
            if(pos!=-1){
                cols.splice(pos,1);
            }
            pos=cols.indexOf(2);
            if(pos!=-1){
                cols.splice(pos,1);
            }
            params++;
        }

        if($("#mob-radioMale").text()=="✓"){
            pos=cols.indexOf(2);
            if(pos!=-1){
                cols.splice(pos,1);
            }
            pos=cols.indexOf(3);
            if(pos!=-1){
                cols.splice(pos,1);
            }
            params++;
        }

        if($("#mob-radioFemale").text()=="✓"){
            pos=cols.indexOf(0);
            if(pos!=-1){
                cols.splice(pos,1);
            }
            pos=cols.indexOf(1);
            if(pos!=-1){
                cols.splice(pos,1);
            }
            params++;
        }

        if(age!=0){
            if(age<50){
                row=3;
            }else if(age>=50 && age<60){
                row=2;
            }else if(age>=60 && age<70){
                row=1;
            }else if(age>=70){
                row=0;
            }
            params++;
        }

        if(params==3){
            finalMatrix=currentFullMatrix[cols.pop()][row];
            for(var i=0;i<4;i++){
                for(var j=0;j<5;j++){
                    var idTd="#carMTd"+i.toString()+j.toString();
                    var tdClass="td"+finalMatrix[i][j];
                    $(idTd).removeClass();
                    $(idTd).addClass(tdClass)
                }
            }
        }

    }

    //Revisa los parametros para generar resultados
    function checkRadios(){

        var cols=new Array();
        var row=-1;
        var params=0;
        var hiddenMatrix=new Array();
        var age=parseInt($(carAgeDiv).text());
        if($("#radioFumaY").text()=="✓"){
            cols.push(0);
            cols.push(2);
            params++;
        }

        if($("#radioFumaN").text()=="✓"){
            cols.push(1);
            cols.push(3);
            params++;
        }

        if($("#radioMale").text()=="✓"){
            if(cols.indexOf(2)==-1){
                cols.push(2);
            }
            if(cols.indexOf(3)==-1){
                cols.push(3);
            }
            params++;
        }

        if($("#radioFemale").text()=="✓"){
            if(cols.indexOf(0)==-1){
                cols.push(0);
            }
            if(cols.indexOf(1)==-1){
                cols.push(1);
            }
            params++;
        }

               
        if(age!=0){
            if(age<50){
                row=3;
            }else if(age>=50 && age<60){
                row=2;
            }else if(age>=60 && age<70){
                row=1;
            }else if(age>=70){
                row=0;
            }
            params++;
        }

        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                idTable="#tab"+i.toString()+j.toString();
                if(row!=-1){
                    hiddenMatrix.push(idTable);
                    if(cols.indexOf(j)!=-1 || i!=row){
                        opacitySingleMatrix(idTable,.4);
                    }else{
                        opacitySingleMatrix(idTable,1);
                        finalMatrix=currentFullMatrix[i][j];
                    } 
                }else{
                    if(cols.indexOf(j)!=-1 ){
                        opacitySingleMatrix(idTable,.4);
                    }else{
                        opacitySingleMatrix(idTable,1);
                    } 
                }
            }
        }

        if(params==3){
            for(var i=0;i<hiddenMatrix.length;i++){
                $(hiddenMatrix[i]).animate({
                    opacity:0
                },1000);
            }
            drawFinalMatrix(finalMatrix);
        }

    }

    //dibuja la matriz final
    function drawFinalMatrix(matrix){
        var table="<table id='finalCardioTable' class='bigCardioTable'>";
        for (var i=0;i<matrix.length;i++){
            table+="<tr>";
            if (i==0) {
                table+="<td>";
                    table+="<p>180</p>";
                table+="</td>";
            }
            if (i==1) {
                table+="<td>";
                    table+="<p>160</p>";
                table+="</td>";
            }
            if (i==2) {
                table+="<td>";
                    table+="<p>140</p>";
                table+="</td>";
            }
            if (i==3) {
                table+="<td>";
                    table+="<p>120</p>";
                table+="</td>";
            }
            for(var j=0;j<matrix[i].length;j++){
                table+="<td id='c"+i.toString()+j.toString()+"' class='td"+matrix[i][j]+"'></td>";
            }
        }
        table+="</tr>";
        table+="<tr>";
            table+="<td>";
            table+="</td>";
            table+="<td>";
                table+="<p>152</p>";
            table+="</td>";
            table+="<td>";
                table+="<p>190</p>";
            table+="</td>";
            table+="<td>";
                table+="<p>228</p>";
            table+="</td>";
            table+="<td>";
                table+="<p>265</p>";
            table+="</td>";
            table+="<td>";
                table+="<p>304</p>";
            table+="</td>";
        table+="</tr>";
        table+="</table>";
        $("#cardio-tables").html(table);
        $("#finalCardioTable").animate({
            opacity: 1,
            width:350,
            height: 240
        },1000);

    }

    //// Reinicio de los valores de cardio
    $("#btn-reset-cardio").click(function(){
        resetCardioVals();
    });

    $("#car-reset-mob").click(function(){
        resetCardioVals();
    });

    function resetCardioVals(){
        $(".calc-square-sel").text("");
        if(docWidth<1000){
            $("#mob-cardio-table").html("");
            drawMobileMatrix();
        }else{
            $("#cardio-tables").html("");
            drawBigMatrix(fullMatrixD);
        }
        $("#radioDiabetesY").text("✓");
        $("#mob-radioDiabetesY").text("✓");
        $(dragClass).offset({left:initLeft+5});
        $(dragClass).text("0");
        $(cardioPercent).text("0");
        $(cardioPercent).css("color","#000");
        $(".calc-oline-percent").css({"width":0,"background-color":"#000"});
        $(carAgeInp).val("0");
        $(carPreInp).val("0");
        $(carChoInp).val("0");
        age=0;
        cholesterol=0;
        pressure=0;
    }

    /// Agrear los eventos drag mouse y para touch
    //Edad
    addDragEvent(carAgeDiv,carAgeInp,40,90,fCarCall);
    addDragTouch(carAgeDiv,carAgeInp,40,90,fCarCall);
    //Presión
    addDragEvent(carPreDiv,carPreInp,110,190,carCall);
    addDragTouch(carPreDiv,carPreInp,110,190,carCall);
    //Cholesterol
    addDragEvent(carChoDiv,carChoInp,0,350,carCall);
    addDragTouch(carChoDiv,carChoInp,0,350,carCall);

    //Agrear los eventos para los input 
    inputNumValidation(carAgeInp,carAgeDiv,40,90,fCarCall);
    inputNumValidation(carPreInp,carPreDiv,110,190,carCall);
    inputNumValidation(carChoInp,carChoDiv,0,350,carCall);

    
     $("#btn-car-res2").click(function(){
        $("#btn-car-res2").addClass("ball-selected");
        $("#btn-car-res1").removeClass("ball-selected");
        $("#mob-cardio-table").stop().animate({
            opacity: 0
        });
        $("#mob-cardio-percent").stop().animate({
            opacity: 1
        });
    });
    
    $("#btn-car-res1").click(function(){
        $("#btn-car-res1").addClass("ball-selected");
        $("#btn-car-res2").removeClass("ball-selected");
        $("#mob-cardio-percent").stop().animate({
            opacity: 0
        });
        $("#mob-cardio-table").stop().animate({
            opacity: 1
        });
    });

    /// Botón para compartir resultado 
    $("#car-share-mob").click(function(){
        $("#send-result-w").css("z-index","10");
        openSendForm();
    });


    //Comprobación de cuadrantes finales
    function finalQuadrant(){
        var finalRow=-1;
        var finalColumn=-1;

        pressure=parseInt($(carPreDiv).text());
        cholesterol=parseInt($(carChoDiv).text());

        if(pressure>=120&&pressure<140){
            finalRow=3;
        }else if(pressure>=140&&pressure<160){
            finalRow=2;
        }else if(pressure>=160&&pressure<180){
            finalRow=1;
        }else if(pressure>=180){
            finalRow=0;
        }

        // if(cholesterol>=3&&cholesterol<4){
        //     finalColumn=0;
        // }else if(cholesterol>=4&&cholesterol<5){
        //     finalColumn=1;
        // }else if(cholesterol>=5&&cholesterol<6){
        //     finalColumn=2;
        // }else if(cholesterol>=6&&cholesterol<7){
        //     finalColumn=3;
        // }else if(cholesterol>=7){
        //     finalColumn=4;
        // }
        if(cholesterol>=0&&cholesterol<=189){
            finalColumn=0;
        }else if(cholesterol>=190&&cholesterol<228){
            finalColumn=1;
        }else if(cholesterol>=228&&cholesterol<265){
            finalColumn=2;
        }else if(cholesterol>=265&&cholesterol<304){
            finalColumn=3;
        }else if(cholesterol>=304){
            finalColumn=4;
        }

        for(var i=0;i<4;i++){
            for(var j=0;j<5;j++){
                if(finalRow!=-1 && finalColumn!=-1){
                    if(i==finalRow && finalColumn==j){
                        $(finalTD+i.toString()+j.toString(),finalTableID).stop().animate({
                            opacity: 1
                        },500);
                        evalCardioRisk(finalMatrix[i][j]);
                    }else{
                        $(finalTD+i.toString()+j.toString(),finalTableID).stop().animate({
                            opacity: 0.3
                        },500);
                    }
                }else{
                    if(i==finalRow || finalColumn==j){
                        $(finalTD+i.toString()+j.toString(),finalTableID).stop().animate({
                            opacity: 1
                        },500);
                    }else{
                        $(finalTD+i.toString()+j.toString(),finalTableID).stop().animate({
                            opacity: 0.3
                        },500);
                    }
                }
            }
        }
    }

    function evalCardioRisk(number){
        var percentHTML;
        var percent;

        switch (number){
            case 4:
                percentHTML="&#60; 10 &#37;";
                carColor="#77da02";
                percent=.2;
                break;
            case 3:
                percentHTML="10&#37; a &#60; 20&#37";
                carColor="#ffd200";
                percent=.4;
                break;
            case 2:
                percentHTML="20&#37; a &#60; 30&#37";
                carColor="#ff7f00";
                percent=.6;
                break;
            case 1:
                percentHTML="30&#37; a &#60; 40&#37";
                carColor="#d30007";
                percent=.8;
                break;
            case 0:
                percentHTML="&#62; 40&#37";
                carColor="#910005";
                percent=1;
                break;    
        }
        
        width=300*percent;
        $(cardioPercent).html(percentHTML);
        $(cardioPercent).css("color",carColor);
        $(".calc-oline-percent").css("background-color",carColor);
        $(".calc-oline-percent").animate({
            width :width
        });

    }

    

    ///Formulario de envio de correos 
    $("#form-send-cardio").submit(function(e){
        e.preventDefault();
        var age=$(carAgeDiv).text();
        var pre=$(carPreDiv).text();
        var col=$(carChoDiv).text();
        var name=$("#inputNombreR").val();
        var email=$("#inputEmailR").val();
        var dia="Si";
        var fum="Si";
        var gen="Masculino";
        var pcar=$(cardioPercent).text();
        if($("#radioDiabetesN").text()=="✓" || $("#mob-radioDiabetesN").text()=="✓"){
            dia="No";
        };
        if($("#radioFumaN").text()=="✓" || $("#mob-radioFumaN").text()=="✓"){
            fum="No";
        };
        if($("#radioFemale").text()=="✓" || $("#mob-radioFemale").text()=="✓"){
            gen="Femenino";
        };

        var result='<tr style="font-weight:bold; "><td colspan="3">Hola, '+name+'</td></tr>';
        result += '<tr height="30" align="center" style="font-size:14px;">';
        //titulo de la calculadora
        result += '<td colspan="3">Resultado de Calculadora de riesgo cardiovascular</td></tr>';
        //Resultado
        result += '<tr><td align="center" width="160" height="160">';
        result += '<span style="color:'+carColor+'; font-size:20px; font-weight:bold;">'+pcar+'</span><br>';
        result += '</td>';
        //adicionales
        result += '<td colspan="2" style="font-size:14px;">';
        result += '<p style="color:#333; font-size:20px; font-weight:bold;">Riesgo a 10 años</p>';
        result += '<p>Riesgo de presentar un evento cardiovascular mayor (infarto miocárdico, evento vascular cerebral o evento vascular periférico)</p>';
        result += '</td></tr>';
        //parametros
        result += '<tr><td colspan="3" style="font-weight:bold; font-size:14px;"><ul>';
        result += '<li>Es usted diabético: <span style="font-weight:normal;">'+dia+'</span></li>';
        result += '<li>Ha fumado en el último año: <span style="font-weight:normal;">'+fum+'</span></li>';
        result += '<li>Sexo: <span style="font-weight:normal;">'+gen+'</span></li>';
        result += '<li>Edad(años): <span style="font-weight:normal;">'+age+'</span></li>';
        result += '<li>Presión arterial sistólica: <span style="font-weight:normal;">'+pre+'</span></li>';
        result += '<li>Colesterol: <span style="font-weight:normal;">'+col+'</span></li>';
        result +='</ul></td></tr>';
        if(email==""||name==""){
            $(".foot-send-res").text("Llene todos los campos");
            $(".foot-send-res").fadeIn("fast",function(){
                setTimeout(function(){
                    $(".foot-send-res").fadeOut("fast");
                },1000);
            });
        }else{
            $("#btn-submit-car").prop('disabled',true);
            sendData={
                SendEmail:email,
                Content:result
            };
            $.ajax({
                method: "POST",
                url: "https://fundacioncsapidevel.azurewebsites.net/api/email/sendresults/",
                dataType:"json",
                data: sendData,
                success:function(){
                    $(".foot-send-res").text("Enviado correctamente");
                    $("#inputNombreR").val("");
                    $("#inputEmailR").val("");
                    $(".foot-send-res").fadeIn("fast",function(){
                        setTimeout(function(){
                            $("#btn-submit-car").prop('disabled',false);
                            $("#send-result-w").animate({
                                width: 0,
                                height: 0
                            });
                        },2000);
                    });
                },
                error:function(e){
                    console.log(e);
                    $(".foot-send-res").text("Error al enviar el correo");
                    $(".foot-send-res").fadeIn("fast",function(){
                        setTimeout(function(){
                            $(".foot-send-res").fadeOut("fast");
                            $("#btn-submit-car").prop('disabled',false);
                        },2000);
                    });
                }

            });
        }
    });
    
    /// funciones para moestrar los popups 
    $("#sis-pop-over").mouseover(function(){
        $("#pop-sistolica").fadeIn("slow");
    });

    $("#sis-pop-over").mouseout(function(){
        $("#pop-sistolica").fadeOut("fast");
    });

    $("#cho-pop-over").mouseover(function(){
        $("#pop-cholesterol").fadeIn("slow");
    });

    $("#cho-pop-over").mouseout(function(){
        $("#pop-cholesterol").fadeOut("fast");
    });


    /********* 
    FUNCIONES DE LA CALCULADORA RENAL
    *********/

    /// valores iniciales 
    var rAge=0;
    var rWei=0;
    var rCrea=0;
    var dCre=0;
    var txtRes="";
    var txtRec;
    var waterColor="#A9E2F3";
    var offWat;

    if(docWidth<1000){
        renEstDiv="#mob-renal-text-res";
        waterCanvas="mob-water-canvas";
        creaValDiv="#mob-creatinine-value"
        renAgeInp="#mob-renal-input-age";
        renWeiInp="#mob-renal-input-weight";
        renCreInp="#mob-renal-input-creatinine";
        renAgeDiv="#mob-renal-drag-age";
        renWeiDiv="#mob-renal-drag-weight";
        renCreDiv="#mob-renal-drag-creatinine";
        offWat=255;
        iniWat=-665;
    }else{
        renEstDiv="#renal-text-res";
        waterCanvas="water-canvas";
        creaValDiv="#creatinine-value";
        renAgeInp="#renal-input-age";
        renWeiInp="#renal-input-weight";
        renCreInp="#renal-input-creatinine";
        renAgeDiv="#renal-drag-age";
        renWeiDiv="#renal-drag-weight";
        renCreDiv="#renal-drag-creatinine";
        offWat=305;
        iniWat=-730;
    }

    $("#renal-rec-0").show();
    $(renEstDiv).html("TFG normal sin marcadores de daño renal <span style='color:#A9E2F3;  margin-left:5px;'>ESTADIO 0</span>");


    $("#renal-male").text("✓");
    $("#mob-renal-male").text("✓");

    

     /// Agrear los eventos drag mouse y para touch
    //Edad
    addDragEvent(renAgeDiv,renAgeInp,0,90,calculateTFG);
    addDragTouch(renAgeDiv,renAgeInp,0,90,calculateTFG);
    //Peso
    addDragEvent(renWeiDiv,renWeiInp,0,150,calculateTFG);
    addDragTouch(renWeiDiv,renWeiInp,0,150,calculateTFG);
    //Creatinina
    addDragEvent(renCreDiv,renCreInp,0,3,calculateTFG,false,true);
    addDragTouch(renCreDiv,renCreInp,0,3,calculateTFG,false,true);

    //Agrear los eventos para los input 
    inputNumValidation(renAgeInp,renAgeDiv,0,90,calculateTFG);
    inputNumValidation(renWeiInp,renWeiDiv,0,150,calculateTFG);
    inputNumValidation(renCreInp,renCreDiv,0,3,calculateTFG);
    
    
    
    //calcula el TFG
    function calculateTFG(){
        var TFGvalue=0;
        var percent=0;
        rCrea=parseFloat($(renCreDiv).text());
        rAge=parseInt($(renAgeDiv).text());
        rWei=parseInt($(renWeiDiv).text());
        var textos=new Array("TFG normal sin marcadores de daño renal ",
            "TFG normal con marcadores de daño renal ",
            "Daño renal con TFG levemente disminuida ",
            "Disminución moderada de TFG","Disminución severa de TFG ",
            "Enfermedad renal terminal ");

        if(rCrea!=0){
            TFGvalue=((140 - rAge)*rWei)/(72*rCrea);
            if($("#renal-female").text()=="✓" || $("mob-renal-male").text()=="✓"){
                TFGvalue*=.85;
            }
            TFGvalue = (Math.round(TFGvalue*100))/100;
        }else{
            TFGvalue=-1;
        }
        $(".calc-text-recom").hide();
        if(TFGvalue==-1){
            percent=0.1;
            waterColor="#A9E2F3";
            txtRes=textos[0]+="<span style='color:"+waterColor+";  margin-left:5px;'>ESTADIO 0</span>";
            $("#renal-rec-0").show();
            txtRec=$("#renal-rec-0").html();
        }else if(TFGvalue>=90){
            percent=0.2;
            waterColor="#42D55F"
            txtRes=textos[1]+"<span style='color:"+waterColor+"; margin-left:5px;'>ESTADIO 1</span>";
            $("#renal-rec-1").show();
            txtRec=$("#renal-rec-1").html();
        }else if(TFGvalue<90 && TFGvalue>=60){
            percent=0.4;
            waterColor="#F0EB46";
            txtRes=textos[2]+="<span style='color:"+waterColor+"; margin-left:5px;'>ESTADIO 2</span>";
            txtRec=$("#renal-rec-2").html();
        }else if(TFGvalue<60 && TFGvalue>=30){
            percent=0.6;
            waterColor="#E69B4B";
            txtRes=textos[3]+"<span style='color:"+waterColor+"; margin-left:5px;'>ESTADIO 3</span>";
            $("#renal-rec-3").show();
            txtRec=$("#renal-rec-3").html();
        }else if(TFGvalue<30 && TFGvalue>=15){
            percent=0.8;
            waterColor="#E96244";
            txtRes=textos[4]+"<span style='color:"+waterColor+"; margin-left:5px;'>ESTADIO 4</span>";
            $("#renal-rec-4").show();
            txtRec=$("#renal-rec-4").html();
        }else{
            percent=1;
            waterColor="#F54141";
            txtRes=textos[4]+"<span style='color:"+waterColor+"; margin-left:5px;'>ESTADIO 5</span>";
            $("#renal-rec-5").show();
            txtRec=$("#renal-rec-5").html();
        }
        dCre=TFGvalue;
        $(renEstDiv).html(txtRes);
        $(creaValDiv).css("color",waterColor);
        if(rCrea!=0){
            $(creaValDiv).text(TFGvalue+" ml/min");
        }else{
            $(creaValDiv).text("0 ml/min");
        }
        var top=iniWat-(percent*offWat);
        opt.range.y=50
        $("#"+waterCanvas).stop().animate({
             top: top
        },2000,function(){
            opt.range.y=20;
        });
        //waveAnimation(top);
    }

    // Boton de reinicio de los parámetros
    $("#btn-reset-renal").click(function(){
        resetRenal();
    });

    $("#ren-reset-mob").click(function(){
        resetRenal();
    });

    //función para reinicio de parametros
    function resetRenal(){
        $(dragClass).offset({left:initLeft+5});
        $(dragClass).text("0");
        topIni=iniWat-20;
        $("#"+waterCanvas).css("top",topIni+"px");
        waterColor="#A9E2F3";
        $(".calc-text-recom").hide();
        $("#renal-rec-0").show();
        $("#renal-text-res").html("TFG normal sin marcadores de daño renal <span style='color:#A9E2F3;  margin-left:5px;'>ESTADIO 0</span>");
        $(creaValDiv).text("0 ml/min");
        $(creaValDiv).css("color",waterColor);
        $(renWeiInp).val("0");
        $(renAgeInp).val("0");
        $(renCreInp).val("0");
    }

    /**
        Funciones para vista móvil IMC
    **/
    $("#btn-ren-res2").click(function(){
        $("#btn-ren-res2").addClass("ball-selected");
        $("#btn-ren-res1").removeClass("ball-selected");
        $("#calc-renal-values").stop().animate({
            opacity: 0
        });
        $("#calc-renal-values1").stop().animate({
            opacity: 1
        });
    });
    
    $("#btn-ren-res1").click(function(){
        $("#btn-ren-res1").addClass("ball-selected");
        $("#btn-ren-res2").removeClass("ball-selected");
        $("#calc-renal-values1").stop().animate({
            opacity: 0
        });
        $("#calc-renal-values").stop().animate({
            opacity: 1
        });
    });

    /// Botón para compartir resultado 
    $("#ren-share-mob").click(function(){
        openSendForm();
        $("#send-result-w").css("z-index","10");
    });

    ///Formulario de envio de correos 
    $("#form-send-renal").submit(function(e){
        e.preventDefault();
        var age=$(renAgeDiv).text();
        var wei=$(renWeiDiv).text();
        var cre=$(renCreDiv).text();
        var name=$("#inputNombreR").val();
        var email=$("#inputEmailR").val();
        var gen="Masculino";
        
        if($("#renal-female").text()!="" || $("#mob-renal-female").text()!=""){
            gen="Femenino";
        }

        var result='<tr style="font-weight:bold; font-size:16px;"><td colspan="3">Hola, '+name+'</td></tr>';
        result += '<tr height="30" align="center" style="font-size:14px;">';
        //titulo de la calculadora
        result += '<td colspan="3">Resultado de Calculadora de función renal</td></tr>';
        //Resultado
        result += '<tr><td align="center" width="160" height="160" style="border:2px solid #f2f2f2;">';
        result += '<p style="font-size:13px;">Depuración de Creatinina</p>';
        result += '<span style="color:'+waterColor+'; font-size:35px; font-weight:bold;">'+dCre+'</span><br>';
        result += '<span style="color:'+waterColor+'; font-size:25px; font-weight:bold;">ml/min</span>';
        result += '</td>';
        //adicionales
        result += '<td colspan="2" style="font-size:14px;">';
        result +='<p>'+txtRes+'</p>';
        result += '<p>La tasa de Filtración Glomerular (TFG) (estimada con el DCr) te dice que tanto está funcionando el riñon. Si la enfermedad en el riñon progresa, la TFG disminuye.</p>';
        result += '</td></tr>';
        //parametros
        result += '<tr><td colspan="3" style="font-weight:bold; font-size:14px;"><ul>';
        result += '<li>Sexo: <span style="font-weight:normal;">'+gen+'</span></li>';
        result += '<li>Edad: <span style="font-weight:normal;">'+age+'</span></li>';
        result += '<li>Peso: <span style="font-weight:normal;">'+wei+'</span></li>';
        result += '<li>Creatinina: <span style="font-weight:normal;">'+cre+'</span></li>';
        result +='</ul></td></tr>';
        result += '<tr><td colspan="3" style="font-size:14px;">';
        result += '<p>'+txtRec+'</p>';
        result +='</td></tr>';
        if(email==""||name==""){
            $(".foot-send-res").text("Llene todos los campos");
            $(".foot-send-res").fadeIn("fast",function(){
                setTimeout(function(){
                    $(".foot-send-res").fadeOut("fast");
                },1000);
            });
        }else{
            $("#btn-submit-ren").prop('disabled',true);
            sendData={
                SendEmail:email,
                Content:result
            };
            $.ajax({
                method: "POST",
                url: "https://fundacioncsapidevel.azurewebsites.net/api/email/sendresults/",
                dataType:"json",
                data: sendData,
                success:function(){
                    $(".foot-send-res").text("Enviado correctamente");
                    $("#inputNombreR").val("");
                    $("#inputEmailR").val("");
                    $(".foot-send-res").fadeIn("fast",function(){
                        setTimeout(function(){
                            $("#btn-submit-ren").prop('disabled',false);
                            $("#send-result-w").animate({
                                width: 0,
                                height: 0
                            });
                        },2000);
                    });
                },
                error:function(e){
                    console.log(e);
                    $(".foot-send-res").text("Error al enviar el correo");
                    $(".foot-send-res").fadeIn("fast",function(){
                        setTimeout(function(){
                            $(".foot-send-res").fadeOut("fast");
                            $("#btn-submit-ren").prop('disabled',false);
                        },2000);
                    });
                }

            });
        }
    });
    
    //Para el popup de los valores especiales
    $("#cre-pop-over").mouseover(function(){
        $("#pop-creatinine").fadeIn("slow");
    });

    $("#cre-pop-over").mouseout(function(){
        $("#pop-creatinine").fadeOut("fast");
    });

    /// efecto de agua
    var c = document.getElementById(waterCanvas);
    if (c){
        var ctx = c.getContext('2d'),
        cw = c.width,
        ch = c.height;
    }
    var points = [],
    tick = 0,
    opt = {
      count: 5,
      range: {
        x: 10,
        y: 20
      },
      duration: {
        min: 80,
        max: 90
      },
      thickness: 1,
      strokeColor: '#444',
      level: .35,
      curved: true
    },
    rand = function(min, max){
        return Math.floor( (Math.random() * (max - min + 1) ) + min);
    },
    ease = function (t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    };

    var Point = function(config){
      this.anchorX = config.x;
      this.anchorY = config.y;
      this.x = config.x;
      this.y = config.y;
      this.setTarget();  
    };

    Point.prototype.setTarget = function(){
      this.initialX = this.x;
      this.initialY = this.y;
      this.targetX = this.anchorX + rand(0, opt.range.x * 2) - opt.range.x;
      this.targetY = this.anchorY + rand(0, opt.range.y * 2) - opt.range.y;
      this.tick = 0;
      this.duration = rand(opt.duration.min, opt.duration.max);
    }
      
    Point.prototype.update = function(){
      var dx = this.targetX - this.x;
      var dy = this.targetY - this.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      
      if(Math.abs(dist) <= 0){
        this.setTarget();
      } else {       
        var t = this.tick;
        var b = this.initialY;
        var c = this.targetY - this.initialY;
        var d = this.duration;
        this.y = ease(t, b, c, d);
        
        b = this.initialX;
        c = this.targetX - this.initialX;
        d = this.duration;
        this.x = ease(t, b, c, d);
      
        this.tick++;
      }
    };
        
    Point.prototype.render = function(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
      ctx.fillStyle = '#000';
      ctx.fill();
    };

    var updatePoints = function(){
      var i = points.length;
      while(i--){
        points[i].update();
      }
    };

    var renderPoints = function(){
      var i = points.length;
      while(i--){
        points[i].render();
      }
    };

    var renderShape = function(){
      ctx.beginPath();
      var pointCount = points.length;
      ctx.moveTo(points[0].x, points[0].y);   
      var i;
      for (i = 0; i < pointCount - 1; i++) {
        var c = (points[i].x + points[i + 1].x) / 2;
        var d = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
      }
      ctx.lineTo(-opt.range.x - opt.thickness, ch + opt.thickness);
      ctx.lineTo(cw + opt.range.x + opt.thickness, ch + opt.thickness);
      ctx.closePath();   
      //ctx.fillStyle = 'hsl('+(tick/2)+', 80%, 60%)';
      ctx.fillStyle = waterColor;
      ctx.fill();  
      //ctx.stroke();
    };

    var clear = function(){
      ctx.clearRect(0, 0, cw, ch);
    };

    var loop = function(){
      window.requestAnimFrame(loop, c);
      tick++;
      clear();
      updatePoints();
      renderShape();
      //renderPoints();
    };

    var i = opt.count + 2;
    var spacing = (cw + (opt.range.x * 2)) / (opt.count-1);
    while(i--){
      points.push(new Point({
        x: (spacing * (i - 1)) - opt.range.x,
        y: ch - (ch * opt.level)
      }));
    }

    window.requestAnimFrame=function(){
        return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}
    }();
    if(c){
        loop();
    }
    ///fin efecto de agua


    /**  TERMINAN LAS FUNCIONES DE LA CALCULADORA RENAL**/

    /** FUNCIONES DE LA CALCULADORA DE GASTO CALÓRICO **/

    ///Valores iniciales
    var calAge=0;
    var calWei=0;
    var calHei=0;
    var waterColor="#A9E2F3";
    var actType="Ausente";
    var oldTMBValue=0;
    var TMBValue=0;
    var lsFactor=0;
    var divCenter;
    var divAnim;
    var RENumb=/^\d+$/;

    var divAgeCal;
    var divWeiCal;
    var divHeiCal;
    var dragClass;

    $("#caloric-male").text("✓");
    $("#caloric-sedentary").text("✓");
    $("#mob-caloric-male").text("✓");
    $("#mob-caloric-sedentary").text("✓");

    if(docWidth<1000){
        divAgeCal="#mob-caloric-drag-age";
        divWeiCal="#mob-caloric-drag-weight";
        divHeiCal="#mob-caloric-drag-height";
        inpAgeCal="#mob-caloric-input-age";
        inpHeiCal="#mob-caloric-input-height";
        inpWeiCal="#mob-caloric-input-weight";
        dragClass=".mob-drag-circle";
        divCenter="#mob-caloric-r1";
        divAnim="#mob-caloric-r2";
        divKeeCal="#mob-caloric-keep-val";
        divRedCal="#mob-caloric-reduce-val";
    }else{
        divAgeCal="#caloric-drag-age";
        divWeiCal="#caloric-drag-weight";
        divHeiCal="#caloric-drag-height";
        dragClass=".calc-drag-circle";
        inpAgeCal="#caloric-input-age";
        inpHeiCal="#caloric-input-height";
        inpWeiCal="#caloric-input-weight";
        divCenter="#caloric-r1";
        divAnim="#caloric-r2";
        divKeeCal="#caloric-keep-val";
        divRedCal="#caloric-reduce-val";
    };

     if($(divCenter).offset()!=undefined){
        var centerTop=$(divCenter).offset().top;
        var centerLeft=$(divCenter).offset().left;
        $(divAnim).offset({top:centerTop,left:centerLeft});
    }

    /// Agrear los eventos drag mouse y para touch
    //Edad
    addDragEvent(divAgeCal,inpAgeCal,0,99,calculateTMB);
    addDragTouch(divAgeCal,inpAgeCal,0,99,calculateTMB);
    //Peso
    addDragEvent(divWeiCal,inpWeiCal,0,150,calculateTMB);
    addDragTouch(divWeiCal,inpWeiCal,0,150,calculateTMB);
    //Estatura
    addDragEvent(divHeiCal,inpHeiCal,0,210,calculateTMB);
    addDragTouch(divHeiCal,inpHeiCal,0,210,calculateTMB);

    //Agrear los eventos para los input 
    inputNumValidation(inpAgeCal,divAgeCal,0,99,calculateTMB);
    inputNumValidation(inpWeiCal,divWeiCal,0,150,calculateTMB);
    inputNumValidation(inpHeiCal,divHeiCal,0,210,calculateTMB);

    /// función de cálculo de los valores de TMB
    function calculateTMB(){
        
        oldTMBValue=TMBValue;
        calAge=parseInt($(divAgeCal).text());
        calWei=parseInt($(divWeiCal).text());
        calHei=parseInt($(divHeiCal).text());
        if($("#caloric-female").text()=="✓"||$("#mob-caloric-female").text()=="✓"){
            TMBValue=655+(9.6*calWei)+(1.8*calHei)-(4.7*calAge);
        }else{
            TMBValue=66+(13.7*calWei)+(5*calHei)-(6.8*calAge);
        }

        var lista=$(".calc-square-sel");
        var labli=$(".calc-label-square");

        for(i=0;i<lista.length;i++){
            auxGroup=$(lista[i]).attr("group");
            if(auxGroup=="lifestyle" && $(lista[i]).text()=="✓"){
                lsFactor=parseFloat($(lista[i]).attr("value"));
                actType=$(labli[i]).text();
            }
        }

        TMBValue=Math.round(TMBValue);
        $(divAnim).text(TMBValue);
        $("#caloric-keep-val").text(Math.round(TMBValue*lsFactor));
        $("#caloric-reduce-val").text(Math.round(TMBValue*lsFactor)-500);
        animateResult();        
    }

    //Reinicio de los parámetros
    $("#caloric-reset-mob").click(function(){
        resetCalcValues();
    });

    $("#btn-reset-caloric").click(function(){
        resetCalcValues();
    });

    $("#caloric-share-mob").click(function(){
        openSendForm();
    });

    function resetCalcValues(){
        $(dragClass).offset({left:initLeft+5});
        $(dragClass).text("0");
        $(divCenter).text("0");
        $("#caloric-keep-val").text("0");
        $("#caloric-reduce-val").text("0");
        $(".calc-square-sel").text("");
        $("#caloric-male").text("✓");
        $("#mob-caloric-male").text("✓");
        $("#caloric-sedentary").text("✓");
        $("#mob-caloric-sedentary").text("✓");
        $(".calc-input-value").val("0");
    }

    //Animación de los resultados
    function animateResult(){
        $(divAnim).removeClass("caloric-no-shadow");
        $(divAnim).addClass("caloric-result");
        var left="";
        if(oldTMBValue>TMBValue){
            left="-=90";
            $(divAnim).offset({left:centerLeft+90});
            $(divAnim).addClass("caloric-shadow-l");
        }else{
            left="+=90";
            $(divAnim).offset({left:centerLeft-90});
            $(divAnim).addClass("caloric-shadow-r");
        }
        $(divCenter).stop().animate({
            opacity: 0,
            left: left
        },300,function(){
            $(divAnim).addClass("caloric-no-shadow");
            var divAux=divCenter;
            divCenter=divAnim;
            divAnim=divAux;
        });
        $(divAnim).stop().animate({
            opacity: 1,
            left: left
        },300);
    }

    ///Formulario de envio de correos 

    $("#form-send-caloric").submit(function(e){
        e.preventDefault();
        var wei=$(divWeiCal).text();
        var hei=$(divHeiCal).text();
        var age=$(divAgeCal).text();
        var name=$("#inputNombreR").val();
        var email=$("#inputEmailR").val();
        var gen="Masculino";
        
        if($("#caloric-female").text()!=""){
            gen="Femenino";
        }

        var result='<tr style="font-weight:bold; "><td colspan="3">Hola, '+name+'</td></tr>';
        result += '<tr height="30" align="center" style="font-size:14px;">';
        //titulo de la calculadora
        result += '<td colspan="3">Resultado de Calculadora de gasto calórico</td></tr>';
        //Resultado
        result += '<tr><td align="center" width="160" height="160">';
        result += '<span style="color:#E96244; font-size:35px; font-weight:bold;">'+TMBValue+'</span><br>';
        result += '<span style="color:#E96244; font-size:20px; font-weight:bold;">Calorías</span>';
        result += '</td>';
        //adicionales
        result += '<td colspan="2" style="font-size:14px;">';
        result += '<p>Calorias para mantener peso: <span style="color:#F0EB46; font-size:15px;">'+$(divRedCal).text()+'</span></p>';
        result += '<p>Calorias para adelgrazar: <span style="color:#E96244; font-size:15px;">'+$(divRedCal).text()+'</span></p>';    
        result += '<p>El método <span style="font-weight:bold;">Harris-Benedict</span> te permite descubrir de una forma mucho mas precisa el número de calorias que deberías consumir diariamente.<p>';
        result += '</td></tr>';
        //parametros
        result += '<tr><td colspan="3" style="font-weight:bold; font-size:14px;"><ul>';
        result += '<li>Sexo: <span style="font-weight:normal;">'+gen+'</span></li>';
        result += '<li>Edad: <span style="font-weight:normal;">'+age+'</span></li>';
        result += '<li>Peso(Kg): <span style="font-weight:normal;">'+wei+'</span></li>';
        result += '<li>Estatura(cm): <span style="font-weight:normal;">'+wei+'</span></li>';
        result += '<li>Actividad física: <span style="font-weight:normal;">'+actType+'</span></li>';
        result +='</ul></td></tr>';

        if(email==""||name==""){
            $(".foot-send-res").text("Llene todos los campos");
            $(".foot-send-res").fadeIn("fast",function(){
                setTimeout(function(){
                    $(".foot-send-res").fadeOut("fast");
                },1000);
            });
        }else{
            $("#btn-submit-cal").prop('disabled',true);
            sendData={
                SendEmail:email,
                Content:result
            };
            console.log(sendData);
            $.ajax({
                method: "POST",
                url: "https://fundacioncsapidevel.azurewebsites.net/api/email/sendresults/",
                dataType:"json",
                data: sendData,
                success:function(){
                    $(".foot-send-res").text("Enviado correctamente");
                    $("#inputNombreR").val("");
                    $("#inputEmailR").val("");
                    $(".foot-send-res").fadeIn("fast",function(){
                        setTimeout(function(){
                            $("#btn-submit-cal").prop('disabled',false);
                            $("#send-result-w").animate({
                                width: 0,
                                height: 0
                            });
                        },2000);
                    });
                },
                error:function(e){
                    console.log(e);
                    $(".foot-send-res").text("Error al enviar el correo");
                    $(".foot-send-res").fadeIn("fast",function(){
                        setTimeout(function(){
                            $(".foot-send-res").fadeOut("fast");
                            $("#btn-submit-cal").prop('disabled',false);
                        },2000);
                    });
                }

            });
        }
    });

    ////Funciones vista responsiva /////
    
    /// Muestra el otro resultado
    $("#caloric-res1").click(function(){
        firstResultCal();
    });

    $("#caloric-res2").click(function(){
        secondResultCal();
    });

    $("#caloric-results").on("swipeleft",function(){
        firstResultCal();
    });

    $("#caloric-results").on("swiperight",function(){
        secondResultCal();
    });

    function firstResultCal(){
        var mL=$("#caloric-container").width()/2+15;
        var marginLeft="-"+mL+"px";
        $("#caloric-container").css({"left":"50%","margin-left":marginLeft});
        $("#caloric-res1").addClass("ball-selected");
        $("#caloric-res2").removeClass("ball-selected");
        $("#caloric-res-exp").css("visibility","hidden");
        $("#caloric-container").stop().animate({
            opacity: 1
        },600);
        $("#caloric-values").stop().animate({
            opacity: 0
        },600);
    }

    function secondResultCal(){
        $("#caloric-res2").addClass("ball-selected");
        $("#caloric-res1").removeClass("ball-selected");
        var mL="-"+$("#caloric-values").width()/2+"px";
        $("#caloric-values").css({"left":"50%","margin-left":mL});
        $("#caloric-container").stop().animate({
            opacity: 0
        },600);
        $("#caloric-values").stop().animate({
            opacity: 1
        },600,function(){
            $("#caloric-res-exp").css("visibility","visible");
        });
    }

    // Fin de funciones responsivas //

    /******* 
        TERMINAN LA FUNCIONES DE GASTO CALÓRICO 
    *******/

    /*** FUNCIONES DE ACTIVIDAD FÍSICA ***/

    var fmc=0;
    var fcr=0;
    var imc=0;
    var act="low";
    $("#btn-reset-activity").click(function(){
        $(".calc-square-sel").text("");
    });
    $("#activity-male").text("✓");
    $("#activity-smkN").text("✓");
    var intensistyPer=0;
    $("#btn-send-activity").click(function(){
        if (
            ($('#g1n').text()=="✓" || $('#g1y').text()=="✓" )
            &&
            ($('#g2n').text()=="✓" || $('#g2y').text()=="✓" )
            &&
            ($('#g3n').text()=="✓" || $('#g3y').text()=="✓" )
            &&
            ($('#g4n').text()=="✓" || $('#g4y').text()=="✓" )
            &&
            ($('#g5n').text()=="✓" || $('#g5y').text()=="✓" )
            &&
            ($('#g6n').text()=="✓" || $('#g6y').text()=="✓" )
            &&
            ($('#g7n').text()=="✓" || $('#g7y').text()=="✓" )
           ) {
            
            lista=$(".calc-square-sel");
            var suma=0;
            document.getElementById('btn-print-activity').style.display = 'none';
            for(i=0;i<14;i++){
                if($(lista[i]).text()=="✓"){
                    suma+=parseInt($(lista[i]).attr("value"));
                }
            }

            if(suma<1){
                $("#activity-risk").css("background-color","#30B426");
                $('#lowRisk').notifyModal({
                    duration : 5500,
                    placement : 'center',
                    overlay : true,
                    type : 'notify',
                    onClose : function() {}
                });
                $("#activity-risk").text("Actividad física con bajo riesgo");

            }else{
                $("#activity-risk").css("background-color","#C1331A");
                $('#highRisk').notifyModal({
                    duration : 5500,
                    placement : 'center',
                    overlay : true,
                    type : 'notify',
                    onClose : function() {}
                });
                $("#activity-risk").text("Actividad física con alto riesgo. Realizar pruebas médicas antes de prescribir actividad física.");
            }
            $("#activity-calculator-b").show();

            $("#activity-calculator-b").animate({
                opacity : 1,
                left    :  "-=300px"  
            },1000,function(){
                $("#activity-calculator").hide();
                $("#activity-calculator-b").css("position","relative");
                $("#click-salud").css("margin-top","250px");
            });

            $("#activity-calculator").animate({
                opacity  : 0,
                left     : "+=300px" 
            },1000);
        }
        else{
            alert("Todos Los campos son requeridos!");
        }     
    });
    inputRecValidation("#activity-weight",1,200,calcActIMC);
    inputRecValidation("#activity-age",1,120,calcFMC);
    inputRecValidation("#activity-heigth",1,250,calcActIMC);
    inputRecValidation("#activity-press1",100,180,prueba);
    inputRecValidation("#activity-press2",80,120,prueba);
    inputRecValidation("#activity-waist",1,200,prueba);
    //Funcion para imprimir plan de Activividad
    $("#btn-print-activity").click(function(){
        
        var printContents = document.getElementById('activity-plan').innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    });
    ///Funcion general para la validación de los input
    function inputRecValidation(inpID,min,max,callback){
        $(inpID).on('change',function(){
            var val=$(inpID).val();
            if(RENumb.test(val)){
                val=(val<min)?min:val;
                val=(val>max)?max:val;
                $(inpID).val(val);
            }else{
                $(inpID).val(1);
            }
            callback();
        });
    };

    function prueba(){}

    function calcActIMC(){
        if($("#activity-weight").val() && $("#activity-heigth").val()){
            var weight=parseInt($("#activity-weight").val());
            var height=parseInt($("#activity-heigth").val())/100;
            imc=weight/(Math.pow(height,2));
            imc=Math.round(imc*100)/100;
            if($("#activity-female").text()=="✓"){
                imc+=1;
            }
            var html=imc + " Kg/m<sup>2</sup>";
            $("#activ-imc-res").html(html);
            $("#high-activity").text("");
            $("#medium-activity").text("");
            $("#low-activity").text("");
            if(imc<25){
                $("#high-activity").text("✓");
                intensistyPer=.8;
                act="high"
            }else if(imc>=25&&imc<30){
                $("#medium-activity").text("✓");
                act="medium";
                intensistyPer=.7;
            }else if(imc>30){
                $("#low-activity").text("✓");
                intensistyPer=.6;
                act="low";
            }
        }
    }

    $("#activity-female").click(function(){
        calcActIMC();
    });

    $("#activity-male").click(function(){
        calcActIMC();
    });

    function calcFMC(){
        fmc=180-parseInt($("#activity-age").val());
        fcr=Math.round(fmc*intensistyPer);
        $("#activ-FMC").text(fmc+" lpm");
        // $("#activ-FCR").text(fcr+" lpm");
    }

    $("#btn-ret-que").click(function(){
        $(".calc-square-sel").text("");
        $("#activity-calculator").css({"position":"absolute"});
        $("#activity-calculator").show();
        $("#activity-calculator-b").animate({
            opacity : 0,
            left    :  "+=300px"  
        },600,function(){
            $("#activity-calculator-b").hide();
            $("#activity-calculator").css("position","relative");
            $("#click-salud").css("margin-top","0px");
        });

        $("#activity-name").val("");
        $("#activity-weight").val("");
        $("#activity-age").val("");
        $("#activity-heigth").val("");
        $("#activity-press1").val("");
        $("#activity-press2").val("");
        $("#activity-waist").val("");
        $("#activity-limitation").val("");
        $("#activ-FCR").val("");

        var IMC_res1 = "";
        var IMC_res2 = "";

        IMC_res1+="<h1 id='activ-imc-res'>XX.XX kg/m<sup>2</sup></h1>";
        IMC_res2+="<h1 id='activ-FMC'>XXX lpm</h1>";

        $("#IMC_res1").html(IMC_res1);
        $("#IMC_res2").html(IMC_res2);


        $("#activity-calculator").animate({
            opacity  : 1,
            left     : "-=300px" 
        },600);
    });

    var highPlan=new Array(new Array('A','B','E','F'),new Array('A','C'),new Array('R'),new Array('A','B','E','F'),new Array('A','C'),new Array('R'),new Array('A','B','E','F'));
    var meidumPlan=new Array(new Array('A','B','C','D'),new Array('R'),new Array('C','F'),new Array('R'),new Array('A','B','C','D'),new Array('R'),new Array('R'));
    var lowPlan=new Array(new Array('A','B','C','D'),new Array('R'),new Array('C','F'),new Array('R'),new Array('A','B','C','D'),new Array('R'),new Array('R'));

    $("#btn-gen-plan").click(function(){
        document.getElementById('btn-share-activity').style.display = 'block';
        document.getElementById('btn-print-activity').style.display = 'block';

        var html_actividad_form = "";
        
        html_actividad_form+="<label for='inputNombreR'>Nombre</label>";
        html_actividad_form+="<input type='text' class='form-control' id='inputNombreR' placeholder='Nombre' value='"+$('#activity-name').val()+"'>";
        $("#form-send-activity-name").html(html_actividad_form);
        
        if(intensistyPer!=0){
            $("#arr-per-info").addClass("arr-transform");
            var currentPlan;
            var html = "";
            html += "<img src='img/PDF1.jpg' class='img-responsive'>";
            if(intensistyPer==.6){
                html+="<img src='img/low-activity-big.png' class='img-responsive'>";
                currentPlan=lowPlan;
            }else if(intensistyPer==.7){
                currentPlan=meidumPlan;
                html+="<img src='img/medium-activity-big.png' class='img-responsive'>";
            }else if(intensistyPer==.8){
                currentPlan=highPlan;
                html+="<img src='img/hight-activity-big.png' class='img-responsive'>";
            }
             html +="<img src='img/PDF2.jpg' class='img-responsive'>";
             if($("#activity-smkY").text()!=""){
                html +="<img src='img/PDF3.jpg' class='img-responsive'>";
             }
            $("#activity-plan").html(html);
            /*for(var i=0;i<4;i++){
                var lista=$("#tr-w"+i.toString()+">td");
                for(var j=0;j<7;j++){
                    dia=currentPlan[j];
                    var images="";
                    for(var k=0;k<dia.length;k++){
                       var img="<img src='img/img-plan"+dia[k]+".png'>"; 
                       images+=img;
                    }
                    $(lista[j+1]).html(images);
                }
            }*/
            $(".personal-recipe").animate({
                height: 45
            },400,function(){
                $(".title-recipe").css({"cursor":"pointer"});
                $("#activity-plan").show();
            });
        }
    });

    
    $(".title-recipe").click(function(){
        $("#activity-plan").hide();
        $("#arr-per-info").removeClass("arr-transform");
        $(".personal-recipe").animate({
            height: 600
        },400,function(){
            // $(".title-recipe").css({"cursor":"pointer"});
        });
    });

    //función para el envio de la calculadora
    $("#form-send-activity").submit(function(e){

        console.log('codigo para poner modal');

        e.preventDefault();
        var wei=$("#activity-weight").val();
        var hei=$("#activity-heigth").val();
        var age=$("#activity-age").val();
        var cc=$("#activity-waist").val();
        var ta=$("#activity-press1").val()+"/"+$("#activity-press2").val();
        var lim=$("#activity-limitation").val();
        var name=$("#inputNombreR").val();
        var email=$("#inputEmailR").val();
        var gen="Masculino";
        var smk=false;
        var activ_FCR = $("#activ-FCR").val();

        if($("#activity-female").text()!=""){
            gen="Femenino";
        }

        if($("#activity-smkY").text()!=""){
            smk=true;
        }

        if(email==""||name==""){
            $(".foot-send-res").text("Llene todos los campos");
            $(".foot-send-res").fadeIn("fast",function(){
                setTimeout(function(){
                    $(".foot-send-res").fadeOut("fast");
                },1000);
            });
        }else{
            $("#btn-submit-act").prop('disabled',true);
            sendData={
                SendEmail: email,
                Activity: act,
                FCR: fcr.toString(),
                FCM: fmc.toString(),
                Limitation: lim, 
                Name: name,
                Age: age,
                Gender: gen,
                Weight: wei,
                Size: hei,
                IMC: activ_FCR,
                CC: cc,
                AT: ta,
                Smoke: smk          
            };
            console.log(sendData);
            $.ajax({
                method: "POST",
                url: "https://fundacioncsapidevel.azurewebsites.net/api/email/plan-activity/",
                dataType:"json",
                data: sendData,
                success:function(){
                    $(".foot-send-res").text("Enviado correctamente");
                    $("#inputNombreR").val("");
                    $("#inputEmailR").val("");
                    $(".foot-send-res").fadeIn("fast",function(){
                        setTimeout(function(){
                            $("#btn-submit-act").prop('disabled',false);

                            $("#send-result-w").animate({
                                width: 0,
                                height: 0
                            });
                        },2000);
                    });
                },
                error:function(e){
                    console.log(e);
                    $(".foot-send-res").text("Error al enviar el correo");
                    $(".foot-send-res").fadeIn("fast",function(){
                        setTimeout(function(){
                            $(".foot-send-res").fadeOut("fast");
                            $("#btn-submit-cal").prop('disabled',false);
                        },2000);
                    });
                }

            });
        }
    });
    /*** FIN DE LAS FUNCIONES DE ACTIVIDAD FISICA**/

    /*** FUNCIONES DE ESQUEMA DE VACUNACIÓN ***/

    /***Correo de vacunación***/
    $("#form-send-vacc").submit(function(e){
        e.preventDefault();
        var tabla=document.getElementById("kids-vacc-table").childNodes;
        // tabla = tabla[1];
        var tabla_2 = tabla[1];
        var name=$("#inputNombreVac").val();
        var email=$("#inputEmailVac").val();

        if(email==""||name==""){
            $(".foot-send-res").text("Llene todos los campos");
            $(".foot-send-res").fadeIn("fast",function(){
                setTimeout(function(){
                    $(".foot-send-res").fadeOut("fast");
                },1000);
            });
        }else{
            $("#btn-submit-vacc-kids").prop('disabled',true);
            sendData={
                SendEmail: email,
                Content: tabla_2.innerHTML
            };
            $.ajax({
                method: "POST",
                url: "https://fundacioncsapidevel.azurewebsites.net/api/email/sendresults/",
                dataType:"json",
                data: sendData,
                success:function(){
                    $(".foot-send-res").text("Enviado correctamente");
                    $("#inputNombreVac").val("");
                    $("#inputEmailVac").val("");
                    $(".foot-send-res").fadeIn("fast",function(){
                        setTimeout(function(){
                            $("#btn-submit-vacc-kids").prop('disabled',false);
                            $("#send-result-w").animate({
                                width: 0,
                                height: 0
                            });
                        },2000);
                    });
                },
                error:function(e){
                    console.log(e);
                    $(".foot-send-res").text("Error al enviar el correo");
                    $(".foot-send-res").fadeIn("fast",function(){
                        setTimeout(function(){
                            $(".foot-send-res").fadeOut("fast");
                            $("#btn-submit-imc").prop('disabled',false);
                        },2000);
                    });
                }

            });
        }
    });

    $("#form-send-vacc-teen").submit(function(e){
        e.preventDefault();
        var tabla=document.getElementById("adult-vacc-table").childNodes;
        // tabla = tabla[1];
        var tabla_2 = tabla[1];
        var name=$("#inputNombreVac-teen").val();
        var email=$("#inputEmailVac-teen").val();

        if(email==""||name==""){
            $(".foot-send-res").text("Llene todos los campos");
            $(".foot-send-res").fadeIn("fast",function(){
                setTimeout(function(){
                    $(".foot-send-res").fadeOut("fast");
                },1000);
            });
        }else{
            $("#btn-submit-vacc-kids-teen").prop('disabled',true);
            sendData={
                SendEmail: email,
                Content: tabla_2.innerHTML
            };
            $.ajax({
                method: "POST",
                url: "https://fundacioncsapidevel.azurewebsites.net/api/email/sendresults/",
                dataType:"json",
                data: sendData,
                success:function(){
                    $(".foot-send-res").text("Enviado correctamente");
                    $("#inputNombreVac-teen").val("");
                    $("#inputEmailVac-teen").val("");
                    $(".foot-send-res").fadeIn("fast",function(){
                        setTimeout(function(){
                            $("#btn-submit-vacc-kids-teen").prop('disabled',false);
                            $("#send-result-w-teen").animate({
                                width: 0,
                                height: 0
                            });
                        },2000);
                    });
                },
                error:function(e){
                    console.log(e);
                    $(".foot-send-res").text("Error al enviar el correo");
                    $(".foot-send-res").fadeIn("fast",function(){
                        setTimeout(function(){
                            $(".foot-send-res").fadeOut("fast");
                            $("#btn-submit-vacc-kids-teen").prop('disabled',false);
                        },2000);
                    });
                }

            });
        }
    });
    /***Correo de vacunación***/
    var colors=new Array();
    var colorsA=new Array();

    colors.push("#fde000");
    colors.push("#37a9df");
    colors.push("#f9af12");
    colors.push("#8e2492");
    colors.push("#8fc800");
    colors.push("bi");
    colors.push("#e06f07");
    colors.push("#066196");
    colors.push("#049107");
    colors.push("#eb05c0");
    colors.push("#26eae6");
    colors.push("#d91b5b");
    colors.push("tri");
    colors.push("#ed7dab");
    colors.push("#6b6b6b");

    colorsA.push("#8fc800");
    colorsA.push("tri");
    colorsA.push("#26eae6");
    colorsA.push("#d91b5b");
    colorsA.push("#049107");
    colorsA.push("#066196");
    colorsA.push("#eb05c0");
    colorsA.push("#37a9df");
    colorsA.push("#6b6b6b");


    colorCircles();
    colorAdultCircles();
    var col=0;
    var row=0;
    var prevClass="";
    var hidepop=true;
    var lista1,lista2;
    var nameVacs=new Array("BCG","Hepatitis B","Poliomielitis inactiva","H. Influezaeb","DPat","Rotavirus","Neumococo conjugada","Neumococo Polisacárida","Influeza Virus","Hepatitis A","Sarampión, Rubéola, Parotiditis","Varicela","Virus de papiloma humano","dpaT","Meningococo ACYW");
    var txtVacs=new Array()
    txtVacs.push("La vacuna BCG es una preparación de bacterias vivas atenuadas derivadas de un cultivo de bacilos de Calmette y Guérin (Mycobacterium bovis). BCG significa Bacilo de Calmette y Guérin.");
    txtVacs.push("La vacuna contiene una de las proteínas que cubren al virus de la hepatitis B, que es llamada antígeno de superficie de la hepatitis B, la vacuna actualmente se fabrica usando ADN recombinante");
    txtVacs.push("La polio es una enfermedad causada por un virus. Entra en el cuerpo a través de la boca. Por lo general no causa una enfermedad grave, pero a veces causa parálisis (no poder mover un brazo o una pierna) y puede causar meningitis");
    txtVacs.push("La enfermedad provocada por el Haemophilus influenzae tipo b (Hib) es una enfermedad grave causada por una bacteria. Por lo general, afecta a niños menores de 5 años.");
    txtVacs.push("La vacuna pentavalente protege a tu hija (o) contra cinco enfermedades: difteria, tosferina, tétanos, poliomielitis e infecciones producidas por Haemophilus Influenzae tipo b.");
    txtVacs.push("El rotavirus es un virus que causa diarrea, principalmente en bebés y niños pequeños. La diarrhea puede ser severa, y provoca deshidratación. Los vómitos y la fiebre también son comunes en bebés con rotavirus.");
    txtVacs.push("Se recomienda la vacuna neumocócica conjugada (llamada PCV13 o Prevnar 13) para proteger a los lactantes y niños pequeños, y a algunos niños más grandes y adultos con determinadas afecciones de salud contra la enfermedad neumocócica.");
    txtVacs.push("La enfermedad neumocócica es causada por bacterias que pueden propagarse de persona a persona a través del contacto. Puede causar infecciones de oído, y también puede conducir a infecciones más graves");
    txtVacs.push("Las vacunas contra la influenza hacen que los anticuerpos se desarrollen en el cuerpo aproximadamente dos semanas después de la vacunación. Estos anticuerpos brindan protección contra la infección con los virus incluidos en la vacuna.");
    txtVacs.push("La hepatitis A es una enfermedad seria del hígado, causada por el virus de la hepatitis A (HAV). El HAV se encuentra en el excremento de las personas que tienen hepatitis A.");
    txtVacs.push("La mejor manera de protegerse contra el sarampión es con la vacuna contra el sarampión, las paperas y la rubéola (también llamada vacuna triple vírica o MMR). Los médicos recomiendan que todos los niños reciban la vacuna MMR.");
    txtVacs.push("Esta vacuna puede prevenir la mayoría de las causas de cáncer cervical en mujeres, si se aplica antes de la exposición al virus. Además, puede prevenir el cáncer vaginal y vulvar en mujeres, así como las verrugas genitales y el cáncer anal tanto en hombres como en mujeres.");
    txtVacs.push("Es una suspensión de toxoides tetánico y diftérico purificados y 3 antígenos purificados de Bordetella pertussis (Toxina pertussis inactivada, hemaglutinina filamentosa tratada con formaldehído y pertactina)");
    txtVacs.push("La vacuna antimeningocócica conjugada ACWY está indicada para la inmunización activa de niños, adolescentes y adultos en riesgo de exposición a Neisseria meningitidis grupos A, C, W-135 e Y, para prevenir la enfermedad meningocócica invasiva.");

    $("#vacc-btn-teen").click(function(){
        $("#kids-vacc-table").hide();
        $("#adult-vacc-table").show();
        $("#vacc-age-container").hide();
        $("#vacc-select-type").hide();
        $("#vacc-select-type2").show();
        document.getElementById('share_vacc_teen').style.display ='block';
        document.getElementById('share_vacc').style.display ='none';
    });

    $("#vacc-btn-kids").click(function(){
        $("#adult-vacc-table").hide();
        $("#kids-vacc-table").show();
        $("#vacc-age-container").show();
        $("#vacc-select-type").show();
        $("#vacc-select-type2").hide();
        document.getElementById('share_vacc_teen').style.display ='none';
        document.getElementById('share_vacc').style.display ='block'; 
    });

    // $(".vacc-select").click(function(){
    //     var current=$(this).attr('id');
    //     lista=$("#"+current+">div");
    //     for(i=0;i<lista.length;i++){
    //         $(lista[i]).toggle("fast");
    //     }
    // });
    
    $("#vacc-select-type").click(function(){
        lista=$("#vacc-select-type>div");
        lista1=$("#vacc-select-type2>div");
        lista2=$("#vacc-select-age>div");
        if (band1) {
            band1=false;
            for(i=0;i<lista.length;i++){
                $(lista[i]).toggle("fast");
            }
        }
        else{
            band1=true;
            for(i=0;i<lista.length;i++){
                $(lista[i]).toggle("fast");
            }
        }
        if (!band2) {
            band2=true;
            for(i=0;i<lista1.length;i++){
                $(lista1[i]).toggle("fast");
            }
        }
        if (!band3) {
            band3=true;
            for(i=0;i<lista2.length;i++){
                $(lista2[i]).toggle("fast");
            }
        };
    });
    
    $("#vacc-select-type2").click(function(){
        lista=$("#vacc-select-type2>div");
        lista1=$("#vacc-select-type>div");
        lista2=$("#vacc-select-age>div");
        if (band2) {
            band2=false;
            for(i=0;i<lista.length;i++){
                $(lista[i]).toggle("fast");
            }
        }
        else{
            band2=true;
            for(i=0;i<lista.length;i++){
                $(lista[i]).toggle("fast");
            }
        }
        if (!band1) {
            band1=true;
            for(i=0;i<lista1.length;i++){
                $(lista1[i]).toggle("fast");
            }
        }
        if (!band3) {
            band3=true;
            for(i=0;i<lista2.length;i++){
                $(lista2[i]).toggle("fast");
            }
        };
    });
    
    $("#vacc-select-age").click(function(){ 
        lista=$("#vacc-select-age>div");
        lista1=$("#vacc-select-type>div");
        lista2=$("#vacc-select-type2>div");
        if (band3) {
            band3=false;
            for(i=0;i<lista.length;i++){
                $(lista[i]).toggle("fast");
            }
        }
        else{
            band3=true;
            for(i=0;i<lista.length;i++){
                $(lista[i]).toggle("fast");
            }
        }
        if (!band2) {
            band2=true;
            for(i=0;i<lista2.length;i++){
                $(lista2[i]).toggle("fast");
            }
        }
        if (!band1) {
            band1=true;
            for(i=0;i<lista1.length;i++){
                $(lista1[i]).toggle("fast");
            }
        };
    });
    
    $(".vacc-option").click(function(){
        var parent=$(this).parent().attr("id");
        $("#"+parent+"> .vacc-selected").html($(this).html());
        if(parent=="vacc-select-age"){ 
            $("#vacc-select-type > .vacc-selected").html("<div class='vacc-option-txt'>Todas las vacunas</div>");
            row=$(this).attr("value");
            col=0;
        }else{
            $("#vacc-select-age > .vacc-selected").html("<div class='vacc-option-txt'>Todas las edades</div>");
            col=$(this).attr("value");
            row=0;
        }
        discolorCircles();
    });

     $(".vacc-ad-option").click(function(){
        var parent=$(this).parent().attr("id");
        $("#"+parent+"> .vacc-selected").html($(this).html());
        if(parent=="vacc-select-age"){
            row=$(this).attr("value");
        }else{
            col=$(this).attr("value");
        }
        discolorAdCircles();
    });

    function colorCircles(){
        for(var i=1;i<16;i++){
            var lista=$("#kr"+i.toString()+">td");
            for(var j=1;j<lista.length;j++){
                if($(lista[j]).html()!=""){
                    var cCircle="";
                    if(colors[i-1]=="bi"){
                        if(j!=4){
                            cCircle="<div style='background-color:#232162;width: 14px;height: 7px;border-radius: 14px 14px 0 0;-moz-border-radius: 14px 14px 0 0;-webkit-border-radius : 14px 14px 0 0;margin-left: 41%;'></div>";
                            cCircle+="<div style='width : 14px;height : 7px;border-radius: 0 0 14px 14px;-moz-border-radius: 0 0 14px 14px;-webkit-border-radius : 0 0 14px 14px;background-color: red;margin-left: 41%;'></div>";
                        }else{
                            cCircle="<div style='width : 14px;height : 7px;border-radius: 0 0 14px 14px;-moz-border-radius: 0 0 14px 14px;-webkit-border-radius : 0 0 14px 14px;background-color: red;margin-left: 41%;'></div>";
                        }
                    }else if(colors[i-1]=="tri"){
                        cCircle="<div style='position: relative; width: 8px;height: 8px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 53%;margin-left: 48%;margin-top: -10px; background-color:#8E612E;'></div>";
                        cCircle+="<div style='position: relative; width: 8px;height: 8px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 64%;margin-top: 4px; background-color:#8E612E;margin-left:35%;'></div>";
                        cCircle+="<div style='position: relative; width: 8px;height: 8px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 7%;margin-top: 4px; background-color:#8E612E;margin-left:60%;'></div>";
                    }else{
                        cCircle="<div style='position: relative; width: 14px;height: 14px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 50%;margin-left: 41%;margin-top: -7px; background-color:"+colors[i-1]+"'></div>";
                    }
                    $(lista[j]).html(cCircle);
                }
            }
        }
    }
    // efrain.canales@icomsys.com.mx
    function colorAdultCircles(){
        for(var i=1;i<11;i++){
            var lista=$("#gr"+i.toString()+">td");
            var cCircle="";
            if(colorsA[i-1]=="tri"){
                if ($(window).width()<1000) {
                    cCircle="<div style='position: relative; width: 8px;height: 8px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 53%;margin-left: 48%;margin-top: -10px; background-color:#8E612E;'></div>";
                    cCircle+="<div style='position: relative; width: 8px;height: 8px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 64%;margin-top: 4px; background-color:#8E612E;margin-left:31%;'></div>";
                    cCircle+="<div style='position: relative; width: 8px;height: 8px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 7%;margin-top: 4px; background-color:#8E612E;margin-left:53%;'></div>";
                }
                else{
                    cCircle="<div style='position: relative; width: 8px;height: 8px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 53%;margin-left: 48%;margin-top: -10px; background-color:#8E612E;'></div>";
                    cCircle+="<div style='position: relative; width: 8px;height: 8px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 64%;margin-top: 4px; background-color:#8E612E;margin-left:42%;'></div>";
                    cCircle+="<div style='position: relative; width: 8px;height: 8px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 7%;margin-top: 4px; background-color:#8E612E;margin-left:53%;'></div>";
                }
            }else{
                cCircle="<div style='position: relative; width: 14px;height: 14px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;background-color: #aaa;top: 50%;left: 50%;margin-left: -7px;margin-top: -7px; background-color:"+colorsA[i-1]+"'></div>";
            }
            $(lista[1]).html(cCircle);
        }
    }

    function discolorCircles(){
        for(var i=1;i<16;i++){
            var filas=$("#kr"+i.toString()+">td");
            if(i!=col&&col!=0){
                for(var j=1;j<filas.length;j++){
                    if($(filas[j]).html()!=""){
                        var gCircle="";
                        if(colors[i-1]=="bi"){
                            if(j!=4){
                                gCircle="<div style='width: 14px;height: 7px;border-radius: 14px 14px 0 0;-moz-border-radius: 14px 14px 0 0;-webkit-border-radius : 14px 14px 0 0;background-color: #aaa;margin-left : 23px;'></div>";
                                gCircle+="<div style='width : 14px;height : 7px;border-radius: 0 0 14px 14px;-moz-border-radius: 0 0 14px 14px;-webkit-border-radius : 0 0 14px 14px;background-color: #999999;margin-left: 23px;'></div>";
                            }else{
                                gCircle="<div style='width : 14px;height : 7px;border-radius: 0 0 14px 14px;-moz-border-radius: 0 0 14px 14px;-webkit-border-radius : 0 0 14px 14px;background-color: #999999;margin-left: 23px;'></div>";
                            }
                        }else if(colors[i-1]=="tri"){
                            gCircle="<div style='position: relative; width: 8px;height: 8px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 53%;margin-left: 48%;margin-top: -10px; background-color:#aaa;'></div>";
                            gCircle+="<div style='position: relative; width: 8px;height: 8px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 64%;margin-top: 4px; background-color:#aaa;margin-left:35%;'></div>";
                            gCircle+="<div style='position: relative; width: 8px;height: 8px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 7%;margin-top: 4px; background-color:#aaa;margin-left:60%;'></div>";
                        }else{
                            gCircle="<div style='position: relative; width: 14px;height: 14px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;background-color: #aaa;top: 50%;left: 50%;margin-left: -7px;margin-top: -7px; '></div>";
                        }
                        $(filas[j]).html(gCircle);
                    }
                }
            }else{
                for(var j=1;j<filas.length;j++){
                    if($(filas[j]).html()!=""){
                        if(j==row||row==0){
                            var cCircle="";
                            if(colors[i-1]=="bi"){
                                if(j!=4){
                                    cCircle="<div style='width: 14px;height: 7px;border-radius: 14px 14px 0 0;-moz-border-radius: 14px 14px 0 0;-webkit-border-radius : 14px 14px 0 0;background-color: #aaa;margin-left : 23px;background-color:#232162'></div>";
                                    cCircle+="<div style='width : 14px;height : 7px;border-radius: 0 0 14px 14px;-moz-border-radius: 0 0 14px 14px;-webkit-border-radius : 0 0 14px 14px;background-color: #999999;margin-left: 23px;background-color:#ff001e'></div>";
                                }else{
                                    cCircle="<div style='width : 14px;height : 7px;border-radius: 0 0 14px 14px;-moz-border-radius: 0 0 14px 14px;-webkit-border-radius : 0 0 14px 14px;background-color: #999999;margin-left: 23px;background-color:#ff001e'></div>";
                                }
                            }else if(colors[i-1]=="tri"){
                                cCircle="<div style='float: left;width: 24px;height: 24px;margin-left: 20px;margin-top: 3px;background:url(img/circle-papig.png);background:url(img/circle-papic.png)'></div>";
                            }else{
                                cCircle="<div style='position: relative; width: 14px;height: 14px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;background-color: #aaa;top: 50%;left: 50%;margin-left: -7px;margin-top: -7px; background-color:"+colors[i-1]+"'></div>";
                            }
                            $(filas[j]).html(cCircle);
                        }else{
                            var gCircle="";
                            if(colors[i-1]=="bi"){
                                if(j!=4){
                                    gCircle="<div style='width: 14px;height: 7px;border-radius: 14px 14px 0 0;-moz-border-radius: 14px 14px 0 0;-webkit-border-radius : 14px 14px 0 0;background-color: #aaa;margin-left : 23px;'></div>";
                                    gCircle+="<div class='vacc-b-circle'></div>";
                                }else{
                                    gCircle="<div class='vacc-b-circle'></div>";
                                }
                            }else if(colors[i-1]=="tri"){
                                gCircle="<div style='float: left;width: 24px;height: 24px;margin-left: 20px;margin-top: 3px;background:url(img/circle-papig.png);'></div>";
                            }else{
                                gCircle="<div style='position: relative; width: 14px;height: 14px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;background-color: #aaa;top: 50%;left: 50%;margin-left: -7px;margin-top: -7px; '></div>";
                            }
                            $(filas[j]).html(gCircle);
                        }
                    }
                }
            }
        }
    }
    function discolorAdCircles(){
        if(col==0){
            colorAdultCircles();
        }else{
            for(var i=1;i<10;i++){
                var filas=$("#gr"+i.toString()+">td");
                if(i==col){
                    if(colorsA[i-1]=="tri"){
                        cCircle="<div style='float: left;width: 24px;height: 24px;margin-left: 20px;margin-top: 3px;background:url(img/circle-papig.png);background:url(img/circle-papic.png)'></div>";
                    }else{
                        cCircle="<div style='position: relative; width: 14px;height: 14px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;background-color: #aaa;top: 50%;left: 50%;margin-left: -7px;margin-top: -7px; background-color:"+colorsA[i-1]+"'></div>";  
                    }
                    $(filas[1]).html(cCircle);
                }else{
                    if(colorsA[i-1]=="tri"){
                        gCircle="<div style='position: relative; width: 8px;height: 8px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 53%;margin-left: 50%;margin-top: -10px; background-color:#aaa;'></div>";
                        gCircle+="<div style='position: relative; width: 8px;height: 8px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 64%;margin-top: 4px; background-color:#aaa;margin-left:45%;'></div>";
                        gCircle+="<div style='position: relative; width: 8px;height: 8px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;top: 7%;margin-top: 4px; background-color:#aaa;margin-left:55%;'></div>";
                        console.log(gCircle);
                    }else{
                        gCircle="<div style='position: relative; width: 14px;height: 14px;-webkit-border-radius : 50%;-moz-border-radius: 50%;border-radius: 50%;background-color: #aaa;top: 50%;left: 50%;margin-left: -7px;margin-top: -7px; '></div>";
                    }
                    $(filas[1]).html(gCircle);
                }
            }
        }
    }
    var popTO;
    $(".first-col").click(function(e){

        hidepop=false;
        var numCol=parseInt($(this).attr("value"))-1;
        var posY=365 +(numCol*40);
        if(numCol==5){
            $(".vacc-top1-pop").css({"background":"#252060"});
            $(".vacc-top2-pop").css({"background":"#ff001f"});
        }else if(numCol==12){
            $(".vacc-top1-pop").css({"background":"#764b29"});
            $(".vacc-top2-pop").css({"background":"#764b29"});
        }else{
            $(".vacc-top1-pop").css({"background":colors[numCol]});
            $(".vacc-top2-pop").css({"background":colors[numCol]});  
        }
        var htmlvacs="<h4>"+nameVacs[numCol]+"</h4>";
        htmlvacs+="<p>"+txtVacs[numCol]+"</p>";
        $(".vacc-txt-pop").html(htmlvacs);
        $(".vacc-popup").offset({top:posY});
        $(".vacc-popup").css({"overflow":"visible","height":"0px","width":"0px","opacity":"0"});
        $(".vacc-popup").stop().animate({
            height   :  200,
            width    :  270,
            opacity  : 1
        },500);
        // console.log($(this).attr("value"));
        checkPopup();
    });

    $(".vacc-popup").mouseover(function(){
        hidepop=false;
        checkPopup();
    });

    $(".vacc-popup").mouseout(function(){
        hidepop=true;
        checkPopup();
    });

    $(".first-col").mouseover(function(e){
        hidepop=false;
        checkPopup();
    });

    $(".first-col").mouseout(function(e){
        hidepop=true;
        checkPopup();
    });

    function checkPopup(){
       popTO=setTimeout(function(){
            if(hidepop){
                $(".vacc-popup").stop().animate({
                    width    : 0,
                    height   : 0,
                    opacity  : 0
                },500, function(){
                    //$(".vacc-popup").css("overflow","hidden");                    
                });
            }
        },1000);
    }

    /*** FIN DE FUNCIONES DE ESQUEMA DE VACUNACIÓN***/

});

