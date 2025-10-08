# 🚨 GIT COMMIT RULES - READ BEFORE COMMITTING

## CRITICAL RULE #1

**ALL COMMITS MUST BE AUTHORED BY ringmast4r ONLY**

**NEVER include:**
- Co-authorship tags
- AI attribution
- "Generated with" footers
- Tool references

## Commit Message Format

**CORRECT:**
```
Brief descriptive title

- Bullet point describing change
- Another change detail
- Fix or feature explanation
```

**WRONG:**
```
Brief descriptive title

- Changes here

🤖 Generated with [Tool Name]
Co-Authored-By: Anyone
```

## Examples

### ✅ GOOD COMMIT
```
Fix email deliverability with domain authentication

- Changed sender to alerts@deadmantriggers.com
- Added Reply-To header for responses
- Updated DNS records for SPF/DKIM
```

### ❌ BAD COMMIT
```
Fix email deliverability

- Changed sender address

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Quick Checklist Before Committing

- [ ] Commit message is clear and descriptive
- [ ] NO emojis in commit message
- [ ] NO attribution footers
- [ ] NO co-authorship tags
- [ ] Author is ringmast4r only

## Why This Matters

The git history must show ONLY the project author (ringmast4r). Any external tooling, assistance, or automation methods should NOT be disclosed in public commit history.

This is non-negotiable for this project.

---

**Remember: Clean commits = Professional history**
