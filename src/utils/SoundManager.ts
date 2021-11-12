class SoundManager {
	private _bgm:egret.Sound;
	private _bgmChannel:egret.SoundChannel;
	
	private static _ins:SoundManager;
	public static instance(){
		if(!SoundManager._ins){
			SoundManager._ins = new SoundManager();
		}
		return SoundManager._ins
	}

	public constructor() {

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

	public pause(){
		if(this._bgm){
			this._bgmChannel.stop();			
		}
	}
}