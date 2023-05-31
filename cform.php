
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (
        !empty($_POST['name'])
        && !empty($_POST['email'])
        && !empty($_POST['message'])
    ) {
        $name = $_POST["name"];
        $email = $_POST["email"];
        $message = $_POST["message"];
        
        // Only assign $phone and $subject if they are present in the form data
        $phone = isset($_POST["phone"]) ? $_POST["phone"] : "";
        $subject = isset($_POST["subject"]) ? $_POST["subject"] : "";

        $to = "ccoding0@gmail.com";
        $subject_line = "New Contact Form Submission: ". $subject;
        $body = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nSubject: {$subject}\nMessage: {$message}";
        $headers = "From: {$email}";

        if (mail($to, $subject_line, $body, $headers)) {
            echo "Message sent successfully!";
        } else {
            echo "Failed to send message.";
        }
    }
}
?>