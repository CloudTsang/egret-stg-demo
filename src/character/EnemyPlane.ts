class EnemyPlane extends BasePlane{
	public aiCfg:AIConfig;

	/**子弹4象限分布量 */
	protected _bulletDistribute:number[];	
	protected _playerPosition:egret.Point;
	protected _driftPosition:egret.Point;

	protected _curPattern:AIActType;	
	protected _shouldShot:boolean;

	protected _movePoint:egret.Point = null;		
	protected _dx:number = 0;
	protected _dy:number = 0;	

	private _border:number[]
	
	/** 敌方机体 */
	public constructor() {
		super();
		this.draw()   
		this.maxHP = 5;
		this.HP = 5;
		this.pWidth = 30;
        this.pHeight = 50;
        this.pColor = 0xFF0000;
		this.speed = 4;
		this.shotSpeed = 1000;
		this.shotTimer.delay = this.shotSpeed		
		this.aiCfg = new AIConfig(this); 
		this.bulletDirections = [[0,1]]        
        this.bulletGenerator = EnemyBullet.pool;
		this._bulletDistribute = [0,0,
								  0,0];		
		this._border = [
			this.width,
			this._stage.stageWidth - this.width,
			this.height,
			this._stage.stageHeight - this.height
		]						
		this._curPattern = AIActType.SPARE;
	}

	public shot(){
		if(this.shotTimer.running){
			return;
		}
		this.shotTimer.repeatCount = 0;
		this.shotTimer.addEventListener(egret.TimerEvent.TIMER, this.onShot, this)
		this.shotTimer.start();
	}

	public stop(){
		if(!this.shotTimer.running){
			return;
		}
		this.shotTimer.removeEventListener(egret.TimerEvent.TIMER, this.onShot, this)
		this.shotTimer.stop();
	}


	private onShot(){
		if(!this.parent){
			return
		}
		for(let i=0; i<this.bulletDirections.length; i++){
            let b = this.bulletGenerator.getOne()
            b.x = this.x;
            b.y = this.y - this.pHeight + 50;
            
            let d = this.bulletDirections[i];
            b.setDirection(d[0], d[1])
            this.parent.addChild(b);
            b.shoot()                        
        }        
	}

	protected draw(){
		let bmp = new egret.Bitmap();		
		bmp.texture = RES.getRes('sheet_json#plane4');
		bmp.width = this.pWidth*4;
		bmp.height = this.pHeight*4;
		bmp.x = -this.pWidth*2;
		bmp.y = -this.pHeight*2;		
		this.addChild(bmp);		
	}

	public refreshPosition(){
		super.refreshPosition();
		this._bulletDistribute = [0,0,
								  0,0];
	}

	public playerReg(p:BasePlane){
		if(!p.position){
			return;
		}
		this._playerPosition = p.position;			
		this.checkShouldShot()
		
		const d = Math.abs(this.x - p.x);
		const d2 = egret.Point.distance(p.position, this.position);		
		const num = d/this.width;
		const num2 = d2/this.height;
		const positive = this.aiCfg.checkIfPositive();
		if(num2 < 1){
			this.setCurPattern(AIActType.IMPACT);
			return;
		}
		// if(num > 3 && positive){
		if(num > 3){	
			this.setCurPattern(AIActType.DASH_TRACE);
			return;
		}
		// if(num > 3 && !positive){
		// 	this.setCurPattern(AIActType.SPARE);
		// 	return; 
		// }
		if(num < 3){
			this.setCurPattern(AIActType.TRACE);
			return;
		}
	}

	public bulletReg(b:Bullet){
		if(!b.position){
			return;
		}
		if(this.dashing){
			return;
		}
		let bp = b.position;	
		if(bp.x < this.x && bp.y < this.y - this.pHeight){		
			this._bulletDistribute[0] ++;
			//不考虑机位后方的子弹
			return;
		}else if(bp.x > this.x && bp.y < this.y - this.pHeight){			
			this._bulletDistribute[1] ++;
			//不考虑机位后方的子弹
			return;
		}else if(bp.x < this.x && bp.y > this.y){					
			this._bulletDistribute[2] ++;			
		}else if(bp.x > this.x && bp.y > this.y){				
			this._bulletDistribute[3] ++;			
		}
		
		const d = egret.Point.distance(this.position, b.position);
		/**子弹距离多少机位 */
		const num = d/this.height;
		/**x轴位置是否接近 */
		const sameXArea = b.position.x > this.x-this.pWidth && b.position.x < this.x + this.pWidth
		
		if(!sameXArea && num > 1){
			//子弹距离大于1机位时不改变行为
			return;
		}
		if(!sameXArea && num < 1){
			//x轴不同但位置接近，远离0.5-1机位		
			this.setCurPattern(AIActType.SLIGHT_AVOID);	
			return; 
		}
		if(sameXArea && num < 2 && this.curDashGauge == 0){
			//不能冲刺时，x轴相同但位置较远，远离1-2机位
			this.setCurPattern(AIActType.AVOID);
			this._movePoint = null;		
			return;
		}
		if(sameXArea && num < 1){
			//x轴相同且位置接近，冲刺远离
			this.setCurPattern(AIActType.DASH_AVOID);		
			this._movePoint = null;			
			return;
		}	
	}	

	public driftReg(d:Drift){
		if(!d.position){
			return;
		}
		if(!d.buff){
			return;
		}
		this._driftPosition = d.position;
		const distance = egret.Point.distance(this.position, d.position);
		if(distance < this.height * 3){
			this.setCurPattern(AIActType.GETBUFF);
		}
		
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
		if(this._curPattern == t){
			return
		}
		if(this._curPattern == AIActType.DASH_AVOID){
			return;
		}

		this._curPattern = t;
	}

	private moveFinish(){
		this._movePoint = null;
		this._curPattern = AIActType.SPARE;
	}	

	public crash(){        
		this.stop();		
		super.crash();
    }  

	/**获取目标点的方位 */
	protected getDirectionFromMovePoint(){
		if(!this._movePoint){
			return;
		}
		if(this._movePoint.x > this.x + this.speed){
			this._dx = 1;
		}else if(this._movePoint.x < this.x - this.speed){
			this._dx = -1
		}else{
			this._dx = 0
		}
		if(this._movePoint.y > this.y + this.speed){
			this._dy = 1;
		}else if(this._movePoint.y < this.y - this.speed){
			this._dy = -1
		}else{
			this._dy = 0
		}
		
	}

	protected checkShouldShot(){
		if(!this._playerPosition){
			return;
		}
		if(this._playerPosition.x > this.x - this.width * 2 && this._playerPosition.x < this.x + this.width * 2){
			this._shouldShot = true;
		}else{
			this._shouldShot = false;
		}
	}

	/**获取最少子弹的移动方向 */
	protected getLessBulletDirection(){
		const tmp = Math.min(...this._bulletDistribute);
		for(let i = 0; i<this._bulletDistribute.length; i++){
			//机体位于边缘区域时不向那个方向躲避
			if(i == 0 && (this.x < this._border[0] || this.y < this._border[2])){
				continue;
			}
			if(i == 1 && (this.x > this._border[1] || this.y < this._border[2])){
				continue;
			}
			if(i == 2 && (this.x < this._border[0] || this.y > this._border[3])){
				continue;
			}
			if(i == 3 && (this.x > this._border[1] || this.y > this._border[3])){
				continue;
			}
			if(this._bulletDistribute[i] == tmp){
				switch(i){
					case 0:
					return [-1,-1];
					case 1:
					return [1,-1];
					case 2:
					return [-1,1];
					case 3:
					return [1,1]
				}
			}
		}
		let tmpdx = this.x > this._stage.stageWidth - this.x?-1:1;
		let tmpdy = this.y > this._stage.stageHeight - this.y?-1:1;		
		return [tmpdx, tmpdy]
	}
	

	// public static pool:Pool<EnemyPlane> = new Pool<EnemyPlane>(()=>{return new EnemyPlane()})	
}


/**
 * 检测x轴一定范围内的子弹和玩家，
 * 有子弹时回避，有玩家时射击，
 * 根据aicfg的积极性选择远离或接近玩家
 * 子弹距离小于一定值时冲刺移动
 * buff距离小于一定值时移动拾取（优先级低）
 */