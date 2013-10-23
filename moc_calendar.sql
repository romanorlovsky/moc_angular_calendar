-- MySQL dump 10.13  Distrib 5.5.32, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: moc_calendar
-- ------------------------------------------------------
-- Server version	5.5.32-0ubuntu0.13.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calendar`
--

DROP TABLE IF EXISTS `calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calendar` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `year` smallint(5) unsigned NOT NULL,
  `days` longtext CHARACTER SET utf8 NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar`
--

LOCK TABLES `calendar` WRITE;
/*!40000 ALTER TABLE `calendar` DISABLE KEYS */;
INSERT INTO `calendar` VALUES (1,2013,'a:24:{i:0;a:2:{s:3:\"day\";i:1363212000;s:4:\"type\";i:1;}i:1;a:2:{s:3:\"day\";i:1363125600;s:4:\"type\";i:1;}i:2;a:2:{s:3:\"day\";i:1363039200;s:4:\"type\";i:1;}i:3;a:2:{s:3:\"day\";i:1363298400;s:4:\"type\";i:1;}i:4;a:2:{s:3:\"day\";i:1361397600;s:4:\"type\";i:1;}i:5;a:2:{s:3:\"day\";i:1361311200;s:4:\"type\";i:1;}i:6;a:2:{s:3:\"day\";i:1358287200;s:4:\"type\";i:1;}i:7;a:2:{s:3:\"day\";i:1374181200;s:4:\"type\";i:1;}i:8;a:2:{s:3:\"day\";i:1374094800;s:4:\"type\";i:2;}i:9;a:2:{s:3:\"day\";i:1371243600;s:4:\"type\";i:1;}i:10;a:2:{s:3:\"day\";i:1371157200;s:4:\"type\";i:1;}i:11;a:2:{s:3:\"day\";i:1376514000;s:4:\"type\";i:1;}i:12;a:2:{s:3:\"day\";i:1376686800;s:4:\"type\";i:2;}i:13;a:2:{s:3:\"day\";i:1376686800;s:4:\"type\";i:1;}i:14;a:2:{s:3:\"day\";i:1376600400;s:4:\"type\";i:2;}i:15;a:2:{s:3:\"day\";i:1358200800;s:4:\"type\";i:1;}i:16;a:2:{s:3:\"day\";i:1358114400;s:4:\"type\";i:1;}i:17;a:2:{s:3:\"day\";i:1358373600;s:4:\"type\";i:1;}i:18;a:2:{s:3:\"day\";i:1358719200;s:4:\"type\";i:2;}i:19;a:2:{s:3:\"day\";i:1359324000;s:4:\"type\";i:1;}i:20;a:2:{s:3:\"day\";i:1359410400;s:4:\"type\";i:1;}i:21;a:2:{s:3:\"day\";i:1357768800;s:4:\"type\";i:1;}i:22;a:2:{s:3:\"day\";i:1358892000;s:4:\"type\";i:1;}i:23;a:2:{s:3:\"day\";i:1358805600;s:4:\"type\";i:1;}}',1),(2,2012,'a:14:{i:0;a:2:{s:3:\"day\";i:1326146400;s:4:\"type\";i:1;}i:1;a:2:{s:3:\"day\";i:1326751200;s:4:\"type\";i:1;}i:2;a:2:{s:3:\"day\";i:1327356000;s:4:\"type\";i:1;}i:3;a:2:{s:3:\"day\";i:1327960800;s:4:\"type\";i:1;}i:4;a:2:{s:3:\"day\";i:1332108000;s:4:\"type\";i:2;}i:5;a:2:{s:3:\"day\";i:1332194400;s:4:\"type\";i:2;}i:6;a:2:{s:3:\"day\";i:1332280800;s:4:\"type\";i:2;}i:7;a:2:{s:3:\"day\";i:1332367200;s:4:\"type\";i:2;}i:8;a:2:{s:3:\"day\";i:1332453600;s:4:\"type\";i:2;}i:9;a:2:{s:3:\"day\";i:1332709200;s:4:\"type\";i:2;}i:10;a:2:{s:3:\"day\";i:1332795600;s:4:\"type\";i:2;}i:11;a:2:{s:3:\"day\";i:1332882000;s:4:\"type\";i:2;}i:12;a:2:{s:3:\"day\";i:1332968400;s:4:\"type\";i:2;}i:13;a:2:{s:3:\"day\";i:1333054800;s:4:\"type\";i:2;}}',1),(3,2011,'a:10:{i:0;a:2:{s:3:\"day\";i:1294696800;s:4:\"type\";i:1;}i:1;a:2:{s:3:\"day\";i:1294783200;s:4:\"type\";i:1;}i:2;a:2:{s:3:\"day\";i:1294869600;s:4:\"type\";i:1;}i:3;a:2:{s:3:\"day\";i:1294956000;s:4:\"type\";i:1;}i:4;a:2:{s:3:\"day\";i:1294610400;s:4:\"type\";i:1;}i:5;a:2:{s:3:\"day\";i:1295215200;s:4:\"type\";i:2;}i:6;a:2:{s:3:\"day\";i:1295301600;s:4:\"type\";i:2;}i:7;a:2:{s:3:\"day\";i:1295388000;s:4:\"type\";i:2;}i:8;a:2:{s:3:\"day\";i:1295474400;s:4:\"type\";i:2;}i:9;a:2:{s:3:\"day\";i:1295560800;s:4:\"type\";i:2;}}',1);
/*!40000 ALTER TABLE `calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `days`
--

DROP TABLE IF EXISTS `days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `days` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  `color` char(6) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `days`
--

LOCK TABLES `days` WRITE;
/*!40000 ALTER TABLE `days` DISABLE KEYS */;
INSERT INTO `days` VALUES (1,'Vacation','eb1d27'),(2,'Sick','ffff00');
/*!40000 ALTER TABLE `days` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `surname` varchar(255) CHARACTER SET utf8 NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `id_2` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Roman','Orlovsky','Roman Orlovsky'),(2,'Roman','Vistik','Roman Vistik'),(3,'Sergyi','Gun','Sergyi Gun');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-10-23 14:30:31
