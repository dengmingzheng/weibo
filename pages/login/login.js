const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
          //设置页面标题
          wx.setNavigationBarTitle({
            title: '登录',
          })
  },

  //微信手机号登录
  onGetUserInfoEvent:function(event){

      wx.showLoading({
        title: '正在登陆...',
      })

      //同步获取保存到本地的用户信息
      let userInfo = wx.getStorageSync('userInfo');

      if(!userInfo){
            //判断用户是否已授权,如果已经授权则获取用户信息保存到本地
            wx.getSetting({
              success:res => {
                if(res.authSetting['scope.userInfo']){
                    //获取用户信息
                    wx.getUserInfo({
                        success: res => {
                            if(res.userInfo){
                              userInfo = res.userInfo;
                              //保存用户信息到本地文件
                              wx.setStorage({
                                data: userInfo,
                                key: 'userInfo',
                              })
                            }    
                        }
                    })
                } 
                
              }
            })
      }

      wx.login({
        timeout: 6000,
        success:res => {
          if(res.code){
              wx.request({
                url: 'http://mini-shop.test/api/v1/authorization',
                method:'POST',
                'Content-Type':'application/x-www-form-urlencoded',
                data:{code:res.code},
                success:result => {
                  //获取返回token，保存到本地
                  console.log(result);
                }
              })
          }
          //
        }
      })
      
     
      return false;
      if(userinfo){
         //保存用户信息
         app.serUserinfo(userinfo);

         wx.showToast({
           title: '恭喜！授权成功!',
         })

         setTimeout(()=>{
            wx.navigateBack({})
         },2000);
      }
      console.log(event);
  },

  //取消登录
  onClearLogin:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  } 
})