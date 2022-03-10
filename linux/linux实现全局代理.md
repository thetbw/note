## linux实现全局代理

原文 https://www.shuzhiduo.com/A/kPzOxlGaJx/

首先运行这些命令

```shell
sudo apt-get install iptables git-core libevent libevent-dev
git clone http://github.com/darkk/redsocks.git
cd redsocks/
make
echo 'base{log_debug = on; log_info = on; log = "file:/tmp/reddi.log";
       daemon = on; redirector = iptables;}
       redsocks { local_ip = 127.0.0.1; local_port = 12345; ip = 127.0.0.1;
       port = 1080; type = socks5; }' > redsocks.conf
```



大概流程是先克隆redsocks这个项目，然后编译，添加配置文件。

配置文件中local_ip和local_port表示redsocks这个软件将要监听的地址和端口；后面ip和port表示代理服务器的地址和端口。

然后type还有这几种类型 socks4, socks5, http-connect, http-relay，具体用法可以参考[官网](http://darkk.net.ru/redsocks/)或[github](https://github.com/darkk/redsocks)

**iptables**

接下来配置iptables防火墙相关的。

直接创建一个脚本文件，方便运行，这里以proxy_iptables_start.sh为例：

```shell
#!/bin/bash
# Create new chain
iptables -t nat -N REDSOCKS
# Ignore LANs and some other reserved addresses.
iptables -t nat -A REDSOCKS -d 0.0.0.0/8 -j RETURN
iptables -t nat -A REDSOCKS -d 10.0.0.0/8 -j RETURN
iptables -t nat -A REDSOCKS -d 127.0.0.0/8 -j RETURN
iptables -t nat -A REDSOCKS -d 169.254.0.0/16 -j RETURN
iptables -t nat -A REDSOCKS -d 172.16.0.0/12 -j RETURN
iptables -t nat -A REDSOCKS -d 192.168.0.0/16 -j RETURN
iptables -t nat -A REDSOCKS -d 224.0.0.0/4 -j RETURN
iptables -t nat -A REDSOCKS -d 240.0.0.0/4 -j RETURN
# Anything else should be redirected to port 12345
iptables -t nat -A REDSOCKS -p tcp -j REDIRECT --to-ports 12345 
iptables -t nat -A OUTPUT -p tcp --dport 443 -j REDSOCKS
iptables -t nat -A OUTPUT -p tcp --dport 80 -j REDSOCKS
```



首先就是防火墙nat表中新建一个名为REDSOCKS的chain，然后忽略一些局域网地址的转发， 接着就是设置转发规则了，即转发80和443端口的流量。



**运行**

还是在之前的redoscks目录下，

```shell
 ./redsocks -c redsocks.conf
```

注：若redsocks没有相应执行权限时，先 chmod +x redsocks 给予执行权限。

这样redsocks已经开启在端口12345的监听了。

然后运行前面那个iptables配置的脚本文件

```shell
./proxy_iptables_start.sh
```





**停止**

停止运行的话，也建议创建一个脚本文件proxy_iptables_stop.sh

```shell
iptables -F
iptables -X
iptables -Z
iptables -t nat -F
iptables -t nat -X
iptables -t nat -Z
killall redsocks
```

