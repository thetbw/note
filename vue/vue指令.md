### Vue指令

`v-text`:更新元素内容

`v-html`:按照html方式更新组件内容，不过不会触发vue的渲染; `scope`的css不会出现在                 动态的html中

`v-show`:根据Boolean值来切换元素的display

`v-if`:条件渲染

`v-else-if`:同上的条件渲染

`v-else`:紧接上边

`v-for`:循环渲染 `优先级比v-else高`

`v-on`:事件绑定 简写`@`

`v-bind`:属性绑定

> `.sync`:会更新父组件绑定的值

`v-model`:在表单控件或者组建上创建双向绑定

`v-solt`:<span style="color:red">用于插槽</span>

`v-cloak`:可以在实例未编译结束时一直存在

`v-once`:只渲染一次

### 特殊指令

`key`:用于vue的虚拟dom，例如`v-for`

`ref`:<span style="color:red">引用信息</span>

`is`:<span style="color:red">用于动态组建，当一个组建改变时，另一个组建也一个改变</span>

`solt`:废弃，参考 `v-solt`

`solt-scope`:废弃，参考 `v-solt`
