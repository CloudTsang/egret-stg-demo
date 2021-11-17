class StageScene extends egret.Sprite{

    private _player:PlayerPlane;
    private _enemy:BasePlane[] = [];
    private _dashGauge:DashGauge;
    private _drift:Drift;
    private _playerController:Controller;
    private _controlPanel:ControlPanel;
    private _stage = egret.MainContext.instance.stage;

    private _txtTip:egret.TextField;
    private _driftTimer:egret.Timer;

    private _buffRate:number = 0.5;

    private _collisionCheckInterval:number = 0;

    private _startTime:number;
    private _playerBullet:number;
    private _playerHit:number;
    private _enemyHit:number;
    private _gameResult:GameResult;
    private _bg:egret.Bitmap;

    private bgm:egret.Sound;
    private soundChannel:egret.SoundChannel;
    constructor(stage:egret.Stage){
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
        this._bg = bmp;
        LifecycleCallback.addFunc('StageScene', ()=>{this.onPause()}, ()=>{this.onResume()})

    }

    public startPlay(){
        if(this.bgm){
            this.soundChannel.stop();
            this.soundChannel = null;
            this.bgm.close();
            this.bgm = null
        }
        this._gameResult && this._gameResult.dispose();

        this.initPlayer();
        this.createEnemy();
        this.initUI();
        this.createDrift();
        this.addEventListener(egret.Event.ENTER_FRAME, this.refreshStage, this);
        this._startTime = egret.getTimer();
        this._playerBullet = 0;
        this._playerHit = 0;
        this._enemyHit = 0;
    }

    private cleanStage(){
        try{                 
            this.removeEventListener(egret.Event.ENTER_FRAME, this.refreshStage, this);
            this._player.crash();            
            this._player = null;            
            for(let e of this._enemy){
                e.crash();
            }
            this._enemy = []
            this._driftTimer.stop();
            this._driftTimer.removeEventListener(egret.TimerEvent.TIMER, this.onDriftTimer, this)  ;
            this._driftTimer = null;            
            this._drift && this._drift.dispose();
            this._drift = null        

            this.removeChild(this._dashGauge)
            if(this._controlPanel)this.removeChild(this._controlPanel);

            for(let b of Bullet.allArr){
                b.disposeImmediately()
            }   
            for(let b of EnemyBullet.allArr){
                b.disposeImmediately()
            }                                         
        }catch(e){
            console.log(e);
        }
    }

    private initPlayer(){
        const initVinsDuration = 3000;
        let player = new PlayerPlane();
        let ctrller = Controller.getInstance();
        ctrller.setControllee(player);
        this._player = player;        
        this._playerController = ctrller;

        player.x = this.stage.width/2 - player.width;
        player.y = this.stage.height + player.height;                
        player.setBuff(BuffType.INVINSIBLE, 3000)
        // player.setBuff(BuffType.BULLET_BOOST_BIG, -1);
        // player.setBuff(BuffType.BULLET_BOOST_5DIRECT, -1);
        // setTimeout(()=>{player.setBuff(BuffType.SUB_PLANE, 5000)}, 3000);        
        egret.Tween.get(player).to({y:this.stage.height - player.height - 80}, 1000).call(ctrller.setLock, ctrller, [false])    
        player.addEventListener(PlayEvents.PLAYER_SHOT, (e)=>{
            this._playerBullet++
        }, this)
        this.addChild(player);                                
    }    

    private createEnemy(){  
        let difficulty = Math.random();        
        // difficulty = 0.1
        let enemy:BasePlane;        
        let bgmName = 'normal_mp3'
        if(difficulty > 0.5){            
            enemy = new EnemyPlane();
        }else if(difficulty > 0.2){            
            enemy = new EliteEnemyPlane();
            bgmName = 'elite_mp3'
        }else{
            enemy = new ExtremeEnemyPlane();
            bgmName = 'extreme_mp3'
        }

        SoundManager.instance().play(bgmName);
        
        enemy.x = this.stage.width/2 + enemy.width;
        enemy.y = -enemy.height;
        egret.Tween.get(enemy).to({y:100}, 1000).call(()=>{
            this._enemy.push(enemy);     
        }, this)
        this.stage.addChild(enemy);
        
        // enemy.shot()   
    }

    private initUI(){        
        if(egret.Capabilities.os.indexOf("Windows")<0){
            let cp = new ControlPanel(this._stage);
            cp.y = this._stage.stageHeight - cp.height;
            this.addChild(cp);
            this._controlPanel = cp;
            this._playerController.setPanel(cp);
        }
       
        let dg = new DashGauge();
        dg.setDashTime(3);
        dg.x = this._stage.stageWidth-200;
        dg.y = this._stage.stageHeight - dg.height;
        this._dashGauge = dg            
        this.addChild(this._dashGauge)              
        this._player.dashGauge = this._dashGauge;
    }

    /**开启漂流物生成timer */
    private createDrift(){
        this._driftTimer = new egret.Timer(2000);
        this._driftTimer.addEventListener(egret.TimerEvent.TIMER, this.onDriftTimer, this)  
        this._driftTimer.start();
    }
    private onDriftTimer(e:any){  
        if(Math.random()<this._buffRate || this._drift) {
            return;
        }
        if(this._driftTimer.currentCount%10 != 0){
            return;
        }
        this._drift = new Drift();        
        this.addChildAt(this._drift, 1);
    }

    private refreshStage(e:any){
        //自机操作的刷新
        this._playerController.btnTrigger()

        this.refreshAllPosition(); 

        if(this._collisionCheckInterval!=3){
            //每3帧进行一次碰撞检测            
            this._collisionCheckInterval++
            return;
        }     
        this._collisionCheckInterval=0;

        //自机和敌机的碰撞
        if(!this._player.isInvinsible()){
            for(let e of this._enemy){           
                if(!e.isInvinsible() && this._player.collisionCheck(e)){
                    this._player.crash();                    
                    this.GameOver();
                    return;
                }
            }
        }       

        //自机子弹的碰撞检测
        for(let b of Bullet.allArr){            
            if(b.activate){                
                let hasChecked:boolean = false;           
                for(let i=0; i<this._enemy.length; i++){
                    let e = this._enemy[i];     
                    if(!e.isInvinsible() && b.collisionCheck(e)){
                        console.log('enemy hit.');
                        this._enemyHit ++;
                        e.hit();
                        e.setBuff(BuffType.INVINSIBLE, 1000)
                        b.dispose()
                        hasChecked = true
                        if(e.isDefeated()) {
                            e.crash();
                            this._enemy.splice(i,1);
                        }
                        if(this._enemy.length == 0){
                            this.StageClear();
                            return;
                        }
                       
                        break;
                    }  

                }
                if(this._drift && b.collisionCheck(this._drift) && !hasChecked){
                    b.dispose();
                    this._drift.hit();
                    if(this._drift.isDefeated()) this._drift.change2Buff();                    
                }                                
            }
        }

        //敌机子弹的碰撞检测
        if(!this._player.isInvinsible()){
            for(let b of EnemyBullet.allArr){
                if(b.activate){                
                    let hasChecked:boolean = false;           
                    if(b.collisionCheck(this._player)){     
                        console.log("player hit");
                        this._playerHit ++;
                        this._player.hit();
                        this._player.setBuff(BuffType.INVINSIBLE, 1000)
                        b.dispose();
                        hasChecked = true
                        if(this._player.isDefeated()){
                            this._player.crash();                    
                            this.GameOver();
                            return;
                        }                    
                        
                        break;
                    }  
                    if(this._drift && b.collisionCheck(this._drift) && !hasChecked){                        
                        b.dispose();
                        this._drift.hit();
                        if(this._drift.isDefeated()) this._drift.change2Buff();                    
                    }                         
                }
            }  
        }            

        //拾取漂流物判断   
        if(this._drift && this._drift.buff){   
            let hasPicked = false;   
            //自机
            if(this._drift.collisionCheck(this._player)){
                this._player.setBuff(this._drift.buff.type, this._drift.buff.defaultDuration);
                this.removeChild(this._drift);
                this._drift = null;
                hasPicked = true;
            }
            //敌机
            if(!hasPicked){
                for(let e of this._enemy){
                    if(this._drift.collisionCheck(e)){
                        e.setBuff(this._drift.buff.type, this._drift.buff.defaultDuration);
                        this.removeChild(this._drift);
                        this._drift = null;
                        hasPicked = true;
                        break;
                    }
                }
            }
        }
    }  

    /**刷新全部显示对象的目标计算点 */
    private refreshAllPosition(){
        this._player.refreshPosition();
        // console.log('refreshAllPosition');
        for(let e0 of this._enemy){
            let e = e0 as EnemyPlane
            e.refreshPosition();
            e.playerReg(this._player);
            for(let b of Bullet.allArr){
                if(b.activate){
                    e.bulletReg(b)
                }
            }
            if(this._drift){
                e.driftReg(this._drift)
            }    
            e.refreshMove();        
        }

        for(let b of Bullet.allArr){
            if(b.activate){
                b.onFly();     
                b.refreshPosition();
            }
        }

        for(let b of EnemyBullet.allArr){
            if(b.activate){
                b.onFly();     
                b.refreshPosition();
            }
        }

        //漂流物的刷新
        if(this._drift!=null){
            let r = this._drift.move();
            this._drift.refreshPosition();
            if(!r){
                this.removeChild(this._drift);
                this._drift = null;
            }            
        }   

    } 

    private StageClear(){        
        console.log('stage clear.')
        // this._txtTip.text = 'Stage clear.'
        this.cleanStage();
        let gr = new GameResult(true, egret.getTimer()-this._startTime, this._playerBullet, this._playerHit, (e)=>{
            this.startPlay();
        });
        gr.x = (this._stage.width - gr.width)/2;
        gr.y = 100;
        this._gameResult = gr;
        this.addChild(gr);        
    }

    private GameOver(){
        console.log("game over.")
        this.cleanStage();
        let gr = new GameResult(false, egret.getTimer()-this._startTime, this._playerBullet, this._enemyHit, (e)=>{
            this.startPlay();
        });
        gr.x = (this._stage.width - gr.width)/2;
        gr.y = 100;
        this._gameResult = gr;
        this.addChild(gr);  
    }    


    private onPause(){
        this._driftTimer && this._driftTimer.stop();
        this._player && this._player.onPause();
        for(let e of this._enemy){
            e.onPause();
        }
    }

    private onResume(){
        this._driftTimer && this._driftTimer.start();
        this._player && this._player.onResume();
        for(let e of this._enemy){
            e.onResume();
        }
    }

    public dispose(){
        this.cleanStage();
        LifecycleCallback.removeFunc('StageScene')
    }

}