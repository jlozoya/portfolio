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
ALTER TABLE `VisitorAchievement` ADD CONSTRAINT `VisitorAchievement_visitorId_fkey` FOREIGN KEY (`visitorId`) REFERENCES `VisitorFingerprint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisitorAchievement` ADD CONSTRAINT `VisitorAchievement_achievementId_fkey` FOREIGN KEY (`achievementId`) REFERENCES `Achievement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventLog` ADD CONSTRAINT `EventLog_visitorId_fkey` FOREIGN KEY (`visitorId`) REFERENCES `VisitorFingerprint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisitorStats` ADD CONSTRAINT `VisitorStats_visitorId_fkey` FOREIGN KEY (`visitorId`) REFERENCES `VisitorFingerprint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
