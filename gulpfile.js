var gulp=require("gulp"); //本地gulp
var less = require('gulp-less'); // 引入less
var path = require('path');
var autoprefixer = require('gulp-autoprefixer'); //css添加前缀
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var fileinclude = require('gulp-file-include');
// require 加载 browser-sync 模块
var browserSync = require("browser-sync").create();
//本地数据跨域处理，服务器不涉及
var proxy = require('http-proxy-middleware');
var plumber = require('gulp-plumber');//阻止gulp插件发生错误导致进程中断
var minify = require('gulp-minify'); //文件压缩
var gulpCopy = require('gulp-copy');
//定义服务器任务添加监控
gulp.task('server',function(){
	//端口代理跨域用
	var middleware = proxy(
		['/api'], 
		{
			target: "localhost:8080", 
			changeOrigin: true, 
			pathRewrite: {
            	'^/api' : '',
        	}
    	}
    );
    browserSync.init({
        server: {
         baseDir:["./src"],
         index:"index.html",
         middleware: middleware           
        },
        files: ["src/css/**/*.less", "src/js/**/*.js","src/**/*.html"],//添加监控文件
        port:8082,
       
    });
    gulp.watch("src/css/*.less",["less"]);
   
})

//执行编译
gulp.task('build',['less','js','html','copy'])
//编译less
gulp.task('less', function () {
return gulp.src('src/css/**/*.less')
	.pipe(plumber())
    //编译less
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))  
    .pipe(autoprefixer({
      browsers: ['last 20 versions','last 3 Explorer versions','Firefox >= 20'],
      cascade: true,
      remove:true
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('style.min.css'))   // 重命名css
    .pipe(gulp.dest('dist/css'));
});
//压缩js
gulp.task('js',function(){
	return gulp.src('src/js/**/*.js')
	  .pipe(plumber())
	  .pipe(minify())
	  .pipe(rename('style.min.js'))
	  .pipe(gulp.dest('dist/js'))
	  .pipe(browserSync.stream())
});
//编译html
gulp.task('html', function() {
  return gulp.src('src/**/*.html')
 	.pipe(plumber())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
});
//复制文件夹
gulp.task('copy',  function() {
     gulp.src('src/images/*')     
	 .pipe(gulp.dest('dist/images'))
});