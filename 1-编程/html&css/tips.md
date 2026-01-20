#### 为输入框增加提示

使用 `datalist` 可以为输入框增加输入提示

```html
<div>
    <input list="data" name="test">
    <datalist id="data">
        <option value='1'>test1</option>
        <option value='2'>test1</option>
        <option value='3'>test1</option>
        <option value='4'>test1</option>
    </datalist>
</div>
```

<div>
    <input list="data" name="test" placeholder="示例">
    <datalist id="data">
        <option value='1'>test1</option>
        <option value='2'>test1</option>
        <option value='3'>test1</option>
        <option value='4'>test1</option>
    </datalist>
</div>

