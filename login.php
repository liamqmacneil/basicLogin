<?php
    if (isset($_POST['email'])) {
        $email = $_POST['email'];
        if (preg_match('/.+\@.+\./',$email)) {
            echo "login";
        }else {
            echo "invalid";
        }
    }
?>