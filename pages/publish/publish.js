// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths:[],
    type:0,
    videoPath:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

       const type = options.type;
      
       if(type == 1){
          //显示上传图片
          this.setData({
            isShowImage:true,
            type:type
          });
          //初始化图片宽度
          this.initImageSize();
       }else if(type == 2){
          //显示视频
          const tempFilePath = getCurrentPages()[0].data.tempFilePath;//获取上一页设置的视频

          this.setData({
            videoPath:tempFilePath,
            type:type,
            isShowVideo:true
          });
       }   
       
  },

  //初始化图片宽高
  initImageSize:function(){
       const windowWidth = wx.getSystemInfoSync().windowWidth;//设备宽度
       const containerWidth = windowWidth-60;//容器宽度
       const imageSize = ((containerWidth-(2.5*2))/3)*2;//图片宽度rpx

       this.setData({
          imageSize:imageSize
       });
       
  },

  //添加图片
  onAddImageEvent:function(event){
       const that = this;
        //原来的数组图片
        const tempFilePaths = that.data.tempFilePaths;
       if(tempFilePaths.length < 9){
         wx.chooseMessageFile({
          count:9-tempFilePaths.length,
          type:'image',
           success:res=>{
             if(res.tempFiles){
               
                //添加返回的图片
                const tempFilePath = res.tempFiles;
                
                tempFilePath.forEach((value,index)=>{
                  tempFilePaths.push(value.path);
                });
                
                that.setData({
                  tempFilePaths:tempFilePaths
                });
             }
           
           }
         })
       }else{
         wx.showToast({
           title: '最多只能上传9张图片',
           icon:'none',
         })
       }
       
  },

  //删除图片
  onRemoveImageEvent(event){
        
         const index = event.target.dataset.index;
         const tempFilePaths = this.data.tempFilePaths;
        
         tempFilePaths.splice(index,1);//从原来的数组中从index开始，删除1个
        
         this.setData({
              tempFilePaths:tempFilePaths
         });
  },

  //预览图片
  onPreviewImageEvent:function(event){
          console.log(event);   
          const index = event.currentTarget.dataset.index;//预览的是第几张图片
          const tempFilePaths = this.data.tempFilePaths; //图片资源
          const current = tempFilePaths[index];
          wx.previewImage({
            urls: tempFilePaths,
            current:current
          })
  },

  //发布微博
  onSubmitEvent:function(event){
        console.log(event);
  }
})