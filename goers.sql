-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 06, 2017 at 06:09 AM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `goers`
--

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `organization_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `name`, `date`, `organization_id`) VALUES
(0, 'Event 0', '2017-01-29', 0),
(1, 'Event 1', '2017-01-30', 0),
(2, 'Event 2', '2017-01-31', 1),
(3, 'Event 3', '2017-02-01', 1),
(4, 'Event 4', '2017-01-29', 2),
(5, 'Event 5', '2017-01-30', 2),
(6, 'Event 6', '2017-01-31', 3),
(7, 'Event 7', '2017-02-01', 3),
(8, 'Event 8', '2017-01-29', 3),
(9, 'Event 9', '2017-01-30', 1),
(10, 'Event 10', '2017-01-31', 2),
(11, 'Event 11', '2017-02-01', 3),
(12, 'Event 12', '2017-01-29', 3),
(13, 'Event 13', '2017-01-30', 1),
(14, 'Event 14', '2017-01-31', 2),
(15, 'Event 15', '2017-02-01', 3),
(16, 'Event 16', '2017-01-29', 3),
(17, 'Event 17', '2017-01-30', 4),
(18, 'Event 18', '2017-01-31', 4),
(19, 'Event 19', '2017-02-01', 5),
(0, 'Event 20', '2017-02-03', 5),
(20, 'Event 20', '2017-02-03', 5),
(20, 'Event 20', '2017-01-01', 1),
(21, 'Event 21', '2017-01-01', 1),
(22, 'Event 22', '2017-01-01', 2),
(23, 'Event 23', '2017-01-01', 2),
(24, 'Event 24', '2017-01-01', 3),
(25, 'Event 25', '2017-01-01', 3),
(26, 'Event 26', '2017-01-01', 4),
(27, 'Event 27', '2017-01-01', 4),
(28, 'Event 28', '2017-01-01', 5),
(29, 'Event 29', '2017-01-01', 5),
(30, 'Event 30', '2017-01-01', 0),
(31, 'Event 31', '2017-01-01', 0),
(32, 'Event 32', '2017-01-13', 0),
(33, 'Event 33', '2017-01-14', 0),
(34, 'Event 34', '2017-01-15', 0),
(35, 'Event 35', '2017-01-16', 0),
(36, 'Event 36', '2017-01-17', 0),
(37, 'Event 37', '2017-01-18', 0),
(38, 'Event 38', '2017-01-19', 0),
(39, 'Event 39', '2017-01-20', 0),
(40, 'Event 40', '2017-01-21', 0),
(41, 'Event 41', '2017-01-22', 0),
(42, 'Event 42', '2017-01-23', 0),
(43, 'Event 43', '2017-01-24', 0),
(44, 'Event 44', '2017-01-25', 0),
(45, 'Event 45', '2017-01-26', 0),
(46, 'Event 46', '2017-01-27', 0),
(47, 'Event 47', '2017-01-28', 0),
(48, 'Event 48', '2017-01-29', 0),
(49, 'Event 49', '2017-01-30', 0),
(50, 'Event 50', '2017-01-31', 0),
(51, 'Event 51', '2017-02-01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

CREATE TABLE `organization` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `organization`
--

INSERT INTO `organization` (`id`, `name`) VALUES
(0, '@otomerica'),
(1, 'House Rooftop'),
(2, 'Colloseum'),
(3, 'Gramedia BSW'),
(4, 'Rolling Stone Indonesia'),
(5, 'Bebas Rimba');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD KEY `fk_org_id` (`organization_id`);

--
-- Indexes for table `organization`
--
ALTER TABLE `organization`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `fk_org_id` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
