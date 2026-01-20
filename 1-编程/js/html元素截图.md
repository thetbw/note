思路

> 使用 [html2canvas]([GitHub - niklasvh/html2canvas: Screenshots with JavaScript](https://github.com/niklasvh/html2canvas)) 可以创建一个和当前元素差不多的 canvas,然后保存该canvas即可

code：

```javascript
function downloadImage() {
    html2canvas(ele).then(function (canvas) {
        let link = document.createElement('a');
        link.download = 'image.png';
        link.href = canvas.toDataURL("image/png")
        link.click();
    });
}
```
