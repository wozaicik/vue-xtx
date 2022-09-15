import Mock from 'mockjs'
import qs from 'qs'

// 基本配置
Mock.setup({
  // 随机延迟500-1000毫秒 模拟网络延迟
  timeout: '500-1000'
})

// 拦截接口 /my/text
// 1.0 接口地址路径规则
// 2.0 请求方式
// 3.0 返回数据（函数返回数据
Mock.mock(/\/my\/text/, 'get', () => {
  // 随机数据逻辑 目标：5条数据 [{id:'',name:''},...]
  const arr = []
  for (let i = 0; i < 5; i++) {
    arr.push(Mock.mock({
      id: '@id',
      name: '@cname'
    }))
  }
  return { msg: '获取数据成功', result: arr }
})

// 模拟收藏
Mock.mock(/\/member\/collect/, 'get', (config) => {
  const querystring = config.url.split('?')[1]
  const queryObject = qs.parse(querystring)
  const items = []
  for (let i = 0; i < queryObject.pageSize; i++) {
    items.push(Mock.mock({
      id: '@id',
      name: '@ctitle(10,20)',
      desc: '@ctitle(10,20)',
      price: '@float(100,200,2,2)',
      picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`
    }))
  }

  return {
    msg: '获取收藏商品成功',
    result: {
      counts: 35,
      pageSize: +queryObject.pageSize,
      page: +queryObject.page,
      items
    }
  }
})
