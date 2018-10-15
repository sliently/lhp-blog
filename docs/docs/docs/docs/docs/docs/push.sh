<<<<<<< HEAD
#!/bin/bash
echo "开始上传"
rm -rf docs/*
cp -r _book/ docs
read -p "请输入commit信息:" msg
git add -A
git commit -m $msg
git fetch
git rebase origin/master
=======
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
>>>>>>> 整理
git push origin master:master