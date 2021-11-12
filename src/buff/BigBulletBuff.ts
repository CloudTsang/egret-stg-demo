class BigBulletBuff extends Buff{
	public constructor(duration:number = -1) {
		super(BuffType.BULLET_BOOST_BIG, duration, "B")		
	}

	public startEffect(owner:egret.Sprite){
		this.owner = owner;
		let p:BasePlane = owner as BasePlane;	
		p.setBulletGenerator(BulletLV2.pool)
		Bullet.allArr = []
	}

	public delBuff(e:any=null){
		let p:BasePlane = this.owner as BasePlane;	
		p.setBulletGenerator(Bullet.pool)
		super.delBuff(e)
		Bullet.allArr = []
	}
}