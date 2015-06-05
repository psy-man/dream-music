-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Июн 05 2015 г., 17:54
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
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `playlist`
--

INSERT INTO `playlist` (`id`, `object`, `current`, `user_id`) VALUES
(17, '{"id":"id_370800009","owner_id":20898331,"artist":"marius nedelcu ft red head","title":"rain (acoustic version)Удивительно нежная и романтичная песня!!!! :))","duration":216,"url":"http://cs7-3v4.vk-cdn.net/p19/9e6e4f43475b48.mp3?extra=tvrWooIefGnktvlkbZj6640VE9b0gr9ClrWtIPIb2Eg1f14Ks8Tdd6v65tKB60UcJ9eWQodlNl3XaeW2hwdgapst3uGwIwHf","lyrics_id":4983832,"genre_id":18,"$$hashKey":"003"}', NULL, NULL),
(18, '{"id":"id_370065329","owner_id":20898331,"artist":"Kakkmaddafakka ","title":"Someone New (Roosevelt Remix)","duration":420,"url":"http://cs7-5v4.vk-cdn.net/p22/4f00ade866c92b.mp3?extra=plHVcjbGxVxIMblUh51V3_tYDCvrEFsINVE65F4C2ChQ2WLeEGyaXOer4-plBX3tokJxUB2T5a3q2Wz1BQrwXTtU_q8OPM0C","lyrics_id":101149842,"genre_id":9,"$$hashKey":"004"}', NULL, NULL),
(19, '{"id":"id_367880303","owner_id":20898331,"artist":" Пернатый Змей","title":"В тебе ","duration":218,"url":"http://cs7-3v4.vk-cdn.net/p11/e449ba5118a185.mp3?extra=EvYYfUt6AiCWYMW1Cy3iGXYM16Xa1Sx5mck9coX1U61C-78kRvDK_gi1aDk9_yNxTTeNWa0V6ZBvRF0lx9UcCrooR4DPnF7a","lyrics_id":10189371,"genre_id":1,"$$hashKey":"007"}', NULL, NULL),
(20, '{"id":"id_370065329","owner_id":20898331,"artist":"Kakkmaddafakka ","title":"Someone New (Roosevelt Remix)","duration":420,"url":"http://cs7-5v4.vk-cdn.net/p22/4f00ade866c92b.mp3?extra=plHVcjbGxVxIMblUh51V3_tYDCvrEFsINVE65F4C2ChQ2WLeEGyaXOer4-plBX3tokJxUB2T5a3q2Wz1BQrwXTtU_q8OPM0C","lyrics_id":101149842,"genre_id":9,"$$hashKey":"004"}', NULL, NULL),
(21, '{"id":"id_370065329","owner_id":20898331,"artist":"Kakkmaddafakka ","title":"Someone New (Roosevelt Remix)","duration":420,"url":"http://cs7-5v4.vk-cdn.net/p22/4f00ade866c92b.mp3?extra=plHVcjbGxVxIMblUh51V3_tYDCvrEFsINVE65F4C2ChQ2WLeEGyaXOer4-plBX3tokJxUB2T5a3q2Wz1BQrwXTtU_q8OPM0C","lyrics_id":101149842,"genre_id":9,"$$hashKey":"004"}', NULL, NULL),
(22, '{"id":"id_367880303","owner_id":20898331,"artist":" Пернатый Змей","title":"В тебе ","duration":218,"url":"http://cs7-3v4.vk-cdn.net/p11/e449ba5118a185.mp3?extra=EvYYfUt6AiCWYMW1Cy3iGXYM16Xa1Sx5mck9coX1U61C-78kRvDK_gi1aDk9_yNxTTeNWa0V6ZBvRF0lx9UcCrooR4DPnF7a","lyrics_id":10189371,"genre_id":1,"$$hashKey":"007"}', NULL, NULL),
(23, '{"id":"id_366411610","owner_id":20898331,"artist":"Hollywood Undead","title":"Paradise Lost","duration":190,"url":"http://cs7-2v4.vk-cdn.net/p19/52f39f55393d2e.mp3?extra=cU6GW6ttAq14htPLUbIkp-uKrIE0zlg8jiVwdq3vyuKe7Eej5klvVgpkYGyl3tWZdY7rgQ5-p1ZysTPGp4ejT9--hJUCk6Ln","lyrics_id":2942663,"genre_id":21,"$$hashKey":"009"}', NULL, NULL),
(24, '{"id":"id_366568679","owner_id":20898331,"artist":"Armin Van Buuren ","title":"This Is What It Feels Like (feat. Trevor Guthrie)","duration":317,"url":"http://cs7-4v4.vk-cdn.net/p13/342478c8004504.mp3?extra=CdpcwOqyX4VjO63ef4KRB8DLa8y82LP4_7GyT5YzH0lg4fz3TSeVAN2P120Xe8MjfjtGC0Luq81daRShnWTTbcbF1OtZmVXx","lyrics_id":252114870,"genre_id":11,"$$hashKey":"00A"}', NULL, NULL),
(25, '{"id":"id_370800009","owner_id":20898331,"artist":"marius nedelcu ft red head","title":"rain (acoustic version)Удивительно нежная и романтичная песня!!!! :))","duration":216,"url":"http://cs7-3v4.vk-cdn.net/p19/9e6e4f43475b48.mp3?extra=tvrWooIefGnktvlkbZj6640VE9b0gr9ClrWtIPIb2Eg1f14Ks8Tdd6v65tKB60UcJ9eWQodlNl3XaeW2hwdgapst3uGwIwHf","lyrics_id":4983832,"genre_id":18,"$$hashKey":"003"}', NULL, NULL),
(26, '{"id":"id_367880303","owner_id":20898331,"artist":" Пернатый Змей","title":"В тебе ","duration":218,"url":"http://cs7-3v4.vk-cdn.net/p11/e449ba5118a185.mp3?extra=EvYYfUt6AiCWYMW1Cy3iGXYM16Xa1Sx5mck9coX1U61C-78kRvDK_gi1aDk9_yNxTTeNWa0V6ZBvRF0lx9UcCrooR4DPnF7a","lyrics_id":10189371,"genre_id":1,"$$hashKey":"007"}', NULL, NULL),
(27, '{"id":"id_366411610","owner_id":20898331,"artist":"Hollywood Undead","title":"Paradise Lost","duration":190,"url":"http://cs7-2v4.vk-cdn.net/p19/52f39f55393d2e.mp3?extra=cU6GW6ttAq14htPLUbIkp-uKrIE0zlg8jiVwdq3vyuKe7Eej5klvVgpkYGyl3tWZdY7rgQ5-p1ZysTPGp4ejT9--hJUCk6Ln","lyrics_id":2942663,"genre_id":21,"$$hashKey":"009"}', NULL, NULL),
(28, '{"id":"id_365104544","owner_id":20898331,"artist":"Виктор Цой и гр.Кино ","title":"Кукушка ","duration":393,"url":"http://cs7-4v4.vk-cdn.net/p16/02e25054d4c7ef.mp3?extra=VtJqdgmohJN5Lb-bcQyP64WvsG-ywn07KbQPFTbNX6JO6TblwvrZxzpLbtEYPNqzjfjOxOf_sEiJQD8L8DXZhXaE7BCFYwmM","genre_id":9,"no_search":1,"$$hashKey":"00C"}', NULL, NULL),
(29, '{"id":"id_360928834","owner_id":20898331,"artist":"Kiss ","title":"I Was Made For Lovin'' You ","duration":256,"url":"http://cs7-5v4.vk-cdn.net/p8/6e88f124254bee.mp3?extra=SEFkV5HA3B8UZEmBqYGxuniVLVRYVtRMi2tPDqeWR73-i2wNcCQWbZQRxM1VWzQlIrEZajHZgNuUxvy0Cnb5O7NNo2X3fYGJ","lyrics_id":3746349,"genre_id":18,"$$hashKey":"00F"}', NULL, NULL),
(30, '{"id":"id_345582046","owner_id":20898331,"artist":"Naughty Boy","title":"Lifted (feat. Emeli Sande)","duration":197,"url":"http://cs7-4v4.vk-cdn.net/p24/a879445c863944.mp3?extra=6tRV0WxEOoXMf5wj8QafYUJYUed1rQRUPXO0bE4hB0zSxS9rFGl85ivqU9D8O3REwZ1hwYEZsW9wyh5GWX54JnYY_LqcX40h","lyrics_id":110909061,"genre_id":2,"$$hashKey":"00W"}', NULL, NULL),
(31, '{"id":"id_78783264","owner_id":4665445,"artist":"The Beatles","title":"Yesterday","duration":130,"url":"http://cs7-3v4.vk-cdn.net/p16/193e03075a98e1.mp3?extra=Af9AoNsVrYEoj3tbJ6y_o-YsDQtqWwAK2ED6DwgMDBE6J3OQDTHx4DhRUJ-3ykNGMPelgcHtVWvf1N49_zknjSz-3FJRGQ","lyrics_id":2365986,"genre_id":1,"$$hashKey":"14R"}', NULL, NULL),
(32, '{"id":"id_364979699","owner_id":20898331,"artist":"Armin van Buuren feat. Monogato","title":"Miami Vibe (Omnia Remix)","duration":305,"url":"http://cs7-4v4.vk-cdn.net/p22/f570d86ae013de.mp3?extra=85PkXGpjt-dyz0NQKrrMFjhCqYT3hJJtW-eiuHYDITSGtV5qyNzgKxXp0cQUQHWeSKhOCXeN8rYzWYs9PemMrlVV2aQXGw6D","genre_id":18,"$$hashKey":"00D"}', NULL, NULL),
(33, '{"id":"id_364095445","owner_id":20898331,"artist":"Coldplay","title":"Green Eyes","duration":223,"url":"http://cs7-5v4.vk-cdn.net/p7/cab2def006f776.mp3?extra=iVduwKXnULj00PA2Z4U0kUUVbCt0yEroJdiY2gvYjMUvpgbcHjKZ-00co275djttqw5u_GuPkFCUA7IO-oUtTJsM_j8jHm-Z","lyrics_id":3409995,"genre_id":1,"$$hashKey":"00E"}', NULL, NULL),
(34, '{"id":"id_360928834","owner_id":20898331,"artist":"Kiss ","title":"I Was Made For Lovin'' You ","duration":256,"url":"http://cs7-5v4.vk-cdn.net/p8/6e88f124254bee.mp3?extra=SEFkV5HA3B8UZEmBqYGxuniVLVRYVtRMi2tPDqeWR73-i2wNcCQWbZQRxM1VWzQlIrEZajHZgNuUxvy0Cnb5O7NNo2X3fYGJ","lyrics_id":3746349,"genre_id":18,"$$hashKey":"00F"}', NULL, NULL),
(35, '{"id":"id_360874472","owner_id":20898331,"artist":"ATB","title":"Extasy","duration":245,"url":"http://cs7-5v4.vk-cdn.net/p6/cac02e8e9b3ab7.mp3?extra=n8GpgTP7hINCiFCuaOxT9G8Q7jXMe2B7sE6mhmFXgcfS2Pg0jhgYl4EzMCQtnm_GOpHAm3Ezl3jll4Gpn23f-Y1CqIvCaDAA","lyrics_id":4773686,"genre_id":11,"$$hashKey":"00G"}', NULL, NULL),
(36, '{"id":"id_360133682","owner_id":20898331,"artist":"Aronchupa","title":"I''m An Albatraoz  (Radio Edit)","duration":166,"url":"http://cs7-1v4.vk-cdn.net/p24/8f0a2e31a9b881.mp3?extra=G_GHCRL9GoD17Pl-GsB1bYVSY7euXr60Qr1IUNZii7XYNNQ1vmHMgSwZ7pvvI8yXBds7lCpSahbGwVZ7rnqC-apvtoQdjijQ","genre_id":2,"$$hashKey":"00H"}', NULL, NULL),
(37, '{"id":"id_358472042","owner_id":20898331,"artist":"The Rasmus","title":"First Day Of My Life","duration":224,"url":"http://cs7-2v4.vk-cdn.net/p15/8f7701a4ebeb17.mp3?extra=dCvLkZWSJ7ZENwW4lrEzSlLC2f1MBw70r7dPuI3_YAt_xSHBpfhrDOdElzHOU813UBxGJNyrxHaCs15c3GyN4w20V7X0zKF3","lyrics_id":4186108,"genre_id":1,"$$hashKey":"00I"}', NULL, NULL),
(38, '{"id":"id_356243286","owner_id":20898331,"artist":"ONUKA ","title":"Time","duration":341,"url":"http://cs7-5v4.vk-cdn.net/p11/f74e13c381f40f.mp3?extra=3h13mAhRPu1v4jtYlk8epLshLiB6gBn8RWV6J75vdEFsBYxIT3fYBjPlRa8ctUAc4VeO2SZFET8vZP4gj3eFhm6oys5w6Xxt","lyrics_id":174366038,"genre_id":9,"$$hashKey":"00N"}', NULL, NULL),
(39, '{"id":"id_356340316","owner_id":20898331,"artist":"Husky Rescue","title":"New Light Of Tomorrow","duration":294,"url":"http://cs7-5v4.vk-cdn.net/p8/1728dbd27e1f80.mp3?extra=z-P5uV4G-jhUrSrs29ym-YlerS3S0BN12jYZ-L5-B4W34qT7ViyrKdqtoGNGyPO46F92zOzdemm_IOPtJSIuhtudmuJ1HHJz","lyrics_id":7025813,"genre_id":4,"$$hashKey":"00M"}', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`id` int(11) NOT NULL,
  `fio` varchar(45) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `vk_id` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20898341 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `fio`, `token`, `vk_id`) VALUES
(20898334, 'Евгений Филипьев', '02fa6388860d62954350064c7bcb2a8d187dcb280472ebc0b692556f76730d70921bde42359fe508fa78e', '20898331'),
(20898335, 'Евгений Филипьев', 'cdd3df40387458995d4063e21aea88b525601a084d865e12cba6f8a542abff7468a72519661c7d7e40050', '20898331'),
(20898336, 'Евгений Филипьев', '9c96af4355296c3382214fe019fb4d0176a08864773af277ce45fd9001a491e40088034e781a50086a84f', '20898331'),
(20898337, 'Евгений Филипьев', 'fc8b99cbc2c1388998accc91b79b6467b3fc76ad9e904ade96218e33096b762c5c5fca585622b7cfcaa2c', '20898331'),
(20898338, 'Евгений Филипьев', '14fd4e14e5b044b6f8aff03268c38c98868dfe0f23b1f8c97a8ad11c8076a1a4440399171ab29127ebd6a', '20898331'),
(20898339, 'Евгений Филипьев', '0db59d53f5dca7f89e672b14f62abce35e292d258a47837b45aafb8fbe14e77c5dc099364bdd8a1a13ecb', '20898331'),
(20898340, 'Евгений Филипьев', 'aaff729c064b49eebfb97915b0f589f0231d65815aa8d1d9535ec512180f48d93587be862d772194c5403', '20898331');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `playlist`
--
ALTER TABLE `playlist`
 ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `playlist`
--
ALTER TABLE `playlist`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20898341;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
