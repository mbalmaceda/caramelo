<?php
require 'PHPMailer/PHPMailerAutoload.php';
require 'PHPMailer/extras/Security.php';

define('SMTP_HOST', 'starbuck.asoshared.com'); // Hostname of the mail server
define('SMTP_USERNAME', 'no-reply@mjnails.cl'); // Username for SMTP authentication any valid email created in your domain
define('SMTP_PASSWORD', 'zg4T#UfgUgyE'); // Password for SMTP authentication
define('SMTP_PORT', 465); // Port of the SMTP like to be 25, 80, 465 or 587

// To address who will receive this email
$to = 'mariajesus@mjnails.cl';

$security = new Security();
// This IF condition is for improving security and Prevent Direct Access to the Mail Script.
if (isset($_POST['nombre']) AND  isset($_POST['asunto']) AND isset($_POST['email']) AND isset($_POST['mensaje']))
{
    // Collect POST data from form
    $name = $security->xss_clean($_POST['nombre']);
    $subject_form = $security->xss_clean($_POST['asunto']);
    $email = $security->xss_clean($_POST['email']);
    $message = $security->xss_clean($_POST['mensaje']);

    // Prefedined Variables
    $set_from = 'Caramelo Notification Mailer';
    $subject = 'Contacto: ' . $subject_form . '!';

    // Collecting all content in HTML Table
    $content = '<table width="100%">
    <tr><td colspan="2"><strong>Detalles de Contacto:</strong></td></tr>
    <tr><td valign="top">Nombre:</td><td>' . $name . '</td></tr>
    <tr><td valign="top">Email:</td><td>' . $email . '</td></tr>
    <tr><td valign="top">Mensaje:</td><td>' . $message . '</td></tr>
    </table> ';

    try {
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->Port = SMTP_PORT;
        $mail->SMTPSecure = 'ssl';
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;

        $mail->setFrom(SMTP_USERNAME, $set_from);
        $mail->addAddress($to);

        $mail->Subject = $subject;
        $mail->msgHTML($content);
        // Send the message
        $result = false;
        if ($mail->send()) {
            $result = true;
        }
        echo json_decode($result);
    } catch (phpmailerException $e) {
        echo $e->errorMessage(); //Pretty error messages from PHPMailer
    } catch (Exception $e) {
        echo $e->getMessage(); //Boring error messages from anything else!
    }
}