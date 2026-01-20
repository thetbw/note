一些可以用于分析jvm的工具
* jconole: 大部分jdk自带
* yourkit java profiler: 收费，界面现代一点，但是不能转换byte显示为mib感觉不太方便
* eclipes memory analyzer（MAT）:推荐，只能分析静态的head dump

---

java的内存抛开什么新生代老年代这种乱七八糟的来说，主要我们想知道我们哪里写的代码占了很多内存，应该怎么优化。

这里把java内存分为shalldow heap 和 retained heap，他们之间的区别是，

shalldow heap：一个对象直接占用内存，基本是对象包含的属性，例如一个int，一个byte,而对象是一个指针，通常是一个int，String在java中也是一个对象，无论多大的String，占用始终是一个int，这个肯定是不太符合场景的。

在jconsole jvisualvm 以及 idea的内存检测中都只能看到这种内存占用，通常占用的最大的就是byte[],因为String以及各种缓存都是String,还有map的key等等，这种通常看不出什么。


所以我们需要知道一个对象占用的内存，也包括对象内的对象，也就是递归整个依赖树，也就是下面说的 retained heap；

retained heap 包含一个对象占用的所有内存，包含引用的对象内存，从gc root开始，以一个树行开始展开

像是mat这种工具就支持显示这种列表，yourkit也是可以。

--- 


话又说回来，所谓heap dump也就只是heap区的内存，jvm还有很多non-heap的内存占用，这种一般也不方便调试，虽然加上参数`-XX:NativeMemoryTracking=summary`也可以打印一些信息。


--- 

参考文档
* https://spring-gcp.saturnism.me/deployment/docker/container-awareness
* https://www.baeldung.com/jvm-code-cache
* https://javadoop.com/post/metaspace

