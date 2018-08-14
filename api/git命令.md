> 切换分支


```
git checkout 分支名
```

> 创建分支


```
<!--拉取远程 branch 分支到本地分支，并且创建在本地创建一个分支-->
git checkout -b 《branch》 origin/《branch》
```

> 删除远程分支

```
git branch -r -d origin/branch-name
git push origin :branch-name
```


> 获取远程分支

```
git fetch                 获取所有远程分支（不更新本地分支，另需merge）
git merge origin/master   合并远程master分支至当前分支

git rebase origin/master  合并远程master分支至当前分支

```
> 丢弃工作区的修改

```
git checkout -- file

git checkout .
```

> 提交文件到暂存区

```
git add .
```

> 恢复暂存区的所有文件到工作区

```
git reset file
```

> 提交文件commit

```
git commit -m 'message'
```


> 回退版本

```
git reset --hard 版本号
```

> git提交历史（commit）

```
git log
```

> 工作区是否有变化

```
git status
```

> 和commit一样，不过不提交到版本库，可以提交分支

```
 git stash
 git stash pop
```
> 展示修改

```
git show <file>
```
> 拉取某一个版本的修改

```
 git cherry-pick commit版本号
```

> 合并版本号

```
- git reset --soft 版本号  合并版本号
```

> 提交新的改动，不产生新的版本号 

```
git commit --amend 提交不产生新的版本号
```

> 提交到远程

```
git push origin liu:liu 
```

