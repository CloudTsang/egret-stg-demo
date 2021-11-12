/**强化子弹 */
class BulletLV2 extends Bullet{	
	public constructor() {
		super(15, 0xFFD700, 0, -1, 30);
	}

	protected draw(){
		let bmp = new egret.Bitmap();		
		bmp.texture = RES.getRes('bullet_png');
		bmp.width = this.size*2;
		bmp.height = this.size*2;
		bmp.x = -this.size
		bmp.y = -this.size;
		this.addChild(bmp);		
		this._sp = bmp;
	}

	public refreshPosition(){
		this.position = new egret.Point(this.x, this.y);
		this.collisionPoints = [new egret.Point(this.x, this.y-this.width), new egret.Point(this.x-this.width, this.y), new egret.Point(this.x+this.width, this.y)];
	}

	public getCollisionPoints():egret.Point[]{
		return this.collisionPoints
	}

	public static pool:Pool<BulletLV2> = new Pool<BulletLV2>(()=>{
		let b = new BulletLV2()
		Bullet.allArr.push(b);
		return b;
	})
}