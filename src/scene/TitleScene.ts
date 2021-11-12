class TitleScene  extends egret.Sprite
{
	private _descript: eui.Component
	private _startBtn: eui.Button;
	private _stage = egret.MainContext.instance.stage;
	private bgm:egret.Sound
	private soundChannel:egret.SoundChannel;
	public constructor(stage:egret.Stage) {
		super();		 
		 
		this.x = 0;
		this.y = 0;    
		this.width = this._stage.stageWidth;
		this.height = this._stage.stageHeight;
		let tex:egret.Texture = RES.getRes('bg2_png');
		let bmp:egret.Bitmap = new egret.Bitmap(tex);
		bmp.width = this.width;
		bmp.height = this.height;
		this.addChild(bmp)

		this._descript = new eui.Component();
		this._descript.skinName = 'resource/eui_skins/Description.exml'
		this._descript.x = (this._stage.stageWidth - this._descript.width)/2;
		this._descript.y = 200;
		this.addChild(this._descript);
		
		this._startBtn = new eui.Button();
		this._startBtn.skinName = 'resource/eui_skins/ButtonSkin.exml'
		this._startBtn.label = '开始'
		this._startBtn.width = 300;
		this._startBtn.height = 100;
		(this._startBtn.labelDisplay as eui.Label).size = 50;
		this._startBtn.x = (this._stage.stageWidth - this._startBtn.width)/2;
		this._startBtn.y = this._stage.stageHeight - 150;
		
		this.addChild(this._startBtn);
		this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=>{
			this.dispatchEvent(new egret.Event(PlayEvents.START))
		}, this)

		SoundManager.instance().play('title_mp3');
	}

	public dispose(){
		
	}
}