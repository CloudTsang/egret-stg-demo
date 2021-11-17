class ExtremeEnemyPlane extends EnemyPlane {
	public constructor() {
		super();
		this.maxHP = 10;
		this.HP = 10;
		this.speed = 15;
		this.shotSpeed = 450;
		this.shotTimer.delay = this.shotSpeed		
		this.maxDashGauge = 10;
    	this.curDashGauge = 10;
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


	public refreshMove(){
		let moved:number 
		if(this._shouldShot){
			this.shot();
		}else{
			this.stop();
		}		

		if(this.dashing){
			//冲刺中
			return;
		}
		if(this._curPattern == AIActType.SPARE){
			return;
		}
		if(this._movePoint){
			this.x += this._dx* this.speed;
			this.y += this._dy* this.speed;		
			if((this._dx == -1 && this.x <= this._movePoint.x) || (this._dx == 1 && this.x >= this._movePoint.x)){
				//完成一段移动			
				this._movePoint = null;
			}else if(this._dx == 0 && this._dy == 0){
				this._movePoint = null;
			}
			return	
		}

		const d = this.getLessBulletDirection();
		switch(this._curPattern){
			case AIActType.DASH_AVOID:
				this.dash(d[0], d[1]);
				this._curPattern = AIActType.TRACE;		
				return;
			case AIActType.AVOID:	
				moved = GlobalMethod.random(this.width, this.width*2);
				this._movePoint = new egret.Point(this.x+d[0]*moved, this.y+d[1]*moved);
				break;
			case AIActType.SLIGHT_AVOID:			
				moved = GlobalMethod.random(this.width/2, this.width);
				this._movePoint = new egret.Point(this.x+d[0]*moved, this.y+d[1]*moved);
				break;
			case AIActType.BARRAGE:		
				//x轴上穿过玩家两侧射击后正对着玩家射击			
				if(this._playerPosition){
					if(this._playerPosition.x < this.x - this.width){		
						this._movePoint = new egret.Point(this._playerPosition.x - this.width, this.y);	
					}else if(this._playerPosition.x > this.x + this.width){	
						this._movePoint = new egret.Point(this._playerPosition.x + this.width, this.y);	
					}else{
						this._curPattern = AIActType.TRACE;
						this._movePoint = new egret.Point(this._playerPosition.x, this.y);
					}
				}								
				break;				
			case AIActType.TRACE:			
				this._movePoint = new egret.Point(this._playerPosition.x, this.y);
				break;
			case AIActType.DASH_TRACE:			
				if(this._playerPosition.x > this.x){
					this.dash(1,0)
				}else{
					this.dash(-1,0)
				}	
				this._movePoint = new egret.Point(this._playerPosition.x, this.y);
				return;
			case AIActType.IMPACT:
				this._movePoint = this._playerPosition;
				break;
			case AIActType.GETBUFF:				
				this._movePoint = this._driftPosition;
				break;
		}	
		if(this._movePoint==null){
			return;
		}
		this.getDirectionFromMovePoint();		
		this.x += this._dx* this.speed;
		this.y += this._dy* this.speed;
		if((this._dx == -1 && this.x <= this._movePoint.x) || (this._dx == 1 && this.x >= this._movePoint.x)){
			//完成一段移动
			this.setCurPattern(AIActType.SPARE)
			this._movePoint = null;
		}
	}

	protected setCurPattern(t:AIActType){
		if(t == AIActType.TRACE){			
			t = AIActType.BARRAGE
		}
		super.setCurPattern(t)
	}
}