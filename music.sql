-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Июн 07 2015 г., 15:10
-- Версия сервера: 5.6.21
-- Версия PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `music`
--

-- --------------------------------------------------------

--
-- Структура таблицы `playlist`
--

CREATE TABLE IF NOT EXISTS `playlist` (
`id` int(11) NOT NULL,
  `object` text,
  `current` tinyint(1) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user` text NOT NULL,
  `audio_id` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `playlist`
--

INSERT INTO `playlist` (`id`, `object`, `current`, `user_id`, `user`, `audio_id`) VALUES
(90, '{"id":"id_366470940","owner_id":20898331,"artist":"Би-2 и Чичерина","title":"Мой Рок-н-ролл","duration":405,"url":"http://cs7-5v4.vk-cdn.net/p20/d6b3263f0cc2ba.mp3?extra=KFyE6lq5Ff0SdGxfsD1LIz3oUvJiQD1ctgN9NjHyoWhswhxaGsMrSE_2dTIT1Qe7NDPcL1NnBJ1Xhm3B38DPIBqs0vLKSRUh","lyrics_id":163673,"genre_id":1,"$$hashKey":"00J"}', 0, NULL, '{"id":20898343,"fio":"Евгений Филипьев","token":"6d2ad0f7ae3eb75ed5c92a78f1b3d6f2c6ec4443a567304e5d5546463e23c64e55b8fb5ab1ad8ff99bc19","vk_id":20898331}', 'id_366470940'),
(91, '{"id":"id_367880126","owner_id":20898331,"artist":"ДДТ","title":"На небе вороны","duration":223,"url":"http://cs7-2v4.vk-cdn.net/p12/c3820ee569ab67.mp3?extra=Hl_6zM0IwFaeegL7o5wQeriKve5ID3K0okDk-UN4zyKacgDJdV3b50jQH6KFsleVLxoZ0m3NSRVyx112H5bBhYFkxhTIKWP6","lyrics_id":7072387,"genre_id":1,"$$hashKey":"00G"}', 0, NULL, '{"id":20898343,"fio":"Евгений Филипьев","token":"6d2ad0f7ae3eb75ed5c92a78f1b3d6f2c6ec4443a567304e5d5546463e23c64e55b8fb5ab1ad8ff99bc19","vk_id":20898331}', 'id_367880126'),
(92, '{"id":"id_78783264","owner_id":4665445,"artist":"The Beatles","title":"Yesterday","duration":130,"url":"http://cs7-3v4.vk-cdn.net/p16/c73b816b693caa.mp3?extra=tqSAgCz_sAL-SeybApq1-QlER3GHKAvZPbxUP9ZUNObkqOGOW6iRiE-O1JlGQSS1PCeaDUi7TlIzOm4hnF1AtmvG84TKKw","lyrics_id":2365986,"genre_id":1,"$$hashKey":"1EX"}', 1, NULL, '{"id":20898343,"fio":"Евгений Филипьев","token":"6d2ad0f7ae3eb75ed5c92a78f1b3d6f2c6ec4443a567304e5d5546463e23c64e55b8fb5ab1ad8ff99bc19","vk_id":20898331}', 'id_78783264'),
(93, '{"id":"id_369319369","owner_id":20898331,"artist":"show MONICA","title":"Make me wanna die (Acoustic)","duration":210,"url":"http://cs7-2v4.vk-cdn.net/p7/cf9189f3612d78.mp3?extra=XfqFuZP1xFAexKxr3qTI3uryiLJVvac5b6l-mFp1pWWQeN5bqTZO5Gm8XwijqtJPMiUJWfqD3L4cubeDZR96YHf2Enk4Cfjd","genre_id":18,"$$hashKey":"0UZ"}', 0, NULL, '{"id":20898343,"fio":"Евгений Филипьев","token":"6d2ad0f7ae3eb75ed5c92a78f1b3d6f2c6ec4443a567304e5d5546463e23c64e55b8fb5ab1ad8ff99bc19","vk_id":20898331}', 'id_369319369');

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(255) COLLATE utf8_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('S_Pe4_Wn1lZrxIyBK1E2bhCRPJsgXVqe', 1433768892, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":20898343}}');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`id` int(11) NOT NULL,
  `fio` varchar(45) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `vk_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20898344 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `fio`, `token`, `vk_id`) VALUES
(20898343, 'Евгений Филипьев', '6d2ad0f7ae3eb75ed5c92a78f1b3d6f2c6ec4443a567304e5d5546463e23c64e55b8fb5ab1ad8ff99bc19', 20898331);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `playlist`
--
ALTER TABLE `playlist`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `audio_id_4` (`audio_id`), ADD KEY `audio_id` (`audio_id`), ADD KEY `audio_id_2` (`audio_id`), ADD KEY `audio_id_3` (`audio_id`);

--
-- Индексы таблицы `sessions`
--
ALTER TABLE `sessions`
 ADD PRIMARY KEY (`session_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`id`), ADD KEY `vk_id` (`vk_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `playlist`
--
ALTER TABLE `playlist`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=94;
--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20898344;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
