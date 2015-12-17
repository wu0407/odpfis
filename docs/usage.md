#部署代码（测试or上线）

##编译
cd common && fis3 release -d ../output

##本地测试
```bash
fis3 server start -p 8888 --type smarty --rewrite
# fis3 release -wL #监控文件变化方式发布，当前进程不退出
fis3 release -r common
cd first
fis3 release
cd ..
fis3 server open
```

##上传
fis3 release rd
上传名为rd的机器
开发机名称配置见config

##开发机调试可以使用以下两种方法部署
1. fis3 release -d 直接发布到对应的目录。适用于fe代码和web环境在同一机器
1. fis3 release rd 配置上传开发机地址，使用http请求上传代码。适用于前后端分离开发
*建议开发机使用第二种，线上机使用第一种方法，线上机不应允许配置上传接口*

