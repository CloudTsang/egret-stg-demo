/**漂流道具 
 * 在屏幕Y轴一定范围内上下往复移动，被击中maxHP后变成buff
*/
class Drift extends BaseCharacter{		
	public buff:{type:BuffType, defaultDuration:number, label:string} = null;

	private _speedX:number;
	private _speedY:number;
	private _topY:number;
	private _bottomY:number;

	private _directionX:number = 1;
	private _directionY:number = 1;

	private _leftBorder:number;
	private _rightBorder:number;
	protected collisionPoints:egret.Point[]
	
	public constructor() {
		super();
		this.maxHP = 3;
		this.HP = 3;
		this.draw();
		let percentageY = Math.floor(Math.random()*5)/10 + 0.4;
		
		this._topY = (this._stage.stageHeight - this._stage.stageHeight * percentageY)/2;
		this._bottomY = this._stage.stageHeight - this._topY;		

		this._directionX = Math.floor(Math.random()*2)*2-1;
		this._rightBorder = this._stage.stageWidth + 100;
		this._leftBorder = -100;
		if(this._directionX == -1){
			this.x = this._rightBorder;
		}else{
			this.x = this._leftBorder;
		}
		this.y = Math.floor(Math.random()*(this._bottomY-this._topY)) + this._topY;
		this._speedX = (Math.random()*3+3) * this._directionX;
		this._speedY = (Math.random()*15+10) * this._directionY;
		
	}

	public move(){		
		this.y += this._speedY;
		this.x += this._speedX;
		if(this.y >= this._bottomY && this._directionY == 1){
			this._directionY = -this._directionY;
			this._speedY = -this._speedY;
		}else if(this.y <= this._topY && this._directionY == -1){
			this._directionY = -this._directionY;
			this._speedY = -this._speedY;
		}
	
		if(this.x < -100 || this.x > this._rightBorder){
			this.dispatchEvent(new egret.Event(PlayEvents.DRIFT_MISS));
			return false;
		}
		return true;
	}

	private draw(){
		let bmp = new egret.Bitmap();		
		bmp.texture = RES.getRes('drift_png');
		bmp.width = 80;
		bmp.height = 80;
		bmp.x = 0;
		bmp.y = 0;		
		this.addChild(bmp);		
	}

	public change2Buff(ty:BuffType=null){
		if(!ty){
			let arr = [BuffType.BULLET_BOOST_BIG,BuffType.BULLECT_BOOST_PLUS2DIRECT,BuffType.INVINSIBLE,BuffType.SUB_PLANE]
			// let arr = [BuffType.INVINSIBLE]
			ty = arr[Math.floor(Math.random()*arr.length)]
		}		
		let data = BuffManager.getBuffData(ty);
		this.buff = data;
		this.drawBuff();
	}

	private drawBuff(){
		if(!this.buff){
			return;
		}
		let bmp = new egret.Bitmap();
		bmp.texture = RES.getRes('buff_png');
		bmp.width = 100;
		bmp.height = 100;
		bmp.x = 0;
		bmp.y = 0;

		let label = new egret.TextField();
		label.bold = true;
		label.size = 80;
		label.textColor = 0x000000;
		label.width = 100;
		label.height = 100;
		label.verticalAlign = egret.VerticalAlign.MIDDLE;
		label.textAlign = egret.HorizontalAlign.CENTER;
		
		label.text = this.buff.label;

		this.removeChildren();		
		this.addChild(bmp);
		this.addChild(label);
	}

	public dispose(){
		this.parent && this.parent.removeChild(this)
	}

	public refreshPosition(){
		this.position = new egret.Point(this.x, this.y);
		this.collisionPoints = [new egret.Point(this.x+this.width/2, this.y+this.height/2)]
	}

	public getCollisionPoints():egret.Point[]{
		return this.collisionPoints;
	}

	public collisionCheck(sp:egret.DisplayObject):boolean{		
		for(let p of this.getCollisionPoints()){
			if(sp.hitTestPoint(p.x, p.y)){
				return true;
			}
		}
		return false;
	}
}