//app.js
App({
  onLaunch: function () {
    this.globalData = {};
    this.isAuthLogin();
    //console.log(this.globalData.userInfo);
  },
  
  //判断是否登录
  is_login:function(){
    if(this.globalData.userInfo){
       return true;
    }else{
       return false;
    }
  },

  //保存用户信息
  setUserinfo:function(userInfo){
      this.globalData.userInfo = userInfo;
  },

  //判断用户是否已授权
  isAuthLogin:function(){
     const that = this;

     wx.getSetting({
        success:res=>{
          if(res.authSetting['scope.userInfo']){
              wx.getUserInfo({
                 success:result =>{
                    that.globalData.userInfo = result.userInfo;
                 }
              })
              
          }
        }
     })
  }

})