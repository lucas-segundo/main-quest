/*
  Warnings:

  - Added the required column `charisma` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `constitution` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dexterity` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intelligence` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strength` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wisdom` to the `characters` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SpellcastingAbility" AS ENUM ('INT', 'WIS', 'CHA');

-- AlterTable
ALTER TABLE "characters" ADD COLUMN     "charisma" INTEGER NOT NULL,
ADD COLUMN     "constitution" INTEGER NOT NULL,
ADD COLUMN     "dexterity" INTEGER NOT NULL,
ADD COLUMN     "intelligence" INTEGER NOT NULL,
ADD COLUMN     "strength" INTEGER NOT NULL,
ADD COLUMN     "wisdom" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "spellcasting_ability" "SpellcastingAbility";
