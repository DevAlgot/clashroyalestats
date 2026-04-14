<?php
session_start();

/* Bygger upp sql frågan */

if (isset($_POST["mail"]) && isset($_POST["pass"])) {
    include_once('inc/db.inc.php');

    $mail = $_POST["mail"];
    $pass = $_POST["pass"];

    $sqlkod = "SELECT * FROM users WHERE '$mail' = users.mail;";

    $return = '/';
    if (!empty($_POST['return'])) {
        $ret = $_POST['return'];
        // sanitize: only allow internal paths starting with '/'
        if (is_string($ret) && strpos($ret, '/') === 0 && strpos($ret, 'http') === false) {
            $return = $ret;
        }
    }

    /* Kör frågan mot databasen world och tabellen country */
    $stmt = $db->prepare($sqlkod);
    $stmt->execute();

    /* Anger teckenkodningen för webbläsaren */
    header('Content-Type: text/html; charset=utf-8');

    /* skriver ut resultatet på webbsidan. */
    $user = $stmt->fetch(PDO::FETCH_ASSOC);


    if (password_verify($pass, $user['password'])) {
        echo "<h1>Welcome " . $user['username'] . "</h1>";
        $_SESSION['uid'] = $user['uid'];

        session_regenerate_id(true);

        //get the uid from session id

        header("Location: /");
        exit;
    } else {
        echo "<h1>Wrong password</h1>";
        exit;
    }
} else {
    echo "Mail and password not set.";
    exit;
}


?>

<html>

<body>

    Welcome <?php echo $_POST["mail"]; ?><br>
    Password: <?php echo $_POST["pass"]; ?>

</body>

</html>