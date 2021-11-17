class BaseCharacter extends CollisionObject{
	public maxHP:number = 1;
	public HP:number;
	protected _stage = egret.MainContext.instance.stage;        
	
	public constructor() {
		super();
		this.HP = this.maxHP;		
	}

	public hit(){		
		this.HP --;		
	}

	public isDefeated(){
		return this.HP == 0;
	}
}