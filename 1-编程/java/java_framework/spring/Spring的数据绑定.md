### SpringMvc的数据绑定

* `WebDataBinder` 

  webDataBinder用于处理SpringMvc中请求的form与java bean之间的数据绑定。

  例如：

  ```java
  // Date 类型转换
  binder.registerCustomEditor(Date.class, new PropertyEditorSupport() {
      @Override
      public void setAsText(String text) {
          if (text != null && !text.isEmpty()) {
              setValue(DateUtils.parseDate(text));
          }
      }
  });
  ```

  webDateBinder会按照注解的Editor来进行类型的转换。

  那么怎么创建一个webDateBinder呢，需要使用下面的InitBinder

* `@InitBinder` 

  [Spring官方文档](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-ann-initbinder)

  @InitBinder用于 @Controller 或者 @ControllerAdvice的方法中,用于初始化 webDataBinder，在controller中创建的webDateBinder只适用于当前controller,你可以使用ControllerAdvice来创建一个全局的 webDateBinder

  示例

  ```java
  @InitBinder
  public void initBinder(WebDataBinder binder) {
          //init binder
  }
  ```

  initBinder的入参可以获取到webDataBinder,当然你可以传入当权的HttpRequest,返回值必须是void

  每次的请求都会调用当前initBinder方法，你可以根据当前请求参数或上下文，设置特定的binder

  你可以一个controller中创建多个initBinder方法。



* 我的使用场景
  * 日期类型转换，如第一条示例
  * 请求的字符串参数自动trim

