#!/bin/bash
echo "开始上传"
mv docs/CNAME _book
rm -rf docs/*
cp -r _book/* docs
read -p "请输入commit信息:" msg
git add -A
git commit -m $msg
git fetch
git rebase origin/master
git push origin master:master