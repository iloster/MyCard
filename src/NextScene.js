var NextLayer = cc.LayerColor.extend({
	//whiteBlock:null,
	//whiteBlocks:null,
	//labels:null,
	//levle:null
	init:function (level) {
		//////////////////
		this._super();
		this.whiteBlocks = new Array();
		this.labels = new Array();
		this.level = level;
		this.setColor(cc.c4(180, 170, 160, 255));
		//this.level = 2;
		this.Tag = 1; //判断顺序
		this.Flag = false;//游戏是否结束
		this.Place = false;//是否触摸是否在卡片区域
		this.Time =2+level;//倒计时
		this.N = 3+level;
		Num = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
		n=3;

		var size = cc.Director.getInstance().getWinSize();
		//var left_padding = (size.width - 49.5*n)/2;
		var left_padding = 87;	
		//var bottom_padding = (size.height - 49.5*4)/2;
		var bottom_padding = (size.height - 150*3)/2;
		cc.log(size);
		
		//生成随机数组
		//Num = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
		
		randomNum = this.shuffle(Num);
		cc.log("Num",Num);
		cc.log("randomNum",randomNum);
	
		//生成卡片
		for(var i=0; i < 4; i++)
		{
				//this.whiteBlock[i] = new Array(3);
			this.whiteBlocks[i] = new Array();
			this.labels[i] = new Array();
			for(var j=0; j < 4; j++)
			{
				this.whiteBlocks[i][j] = cc.Sprite.create(s_whiteBlock);
				//this.whiteBlocks[i][j].setPosition(31+31*i,51+51*j);
				//this.whiteBlocks[i][j].setScale(0.25);
				this.whiteBlocks[i][j].setPosition(left_padding+155*i,bottom_padding+155*j);
				this.whiteBlocks[i][j].setScale(1.5);
				this.whiteBlocks[i][j].setColor(cc.c3(255,255,255));
				this.addChild(this.whiteBlocks[i][j],1);

				this.labels[i][j] = cc.LabelTTF.create(0,"Arial", 60);
				//this.labels[i][j].setString(0);
			/*
				this.labels[i][j] = cc.LabelTTF.create(randomNum[i+4*j],"Arial", 60);
				this.labels[i][j].setColor(0,0,0);//数字设为黑色
				this.labels[i][j].setPosition(left_padding+155*i,bottom_padding+155*j);
				this.addChild(this.labels[i][j],1);
				*/
			}

		}

		for(var k =0 ; k <=this.N ; k++)
		{
			var i = (Num[k]-1)%4;
			var j = Math.floor((Num[k]-1)/4);
			cc.log("(i,j)",i,j);
			this.labels[i][j] = cc.LabelTTF.create(k+1,"Arial", 60);
			this.labels[i][j].setColor(0,0,0);//数字设为黑色
			this.labels[i][j].setPosition(left_padding+155*i,bottom_padding+155*j);
			this.addChild(this.labels[i][j],1);
		}

		//生成倒计时
		this.timeBg = cc.Sprite.create(s_time);
		this.timeBg.setPosition(size.width/2,size.height - 70);
		this.addChild(this.timeBg,1);
		this.timeLabel = cc.LabelTTF.create(this.Time,"Arial",60);
		this.timeLabel.setColor(255,255,255);
		this.timeLabel.setPosition(size.width/2,size.height - 70);
		this.addChild(this.timeLabel,1);
		
		/*
		this.copyRight = cc.LabelTTF.create("coding by loster","Arial", 40);
		this.copyRight.setColor(0,0,0);
		this.copyRight.setPosition(size.width/2,40);
		this.addChild(this.copyRight);
		*/

		 //倒计时
		 this.schedule(this.updateTime,1,this.Time,0);
		 return true;
	},
	//////////////////////////////////////////////////////
	//乱序输出数组
	///////////////////////////////////////////////////////
	shuffle:function(o)
	{
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	},
	///////////////////////////////////////////////////
	//处理倒计时
	////////////////////////////////////////////////////
	updateTime:function()
	{
		cc.log("this.time",this.Time);
		if(this.Time == 0)
		{
			for(var i = 0 ; i < 4 ; i ++)
				for(var j = 0 ; j < 4 ;j ++)
				{
					this.whiteBlocks[i][j].setColor(cc.c3(0,0,0));
				}
			//可触摸
		    this.setTouchEnabled(true);
		    //隐藏倒计时
		    //this.timeLabel.setVisible(false);
		    this.removeChild(this.timeLabel);
		    this.removeChild(this.timeBg);
		}
		this.timeLabel.setString(--this.Time);
		
	},
	////////////////////////////////////////////////////
	//处理触摸事件
    //////////////////////////////////////////////////////////
	onTouchesEnded:function(touches, event)
     {
        //判断卡牌是否正确
        if(this.Place)
	     {
	     	cc.log("this.Tag",this.Tag);
	        if(this.Flag)
	        {
	        	cc.log("next");
	        	if(this.Tag-1 ==this.N+1)
	        		{
	        			var scene = GameOverScene.create("Good Job! ",this.level+1);  
						cc.Director.getInstance().replaceScene(scene);  
	        		}
	        }
	        else
	        {
	        	cc.log("gameover");
	        	var scene = GameOverScene.create("你通过了"+(this.level).toString()+"关",0);  
				cc.Director.getInstance().replaceScene(scene);  
				this.Tag = 1;
			}
	   	 }
	   	 else
	   	 	cc.log("not place");
     },
 
    onTouchesBegan:function(touches,event)
    {
       var touch = touches[0];
       var location = touch.getLocation();
       for(var i = 0 ; i < 4 ; i++)
       {
       	for(var j = 0 ; j < 4 ;j++)
       	{
       	   if(cc.rectContainsPoint(this.whiteBlocks[i][j].getBoundingBox(),location))
       		{
           	 this.Place = true;
             this.whiteBlocks[i][j].setColor(cc.c3(255,255,255));
             cc.log("onTouchesBegan.if",this.labels[i][j].getString());
             if(this.labels[i][j].getString() == this.Tag)
           	  {
           	  	//如果顺序相等
           	  		this.Tag++;
           	  		this.Flag = true;
             	}
             else 
             	{
             		//如果不等
             		//this.Tag = 1;
             		this.Flag = false;
             	}
			// cc.log("-----------------------", this.labels[i][j].getString() == 10);
    		}
    	   else
    		{
    			//触摸到其他区域
    			self.Place = false;
    		}
       	}
       }
       
    }
///////////////////////////////////////////////////////////
});

NextLayer.create = function(level)
{
	var nextLayer = new NextLayer();
	if(nextLayer && nextLayer.init(level))
		return nextLayer;
	return null;
}

var NextScene = cc.Scene.extend({
    _layer:null,
 
    init:function(level){
        // 这个场景加入了一个GameOverLayer层
        this._layer = NextLayer.create(level);
        this.addChild(this._layer);
 
        return true;
    }
});
//这个方法创建了GameOverScene场景，并调用这个场景的init方法进行初始化
NextScene.create = function(level){
	cc.log("----NextScene.create---");
    var scene = new NextScene();
    if(scene && scene.init(level)){
        return scene;
    }
    return null;
}