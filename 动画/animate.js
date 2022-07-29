// var obj={};
// obj.name='abc';
//给不同的元素指定了不同的定时器，浪费内存空间
//callback回调函数，当函数内所有的元素效果执行完毕后执行
function animate(obj, target, callback) {
    //不断点击按钮，元素的速度会越来越快，因为开启了太多的定时器，
    //只有一个定时器执行可以避免以上问题
    //清除原先的定时器，只保留一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        //缓动动画效果
        //步长值写到定时器里面
        //因为有步长的原因，往回走是为负数，所以可以实现来回移动
        //步长改为整数，不要出现小数
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if (callback)
                callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 30);
}