# BK Corp Club — isolated local worker bootstrap
# Installs the audited, pinned Sellbird and OpenJarvis forks.
# Safe defaults: no mailbox credentials, no model API keys, no autonomous sending,
# no community skills, and no worker is registered as production-enabled.
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Root = Join-Path $env:LOCALAPPDATA "BKCorpClub\workers"
$SellbirdRepo = "https://github.com/brevisketley/sellbird.git"
$OpenJarvisRepo = "https://github.com/brevisketley/OpenJarvis.git"
$SellbirdCommit = "af52e8dae9dd80f837ffaa37e9e74c61ac74f1e8"
$OpenJarvisCommit = "1b78e51b0643d6744c47ac14d763ffeb6ef4a4fc"

function Require-Command([string]$Name, [string]$InstallHint) {
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "$Name is required. $InstallHint"
  }
}
function Install-PinnedRepo([string]$Name, [string]$Url, [string]$Commit) {
  $Path = Join-Path $Root $Name
  if (Test-Path $Path) {
    if (-not (Test-Path (Join-Path $Path ".git"))) {
      throw "$Path exists but is not a Git checkout. Move it aside before retrying."
    }
    git -C $Path fetch --tags origin
    if ($LASTEXITCODE -ne 0) { throw "Git fetch failed for $Name" }
  } else {
    git clone $Url $Path
    if ($LASTEXITCODE -ne 0) { throw "Git clone failed for $Name" }
  }
  git -C $Path checkout --detach $Commit
  if ($LASTEXITCODE -ne 0) { throw "Could not check out audited pin for $Name" }
  $Actual = (git -C $Path rev-parse HEAD).Trim()
  if ($Actual -ne $Commit) { throw "$Name revision mismatch: $Actual" }
  return $Path
}

Require-Command "git" "Install Git for Windows from https://git-scm.com/download/win."
Require-Command "py" "Install Python 3.12 or 3.13 from https://www.python.org/downloads/windows/."
Require-Command "uv" "Install uv from https://docs.astral.sh/uv/getting-started/installation/."
New-Item -ItemType Directory -Force -Path $Root | Out-Null

$SellbirdPath = Install-PinnedRepo "sellbird" $SellbirdRepo $SellbirdCommit
$JarvisPath = Install-PinnedRepo "OpenJarvis" $OpenJarvisRepo $OpenJarvisCommit

# Sellbird gets its own Python 3.12 environment. Do not copy .env.example into
# a live .env: outbound mail and model-provider credentials are not configured.
py -3.12 -m venv (Join-Path $SellbirdPath ".venv")
if ($LASTEXITCODE -ne 0) { throw "Could not create Sellbird virtual environment" }
& (Join-Path $SellbirdPath ".venv\Scripts\python.exe") -m pip install --upgrade pip
if ($LASTEXITCODE -ne 0) { throw "Could not update pip for Sellbird" }
& (Join-Path $SellbirdPath ".venv\Scripts\python.exe") -m pip install -e $SellbirdPath
if ($LASTEXITCODE -ne 0) { throw "Sellbird dependency installation failed" }
& (Join-Path $SellbirdPath ".venv\Scripts\sellbird.exe") --help | Out-Host
if ($LASTEXITCODE -ne 0) { throw "Sellbird CLI smoke test failed" }

# OpenJarvis remains a separate project and environment. Core dependencies only;
# optional GPU/model, channel, desktop, and community-skill extras are not enabled.
uv sync --project $JarvisPath --no-dev
if ($LASTEXITCODE -ne 0) { throw "OpenJarvis dependency installation failed" }
uv run --project $JarvisPath jarvis --help | Out-Host
if ($LASTEXITCODE -ne 0) { throw "OpenJarvis CLI smoke test failed" }

@"
BK Corp Club worker bootstrap complete.

Sellbird: $SellbirdCommit
OpenJarvis: $OpenJarvisCommit

Both projects are installed in separate environments under:
$Root

No credentials were added. Sellbird outbound sending remains unconfigured.
OpenJarvis tools, community skills and scheduled autonomy remain disabled.
Review docs/WORKER-RUNTIME-SETUP.md before enabling any capability.
"@ | Set-Content -Encoding UTF8 (Join-Path $Root "INSTALL-RESULT.txt")

Write-Host "Bootstrap complete. Both pinned CLIs passed their help smoke tests."
