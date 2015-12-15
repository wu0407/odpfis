# ODP安装说明


1.选择版本后，安装只须下载解压相应安装包，并执行bin/odp_install即可：
    mkdir /data/odp
    cd /data/odp
    rz odp-3.0.0-develop-nginx.tar.gz

    tar xzf odp-3.0.0-develop-nginx.tar.gz
    bin/odp_install

    出现类似如下输出，说明安装成功了：
    On first use, install package: hhvm Nginx odp PHP
    On first use, install binary: nginx php php-cgi


    如果是自己PC上装的系统，还需要删除ral的bns配置：
    rm conf/ral/services/ak.conf



2.查看安装信息：
    bin/ocm list    #查看安装的ODP组件列表
    php/bin/php -m  #查看php扩展的加载情况
    echo 'p get_loaded_extensions()' | hhvm/bin/hhvm -m debug  #查看hhvm的扩展加载情况




3.启动服务
    ODP weberver端口默认为8080，如果端口已被占用，则需要修改相应配置文件中的端口：
    Nginx: webserver/conf/vhost/php.conf
    Lighttpd: webserver/conf/lighttpd.conf

    启动php或hhvm：
    php/sbin/php-fpm start
    hhvm/bin/hhvm_control start

    启动nginx或lighttpd：
    webserver/loadnginx.sh start
    webserver/bin/lighttpd.sh start


    从php切换到hhvm
    如果使用hhvm，则需要切换webserver的配置到hhvm。Nginx配置切换需要修改webserver/conf/vhost/php.conf：
        #set $php_upstream 'unix:${ODP_ROOT}/var/php-cgi.sock';   #注释掉这行
        set $php_upstream 'unix:${ODP_ROOT}/var/hhvm.sock';           #这行去掉注释

    Lighttpd配置切换需要修改webserver/conf/lighttpd.conf：
      #proxy-core.backends = ( "unix:${ODP_ROOT}/var/php-cgi.sock" )  #注释掉这行
      proxy-core.backends = ( "unix:${ODP_ROOT}/var/hhvm.sock" )          #这行去掉注释





