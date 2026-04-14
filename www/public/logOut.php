<?php
session_start();

$_SESSION = array(); // Clear session data

session_regenerate_id(true); // Regenerate session ID to prevent fixation

header("Location: /"); // Redirect to homepage after logout
exit();
