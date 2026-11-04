import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const candidates = new Set();

async function scan(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);

        if (entry.isDirectory()) {
            await scan(path);
            continue;
        }

        if (!/\.(tsx?|jsx?)$/.test(entry.name) || entry.name.endsWith(".d.ts")) continue;

        const source = await readFile(path, "utf8");
        const strings = source.match(/(["'])(?:\\.|(?!\1)[\s\S])*?\1/g) ?? [];

        for (const value of strings) {
            const content = value.slice(1, -1).replace(/\\[\\'"]/g, " ");
            for (const token of content.split(/\s+/)) {
                const candidate = token.replace(/^[,;]+|[,;]+$/g, "");
                if (candidate && !candidate.startsWith("sui:")) candidates.add("sui:" + candidate);
                else if (candidate) candidates.add(candidate);
            }
        }
    }
}

await scan(new URL("../src/", import.meta.url).pathname);
await writeFile(new URL("../src/tailwind-candidates.txt", import.meta.url), [...candidates].join("\n"));
console.log("Generated " + candidates.size + " isolated Tailwind candidates.");
