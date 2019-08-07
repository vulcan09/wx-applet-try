// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: true,
    inputVal: "",
    result: [],
    timer:null
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      result:"",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      result:""
    });
  },
  inputTyping: function (e) {
    this.setData({inputVal:e.detail.value});
    //防抖
    clearTimeout(this.data.timer);
    this.data.timer = setTimeout(()=>{
      if(e.detail.value.trim() == "") return;
      this.searchnow(e.detail.value);
    },680);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //不会立即修改data的属性，而是进入队列
    this.setData({inputVal:options.keyword});
    //这里调用就不直接选择this.data.inputVal,而是使用传过来的值
    this.searchnow(options.keyword);
  },

  searchnow(keyword) {
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        method: 'baidu.ting.search.catalogSug',
        query: keyword || this.data.inputVal,
      },
      success: (res) => {
        let {data} = res;
        if(data.error_code == 22001){
          wx.showToast({
            title: '暂无歌曲',
            icon:'loading',
            duration: 1000
          });
          return;
        }
        else if (data.error_code == 22000){ 
          this.setData({ result: data.song })
        }
        
      },
      fail: err => console.log(err)
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})