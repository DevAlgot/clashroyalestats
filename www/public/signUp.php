<?php
if (isset($_POST['mail'], $_POST['sid'], $_POST['username'], $_POST['pass'])) {
    include_once('inc/db.inc.php');

    $mail = filter_input(INPUT_POST, 'mail', FILTER_SANITIZE_SPECIAL_CHARS);
    $sid = filter_input(INPUT_POST, 'sid', FILTER_SANITIZE_SPECIAL_CHARS);
    $user = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_SPECIAL_CHARS);
    $pwd = password_hash($_POST['pass'], PASSWORD_DEFAULT);

    /* Bygger upp sql frågan */
    $stmt = $db->prepare("INSERT INTO users(uid, username, mail, password, sid) VALUES(UUID(), :user, :mail ,:pwd, :sid)");

    $stmt->bindValue(":mail", $mail);
    $stmt->bindValue(":sid", $sid);
    $stmt->bindValue(":user", $user);
    $stmt->bindValue(":pwd", $pwd);

    // Om INSERT gick bra! Om man användarnamn är upptaget fungerar inte insert
    try {
        $stmt->execute();

        // hämta uid som DB genererade för raden vi just la till
        $sel = $db->prepare("SELECT uid FROM users WHERE username = :user LIMIT 1");
        $sel->bindValue(":user", $user);
        $sel->execute();
        $row = $sel->fetch(PDO::FETCH_ASSOC);

        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        $_SESSION['uid'] = $row['uid'] ?? null;

        session_regenerate_id(true);

        header("Location: /");
    } catch (Exception $e) {
        header('Content-Type: text/html; charset=utf-8');
        echo "<p>Kunde inte lägga till användaren. Kontrollera användarnamnet</p>";
        echo "<a href='addUserForm.html'>Försök igen</a>";
        echo "<p>Felmeddelande: " . $e->getMessage() . "</p>";
    }
}
