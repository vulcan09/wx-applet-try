const app = getApp()

Page({
  data: {
    recommend:[],
    keyword:'',
    tabs:app.globalData.types
  },
  onLoad: function(){
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        method: 'baidu.ting.billboard.billList',
        type: 11,
        size: 6,
        offset: 0
      },
      success: ({data}) => {
        let hot = [...data.song_list];
        hot.sort((a,b)=>{b.hot-a.hot});
        // console.log("热门歌曲：",hot);

        this.setData({
          recommend: data.song_list,
          keyword: hot[0].title
        })
        // console.log("key：", this.data.keyword);
      }
    })
  },
  goto(e){
    let {target,songid} = e.currentTarget.dataset;
    // console.log("触发对象："+target);
    let url = `/pages/${target}/${target}`;
    let query = songid ? 'songid='+songid : 'keyword='+this.data.keyword;
    // console.log(query)
    wx.navigateTo({
      url: url+'?'+query
    })
  }
})
