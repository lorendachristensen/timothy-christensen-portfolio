# local-sync.ps1 — residential-IP backstop for the O'Colly clip sync.
#
# The GitHub Actions job (.github/workflows/sync.yml) is routinely rate-limited (HTTP 429) by
# ocolly.com's CDN because it runs from GitHub's datacenter IPs, so it skips discovery. This script
# runs the same sync from this laptop's residential IP (never blocked) as a DAILY backstop, and
# commits + pushes ONLY when it finds genuinely new content. Registered as a Windows Scheduled Task
# ("O'Colly clip sync (local backstop)"). Safe to run by hand anytime.
#
# Logging: every run appends a timestamped block to scripts/local-sync.log. All output — including
# native git/node stdout+stderr — is captured through .NET strings and written as UTF-8, so the log
# stays legible (an earlier version used `*>> $log`, which mixed console UTF-16 into the file).

# git/node emit benign stderr (e.g. "LF will be replaced by CRLF"). PS 5.1 turns native stderr into a
# terminating error under ErrorActionPreference='Stop', so keep 'Continue' and gate on $LASTEXITCODE.
$ErrorActionPreference = 'Continue'
$repo = 'C:\Users\timot\Claude\Projects\timothy-christensen-portfolio'
$log  = Join-Path $repo 'scripts\local-sync.log'

function Log($m) { "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  $m" | Add-Content -Path $log -Encoding utf8 }
# Append captured command output, indented, one UTF-8 line each (blank lines dropped).
function LogBlock($text) {
  foreach ($line in ((($text | Out-String).TrimEnd()) -split "`r?`n")) {
    if ($line.Trim() -ne '') { "     $line" | Add-Content -Path $log -Encoding utf8 }
  }
}
# Run a native command inside $cmd, log a header + its combined stdout/stderr, return its exit code.
function Exec([string]$desc, [scriptblock]$cmd) { Log ">> $desc"; $global:LASTEXITCODE = 0; LogBlock (& $cmd 2>&1); return $LASTEXITCODE }

function Main {
  if ((Exec 'git pull --ff-only' { git pull --ff-only }) -ne 0) { Log 'ABORT: git pull failed'; return 1 }

  # Run the sync; capture its output so we can both log it and pull out the discovered headlines.
  Log '>> node scripts/sync-clips.mjs'
  $global:LASTEXITCODE = 0
  $syncOut = (& { node scripts/sync-clips.mjs } 2>&1 | Out-String)
  $syncRc  = $LASTEXITCODE
  LogBlock $syncOut
  if ($syncRc -ne 0) { Log "note: sync exited $syncRc (continuing to check for content)" }

  # Real new content = new image/fulltext files, or clips.json changes beyond the lastSync/lastChecked bump.
  $untracked = git ls-files --others --exclude-standard -- images fulltext 2>$null
  $clipDiff  = (git diff --unified=0 -- clips.json 2>$null) | Where-Object {
    $_ -match '^[+-]' -and $_ -notmatch '^[+-]{2}' -and $_ -notmatch 'lastSync|lastChecked'
  }

  if (-not ($untracked -or $clipDiff)) {
    Exec 'discard timestamp churn' { git checkout -- clips.json } | Out-Null
    Log 'DONE: no new clips'
    return 0
  }

  foreach ($d in (($syncOut -split "`r?`n") | Where-Object { $_ -match 'DISCOVER \+ ' })) {
    Log ('NEW: ' + (($d -replace '.*DISCOVER \+ ', '').Trim()))
  }
  Exec 'git add'    { git add clips.json images fulltext } | Out-Null
  Exec 'git commit' { git commit -m "chore: sync new O'Colly clips (local backstop) [skip ci]" } | Out-Null
  $pushRc = Exec 'git push' { git push }
  if ($pushRc -ne 0) {                                    # remote advanced (CI pushed) — rebase and retry once
    Log 'push rejected — rebasing and retrying'
    Exec 'git pull --rebase' { git pull --rebase } | Out-Null
    $pushRc = Exec 'git push (retry)' { git push }
  }
  if ($pushRc -eq 0) { Log 'DONE: pushed new clips'; return 0 }
  Log 'ERROR: push failed'; return 1
}

# Task Scheduler starts with a minimal PATH — pull in the machine/user PATH so node + git resolve.
$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')
Set-Location $repo

Log '==== run start ===='
$code = 1
try { $code = Main }
catch {
  Log "FATAL: $($_.Exception.Message)"
  if ($_.ScriptStackTrace) { Log ('  at ' + (($_.ScriptStackTrace -split "`r?`n")[0])) }
}
finally { Log '==== run end ====' }
exit $code
