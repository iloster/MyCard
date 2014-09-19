var GameOverLayer = cc.LayerColor.extend({
    //level :null,
    init:function(result,level){
        this._super();
        this.setColor(cc.c4(180, 170, 160, 255));
        this.level =level;
        var backBtnRes = "res/backBtn.png";
        var nextBtnRes = "res/nextBtn.png";

        var winSize = cc.Director.getInstance().getWinSize();
        if(level == 13)
        {
             result = "success";
             this.res = backBtnRes;
         }
        if(level == 0)
            this.res = backBtnRes;
        else
            this.res = nextBtnRes;
        // 创建一个标签用于显示“GameOver”字符串
        // 第一个参数是内容，第二个是字体，第三个是字体大小
        var _label = cc.LabelTTF.create(result,"Consolas",40);
        // 设置位置
        _label.setColor(0,0,0);
        _label.setPosition(cc.p(winSize.width/2,winSize.height/2+50));
        
       var restart = cc.MenuItemImage.create(
            this.res,
            this.res,
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
        cc.log("----------------------",this.level);
        if(this.level == 13) 
            this.level = 0;
         var scene = NextScene.create(this.level);  
            //var scene = new MainScene();
         cc.Director.getInstance().replaceScene(scene);  
    }
});
//这个方法创建了GameOverLayer层，并调用这个层的init方法进行初始化
GameOverLayer.create = function(result,level){
    var gameOverLayer = new GameOverLayer();
    if(gameOverLayer && gameOverLayer.init(result,level)){
        return gameOverLayer;
    }
    return null;
}
 
var GameOverScene = cc.Scene.extend({
    _layer:null,
 
    init:function(result,level){
        // 这个场景加入了一个GameOverLayer层
        this._layer = GameOverLayer.create(result,level);
        this.addChild(this._layer);
 
        return true;
    }
})
//这个方法创建了GameOverScene场景，并调用这个场景的init方法进行初始化
GameOverScene.create = function(result,level){
    var scene = new GameOverScene();
    if(scene && scene.init(result,level)){
        return scene;
    }
    return null;
}