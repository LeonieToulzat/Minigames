CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL
)

CREATE TABLE `games` (
  `id_game` int(11) NOT NULL,
  `gamename` varchar(255) DEFAULT NULL
)

CREATE TABLE `score` (
  `id_score` int(11) NOT NULL,
  `score` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `fk_userid_user` int(11) NOT NULL,
  `fk_gamesid_game` int(11) NOT NULL
)