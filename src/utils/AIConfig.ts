class AIConfig {
	/**积极性 */
	private _positiveRate:number = 0.5
	/**回避玩家射击的比率 */
	private _evadeRate:number = 1
	/**玩家移动时主动追击玩家的比率	 */
	private _traceRate:number = 0.7
	/**回避后追击玩家到攻击范围内的比率 */
	private _traceAfterEvadeRate:number = 0.8
	/**成功追击玩家后发动攻击的比率	 */
	private _attackAfterTraceRate: number = 0.5

	/**主动移动的比率*/
	private _moveOnFreeRate: number = 0.6 
	/**主动攻击的比率	 */
	private _attackOnFreeRate: number = 0.2 
	/**使用冲刺追击比率 */
	private _dashTraceRate: number = 0.4 
	/**使用冲刺回避比率 */
	private _dashEvadeRate: number = 0.8 

	/**反应速度 */
	private _reDelay:number = 100 
	/**追击成功后的攻击速度 */
	private _attackDelay: number = 20 
	/**主动变换行为的间隔 */
	private _decisionDuration: number = 5000
	/**双机距离大于该值时强行使用消极策略*/	
	private _negativeDistance:number = 500

	/**距离小于多少机位时会主动追击 */
	private _traceDistance:number = 3;
	
	private _me:BasePlane;
	private _isPositive:boolean	
	private _timer:egret.Timer;
	public constructor(me:BasePlane, params:any=null) {
		this._me = me
		this._timer = new egret.Timer(this._decisionDuration);
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
	}

	public checkIfPositive(){
		if(this._me.getCurDashGauge() == 0){
			return false
		}		
		return this._isPositive;
	}	

	private onTimer(e){
		this._isPositive = Math.random() < this._positiveRate;
	}	
	
	public static getAICfg(ty:AIType){
		switch(ty){
			case AIType.NORMAL:
				return {}
			case AIType.ROOKIE:
				break	
			case AIType.ELITE:
				break
			case AIType.EXTREME:
				break
		}
	}

}

/**
 * 考虑因素：两机体位置，最近一颗？子弹的位置，最近一个？buff位置（buff对ai的权重暂不考虑），本机的冲刺槽
 * 积极：无论子弹数量总是靠近玩家并发动攻击， 
 * 消极：向子弹数量少的一侧（无论是否远离玩家）移动
 * 本机冲刺槽为0期间总是消极，主动远离比率上升
 * 处于positive状态时delay参数x0.9？
 */
