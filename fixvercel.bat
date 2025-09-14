@echo off
setlocal
cd /d D:\stuff\used-car-checklist-wizard

rem --- Force Node 20.19.0 for Vercel ---
> .nvmrc echo 20.19.0
> .node-version echo 20.19.0

rem Update package.json "engines": { "node": "20.19.0" }
node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json','utf8'));p.engines={node:'20.19.0'};fs.writeFileSync('package.json',JSON.stringify(p,null,2));"

rem --- Ensure Tailwind/PostCSS config files (idempotent) ---
if not exist postcss.config.js (
  > postcss.config.js echo export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
)

if not exist tailwind.config.js (
  > tailwind.config.js echo export default {^
content: ["./index.html", "./src/**/*.{ts,tsx}"],^
theme: { extend: {} },^
plugins: [],^
};
)

rem --- Ensure index.css includes tailwind directives ---
if exist src\index.css (
  findstr /C:"@tailwind base;" src\index.css >nul || (
    > src\index.css (
      echo @tailwind base;
      echo @tailwind components;
      echo @tailwind utilities;
    )
  )
) else (
  if not exist src mkdir src
  > src\index.css (
    echo @tailwind base;
    echo @tailwind components;
    echo @tailwind utilities;
  )
)

rem --- vercel.json to pin build commands and pass node version to build env ---
> vercel.json (
  echo {
  echo   "version": 2,
  echo   "installCommand": "npm ci",
  echo   "buildCommand": "npm ci && npm run build",
  echo   "build": { "env": { "NODE_VERSION": "20.19.0" } }
  echo }
)

rem --- Commit and push ---
git add -A
git commit -m "fix: pin Node 20.19.0, add vercel.json, ensure tailwind/postcss configs"
git push -u origin main

rem --- Open Vercel deployments page so you can watch the build ---
start "" "https://vercel.com/dashboard"

pause
endlocal
