>   ssh 配置目录 `/etc/ssh/`



### 秘钥登录

>   修改 sshd_config 
>
>   RSAAuthentication  yes
>
>   PubkeyAuthentication yes



### 禁用密码登录

>   修改 PasswordAuthentication 为 no





### 重启ssh 服务

```shell
service sshd restart
service ssh restart

```

