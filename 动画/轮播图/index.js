window.addEventListener('load', function() {
    //鼠标移动到区域内显示箭头
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var container = document.querySelector('.container');
    var containerWidth = container.offsetWidth;
    container.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        //清除定时器
        clearInterval(timer);
        timer = null;
        //清除定时器变量
    })
    container.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';

        timer = setInterval(function() {
            //手动调用点击事件     直接加上小括号即可
            arrow_r.click();
        }, 3000)
    })

    //动态生成小圆点，有几张图片生成几张小圆点
    var imgUl = document.querySelector('.img-box');
    var point = document.querySelector('.point');
    console.log(imgUl.children.length);
    for (var i = 0; i < imgUl.children.length; i++) {
        //创建一个li
        var li = document.createElement('li');
        //设置一个索引号
        li.setAttribute('index', i);
        point.appendChild(li);

        //小圆圈的排他思想，可以在生成小圆圈的同时绑定点击事件
        li.addEventListener('click', function() {
            for (var i = 0; i < point.children.length; i++) {
                point.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            //把索引号给num，实现点击圆点后再点击向右按钮时可以同步变化
            num = index;
            animate(imgUl, -index * containerWidth);
        })
    }
    point.children[0].className = 'current';
    var first = imgUl.children[0].cloneNode(true);
    imgUl.appendChild(first);
    var num = 0;
    //flag节流阀
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            //无缝滚动
            //如果图片走到了最后复制的一张图片，此时imgUl要快速复原，left改为0
            if (num == imgUl.children.length - 1) {
                imgUl.style.left = '0px';
                num = 0;
            }
            num++;
            animate(imgUl, -num * containerWidth, function() {
                flag = true; //打开节流阀
            })
            pointsChange();
        }
    })
    arrow_l.addEventListener('click', function() {
        //无缝滚动
        if (num == 0) {
            num = imgUl.children.length - 1;
            imgUl.style.left = -num * containerWidth + 'px';
        }
        num--;
        animate(imgUl, -num * containerWidth, function() {
            flag = true; //打开节流阀
        })
        pointsChange();
    })

    function pointsChange() {
        for (var i = 0; i < point.children.length; i++) {
            point.children[i].className = '';
        }
        if (num != 4) {
            point.children[num].className = 'current';
        } else {
            point.children[0].className = 'current';
        }
    }
    var timer = setInterval(function() {
        //手动调用点击事件     直接加上小括号即可
        arrow_r.click();
    }, 3000)
})