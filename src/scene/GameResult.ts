class GameResult extends eui.Component{
	private txt_type:eui.Label
	private txt_hit_type:eui.Label
	private txt_time:eui.Label
	private txt_bullet:eui.Label
	private txt_hit:eui.Label
	private btn_retry:eui.Button
	private _time:number
	private _bullet:number
	private _hit:number
	private _clear:boolean
	private _callBack:(e)=>void
	/**
	 * 结果面板
	 * @param t 时间
	 * @param b 子弹数
	 * @param h 被击中数
	 */
	public constructor(clear:boolean, t:number, b:number, h:number, retryCb:(e)=>void=null) {
		super();
		this.skinName = 'resource/eui_skins/GameResult.exml'
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initData, this);
		this._clear = clear;
		this._time = t;
		this._bullet = b;
		this._hit = h;
		this._callBack = retryCb;
	}
	private initData(){
		if(this._clear){
			this.txt_type.text = 'Stage Clear'
			this.txt_hit_type.text = '被击中次数'
		}else{
			this.txt_type.text = 'Game Over'
			this.txt_hit_type.text = '击中次数'
		}
		this.txt_hit.text = this._hit + '次';
		this.txt_bullet.text = this._bullet + '颗';

		let sec = Math.round(this._time / 1000);
		let min = Math.floor(sec/60);
		if(min == 0){
			this.txt_time.text = sec + '秒'
		}else{
			let rest = sec%60;			
			this.txt_time.text = min+ '分 '+rest + '秒'
		}
		
		this.btn_retry.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}

	public dispose(){
		this.btn_retry.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.parent && this.parent.removeChild(this)
	}

	private onClick(e:any){
		if(this._callBack){
			this._callBack(e);
		}else{
			this.dispatchEvent(new egret.Event(PlayEvents.CLEAR));
		}
	}
}