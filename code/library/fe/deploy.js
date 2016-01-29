

fis.media('dev').match('*.{js,css,png}', {
    optimizer:null
});

//开启组件同名依赖
fis.match('/widget/**', {
    useSameNameRequire: true
});

fis.match('*.{tpl,js,php}', {
    useSameNameRequire: true
});

var MACHINE_CONFIG = {
	jiangfuquan: {
		machine: 'http://cp01-rdqa-dev337.cp01.baidu.com:8899/',
		path: '/home/users/jiangfuquan/odp3/'
		//path: '/home/users/jiangfuquan/testrelease'
	}
};

var namespace = fis.get('namespace');

var deployTemplate = function (target) {
    return {
        receiver: MACHINE_CONFIG[target].machine + 'receiver.php',
        to: MACHINE_CONFIG[target].path
    };
}
var matchRules = {
    '*': {
        release: '/webroot/static/${namespace}/$0'
    },
    '/(**.tpl)': {
        release: '/template/${namespace}/$1'
    },
    '/{smarty.conf,domain.conf,**.php}': {
        release: '/php/phplib/ext/smarty/baiduplugins/$0'
    },
    '/plugin/(**)': {
        release: '/php/phplib/ext/smarty/baiduplugins/$1'
    },
    'server.conf': {
        release: '/tmp/${namespace}.conf'
    },
    '/static/(**)': {
        release: '/webroot/static/${namespace}/$1'
    },
    '/(test)/(**)': {
        release: '/tmp/$1/${namespace}/$2'
    },
    '/(config)/(**)': {
        release: '/data/smarty/$1/${namespace}/$2'
    },
    '${namespace}-map.json': { 
        release: '/data/smarty/config/$0' 
    }, 
    '*.sh': { 
        release: '/deletefiles/$0' 
    }
}; 

for (var target in MACHINE_CONFIG) {
    for (var rule in matchRules){
        fis.media(target).match(rule, {
            deploy: fis.plugin('http-push', deployTemplate(target)),
            release: matchRules[rule].release
        });
    }
}
