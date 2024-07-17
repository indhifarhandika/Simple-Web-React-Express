-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 17, 2024 at 04:55 PM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `astronacci`
--

-- --------------------------------------------------------

--
-- Table structure for table `access_rights`
--

CREATE TABLE `access_rights` (
  `id` int(11) NOT NULL,
  `membership_type_id` int(11) DEFAULT NULL,
  `content_type` enum('article','video') NOT NULL,
  `content_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `access_rights`
--

INSERT INTO `access_rights` (`id`, `membership_type_id`, `content_type`, `content_id`) VALUES
(1, 1, 'video', 1),
(2, 1, 'video', 2),
(3, 1, 'video', 3),
(4, 1, 'article', 1),
(5, 1, 'article', 2),
(6, 1, 'article', 3);

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `created_at`) VALUES
(1, 'React 1', 'React JS + ExpressJS', '2024-07-17 13:20:08'),
(2, 'React 2', 'React JS + ExpressJS', '2024-07-17 13:20:08'),
(3, 'React 3', 'React JS + ExpressJS', '2024-07-17 13:20:08'),
(4, 'React 4', 'React JS + ExpressJS', '2024-07-17 13:20:08'),
(5, 'React 5', 'React JS + ExpressJS', '2024-07-17 13:20:08'),
(6, 'React 6', 'React JS + ExpressJS', '2024-07-17 13:20:08'),
(7, 'React 7', 'React JS + ExpressJS', '2024-07-17 13:20:08'),
(8, 'React 8', 'React JS + ExpressJS', '2024-07-17 13:20:08'),
(9, 'React 9', 'React JS + ExpressJS', '2024-07-17 13:20:08'),
(10, 'React 10', 'React JS + ExpressJS', '2024-07-17 13:20:08'),
(11, 'React 11', 'React JS + ExpressJS', '2024-07-17 13:20:08'),
(12, 'React 12', 'React JS + ExpressJS', '2024-07-17 13:20:08');

-- --------------------------------------------------------

--
-- Table structure for table `membership_type`
--

CREATE TABLE `membership_type` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `max_articles` int(11) NOT NULL,
  `max_videos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `membership_type`
--

INSERT INTO `membership_type` (`id`, `name`, `max_articles`, `max_videos`) VALUES
(1, 'A', 3, 3),
(2, 'B', 10, 10),
(3, 'C', -1, -1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `membership_type_id` int(11) DEFAULT NULL,
  `google_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `membership_type_id`, `google_id`) VALUES
(9, 'indhitypea', '$2a$10$FU8kjDGF6riZ7mP4VbFEsOyI1yIleLfzv.0Uyj3U4hIznR2i8Zu0S', 'indhitypea@gmail.com', 1, NULL),
(10, 'indhitypeb', '$2a$10$G4B264LpP753Qxo8Yb6.EOso6d9bGnM/1sKppaDjEQKgwziSv5InS', 'indhitypeb@gmail.com', 2, NULL),
(11, 'indhitypec', '$2a$10$5lyLHw8FMOAlFFGP28bdd.siNduM7seacsByHOyfqAlCW2aflq5o.', 'indhitypec@gmail.com', 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `title`, `url`, `created_at`) VALUES
(1, 'React 1', 'https://www.youtube.com/embed/isuuWxthtv4?list=PL_mAvlfqBUVKEfjKp5GjNIg0q-bkXNkgs', '2024-07-17 13:18:23'),
(2, 'React 2', 'https://www.youtube.com/embed/isuuWxthtv4?list=PL_mAvlfqBUVKEfjKp5GjNIg0q-bkXNkgs', '2024-07-17 13:18:23'),
(3, 'React 3', 'https://www.youtube.com/embed/isuuWxthtv4?list=PL_mAvlfqBUVKEfjKp5GjNIg0q-bkXNkgs', '2024-07-17 13:18:23'),
(4, 'React 4', 'https://www.youtube.com/embed/isuuWxthtv4?list=PL_mAvlfqBUVKEfjKp5GjNIg0q-bkXNkgs', '2024-07-17 13:18:23'),
(5, 'React 5', 'https://www.youtube.com/embed/isuuWxthtv4?list=PL_mAvlfqBUVKEfjKp5GjNIg0q-bkXNkgs', '2024-07-17 13:18:23'),
(6, 'React 6', 'https://www.youtube.com/embed/isuuWxthtv4?list=PL_mAvlfqBUVKEfjKp5GjNIg0q-bkXNkgs', '2024-07-17 13:18:23'),
(7, 'React 7', 'https://www.youtube.com/embed/isuuWxthtv4?list=PL_mAvlfqBUVKEfjKp5GjNIg0q-bkXNkgs', '2024-07-17 13:18:23'),
(8, 'React 8', 'https://www.youtube.com/embed/isuuWxthtv4?list=PL_mAvlfqBUVKEfjKp5GjNIg0q-bkXNkgs', '2024-07-17 13:18:23'),
(9, 'React 9', 'https://www.youtube.com/embed/isuuWxthtv4?list=PL_mAvlfqBUVKEfjKp5GjNIg0q-bkXNkgs', '2024-07-17 13:18:23'),
(10, 'React 10', 'https://www.youtube.com/embed/isuuWxthtv4?list=PL_mAvlfqBUVKEfjKp5GjNIg0q-bkXNkgs', '2024-07-17 13:18:23'),
(11, 'React 11', 'https://www.youtube.com/embed/isuuWxthtv4?list=PL_mAvlfqBUVKEfjKp5GjNIg0q-bkXNkgs', '2024-07-17 13:18:23'),
(12, 'React 12', 'https://www.youtube.com/embed/isuuWxthtv4?list=PL_mAvlfqBUVKEfjKp5GjNIg0q-bkXNkgs', '2024-07-17 13:18:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access_rights`
--
ALTER TABLE `access_rights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `membership_type_id` (`membership_type_id`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `membership_type`
--
ALTER TABLE `membership_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `membership_type_id` (`membership_type_id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `access_rights`
--
ALTER TABLE `access_rights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `membership_type`
--
ALTER TABLE `membership_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `access_rights`
--
ALTER TABLE `access_rights`
  ADD CONSTRAINT `access_rights_ibfk_1` FOREIGN KEY (`membership_type_id`) REFERENCES `membership_type` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`membership_type_id`) REFERENCES `membership_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
