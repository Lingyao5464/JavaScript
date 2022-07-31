window.addEventListener('load', function() {
    var container = document.querySelector('.container');
    var imgBox = document.querySelector('.img-box');
    var points = document.querySelector('.point');
    //获取container的宽度
    var conW = container.offsetWidth;
    //利用定时器自动轮播图片
    var index = 0;
    var flag = false;
    var timer = setInterval(function() {
        index++;
        var translateX = -index * conW;
        imgBox.style.transition = 'all .3s';
        imgBox.style.transform = 'translateX(' + translateX + 'px)';
    }, 3000);
    //等图片过渡完之后再去判断，监听过渡完成的事件 transitionend
    imgBox.addEventListener('transitionend', function() {
        if (index >= 3) {
            index = 0;
            //去掉过渡效果，使imgBox快速跳到目标位置
            imgBox.style.transition = 'none';
            //利用新的索引号乘以宽度 去滚动图片
            translateX = -index * conW;
            imgBox.style.transform = 'translateX(' + translateX + 'px)';
        } else if (index < 0) {
            index = 2;
            imgBox.style.transition = 'none';
            translateX = -index * conW;
            imgBox.style.transform = 'translateX(' + translateX + 'px)';
        }
        //小圆点跟随变化
        points.querySelector('.current').classList.remove('current');
        points.children[index].classList.add('current');
    })

    //拖动图片
    //触摸元素 touchstart  获取手指初始坐标
    var startX = 0;
    var moveX = 0;
    imgBox.addEventListener('touchstart', function(e) {
            startX = e.targetTouches[0].pageX;
            //手指触摸时停止定时器
            clearInterval(timer);
        })
        //移动手指 touchmove  计算手指移动距离，并滑动盒子
    imgBox.addEventListener('touchmove', function(e) {
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子： 盒子原来的位置 + 手指移动的距离
        translateX = -index * conW + moveX / 4;
        // 手指移动的时候，不需要动画效果
        imgBox.style.transition = 'none';
        imgBox.style.transform = 'translateX(' + translateX + 'px)';
        flag = true; // 如果用户手指移动过，再去做判断效果，否则不做
        e.preventDefault();
    })
    imgBox.addEventListener('touchend', function(e) {
        if (flag) {
            // 如果滑动距离大于50，就播放上一张或下一张
            if (Math.abs(moveX / 4) > 50) {
                // 如果右滑就是播放上一张 moveX 是正值
                if (moveX > 0) {
                    index--;
                } else {
                    // 如果左滑就是下一张 moveX 是负值
                    index++;
                }
                var translateX = -index * conW;
                imgBox.style.transition = 'all .3s';
                imgBox.style.transform = 'translateX(' + translateX + 'px)';
            } else {
                // 如果滑动距离小于50，就回弹
                var translateX = -index * conW;
                imgBox.style.transition = 'all .3s';
                imgBox.style.transform = 'translateX(' + translateX + 'px)';
            }
            clearInterval(timer);
            timer = setInterval(function() {
                index++;
                var translateX = -index * conW;
                imgBox.style.transition = 'all .3s';
                imgBox.style.transform = 'translateX(' + translateX + 'px)';
            }, 3000);
        }
    })
})