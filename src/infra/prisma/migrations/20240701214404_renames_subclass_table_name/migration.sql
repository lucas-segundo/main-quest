/*
  Warnings:

  - You are about to drop the `sub_classes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sub_classes" DROP CONSTRAINT "sub_classes_class_id_fkey";

-- DropTable
DROP TABLE "sub_classes";

-- CreateTable
CREATE TABLE "subclasses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "class_id" INTEGER NOT NULL,

    CONSTRAINT "subclasses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subclasses" ADD CONSTRAINT "subclasses_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
