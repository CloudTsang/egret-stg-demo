class ControlPanel extends eui.Component{
	private btn_shot:eui.Button;
	private btn_jet:eui.Button;
	private analog:eui.Component;
	private _stage:egret.Stage;

	private _curAnalogX:number = 0;
	private _curAnalogY:number = 0;

	public onDirectChange:(x:-1|0|1, y:-1|0|1)=>void

	public constructor(stage:egret.Stage) {
		super();
		this.skinName = 'resource/eui_skins/ControlPanel.exml'
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initData, this);
		this._stage = stage;
	}

	private initData(e:any){
		this.width = this._stage.stageWidth;		
		this.btn_shot.x = this.width - this.btn_shot.width;
		this.btn_jet.x = this.btn_shot.x	
		this.btn_shot.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPressShot, this)	
		this.btn_shot.addEventListener(egret.TouchEvent.TOUCH_END, this.onReleaseShot, this)
		this.btn_shot.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onReleaseShot, this)

		this.analog.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPressAnalog, this)		
		this.analog.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onPressAnalog, this)
		this.analog.addEventListener(egret.TouchEvent.TOUCH_END, this.onReleaseAnalog, this)
		this.analog.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onReleaseAnalog, this)

		this.btn_jet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPressDash, this)
	}

	private onPressShot(e){

	}

	private onReleaseShot(e){

	}

	private onPressDash(e){

	}

	private onPressAnalog(e){

	}
	private onReleaseAnalog(e){
		this._curAnalogX = 0;
		this._curAnalogY = 0;

	}

}