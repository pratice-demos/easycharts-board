-- board.post definition

CREATE TABLE `post` (
  `postId` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `tagId` int(11) NOT NULL,
  `config` text NOT NULL,
  `postTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`postId`),
  KEY `post_FK_1` (`tagId`),
  KEY `post_FK` (`userId`),
  CONSTRAINT `post_FK` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `post_FK_1` FOREIGN KEY (`tagId`) REFERENCES `tag` (`tagId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='帖子表';


-- board.tag definition

CREATE TABLE `tag` (
  `tagId` int(11) NOT NULL AUTO_INCREMENT,
  `detail` varchar(25) NOT NULL,
  PRIMARY KEY (`tagId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='标签表';


-- board.`user` definition

CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `userTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `nanoId` varchar(10) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='用户表';
