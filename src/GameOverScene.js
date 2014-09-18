var GameOverLayer = cc.LayerColor.extend({
 
    init:function(result){
        this._super();
        this.setColor(cc.c4(180, 170, 160, 255));
 
        var winSize = cc.Director.getInstance().getWinSize();
 
        // 创建一个标签用于显示“GameOver”字符串
        // 第一个参数是内容，第二个是字体，第三个是字体大小
        var _label = cc.LabelTTF.create("你总共走了"+result+"步","Thonburi",40);
        // 设置位置
        _label.setColor(0,0,0);
        _label.setPosition(cc.p(winSize.width/2,winSize.height/2+100));
        
       var restart = cc.MenuItemImage.create(
            "res/backBtn.png",
            "res/backBtn.png",
            this.backToMain,
            this); 
        var menu = cc.Menu.create(restart);  
        restart.setScale(1.5);
        menu.setAnchorPoint(0.5, 0.5);
        menu.setPosition(winSize.width/2,winSize.height/2-100);
       

        this.addChild(_label,1);
        this.addChild(menu,1);
        
        this.setTouchEnabled(true);
        return true;
    },

    //////////////////////////////////////////////////////
    backToMain:function()
    {
        cc.log("----------------------");
        var scene =new MainScene();  
        cc.Director.getInstance().replaceScene(scene);  
    }
});
//这个方法创建了GameOverLayer层，并调用这个层的init方法进行初始化
GameOverLayer.create = function(result){
    var gameOverLayer = new GameOverLayer();
    if(gameOverLayer && gameOverLayer.init(result)){
        return gameOverLayer;
    }
    return null;
}
 
var GameOverScene = cc.Scene.extend({
    _layer:null,
 
    init:function(result){
        // 这个场景加入了一个GameOverLayer层
        this._layer = GameOverLayer.create(result);
        this.addChild(this._layer);
 
        return true;
    }
})
//这个方法创建了GameOverScene场景，并调用这个场景的init方法进行初始化
GameOverScene.create = function(result){
    var scene = new GameOverScene();
    if(scene && scene.init(result)){
        return scene;
    }
    return null;
}