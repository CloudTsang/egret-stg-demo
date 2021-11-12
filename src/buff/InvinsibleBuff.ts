class InvinsibleBuff extends Buff{
	private _invisibleTween:egret.Tween;
	public constructor(duration:number=3000) {
		super(BuffType.INVINSIBLE, duration, "★")
	}

	public startEffect(owner:egret.Sprite){		
		this.owner = owner;
		this._invisibleTween = egret.Tween.get(this.owner,{loop:true}).set({ alpha: 0}).wait(100).set({ alpha: 1}).wait(100)	
		if(this.timer){
			this.timer.start();
		}	
	}

	public delBuff(e:any=null){
		this._invisibleTween.pause().set({alpha:1})
		super.delBuff(e)
	}
}