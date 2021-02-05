### 正向代理

```
HostB$ ssh -L 0.0.0.0:PortB:HostC:PortC user@HostC
```

### 反向代理

```
HostA$ ssh -R HostC:PortC:HostB:PortB  user@HostC
```





### scoks5代理

```
ssh -D localhost:1080  HostB
```

