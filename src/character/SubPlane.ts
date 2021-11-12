class SubPlane extends BasePlane {
    private _mainPlane:BasePlane;
    private _place:string;

    private _offsetX:number;
    private _offsetY:number;
    private _moveTween:egret.Tween;
    private readonly followDelay:number = 200;
	public constructor(mainPlane:BasePlane, place:"LEFT"|"RIGHT") {
		super()
        this.pWidth = 20;
        this.pHeight = 30;
        this.pColor = 0x228B22;
        this.draw();     
        this._mainPlane = mainPlane
        this._place = place;
        if(place == "LEFT"){
            this._offsetX =  - mainPlane.width/2 - this.width - 50;            
        }else{
            this._offsetX =  mainPlane.width/2 + this.width + 50;
        }   
        this._offsetY = mainPlane.height/2 - this.height/2;
        this.x = mainPlane.x + this._offsetX     
        this.y = mainPlane.y + this._offsetY;
        mainPlane.parent.addChild(this)
        mainPlane.addEventListener(PlayEvents.PLAYER_SHOT, this.shot, this);        
        this.bulletGenerator = mainPlane.getBulletGenerator();
        this.move(0,0)
	}

    protected draw(){
        let bmp = new egret.Bitmap();		
		bmp.texture = RES.getRes('plane2_png');
		bmp.width = this.pWidth*4;
		bmp.height = this.pHeight*4;
		bmp.x = -this.pWidth*2;
		bmp.y = -this.pHeight*2;
		this.addChild(bmp);		
    }

    public dispose(){
        if(this._moveTween){
            this._moveTween.pause();
            this._moveTween = null;
        }
        this._mainPlane.removeEventListener(PlayEvents.PLAYER_SHOT, this.shot, this);        
        this.removeChildren();
        this.parent && this.parent.removeChild(this);        
        
    }
  

    public move(dx:number, dy:number){
        let targetX = this._mainPlane.x + this._offsetX;
        let targetY = this._mainPlane.y + this._offsetY;
        if(targetX == this.x && targetY == this.y){
            this._moveTween =  egret.Tween.get(this).wait(200).call(this.move, this, [0,0]);            
        }else{            
            let obj = {x:targetX, y:targetY};            
            this._moveTween =  egret.Tween.get(this).to(obj, 200).call(this.move, this, [0,0]);
        }    
    }    

    public shot(){            
        let b = this.bulletGenerator.getOne()
        b.x = this.x;
        b.y = this.y - this.pHeight - 50;                
        b.setDirection(0,-1)
        this.parent.addChild(b);
        b.shoot()                              
    }
}