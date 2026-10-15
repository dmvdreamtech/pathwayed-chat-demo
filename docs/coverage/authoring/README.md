# Coverage authoring

How the Reading and Writing drafts are being written, so any session can continue.

- `queue.json`: every skill to write, in build order (grades 8, 7, 6, 4, 5, then 11, 10, 12, 9). A skill is done when its file exists under `content/` and passes `bun run scripts/check-content.ts <file>`.
- `brief-template.md`: the brief each author gets, with the skill, file, shape and rules filled in. `scope.py` and `scope_hs.py` hold what each standard asks at each grade, used to fill the brief.
- For each finished skill: run the check, build its seed with `bun run scripts/build-coverage-seeds.ts <file>`, and commit the content file and `seeds/coverage/<slug>.sql` together.

Everything loads as draft. Nothing publishes until a reviewer approves it.
