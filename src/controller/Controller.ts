class Controller {
	private static ins:Controller;	
	public static getInstance():Controller{
		if(!Controller.ins){
			Controller.ins = new Controller();
		}
		return Controller.ins;
	}
	private _controllee:BasePlane;
	private _lock:boolean = true;
	private _shotTriggered:boolean = false;
	private _directX:number = 0;
	private _directY:number = 0;
	private _panel:ControlPanel;
	public constructor() {		
		document.addEventListener('keydown', (e)=>{this.onKeyDown(e)});
		document.addEventListener('keyup', (e)=>{this.onKeyUp(e)})		
	}	

	public setPanel(cp:ControlPanel){
		cp.onDirectChange = (x,y)=>{this.setDirect(x,y)};
		cp.onKeyDown = (e)=>{this.onKeyDown(e)};
		cp.onKeyUp = (e)=>{this.onKeyUp(e)};
		this._panel = cp;		
	}

	public setControllee(p:BasePlane){
		this._controllee = p;
	}

	public setLock(v:boolean){
		this._lock = v
	}

	public btnTrigger(e:any=null){		
		if(this._directX!=0 || this._directY!=0){
			this._controllee.move(this._directX, this._directY);		
		}								
		if(this._shotTriggered){
			this._controllee.shot();
		}		
	}

	private onKeyDown(e:any){	
		if(this._lock){
			return;
		}				
		switch(e.keyCode){
			case Keyboard.Z: //射击
				this._shotTriggered = true;
				break;
			case Keyboard.X: //冲刺
				this._controllee.dash(this._directX, this._directY)
				break;
			case Keyboard.C: //TODO:导弹
				break;
			case Keyboard.LEFT:
				this._directX = -1;
				break;
			case Keyboard.UP:
				this._directY = -1;
				break;
			case Keyboard.RIGHT:
				this._directX = 1;
				break;
			case Keyboard.DOWN:
				this._directY = 1;				
				break;
		}
	}	

	private onKeyUp(e:any){
		switch(e.keyCode){
			case Keyboard.Z: 	
				this._shotTriggered = false;
				break;
			case Keyboard.X: 
				break;
			case Keyboard.C:
				break;
			case Keyboard.LEFT: 
				if(this._directX == -1){
					this._directX = 0;
				}
				break;
			case Keyboard.UP:
				if(this._directY == -1){
					this._directY = 0;
				}
				break;
			case Keyboard.RIGHT:
				if(this._directX == 1){
					this._directX = 0
				}
				break;
			case Keyboard.DOWN:
				if(this._directY == 1){
					this._directY = 0
				}
				break;
		}
	}

	public setDirect(x:-1|0|1, y:-1|0|1){
		this._directX = x;
		this._directY = y;
	}

	
}

