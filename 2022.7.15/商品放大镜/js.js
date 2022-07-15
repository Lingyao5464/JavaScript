window.addEventListener('load', function() {
    var imgBox = document.querySelector('.imgBox');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    imgBox.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    imgBox.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    imgBox.addEventListener('mousemove', function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // var x = e.offsetX;
        // var y = e.offsetY;
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;

        //黄色盒子可移动的最大距离  ，因为长宽一样，所以只用一个值，不用maxX和maxY
        var maskMax = imgBox.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        //大图的移动距离 = 遮罩层移动距离 * 大图最大移动距离 / 遮罩层最大移动距离
        //大图
        var bigImg = document.querySelector('.bigImg');
        //大图最大移动距离
        var bigMaxX = bigImg.offsetWidth - big.offsetWidth;
        var bigMaxY = bigImg.offsetHeight - big.offsetHeight;
        //大图片的移动距离X，Y
        var bigX = maskX * bigMaxX / maskMax;
        var bigY = maskY * bigMaxY / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
})