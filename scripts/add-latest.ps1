# add-latest.ps1 — on-demand publish. Run this (or double-click Add-Latest-Clips.bat) whenever you
# publish a story and want it on the site right away, instead of waiting for the scheduled backstop.
# It reuses the exact same tested logic as the backstop (local-sync.ps1): pull, discover + archive any
# new O'Colly clips, commit, and push — then prints a plain-English result.
$repo = 'C:\Users\timot\Claude\Projects\timothy-christensen-portfolio'
$log  = Join-Path $repo 'scripts\local-sync.log'

Write-Host ''
Write-Host 'Checking O''Colly for new clips and publishing...' -ForegroundColor Cyan
& powershell.exe -NoProfile -ExecutionPolicy Bypass -File "$repo\scripts\local-sync.ps1"

Write-Host ''
Write-Host '==== result ====' -ForegroundColor Cyan
# Show only THIS run: slice the log from its last "run start" marker, then the summary lines.
$all = Get-Content $log
$startLine = ($all | Select-String -Pattern '==== run start ====' | Select-Object -Last 1).LineNumber
$thisRun = if ($startLine) { $all[($startLine - 1)..($all.Count - 1)] } else { $all | Select-Object -Last 15 }
foreach ($line in ($thisRun | Where-Object { $_ -match 'NEW:|DONE:|ABORT|FATAL|Done\. \+\d' })) {
  if     ($line -match 'NEW:|pushed')       { Write-Host $line -ForegroundColor Green }
  elseif ($line -match 'ABORT|FATAL')       { Write-Host $line -ForegroundColor Red }
  else                                      { Write-Host $line }
}
Write-Host ''
Write-Host 'Anything published above is live in ~1-2 minutes. Full log: scripts\local-sync.log' -ForegroundColor DarkGray
