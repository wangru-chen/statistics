var map_sum = new Map(); // 信息汇总,初始为空
var amount = 0;  // 店铺数量 

function add_datas(){
	++amount;
	$('#textarea_datas_sum').text('');
	var area = $('#text_area').val().trim();
	var estimate_value = $('#month_estimate').val().trim();
	var data_string = $('#textarea_data').val().trim();
	if(area == '') {
		alert("输入区域!");
	} else if(estimate_value == '') {
		alert("输入月预估总额!");
	} else if (data_string == '') {
		alert("输入店铺营业信息!");
	} else{
		var items = data_string.split("\n");
		var length_items = items.length;
		var show_datas_string = '<li><span>'+ items[0] + '\n</span>';
		show_datas_string += '<li><span>'+ items[1] + '\n</span>';
		for(var i = 2; i < length_items; ++i) {
			var curr_string = items[i].replace(/\s/g,"").replace('：', ':');
			var item_kv = curr_string.split(':');
			console.log(item_kv[0] + ':' + item_kv[1]);
			if(map_sum.get(item_kv[0]) == null) {
				map_sum.set(item_kv[0], item_kv[1]);
			} else {
				var temp_value = map_sum.get(item_kv[0]);
				if(item_kv[1].search("%") != -1) {  // 包含%
					map_sum.set(item_kv[0], ((parseFloat(temp_value) + parseFloat(item_kv[1]) * (amount - 1)) / amount).toFixed(2) + '%');
				} else {
					map_sum.set(item_kv[0], parseFloat(temp_value) + parseFloat(item_kv[1]));
				}
			}
			var temp_string = '<span onclick="select_item(this)">' + curr_string + '\n</span>';
			show_datas_string += temp_string;
		}
		$('#ul_show_datas').append(show_datas_string+'\n<hr /></span></li>');
		$('#textarea_data').val('');
		console.log(items)
		$('#textarea_datas_sum').append(area + '\n');
		$('#textarea_datas_sum').append(items[1].replace('情况', '额') + '\n');
		$('#textarea_datas_sum').append('预估营业额:' + map_sum.get('预估营业额') + '\n');
		$('#textarea_datas_sum').append('实际营业额:' + map_sum.get('实际营业额') + '\n');
		var day_rate = parseFloat(map_sum.get('实际营业额')) / parseFloat(map_sum.get('预估营业额'));
		$('#textarea_datas_sum').append('当日达成率:' + (100* day_rate).toFixed(2) + '%\n');
		$('#textarea_datas_sum').append('月累计营业额:' + map_sum.get('月累计营业额') + '\n');
		var month_rate = parseFloat(map_sum.get('月累计营业额')) / parseFloat(estimate_value)
		$('#textarea_datas_sum').append('月累计达成率:' + (100 * month_rate).toFixed(2) + '%\n');
		$('#textarea_datas_sum').append('外卖单数:' + map_sum.get('外卖TC') + '\n');
		$('#textarea_datas_sum').append('外卖金额:' + parseFloat(map_sum.get('外卖金额')).toFixed(1) + '\n');
	}
}

function select_item(obj) {
	var key = $(obj).attr("value");
	var value = $(obj).text();
}

function get_all_info() {
	var infos = $("#ul_show_datas").text().trim();
	$("#copy_tools").css("display", "block");
	$("#copy_tools").text(infos);
	var copyText = $("#copy_tools");//获取对象
	copyText.select();//选择
	document.execCommand("Copy");//执行复制
	$("#copy_tools").css("display", "none");
}

function get_sum_info() {
	var infos = $("#textarea_datas_sum").text().trim();
	$("#copy_tools").css("display", "block");
	$("#copy_tools").text(infos);
	var copyText = $("#copy_tools");//获取对象
	copyText.select();//选择
	document.execCommand("Copy");//执行复制
	$("#copy_tools").css("display", "none");
}