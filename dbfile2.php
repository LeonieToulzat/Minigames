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
    print_r($scores);

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
        echo "Username: " . $row['username'] . " | Game: " . $row['gamename'] . " | Score: " . $row['score'] . " | Date: " . $row['date'] . "<br>";
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
        echo "Username: " . $row['username'] . " | Game: " . $row['gamename'] . " | Score: " . $row['score'] . " | Date: " . $row['date'] . "<br>";
    }
}

ShowScores($conn, 25);
ShowAllScores($conn);
?>