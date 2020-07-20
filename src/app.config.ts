export default {
  pages: [
    'pages/index/index',
    'pages/user/user'
  ],
  tabBar:{
    list:[
      {
        pagePath:"pages/index/index",
        text:"首页"
      },
      {
        pagePath:"pages/user/user",
        text:"我"
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
