

fis.media('dev').match('*.{js,css,png}', {
	optimizer:null
});

var MACHINE_CONFIG = {
		jiangfuquan: {
			machine: 'http://cp01-rdqa-dev337.cp01.baidu.com:8899/',
			path: '/home/users/jiangfuquan/odp3/'
		}
};


var namespace = fis.get('namespace');

var deployTemplate = function (target) {
	return [
	{
		receiver: MACHINE_CONFIG[target].machine + 'receiver.php',
		from: '/template/' + namespace,
		subOnly: true,
		to: MACHINE_CONFIG[target].path + 'template/' + namespace 
	},
	{
	        receiver: MACHINE_CONFIG[target].receiver,
		from: '/static/' + namespace,
		subOnly: true,
		to: MACHINE_CONFIG[target].path + 'webroot/static/' + namespace
	},
	{
	 	receiver: MACHINE_CONFIG[target].receiver,
	 	from: '/plugin',
	 	subOnly: true,
	 	to: MACHINE_CONFIG[target].path + 'php/phplib/ext/smarty/baiduplugins'
	},
	{
		receiver: MACHINE_CONFIG[target].receiver,
	 	from: '/config',
	 	subOnly: true,
	 	to: MACHINE_CONFIG[target].path + 'data/smarty/config'
	} 
	];
}

for (var target in MACHINE_CONFIG) {

fis.media(target).match('*', {
	deploy: fis.plugin('http-push', deployTemplate(target))
});

}
