-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "gender" TEXT,
    "mobileNumber" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "roles" TEXT NOT NULL DEFAULT 'VENDOR',
    "lastLocationUpdate" TIMESTAMP(3),
    "locationHidden" BOOLEAN NOT NULL DEFAULT true,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "markerUrl" TEXT DEFAULT '/assets/images/default_marker.png',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
