## git学习

* 书，`GIT PRO` [https://git-scm.com/book/zh/v2](https://git-scm.com/book/zh/v2)

> 补充，git设置代理 https://ericclose.github.io/git-proxy-config.html

## git常用命令

1. `git init`:
   初始化仓库(创建一个空仓库) 

2. `git status`:
   显示当前仓库状态

3. `git add '文件名'` :
   添加文件到暂存区

4. `git commit -m ‘提交信息’`:
   提交暂存区的文件

5. `git diff <文件名>`:
   
   > 1. `git diff HEAD -- 'filename'`:比较工作区和版本库的
   > 2. 文件改动信息(相对上一次提交)

6. `git log`:
   查看提交历史信息 
   
   > `HEAD`指当前版本，上一个版本时`HEAD^ `，`HEAD^^`同理

7. `git reset` :
   
   > 1. `--hard HEAD^`:恢复到上个版本 
   > 2. `HEAD 'file'`: 把暂存区的文件恢复到工作区

8. `git reset --hard 'hash'`:
   恢复到指定版本

9. `git reflog`:
   记录git仓库的每一个命令

10. `git checkout`:

> 1. `-- 'filename'`:撤销修改 回到上一次提交或添加时的状态

11. `git rm '文件名'`:
    删除文件

## 分支

1. 查看分支: `git branch`
2. 创建分支: `git branch 'name'`
3. 切换分支: `git checkout '分支名称' `or` git switch '分支名称'`
4. 创建&切换分支: `git checkout -b '分支名称'` or `git switch -c '分支名称'`
5. 合并某分支到当前分支: `git merge 'name'`
6. 删除分支: `gir branch -d 'name'`
7. --no-ff:普通合并模式
8. 从指定tag创建一个新分支 `git checkout tags/{tag} -b {分支名称}`

打标签

https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE

### 

### 其他

* gitattributes 
  
  > 可以指定git换行符 https://git-scm.com/docs/gitattributes
