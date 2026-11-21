// Lists every owner TODO in the project (code comments + ownerTodo frontmatter). Run: npm run todo
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

for (const file of walk('src')) {
  const lines = readFileSync(file, 'utf8').split('\n');
  let inOwnerTodo = false;
  lines.forEach((line, i) => {
    if (/^ownerTodo:/.test(line)) { inOwnerTodo = true; return; }
    if (inOwnerTodo && /^\s+-\s/.test(line)) return console.log(`${file}:${i + 1}  [ownerTodo] ${line.trim().slice(2)}`);
    if (inOwnerTodo && !/^\s/.test(line)) inOwnerTodo = false;
    if (/TODO/.test(line)) console.log(`${file}:${i + 1}  ${line.trim()}`);
  });
}
