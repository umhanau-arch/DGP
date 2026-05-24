import { chapter1 } from "./chapter1";
import { chapter2 } from "./chapter2";
import { chapter3 } from "./chapter3";
import { chapter4 } from "./chapter4";
import { chapter5 } from "./chapter5";
import { chapter6 } from "./chapter6";
import { chapter7 } from "./chapter7";
import { chapter8 } from "./chapter8";
import { chapter9 } from "./chapter9";
import type { ChapterDefinition, ChapterId } from "../types";

export const chapters: ChapterDefinition[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
  chapter8,
  chapter9,
];

export function chapterById(id: ChapterId): ChapterDefinition {
  const found = chapters.find((c) => c.id === id);
  return found ?? chapters[0];
}

export const chapterIds: ChapterId[] = chapters.map((c) => c.id);
