# set-schedule.ps1 — one-time: set the backstop to run every 4 hours (8am-8pm CT) instead of once a day.
# Registering a Scheduled Task can't be done by Claude (security block), so run this yourself once:
#   powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\timot\Claude\Projects\timothy-christensen-portfolio\scripts\set-schedule.ps1"
# It overwrites the existing task in place. Safe to re-run.

$name = "O'Colly clip sync (local backstop)"
$repo = 'C:\Users\timot\Claude\Projects\timothy-christensen-portfolio'

$action    = New-ScheduledTaskAction -Execute 'powershell.exe' `
             -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$repo\scripts\local-sync.ps1`""
$trigger   = New-ScheduledTaskTrigger -Daily -At 8:00AM
# add a 4-hour repetition across the day: fires 8am, 12pm, 4pm, 8pm
$trigger.Repetition = (New-ScheduledTaskTrigger -Once -At 8:00AM `
                       -RepetitionInterval (New-TimeSpan -Hours 4) `
                       -RepetitionDuration (New-TimeSpan -Hours 12)).Repetition
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive -RunLevel Limited
$settings  = New-ScheduledTaskSettingsSet -StartWhenAvailable -WakeToRun -AllowStartIfOnBatteries `
             -DontStopIfGoingOnBatteries -ExecutionTimeLimit (New-TimeSpan -Minutes 15)

Register-ScheduledTask -TaskName $name -Action $action -Trigger $trigger `
  -Principal $principal -Settings $settings `
  -Description "O'Colly clip sync backstop, every 4h 8am-8pm CT." -Force | Out-Null

Write-Host ""
Write-Host "Done. The backstop now runs every 4 hours (8am / 12pm / 4pm / 8pm CT)." -ForegroundColor Green
Write-Host "Repetition:" -ForegroundColor Cyan
Get-ScheduledTask -TaskName $name | ForEach-Object { $_.Triggers.Repetition } | Select-Object Interval, Duration
Get-ScheduledTask -TaskName $name | Get-ScheduledTaskInfo | Select-Object NextRunTime
