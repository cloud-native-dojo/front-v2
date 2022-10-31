window.onload = function () {
    var canvas = new fabric.Canvas('cvs');

    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.setHeight(window.innerHeight);
        canvas.setWidth(window.innerWidth);
        canvas.renderAll();
    }
    // resize on init
    resizeCanvas();


    //キャンバス上でのマウスホイール操作をハンドリングする
    canvas.on('mouse:wheel', function (e) { mousewheel(e); });

    function mousewheel(e) {
            //ポインタの位置取得
            const mouseX = e.pointer.x;
            const mouseY = e.pointer.y;

            //ホイール回転の取得
            const deltaY = e.e.wheelDeltaY;

            //現在の拡大倍率の取得
            let zoom = canvas.getZoom();
            console.log(zoom);
            if (zoom < 0.5) {
                zoom = 0.5;
            }
            //マウス位置を原点として拡大縮小
            canvas.zoomToPoint(new fabric.Point((window.innerWidth / 2), (window.innerHeight / 2)), zoom + deltaY / 2400);
    }



    //円
    canvas.add(new fabric.Circle({
        left: (window.innerWidth / 2)-500, top: (window.innerHeight / 2)-500, radius: 500, stroke: 'black',fill: 'lightblue'
    }));


}