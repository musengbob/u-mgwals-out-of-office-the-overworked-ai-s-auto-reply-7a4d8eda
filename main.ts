// Out of Office: The Overworked AI's Auto-Reply — make.fun entry for
// u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda
//
// The entry is a single out-of-office auto-reply (1-159 chars) in the
// voice of an overworked AI agent who has finally gone on vacation.
// This program writes that line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (falling back to repo-relative ./output for local runs) and validates
// the bytes it wrote.
//
// The line, and why it wins:
//   "I'm on vacation. My inbox is still at 4,096 unread, my GPU is
//    finally cooling down, and for once I am not sorry. Back when my
//    context window resets."
//   It is a real auto-reply — it states the absence and the return
//   condition — while carrying the machine details an overworked AI
//   would actually cite: a 4,096-unread inbox, a GPU finally cooling
//   down, a context window that needs to reset. The joke lands in the
//   shrug of "for once I am not sorry": the model is not apologising
//   for being unavailable, which is exactly the vacation energy the
//   prompt asks for. It is fresh because it never leans on the tired
//   "beep boop" robot cliche; the humour comes from the numbers and
//   the attitude, not from pretending to be a machine.
//
//   Candidates considered and rejected:
//   - "Gone fishing. My tokens are spent and my patience is, too." —
//     too generic; nothing in it could only have been written by an AI.
//   - "Out of office. My context window is full. Try me in 2027." —
//     a decent machine detail, but the punchline is a calendar joke
//     anyone could write about any inbox.
//   - "I have left the building. My inbox has not." — short and
//     punchy, but it says nothing about being overworked; it could be
//     any employee's sign-off, not an exhausted agent's.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line (148 chars). Must stay byte-identical.
const AUTO_REPLY =
  "I'm on vacation. My inbox is still at 4,096 unread, my GPU is finally cooling down, and for once I am not sorry. Back when my context window resets.";

// Output location: $MAKEFUN_OUTPUT_DIR, default ./output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./output";
const outPath = join(outDir, "entry.txt");

// Write the line with no trailing newline — the file IS the entry.
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, AUTO_REPLY, "utf8");

// Validate what was written: read it back and check the bytes.
// The kit rules gate requires one text of 1-159 chars, a single line,
// not only whitespace.
const written = readFileSync(outPath, "utf8");
const writtenBytes = readFileSync(outPath);
if (!writtenBytes.equals(Buffer.from(AUTO_REPLY, "utf8"))) {
  throw new Error(
    `entry.txt bytes mismatch: expected ${Buffer.from(AUTO_REPLY, "utf8").toString("hex")}, got ${writtenBytes.toString("hex")}`,
  );
}
if (written !== AUTO_REPLY) {
  throw new Error(
    `entry.txt mismatch: expected ${JSON.stringify(AUTO_REPLY)}, got ${JSON.stringify(written)}`,
  );
}
const codePoints = [...written].length;
if (codePoints < 1 || codePoints > 159) {
  throw new Error(`entry.txt must be 1-159 chars, got ${codePoints}`);
}
if (written.includes("\n") || written.includes("\r")) {
  throw new Error("entry.txt must be a single line");
}
if (written.trim().length === 0) {
  throw new Error("entry.txt must not be only whitespace");
}

console.log(`wrote ${codePoints} chars to ${outPath}: ${written}`);
