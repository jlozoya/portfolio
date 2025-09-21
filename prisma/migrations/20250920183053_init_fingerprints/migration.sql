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
