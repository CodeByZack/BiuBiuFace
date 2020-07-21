export default {
  pages: [
    'pages/index/index',
    'pages/gif/gif',
    'pages/user/user'
  ],
  tabBar:{
    list:[
      {
        pagePath:"pages/gif/gif",
        text:"动图"
      },
      {
        pagePath:"pages/index/index",
        text:"demo"
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
