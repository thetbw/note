## mybatis判断参数是否存在

关于常规的方法传入的参数判断有很多方法
> https://www.cnblogs.com/peijyStudy/p/13930660.html

大概如下
```xml
<if test="_parameter.containsKey('uEndTime')">
  <![CDATA[
    and update_time < #{uEndTime}
  ]]>
</if>
```
可以把参数转为map等

还有一种情况，使用  `<sql/>` 标签的时候，通过 `<include/>` 导入对应的sql ，这时候可以通过 `<property/>` 来传递的参数
```xml
<include refid="doStatistics">
  <property name="field" value="amount"/>
</include>
```
如果要在引入的sql里面判断有没有`field`这个字段，可以这样
```xml
<if test='"${field}" != "\${field}"'>
  select ${field} from xxx
</if>
```
由于 `${field}`在参数不存在的时候会保持不变，所有当 `field` 不存在的时候，就变成了
```xml
<if test='"${field}" != "${field}"'>
```
结果当然是 `false` ，如果存在，例如值为 `amount` ，就是
```
<if test='"amount" != "${field}"'>
```
结果为 `true`

> 参考 https://stackoverflow.com/questions/61933458/checking-property-existence-of-include-fragment-in-mybatis
