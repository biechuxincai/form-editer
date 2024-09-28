/**
 * Created by bsj on 2024/7/8 16:40
 */

require.config({
    paths: {
        jquery: '../../sys/jquery',
        layui: "../../layui/layui",
        itemHtml: "table/items"
    },
    shim: {
        "layui": {
            deps: ["jquery"]
        },
        "config": {
            deps: ["layui"]
        }
    },
    waitSeconds: 0
});
// 统一字段
const TYPE = ['table_search_type', 'table_show_type', 'table_option_type', 'table_bitch_option_type'];
let id;
let searchFieldTypeArr = [];
let showFieldTypeArr = [];
let optionColumnTypeArr = [];
let bitchOptionColumnTypeArr = [];
//当前表名;
let tableName = '';

let dictList = [];
let fieldsDsc = [];
//不展示字段
const hideColumns = ["id", "lan", "uid", "departno", "alterid", "isdel"];

require(["jquery", 'layui', 'itemHtml'], function () {
    layui.use(['form', 'laydate'], function () {
        var form = layui.form;
        var layer = layui.layer;
        var url = layui.url();
        tableName = url.search.tableName;
        id = url.search.id;
        let optionItem = new OptionType("table_option_type", optionColumnTypeArr);
        let showItem = new ShowType("table_show_type", showFieldTypeArr);
        let searchItem = new SearchType("table_search_type", searchFieldTypeArr);
        let bitchOptionItem = new BitchOptionType("table_bitch_option_type", bitchOptionColumnTypeArr);

        window.getData = function (cb) {
            let arrsm = [];
            let searchArr = ["table_search_type", "table_show_type", "table_option_type", "table_bitch_option_type"];
            arrsm.push(["dictData.getBitchDictByColumn", $.msgwhere({"dict_type": $.msgpJoin(searchArr)})]);
            arrsm.push(['generatable.getFormColumns', tableName]);
            $.sm(function (re, err1) {
                if (re) {
                    if (!re[0].error) {
                        searchFieldTypeArr = re[0].filter(item => item.dict_type === "table_search_type");
                        showFieldTypeArr = re[0].filter(item => item.dict_type === "table_show_type");
                        optionColumnTypeArr = re[0].filter(item => item.dict_type === "table_option_type");
                        bitchOptionColumnTypeArr = re[0].filter(item => item.dict_type === "table_bitch_option_type");
                        if (re[1].code === 0) {
                            fieldsDsc = re[1].data;
                            cb && cb();
                        } else {
                            jQuery.getparent().layer.msg(re[1].msg, {icon: 5});
                        }
                    } else {
                        jQuery.getparent().layer.msg(re[0].error, {icon: 5});
                    }
                } else {

                }
            }, arrsm, null, null, {async: false});
        };

        window.render = function () {
            //添加按钮
            $("#table_search_type").append(searchItem.getAddBtnHtml());
            $("#table_show_type").append(showItem.getAddBtnHtml());
            $("#table_option_type").append(optionItem.getAddBtnHtml());
            $("#table_bitch_option_type").append(bitchOptionItem.getAddBtnHtml());
        };

        window.init = function () {
            getData(function () {
                //初始化
                this.render();
                //添加事件
                searchItem.setInitData(fieldsDsc, searchFieldTypeArr, dictList);
                searchItem.init();
                showItem.setInitData(fieldsDsc, showFieldTypeArr);
                showItem.init();
                optionItem.setInitData(optionColumnTypeArr);
                optionItem.init();
                bitchOptionItem.setInitData(bitchOptionColumnTypeArr);
                bitchOptionItem.init();
                // 回显
                backShow(searchItem, showItem, optionItem, bitchOptionItem);
            });
        };
        $("#saveOK").click(function (event, callback) {
            form.submit('formOk', function (data) {
                let field = data.field; // 获取表单字段值
                // 处理收集数据
                let msg = dealData(field);
                $.sm(function (re, err) {
                    if (err) {
                        layer.msg("保存失败");
                    } else {
                        layer.msg("保存成功");
                        callback && callback();
                    }
                }, ["generatable.savetable", JSON.stringify({"table_content": msg}), $.msgwhere({"id": [id]})]);

                return false;
            });
            return false;
        });
        init();

        function dealData(field) {
            //处理搜索框内容
            let map = {};
            map['table_search_type'] = [];
            map['table_show_type'] = [];
            map['table_option_type'] = [];
            map['table_bitch_option_type'] = [];
            searchItem.searchFieldAddIdArr.forEach(item => {
                map['table_search_type'].push({
                    "field": field[item + "_" + TYPE[0] + "_select"],
                    "type": field[item + "_" + TYPE[0] + "_input"],
                    "select": field[item + "_" + TYPE[0] + "_dict"]
                });
            });

            showItem.showFieldAddIdArr.forEach(item => {
                map['table_show_type'].push({
                    "field": field[item + "_" + TYPE[1] + "_select"],
                    "type": field[item + "_" + TYPE[1] + "_input"],
                    "width": field[item + "_" + TYPE[1] + "_width"],
                    "sort": field[item + "_" + TYPE[1] + "_sort"]
                });
            });
            optionItem.optionColumnIdArr.forEach(item => {
                map['table_option_type'].push({
                    "field": field[item + "_" + TYPE[2] + "_input"],
                    "permission": field[item + "_" + TYPE[2] + "_permission"]
                });
            });
            bitchOptionItem.optionColumnIdArr.forEach(item => {
                map['table_bitch_option_type'].push({
                    "field": field[item + "_" + TYPE[3] + "_input"],
                    "permission": field[item + "_" + TYPE[3] + "_permission"]
                });
            });
            return map;
        }
    });
});

/**
 * 回显数据
 */
function backShow(searchItem, showItem, optionItem, bitchOptionItem) {

    $.sm(function (re, err) {
        if (err) {
            layer.msg(err);
        } else {
            if (re.table_content) {
                let obj = JSON.parse(re.table_content);
                if (obj["table_search_type"]) {
                    searchItem.backShow(obj["table_search_type"]);

                }
                if (obj["table_show_type"]) {
                    showItem.backShow(obj["table_show_type"]);
                }
                if (obj["table_option_type"]) {
                    optionItem.backShow(obj["table_option_type"]);
                }
                if (obj["table_bitch_option_type"]) {
                    bitchOptionItem.backShow(obj["table_bitch_option_type"]);
                }
            }
        }
    }, ["generatable.getTableContent", id]);
}


/**
 * 生成uuid
 * @returns {string}
 */
function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    return s.join("");
}