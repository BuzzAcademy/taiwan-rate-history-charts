#!/bin/bash
echo $PATH > /tmp/path.txt
PATH=$PATH:/usr/local/bin
export DISPLAY=:0
cd /data/app/taiwan-rate-history-charts/src/crawler;
git pull;
/usr/local/bin/casperjs test main.js;
cd ../..;
git commit -am "Auto commit @"`date +%Y%m%d`
git push;
