<?php
// foxdbquery.php
// This file is used to query the foxdb database
// and perform various operations such as adding, updating, deleting, and retrieving data.
// Database connection
require_once 'foxdb.sql';


// add score
$addscore = "INSERT INTO score (id_score, score, date) VALUES (:id_score, :score, :date)";

// get score
$getscore = "SELECT score FROM score WHERE id_score = :id_score";

// get all scores by date
$getallscoredate = "SELECT * FROM score WHERE id_score = :id_score ORDER BY date DESC";

// get all scores by score
$getallscore = "SELECT * FROM score WHERE id_score = :id_score ORDER BY score ASC";

