### 在移动端，双指缩放元素

> 参考 [移动端双指缩放图片JS事件的实践心得 - 笑人 - 博客园](https://www.cnblogs.com/xiaonian8/p/13656951.html)

> 上文介绍的是图片缩放，这里使用 css 属性 `zoom` 对元素缩放，`translate`的缩放会有问题，不会释放元素原先的空间，会造成显示滚动条



> 只用于移动端，pc端应该更简单，只需监听鼠标滚轮即可

code:

```javascript
//处理移动端的缩放

    let store = {
        scale: 1
    };
    // 缩放事件的处理
    //ele为要缩放的元素
    ele.addEventListener('touchstart', function (event) {
        let touches = event.touches;
        let events = touches[0];
        let events2 = touches[1];


        // 第一个触摸点的坐标
        store.pageX = events.pageX;
        store.pageY = events.pageY;

        store.moveable = true;

        if (events2) {
            event.preventDefault();
            store.pageX2 = events2.pageX;
            store.pageY2 = events2.pageY;
        }

        store.originScale = store.scale || 1;
    });
    document.addEventListener('touchmove', function (event) {
        if (!store.moveable) {
            return;
        }

        event.preventDefault();

        let touches = event.touches;
        let events = touches[0];
        let events2 = touches[1];
        // 双指移动
        if (events2) {
            // 第2个指头坐标在touchmove时候获取
            if (!store.pageX2) {
                store.pageX2 = events2.pageX;
            }
            if (!store.pageY2) {
                store.pageY2 = events2.pageY;
            }

            // 获取坐标之间的举例
            let getDistance = function (start, stop) {
                return Math.hypot(stop.x - start.x, stop.y - start.y);
            };
            // 双指缩放比例计算
            let zoom = getDistance({
                    x: events.pageX,
                    y: events.pageY
                }, {
                    x: events2.pageX,
                    y: events2.pageY
                }) /
                getDistance({
                    x: store.pageX,
                    y: store.pageY
                }, {
                    x: store.pageX2,
                    y: store.pageY2
                });
            // 应用在元素上的缩放比例
            let newScale = store.originScale * zoom;
            // 最大缩放比例限制
            if (newScale > 3) {
                newScale = 3;
            }
            // 记住使用的缩放值
            store.scale = newScale;

            //应用缩放
            //$()为jquery语法
            $(ele).css("zoom", newScale)
        }
    });

    document.addEventListener('touchend', function () {
        store.moveable = false;

        delete store.pageX2;
        delete store.pageY2;
    });
    document.addEventListener('touchcancel', function () {
        store.moveable = false;

        delete store.pageX2;
        delete store.pageY2;
    });
```
