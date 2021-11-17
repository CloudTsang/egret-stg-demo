class EliteEnemyPlane extends EnemyPlane{
	public constructor() {
		super()
		this.maxHP = 8;
		this.HP = 8;
		this.speed = 12;
		this.shotSpeed = 500;
		this.shotTimer.delay = this.shotSpeed		
		this.maxDashGauge = 5;
    	this.curDashGauge = 5;
	}

	protected checkShouldShot(){
		this._shouldShot = true;		
	}

	protected draw(){
		let bmp = new egret.Bitmap();		
		bmp.texture = RES.getRes('sheet_json#plane3');
		bmp.width = this.pWidth*4;
		bmp.height = this.pHeight*4;
		bmp.x = -this.pWidth*2;
		bmp.y = -this.pHeight*2;		
		this.addChild(bmp);		
	}
}