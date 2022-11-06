window.onload = function () {
    var canvas = new fabric.Canvas('cvs',);

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
    canvas.on({
        'object:moving': onChange,
        'object:scaling': onChange,
        'object:rotating': onChange,
    });

    function onChange(options) {
        options.target.setCoords();
        canvas.forEachObject(function (obj) {
            if (obj === options.target) return;
            if (obj.id == "island") {
                obj.set('opacity', options.target.intersectsWithObject(obj) ? 0.5 : 1);
            }
        });
    }

    function mousewheel(e) {
            //ポインタの位置取得
            const mouseX = e.pointer.x;
            const mouseY = e.pointer.y;

            //ホイール回転の取得
            const deltaY = e.e.wheelDeltaY;

            //現在の拡大倍率の取得
            let zoom = canvas.getZoom();
            if (zoom < 0.5) {
                zoom = 0.5;
            }
            //マウス位置を原点として拡大縮小
            canvas.zoomToPoint(new fabric.Point((window.innerWidth / 2), (window.innerHeight / 2)), zoom + deltaY / 2400);

            
    }


    
    //地球
    var circle=new fabric.Circle({
        left: (window.innerWidth / 2)-500, top: (window.innerHeight / 2)-500, radius: 500, stroke: 'black',fill: 'lightblue'
    });

    canvas.add(circle);

    circle.selectable = false; //地球固定

    //船(仮)
    var ship = new fabric.Circle({
        id: ship, hasControls: false, left: (window.innerWidth / 2) - 50, top: (window.innerHeight / 2) - 50, radius: 50, stroke: 'black', fill: 'brown'
    });


    //島 400 350
    //土台
    var island1 = new fabric.Path('M 400 350  L 520 350  C 520 350 453 230 400 350', {stroke: 'brack', fill: '#F5DEB3', strokeWidth: 2}
    );
    //上
    var island2 =new fabric.Path('M 410 328 C 410 328 410 360 435 330 C 435 330 440 360 485 330 C 485 330 495 360 510 330 C 510 330 463 230 410 330', {stroke: 'brack', fill: '#7FFF00', strokeWidth: 2}
    );

    //木
    var tree1 = new fabric.Path('M 100 100 C 100 100  80 120 90 150 L 105 150 C 105 150 95 120 108 100 z ', {stroke: 'brack', fill: '#CD853F', strokeWidth: 2 ,top:240,left:450 }
    );
    var tree2 = new fabric.Path('M 100 100 C 100 100 130 80 150 115 z M 100 100 C 100 100 70 80 50 115 z M 100 100  ', {stroke: 'brack', fill: 'LimeGreen', strokeWidth: 2 ,left:416,top:234}
    );
    var tree3 = new fabric.Path('M 100 100 C 100 100 85 50 50 90 z M 100 100 C 100 100 115 50 150 90 z', {stroke: 'brack', fill: 'Green', strokeWidth: 2 ,left:415,top:215}
    );


    //波
    var wavebrige1 =new fabric.Path('M 100 100 C 100 100 107 105 110 100 C 110 100 115 93 120 100 C 120 100 125 107 130 100 C 130 100 135 93 140 100', {stroke: '#4169E1', fill:"", strokeWidth: 7, left: 380 ,top:346}
    );
    var wavebrige2 =new fabric.Path('M 100 100 C 100 100 107 105 110 100 C 110 100 115 93 120 100 C 120 100 125 107 130 100 C 130 100 135 93 140 100', {stroke: '#4169E1', fill:"", strokeWidth: 7, left: 419 ,top:346}
    );
    var wavebrige3 =new fabric.Path('M 100 100 C 100 100 107 105 110 100 C 110 100 115 93 120 100 C 120 100 125 107 130 100 C 130 100 135 93 140 100', {stroke: '#4169E1', fill:"", strokeWidth: 7, left: 458 ,top:346}
    );
  
    

    //橋 503 330
    var bridge1 = new fabric.Path('M 503 330 L 603 330  620 350  520 350 503 330 M 520 350 L 520 360 620 360 620 350 M 503 330 L 503 340 520 360 520 350 ',{stroke: 'brack', fill: 'Sienna', strokeWidth: 2})
    
    var bridge2 = new fabric.Path('M 545 360 L 545 350 528 330 M 570 360 L 570 350 553 330 M 595 360 L 595 350 578 330 ',{stroke: 'brack', fill: '', strokeWidth: 2})


    //橋　脚
    var bridge3 = new fabric.Path('M 531 360 L 531 375 535 375 535 360 M 593 360 L 593 375 598 375 598 360',{stroke: 'brack', fill: 'Sienna', strokeWidth: 2})

    var  bridge = new fabric.Group([bridge1, bridge2 ,bridge3],{left:470});

    //波
 
    var wavebrige4 =new fabric.Path('M 100 100 C 100 100 107 105 110 100 C 110 100 115 93 120 100 C 120 100 125 107 130 100 C 130 100 135 93 140 100', {stroke: '#4169E1', fill:"", strokeWidth: 7, left: 540 ,top:370}
    );
    var wavebrige5 =new fabric.Path('M 100 100 C 100 100 107 105 110 100 C 110 100 115 93 120 100 C 120 100 125 107 130 100 C 130 100 135 93 140 100', {stroke: '#4169E1', fill:"", strokeWidth: 7, left: 477 ,top:370}
    );


    var  island = new fabric.Group([tree1,tree2,tree3,island1, island2,wavebrige1,wavebrige2,wavebrige3], {id: "island"});
    
    var  ball = new fabric.Group([bridge,wavebrige4,wavebrige5]);
    canvas.add(island);
    canvas.add(ball);
    canvas.add(ship);

    canvas.preserveObjectStacking = true;
    island.selectable = false;
    ball.selectable = false;

    circle.moveTo(0);
    island.moveTo(1);
    ship.moveTo(2);
    ball.moveTo(3);


  

}