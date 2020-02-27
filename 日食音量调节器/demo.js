var obj = {
    init: function () {
        this.moon = document.getElementsByClassName('moon')[0];
        this.sun = document.getElementsByClassName('sun')[0];
        this.bindEvent();

    },
    bindEvent: function () {
        var self = this;
        var moon = self.moon;
        var dis;
        var flag = false;
        var body = document.getElementsByTagName('body')[0];
        //鼠标拖拽事件 
        moon.onmousedown = function (e) {
            flag = true;
            // 计算出鼠标落下点与边界的距离
            dis = e.clientX - moon.offsetLeft;
        };
        body.onmousemove = function (e) {
            if (!flag) {
                return;
            };
            // 根据拖拽距离设置当前拖拽元素的位置
            moon.style.left = (e.clientX - dis) + 'px';
            // 调用控制音量的函数
            self.getVoice();
        }
        // 鼠标抬起 结束拖拽事件
        body.onmouseup = function () {
            flag = false;
        }
    },
    // 根据位置计算百分比  确定声音
    getVoice: function () {
        var self = this;
        var sun = self.sun;
        var moon = self.moon;
        var per,
            d = moon.clientWidth,
            moonL = moon.offsetLeft,
            moonR = moonL + d,
            sunL = sun.offsetLeft,
            sunR = sunL + d;
        // 两个圆相离状态  没有重合的部分
        if (sunL > moonR || moonL > sunR) {
            per = 0;
            // moon在sun的右侧
        } else {
            if (sunL < moonL) {
                // 从右向左运动 sunR - moonL 计算出覆盖的水平距离  moonl 越来越小计算值越来越大
                per = (sunR - moonL) / d;
                // 从左向右运动  越来越大的moonR - 不动的sunL  覆盖水平距离越来越大 最后结果越来越大
            } else if (moonR >= sunL) {
                per = (moonR - sunL) / d;
            }
        }
        self.change(per);
    },
    change: function (vol) {
        var audio = document.getElementsByTagName('audio')[0];
        var per = document.getElementsByClassName('per')[0];
        var moon = this.moon;
        var body = document.getElementsByTagName('body')[0];
        // 根据两个圆得距离计算得百分比确定音频是否播放
        vol > 0 ? audio.play() : audio.pause();
       
        // 根据百分比设置音量
        audio.volume = vol;
        // 填充html内容
        var str = "Volume: " + (vol * 100).toPrecision(4) + "%";
        per.innerHTML = str;
        // 设置背景颜色值
        moon.style.background = "hsl(194, 56%, " + (1 - vol) * 60 + "%)";
        body.style.background = "hsl(" + (194 + Math.floor(166 * vol)) + ", 66%, " + (1 - vol) * 50 + "%)";
    }
}
obj.init();