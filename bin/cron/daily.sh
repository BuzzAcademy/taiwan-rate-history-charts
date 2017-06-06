#!/bin/bash
PATH=$PATH:/usr/local/bin
export DISPLAY=:0
cd /data/app/taiwan-rate-history-charts;
git pull;
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch img/*.png' --prune-empty --tag-name-filter cat -- --all;
mkdir img;
cd src/crawler;
/usr/local/bin/casperjs test main.js;
cd ../..;
git add .
git commit -am "Auto commit @"`date +%Y%m%d`
git push origin --force --all;
