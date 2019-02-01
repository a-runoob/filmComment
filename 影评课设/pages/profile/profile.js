// pages/profile/profile.js
const app=getApp();
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },


  onLoad: function () {
    
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
      animation: {
        duration: 1100,
        timingFunc: 'easeIn'
      }
    })
    wx.setNavigationBarTitle({
      title: '个人档案',
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } 
    else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success(res) {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      });
    }
  },
  bindgetUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    wx.request({
      // url是请求的 API 地址
      url: 'http://127.0.0.1:8000/movies/profile',
      // 请求的数据，从请求页面传出去的参数
      data: {
        nickName: e.detail.userInfo.nickName,
        nickIcon: e.detail.userInfo.avatarUrl
      },
      // 默认值,表示传输的数据为json格式
      header: {
        'content-type': 'application/json'
      },
      // 请求成功时的逻辑处理，返回的数据就在回调函数的 参数 res 里
      success(res) {
        console.log(res)
        if (res.errMsg == "request:ok") {
          console.log("serve linking.....")
          console.log(res.data.msg)
        }
      }
    })
  },
  bindtapcomment:function(){
    wx.navigateTo({
      url: '../mycomment/mycomment',
    })
  },
  bindtapcollect:function(){
    wx.switchTab({
      url: '../collect/collect',
    })
  },
  bindtapabout:function(){
     wx.navigateTo({
       url: '../about/about',
     })
  },
  //退出登录
  bindtapexit:function(){
    app.globalData.userInfo=null;

    wx.openSetting({
      success(res){
        wx.showToast({
          title: '已退出登录',
          icon: 'success',
          duration: 1000
        });
        wx.reLaunch({
          url: '../profile/profile',
        });
      }
   
    })

    // wx.navigateTo({
    //   url: '../profile/profile',
    // })

 

  },
 
  onShow:function(){
   this.onLoad();
  },


  onReady: function () {

  },


  onShow: function () {
    console.log(app.globalData.userInfo);
  },



 
  onPullDownRefresh: function () {
      wx.showToast({
        title: '刷新成功',
        icon:'success',
        duration:1000
      });
    if (getCurrentPages().length != 0) {
      getCurrentPages()[getCurrentPages().length - 1].onLoad();
    }
  },


  onReachBottom: function () {
    wx.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 1000
    });
  },

  onShareAppMessage: function () {

  }
})