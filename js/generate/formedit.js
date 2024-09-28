/**
 * Created by bsj on 2024/7/8 16:40
 */

require.config({
    paths: {
        layui: "../../layui/layui",
        jquery: '../../sys/jquery',
        ueditorconfig: "../../plugin/ueditor/ueditor.config",
        ueditor: "../../plugin/ueditor/ueditor.all.min",
        ZeroClipboard: "../../plugin/ueditor/third-party/zeroclipboard/ZeroClipboard",
        webuploader: "../../plugin/ueditor/third-party/webuploader/webuploader",
        Sortable: "../../plugin/sortable/sortable",
        xmSelect: "../../plugin/xm-select/xm-select",
        itemHtml: "./table/items",
        formMethod: "./form/formEditMethod",
        formVarious: "./form/formVarious",

    },
    shim: {
        "layui": {
            deps: ["jquery"]
        },
        "config": {
            deps: ["layui"]
        },
        "ueditor": {
            deps: ["ueditorconfig"]
        },
        "formVarious": {
            deps: ["itemHtml"]
        }
    },
    waitSeconds: 0
});

/**
 * 添加删除事件
 * @param name
 */
function onDeleteEvent(name) {
    $("#" + name + "_id_icon").click(function () {
        layer.confirm('确定删除？', {
            btn: ['确定', '取消'] //按钮
            , icon: 3,
            title: '提示'
        }, function () {
            let curNode = $("#" + name + "_id");
            curNode.remove();
            $("#config").children().remove();
            copyContent.delete(name);
            globalData.delete(name);
            let obj = {};
            obj[name] = '';
            layui.form.val("formOk", obj);
            layer.msg('删除成功', {icon: 1});
        }, function () {

        });

    });
}

/**
 * 添加字段配置
 * @param item
 */
function addConfigItems(item) {
    let selectNode = $("#config");
    selectNode.children().remove();
    selectNode.append(moreConfigGen(item));
    layui.form.render(selectNode);
    //赋值
    let data = globalData.get(item.column_name);
    layui.form.val("configForm", data);
    //添加事件 并触发事件
    addConfigItemEvents(item);
    //二次赋值
    layui.form.val("configForm", data);
}

/**
 * 基础输入处理
 * @param item
 * @param value
 * @param parentNode
 */
function inputDeal(item, value, parentNode) {
    let tag = formTypeMap.get(value) || {};
    tag["name"] = item.column_name;
    tag["key"] = value;
    let curNode = $("#" + item.column_name + "_id");
    if (parentNode.find("#" + item.column_name + "_id").length > 0) {
        // 保证添加顺序
        let preNode = curNode.prev();
        let afterNode = curNode.next();
        curNode.remove();
        globalData.delete(item.column_name);
        if (preNode.length > 0) {
            preNode.after(gen(tag));
        } else if (afterNode.length > 0) {
            afterNode.before(gen(tag));
        } else {
            parentNode.append(gen(tag));
        }
        $(".preview .layui-form-item").removeClass("active");
        $("#" + tag.name + "_id").addClass("active");
    } else {
        parentNode.append(gen(tag));
    }
    $("#" + item.column_name + "_id").off('click').on('click', function (e) {
        //当 div 为嵌套关系的时候 阻止事件冒泡
        e.preventDefault();
        e.stopPropagation();
        active(item.column_name);
    });
    if (tag["script"]) {
        let script = tag["script"].replaceAll("${{param}}", item.column_name);
        let scriptTag = document.createElement('script');
        scriptTag.innerHTML = script;
        document.head.append(scriptTag);
    }

    //添加删除监听
    onDeleteEvent(tag.name);
    //添加配置项
    addConfigItems(item);

}

require(["jquery", 'layui', 'itemHtml', 'xmSelect', 'formVarious', 'formMethod',], function () {


    layui.use(['form', 'laydate'], function () {
        var form = layui.form;
        var layer = layui.layer;
        var url = layui.url();
        tableName = url.search.tableName;
        id = url.search.id;
        window.getData = function (cb) {
            //返回值为数组，和消息位数相对应
            dictList = [];//数据字典
            // tableList = re1[2];
            let columns = [{"column_name": "temp1"}, {"column_name": "temp2"}] //re1[1].filter(item => !hideColumns.includes(item.column_name));// 数据库字段
            let fieldDsc = [{"column_name": "temp1"}, {"column_name": "temp2"},]//re1[2];// 字段信息
            let fieldMap = new Map;
            fieldDsc.forEach(item => {
                fieldMap.set(item.column_name, item);
            });
            columns.forEach(item => {
                $.extend(item, fieldMap.get(item.column_name));
                fieldInfo.set(item.column_name, item);
            });
            cb && cb(columns);
        };

        window.render = function (arr) {
            let htmlStr = '';
            htmlStr += '<table class="layui-table">';
            htmlStr +=
                '  <thead>\n' +
                '    <tr>\n' +
                '      <th style="text-align: center;">表单字段</th>\n' +
                '      <th style="text-align: center;width: 130px">显示类型</th>\n' +
                '    </tr> \n' +
                '  </thead>';
            htmlStr += ' <tbody>';
            let options = '<option value="clear">请选择</option></br>';
            optionsMap.forEach((value, key) => {
                options += '<optgroup label="' + key + '">';
                options += value.join('');
                options += '</optgroup>';
            });
            arr.forEach(item => {
                htmlStr += '<tr>';
                htmlStr += '<td>';
                htmlStr += '<label class="">' + item.column_name + '</label>';
                htmlStr += '</td>';
                htmlStr += '<td>';
                htmlStr += '<select id="' + item.column_name + "_select" + '" name="' + item.column_name + '" lay-filter="' + item.column_name + "_select" + '" >';
                htmlStr += options;
                htmlStr += '</select>';
                htmlStr += '</td>';
                htmlStr += '</tr>';
            });
            htmlStr += '</tbody>';
            htmlStr += '</table>';
            $("#editor").append(htmlStr);
            let parentNode = $("#preview");

            //添加事件
            arr.forEach(item => {
                let filterName = item.column_name + "_select";
                form.on('select(' + filterName + ')', function (data) {
                    var value = data.value; // 获得被选中的值
                    //保存选择
                    copyContent.set(item.column_name, {
                        "item": item,
                        "inputType": value,
                        "dict": "" //字典列表 select, radio, checkbox
                    });
                    //选择框处理
                    item.type = value;
                    switch (value) {
                        case 'clear':
                            //删除
                            if (parentNode.find("#" + item.column_name + "_id").length > 0) {
                                let curNode = $("#" + item.column_name + "_id");
                                curNode.remove();
                            }
                            $("#config").children().remove();
                            copyContent.delete(item.column_name);
                            break;
                        default:
                            //输入
                            inputDeal(item, value, parentNode);
                    }

                    //添加配置按钮事件
                    // configEvent(item);
                    form.render($("#preview"));
                    form.render($("#editor"));
                });
            });
            $("tbody tr").on('click', function (e) {
                //当 div 为嵌套关系的时候 阻止事件冒泡
                e.preventDefault();
                e.stopPropagation();
                let field = this.children[0].textContent;
                active(field);
            });

        };

        window.init = function () {
            getData(function (arr) {
                render(arr);
                form.render($("#editor"));
                //回显
                backShow();
                require(['Sortable'], function (Sortable) {
                    sortable = new Sortable($("#preview")[0], {
                        group: {
                            name: 'previewGroup',
                        },
                        animation: 150,
                        ghostClass: 'blue-background-class',
                        dataIdAttr: 'data-id',
                        // 结束拖拽
                        onEnd: function (/**Event*/evt) {
                            fieldArrSort = sortable.toArray();
                        },
                    });
                });

            });
        };
        //初始化
        init();

        //保存
        $("#saveButton").click(function (event, callback) {
            form.submit('formOk', function (data) {
                let lastData = form.val('configForm');
                if (curField !== "" && copyContent.get(curField)) {
                    globalData.set(curField, lastData);
                }
                for (let key of copyContent.keys()) {
                    $.extend(copyContent.get(key), globalData.get(key, true));
                }
                //保存数据
                let arrData = [], i = 0;
                fieldArrSort = sortable.toArray();
                fieldArrSort.forEach(item => {
                    arrData[i++] = copyContent.get(item);
                });
                //处理隐藏数据
                for (let value of copyContent.values()) {
                    if (value.inputType === "hidden") {
                        arrData[i++] = value;
                    }
                }
                console.log(JSON.stringify({"form_content": deepCopy(arrData)}));
                return false;
            });
            return false;
        });
    });
});

function active(field) {
    if ($("#" + field + "_select").parent().parent().hasClass("active")) {
        return;
    }

    layui.form.submit('configForm', function (dd) {
        // var field = data.field; // 获取表单全部字段值
        $("tbody tr").removeClass("active");
        $("#" + field + "_id").addClass("active");
        $("#" + field + "_select").parent().parent().addClass("active");
        let config = copyContent.get(field);
        let data = layui.form.val('configForm');
        if (config && config.inputType !== "") {
            //添加配置项
            addConfigItems(config.item);
        } else {
            $("#config").children().remove();
        }
        if (curField !== "" && copyContent.get(curField)) {
            // console.log(data);
            globalData.set(curField, data);
            $("#" + curField + "_id").removeClass("active");
        }

        curField = field;
    });
}

/**
 * 回显数据
 */
function backShow() {

    //     if (err) {
    //         layer.msg(err);
    //     } else {
    //         if (re.form_content) {
    //             let valueMap = new Map;
    //             // 转换为JavaScript对象
    //             var obj = JSON.parse(re.form_content);
    //
    //             obj.forEach(item => {
    //                 valueMap.set(item.item.column_name, item.inputType);
    //                 globalData.set(item.item.column_name, item);
    //             });
    //             //这样直接赋值无法触发监听的事件，所以后面需要单独触发，暂时没有好的解决办法
    //             layui.form.val('formOk', deepCopy(valueMap));
    //             valueMap.forEach((value, key, map) => {
    //                 let idName = key + "_select";
    //                 layui.event.call(this, "form", 'select(' + idName + ')', {
    //                     elem: $("#" + idName)[0]
    //                     , value: value
    //                     , othis: $("#" + idName).next()
    //                 });
    //             });
    //             layui.form.render();
    //             $("#config").children().remove();
    //             obj.forEach(item => {
    //                 $.extend(copyContent.get(item.item.column_name), item);
    //             });
    //         }
    // }

}



