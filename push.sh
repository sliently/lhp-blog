#!/bin/bash
echo "开始上传"
rm -rf docs/*
cp -r _book/ docs
echo "请输入commit信息"
read msg
git add -A
git commit -m $msg
git fetch
git rebase origin/master
git push origin master:master