class Pool<T extends IPoolObject> {
	private _arr:T[]
	private _func:()=>T;
	public constructor(func:()=>T){
		this._arr = []
		this._func = func;
	}	

	public getOne():T{
		let ret:T = null;
		for(let obj of this._arr){
			if(!obj.activate){
				// console.log("old object");
				ret = obj;
				break;
			}
		}
		if(!ret){
			// console.log("new object");
			ret = this._func();
			this._arr.push(ret);
		}
		ret.activate = true;
		// ret.addEventListener(PlayEvents.RECYCLEABLE, this.recycle, this)
		return ret;
	}

	private recycle(e:egret.Event=null){
		// console.log("recycle");
		let obj:T = e.target;
		obj.activate = false;
	}

	public dispose(){
		this._arr = null;
		this._func = null;		
	}
}

interface IPoolObject extends egret.IEventDispatcher{
	activate:boolean;	
}

