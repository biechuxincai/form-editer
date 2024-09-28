/**
 * Created by bsj on 2024/7/23 10:00
 */

/**
 * 添加事件
 * @param item
 */
function addConfigItemEvents(item) {
    let obj = formTypeMap.get(item.type);
    let data1 = globalData.get(item.column_name);
    obj.extConfigs.forEach(type => {
        let data = deepCopy(item);
        $.extend(data, data1);
        extConfigType[type].event(data);
        extConfigType[type].backShowTrigger(data);
        if (extConfigType[type].components) {
            extConfigType[type].components.forEach(component => {
                if (extConfigType[type].inputType === "select") {
                    extConfigType[component].event(data);
                    if (data[type] === component) {
                        extConfigType[component].backShowTrigger(data);
                    }
                } else {
                    extConfigType[component].event(data);
                    extConfigType[component].backShowTrigger(data);
                }
            });
        }
    });

}


function getConfigItem(key, param) {
    let itemHtml = '<div class="config-item">';
    let item = extConfigType[key];
    switch (item.showType) {
        case "input":
            itemHtml += '<div class="layui-form-item">';
            itemHtml += '       <label class="layui-form-label">' + item.labelName + '</label>';
            itemHtml += '        <div class="layui-input-block">';
            itemHtml += '<input type="' + item.inputType + '" name="' + key + '" id="' + key + '" placeholder="' + item.placeholder + '" ' + ' autocomplete="off" class="layui-input myInput" ' + item.other +
                ' lay-verify="' + item.verify + '" ' +
                'lay-filter="' + item.layFilter(param.column_name) + '"' +
                ' value="' + item.value(param.column_name) + '"' +
                '/>';
            itemHtml += '            </div>';
            itemHtml += '            </div>';
            break;
        case "select":
            itemHtml += '<div class="layui-form-item" id="' + item.formItemId(param.column_name) + '">\n' +
                '       <label class="layui-form-label">' + item.labelName + '</label>';
            itemHtml += ' <div class="layui-input-block">';
            itemHtml += '<select  class="myInput" name="' + key + '" id="' + key + '" lay-verify="' + item.verify + '" lay-filter="' + item.layFilter(param.column_name) + '">';
            itemHtml += item.options();
            itemHtml += '</select>';
            itemHtml += '</div>';
            itemHtml += '</div>';
            break;
        case "combination":
            //组合模式 内部统一支持
            itemHtml += '<div class="layui-form-item">';
            itemHtml += '       <label class="layui-form-label">' + item.labelName + '</label>';
            itemHtml += '        <div class="layui-input-block">';
            let hiddenFlag = true;
            switch (item.inputType) {
                case "select":
                    itemHtml += '<select class="myInput" name="' + key + '" id="' + key + '" lay-verify="' + item.verify + '" lay-filter="' + item.layFilter(param.column_name) + '">';
                    itemHtml += item.options();
                    itemHtml += '</select>';
                    break;
                case "object":
                    Object.entries(item.children).forEach(([k, value]) => {
                        itemHtml += ' <input type="text" value="' + key + '" name="' + "Object_$" + key + '" style="display: none" class="layui-input">';

                        itemHtml += ' <div class="layui-input-group">';
                        itemHtml += ' <div class="layui-input-prefix layui-input-split">\n' +
                            '          <i> ' + value.placeholder + '</i>\n' +
                            '        </div>\n';
                        let name = "Object_" + key + "_" + k;
                        itemHtml += '<input type="' + value.inputType + '" name="' + name + '" id="' + name + '" placeholder="' + value.placeholder + '" ' + ' autocomplete="off" class="layui-input myInput" ' + value.other +
                            ' lay-verify="' + value.verify + '" ' +
                            '/>';
                        itemHtml += '</div>';
                    });

                    break;
                default:
                    itemHtml += '';
            }
            itemHtml += '        </div>';
            itemHtml += '</div>';

            item.components && item.components.forEach(component => {
                let idName = key + "_" + component;
                let className = hiddenFlag ? "hidden" : "";
                itemHtml += '<div class="' + className + '" id="' + idName + '">';
                itemHtml += getConfigItem(component, param);
                itemHtml += '</div>';
            });
            break;
        case "options":
            itemHtml += '<div class="layui-form-item">';
            itemHtml += '       <label class="layui-form-label">' + item.labelName + '</label>';
            // itemHtml += ' <input type="text" value="' + key + '" name="' + "Options_$" + key + '" style="display: none" class="layui-input">';
            itemHtml += '        <div class="" id="' + key + '" ' + item.other + '>';

            itemHtml += '</div>';
            itemHtml += '            </div>';
            break;
        default:
            itemHtml += '';
    }
    itemHtml += '</div>';
    return itemHtml;
}


/**
 * 更多配置信息
 * @param param
 */
function moreConfigGen(param) {
    let configHtml = '';
    if (formTypeMap.get(param.type)) {
        formTypeMap.get(param.type).extConfigs.forEach(item => {
            configHtml += getConfigItem(item, param);
        });
    }
    return configHtml;
}

let SelectCallback = function (item) {
    var that = this;
    that.item = item;
};

/**
 * 选择回调，渲染预览信息
 */
SelectCallback.prototype.fun = {
    dict: function (data) {
        let value = data.value; // 获得被选中的值
        let selectNode = $("#" + this.item.column_name + "_id_" + this.item.type);
        selectNode.children().remove();
        let that = this;
// //请求
//         if (err) {
//             layer.msg("字典获取失败");
//         } else {
//             if (that.item.type === "multi-select") {
//                 let data = [];
//                 re.forEach(v => {
//                     data.push({name: v.dict_label, value: v.dict_value});
//                 });
//                 xmSelect.render({
//                     el: '#' + that.item.column_name + '_id_multi-select',
//                     tips: '全部',
//                     toolbar: {
//                         show: true,
//                         list: ['ALL', 'REVERSE', 'CLEAR']
//                     },
//                     autoRow: true,
//                     height: '140px',
//                     data: data
//                 });
//             } else {
//                 re.forEach(v => {
//                     selectNode.append(getPreviewDictItem(that.item, v));
//                 });
//             }
//
//             copyContent.get(that.item.column_name).dict = value;
//         }
        layui.form.render($("#preview"));
    },
    DB: function (that, item) {
        try {
            let selectNode = $("#" + item.column_name + "_id_" + item.type);
            selectNode.children().remove();
            let key = $("#Object_other_data_key").val().trim();
            let value = $("#Object_other_data_value").val().trim();
            if (key.length === 0 || value.length === 0) {
                return;
            }
            $.sm(function (re, err) {
                if (err) {
                    layer.msg("字典获取失败");
                } else {
                    let fields = value.split(",");
                    if (item.type === "multi-select") {
                        let data = [];
                        re.data.forEach(v => {
                            data.push({name: v[fields[0]], value: v[fields[0]]});
                        });
                        xmSelect.render({
                            el: '#' + item.column_name + '_id_multi-select',
                            tips: '全部',
                            toolbar: {
                                show: true,
                                list: ['ALL', 'REVERSE', 'CLEAR']
                            },
                            autoRow: true,
                            height: '140px',
                            data: data
                        });
                    } else {
                        re.data.forEach(v => {
                            selectNode.append(getPreviewDBItem(item.type, item, v[fields[0]], v[fields[0]]));
                        });
                    }

                }
            }, ["generatable.getDBFields", value, key], null, null, {async: false});
        } finally {
            layui.form.render($("#preview"));
        }
    }
};

function getPreviewDictItem(item, v) {
    switch (item.type) {
        case "select":
            return '<option value="' + v.dict_value + '">' + v.dict_label + '</option>';

        case "checkbox":
            return '<input type="checkbox" name="' + item.column_name + '" id="' + v.dict_label + '" value="' + v.dict_value + '" title="' + v.dict_label + '"> ';

        case "radio":
            return '<input type="radio" name="' + item.column_name + '" id="' + v.dict_label + '" value="' + v.dict_value + '" title="' + v.dict_label + '"/>';
        default:
            return "";
    }
}

function getPreviewDBItem(type, item, data, id) {
    switch (type) {
        case "select":
            return '<option id="' + id + '" value="' + data + '">' + data + '</option>';

        case "checkbox":
            return '<input type="checkbox" name="' + data + '" id="' + id + '" value="' + data + '" title="' + data + '"> ';

        case "radio":
            return '<input type="radio" name="' + item.column_name + '" id="' + id + '" value="' + data + '" title="' + data + '"/>';
        default:
            return "";
    }

}

/**
 * 生成预览代码片段
 * @param param 参数
 * @returns {string} html字符串
 */
function gen(param) {
    if (param.hidden) {
        return "";
    }
    let codeSnippet = '<div class="layui-form-item"  data-id="' + param.name + '" id="' + param.name + "_id" + '">';
    codeSnippet += '<div class="layui-inline" style="width: 90%;">' +
        '<label class="layui-form-label" id="' + param.name + '_label_show">' +
        param.name + '</label>';
    switch (param.key) {
        case "input":
        case "password":
            codeSnippet += '<div class="layui-input-block"><input type="' + param.key + '" name="' + param.name + '" placeholder="' + param.placeholder + '" class="layui-input" ';
            if (param.attr) {
                for (let i = 0; i < param.attr.length; i++) {
                    codeSnippet += param.attr[i];
                }
            }
            codeSnippet += '/></div>';
            break;
        case "textarea":
            codeSnippet += '<div class="layui-input-block"><textarea name="' + param.name + '" placeholder="' + param.placeholder + '" class="layui-textarea"></textarea></div>';
            break;
        case "select-DB":
        case "select":
            codeSnippet += '<div class="layui-input-block"><select name="' + param.name + '" id="' + param.name + "_id" + "_select" + '"></select></div>';
            break;
        case "multi-select-DB":
        case "multi-select":
            codeSnippet += '<div class="layui-input-block"> <div id="' + param.name + '_id_multi-select"  class="xm-select-demo" ></div></div>';
            break;
        case "radio":
            codeSnippet += '<div class="layui-input-block"><div  id="' + param.name + "_id" + "_radio" + '"></div></div>';
            break;
        case "checkbox":
            codeSnippet += '<div class="layui-input-block"><div  id="' + param.name + "_id" + "_checkbox" + '"></div></div>';
            break;
        case "switch":
            codeSnippet += '<input type="checkbox" name="' + param.name + '" title="开启|关闭" lay-skin="switch">';
            break;
        case "year":
        case "month":
        case "datetime":
        case "date":
        case "time":
            codeSnippet += '<div class="layui-input-block"><input type="text" class="layui-input"  name="' + param.name + '"  id="' + param.name + '-laydate" placeholder=""/></div>';
            break;
        case "year-range":
        case "month-range":
        case "date-range":
        case "datetime-range":
        case "time-range":
            codeSnippet +=
                '<div class="layui-inline" id="' + param.name + '-laydate-range"> ' +
                '<div class= "layui-input-inline" > ' +
                '<input type = "text" name="' + param.name + '_start" autocomplete = "off" id = "' + param.name + '-laydate-start-date" class= "layui-input" placeholder = "开始日期" > ' +
                '</div> ' +
                '<div class="layui-form-mid">-</div> ' +
                '<div class="layui-input-inline"> ' +
                '<input type="text" name="' + param.name + '_end" autocomplete="off" id="' + param.name + '-laydate-end-date" class="layui-input" placeholder="结束日期"> ' +
                '</div> ' +
                '</div>';
            break;
        case "upload-image-single":
            codeSnippet +=
                '<div class="layui-input-block">' +
                '<button type="button" class="layui-btn" id="' + param.name + '-upload-btn">\n' +
                '  <i class="layui-icon layui-icon-upload"></i> 单图片上传\n' +
                '</button>\n' +
                '<div style="width: 132px;">\n' +
                '  <div class="layui-upload-list">\n' +
                '    <img class="layui-upload-img" id="' + param.name + '-upload-img" style="width: 100%; height: 92px;">\n' +
                '    <div id="' + param.name + '-upload-text"></div>\n' +
                '  </div>\n' +
                '  <div class="layui-progress layui-progress-big" lay-showPercent="yes" lay-filter="filter-' + param.name + '">\n' +
                '    <div class="layui-progress-bar" lay-percent=""></div>\n' +
                '  </div>\n' +
                '</div>' +
                '</div>';
            break;
        case "upload-image-multi":
            codeSnippet += '<div class="layui-input-block">' +
                '<div class="layui-upload">\n' +
                '  <button type="button" class="layui-btn" id="' + param.name + '-upload-btn">\n' +
                '    <i class="layui-icon layui-icon-upload"></i> 多图片上传\n' +
                '  </button> \n' +
                '  <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 11px;">\n' +
                '    预览图：\n' +
                '    <div class="layui-upload-list" id="' + param.name + '-upload-preview"></div>\n' +
                ' </blockquote>\n' +
                '</div>' +
                '</div>';
            break;
        case "upload-file-single":
            codeSnippet += '<div class="layui-input-block">' +
                '<div class="layui-btn-container">\n' +
                '  <button type="button" class="layui-btn layui-btn-normal" id="' + param.name + '-upload-choose">选择文件</button>\n' +
                //'  <button type="button" class="layui-btn" id="' + param.name + '-upload-action">开始上传</button>\n' +
                '</div>' +
                '</div>';
            break;
        case "upload-file-multi":
            codeSnippet += '<div class="layui-input-block">' +
                '<div class="layui-upload">\n' +
                '  <button type="button" class="layui-btn layui-btn-normal" id="' + param.name + '-upload-files">选择多文件</button> \n' +
                '  <div class="layui-upload-list">\n' +
                '    <table class="layui-table">\n' +
                '      <colgroup>\n' +
                '        <col style="min-width: 100px;">\n' +
                '        <col width="150">\n' +
                '        <col width="260">\n' +
                '        <col width="150">\n' +
                '      </colgroup>\n' +
                '      <thead>\n' +
                '        <th>文件名</th>\n' +
                '        <th>大小</th>\n' +
                '        <th>上传进度</th>\n' +
                '        <th>操作</th>\n' +
                '      </thead>\n' +
                '      <tbody id="' + param.name + '-upload-files-list"></tbody>\n' +
                '    </table>\n' +
                '  </div>\n' +
                //'  <button type="button" class="layui-btn" id="' + param.name + '-upload-files-action">开始上传</button>\n' +
                '</div>' +
                '</div>';
            break;
        case 'picture-select':
            codeSnippet += '\t<div class="layui-input-block">\n' +
                '\t\t<img alt="" id="' + param.name + '-img_picurl" src="../../images/default.png" style="width: 142px; height: 142px; border: 1px solid #EDEDED;" />\n' +
                '\t\t<input type="hidden" id="' + param.name + '-txtimgurl" value="" lay-verify="' + param.name + '-cheksign_img" />\n' +
                '\t\t<span class="layui-btn" style="position: relative; vertical-align: middle; line-height: 37px; height: 37px;" id="' + param.name + '-btnselimg">上传头像</span>\n' +
                '\t\t<span style="display: inline-block; vertical-align: middle; color: #999999;">提示：图片类型为jpg,png</span>\n' +
                '\t</div>';
            break;
        case 'ueditor':
            codeSnippet += '<div class="layui-input-block">\n' +
                '\t\t\t<div lay-verify="' + param.name + '-chkcontent">\n' +
                '\t\t\t\t<script id="' + param.name + '-editor_zh" name="' + param.name + '-editor_zh" type="text/plain">\n' +
                '\t\t\t\t</script>\n' +
                '\t\t\t</div>\n' +
                '\t\t</div>';
            break;
        case 'hidden':
            codeSnippet += '';
            break;
        case 'selarea':
            codeSnippet += '<div class="layui-input-block"><div class="layui-input-inline" style="width: 29%;">\n' +
                '      <select name="quiz1">\n' +
                '        <option value="">请选择省</option>\n' +
                '        <option value="浙江" selected>浙江省</option>\n' +
                '        <option value="你的工号">江西省</option>\n' +
                '        <option value="你最喜欢的老师">福建省</option>\n' +
                '      </select>\n' +
                '    </div>\n' +
                '    <div class="layui-input-inline" style="width: 29%;">\n' +
                '      <select name="quiz2">\n' +
                '        <option value="">请选择市</option>\n' +
                '        <option value="杭州">杭州</option>\n' +
                '        <option value="宁波" disabled>宁波</option>\n' +
                '        <option value="温州">温州</option>\n' +
                '        <option value="温州">台州</option>\n' +
                '        <option value="温州">绍兴</option>\n' +
                '      </select>\n' +
                '    </div>\n' +
                '    <div class="layui-input-inline" style="width: 29%;">\n' +
                '      <select name="quiz3">\n' +
                '        <option value="">请选择县/区</option>\n' +
                '        <option value="西湖区">西湖区</option>\n' +
                '        <option value="余杭区">余杭区</option>\n' +
                '        <option value="拱墅区">临安市</option>\n' +
                '      </select>\n' +
                '    </div></div>';
            break;
        default:
            codeSnippet += '<span>暂不支持</span>';
    }

    codeSnippet += '  </div>';

    codeSnippet += '<i class="layui-icon layui-icon-clear delete-icon" id="' + param.name + "_id" + "_icon" + '"></i> ';
    codeSnippet += ' </div>';
    return codeSnippet;
}

/**
 * 深拷贝
 * @param target
 * @returns {{}|*}
 */
function deepCopy(target) {
    const clone = {};
    if (target instanceof Map) {
        return deepCopyMap(target);
    }
    if (Array.isArray(target)) return target.map(deepCopy);
    if (!isObject(target)) return target;
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            clone[key] = deepCopy(target[key]);
        }
    }
    return clone;
}

function deepCopyMap(map) {
    const clone = {};

    for (const [key, value] of map) {
        if (value instanceof Map) {
            // 如果值也是一个Map，递归地进行深度复制
            clone[key] = deepCopyMap(value);
        } else if (typeof value === 'object' && value !== null && !(value instanceof Date) || Array.isArray(value)) {
            // 如果值是对象（除了Date对象），使用structuredClone进行深拷贝
            clone[key] = deepCopy(value);
        } else {
            // 如果值不是Map也不是复杂对象，直接设置
            clone[key] = value;
        }
    }
    return clone;
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}