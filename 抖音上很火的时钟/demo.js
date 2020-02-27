var monthText = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
var dayText = ["一号", "二号", "三号", "四号", "五号", "六号", "七号", "八号", "九号", "十号", "十一号", "十二号", "十三号", "十四号", "十五号", "十六号", "十七号", "十八号", "十九号", "二十号", "二十一号", "二十二号", "二十三号", "二十四号", "二十五号", "二十六号", "二十七号", "二十八号", "二十九号", "三十号", "三十一号"];
var weekText = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
var hourText = ["零点", "一点", "两点", "三点", "四点", "五点", "六点", "七点", "八点", "九点", "十点", "十一点", "十二点", "十三点", "十四点", "十五点", "十六点", "十七点", "十八点", "十九点", "二十点", "二十一点", "二十二点", "二十三点"];
var minuteText = ["一分", "二分", "三分", "四分", "五分", "六分", "七分", "八分", "九分", "十分",
    "十一分", "十二分", "十三分", "十四分", "十五分", "十六分", "十七分", "十八分", "十九分", "二十分",
    "二十一分", "二十二分", "二十三分", "二十四分", "二十五分", "二十六分", "二十七分", "二十八分", "二十九分", "三十分",
    "三十一分", "三十二分", "三十三分", "三十四分", "三十五分", "三十六分", "三十七分", "三十八分", "三十九分", "四十分",
    "四十一分", "四十二分", "四十三分", "四十四分", "四十五分", "四十六分", "四十七分", "四十八分", "四十九分", "五十分",
    "五十一分", "五十二分", "五十三分", "五十四分", "五十五分", "五十六分", "五十七分", "五十八分", "五十九分", "六十分"];
var secondsText = ["一秒", "二秒", "三秒", "四秒", "五秒", "六秒", "七秒", "八秒", "九秒", "十秒",
    "十一秒", "十二秒", "十三秒", "十四秒", "十五秒", "十六秒", "十七秒", "十八秒", "十九秒", "二十秒",
    "二十一秒", "二十二秒", "二十三秒", "二十四秒", "二十五秒", "二十六秒", "二十七秒", "二十八秒", "二十九秒", "三十秒",
    "三十一秒", "三十二秒", "三十三秒", "三十四秒", "三十五秒", "三十六秒", "三十七秒", "三十八秒", "三十九秒", "四十秒",
    "四十一秒", "四十二秒", "四十三秒", "四十四秒", "四十五秒", "四十六秒", "四十七秒", "四十八秒", "四十九秒", "五十秒",
    "五十一秒", "五十二秒", "五十三秒", "五十四秒", "五十五秒", "五十六秒", "五十七秒", "五十八秒", "五十九秒", "六十秒"];

var clock;
// 存放dom元素的数组   
var monthList = [];
var dayList = [];
var weekList = [];
var hourList = [];
var minuteList = [];
var secondsList = [];

// 当前展示是否为圆形
var isCircle = false;

//二维数组 存放文字内容及页面显示标签 
var textSet = [
    [monthText, monthList],
    [dayText, dayList],
    [weekText, weekList],
    [hourText, hourList],
    [minuteText, minuteList],
    [secondsText, secondsList]
];

window.onload = function () {
    init();
    // 每隔100ms获得 当前时间 更新页面时间显示
    setInterval(function () {
        runTime();
    }, 100);

    // 在变成圆形之前先进性修改定位
    changePosition();
    // 延迟2000ms变成圆形
    setTimeout(function () {
        changeCircle();
    }, 2000);
}
// 初始化函数
function init() {
    clock = document.getElementById('clock');
    // 生成标签 存放文字展示
    for (var i = 0; i < textSet.length; i++) {
        for (var j = 0; j < textSet[i][0].length; j++) {
            var temp = createLabel(textSet[i][0][j]);
            clock.appendChild(temp);
            // 将生成的标签存放在数组list中
            textSet[i][1].push(temp);
        }
    }

}

// 创建标签并将文字填充标签内 接收参数为文字内容  
function createLabel(text) {
    var div = document.createElement('div');
    div.classList.add('label');
    div.innerText = text;
    return div;
}

function runTime() {
    // 利用时间对象获得 当前 时间
    var now = new Date();
    // 获得月 日期 小时 分钟 秒钟
    var month = now.getMonth();
    var day = now.getDate();
    var week = now.getDay();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var seconds = now.getSeconds();

    // 初始化时间颜色 同时将走过时间设置为灰色
    initStyle();

    // 设置当前时间为白色
    // 将当前时间月份存放在数组中
    var nowValue = [month, day - 1, week, hour, minute, seconds];
    for (var i = 0; i < nowValue.length; i++) {
        var num = nowValue[i];
        textSet[i][1][num].style.color = '#fff';
    }

    // 变成圆形
    if (isCircle) {
        // 确定圆心
        var widthMid = document.body.clientWidth / 2;
        var heightMid = document.body.clientHeight / 2;
        // 将每一个dom元素确定到圆的位置
        for (var i = 0; i < textSet.length; i++) {
            for (var j = 0; j < textSet[i][0].length; j++) {
                // 加算出每一个元素的位置  x y 坐标
                // 每一个圆的半径与时分秒的位置有关
                var r = (i + 1) * 35 + 50 * i;
                // 计算每一个平均的角度  再将每一个单位对齐 然后转化成弧度
                var deg = 360 / textSet[i][1].length * (j - nowValue[i]) ;
                // 计算出每一个dom元素的坐标
                var x = r * Math.sin(deg * Math.PI / 180) + widthMid;
                var y = heightMid - r*Math.cos(deg * Math.PI / 180);
                // 设置样式
                var temp =  textSet[i][1][j];
                temp.style.transform = 'rotate(' + (-90 + deg ) + 'deg)';
                temp.style.left = x + 'px';
                temp.style.top = y + 'px';
            }
        }
    }
}

function initStyle() {
    // 将所有标签置为灰色 
    // 利用取出dom元素
    var label = document.getElementsByClassName('label');
    for (var i = 0; i < label.length; i++) {
        label[i].style.color = '#4d4d4d';
    }
    // 利用二维数组存放dom元素的数组
    // for (var i = 0 ; i < textSet.length ; i ++) {
    //     for (var j = 0 ; j < textSet[i][0].length ; j ++) {
    //         textSet[i][1][j].style.color = "#4d4d4d";
    //     }
    // }
}

// 修改position
function changePosition() {
    for (let i = 0; i < textSet.length; i++) {
        for (let j = 0; j < textSet[i][1].length; j++) {
            // 先获得原来的位置  再修改position 设置left top 
            let tempX = textSet[i][1][j].offsetLeft + "px";
            let tempY = textSet[i][1][j].offsetTop + "px";
            // console.log(textSet[i][1][j]);
            // 利用let 防止闭包
            setTimeout(function () {
                textSet[i][1][j].style.position = "absolute";
                textSet[i][1][j].style.left = tempX;
                textSet[i][1][j].style.top = tempY;
            }, 50);
        }
    }
}

function changeCircle() {
    isCircle = true;
    clock.style.transform = "rotate(90deg)";


}