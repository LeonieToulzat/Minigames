<?php 
require_once('/opt/lampp/htdocs/dbgame/dbfile.php');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="catchtimed.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
</head>
<body data-gameid="1">
    <button id="buttonhome" class="buttonhome img">
        <img src="home.png" alt="home">
    </button>
    <canvas id="gameCanvas"></canvas>
    <div id="timer">Time left: 15s</div>
    <script src="catchtimed.js"></script>
</body>
</html>