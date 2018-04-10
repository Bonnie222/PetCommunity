/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80002
Source Host           : localhost:3306
Source Database       : petcommunitydb

Target Server Type    : MYSQL
Target Server Version : 80002
File Encoding         : 65001

Date: 2018-04-10 18:42:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `activity`
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`actTitle`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`actType`  int(11) NOT NULL ,
`publisherId`  int(11) NULL DEFAULT NULL ,
`publisher`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`createTime`  datetime NULL DEFAULT NULL ,
`startTime`  datetime NOT NULL ,
`endTime`  datetime NOT NULL ,
`themePhoto`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`participateWay`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`rules`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`awards`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`notes`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`city`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`address`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`peopleNum`  int(11) NULL DEFAULT 0 ,
`cost`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`contact`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`actNum`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of activity
-- ----------------------------
BEGIN;
INSERT INTO `activity` VALUES ('1', '最美铲屎官', '1', null, '爱宠社区', null, '2017-09-01 00:00:00', '2017-09-30 23:59:59', '{\"fileUrl\":\"src/assets/dbimages/avatar-1517393895522.jpg\",\"fileName\":\"timg (1).jpg\"}', '在线上活动#最美铲屎官#话题活动下载发布你（铲屎官）与爱宠的合照', '发布符合主题（铲屎官+爱宠的合照）的照片，并且获得赞前三名即可获得奖品', '最美铲屎官（3名）:<br/>\r\n活动中选出3名点赞排名最高的铲屎官，获得零趣爱宠零食一份+1000积分\r\n<br/>活动铲屎官（若干名）:<br/>\r\n参与活动并符合主题的铲屎官均可获得200积分奖', '我们正在寻找全国最美的铲屎官...', null, null, '0', null, null, null), ('2', '技能大比拼', '1', null, '爱宠社区', null, '2018-02-01 00:00:56', '2018-02-28 23:59:59', '{\"fileUrl\":\"src/assets/dbimages/avatar-1517393895522.jpg\",\"fileName\":\"timg (1).jpg\"}', '活动期间残忍爱宠社区线上活动#技能大比拼#，在相应的活动话题下发布家里宠物在生活中展示的各种技能.', '发布家里萌宠在生活中展示的各种技能，并且获赞前三名即可获得奖品.全能萌宠条件：满足3张同一个萌宠不同技能的图片的帖子，通过官方选出.', '全能萌宠奖（1名）：\r\n<br/>活动选出的1名全能萌宠获得价值69元的宠物营养膏\r\n<br/>120g+1000积分\r\n<br/>赞数排名奖（3名）\r\n<br/>点赞数排名第1-3名的铲屎官获得价值39元的爱宠大礼包1份', '2月的线上活动又跟大家见面啦，是不是很期待呢~亲爱的铲屎官们，在生活的不经意中，你家的萌宠们是否展露出各种技能呢？例如顶顶神功、空中接飞碟、倒下装死、叼篮子等等多种技能，发挥你的技能创意，来一场技能大比拼吧...<br/>一场华山论剑，一战到底，用技能实力来说话~\r\n<br/>活动期间参加线上活动#技能大比拼#，在相应宠物秀话题下发布你家萌宠的技能图片，活动结束后根据点赞前三名获得爱宠零食大礼包一袋，更有宠物营养膏等你来赢取~快来参加吧！', null, null, '2', null, null, null), ('3', '[上海]我为小动物说句话。全国作品征集', '2', null, null, null, '2018-03-28 00:00:32', '2018-05-28 00:00:57', '{\"fileUrl\":\"src/assets/dbimages/avatar-1517393895522.jpg\",\"fileName\":\"timg (1).jpg\"}', null, null, null, '【如果给你30秒，你想为小动物说些什么呢？】\r\n<br/>\r\n<br/>当我们看到虐待、抛弃甚至是杀戮小动物的画面，除了充满同情更多的是愤懑。愤懑为何如此般摧残一条生命；愤懑当初既然选择养它，为何又将它不管不顾；愤懑为何因为一己私心，将其赶尽杀绝...\r\n<br/><br/>作为一个有正义感的铲屎官，我们不想看到这种事情继续发生，而我们又能做些什么，对小动物又想说些什么呢？一起加入到为小动物发生的队伍中来！\r\n<br/>我们可以用实际行动影响身边的宠友，一起弘扬正确的养宠价值观，杜绝虐宠弃宠行为，真正做到不离不弃负责到底！\r\n<br/>现在只要将【你为小动物说一句话+和宠物的合影】发送到线上活动#我为小动物说句话#即可参与。', null, '全国', '2', '免费', null, null), ('4', '[南宁]“我为小动物说句话”聚会趴', '2', null, null, null, '2018-03-28 00:00:34', '2018-03-29 00:00:48', '{\"fileUrl\":\"src/assets/dbimages/avatar-1517393895522.jpg\",\"fileName\":\"timg (1).jpg\"}', null, null, null, null, null, '江南区南建路5号', '1', '免费', null, null), ('5', '狗狗约遛', '3', '1', 'aaa', '2018-02-11 16:19:30', '2018-02-11 16:18:00', '2018-04-14 16:18:00', '{\"fileUrl\":\"src/assets/dbimages/avatar-1518337170653.jpg\",\"fileName\":\"tooopen_sy_165769391314.jpg\"}', null, null, null, '①禁止烈性犬参加<br/>②出现危险后果自负', '广东省 广州市', '天河区车陂公园', '2', '免费', '13564265985', '不限');
COMMIT;

-- ----------------------------
-- Table structure for `actsigns`
-- ----------------------------
DROP TABLE IF EXISTS `actsigns`;
CREATE TABLE `actsigns` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`userId`  int(11) NOT NULL ,
`actId`  int(11) NOT NULL ,
`signName`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`signContact`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`actTitle`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of actsigns
-- ----------------------------
BEGIN;
INSERT INTO `actsigns` VALUES ('11', '1', '3', 'ljy', '13189233129', '[上海]我为小动物说句话。全国作品征集'), ('12', '1', '5', 'ljy', '13437851632', '狗狗约遛');
COMMIT;

-- ----------------------------
-- Table structure for `disease`
-- ----------------------------
DROP TABLE IF EXISTS `disease`;
CREATE TABLE `disease` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`diseaseType`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`createTime`  datetime NULL DEFAULT NULL ,
`photo`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`note`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`petName`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`petSex`  int(11) NULL DEFAULT NULL ,
`petType`  int(11) NULL DEFAULT NULL ,
`petBirth`  datetime NULL DEFAULT NULL ,
`isInsert`  tinyint(11) NULL DEFAULT NULL ,
`isVaccine`  tinyint(11) NULL DEFAULT NULL ,
`petStatus`  int(11) NULL DEFAULT NULL ,
`region`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`userId`  int(11) NULL DEFAULT NULL ,
`symptoms`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of disease
-- ----------------------------
BEGIN;
INSERT INTO `disease` VALUES ('2', '[1,2,6,5]', '2018-04-06 19:56:09', '[]', '食欲不振，眼角有分泌物，拉稀，干呕，眼睛下陷，虚弱不能长时间站立走路打晃，请问是什么原因呢？', '小狗狗', '1', '1', '2018-01-01 08:00:00', '1', '1', '1', '黑龙江省 伊春市 美溪区', '1', '{\"breath\":[\"精神不振\",\"无食欲\",\"精神萎靡\"],\"digestion\":{\"vomiting\":[\"无\"],\"diarrhea\":[\"水状\",\"腥臭\"]},\"facial\":{\"tears\":[\"增多\"],\"earSmell\":[\"0\"],\"earTickle\":[\"0\"],\"earColor\":[],\"nose\":[\"干燥\"],\"oral\":[\"0\"],\"isDrool\":[\"0\"],\"hasTeeth\":[\"0\"]},\"urinary\":{\"water\":[\"减少\"],\"times\":[\"减少\"],\"total\":[\"减少\"],\"color\":[\"深黄\"],\"hasBlood\":[]}}'), ('3', '[4]', '2018-04-06 20:01:06', '[{\"fileUrl\":\"src/assets/dbimages/picture-1523016066277.jpg\",\"fileName\":\"timg.jpg\"}]', '脖子无法左转', '小可爱', '1', '1', '2016-01-01 08:00:00', '1', '1', '1', '内蒙古自治区 通辽市 库伦旗', '1', '{\"surgical\":{\"cause\":\"不知道\",\"time\":\"2018-04-05 19:00\"}}'), ('4', '[2,1,5,6,7,3,4,8]', '2018-04-07 02:00:38', '[{\"fileUrl\":\"src/assets/dbimages/picture-1523037638567.jpg\",\"fileName\":\"timg.jpg\"}]', '测试填写全部', '所示', '2', '1', '2016-01-01 08:00:00', '1', '1', '0', '辽宁省 锦州市 北镇市', '1', '{\"digestion\":{\"vomiting\":[\"无\"],\"diarrhea\":[\"酸臭\",\"烂泥状\"]},\"breath\":[\"无食欲\",\"流鼻涕\",\"精神不振\",\"有痰\"],\"urinary\":{\"water\":[\"减少\"],\"times\":[\"减少\"],\"total\":[\"减少\"],\"color\":[\"血红色\"],\"hasBlood\":[\"尿中(混合)\"]},\"facial\":{\"tears\":[\"减少\"],\"earSmell\":[\"1\"],\"earTickle\":[\"0\"],\"earColor\":[\"褐色\"],\"nose\":[\"干燥\"],\"oral\":[\"1\"],\"isDrool\":[\"0\"],\"hasTeeth\":[\"0\"]},\"insert\":{\"question\":\"如何桥多久啊卡开始的卢卡斯倒是考虑到会卡死的卡上的科室领导好\",\"time\":\"2007-10-01 08:00\"},\"skin\":{\"tickle\":[\"无瘙痒\"],\"hair\":[\"少量掉毛\"],\"parasite\":[\"蜱虫\"],\"against\":[\"0\"]},\"surgical\":{\"cause\":\"不知道是不是 打了针呢嗯饿呢呢\",\"time\":\"2018-01-01 08:00\"},\"immune\":{\"question\":\"还要大妈撒大声地打算阿萨德啊啊所多\",\"time\":\"2018-01-01 08:00\"}}');
COMMIT;

-- ----------------------------
-- Table structure for `liked`
-- ----------------------------
DROP TABLE IF EXISTS `liked`;
CREATE TABLE `liked` (
`likeId`  int(11) NOT NULL AUTO_INCREMENT ,
`likeTypeId`  int(11) NOT NULL ,
`likeType`  int(11) NOT NULL ,
`likeUserId`  int(11) NOT NULL ,
`likeStatus`  tinyint(11) NOT NULL ,
PRIMARY KEY (`likeId`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

;

-- ----------------------------
-- Records of liked
-- ----------------------------
BEGIN;
INSERT INTO `liked` VALUES ('15', '5', '1', '1', '0'), ('16', '3', '1', '1', '0'), ('17', '2', '1', '1', '0'), ('18', '5', '1', '1', '1');
COMMIT;

-- ----------------------------
-- Table structure for `look`
-- ----------------------------
DROP TABLE IF EXISTS `look`;
CREATE TABLE `look` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`isFindPet`  tinyint(1) NOT NULL ,
`region`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`address`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`dateTime`  datetime NOT NULL ,
`petSex`  int(11) NOT NULL ,
`petType`  int(11) NOT NULL ,
`petAge`  int(11) NULL DEFAULT NULL ,
`petAvatar`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`note`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`contact`  char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`userId`  int(11) NOT NULL ,
`findStatus`  int(11) NOT NULL ,
`createTime`  datetime NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of look
-- ----------------------------
BEGIN;
INSERT INTO `look` VALUES ('8', '2', '内蒙古自治区 通辽市 库伦旗', '十大', '2008-01-01 00:00:00', '2', '1', '0', '[{\"fileUrl\":\"src/assets/dbimages/picture-1517475606099.jpg\",\"fileName\":\"u=2171073523,1991282945&fm=27&gp=0.jpg\"},{\"fileUrl\":\"src/assets/dbimages/picture-1517475606099.jpg\",\"fileName\":\"u=2171073523,1991282945&fm=27&gp=0.jpg\"}]', '十大<br/>十大<br/>是d是<br/>十大<br/>十大<br/>是十大<br/>法国代购<br/>更好f', '13425678964', '1', '1', '2018-01-28 23:17:31'), ('10', '2', '天津市 市辖区 河东区', '22', '2008-01-01 00:00:00', '3', '1', '0', '[{\"fileUrl\":\"src/assets/dbimages/picture-1517477456060.jpg\",\"fileName\":\"timg (1).jpg\"},{\"fileUrl\":\"src/assets/dbimages/picture-1517477456060.jpg\",\"fileName\":\"timg (1).jpg\"}]', '2220', '13485642956', '1', '2', '2018-02-01 17:30:56'), ('11', '2', '北京市 市辖区 丰台区', '杀杀杀', '2008-01-01 00:00:00', '3', '1', '0', '[{\"fileUrl\":\"src/assets/dbimages/picture-1517478098147.jpg\",\"fileName\":\"79f0f736afc379314a650b4eeac4b74543a91143.jpg\"},{\"fileUrl\":\"src/assets/dbimages/picture-1517478098147.jpg\",\"fileName\":\"79f0f736afc379314a650b4eeac4b74543a91143.jpg\"}]', '杀杀杀', '13526485648', '1', '1', '2018-02-01 17:41:38'), ('12', '1', '天津市 市辖区 河东区', '算是', '2008-01-01 00:00:00', '3', '1', '1', '[{\"fileUrl\":\"src/assets/dbimages/picture-1517478157510.jpg\",\"fileName\":\"tooopen_sy_165769391314.jpg\"},{\"fileUrl\":\"src/assets/dbimages/picture-1517478157510.jpg\",\"fileName\":\"tooopen_sy_165769391314.jpg\"}]', '算是', '13568959696', '1', '1', '2018-02-01 17:42:37'), ('13', '2', '北京市 市辖区 西城区', '13562', '2008-01-01 00:00:00', '3', '1', '0', '[{\"fileUrl\":\"src/assets/dbimages/picture-1517478287537.jpg\",\"fileName\":\"u=2171073523,1991282945&fm=27&gp=0.jpg\"},{\"fileUrl\":\"src/assets/dbimages/picture-1517478287537.jpg\",\"fileName\":\"u=2171073523,1991282945&fm=27&gp=0.jpg\"}]', '算是', '13564298564', '1', '2', '2018-02-01 17:44:47'), ('14', '2', '天津市 市辖区 南开区', '啊啊', '2008-01-01 00:00:00', '3', '1', '0', '[{\"fileUrl\":\"src/assets/dbimages/picture-1517478374427.jpg\",\"fileName\":\"tooopen_sy_165769391314.jpg\"},{\"fileUrl\":\"src/assets/dbimages/picture-1517478374434.jpg\",\"fileName\":\"timg (1).jpg\"}]', '啊啊', '13564826589', '1', '2', '2018-02-01 17:46:14');
COMMIT;

-- ----------------------------
-- Table structure for `pet`
-- ----------------------------
DROP TABLE IF EXISTS `pet`;
CREATE TABLE `pet` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`petName`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`petSex`  int(11) NOT NULL ,
`petType`  int(11) NOT NULL ,
`petBelongId`  int(11) NOT NULL ,
`petBirth`  date NOT NULL ,
`petStatus`  int(11) NULL DEFAULT NULL ,
`petArrivedDate`  date NULL DEFAULT NULL ,
`petAvatar`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`petCreateDate`  date NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of pet
-- ----------------------------
BEGIN;
INSERT INTO `pet` VALUES ('23', '问问', '2', '3', '1', '1990-01-01', '3', '1990-05-01', '{\"fileUrl\":\"src/assets/dbimages/avatar-1517393895522.jpg\",\"fileName\":\"timg (1).jpg\"}', '2018-01-31'), ('27', 'AA', '2', '1', '1', '1990-01-01', null, null, '{\"fileUrl\":\"src/assets/dbimages/avatar-1517477670257.jpg\",\"fileName\":\"tooopen_sy_165769391314.jpg\"}', '2018-02-01'), ('28', '3', '1', '1', '1', '1990-01-01', null, null, '{\"fileUrl\":\"src/assets/dbimages/avatar-1517463818450.jpg\",\"fileName\":\"u=2171073523,1991282945&fm=27&gp=0.jpg\"}', '2018-02-01'), ('29', '2', '1', '1', '1', '1990-01-01', null, null, '{\"fileUrl\":\"src/assets/dbimages/avatar-1517464394798.jpg\",\"fileName\":\"u=2171073523,1991282945&fm=27&gp=0.jpg\"}', '2018-02-01');
COMMIT;

-- ----------------------------
-- Table structure for `petshow`
-- ----------------------------
DROP TABLE IF EXISTS `petshow`;
CREATE TABLE `petshow` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`content`  char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL ,
`petAvatar`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`actId`  int(11) NULL DEFAULT NULL ,
`userId`  int(11) NOT NULL ,
`createTime`  datetime NOT NULL ,
`likeCount`  int(11) NULL DEFAULT 0 ,
`commentCount`  int(11) NULL DEFAULT 0 ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

;

-- ----------------------------
-- Records of petshow
-- ----------------------------
BEGIN;
INSERT INTO `petshow` VALUES ('1', '#技能大比拼#厉害厉害，技能大王', '[{\"fileUrl\":\"src/assets/dbimages/picture-1520581889220.jpg\",\"fileName\":\"79f0f736afc379314a650b4eeac4b74543a91143.jpg\"}]', '2', '1', '2018-03-09 15:51:29', '0', '0'), ('2', '#技能大比拼#', '[{\"fileUrl\":\"src/assets/dbimages/picture-1522492429303.jpg\",\"fileName\":\"QQ图片20151112123333.jpg\"}]', '2', '1', '2018-03-31 18:33:49', '0', '0'), ('3', '#技能大比拼#', '[{\"fileUrl\":\"src/assets/dbimages/picture-1522494186844.jpg\",\"fileName\":\"QQ图片20151112123333.jpg\"}]', '2', '1', '2018-03-31 19:03:06', '0', '0'), ('5', 'halo', '[{\"fileUrl\":\"src/assets/dbimages/picture-1522570161053.jpg\",\"fileName\":\"QQ图片20151112123333.jpg\"}]', null, '3', '2018-04-01 16:09:21', '1', '0');
COMMIT;

-- ----------------------------
-- Table structure for `relation`
-- ----------------------------
DROP TABLE IF EXISTS `relation`;
CREATE TABLE `relation` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`fromUserId`  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL ,
`toUserId`  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

;

-- ----------------------------
-- Records of relation
-- ----------------------------
BEGIN;
INSERT INTO `relation` VALUES ('19', '3', '2'), ('64', '1', '3'), ('65', '1', '2'), ('67', '3', '1');
COMMIT;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`userPhone`  char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`userName`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`userPsd`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`userNumber`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`userSex`  int(11) NULL DEFAULT NULL ,
`userEmail`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`userBirth`  date NULL DEFAULT NULL ,
`userAvatar`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`userNote`  char(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`userConst`  int(11) NULL DEFAULT NULL ,
`userStatus`  int(11) NULL DEFAULT NULL ,
`userProblem`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`userAnswer`  longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`userCity`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`userFollowers`  int(11) NULL DEFAULT 0 ,
`userFollowings`  int(11) NULL DEFAULT 0 ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', '13437851632', '测试修改1', '1234567', '170116131212', '2', '656442@qq.com', '1995-03-01', '{\"fileUrl\":\"src/assets/dbimages/avatar-1523042590180.JPG\",\"fileName\":\"IMG_0005.JPG\"}', null, '11', '5', null, null, '辽宁省 丹东市', '1', '1'), ('2', '13189233139', 'bbb', '123456', null, null, null, null, null, null, null, null, null, null, null, '0', '2'), ('3', '13189233129', 'ccc', '123456', '2018122161618', '2', null, null, null, null, null, null, '111', '111', null, '2', '0');
COMMIT;
DROP TRIGGER IF EXISTS `tri_updateActPeopleNum`;
DELIMITER ;;
CREATE TRIGGER `tri_updateActPeopleNum` AFTER INSERT ON `actsigns` FOR EACH ROW BEGIN
 DECLARE sum INT;
 SET sum = (SELECT peopleNum FROM activity WHERE id = new.actId);
 UPDATE activity SET peopleNum = sum+1 WHERE id = new.actId;
END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `tri_updateLikeCount1`;
DELIMITER ;;
CREATE TRIGGER `tri_updateLikeCount1` AFTER INSERT ON `liked` FOR EACH ROW BEGIN
 DECLARE sum INT;
 IF (new.likeType = 1) THEN
  SET sum = (SELECT likeCount FROM petshow WHERE id = new.likeTypeId);
  UPDATE petshow SET likeCount = sum+1 WHERE id = new.likeTypeId;
 END IF;
END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `tri_updateLikeCount2`;
DELIMITER ;;
CREATE TRIGGER `tri_updateLikeCount2` AFTER UPDATE ON `liked` FOR EACH ROW BEGIN
 DECLARE sum INT;
 IF (new.likeType = 1) THEN
  SET sum = (SELECT likeCount FROM petshow WHERE id = new.likeTypeId);
  IF (new.likeStatus = 0) THEN
   UPDATE petshow SET likeCount = sum-1 WHERE id = new.likeTypeId;
  ELSE 
   UPDATE petshow SET likeCount = sum+1 WHERE id = new.likeTypeId;
  END IF;
 END IF;
END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `tri_updateActPeopleNum2`;
DELIMITER ;;
CREATE TRIGGER `tri_updateActPeopleNum2` AFTER INSERT ON `petshow` FOR EACH ROW BEGIN
 DECLARE sum INT;
 IF (new.actId<>NULL OR new.actId<>' ') THEN
  SET sum = (SELECT peopleNum FROM activity WHERE id = new.actId);
  UPDATE activity SET peopleNum = sum+1 WHERE id = new.actId;
END IF;
END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `tri_updateUserRelation1`;
DELIMITER ;;
CREATE TRIGGER `tri_updateUserRelation1` AFTER INSERT ON `relation` FOR EACH ROW BEGIN
 DECLARE attSum INT;
 DECLARE fanSum INT;
 SET attSum = (SELECT userFollowers FROM user WHERE id = new.fromUserId);
 SET fanSum = (SELECT userFollowings FROM user WHERE id = new.toUserId);
 UPDATE user SET userFollowers = attSum+1 WHERE id = new.fromUserId;
 UPDATE user SET  userFollowings = fanSum+1 WHERE id = new.toUserId;
END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `tri_updateUserRelation2`;
DELIMITER ;;
CREATE TRIGGER `tri_updateUserRelation2` AFTER DELETE ON `relation` FOR EACH ROW BEGIN
 DECLARE attSum INT;
 DECLARE fanSum INT;
 SET attSum = (SELECT userFollowers FROM user WHERE id = old.fromUserId);
 SET fanSum = (SELECT userFollowings FROM user WHERE id = old.toUserId);
 UPDATE user SET userFollowers = attSum-1 WHERE id = old.fromUserId;
 UPDATE user SET  userFollowings = fanSum-1 WHERE id = old.toUserId;
END
;;
DELIMITER ;
