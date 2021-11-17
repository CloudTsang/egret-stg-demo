class BuffManager {
	public bigBulletBuff:BigBulletBuff;
	public dashInvinsibleBuff:DashInvinsibleBuff;
	public direction3BulletBuff:Direction3BulletBuff;
	public direction5BulletBuff:Direction5BulletBuff;
    public directionPlus2BullectBuff:DirectionPlus2BullectBuff;
	public invinsibleBuff:InvinsibleBuff;
	public subPlaneBuff:SubPlaneBuff;
	private _plane:BasePlane;
	public constructor(p:BasePlane) {
		this._plane = p;        
	}   

    public static getBuffData(ty:BuffType) {
        switch(ty){
            case BuffType.INVINSIBLE:
               return {
                   type:ty,
                   defaultDuration: 5000,
                   label: "★"
               }
            case BuffType.BULLET_BOOST_BIG:     
                return {
                   type:ty,
                   defaultDuration: 20000,
                   label: "B"
               }           
            
            case BuffType.BULLECT_BOOST_PLUS2DIRECT:
                return {
                   type:ty,
                   defaultDuration: 10000,
                   label: "+2"
               }
                
            case BuffType.SUB_PLANE:
                return {
                   type:ty,
                   defaultDuration: 15000,
                   label: "S"
               }                
        }
        return null
    }

	public getBuff(ty:BuffType, duration:number){
        let buff:Buff;
        switch(ty){
            case BuffType.INVINSIBLE:
                this.invinsibleBuff = new InvinsibleBuff(duration);
				buff = this.invinsibleBuff;
                break;
            case BuffType.BULLET_BOOST_BIG:
                this.bigBulletBuff = new BigBulletBuff(duration)
				buff = this.bigBulletBuff;
                break;
            case BuffType.BULLET_BOOST_3DIRECT:
                this.direction3BulletBuff = new Direction3BulletBuff(duration);
				buff = this.direction3BulletBuff;
                break;
            case BuffType.BULLET_BOOST_5DIRECT:
                this.direction5BulletBuff = new Direction5BulletBuff(duration);
				buff = this.direction5BulletBuff;
                break;
            case BuffType.BULLECT_BOOST_PLUS2DIRECT:
                this.directionPlus2BullectBuff = new DirectionPlus2BullectBuff(duration);
                buff = this.directionPlus2BullectBuff;
                break;
            case BuffType.SUB_PLANE:
                this.subPlaneBuff = new SubPlaneBuff(duration);
				buff = this.subPlaneBuff;
                break;
        }
        if(!buff){
            return
        }
        buff.startEffect(this._plane);
        buff.addEventListener(PlayEvents.BUFF_LOSE, this.loseBuff, this)        
    }

    public loseBuff(e:any=null){
        let buff: Buff = e.target;
        switch(buff.getType()){
            case BuffType.INVINSIBLE:
				this.invinsibleBuff = null;
                break
            case BuffType.BULLET_BOOST_BIG:
				this.bigBulletBuff = null;
                break;
            case BuffType.BULLET_BOOST_3DIRECT:
				this.direction3BulletBuff = null;
				break;
            case BuffType.BULLET_BOOST_5DIRECT:
				this.direction5BulletBuff = null;
                break;
            case BuffType.BULLECT_BOOST_PLUS2DIRECT:
                this.directionPlus2BullectBuff = null;
                break;
            case BuffType.SUB_PLANE:
				this.subPlaneBuff = null;
                break;
                
        }
    }

    public dispose(){
       	this.bigBulletBuff && this.bigBulletBuff.delBuff()
        this.dashInvinsibleBuff && this.dashInvinsibleBuff.delBuff()
        this.direction3BulletBuff && this.direction3BulletBuff.delBuff()
        this.direction5BulletBuff && this.direction5BulletBuff.delBuff()
        this.directionPlus2BullectBuff && this.directionPlus2BullectBuff.delBuff()
        this.invinsibleBuff && this.invinsibleBuff.delBuff()
        this.subPlaneBuff && this.subPlaneBuff.delBuff()
    }

    public onPause(){
        this.bigBulletBuff && this.bigBulletBuff.onPause()
        this.dashInvinsibleBuff && this.dashInvinsibleBuff.onPause()
        this.direction3BulletBuff && this.direction3BulletBuff.onPause()
        this.direction5BulletBuff && this.direction5BulletBuff.onPause()
        this.directionPlus2BullectBuff && this.directionPlus2BullectBuff.onPause()
        this.invinsibleBuff && this.invinsibleBuff.onPause()
        this.subPlaneBuff && this.subPlaneBuff.onPause()       
    }


    public onResume(){        
        this.bigBulletBuff && this.bigBulletBuff.onResume()
        this.dashInvinsibleBuff && this.dashInvinsibleBuff.onResume()
        this.direction3BulletBuff && this.direction3BulletBuff.onResume()
        this.direction5BulletBuff && this.direction5BulletBuff.onResume()
        this.directionPlus2BullectBuff && this.directionPlus2BullectBuff.onResume()
        this.invinsibleBuff && this.invinsibleBuff.onResume()
        this.subPlaneBuff && this.subPlaneBuff.onResume()     
    }
}