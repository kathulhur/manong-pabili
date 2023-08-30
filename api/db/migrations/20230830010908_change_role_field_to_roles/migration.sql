/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "gender" TEXT,
    "mobileNumber" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" DATETIME,
    "latitude" REAL,
    "longitude" REAL,
    "roles" TEXT NOT NULL DEFAULT 'VENDOR',
    "lastLocationUpdate" DATETIME,
    "locationHidden" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_User" ("email", "gender", "hashedPassword", "id", "lastLocationUpdate", "latitude", "locationHidden", "longitude", "mobileNumber", "name", "resetToken", "resetTokenExpiresAt", "salt", "username") SELECT "email", "gender", "hashedPassword", "id", "lastLocationUpdate", "latitude", "locationHidden", "longitude", "mobileNumber", "name", "resetToken", "resetTokenExpiresAt", "salt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
