<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['uid'])) {
    echo json_encode(null);
    exit;
}

include_once(__DIR__ . '/../inc/db.inc.php');

$uid = $_SESSION['uid'];
$stmt = $db->prepare('SELECT uid, username, mail, sid FROM users WHERE uid = ? LIMIT 1');
$stmt->execute([$uid]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($user ?: null, JSON_UNESCAPED_UNICODE);
