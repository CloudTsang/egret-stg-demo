class CollisionObject extends egret.Sprite {
	public position:egret.Point;
	public constructor() {
		super();
	}

	public refreshPosition(){
		this.position = new egret.Point(this.x, this.y);
	}	
}