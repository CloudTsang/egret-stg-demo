# egret-stg-demo
 
练习做的白鹭引擎小型飞机设计游戏

运行 `egret start server -a`

并不是常见的弹幕射击类游戏~~懒得设计杂兵排队出场的形式~~，敌人只有一台机体但是会回避、主动追上玩家并射击这种行为来制造难度。

~~难民版Ace Combat~~

![title](https://raw.githubusercontent.com/CloudTsang/egret-stg-demo/main/p1.jpg)
![title](https://raw.githubusercontent.com/CloudTsang/egret-stg-demo/main/p2.jpg)


主舞台StageScene侦听ENTER_FRAME事件刷新飞机子弹的位置并进行各种判断

```
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
        if(!this._player.isInvinsible()){...}       

        //自机子弹的碰撞检测
        for(let b of Bullet.allArr){...}

        //敌机子弹的碰撞检测
        if(!this._player.isInvinsible()){...}            

        //拾取漂流物判断   
        if(this._drift && this._drift.buff){...}
    }  
```


Controller类记录按键按下的状态刷新飞机的操作
```
    public btnTrigger(e:any=null){		
		if(this._directX!=0 || this._directY!=0){
			this._controllee.move(this._directX, this._directY);		
		}								
		if(this._shotTriggered){
			this._controllee.shot();
		}		
	}
```

飞机的移动简单地使用Timer改变坐标，冲刺则是Tween,做成了有限次数且随时间回复的形式，冲刺期间全程无敌，正常做法是冲刺开始后几帧无敌这样子，这次没有做那么细。~~其实我蛮讨厌捉无敌帧的~~
```
this.dashGaugeTimer.addEventListener(egret.TimerEvent.TIMER, this.onDashRecover, this);        

public dash(dx:number, dy:number){
    if(this.dashing){
        return;
    }
    if(this.curDashGauge == 0){
        return;
    }
    if(!this.dashGaugeTimer.running){
        this.dashGaugeTimer.start();
    }
    this.curDashGauge --;
    this.dashing = true;
    
    ...
}

protected onDashRecover(e:any){
    if(this.curDashGauge < this.maxDashGauge){
        this.curDashGauge ++;
    }
    if(this.curDashGauge == this.maxDashGauge){
        this.dashGaugeTimer.reset();
    }
}

public isInvinsible():boolean{
    return this.dashing || this.buffManager.invinsibleBuff!=null;
}
```

射击则是从子弹池中获取Bullet实例，有一个子弹方向数组的属性，可以设置多方向射击
```
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

//Bullet类
public static pool:Pool<Bullet> = new Pool<Bullet>(()=>{
    let b = new Bullet()
    Bullet.allArr.push(b);
    return b;
})	

//Pool类
public getOne():T{
    let ret:T = null;
    for(let obj of this._arr){
        if(!obj.activate){
            ret = obj;
            break;
        }
    }
    if(!ret){
        ret = this._func();
        this._arr.push(ret);
    }
    ret.activate = true;
    return ret;
}
```

拾取道具出现的Buff，做了无敌、子弹方向+2（最多5方向发射）、子弹变大（中弹判定点从1个变3个）、得到僚机这几种，其实比起怎么做，更多考虑了平衡性比如速度、持续时间这种数值问题，毕竟只要能打出弹幕extreme难度也能乱杀==并且敌机也能拾取Buff。
```
//僚机Buff
public startEffect(owner:egret.Sprite){
    super.startEffect(owner);
    this.owner = owner;	
    let mainP:BasePlane = owner as BasePlane
    this._subA = new SubPlane(mainP, "LEFT");
    this._subB = new SubPlane(mainP, "RIGHT");		
}

public delBuff(e:any=null){
    this._subA.dispose();
    this._subB.dispose();
    super.delBuff(e);
}

//无敌Buff,用Tween做了闪烁的效果
public startEffect(owner:egret.Sprite){		
    this.owner = owner;
    this._invisibleTween = egret.Tween.get(this.owner,{loop:true}).set({ alpha: 0}).wait(100).set({ alpha: 1}).wait(100)	
    if(this.timer){
        this.timer.start();
    }	
}

public delBuff(e:any=null){
    this._invisibleTween.pause().set({alpha:1})
    super.delBuff(e)
}
```

虽然可以通过子弹上限、射击间隔参数等进一步限制玩家的强度，但就不做那么严格了，仍然可以通过左右移动射出弹幕轻松击中敌机。相对地设计了3种难度：normal，elite（数值比normal高并会持续射击），extreme（数值更高，并在追及玩家时会左右移动制造弹幕）。但是ai行为设计得不太满意，造成了一些不自然的表现：

现在的做法，通过全局的ENTER_FRAME时间控制移动，导致速度值设置得较高的extreme难度敌机仿佛瞬间移动一样，之后再改成单独处理。此外速度值高于玩家飞机就可以在x轴上轻松追上玩家，如果玩家不进行射击迫使敌机在x轴上移动的话，就变得好像双方操作同步了一样，敌机总是在x轴上同步移动紧跟着玩家，看上去很怪异==

AI行为，是根据飞机、子弹的位置确定下一个行为是攻击还是躲避并确定移动点。实际效果微妙，不能说聪明但也算能作出合理的行动，偶尔回避时往另一侧子弹上撞的问题再优化。这种AI设计我个人缺乏经验和好想法。

```
//躲避时会获取四象限方向中子弹数最少的方向
if(bp.x < this.x && bp.y < this.y - this.pHeight){		
    this._bulletDistribute[0] ++;
    //不考虑机位后方的子弹
    return;
}else if(bp.x > this.x && bp.y < this.y - this.pHeight){			
    this._bulletDistribute[1] ++;
    //不考虑机位后方的子弹
    return;
}else if(bp.x < this.x && bp.y > this.y){					
    this._bulletDistribute[2] ++;			
}else if(bp.x > this.x && bp.y > this.y){				
    this._bulletDistribute[3] ++;			
}
...

//根据子弹距离决定躲多远、是否使用冲刺。
if(!sameXArea && num > 1){
    //子弹距离大于1机位时不改变行为
    return;
}
if(!sameXArea && num < 1){
    //x轴不同但位置接近，远离0.5-1机位		
    this.setCurPattern(AIActType.SLIGHT_AVOID);	
    return; 
}
if(sameXArea && num < 2 && this.curDashGauge == 0){
    //不能冲刺时，x轴相同但位置较远，远离1-2机位
    this.setCurPattern(AIActType.AVOID);
    this._movePoint = null;		
    return;
}
if(sameXArea && num < 1){
    //x轴相同且位置接近，冲刺远离
    this.setCurPattern(AIActType.DASH_AVOID);		
    this._movePoint = null;			
    return;
}	

//extreme才有的制造弹幕的行为
//x轴上穿过玩家两侧射击后正对着玩家射击			
if(this._playerPosition){
    if(this._playerPosition.x < this.x - this.width){		
        this._movePoint = new egret.Point(this._playerPosition.x - this.width, this.y);	
    }else if(this._playerPosition.x > this.x + this.width){	
        this._movePoint = new egret.Point(this._playerPosition.x + this.width, this.y);	
    }else{
        this._curPattern = AIActType.TRACE;
        this._movePoint = new egret.Point(this._playerPosition.x, this.y);
    }
}			
```


