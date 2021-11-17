class BasePlane extends BaseCharacter{
	protected pWidth = 30;
    protected pHeight = 50;
	protected pColor = 0xFFFFFF;
    protected speed = 10;    
    /**射击间隔 */
    protected shotSpeed = 200;
    /**射击间隔timer */
    protected shotTimer:egret.Timer;

    protected dashing = false;
    protected dashDistance = 200;
    protected dashSpeed = 250;
    protected maxDashGauge = 3;
    protected curDashGauge = 3;
    /**冲刺槽回复timer  */
    protected dashGaugeTimer:egret.Timer; 

    /**子弹生成池*/    
    protected bulletGenerator:Pool<Bullet>;
    /**子弹方向数组 */
    public bulletDirections:number[][];        

    protected buffManager:BuffManager;    
    /**右边界 */
    protected _right:number;
    /**下边界 */
    protected _bottom:number;       

    protected collisionPoints:egret.Point[]        
	public constructor() {
		super();        
        this.buffManager = new BuffManager(this);
        this.dashGaugeTimer = new egret.Timer(3000);
        this.dashGaugeTimer.addEventListener(egret.TimerEvent.TIMER, this.onDashRecover, this);        
        this._right = egret.MainContext.instance.stage.stageWidth;
        this._bottom = egret.MainContext.instance.stage.stageHeight;    
        this.shotTimer = new egret.Timer(this.shotSpeed, 1);
	}

    public onPause(){
        this.dashGaugeTimer.stop();
        this.shotTimer.stop();
        this.buffManager.onPause();
    }

    public onResume(){
        this.dashGaugeTimer.start();
        this.shotTimer.start();
        this.buffManager.onResume();
    }

	protected draw(){
        this.graphics.beginFill(this.pColor)
        this.graphics.moveTo(-this.pWidth, this.pHeight);
        this.graphics.lineTo(this.pWidth, this.pHeight);
        this.graphics.lineTo(0, -this.pHeight);
        this.graphics.endFill()       
    }    

    public move(dx:number, dy:number){
        if(this.dashing){
            return;
        }
        let posX = this.x + dx*(this.speed+this.pWidth);
        let posY = this.y + dy*(this.speed+this.pHeight);        
        if(0>posX){
            return;
        }
        if(this._right<posX){
            return;
        }
        if(0>posY){
            return;
        }
        if(this._bottom<posY){
            return;
        }
        this.x += dx*this.speed;
        this.y += dy*this.speed;
    }

    public dash(dx:number, dy:number){
        if(this.dashing){
            return;
        }
        if(this.curDashGauge == 0){
            return;
        }
        if(dx == 0 && dy == 0){
            return;
        }
        if(!this.dashGaugeTimer.running){
            this.dashGaugeTimer.start();
        }
        this.curDashGauge --;
        this.dashing = true;
        let posX = this.x + dx * this.dashDistance;
        let posY = this.y + dy * this.dashDistance;
        
        let spd = this.dashSpeed;

        //边界判断,冲刺到边界并缩短冲刺时间
        let borderDash = false
        if(0>posX){
            borderDash = true
            posX = this.pWidth
        }else if(this._right<posX){
            borderDash = true
            posX = this._right - this.pWidth
        }
        if(0>posY){
            borderDash = true
            posY = this.pHeight
        }else if(this._bottom<posY){
            borderDash = true
            posY = this._bottom - this.pHeight
        }          
        if(borderDash){
            let p1 = new egret.Point(this.x, this.y);
            let p2 = new egret.Point(posX, posY)
            let dis = egret.Point.distance(p1,p2)
            spd = dis*this.dashSpeed/this.dashDistance
        }  
        let obj = {x: posX, y: posY};
        egret.Tween.get(this).to(obj, spd).call(()=>{this.dashing=false});
    }

    protected onDashRecover(e:any){
        if(this.curDashGauge < this.maxDashGauge){
            this.curDashGauge ++;
        }
        if(this.curDashGauge == this.maxDashGauge){
            this.dashGaugeTimer.reset();
        }
    }
    /**是否正处于无敌、冲刺无敌中 */
    public isInvinsible():boolean{
        return this.dashing || this.buffManager.invinsibleBuff!=null;
    }

    public shot(){        
        if(this.shotTimer.running){
            return;
        }       
        for(let i=0; i<this.bulletDirections.length; i++){
            let b = this.bulletGenerator.getOne()
            b.x = this.x;
            b.y = this.y - this.pHeight - 50;
            
            let d = this.bulletDirections[i];
            b.setDirection(d[0], d[1])
            this.parent.addChild(b);
            b.shoot()                        
        }        
        this.shotTimer.start()        
    }

    public setBulletGenerator(pl:Pool<Bullet>){
        this.bulletGenerator = pl
    }

    public getBulletGenerator(){
        return this.bulletGenerator
    }

    public getCurDashGauge(){
        return this.curDashGauge;
    }

    public setBuff(ty:BuffType, duration:number){
        this.buffManager.getBuff(ty, duration);
    }
    

    /**被击坠 */
    public crash(){
        this.buffManager.dispose()
        this.parent && this.parent.removeChild(this)
    }    

    public refreshPosition(){
		super.refreshPosition();
		this.collisionPoints = [new egret.Point(this.x-this.pWidth, this.y),
                                new egret.Point(this.x+this.pWidth, this.y),
                                new egret.Point(this.x, this.y-this.pHeight),
                                new egret.Point(this.x, this.y+this.pHeight),
                                ]
	}

    public getCollisionPoints():egret.Point[]{
		return this.collisionPoints;
	}	

    public collisionCheck(sp:egret.DisplayObject):boolean{		
		for(let p of this.getCollisionPoints()){
			if(sp.hitTestPoint(p.x, p.y)){
				return true;
			}
		}
		return false;
	}
   
}