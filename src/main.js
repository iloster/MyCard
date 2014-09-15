var MainLayer = cc.LayerColor.extend({
	whiteBlock:null,
	whiteBlocks:null,
	labels:null,
	init:function () {
		//////////////////
		this._super();
		this.whiteBlocks = new Array();
		this.labels = new Array();
		this.setColor(cc.c4(0,0,0,0));
		this.level = 2;
		n=3;
		var size = cc.Director.getInstance().getWinSize();

		//var left_padding = (size.width - 49.5*n)/2;
		var left_padding = 95;	
		//var bottom_padding = (size.height - 49.5*4)/2;
		var bottom_padding = (size.height - 150*3)/2;
		cc.log(size);
		
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
				this.whiteBlocks[i][j].setPosition(left_padding+150*i,bottom_padding+150*j)
				this.whiteBlocks[i][j].setScale(1.5)
				//this.whiteBlocks[i][j].setColor(255,255,255)
				this.addChild(this.whiteBlocks[i][j],0);

				/*this.labels[i][j] = ccs.Label.create();
				this.labels[i][j].setText(i+ " "+j);
				this.labels[i][j].setColor(0,0,0);
				this.labels[i][j].setPosition(left_padding+50*i,bottom_padding+50*j);
				this.addChild(this.labels[i][j],1);*/
			}

		}

		/*
		this.whiteBlock = cc.Sprite.create(s_whiteBlock);
		this.whiteBlock.setPosition(size.width/2,size.height/2);
		this.whiteBlock.setScale(0.5);
		this.addChild(this.whiteBlock,0);
		blockSize=this.whiteBlock.getBoundingBox();
		cc.log(blockSize.width,blockSize.height);*/

		/*this.randomNum = this.createRandom(17
		var row = this.getColandRow(randomNum).row;
		var col = this.getColandRow(randomNum).col;
		cc.log(row,col);*/
		randomNum = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
		cc.log(this.shuffle(randomNum));
		//cc.log(this.randomNum);
	},
	//////////////////////////////////////////////////////
	//乱序输出数组
	///////////////////////////////////////////////////////
	shuffle:function(o)
	{
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	},
	///////////////////////////////////////////////////////
	getColandRow:function(randomNum)
	{
		var length=randomNum.length;
		row = new Array();
		col = new Array();
		for(var i =0; i<length; i++)
		{
			col[i] = Math.round(randomNum[i]/length);
			row[i] = randomNum[i]%length;
		}
		return {
			row:row,
			col:col
		};
	},
	///////////////////////////////////////////////////////
	///生成随机数
	createRandom:function(n)
	{
		randomNum = new Array();
		for(var i=0; i<n ; i++)
		{
			randomNum[i] = Math.round(Math.random()*(n*n-1));
			while(this.checkRandom(randomNum))
			{
				randomNum[i] = Math.round(Math.random()*n*n);
			}
		}
		return randomNum;
	},
	//去重 true:相同   false：不同
	checkRandom:function(randomNum)
	{
		var length = randomNum.length;
		cc.log(randomNum[length])
		for(var i = 0;i<length-1;i++)
		{
			if(randomNum[i] == randomNum[length-1])
				return true;
		}
		return false;
	}
	///////////////////////////////////////////////////////
});

var MainScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new MainLayer();
		layer.init();
		this.addChild(layer);
	}
})