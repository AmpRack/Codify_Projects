<?php
 
if (isset($_POST['email'])) {
 
    $email_to = "rob.hill@gmail.com";
    $email_subject = "Message from Portfolio";
 
    function died($error) {
        // Error display
        echo "Sorry, but something went wrong with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please fix these errors, and try again. <br /><br />";
        die();
    }
 
    // Form data validation
    if (!isset($_POST['name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['telephone']) ||
        !isset($_POST['message'])) {
        died('Sorry, but there appears to be a problem with the form you submitted.');       
    }
 
    $name = $_POST['name'];           // required
    $email_from = $_POST['email'];    // required
    $telephone = $_POST['telephone']; // not required
    $messages = $_POST['message'];    // required
 
    $error_message = "";
 
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
    if(!preg_match($email_exp,$email_from)) { 
      $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
    }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
    if(!preg_match($string_exp,$name)) {
      $error_message .= 'The Name you entered does not appear to be valid.<br />';
    }
 
    if(strlen($message) < 2) {
      $error_message .= 'The Comments you entered do not appear to be valid (too short).<br />';
    }
 
    if(strlen($error_message) > 0) {
      died($error_message);
    }
 
    $email_message = "Form details below.\n\n";
 
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 
    $email_message .= "Name: ".clean_string($name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Telephone: ".clean_string($telephone)."\n";
    $email_message .= "Message: ".clean_string($message)."\n";
 
    // create email headers
    $headers = 'From: '.$email_from."\r\n".
    'Reply-To: '.$email_from."\r\n" .
    'X-Mailer: PHP/' . phpversion();
    @mail($email_to, $email_subject, $email_message, $headers);  
?>
 
<!-- include your own success html here -->
Message sent successfully!
 
<?php
}
?>