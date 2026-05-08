# Debian 12 安装 Caddy + Cloudflare DNS Challenge 自动 HTTPS

> 以下含有AI生成内容

# 一、安装 Caddy

```bash
apt update
apt install -y caddy
```

---

# 二、配置 Caddyfile

编辑：

```bash
nano /etc/caddy/Caddyfile
```

内容：

```caddy
{
    email mail@example
}

domain.example {
  

    reverse_proxy http://127.0.0.1:3000
}
```

以上基本就结束了，如果你是在内网的话，caddy是无法自动给你签发证书的，就需要下面的流程了。


# 三、安装 xcaddy

添加 xcaddy 源：

```bash
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/xcaddy/gpg.key' \
| gpg --dearmor -o /usr/share/keyrings/caddy-xcaddy-archive-keyring.gpg

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/xcaddy/debian.deb.txt' \
> /etc/apt/sources.list.d/caddy-xcaddy.list
```

安装：

```bash
apt update
apt install -y xcaddy
```

---

# 四、安装新版 Go

Debian 12 自带 Go 1.19 太旧。

新版 Caddy 需要 Go 1.22+。

安装官方 Go：

```bash
rm -rf /usr/local/go

curl -L -o /tmp/go.tar.gz \
https://go.dev/dl/go1.25.4.linux-amd64.tar.gz

tar -C /usr/local -xzf /tmp/go.tar.gz
```

临时生效：

```bash
export PATH=/usr/local/go/bin:$PATH
```

验证：

```bash
go version
```

应看到：

```text
go version go1.25.4 linux/amd64
```

永久生效：

```bash
cat > /etc/profile.d/go.sh <<'EOF'
export PATH=/usr/local/go/bin:$PATH
EOF

source /etc/profile.d/go.sh
```

---

# 五、编译 Cloudflare DNS 插件版 Caddy

停止 Caddy：

```bash
systemctl stop caddy
```

编译：

```bash
cd /root

xcaddy build --with github.com/caddy-dns/cloudflare
```

替换系统 Caddy：

```bash
install -m 755 ./caddy /usr/bin/caddy
```

验证插件：

```bash
caddy list-modules | grep cloudflare
```

应看到：

```text
dns.providers.cloudflare
```

---

# 六、创建 Cloudflare API Token

Cloudflare 后台：

- My Profile
- API Tokens
- Create Token

权限：

| 权限 | 范围 |
|---|---|
| Zone - DNS - Edit | 指定 Zone |
| Zone - Zone - Read | 指定 Zone |

Zone：

```text
你的域名
```

---

# 七、重新配置 Caddyfile

编辑：

```bash
nano /etc/caddy/Caddyfile
```

内容：

```caddy
{
    email mail@example
}

domain.example {
    tls {
        dns cloudflare YOUR_CLOUDFLARE_API_TOKEN

        resolvers 1.1.1.1 1.0.0.1 8.8.8.8 8.8.4.4
        propagation_timeout 120s
        propagation_delay 10s
    }

    reverse_proxy http://127.0.0.1:3000
}
```

说明：

| 配置 | 作用 |
|---|---|
| dns cloudflare | Cloudflare DNS Challenge |
| resolvers | 指定 DNS 查询服务器 |
| propagation_timeout | DNS 生效等待时间 |
| propagation_delay | 创建 TXT 后等待时间 |

---

# 八、格式化并验证配置

格式化：

```bash
caddy fmt --overwrite /etc/caddy/Caddyfile
```

验证：

```bash
caddy validate --config /etc/caddy/Caddyfile
```

应看到：

```text
Valid configuration
```

---

# 九、启动 Caddy

```bash
systemctl daemon-reload
systemctl enable --now caddy
systemctl restart caddy
```

查看日志：

```bash
journalctl -u caddy -f
```

成功会看到：

```text
certificate obtained successfully
```

或者：

```text
served key authentication
```
