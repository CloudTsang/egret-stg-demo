class Direction3BulletBuff extends Buff{
	public constructor(duration:number = -1) {
		super(BuffType.BULLET_BOOST_3DIRECT, duration, "+2")		
	}

	public startEffect(owner:egret.Sprite){
		this.owner = owner;
		let p:BasePlane = owner as BasePlane;	
		p.bulletDirections = [[-1,-1], [0,-1], [1,-1]]
	}
}