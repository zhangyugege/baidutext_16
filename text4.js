/**
 * Created by Administrator on 2016/3/22.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

function $(id){
    return document.getElementById(id);
}
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
        var city=$('aqi-city-input').value.trim();
        var value=$('aqi-value-input').value.trim();
        var table=$('aqi-table');
        if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
            alert("请输入城市信息，由英文字母或数字构成");
        }else {
            if(!value.match(/^\d+$/)){
                alert("请输入空气质量信息,必须为数字格式");
            }
            else {
                aqiData[city]=value;
            }
        }

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table=$('aqi-table');
    var res="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var city in aqiData){
        res+="<tr> <td>"+city+"</td><td>"+aqiData[city].toString()+"</td><td><button data-city="+city+">删除</button></td></tr>";

    }
    table.innerHTML=res;

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    console.log(aqiData);
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    $('add-btn').addEventListener('click',addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    $("aqi-table").addEventListener("click", function(event){
        if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.dataset.city);
    })


}

init();
