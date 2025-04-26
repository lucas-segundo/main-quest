-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes_skills" (
    "id" SERIAL NOT NULL,
    "class_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "classes_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subclasses_skills" (
    "id" SERIAL NOT NULL,
    "subclass_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "subclasses_skills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "classes_skills" ADD CONSTRAINT "classes_skills_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes_skills" ADD CONSTRAINT "classes_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subclasses_skills" ADD CONSTRAINT "subclasses_skills_subclass_id_fkey" FOREIGN KEY ("subclass_id") REFERENCES "subclasses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subclasses_skills" ADD CONSTRAINT "subclasses_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
