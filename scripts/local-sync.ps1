# local-sync.ps1 — residential-IP safety net for the O'Colly clip sync.
#
# The GitHub Actions job (.github/workflows/sync.yml) can be rate-limited (HTTP 429) by
# ocolly.com's CDN because it runs from GitHub's datacenter IPs. This script runs the same
# sync from this laptop's residential IP (where the feed is never blocked) as a weekly backstop,
# committing + pushing ONLY when it finds genuinely new content the CI job missed. Registered as
# a Windows Scheduled Task ("O'Colly clip sync (local backstop)"). Safe to run by hand anytime.

$ErrorActionPreference = 'Stop'
$repo = 'C:\Users\timot\Claude\Projects\timothy-christensen-portfolio'
$log  = Join-Path $repo 'scripts\local-sync.log'

function Log($msg) { "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  $msg" | Out-File -FilePath $log -Append -Encoding utf8 }

# Task Scheduler starts with a minimal PATH — pull in the machine/user PATH so node + git resolve.
$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')
Set-Location $repo

try {
  Log 'start'
  git pull --ff-only 2>&1 | Out-File $log -Append -Encoding utf8
  node scripts/sync-clips.mjs 2>&1 | Out-File $log -Append -Encoding utf8

  # Decide whether there is REAL new content, not just the per-run lastSync/lastChecked timestamp bump.
  $untracked = git ls-files --others --exclude-standard -- images fulltext          # new clips add image + fulltext files
  $clipDiff  = git diff --unified=0 -- clips.json |
    Where-Object { $_ -match '^[+-]' -and $_ -notmatch '^[+-]{2}' -and $_ -notmatch 'lastSync|lastChecked' }

  if ($untracked -or $clipDiff) {
    git add clips.json images fulltext 2>&1 | Out-File $log -Append -Encoding utf8
    git commit -m "chore: sync new O'Colly clips (local backstop) [skip ci]" 2>&1 | Out-File $log -Append -Encoding utf8
    git push 2>&1 | Out-File $log -Append -Encoding utf8
    if ($LASTEXITCODE -ne 0) {                                                       # remote advanced (CI pushed) — rebase and retry once
      Log 'push rejected, rebasing'
      git pull --rebase 2>&1 | Out-File $log -Append -Encoding utf8
      git push 2>&1 | Out-File $log -Append -Encoding utf8
    }
    Log 'DONE: pushed new clips'
  } else {
    git checkout -- clips.json 2>&1 | Out-File $log -Append -Encoding utf8           # discard timestamp-only churn, keep tree clean
    Log 'DONE: no new clips'
  }
} catch {
  Log "ERROR: $($_.Exception.Message)"
  exit 1
}
