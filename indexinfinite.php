<?php /*
session_start(); 
ini_set('display_errors', 1);
error_reporting(E_ALL);

$conn = mysqli_connect("localhost", "root", "", "foxdb");

    // check connection
    if (!$conn){
        echo "Connection failed: " . mysqli_connect_error();
    }*/
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

        .button1 img {
            position: absolute;
            left: 500px;
            bottom: 200px;
            cursor: pointer;
            width: 80px;
            height: 80px;
            
        }

        .button1 img:hover {
            width: 90px;
            height: 90px;
        }

        .button2 img {
            position: absolute;
            left: 900px;
            bottom: 300px;
            cursor: pointer;
            width: 80px;
            height: 80px;
            
        }

        .button2 img:hover {
            width: 90px;
            height: 90px;
        }

        .button3 img {
            position: absolute;
            left: 1300px;
            bottom: 250px;
            cursor: pointer;
            width: 80px;
            height: 80px;
            
        }

        .button3 img:hover {
            width: 90px;
            height: 90px;
        }

        .button4 img {
            position: absolute;
            left: 1200px;
            bottom: 500px;
            cursor: pointer;
            width: 80px;
            height: 80px;
            
        }

        .button4 img:hover {
            width: 90px;
            height: 90px;
        }

        .button5 img {
            position: absolute;
            left: 800px;
            bottom: 550px;
            cursor: pointer;
            width: 80px;
            height: 80px;
            
        }

        .button5 img:hover {
            width: 90px;
            height: 90px;
        }

        .button6 img {
            position: absolute;
            left: 550px;
            bottom: 700px;
            cursor: pointer;
            width: 80px;
            height: 80px;
            
        }

        .button6 img:hover {
            width: 90px;
            height: 90px;
        }

        .button7 img {
            position: absolute;
            left: 1000px;
            bottom: 800px;
            cursor: pointer;
            width: 80px;
            height: 80px;
            
        }

        .button7 img:hover {
            width: 90px;
            height: 90px;
        }

        .back img {
            position: absolute;
            left: 50px;
            top: 50px;
            cursor: pointer;
            width: 80px;
            height: 80px;
            
        }

        .back img:hover {
            width: 90px;
            height: 90px;
        }
        /*
        .dbscore {
            position: absolute;
            left: 80px;
            bottom: 800px;
            font-size: 20px;
            color: white;
            ;
            background-color: rgba(134, 43, 13, 0.5);
            padding: 10px;
            border-radius: 5px;
            font-family: 'Pixelify Sans', sans-serif;
            
            
        }*/

    </style>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
</head>
</head>
<!--
    <form id="form">
        <div class="dbscore">
            <?php
            echo '<label for="dbscore">Score:</label>';
            echo '<br>';
            ShowAllScores($conn);
            ?>
        </div>
    </form>-->
    <button id="button1" class="button1 img">
        <img src="button1.png" alt="button1">
    </button>
    <button id="button2" class="button2 img">
        <img src="button2.png" alt="button2">
    </button>
    <button id="button3" class="button3 img">
        <img src="button3.png" alt="button3">
    </button>
    <button id="button4" class="button4 img">
        <img src="button4.png" alt="button4">
    </button>
    <button id="button5" class="button5 img">
        <img src="button5.png" alt="button5">
    </button>
    <button id="button6" class="button6 img">
        <img src="button6.png" alt="button6">
    </button>
    <button id="button7" class="button7 img">
        <img src="button7.png" alt="button6">
    </button>
    <button id="back" class="back img">
        <img src="back.png" alt="back">
    </button>
</form>
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
        <h3>Enter your name</h3>
        <input type="text" id="playerName" placeholder="Your name" />
        
        <button onclick="SaveUsername()">Start to play</button>

    </div>-->


    <script>
        
        document.getElementById("button1").addEventListener("click", function() {
            document.location.href = "catch.php";
        });
        document.getElementById("button2").addEventListener("click", function() {
            document.location.href = "chrome.html";
        });
        document.getElementById("button3").addEventListener("click", function() {
            document.location.href = "flappyfox.html";
        });
        document.getElementById("button4").addEventListener("click", function() {
            document.location.href = "whackarabbit.html";
        });
        document.getElementById("button5").addEventListener("click", function() {
            document.location.href = "simon.html";
        });
        document.getElementById("button6").addEventListener("click", function() {
            document.location.href = "race.html";
        });
        document.getElementById("button7").addEventListener("click", function() {
            document.location.href = "platform.html";
        });
        document.getElementById("back").addEventListener("click", function() {
            document.location.href = "index.php";
        });

        /*
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
            })
            .catch(error => {
                console.error("Error saving username:", error);
            });
        }*/

    </script>
</body>
</html>




