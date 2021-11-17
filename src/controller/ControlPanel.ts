class ControlPanel extends eui.Component{
	private btn_shot:eui.Button;
	private btn_jet:eui.Button;
	private analog:eui.Component;
	private _stage:egret.Stage;

	private _curAnalogX:-1|0|1 = 0;
	private _curAnalogY:-1|0|1 = 0;
	private _stageAnalogX:number = 0;
	private _stageAnalogY:number = 0;

	public onDirectChange:(x:-1|0|1, y:-1|0|1)=>void
	public onKeyDown:(e:{keyCode:Keyboard})=>void
	public onKeyUp:(e:{keyCode:Keyboard})=>void

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
		this._stageAnalogX = this.analog.x + this.x;
		this._stageAnalogY = this.analog.y + this.y;

		this.btn_jet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPressDash, this)
	}

	private onPressShot(e){
		this.onKeyDown && this.onKeyDown({keyCode:Keyboard.Z});
	}

	private onReleaseShot(e){
		this.onKeyUp && this.onKeyUp({keyCode:Keyboard.Z});
	}

	private onPressDash(e){
		this.onKeyDown && this.onKeyDown({keyCode:Keyboard.X});
	}

	private onPressAnalog(e:egret.TouchEvent){
		let dx:-1|0|1 = 0;
		let dy:-1|0|1 = 0;
		if(e.stageX > this._stageAnalogX){
			dx = 1;
		}else if(e.stageX == this._stageAnalogX){
			dx = 0;
		}else if(e.stageX < this._stageAnalogX){
			dx = -1
		}
		if(e.stageY > this._stageAnalogY){
			dy = 1;
		}else if(e.stageY == this._stageAnalogY){
			dy = 0;
		}else if(e.stageY < this._stageAnalogY){
			dy = -1
		}
		
		if(dx == this._curAnalogX && dy == this._curAnalogY){
			return;
		}	
		this._curAnalogX = dx;
		this._curAnalogY = dy;
		this.onDirectChange(dx, dy);
	
	}

	private onReleaseAnalog(e){
		this._curAnalogX = 0;
		this._curAnalogY = 0;
		this.onDirectChange && this.onDirectChange(this._curAnalogX, this._curAnalogY);
	}

}