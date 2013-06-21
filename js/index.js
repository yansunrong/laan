/**
 * Created with JetBrains PhpStorm.
 * User: yansunrong
 * Date: 13-6-17
 * Time: 下午8:58
 * To change this template use File | Settings | File Templates.
 */



var itemTpl = baidu.template('item-tpl');
var detailTpl = baidu.template("game-detail-tpl");
/**
 * 传入数据,生成列表
 * @param list
 */
function renderGameList(items) {
    $("#pagination").pagination({
        total: items.length,
        limit: 9,
        offset: 0,
        callback: function (offset) {
            var list = items.slice(offset, offset + 9);
            var html = '<div class="row-fluid">';
            for (var i = 0, item; item = list[i]; i++) {
                if (i % 3 == 0 && i > 0) {
                    html += '</div><div class="row-fluid">';
                }

                html += itemTpl(item);

            }
            $("#list-container").html(html);
            return false;
        }
    });
}
//通过type筛选
function filterByType(type) {
    var filterData = [];
    for (var i = 0, item; item = data[i]; i++) {
        if (type==undefined || type.split(" ").indexOf(item.type) >-1 ) {
            filterData.push(item)
        }
    }

    renderGameList(filterData);
}


function showDeailModal(id){

    for(var i = 0;i<data.length;i++){
        if(data[i].id == id){
            var html = detailTpl(data[0]);
            $("#game-detail-box").html(html);
            $('#game-detail').modal()
            return;
        }
    }

}




renderGameList(data);

//绑定标签筛选的事件
$("#types").on('click',"li",function(e){
    var li = $(this);
    li.parent().children().removeClass("active");
    li.addClass("active");
    e.preventDefault();
    e.stopPropagation();
    filterByType(li.find('a').attr("data-type"));
});

// 绑定点击安装的事件
$(".setup").click(function(e){
    var id = $(this).attr("data-id");
    location.hash = id;
    showDeailModal(id);
    e.stopPropagation()
    e.preventDefault()
});




if(location.hash){
  //  alert(1)
    showDeailModal(location.hash.substring(1));
}