$ErrorActionPreference = "Stop"

$network = Get-NetIPConfiguration |
    Where-Object {
        $_.IPv4DefaultGateway -and
        $_.IPv4Address -and
        $_.NetAdapter.Status -eq "Up"
    } |
    Sort-Object { $_.NetAdapter.InterfaceMetric } |
    Select-Object -First 1

$address = $network.IPv4Address |
    Where-Object {
        $_.IPAddress -notlike "127.*" -and
        $_.IPAddress -notlike "169.254.*"
    } |
    Select-Object -First 1

if (-not $address) {
    throw "Active Wi-Fi/network IPv4 address nahi mila. Wi-Fi connect karke phir try karein."
}

$port = 5000
$listener = Get-NetTCPConnection -State Listen -LocalPort $port -ErrorAction SilentlyContinue
if ($listener) {
    throw "Port $port pehle se use ho raha hai. Purane server terminal me Ctrl+C dabakar band karein, phir dobara try karein."
}

$env:HOST = "0.0.0.0"
$env:PORT = "$port"

Write-Host ""
Write-Host "Phone ko isi Wi-Fi se connect karke yeh link kholein:" -ForegroundColor Green
Write-Host "http://$($address.IPAddress):$port" -ForegroundColor Cyan
Write-Host "Server band karne ke liye is window me Ctrl+C dabayein." -ForegroundColor Yellow
Write-Host ""

python app.py
if ($LASTEXITCODE -ne 0) {
    throw "Flask server band ho gaya. Upar diya error dekhein."
}
