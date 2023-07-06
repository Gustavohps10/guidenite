#chcp 65001; 
Get-Process | Where-Object {$_.MainWindowTitle} | Select-Object Id, Name, MainWindowTitle, Description, Path |  ConvertTo-Json;