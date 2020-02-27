// 利用面向对象得开发形式  在原型链上进行编程
function Index(dom, use24Hours) {
    // 将传进来的dom参数转换成数组  接下来的操作可以调用数组的方法
    this.column = Array.from(dom);
    // 将距离当前时间的时间的class类名存放在数组中 
    this.classList = ['visible', 'close', 'far', 'far', 'distant', 'distant'];
    // use24Hours  是否采取24小时制
    this.use24Hours = use24Hours;
    // 调用开始函数
    this.start();
}
//开始--》获取到当前时间
// --》当前时间 14 17 35 -->字符串141735
//-->六个数与六个类名为column的div分别对应上
//-->分别找到每一列为当前时间的数字垂直局中显示 --根据数字大小调节在Y轴上移动的距离
//-->同一列中不同数字位置不同 透明度不同（根据为每一个数字见不同的类名实现）

Index.prototype.start = function () {
    // this对象指向Index   将self赋值为this对象
    var self = this;
    // 设置定时器  每隔200ms获取到当前时间  获得系统时间
    setInterval(function(){
    // getClock函数获得当前时间转化为拼接字符串
    var c = self.getClock();
    //  遍历每一列  取到当前列数和索引值
    self.column.forEach(function (ele, index) {
        var n = + c[index];
        var offset = n * 86;
        // 每一列根据当前时间在y轴上平移一段距离 显示出当前时间
        $(ele).css({
            'transform': 'translateY(calc(50vh - ' + offset + 'px - ' + 43 + 'px))'
        })
        // 再遍历当前这一列中的每一位数字, 为每一个数字添加上不同的class类名  显示不同的透明度
        Array.from(ele.children).forEach(function (ele2, i2) {
            var className = self.getClassName(n,i2);
            $(ele2).attr('class', className)
        })
    })
    },200)
}

// 获取到当前时间 并且拼接成字符串
Index.prototype.getClock = function () {
    var d = new Date();
    // 利用数组的reduce方法将时分秒拼成字符串
    return [this.use24Hours ? d.getHours() : d.getHours() % 12 || 12, d.getMinutes(), d.getSeconds()].reduce(function (p, n) {
        // 利用'0'补齐个位数  同时利用字符串slice方法截取掉后两位，即0拼接后为三位 取后两位
        // 0拼接后为两位  也同样取两位  实现了个位数前面添0补齐
        return (p + ('0' + n).slice(-2));
    }, '')
}

// 按照索引值 确定每一列中的每一个数字的class名字
// 配合css确定最后的显示透明度
Index.prototype.getClassName = function (n,i2) {
    // 数组的find方法会返回索引值满足条件当前对应的值
    var className = this.classList.find(function(className,classIndex){
        return i2 - classIndex === n || i2 + classIndex === n;
    })
    return className || '';
}

// 调用
new Index($('.column'), true)

