-- phpMyAdmin SQL Dump
-- version 3.5.8.1deb1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Окт 18 2013 г., 17:47
-- Версия сервера: 5.5.32-0ubuntu0.13.04.1
-- Версия PHP: 5.4.9-4ubuntu2.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `moc_calendar`
--

-- --------------------------------------------------------

--
-- Структура таблицы `calendar`
--

DROP TABLE IF EXISTS `calendar`;
CREATE TABLE IF NOT EXISTS `calendar` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `year` smallint(5) unsigned NOT NULL,
  `days` longtext CHARACTER SET utf8 NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `calendar`
--

INSERT INTO `calendar` (`id`, `year`, `days`, `user_id`) VALUES
(1, 2013, 'a:17:{i:0;a:2:{s:3:"day";i:1363212000;s:4:"type";i:1;}i:1;a:2:{s:3:"day";i:1363125600;s:4:"type";i:1;}i:2;a:2:{s:3:"day";i:1363039200;s:4:"type";i:1;}i:3;a:2:{s:3:"day";i:1362952800;s:4:"type";i:2;}i:4;a:2:{s:3:"day";i:1363298400;s:4:"type";i:1;}i:5;a:2:{s:3:"day";i:1361397600;s:4:"type";i:1;}i:6;a:2:{s:3:"day";i:1361311200;s:4:"type";i:1;}i:7;a:2:{s:3:"day";i:1358978400;s:4:"type";i:2;}i:8;a:2:{s:3:"day";i:1358287200;s:4:"type";i:1;}i:9;a:2:{s:3:"day";i:1374181200;s:4:"type";i:1;}i:10;a:2:{s:3:"day";i:1374094800;s:4:"type";i:2;}i:11;a:2:{s:3:"day";i:1371243600;s:4:"type";i:1;}i:12;a:2:{s:3:"day";i:1371157200;s:4:"type";i:1;}i:13;a:2:{s:3:"day";i:1376514000;s:4:"type";i:1;}i:14;a:2:{s:3:"day";i:1376686800;s:4:"type";i:2;}i:15;a:2:{s:3:"day";i:1376686800;s:4:"type";i:1;}i:16;a:2:{s:3:"day";i:1376600400;s:4:"type";i:2;}} ', 1),
(2, 2012, 'a:14:{i:0;a:2:{s:3:"day";i:1326146400;s:4:"type";i:1;}i:1;a:2:{s:3:"day";i:1326751200;s:4:"type";i:1;}i:2;a:2:{s:3:"day";i:1327356000;s:4:"type";i:1;}i:3;a:2:{s:3:"day";i:1327960800;s:4:"type";i:1;}i:4;a:2:{s:3:"day";i:1332108000;s:4:"type";i:2;}i:5;a:2:{s:3:"day";i:1332194400;s:4:"type";i:2;}i:6;a:2:{s:3:"day";i:1332280800;s:4:"type";i:2;}i:7;a:2:{s:3:"day";i:1332367200;s:4:"type";i:2;}i:8;a:2:{s:3:"day";i:1332453600;s:4:"type";i:2;}i:9;a:2:{s:3:"day";i:1332709200;s:4:"type";i:2;}i:10;a:2:{s:3:"day";i:1332795600;s:4:"type";i:2;}i:11;a:2:{s:3:"day";i:1332882000;s:4:"type";i:2;}i:12;a:2:{s:3:"day";i:1332968400;s:4:"type";i:2;}i:13;a:2:{s:3:"day";i:1333054800;s:4:"type";i:2;}}', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `days`
--

DROP TABLE IF EXISTS `days`;
CREATE TABLE IF NOT EXISTS `days` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  `color` char(6) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `days`
--

INSERT INTO `days` (`id`, `title`, `color`) VALUES
(1, 'vacation', '008000'),
(2, 'sick', 'ffff00');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `surname` varchar(255) CHARACTER SET utf8 NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `id_2` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `fullname`) VALUES
(1, 'Roman', 'Orlovsky', 'Roman Orlovsky'),
(2, 'Roman', 'Vistik', 'Roman Vistik'),
(3, 'Sergyi', 'Gun', 'Sergyi Gun');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
