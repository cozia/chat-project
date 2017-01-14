var gulp=require('gulp');
var autoprefixer=require('gulp-autoprefixer');
var cssmin = require('gulp-minify-css');
var cssver = require('gulp-make-css-url-version');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//自动补全css3前缀，给css文件加MD5版本号，压缩css文件并输出到dist目录下的css目录
gulp.task('autoprefixer', function () {
    gulp.src('styles/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/css'));
});


//压缩image并输出到dist目录下的img下
gulp.task('imagemin', function () {
    gulp.src('images/**/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});


//合并相应的js文件，并输出到dist
gulp.task('jsconcat', function () {
    gulp.src('scripts/*.js')
        .pipe(concat('all.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js'));
});


//压缩html文件
gulp.task('htmlmin', function () {
    gulp.src('views/**/*.html')
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        }))
        .pipe(gulp.dest('dist/html'));
});


//监控相应文件，自动刷新浏览器
gulp.task('serve',function(){
    browserSync.init({
        server:'./'
    });
    gulp.watch('views/*.html').on('change',reload)
});

// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    //监听任何文件变化，实时刷新页面
//    gulp.watch("dist/*.*").on('change',reload);
});
// 代理
//gulp.task('browser-sync', function() {
//    browserSync.init({
//        proxy: "你的域名或IP"
//    });
//});





