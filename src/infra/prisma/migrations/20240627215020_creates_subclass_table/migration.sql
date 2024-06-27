-- CreateTable
CREATE TABLE "sub_classes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "class_id" INTEGER NOT NULL,

    CONSTRAINT "sub_classes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sub_classes" ADD CONSTRAINT "sub_classes_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
