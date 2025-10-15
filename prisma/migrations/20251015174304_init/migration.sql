-- CreateTable
CREATE TABLE `VisitorFingerprint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hash` VARCHAR(191) NOT NULL,
    `serverToken` VARCHAR(191) NOT NULL,
    `visits` INTEGER NOT NULL DEFAULT 1,
    `firstSeen` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastSeen` DATETIME(3) NOT NULL,
    `userAgent` VARCHAR(191) NULL,
    `ip` VARCHAR(191) NULL,
    `meta` JSON NULL,

    UNIQUE INDEX `VisitorFingerprint_hash_key`(`hash`),
    UNIQUE INDEX `VisitorFingerprint_serverToken_key`(`serverToken`),
    INDEX `VisitorFingerprint_hash_idx`(`hash`),
    INDEX `VisitorFingerprint_serverToken_idx`(`serverToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VisitorAchievement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `visitorId` INTEGER NOT NULL,
    `achievementId` INTEGER NOT NULL,
    `unlockedAt` DATETIME(3) NULL,
    `progressNumber` INTEGER NOT NULL DEFAULT 0,
    `lastProgressAt` DATETIME(3) NULL,

    UNIQUE INDEX `VisitorAchievement_visitorId_achievementId_key`(`visitorId`, `achievementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `visitorId` INTEGER NOT NULL,
    `type` ENUM('VISIT', 'PAGE_VIEW', 'TIME_SPENT_SEC', 'SCROLL_DEPTH', 'CONTACT_SUBMIT', 'SHARE') NOT NULL,
    `valueNum` DOUBLE NULL,
    `meta` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `EventLog_visitorId_type_createdAt_idx`(`visitorId`, `type`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VisitorStats` (
    `visitorId` INTEGER NOT NULL,
    `visits` INTEGER NOT NULL DEFAULT 0,
    `pagesSeen` INTEGER NOT NULL DEFAULT 0,
    `totalTimeSec` INTEGER NOT NULL DEFAULT 0,
    `maxScrollDepth` DOUBLE NOT NULL DEFAULT 0,
    `contactSubmits` INTEGER NOT NULL DEFAULT 0,
    `shares` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`visitorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Achievement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `goalNumber` INTEGER NULL,

    UNIQUE INDEX `Achievement_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VisitorAchievement` ADD CONSTRAINT `fk_visitorachievement_visitor` FOREIGN KEY (`visitorId`) REFERENCES `VisitorFingerprint`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisitorAchievement` ADD CONSTRAINT `fk_visitorachievement_achievement` FOREIGN KEY (`achievementId`) REFERENCES `Achievement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventLog` ADD CONSTRAINT `fk_eventlog_visitor` FOREIGN KEY (`visitorId`) REFERENCES `VisitorFingerprint`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisitorStats` ADD CONSTRAINT `fk_visitorstats_visitor` FOREIGN KEY (`visitorId`) REFERENCES `VisitorFingerprint`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
