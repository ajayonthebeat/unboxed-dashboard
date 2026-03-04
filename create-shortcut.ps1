$exePath = "$PSScriptRoot\release\win-unpacked\Unboxed TCG Dashboard.exe"
$shortcutPath = "$env:USERPROFILE\Desktop\Unboxed TCG Dashboard.lnk"

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $exePath
$shortcut.WorkingDirectory = "$PSScriptRoot\release\win-unpacked"
$shortcut.Description = "Unboxed TCG Dashboard"
$shortcut.Save()

Write-Host "Shortcut created on Desktop!"
