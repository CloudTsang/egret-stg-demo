class SoundManager {
	private _bgm:egret.Sound;
	private _bgmChannel:egret.SoundChannel;
	private _bgmPosition:number;
	private static _ins:SoundManager;
	public static instance(){
		if(!SoundManager._ins){
			SoundManager._ins = new SoundManager();
		}
		return SoundManager._ins
	}

	public constructor() {
		LifecycleCallback.addFunc('bgm', ()=>{this.pause()}, ()=>{this.resume()})
	}

	public play(name:string){
		if(this._bgm){
			this._bgmChannel.stop();
			this._bgm.close();			
		}
		this._bgm = RES.getRes(name)
		this._bgm.type = egret.Sound.MUSIC;
		this._bgmChannel = this._bgm.play();	
	}

	public resume(){
		if(!this._bgm){
			return;	
		}
		this._bgmChannel = this._bgm.play(this._bgmPosition);				
	}

	public pause(){
		if(this._bgm){	
			this._bgmPosition = this._bgmChannel.position
			this._bgmChannel.stop();	
			// this._bgm.close();				
		}
	}
}