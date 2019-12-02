$(function(){
    //读取本地数据，动态生成列表结构
    let arr = kits.loadData('cartListData');
    //遍历数组，生成指定结构
    let html = '';
    arr.forEach(e => {
        // 需要一个产品ID ，用于后期的一些其他操作
        html +=`<div class="item" data-id="${e.pID}">
        <div class="row">
          <div class="cell col-1 row">
            <div class="cell col-1">
              <input type="checkbox" class="item-ck" checked="">
            </div>
            <div class="cell col-4">
              <img src="${e.imgSrc}" alt="">
            </div>
          </div>
          <div class="cell col-4 row">
            <div class="item-name">${e.name}</div>
          </div>
          <div class="cell col-1 tc lh70">
            <span>￥</span>
            <em class="price">${e.price}</em>
          </div>
          <div class="cell col-1 tc lh70">
            <div class="item-count">
              <a href="javascript:void(0);" class="reduce fl ">-</a>
              <input autocomplete="off" type="text" class="number fl" value="${e.number}">
              <a href="javascript:void(0);" class="add fl">+</a>
            </div>
          </div>
          <div class="cell col-1 tc lh70">
            <span>￥</span>
            <em class="computed">${e.number * e.price}</em>
          </div>
          <div class="cell col-1">
            <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
          </div>
        </div>
      </div>`;
    })
    $('.item-list').append(html);
    let noCkAll = arr.find(e =>{
      return !e.isChecked;
    })

    $('.picl-all').prop('checked', !noCkAll);
    if(arr.lenght != 0) {
        // 处理一些该隐藏和显示的效果
        $('.empty-tip').hide(); //隐藏空空如也的提示
        $('.cart-header').show(); //显示表头
        $('.total-of').show(); //显示用于结算的盒子
    }


    //------------------------------------
    // 实现全选和点选功能
    $('.pick-all').on('click',function(){
        let status = $(this).prop('checked');
        $('.item-ck').prop('checked',status);
        $('.itme-all').prop('checked',status);
    })
    // 点选---所有的点选的checkBox都是动态生成的，所以用委托事件实现
    $('.item-list').on('click','.item-ck',function(){
         // 如果勾选的个数和总个数一致 = 全选
         let ckall = $('.item-ck').lenght === $('.item-ck:checked').lenght;
         // 设置全选的状态和 ckall 一致就行
         $('.pick-all').prop('checked',ckall);
    })
   // 点选的同时，要修改多选框对应的本地数据里面所选中状态
  //  要根据点选商品的ID，到本地数据中，修改 isChecked 属性
  let pID = $(this).parents('.item').attr('data-id');
  // 获取当前这个单选是否选中
  let isChecked =$(this).prop('checked');
  // console.log(pID)
   arr.forEach(e =>{
     if(e,pID == pID ){
       // 就需要把当前这个产品的选中状态改成和勾选状态一致
   e.isChecked = isChecked;
     }
   })
    // 把数据更新回本地数据
    kits.saveData('cartListData',arr);
    //每次点选需要重新计算总价和总件数
    calcTotal();
})
function calcTotal(){
 // 封装一个计算总价格和总件数的函数，方便每次使用调用
let totalCount = 0 ; //总件数
let totalMoney = 0 ;  //总价格

arr.forEach(e => {
  if (e.isChecked) {
    totalCount += e.number;
    totalMoney += e.number * e.price;
  }
})


// 把总件数和总价更新到页面里面
$('.selected').text(totalCount);
$('.total-money').text(totalMoney);
}
