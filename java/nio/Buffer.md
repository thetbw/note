## Buffer 的使用

>   以ByteBuffer为例



```java
ByteBuffer buffer = ByteBuffer.allocateDirect(1024);
//TODO 写入数据
buffer.flip(); //反转指针
if(buffer.hasRemaining()){
    //TODO 读取数据
}
buffer.clear()
  
```





### 常用方法说明

*   `flip`  反转指针，清除mark标记 。（读或写模式切换）
*   `clear` positon设置为0
*   `compact`  压缩数据 (清除已读数据或已写数据)
*   `rewind` position设置为 0 ，重新读写数据
*   `mark` 标记当前位置