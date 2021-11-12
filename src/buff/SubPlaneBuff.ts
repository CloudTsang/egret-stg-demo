class SubPlaneBuff extends Buff {
	private _subA:SubPlane
	private _subB:SubPlane
	public constructor(duration:number = -1) {
		super(BuffType.SUB_PLANE, duration, 'S');
	}

	public startEffect(owner:egret.Sprite){
		super.startEffect(owner);
		this.owner = owner;	
		let mainP:BasePlane = owner as BasePlane
		this._subA = new SubPlane(mainP, "LEFT");
		this._subB = new SubPlane(mainP, "RIGHT");		
	}

	public delBuff(e:any=null){
		this._subA.dispose();
		this._subB.dispose();
		super.delBuff(e);
	}
}