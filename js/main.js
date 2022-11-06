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

    canvas.preserveObjectStacking = true;
    island.selectable = false;
    ball.selectable = false;


    //船 700 300
   

    //帆
    var ship1 = new fabric.Path('M 700 300 L  700 320 730 320 C 730 320 710 340 730 360 L 670 360 C 670 360 650 340 670 320 L 700 320 M 700 360 L 700 370  ', {stroke: 'brack', fill: 'white', strokeWidth: 2}
    );
    //土台
    var ship2 = new fabric.Path('M 660 370  L 740 370 C 750 370 703 450 660 370', {stroke: 'brack', fill: 'Brown', strokeWidth: 2 ,}
    );
    //波
    var waveship1 =new fabric.Path('M 100 100 C 100 100 107 105 110 100 C 110 100 115 93 120 100 C 120 100 125 107 130 100 C 130 100 135 93 140 100', {stroke: '#4169E1', fill:"", strokeWidth: 7 , left: 652 ,top:400}
    );
    var waveship2 =new fabric.Path('M 100 100 C 100 100 107 105 110 100 C 110 100 115 93 120 100 C 120 100 125 107 130 100 C 130 100 135 93 140 100', {stroke: '#4169E1', fill:"", strokeWidth: 7, left: 691 ,top:400}
    );


    var ship = new fabric.Group([ship1, ship2, waveship1, waveship2], { hasControls: false });
    canvas.add(ship);

    //重なり
    canvas.moveTo(circle,0);
    canvas.moveTo(island, 1);
    canvas.moveTo(ship, 2);
    canvas.moveTo(bridge, 3);
    
    

    


    

/*

    //船 
   
    //帆 
    var ship1 = new fabric.Path('M 650 250 L 650 270 680 270 C 680 270 660 290 680 310 L 620 310 C 620 310 600 290 620 270 L 650 270 M 650 310 L 650 320  ', {stroke: 'brack', fill: 'white', strokeWidth: 2}
    );
    //土台
    var ship2 = new fabric.Path('M 610 320  L 690 320 C 700 320 653 400 610 320', {stroke: 'brack', fill: 'SaddleBrown', strokeWidth: 2}
    );

    var  ship = new fabric.Group([ship1, ship2], {left: 800, top: 360});
    canvas.add(ship);

    

    //島
    //土台
    var island1 = new fabric.Path('M 390 360  L 510 360 C 510 360 453 240 390 360', {stroke: 'brack', fill: '#F5DEB3', strokeWidth: 2}
    );
    //上  C 475 340 485 370 500 340
    var island2 =new fabric.Path('M 400 340 C 400 340 400 370 425 340 C 425 340 440 370 475 340 C 475 340 485 370 500 340 C 500 340 453 240 400 340', {stroke: 'brack', fill: '#7FFF00', strokeWidth: 2}
    );

    var  island = new fabric.Group([island1, island2 ],{left: 500, top: 400});
    canvas.add(island);

    //橋
    var a = new fabric.Path('M 100 100 L 300 100 275 150 z',{stroke: 'brack', fill: '#7FFF00', strokeWidth: 2})
    canvas.add(a);
*/
/*
    var wave =new fabric.Path('M 100 100 C 100 100 105 110 110 100 C 110 100 115 90 120 100 C 120 100 125 110 130 100 C 130 100 135 90 140 100', {stroke: '#4169E1', fill:"", strokeWidth: 3}
    );
*/


  

}