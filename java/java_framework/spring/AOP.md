## 几种切片形式和用法

* before:在切入点之前执行，他不能阻止切入点执行(除非抛出异常)

* after-returning:在切入方法正常执行返回结果后执行 执行失败(比如抛异常)则不会执行

* after-throwing: 切入点抛异常后执行

* after:不论切入点怎么退出，都执行这个方法

* around:你可以自己控制方法的执行，可以实现上述所有效果，不过推荐不是必要的话使用具体的方式以减少潜在的错误

> declare-parents: 给目标类添加新的接口实现(动态添加功能)

## 使用切片

### @advice：

### 开启AspectJ

* 注解形式：@EnableAspectJAutoProxy
* 配置形式：\<aop:aspectj-autoproxy/\>

### 使用 AspectJ

* 使用 `@Aspect` 来声明一个切片
  
  > 注： @Aspect 不能够在类中被单独检测，需要同时把当前类注册为bean

> 注：声明了@Aspect的将从代理类目标中排除，不能够被其他切入点切入

* 使用@Pointcut 声明切入点<br/>
  支持的表达式：
  
  * execution：匹配切入点
  
  * within：将匹配限制为某些类型
  
  * this：匹配对象代理
  
  * target：匹配目标类型，
  
  * args：匹配切入点的参数类型，`注入对象？？？？`
  
  * bean:匹配指定bean(可以使用通配符)(spring特性，AspectJ不支持)
    
    单独的注解
  
  * @target:同target
  
  * @args：同args
  
  * @within：同within
  
  * @annotation: 匹配特定的注解

> 可以使用 `&&` 或 `||` 来组合切入点表达式

* execution常用表达式：
  * `execution(public * *(..))` :公共方法
  * `execution(* set*(..))` : set开头的方法
  * `execution(* com.xyz.service.AccountService.*(..))` :AccountService接口下的所有方法
  * `execution(* com.xyz.service.*.*(..))` :service包下的所有方法
  * `execution(* com.xyz.service..*.*(..))`:service包以及子包下的所有方法
