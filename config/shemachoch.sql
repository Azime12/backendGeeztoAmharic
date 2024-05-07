-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: shemachochfullproject
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `Shemachoch_name` varchar(500) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_Number` varchar(15) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `sub_city` varchar(200) DEFAULT NULL,
  `wereda` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (10,'Bahiru','ddd','Yimolal','abbhhh@g@maiilllll.comm','09090900','a;skdjn','$2b$10$FFWm0FrBIL.JyvNWCF/eU.MxZPzNR2q1ed0Dt5iwDiiI0.lyPvsuq'),(11,'Bahiru','dddsd','Yimolal','abbhhh@g@maiilsdfllll.comm','09090900','a;skdjn','$2b$10$KAIPgEDryzy7PejSUi/ihe8IC/M64EffOn/iofHzzCDO1u8lEK382'),(12,'Bahiru','dddsdsd','Yimolal','abbhhh@g@maiilsdfllll.comm','09090900','a;skdjn','$2b$10$qZtNvxwKMv7wzAt9vkXqnOtCUZr5I5eUkU8waX5hv.jToZlDVphJW'),(13,'Bahiru','Bahiru','abh@gmaiilsllas','09090900','a;skdjn','abh@gmaiilsll.com','$2b$10$hs7I6LmXZDnsxa8CjZSUauVFGbQpIZJHiLA0MssJsZA9bAWe4U652');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `superadmin`
--

DROP TABLE IF EXISTS `superadmin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `superadmin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phonenumber` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `superadmin`
--

LOCK TABLES `superadmin` WRITE;
/*!40000 ALTER TABLE `superadmin` DISABLE KEYS */;
INSERT INTO `superadmin` VALUES (18,'Bahiru','Yimolal','abbh@gmaiilllll.com','09090900','$2b$10$qhoT2FGAZw0hILm/1QV6Fu9GWrs7CZSw/vBipHEooPzPXiuKWXdx.'),(19,'Bahiru','Yimolal','abbhhh@gmaiilllll.com','09090900','$2b$10$FIze/sgMT4AEf/df3UUkPeH8b96sX8wQPVFwCnAlwMBQhriheLJ4G'),(21,'Bahiru','Yimolal','abbhhh@g@maiilllll.comm','09090900','$2b$10$SkljA9liyPjilxGPXY8.suuLlFvY3PRfjK3X3Nxgbb24iI0Uj.CGK'),(22,'Bahiru','Yimolal','abbhhh@g@maiilllll.as','09090900','$2b$10$q2lnxjXOOzc6ITnhLGT4AOtoy0u8NyGSfRkUqb4KnZ8gReZHzWJxC');
/*!40000 ALTER TABLE `superadmin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `kupon_Number` varchar(100) DEFAULT NULL,
  `phone_Number` varchar(15) DEFAULT NULL,
  `sex` varchar(15) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `sub_city` varchar(200) DEFAULT NULL,
  `wereda` varchar(100) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'asdfasdf','asdfasd','asdf','asd','asdf','asdf','asdfasdf','asdfa','asdfasd',10),(2,'asdfasdf','asdfasd','asdf','asasdd','asdf','asdf','asdfasdf','asdfa','asdfasd',10),(6,'asdfasdf','asdfasd','asdf','asasdsd','asdf','asdf','asdfasdf','asdfa','asdfasd',13),(7,'asdfasdf','asdfasd','asdf','asasd,hjkmhbsds','asdfljhbh','asdf','asdfasdf','asdfa','asdfasd',13);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-28 11:27:12
