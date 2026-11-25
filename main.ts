// The 3AM Fridge Text — make.fun bounty entry (program/v1, Node 22).
// Writes one single line — the text message a smart fridge sends its
// owner at 3am — to /output/entry.txt. Deterministic, no network, no input.
// The line must be 1-140 UTF-8 characters, one line, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";

// Design note (lever: concrete detail + twist in the second half + tight
// first-person voice). The line's fresh angle is the fridge's hum — the one
// sound a fridge makes all night — instead of the field's obvious milk, ice
// or door-left-open angles. The twist lands in the last two sentences:
// "The leftovers are fine. I'm not." flips the expected reassurance into
// the appliance's own complaint, which is what makes it screenshot-worthy.
const OUTPUT_PATH = "/output/entry.txt";
const LINE =
  "3am. I've hummed the same note since 2019 and you've never once asked how I sleep. The leftovers are fine. I'm not.";

const MAX_CHARS = 140;

// Defensive guard: the gate rejects anything outside 1-140 characters,
// so fail loudly here rather than shipping an invalid entry.
if ([...LINE].length < 1 || [...LINE].length > MAX_CHARS) {
  throw new Error(`entry line is ${[...LINE].length} chars, must be 1-${MAX_CHARS}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry line must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");
