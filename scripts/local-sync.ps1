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

# The backstop's job is fast, reliable DISCOVERY. Skip the slow 62+ request link-health pass: on a flaky
# network it can exceed the scheduled task's 15-min limit and get the whole run killed before it commits
# (seen repeatedly as "run start" with no "run end"). Refresh link health with a manual full run instead.
$env:SKIP_LIVECHECK = '1'
# Never let git block on an interactive credential prompt — fail fast rather than hang to the kill limit.
$env:GIT_TERMINAL_PROMPT = '0'

function Log($m) { "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  $m" | Add-Content -Path $log -Encoding utf8 }
# Append captured command output, indented, one UTF-8 line each (blank lines dropped).
function LogBlock($text) {
  foreach ($line in ((($text | Out-String).TrimEnd()) -split "`r?`n")) {
    if ($line.Trim() -ne '') { "     $line" | Add-Content -Path $log -Encoding utf8 }
  }
}
# Run a LOCAL (non-network) command inside $cmd; log a header + combined output; return its exit code.
function Exec([string]$desc, [scriptblock]$cmd) { Log ">> $desc"; $global:LASTEXITCODE = 0; LogBlock (& $cmd 2>&1); return $LASTEXITCODE }

# Run a NETWORK command (git pull/push, node) under a HARD timeout. On a flaky connection any of these can
# hang with no output; without a cap the whole run stalls until the scheduled task's 15-min kill (seen as
# "run start" with no "run end"). This kills the process tree after $timeoutSec and returns 124 so the run
# continues and completes cleanly. Captured output is stashed in $script:LastOut for callers that need it.
$script:LastOut = ''
function ExecT([string]$desc, [string]$exe, [string[]]$argv, [int]$timeoutSec) {
  Log ">> $desc"
  $outF = [System.IO.Path]::GetTempFileName(); $errF = [System.IO.Path]::GetTempFileName()
  $script:LastOut = ''
  try {
    $p = Start-Process -FilePath $exe -ArgumentList $argv -WorkingDirectory $repo -NoNewWindow -PassThru `
         -RedirectStandardOutput $outF -RedirectStandardError $errF
    $null = $p.Handle   # cache the handle so $p.ExitCode is readable after WaitForExit (PS 5.1 quirk)
    $done = $p.WaitForExit($timeoutSec * 1000)
    if (-not $done) { Start-Process taskkill -ArgumentList '/PID', $p.Id, '/T', '/F' -NoNewWindow -Wait -ErrorAction SilentlyContinue; Start-Sleep -Milliseconds 500 }
    else { $p.WaitForExit() }   # no-arg wait flushes redirected output and finalizes ExitCode
    $script:LastOut = (((Get-Content $outF -Raw -ErrorAction SilentlyContinue)) + "`n" + ((Get-Content $errF -Raw -ErrorAction SilentlyContinue)))
    LogBlock $script:LastOut
    if (-not $done) { Log "TIMEOUT: '$desc' exceeded ${timeoutSec}s - killed"; return 124 }
    return [int]$p.ExitCode
  } finally { Remove-Item $outF, $errF -Force -ErrorAction SilentlyContinue }
}

function Main {
  if ((ExecT 'git pull --ff-only' 'git' @('pull','--ff-only') 60) -ne 0) {
    # A prior run killed mid-sync can leave untracked images/fulltext files; when the remote later
    # commits the same files, a fast-forward pull refuses to clobber them and the backstop jams every
    # run after. Self-heal: move those untracked files aside (safe — the pull re-adds the committed
    # copies, or the node run below regenerates anything genuinely new) and retry the pull once.
    Log 'pull failed — moving untracked images/fulltext aside and retrying'
    $leftovers = git ls-files --others --exclude-standard -- images fulltext 2>$null
    if ($leftovers) {
      $bak = Join-Path $env:TEMP ('tc-backstop-leftovers-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
      New-Item -ItemType Directory -Force -Path $bak | Out-Null
      foreach ($f in $leftovers) { Move-Item -LiteralPath $f -Destination (Join-Path $bak (Split-Path $f -Leaf)) -Force; Log "  moved aside: $f" }
    }
    if ((ExecT 'git pull --ff-only (retry)' 'git' @('pull','--ff-only') 60) -ne 0) { Log 'ABORT: git pull still failing after cleanup'; return 1 }
  }

  # Run the sync under a hard timeout; $script:LastOut holds its output for the headline summary below.
  if ((ExecT 'node scripts/sync-clips.mjs' 'node' @('scripts/sync-clips.mjs') 180) -ne 0) { Log 'note: sync returned non-zero (continuing to check for content)' }
  $syncOut = $script:LastOut

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
  $pushRc = ExecT 'git push' 'git' @('push') 120
  if ($pushRc -ne 0) {                                    # remote advanced (CI pushed) — rebase and retry once
    Log 'push rejected/timed out — rebasing and retrying'
    ExecT 'git pull --rebase' 'git' @('pull','--rebase') 60 | Out-Null
    $pushRc = ExecT 'git push (retry)' 'git' @('push') 120
  }
  if ($pushRc -eq 0) { Log 'DONE: pushed new clips'; return 0 }
  Log 'ERROR: push failed/timed out (will retry next run)'; return 1
}

# Task Scheduler starts with a minimal PATH — pull in the machine/user PATH so node + git resolve.
$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')
Set-Location $repo
# Make git itself abort a stalled HTTPS transfer (< 1 KB/s for 25s) instead of hanging on a half-open
# connection — complements the ExecT wrapper's hard timeout. Local config writes; harmless if repeated.
git config http.lowSpeedLimit 1000 2>$null
git config http.lowSpeedTime 25 2>$null

Log '==== run start ===='
$code = 1
try { $code = Main }
catch {
  Log "FATAL: $($_.Exception.Message)"
  if ($_.ScriptStackTrace) { Log ('  at ' + (($_.ScriptStackTrace -split "`r?`n")[0])) }
}
finally { Log '==== run end ====' }
exit $code
