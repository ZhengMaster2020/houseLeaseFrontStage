const areaContant = [ 
  { key: 'all', value: '全部（不限）'},
  { key: 'zengcheng', value: '增城'},
  { key: 'panyu', value: '番禺'},
  { key: 'nansha', value: '南沙'},
  { key: 'huadu', value: '花都'},
  { key: 'baiyun', value: '白云'},
  { key: 'haizhu', value: '海珠'},
  { key: 'yuexiu', value: '越秀'},
  { key: 'liwan', value: '荔湾'},
  { key: 'tianhe', value: '天河'},
  { key: 'conghua', value: '从化'},
  { key: 'huangpu', value: '黄埔'},
]

const areaMap = {
  'all': '全部',
  'zengcheng': '增城',
  'panyu': '番禺',
  'nansha': '南沙',
  'huadu': '花都',
  'baiyun': '白云',
  'haizhu': '海珠',
  'yuexiu': '越秀',
  'liwan': '荔湾',
  'tianhe': '天河',
  'conghua': '从化',
  'huangpu': '黄埔',
}

 // 获取url参数
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
}

// 地区数据初始化
function getHouseArea() { 
  $('#location').ready(() => {
    areaContant.forEach((item, index) => {
      $('#location').append(`
        <li ><a href="area.html?area=${item.key}">${ item.value }</a></li>
      `)
    })
  })
}

// 根据房源特征或者房源标题搜索对应房子信息
function searchHouse() {
  const keyword = $('#qaNavSearcherIpt').val()
  $('#houselist-mod-new').empty() 
  console.log(keyword, 'keyword')
  if(!keyword) return alert('输入内容不能为空')
  $('#nosearch').css('display', 'none')
  $.ajax({
    type: 'GET',
    url: `http://localhost:3000/api/house/search/${keyword}`,
    success(res) {
      if (!res.length) { // 查询无结果的处理方法
        $('#houselist-mod-new').append(`
        <li  class="list-item" style="width: 60vw; text-align:center" >
          <img style="width: 60%; height: auto " src="./assets/images/no_organ.png" alt="无法展示" >
          <div>很遗憾，未能查询到${keyword}有关房源信息 </div>
        </li>
        `)
        $('#fenye').css({ 'display': 'none' })
        return
      }
      res && res.forEach(item => {
        let uername
        $.ajax({
          type: 'GET',
          url: `http://localhost:3000/api/users/${item.userID}`,
          success(res) {
            console.log(res, 'res')
            username = res.username
            $('#houselist-mod-new').append(`
            <li class="list-item" data-from="">
            <div class="item-img">
                <img src="${item.avatar[0]}" width="180" height="135">
                    <div class="icon-duotu">
                        <span class="dt-bg"></span>
                    </div>
              </div>
            <div class="house-details">
                  <div class="house-title">
                      <a data-from="" data-company="" title="${item.title}" href="detail.html?houseID=${item._id}" target="_blank" class="houseListTitle">${item.title}</a>
                      <i class="house-icon house-icon-anxuan" style="font-weight: normal;">安选</i>
                      <i class="house-icon house-icon-default border-line">${item.status}</i>
                  </div>
                  <div class="details-item" style="width: 80%">
                      <span style="width: 500px">${item.add}</span>
                  </div>
                  <div class="details-item">
                      <span class="comm-address" title="${item.city}">${item.city}</span>
                  </div>
                  <div class="tags-bottom">
                      <span class="item-tags tag-metro">${item.feature.split('，')[0]}</span>
                      <span class="item-tags tag-others">${item.feature.split('，')[1]}</span>
                      <span class="item-tags tag-others">${item.feature.split('，')[2]}</span>            
                  </div>
                  <div class="broker-item">
                      <span class="broker-img-wrap">
                          <img src="pic/fenlei-human.jpg" alt="">
                      </span>
                      <span class="broker-name broker-text">${username ? username : '无'}</span>
                      <span class="broker-text"></span>
                      <!-- 是否安选经纪人 显示icon -->
                      <span>
                          <img class="broker-ax-img" src="pic/fenlei-icon.png">
                      </span>                                            
                  </div>
            </div>
            <div class="pro-price">
              <span class="price-det"><strong>${item.price.split('（')[0]}</strong></span><span class="unit-price">${item.areaNum} / m²</span>        
            </div>
          </li>
        `)
          },
          error(err) {
            alert(`${err.status} ${err.statusText}`)
            console.log('err', err)
          }
        })
      })
      console.log(res, 'res')
    },
    error(err) {
      alert(`${err.status} ${err.statusText}`)
      console.log(err, 'err')
    }
  })
}