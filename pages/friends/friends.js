const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[1,2,3,4,5]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       //设置图片宽度
       this.initImageSize();
  },

  //图片宽度初始化方法
  initImageSize:function(){

     const windowWidth = wx.getSystemInfoSync().windowWidth;//获取设备的宽度
     const weiboWidth = windowWidth-20; //页面的宽度
     let length = this.data.items.length;//图片的数量
    
     if(length%3 === 2 && length < 3){
        //两张图片
        var imageWidth = (weiboWidth-2.5)/2;
       
     }else if(length%3 === 1 && length < 3){
       //一张图片
      var imageWidth = weiboWidth;
     }else{
        //三张或三张以上
        // if(length%3 === 2){
        //   let items = this.data.items;
        //   items.push(1);
        //   this.setData({
        //     items:items
        //   });
        // }
        var imageWidth = (weiboWidth-5)/3;
     }
     
     this.setData({
      imageWidth:imageWidth
     });
  },

  //发布微博
  onWriteWeiboTap:function(event){
      
      //判断用户是否登录
      if(app.is_login()){
        const that = this;
        //跳转到发布微博页面
        wx.showActionSheet({
          itemList: ['文字','图片','视频'],
          success:res=>{
           
            const tapIndex = res.tapIndex;
            if(tapIndex == 0){
             //发布文字
             wx.navigateTo({
              url: '/pages/publish/publish?type='+tapIndex,
             })
            }else if(tapIndex == 1){
             //发布图片
             wx.navigateTo({
              url: '/pages/publish/publish?type='+tapIndex,
             })
            }else if(tapIndex == 2){
              //发布视频
              wx.chooseVideo({
                success:res =>{
                   //保存视频文件
                   if(res.tempFilePath){
                    that.setData({
                      tempFilePath:res.tempFilePath
                    });

                    wx.navigateTo({
                      url: '/pages/publish/publish?type='+tapIndex,
                    })
                   }
                }
              })
            }

          }
        })
      }else{
        //跳转到登录页面
        wx.showToast({
          title:'您还没有登录,即将跳转到登录页面',
          icon:'none',
          duration:3000
        });

        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }, 2000);
      }
  }
})