# local-sync.ps1 — residential-IP safety net for the O'Colly clip sync.
#
# The GitHub Actions job (.github/workflows/sync.yml) can be rate-limited (HTTP 429) by
# ocolly.com's CDN because it runs from GitHub's datacenter IPs. This script runs the same
# sync from this laptop's residential IP (where the feed is never blocked) as a weekly backstop,
# committing + pushing ONLY when it finds genuinely new content the CI job missed. Registered as
# a Windows Scheduled Task ("O'Colly clip sync (local backstop)"). Safe to run by hand anytime.

# NOTE: git/node emit benign warnings on stderr (e.g. "LF will be replaced by CRLF"). Under
# Windows PowerShell 5.1, ErrorActionPreference='Stop' turns native stderr into a terminating
# error, so we keep 'Continue' and gate on $LASTEXITCODE for real failures instead.
$ErrorActionPreference = 'Continue'
$repo = 'C:\Users\timot\Claude\Projects\timothy-christensen-portfolio'
$log  = Join-Path $repo 'scripts\local-sync.log'
function Log($m) { "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  $m" | Add-Content -Path $log -Encoding utf8 }

# Task Scheduler starts with a minimal PATH — pull in the machine/user PATH so node + git resolve.
$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')
Set-Location $repo

Log 'start'
git pull --ff-only *>> $log
if ($LASTEXITCODE -ne 0) { Log "ABORT: git pull failed (exit $LASTEXITCODE)"; exit 1 }

node scripts/sync-clips.mjs *>> $log
if ($LASTEXITCODE -ne 0) { Log "note: sync script exited $LASTEXITCODE (continuing to check for content)" }

# Real new content = new image/fulltext files, or clips.json changes beyond the per-run
# lastSync/lastChecked timestamp bump. Discard stderr so it can't pollute the captured output.
$untracked = git ls-files --others --exclude-standard -- images fulltext 2>$null
$clipDiff  = (git diff --unified=0 -- clips.json 2>$null) | Where-Object {
  $_ -match '^[+-]' -and $_ -notmatch '^[+-]{2}' -and $_ -notmatch 'lastSync|lastChecked'
}

if ($untracked -or $clipDiff) {
  git add clips.json images fulltext *>> $log
  git commit -m "chore: sync new O'Colly clips (local backstop) [skip ci]" *>> $log
  git push *>> $log
  if ($LASTEXITCODE -ne 0) {                                    # remote advanced (CI pushed) — rebase and retry once
    Log 'push rejected, rebasing and retrying'
    git pull --rebase *>> $log
    git push *>> $log
  }
  if ($LASTEXITCODE -eq 0) { Log 'DONE: pushed new clips' } else { Log "ERROR: push failed (exit $LASTEXITCODE)"; exit 1 }
} else {
  git checkout -- clips.json *>> $log                            # discard timestamp-only churn, keep tree clean
  Log 'DONE: no new clips'
}
