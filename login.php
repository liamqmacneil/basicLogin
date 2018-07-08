<?php
    $dataObj = new \stdClass();
    if (isset($_POST['email'])) {
        if (isset($_POST['password'])) {
            $email = $_POST['email'];
            $password = $_POST['password'];
            if (preg_match('/.+\@.+\..+/',$email)) {
                //I'd use a DB connection here but I feel
                //thats too complex and would make testing
                //annoying, I'd use something like mongodb
                if ($email == 'email@email.com') {
                    if ($password == 'password') {
                        $dataObj->status = '1';
                        $dataObj->payload = 'Login Successful.';
                        echo json_encode($dataObj);
                        exit();
                        
                    }
                }
            }
        }
    }
    $dataObj->status = '0';
    $dataObj->payload = 'Invalid email and/or password.';
    echo json_encode($dataObj);
?>
