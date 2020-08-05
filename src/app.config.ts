export default {
  pages: [
    'pages/index/index',
    'pages/gif/index',
    'pages/user/index',
  ],
  tabBar:{
    list : [
      {
        pagePath : 'pages/index/index',
        text: '首页',
      },
      {
        pagePath : 'pages/gif/index',
        text: '动图制作',
      },
      {
        pagePath : 'pages/user/index',
        text: '我的',
      },

    ]

  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
