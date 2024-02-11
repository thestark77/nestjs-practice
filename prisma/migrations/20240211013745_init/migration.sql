-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_userId_fkey`;

-- AlterTable
ALTER TABLE `task` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
