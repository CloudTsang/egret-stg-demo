/**普通子弹*/
class Bullet extends CollisionObject implements IPoolObject{		
	protected size;
	protected color;
	protected directX;
	protected directY;
	protected speed;
	private _stage = egret.MainContext.instance.stage;
	protected _sp:egret.DisplayObject;
	protected _blastBmp:egret.Bitmap;
	protected _blastPartical:particle.GravityParticleSystem

	protected collisionPoints:egret.Point[]
	public activate:boolean = false;	
	public constructor(size=10, color=0xFFFACD, dx=0, dy=-1, spd=20) {
		super()
		this.size = size;
		this.color = color;
		this.directX = dx;
		this.directY = dy;
		this.speed = spd;
		this.draw();		
		// this.drawBlast();	
		this.loadPartical();
		
	}

	public setDirection(dx=0, dy=-1){
		this.directX = dx;
		this.directY = dy;
	}

	public shoot(){		
		this.activate = true;
		this._sp.visible = true;
		if(this._blastBmp)this._blastBmp.visible = false;
		if(this._blastPartical)this._blastPartical.visible = false;
	}
	public onFly(e:any = null){		
		this.x += this.directX*this.speed;
		this.y += this.directY*this.speed;
		if(this.x < -100 
		|| this.x > this._stage.stageWidth
		|| this.y < -100
		|| this.y > this._stage.stageHeight){
			this.disposeImmediately();
		}
	}

	public dispose(){		
		this.blast();		
		setTimeout(()=>{
			this.activate = false;
			this.parent && this.parent.removeChild(this);	
		}, 200);				
	}

	public disposeImmediately(){
		this.activate = false;
		this.parent && this.parent.removeChild(this);	
	}

	protected draw(){
		let sp = new egret.Sprite();		
		sp.graphics.beginFill(this.color);
		sp.graphics.drawCircle(0,0, this.size);
		sp.graphics.endFill();			
		sp.x = -this.size/2
		sp.y = -this.size/2
		this.addChild(sp)
		this._sp = sp;	
		this._sp.visible = true;	
	}	

	private drawBlast(){
		let bmp = new egret.Bitmap();		
		bmp.texture = RES.getRes('sheet_json#bulletblast');
		bmp.width = this.size*4;
		bmp.height = this.size*4;
		bmp.x = -this.size*2;
		bmp.y = -this.size*2;
		this.addChild(bmp);		
		this._blastBmp = bmp;		
		this._blastBmp.visible = false;
	}

	private loadPartical(){
		this._blastPartical = new particle.GravityParticleSystem(RES.getRes('blast_png'), RES.getRes('blast_json'));	
		this.addChild(this._blastPartical);	
	}

	protected blast(){		
		this._sp.visible = false;
		if(this._blastBmp)this._blastBmp.visible = true;
		if(this._blastPartical){
			this._blastPartical.visible = true;
			this._blastPartical.start();
		}
	}

	public refreshPosition(){
		super.refreshPosition();
		this.collisionPoints = [new egret.Point(this.x, this.y)];
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

	public static pool:Pool<Bullet> = new Pool<Bullet>(()=>{
		let b = new Bullet()
		Bullet.allArr.push(b);
		return b;
	})	

	public static allArr:Bullet[] = []	
}