-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeLog" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "stopTime" TIMESTAMP(3) NOT NULL,
    "recordTime" INTEGER NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "status" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TimeLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagTimeLogs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TagTimeLogs_AB_unique" ON "_TagTimeLogs"("A", "B");

-- CreateIndex
CREATE INDEX "_TagTimeLogs_B_index" ON "_TagTimeLogs"("B");

-- AddForeignKey
ALTER TABLE "TimeLog" ADD CONSTRAINT "TimeLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagTimeLogs" ADD CONSTRAINT "_TagTimeLogs_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagTimeLogs" ADD CONSTRAINT "_TagTimeLogs_B_fkey" FOREIGN KEY ("B") REFERENCES "TimeLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
