const cloud = require('wx-server-sdk')
cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV,
})
const TcbRouter = require('tcb-router')
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event });
  const tabsDB = 'tabs';
  const couponsDB = 'coupons';


  app.use(async (ctx, next) => {
		ctx.data = {}
		await next();
  });
  
  app.router('index', async (ctx, next) => {
    const {data: tabs} = await db.collection(tabsDB).get();
    const {data: couponList} = await db.collection(couponsDB).get();
		ctx.body = { tabs, couponList };
	})


  return app.serve();
}