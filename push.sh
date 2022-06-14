#强制推送
#!/usr/bin/env bash
set -e
git init
git add -A
git commit -m '🎉 feat: init project'
git push -f "https://${access_token}@github.com/chuzhixin/aio-sys.git" master
exec /bin/bash




