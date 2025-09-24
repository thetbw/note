### 客户端挂载 SMB 无法创建软链接

在对应共享添加如下配置 
```
wide links = yes
unix extensions = no
follow symlinks = yes
```

在客户端挂载时添加 `mfsymlinks`
如下所示
```shell
sudo mount -t cifs //ip.add.re.ss/share_name /path/to/mount -o username=hostusername,vers=3.0,uid=clientusername,gid=clientgroupname,soft,rsize=8192,wsize=8192,mfsymlinks
```

> 参考链接 https://superuser.com/questions/1337257/clients-cant-create-symlinks-on-samba-share

