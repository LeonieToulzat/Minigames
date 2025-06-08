<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background-size: 100%;
            background-image: url('sky.png');
        }

        .infinitebutton img {
            position: absolute;
            left: 30%;
            bottom: 40%;
            cursor: pointer;
            width: 217px;
            height: 73px;
            
        }

        .infinitebutton img:hover {
            width: 244px;
            height: 82px;
        }

        .timedbutton img {
            position: absolute;
            right: 30%;
            bottom: 40%;
            cursor: pointer;
            width: 217px;
            height: 73px;
            
        }

        .timedbutton img:hover {
            width: 244px;
            height: 82px;
        }

        canvas {
            display: block;
        }

        .title {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-family: 'Pixelify Sans', sans-serif;
    font-size: 50px;
    z-index: 10;
}


    </style>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
</head>
</head>

    <button id="infinitebutton" class="infinitebutton img">
        <img src="infinitebutton.png" alt="infinitebutton">
    </button>
    <button id="timedbutton" class="timedbutton img">
        <img src="timedbutton.png" alt="timedbutton">
    </button>
    <h1 class="title">Choose your game mode:</h1>



    <script>

        document.getElementById("infinitebutton").addEventListener("click", function() {
            document.location.href = "indexinfinite.php";
        });
        document.getElementById("timedbutton").addEventListener("click", function() {
            document.location.href = "indextimed.php";
        });

        

    </script>
</body>
</html>




