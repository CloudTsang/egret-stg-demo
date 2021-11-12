/**敌人子弹 */
class EnemyBullet extends Bullet{	
	public constructor() {		
		super(12, 0xC71585, 0, 1);
	}

	public static pool:Pool<EnemyBullet> = new Pool<EnemyBullet>(()=>{
		let b = new EnemyBullet()
		EnemyBullet.allArr.push(b);
		return b;
	})

	public static allArr:EnemyBullet[] = []
}