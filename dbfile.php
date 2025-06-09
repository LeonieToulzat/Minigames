<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



    // connect to database
    $conn = mysqli_connect("localhost", "root", "", "foxdb");

    // check connection
    if (!$conn){
        echo "Connection failed: " . mysqli_connect_error();
    }


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'save_username') {
    if (isset($_POST['username']) && !empty(trim($_POST['username']))) {
        SaveUsername($conn, $_POST['username']);
    } else {
        echo "Username is required.";
    }
    exit;
}

if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
}


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'save_score') {
    //if (isset($_SESSION['username']) && isset($_POST['score'])) {
        $username = $_SESSION['username'];
        $score = intval($_POST['score']);
        $gameId = intval($_POST['gameId']);

        //$username = $_SESSION['username'];
        /*
        $username = $_POST['username'] ?? ($_SESSION['username'] ?? null);
        if (!$username) {
            echo "Username is missing.";
            exit;
        }*/


        // Get user ID//
        /*
        $stmtUser = mysqli_prepare($conn, "SELECT id_user FROM user WHERE username = ?");
        mysqli_stmt_bind_param($stmtUser, "s", $username);
        mysqli_stmt_execute($stmtUser);
        $resultUser = mysqli_stmt_get_result($stmtUser);
        $row = mysqli_fetch_assoc($resultUser);*/

        $userQuery = "SELECT id_user FROM user WHERE username = ?";
        $stmt = mysqli_prepare($conn, $userQuery);
        mysqli_stmt_bind_param($stmt, "s", $username);
        mysqli_stmt_execute($stmt);
        $userResult = mysqli_stmt_get_result($stmt);
        $user = mysqli_fetch_assoc($userResult);

        //if ($row) {
        if ($user) {
            $userId = $user['id_user']; //$row
            $date = date('Y-m-d');

            // Insert score
            $insertScore = "INSERT INTO score (score, date, fk_userid_user, fk_gamesid_game)
                            VALUES (?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $insertScore);
            if (!$stmt) {
                die("Prepare failed: " . mysqli_error($conn));
            }

            mysqli_stmt_bind_param($stmt, "isii", $score, $date, $userId, $gameId);
            //mysqli_stmt_execute($stmt);
            //echo "Score saved!";
            if (mysqli_stmt_execute($stmt)) {
                echo "Score saved successfully.";
            } else {
                echo "Error saving score: " . mysqli_error($conn);
            }
        } else {
            echo "User not found.";
        }
    //} else {
        //echo "Missing username or score.";
    //}
    exit;
}

/*
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'submit_score') {
    if (isset($_SESSION['username']) && isset($_POST['score'])) {
        $username = $_SESSION['username'];
        $score = intval($_POST['score']); // sanitize score

        // Get user ID
        $userQuery = "SELECT id_user FROM user WHERE username = ?";
        $stmt = mysqli_prepare($conn, $userQuery);
        mysqli_stmt_bind_param($stmt, "s", $username);
        mysqli_stmt_execute($stmt);
        $userResult = mysqli_stmt_get_result($stmt);
        $user = mysqli_fetch_assoc($userResult);

        if ($user) {
            $userId = $user['id_user'];
            $gameId = 1; // Assuming this is game1
            $date = date("Y-m-d");

            // Insert score
            $insertScore = "INSERT INTO score (score, date, fk_userid_user, fk_gamesid_game)
                            VALUES (?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $insertScore);
            if (!$stmt) {
                die("Prepare failed: " . mysqli_error($conn));
            }

            mysqli_stmt_bind_param($stmt, "isii", $score, $date, $userId, $gameId);

            if (mysqli_stmt_execute($stmt)) {
                echo "Score saved successfully.";
            } else {
                echo "Error saving score: " . mysqli_error($conn);
            }
        } else {
            echo "User not found.";
        }
    } else {
        echo "Missing username or score.";
    }
    exit;
}
*/

    // write query for all scores
    $getallscores = "SELECT * FROM score";

    // add score
    $addscore = "INSERT INTO score (id_score, score, date) VALUES (:id_score, :score, :date)";

    // get score
    $getscore = "SELECT score FROM score";

    // get all scores by date
    $getallscoredate = "SELECT * FROM score ORDER BY date DESC";

    // get all scores by score
    $getallscorebyscore = "SELECT * FROM score ORDER BY score ASC";
/*
// Query to get all scores ordered by score (lowest to highest)
$getAllScoresByScore = "
    SELECT s.score, s.date, u.username, g.gamename
    FROM score s
    JOIN user u ON s.fk_userid_user = u.id_user
    JOIN games g ON s.fk_gamesid_game = g.id_game
    ORDER BY s.score ASC
";

// Execute query
$result = mysqli_query($conn, $getAllScoresByScore);

// Fetch the resulting rows as an associative array
$scores = mysqli_fetch_all($result, MYSQLI_ASSOC);
*/


    //make query and get result
    $result = mysqli_query($conn, $getallscorebyscore);

    // fetch the resulting rows as an array
    $scores = mysqli_fetch_all($result, MYSQLI_ASSOC);
    //print_r($scores);

// Function to show scores greater than a given value
function ShowScores(mysqli $conn, int $minScore): void
{
    $query = "
        SELECT s.score, s.date, u.username, g.gamename
        FROM score s
        JOIN user u ON s.fk_userid_user = u.id_user
        JOIN games g ON s.fk_gamesid_game = g.id_games
        WHERE s.score >= ?
        ORDER BY s.score DESC
    ";

    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $minScore);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    while ($row = mysqli_fetch_assoc($result)) {
        //echo "Username: " . $row['username'] . " | Game: " . $row['gamename'] . " | Score: " . $row['score'] . " | Date: " . $row['date'] . "<br>";
        echo $row['username'] . $row['gamename'] . " | Score: " . $row['score']. $row['date'] . "<br>";

    }
}

function ShowAllScores(mysqli $conn): void
{
    $query = "
        SELECT s.score, s.date, u.username, g.gamename
        FROM score s
        JOIN user u ON s.fk_userid_user = u.id_user
        JOIN games g ON s.fk_gamesid_game = g.id_games
        ORDER BY s.score DESC
    ";
    $result = mysqli_query($conn, $query);
    while ($row = mysqli_fetch_assoc($result)) {
        //echo "Username: " . $row['username'] . " | Game: " . $row['gamename'] . " | Score: " . $row['score'] . " | Date: " . $row['date'] . "<br>";
        echo  $row['username'] ." | ". $row['gamename'] . " | Score: " . $row['score'] ." | ".  $row['date'] . "<br>";
    }
}

function SaveUsername(mysqli $conn, string $username): void
{
    $username = mysqli_real_escape_string($conn, trim($username)); // sanitize input

    $query = "INSERT INTO user (username) VALUES ('$username')";
    if (mysqli_query($conn, $query)) {
        $_SESSION['username'] = $username; // Store in session if needed
        echo "Username saved.";
    } else {
        echo "Error saving username: " . mysqli_error($conn);
    }
}


function Test(): void
{
    echo "test";
}
/*
ShowScores($conn, 25);
ShowAllScores($conn);
Test();*/
?>
