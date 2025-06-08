<?php 
require_once('/opt/lampp/htdocs/dbgame/dbfile.php');
?>

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
/*
        .startbutton img {
            /*position: absolute;
            /*bottom: 30%;
            cursor: pointer;
            width: 156px;
            height: 72px;
            left: 50%;
            transform: translateX(-50%);
            top: 90%;
            transform: translateY(-20%);
        }

        .startbutton img:hover {
            width: 175px;
            height: 81px;
        }*/

        .dbscore {
            position: absolute;
            right: 5%;
            top: 5%;
            font-size: 20px;
            color: white;
            ;
            background-color: rgba(134, 43, 13, 0.5);
            padding: 10px;
            border-radius: 5px;
            font-family: 'Pixelify Sans', sans-serif;
            
            
        }

        .title {
            /*position: absolute;*/
            top: 25%;
            left: 50%;
            transform: translateX(-50%);
            color: black;
            font-family: 'Pixelify Sans', sans-serif;
            font-size: 20px;
            z-index: 10;
        }

        #namePopup {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            padding: 30px;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            border-radius: 10px;
        }

        .popup-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }

        .popup-title {
            font-family: 'Pixelify Sans', sans-serif;
            font-size: 24px;
            color: black;
            margin: 0;
        }

        #playerName {
            padding: 10px;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid #ccc;
            width: 220px;
            text-align: center;
        }

        .startbutton {
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
        }

        .startbutton img {
            width: 156px;
            height: 72px;
            transition: all 0.2s ease;
        }

        .startbutton img:hover {
            width: 175px;
            height: 81px;
        }

        .back img {
            position: absolute;
            left: 3%;
            top: 3%;
            cursor: pointer;
            width: 80px;
            height: 80px;
            
        }

        .back img:hover {
            width: 90px;
            height: 90px;
        }




    </style>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
</head>
</head>

    <form id="form">
        <div class="dbscore">
            <?php
            echo '<label for="dbscore">Score:</label>';
            echo '<br>';
            ShowAllScores($conn);
            ?>
        </div>
    </form>
<!--
    <button id="startbutton" class="startbutton img">
        <img src="start.png" alt="startbutton">
    </button>-->
    <!--
    <div id="namePopup" style="display: block; 
                            position: fixed; 
                            top: 30%; 
                            left: 50%; 
                            transform: translate(-50%, -50%);
                            background: #fff; 
                            padding: 20px; 
                            border: 1px solid #ccc; 
                            box-shadow: 0 0 10px rgba(0,0,0,0.2); 
                            z-index: 1000;">
        <h3 class = "title">Enter your name</h3>
        <input type="text" id="playerName" placeholder="Your name" />
        
        <button onclick="SaveUsername()" id="startbutton" class="startbutton img">
            <img src="start.png" alt="startbutton">
        </button>

    </div>-->
    <button id="back" class="back img">
        <img src="back.png" alt="back">
    </button>

    <div id="namePopup">
        <div class="popup-content">
            <h3 class="popup-title">Enter your name</h3>
            <input type="text" id="playerName" placeholder="Your name" />
            <button onclick="SaveUsername()" class="startbutton">
                <img src="start.png" alt="Start Button">
            </button>
        </div>
    </div>



    <script>

        document.getElementById("back").addEventListener("click", function() {
            document.location.href = "index.php";
        });

        document.getElementById("startbutton").addEventListener("click", function() {
            document.location.href = "catchtimed.php";
        });
        
       

        function SaveUsername() {
            const name = document.getElementById("playerName").value.trim();

            if (name === "") {
                alert("Please enter your name.");
                return;
            }

            fetch('/dbgame/dbfile.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'action=save_username&username=' + encodeURIComponent(name)
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById('namePopup').style.display = 'none';
                console.log("Server response:", data);
                window.location.href = "catchtimed.php"; // move to game after saving
            })
            .catch(error => {
                console.error("Error saving username:", error);
            });
        }

        

        

    </script>
</body>
</html>




