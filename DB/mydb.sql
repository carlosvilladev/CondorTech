-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-05-2018 a las 08:59:32
-- Versión del servidor: 5.7.19-log
-- Versión de PHP: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mydb`
--

CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_address`
--

CREATE TABLE `user_address` (
  `id_address` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `user_address`
--

INSERT INTO `user_address` (`id_address`, `id_user`) VALUES
(793226514, 1),
(74105, 2),
(695374, 4),
(2801, 6),
(150798905, 7),
(662514054, 9),
(5, 69),
(0, 510),
(107169145, 2843),
(549149539, 2843),
(147, 4429),
(707, 4429),
(31997, 9255),
(944097766, 9255),
(9684, 32281),
(2255, 46226),
(7347156, 830667),
(29, 960382),
(63329771, 68620308),
(25770, 907565623);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_profile`
--

CREATE TABLE `user_profile` (
  `id_user` int(11) NOT NULL,
  `nm_first` varchar(45) DEFAULT NULL,
  `nm_middle` varchar(45) DEFAULT NULL,
  `nm_last` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `user_profile`
--

INSERT INTO `user_profile` (`id_user`, `nm_first`, `nm_middle`, `nm_last`) VALUES
(0, '', 'Alize', 'Bednar'),
(1, '', '', ''),
(2, 'Corine', '', ''),
(3, 'Mazie', '', 'Dickens'),
(4, 'Alene', 'Alta', ''),
(5, 'Randi', 'Quincy', ''),
(6, 'Vena', '', ''),
(7, 'Hosea', '', 'Yundt'),
(8, 'Brycen', '', 'King'),
(9, '', 'Lilly', 'O Hara'),
(69, '', 'Breanna', 'Swift'),
(510, 'Candice', '', ''),
(2843, 'Tillman', 'Orpha', 'Lubowitz'),
(4429, '', '', ''),
(9255, 'Cassie', 'Pascale', 'Kiehn'),
(32281, '', '', 'Effertz'),
(46226, '', 'Henry', 'Effertz'),
(72863, 'Edd', 'Turner', ''),
(802706, '', '', 'Luettgen'),
(830667, 'Maximillia', '', 'Frami'),
(960382, 'Stephan', 'Bret', 'Tromp'),
(2867309, '', '', 'Grady'),
(2941276, '', 'Shanel', 'Rath'),
(5325820, '', 'Marcellus', ''),
(68620308, 'Arnold', 'Abel', 'McLaughlin'),
(81264081, 'Walker', '', 'Hane'),
(446546229, '', 'Alberta', 'Weimann'),
(575191922, 'Rhiannon', 'Guy', ''),
(907565623, 'Joelle', '', 'Shanahan');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_role`
--

CREATE TABLE `user_role` (
  `cd_role_type` varchar(45) NOT NULL,
  `id_entity` int(11) NOT NULL,
  `in_status` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `user_role`
--

INSERT INTO `user_role` (`cd_role_type`, `id_entity`, `in_status`, `id_user`) VALUES
('LICENSEE', 0, 1, 7),
('LICENSEE', 3, 1, 6),
('LICENSEE', 5, 1, 32281),
('LICENSEE', 7, 1, 3),
('LICENSEE', 8, 1, 5325820),
('LICENSEE', 86, 1, 4),
('LIMITED', 97, 1, 960382),
('LIMITED', 528, 1, 575191922),
('LIMITED', 719, 0, 1),
('LIMITED', 4786, 1, 5),
('LIMITED', 7286, 1, 9),
('LIMITED', 8659, 1, 4),
('PROVIDER', 9193, 0, 830667),
('PROVIDER', 15060, 1, 68620308),
('PROVIDER', 77938, 1, 69),
('PROVIDER', 89929, 1, 6),
('PROVIDER', 1917161, 1, 5),
('PROVIDER', 312037583, 1, 6),
('PROVIDER', 606636870, 1, 81264081),
('PROVIDER', 615310271, 1, 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id_address`,`id_user`),
  ADD KEY `fk_User_address_User_profile_idx` (`id_user`);

--
-- Indices de la tabla `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id_user`);

--
-- Indices de la tabla `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`cd_role_type`,`id_entity`,`id_user`),
  ADD KEY `fk_User_role_User_profile1_idx` (`id_user`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `fk_User_address_User_profile` FOREIGN KEY (`id_user`) REFERENCES `user_profile` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `fk_User_role_User_profile1` FOREIGN KEY (`id_user`) REFERENCES `user_profile` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
