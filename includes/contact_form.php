<?php
if(isset($_POST['user_name'])){
	$name 		= $_POST['user_name'];
	$email 		= $_POST['user_email'];
	$to 		= 'email@gmail.com';
	$subject 	= $_POST['message_subject'];
	$message 	= $_POST['message_content'];
	$headers 	= 'From: '. $name .' <'.$email.'>';
	
	if(mail($to, $subject, $message, $headers)){
		echo 'success';
	}
	else{
		echo 'fail';
	}
}
?>