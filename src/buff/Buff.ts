class Buff extends egret.EventDispatcher{			
	protected type:BuffType
	protected duration:number
	protected timer:egret.Timer
	protected owner:egret.Sprite
	protected label:string;
	/**	 
	 * @param type buff类型
	 * @param duration 持续时间
	 * @param label 显示在道具上的文字
	 */
	public constructor(type:BuffType, duration:number, label:string='') {
		super()
		this.type = type
		this.duration = duration
		this.label = label
		if(duration > 0){
			this.timer = new egret.Timer(this.duration, 1);
			this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.delBuff, this)
		}				
	}

	public delBuff(e:any=null){
		this.dispatchEvent(new egret.Event(PlayEvents.BUFF_LOSE));
		this.timer && this.timer.reset();
	}

	public getType():BuffType{
		return this.type
	}

	public startEffect(owner:egret.Sprite){
		this.owner = owner;
		if(this.timer){
			this.timer.start();
		}		
	}
}