<?php   
    require_once('class.phpmailer.php');
    $email_from = 'tochtli.olivos@icomsys.com.mx';
    $email_to = $_POST['email'];
    $inResult = $_POST['result'];

	$email_msg  = '<table width="700" border="0" style="border-spacing:0px; font-family:Verdana, Sans-serif;">';
	$email_msg .= '<tr><td width="600" height="40" style="background-color:#008DF6;" colspan="2"></td>';
	$email_msg .= '<td style="background-color:#008DF6; padding-right:10px;"><img src="http://icom-systems.com/slimv3/img/logo-port-mail.png"></td></tr>';
	$email_msg .= '<tr align="center" style="text-align:center; margin-top:20px;">';
	$email_msg .= '<td colspan="3"><img src="http://icom-systems.com/slimv3/img/logo-black.png"></td></tr>';
	$email_msg .= '<tr align="center"><td colspan="3">';
	$email_msg .= '<table width="630" border="0" style="border:2px solid #f2f2f2; background-color:#f9f9f9; padding:5px;">';
	$email_msg .= $inResult.'</table></td></tr>';
	$email_msg .= '<tr  align="center" style="font-size:12px;">';
    $email_msg .= '<td width="520" align="right">Siguenos en nuestras redes sociales:</td>';
	$email_msg .= '<td width="80" align="left"><img src="http://icom-systems.com/slimv3/img/twitter-off.png"><img src="http://icom-systems.com/slimv3/img/face-off.png"></td>';
	$email_msg .= '<td  align="left"></td></tr>';
	$email_msg .= '<tr style="padding:10px; color:008DF6;" align="center"><td height="40" colspan="3">www.portafoliodigital.com</td></tr>';
	$email_msg .= '<tr><td height="40" align="center" style="background-color:#008DF6; color:#eee; font-size:11px;" colspan="3">';
    $email_msg .= 'Copyright 2015 Instituto Carlos Slim de la Salud. Todos los derechos reservados</td></tr></table>';

	try{
		$mail = new PHPMailer();
		$mail->CharSet = 'UTF-8';
		$mail->IsSendMail();
		$mail->SetFrom($email_from,$inNombre);
		$mail->AddAddress($email_to);
		$mail->Subject = utf8_decode('Resultados de la Calculadora');
		$mail->MsgHTML($email_msg);
		if($mail->Send()){
            echo "Correcto";
        }else{
            echo "Error";
        }
    }catch(Exception $e){
        echo "Error: ".$e->getMessage();
    }
?>