class PlayerPlane extends BasePlane{
    public dashGauge:DashGauge;    
    public constructor(){
        super()
        this.maxHP = 5;
        this.HP = 5;
        this.pWidth = 30;
        this.pHeight = 50;
        this.pColor = 0x00FF00;
        this.draw();     
        
        this.bulletDirections = [[0,-1]]        
        this.bulletGenerator = Bullet.pool;         
    }

    protected draw(){
        let bmp = new egret.Bitmap();		
		bmp.texture = RES.getRes('sheet_json#plane1');
		bmp.width = this.pWidth*4;
		bmp.height = this.pHeight*4;
		bmp.x = -this.pWidth*2;
		bmp.y = -this.pHeight*2;
		this.addChild(bmp);		
    }

    public dash(dx:number, dy:number){
        super.dash(dx, dy)
        if(this.dashGauge){
            this.dashGauge.setDashTime(this.curDashGauge);
        }
    }

    protected onDashRecover(e:any){
        super.onDashRecover(e);
        if(this.dashGauge){
            this.dashGauge.setDashTime(this.curDashGauge);
        }
    }

    public crash(){        
        super.crash();
        this.dispatchEvent(new egret.Event(PlayEvents.GAME_OVER));
    }

    public shot(){
        if(this.shotTimer.running){
            return;
        }     
        super.shot();     
        this.dispatchEvent(new egret.Event(PlayEvents.PLAYER_SHOT));        
    }

}