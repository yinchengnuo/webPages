var obj = {
    // 初始化init函数
    init: function () {
        this.flag = false;
        // 绑定事件函数
        this.bindEvent();
        // 初始音量为0
        // this.change(0);
        // this.change();
    },
    bindEvent: function () {
        // 声明self变量  存放obj对象
        var self = this;
        var moon = $('.moon');
        var dis;
        //鼠标拖拽事件 
        moon.on('mousedown', function (e) {
            self.flag = true;
            // 计算出鼠标落下点与边界的距离
            dis = e.clientX - moon.offset().left
        });
        $('body').on('mousemove', function (e) {
            if (!self.flag) {
                return;
            }
            // 根据拖拽距离设置当前拖拽元素的位置
            moon.css({
                'left': e.clientX - dis - $('.wrapper').offset().left
            })
            // 调用控制音量的函数
            self.getVoice();
        });
        // 鼠标抬起 结束拖拽事件
        $('body').on('mouseup', function () {
            self.flag = false;
        });
    },
    getVoice: function () {
        var self = this;
        var sun = $('.sun');
        var moon = $('.moon');
        var per,
            d = parseInt(moon.css('width')),
            moonL = moon.offset().left,
            moonR = moonL + d,
            sunL = sun.offset().left,
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
    change: function (per) {
        var audio = $('#audio')[0];
        // 根据两个圆得距离计算得百分比确定音频是否播放
        per > 0 ? audio.play() : audio.pause();
        // 根据百分比设置音量
        audio.volume = per;
        // 填充html内容
        $('.per').html("Volume: " + (per * 100).toPrecision(4) + "%");
        // 设置背景颜色值
        $('.moon').css({
            'background': "hsl(194, 56%, " + (1 - per) * 60 + "%)"
        })
        $('body').css({
            'background': "hsl(" + (194 + Math.floor(166 * per)) + ", 66%, " + (1 - per) * 50 + "%)"
        })
    },
}

obj.init();
// 面向对象得形式进行开发  页面调用初始化函数init;