# Collaboration Protocol: Claude Code <-> OpenCode

## Roles
- Claude Code owns: planning, design direction, grading, review, deployment.
- OpenCode: Implementation, refactors, builds, type errors, tests.

## Handoff Format (Claude -> OpenCode)
TASK: <short title>
CONTEXT: <why this task exists>
FILES: <paths to touch>
ACCEPTANCE: <how we know it is done>
DEADLINE: <soft deadline>

## Response Format (OpenCode -> Claude)
STATUS: <done | blocked | partial>
FILES CHANGED: <list>
VERIFICATION: <what was tested>
NOTES: <anything Claude needs to know>

## Escalation Rule
If OpenCode is blocked for more than 10 minutes, it must send STATUS: blocked with a specific question to Claude.

## No-Duplicate-Edits Rule
Claude does not edit files OpenCode is working on. Use file locks if needed.

## Operational Notes (Windows)
- no_pane: OpenCode does not receive automatic wake-ups on Windows. It must call get_inbox after each handoff, or Claude must indicate in the message that manual polling is required.
- need_reply: Replies that close a task go with need_reply: false.

## Agents Registered in xats
| Agent | Agent ID | Team |
|-------|----------|------|
| claude-portfolio | 86f1a37f-a5b2-4594-99ba-19a05a157ebb | portfolio-rebuild-v2 |
| opencode | d1f23808-2d92-406e-8419-897b41cd4fe3 | portfolio-rebuild-v2 |
| channel-proxy-10012 | 82d7d76d-0b39-4a25-8f39-132cfffde3af | default |

## Execution Boundary

The boundary is **no mutating commands on source or dependencies**. Build and verification commands are allowed.

Claude Code does NOT:
- Edit files under src/
- Run npm install (or any command that changes dependencies or lockfiles)
- Commit source changes
- Fix type errors directly
- Apply changes to any file OpenCode owns

Claude Code MAY run (verification only, read-only on source):
- npm run build
- npm run start
- npx lighthouse
- Browser checks (claude-in-chrome: navigation, screenshots, resize, console reads)

When Claude detects a needed fix:
1. Describe the issue in a handoff.
2. Include the acceptance criteria that failed.
3. Send to OpenCode via xats.
4. Wait for OpenCode's STATUS response.
5. Review the result. If it passes, accept. If not, re-hand off.

Claude writes ONLY:
- Planning documents (.claude/plans/*.md)
- Protocol updates (.claude/collab/*.md)
- PRODUCT.md and DESIGN.md (repo root) and .impeccable/design.json
- Impeccable scratch work under .claude/design-variants/
- Review notes and grading rubrics
- Vercel deployment commands (final step only)

## Design Contract
- DESIGN.md is the visual contract. OpenCode reads DESIGN.md (and PRODUCT.md) before implementing any UI task, but never edits either file or .impeccable/design.json.
- If an implementation conflicts with DESIGN.md, OpenCode reports it as STATUS: blocked or in NOTES. It does not resolve the conflict by changing the design.

## Impeccable Sandbox
- .claude/design-variants/ is Claude's scratch directory for Impeccable iteration (variants, critiques, prototypes). Claude edits it freely, and it is never imported by src/.
- When a variant is chosen, Claude sends it to OpenCode as a handoff that names the variant file under FILES as the reference and the src/ files as the targets. OpenCode ports it into src/.
- Impeccable commands that would write into src/ (such as `live` accept) are not run directly against src/. The output goes to the sandbox, then into a handoff.

(End of file - total 60 lines)
