class DirectionPlus2BullectBuff extends Buff {
	public constructor(duration:number = -1) {
		super(BuffType.BULLECT_BOOST_PLUS2DIRECT, duration, '+2');
	}
	public startEffect(owner:egret.Sprite){
		super.startEffect(owner);
		this.owner = owner;
		let p:BasePlane = owner as BasePlane;	
		if(p.bulletDirections.length == 1){
			p.bulletDirections = [[-1,-1], [0,-1], [1,-1]]
		}else if(p.bulletDirections.length == 3){
			p.bulletDirections = [[-1,0],[-1,-1], [0,-1], [1,-1],[1,0]]
		}
	}

	public delBuff(e:any=null){
		let p:BasePlane = this.owner as BasePlane;	
		if(p.bulletDirections.length == 5){
			p.bulletDirections = [[-1,-1], [0,-1], [1,-1]]
		}else if(p.bulletDirections.length == 3){
			p.bulletDirections = [[0, -1]]
		}
		super.delBuff(e)
	}
}