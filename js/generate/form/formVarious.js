/**
 * Created by bsj on 2024/7/9 10:51
 */


let id;
let formTypeMap = new Map();
formTypeMap = {
    "input": {
        "type": "input",
        "name": "单行输入框",
        "placeholder": "请输入",
        "showLabel": false,
        "isTextarea": false,
        "label": {
            "labelTitle": "",
            "labelPosition": "left",
            "labelwidth": 50,
            "labelWidth": "50px"
        },
        "value": "",
        "fieldTypes": "inputTypes",
        "style": {
            "margin": "0px 0px 0px 0px"
        },
        "extConfigs": ["field_len", "label_name", "null_able", "only_able", "verify_content"]
    },
    "textarea": {
        "type": "input",
        "name": "多行输入框",
        "placeholder": "请输入",
        "value": "",
        "extConfigs": ["field_len", "label_name", "null_able", "verify_content"]
    },
    "password": {
        "type": "input",
        "name": "密码输入框",
        "placeholder": "请输入",
        "value": "",
        "extConfigs": ["field_len", "label_name", "null_able", "verify_content"]
    },
    "select": {
        "type": "select",
        "name": "下拉",
        "value": "只读",
        "extConfigs": ["label_name", "null_able", "data_type"]
    },
    "multi-select": {
        "type": "select",
        "name": "下拉多选",
        "extConfigs": ["label_name", "null_able", "data_type"]
    },
    // "text": {
    //     "type": "password",
    //     "name": "文本框",
    //     "placeholder":
    //     "value":
    //     "attr": ["readonly"],
    //     "extConfigs": ["field_len", "label_name", "null_able",  "verify_content"]
    // },
    "radio": {
        "type": "radio",
        "name": "单选框",
        "value": "",
        "title": "",
        "extConfigs": ["label_name", "null_able", "data_type"]
    },
    "checkbox": {
        "type": "checkbox",
        "name": "复选框",
        "value": "",
        "title": "",
        "extConfigs": ["label_name", "null_able", "data_type"]
    },
    "switch": {
        "type": "checkbox",
        "name": "开关",
        "extConfigs": ["label_name", "null_able"]
    },
    "hidden": {
        "type": "input",
        "name": "隐藏",
        "extConfigs": [],
        "hidden": true
    },
    "year": {
        "type": "date",
        "name": "年份",
        "script": 'layui.use(function(){' +
            '  var laydate = layui.laydate;\n' +
            'laydate.render({\n' +
            '   elem: "#${{param}}-laydate",\n' +
            'type: "year",' +
            ' })' +
            '});',
        "extConfigs": ["date_format", "label_name", "null_able", "verify_content"]
    },
    "month": {
        "type": "date",
        "name": "年月",
        "script": 'layui.use(function(){' +
            '  var laydate = layui.laydate;\n' +
            'laydate.render({\n' +
            '   elem: "#${{param}}-laydate",\n' +
            'type: "month",' +
            ' })' +
            ' });',
        "extConfigs": ["date_format", "label_name", "null_able", "verify_content"]
    },
    "time": {
        "type": "date",
        "name": "时间",
        "script": 'layui.use(function(){' +
            '  var laydate = layui.laydate;\n' +
            'laydate.render({\n' +
            '   elem: "#${{param}}-laydate",\n' +
            'type: "time",' +
            ' })' +
            ' });',
        "extConfigs": ["date_format", "label_name", "null_able", "verify_content"]
    },
    "date": {
        "type": "date",
        "name": "日期",
        "script": 'layui.use(function(){' +
            '  var laydate = layui.laydate;\n' +
            'laydate.render({\n' +
            '   elem: "#${{param}}-laydate"\n' +
            ' })' +
            ' });',
        "extConfigs": ["date_format", "label_name", "null_able", "verify_content"]
    },
    "datetime": {
        "type": "date",
        "name": "日期时间",
        "script": 'layui.use(function(){' +
            '  var laydate = layui.laydate;\n' +
            'laydate.render({\n' +
            '   elem: "#${{param}}-laydate",\n' +
            'type: "datetime",' +
            ' })' +
            '});',
        "extConfigs": ["date_format", "label_name", "null_able", "verify_content"]
    },
    "year-range": {
        "type": "date",
        "name": "年份范围",
        "script": 'layui.use(function(){' +
            '  var laydate = layui.laydate;\n' +
            ' laydate.render({\n' +
            '                            elem: \'#${{param}}-laydate-range\',\n' +
            'type: "year",' +
            '                            range: [\'#${{param}}-laydate-start-date\', \'#${{param}}-laydate-end-date\']\n' +
            ' })' +
            '});',
        "extConfigs": ["date_format", "label_name", "null_able", "verify_content"]
    },
    "month-range": {
        "type": "date",
        "name": "年月范围",
        "script": 'layui.use(function(){' +
            '  var laydate = layui.laydate;\n' +
            ' laydate.render({\n' +
            '                            elem: \'#${{param}}-laydate-range\',\n' +
            'type: "month",' +
            '                            range: [\'#${{param}}-laydate-start-date\', \'#${{param}}-laydate-end-date\']\n' +
            ' })' +
            '});',
        "extConfigs": ["date_format", "label_name", "null_able", "verify_content"]
    },
    "time-range": {
        "type": "date",
        "name": "时间范围",
        "script": 'layui.use(function(){' +
            '  var laydate = layui.laydate;\n' +
            ' laydate.render({\n' +
            '                            elem: \'#${{param}}-laydate-range\',\n' +
            'type: "time",' +
            '                            range: [\'#${{param}}-laydate-start-date\', \'#${{param}}-laydate-end-date\']\n' +
            ' })' +
            '});',
        "extConfigs": ["date_format", "label_name", "null_able", "verify_content"]
    },
    "date-range": {
        "type": "date",
        "name": "日期范围",
        "script": 'layui.use(function(){' +
            '  var laydate = layui.laydate;\n' +
            ' laydate.render({\n' +
            '                            elem: \'#${{param}}-laydate-range\',\n' +
            'type: "date",' +
            '                            range: [\'#${{param}}-laydate-start-date\', \'#${{param}}-laydate-end-date\']\n' +
            ' })' +
            '});',
        "extConfigs": ["date_format", "label_name", "null_able", "verify_content", "relateColumn"]
    },
    "datetime-range": {
        "type": "date",
        "name": "日期时间范围",
        "script": 'layui.use(function(){' +
            '  var laydate = layui.laydate;\n' +
            ' laydate.render({\n' +
            '                            elem: \'#${{param}}-laydate-range\',\n' +
            'type: "datetime",' +
            '                            range: [\'#${{param}}-laydate-start-date\', \'#${{param}}-laydate-end-date\']\n' +
            ' })' +
            '});',
        "extConfigs": ["date_format", "label_name", "null_able", "verify_content"]
    },
    "upload-image-single": {
        "type": "upload",
        "name": "单图片上传",
        "script": 'layui.use(function(){\n' +
            '  var upload = layui.upload;\n' +
            '  var layer = layui.layer;\n' +
            '  var element = layui.element;\n' +
            '  var $ = layui.$;\n' +
            '  // 单图片上传\n' +
            '  var uploadInst = upload.render({\n' +
            '    elem: \'#${{param}}-upload-btn\',\n' +
            '    url: \'\', // 实际使用时改成您自己的上传接口即可。\n' +
            '    before: function(obj){\n' +
            '      // 预读本地文件示例，不支持ie8\n' +
            '      obj.preview(function(index, file, result){\n' +
            '        $(\'#${{param}}-upload-img\').attr(\'src\', result); // 图片链接（base64）\n' +
            '      });\n' +
            '      \n' +
            '      element.progress(\'filter-${{param}}\', \'0%\'); // 进度条复位\n' +
            '      layer.msg(\'上传中\', {icon: 16, time: 0});\n' +
            '    },\n' +
            '    done: function(res){\n' +
            '      // 若上传失败\n' +
            '      if(res.code > 0){\n' +
            '        return layer.msg(\'上传失败\');\n' +
            '      }\n' +
            '      // 上传成功的一些操作\n' +
            '      // …\n' +
            '      $(\'#${{param}}-upload-text\').html(\'\'); // 置空上传失败的状态\n' +
            '    },\n' +
            '    error: function(){\n' +
            '      // 演示失败状态，并实现重传\n' +
            '      var demoText = $(\'#${{param}}-upload-text\');\n' +
            '      demoText.html(\'<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs ${{param}}-reload">重试</a>\');\n' +
            '      demoText.find(\'.${{param}}-reload\').on(\'click\', function(){\n' +
            '        uploadInst.upload();\n' +
            '      });\n' +
            '    },\n' +
            '    // 进度条\n' +
            '    progress: function(n, elem, e){\n' +
            '      element.progress(\'filter-${{param}}\', n + \'%\'); // 可配合 layui 进度条元素使用\n' +
            '      if(n == 100){\n' +
            '        layer.msg(\'上传完毕\', {icon: 1});\n' +
            '      }\n' +
            '    }\n' +
            '  });' +
            '});\n',
        "extConfigs": ["label_name", "null_able", "verify_content"]
    },
    "upload-image-multi": {
        "type": "upload",
        "name": "多图片上传",
        "script": "layui.use(function(){\n" +
            "  var upload = layui.upload;\n" +
            "  var layer = layui.layer;\n" +
            "  var element = layui.element;\n" +
            "  var $ = layui.$;" +
            "   upload.render({\n" +
            "    elem: '#${{param}}-upload-btn',\n" +
            "    url: '', // 实际使用时改成您自己的上传接口即可。\n" +
            "    multiple: true,\n" +
            "    before: function(obj){\n" +
            "      // 预读本地文件示例，不支持ie8\n" +
            "      obj.preview(function(index, file, result){\n" +
            "        $('#${{param}}-upload-preview').append('<img src=\"'+ result +'\" alt=\"'+ file.name +'\" style=\"width: 90px; height: 90px;\">')\n" +
            "      });\n" +
            "    },\n" +
            "    done: function(res){\n" +
            "      // 上传完毕\n" +
            "      // …\n" +
            "    }\n" +
            "  });" +
            "});",
        "extConfigs": ["label_name", "null_able", "verify_content"]
    },
    "upload-file-multi": {
        "type": "upload",
        "name": "多文件上传",
        "script": 'layui.use(function(){\n' +
            '  var upload = layui.upload;\n' +
            '  var element = layui.element;\n' +
            '  var $ = layui.$;\n' +
            '  // 制作多文件上传表格\n' +
            '  var uploadListIns = upload.render({\n' +
            '    elem: \'#${{param}}-upload-files\',\n' +
            '    elemList: $(\'#${{param}}-upload-files-list\'), // 列表元素对象\n' +
            '    url: \'\', // 实际使用时改成您自己的上传接口即可。\n' +
            '    accept: \'file\',\n' +
            '    multiple: true,\n' +
            '    number: 3,\n' +
            '    auto: false,\n' +
            '    bindAction: \'#${{param}}-upload-files-action\',\n' +
            '    choose: function(obj){   \n' +
            '      var that = this;\n' +
            '      var files = this.files = obj.pushFile(); // 将每次选择的文件追加到文件队列\n' +
            '      // 读取本地文件\n' +
            '      obj.preview(function(index, file, result){\n' +
            '        var tr = $([\'<tr id="${{param}}-upload-\'+ index +\'">\',\n' +
            '          \'<td>\'+ file.name +\'</td>\',\n' +
            '          \'<td>\'+ (file.size/1024).toFixed(1) +\'kb</td>\',\n' +
            '          \'<td><div class="layui-progress" lay-filter="${{param}}-progress-\'+ index +\'"><div class="layui-progress-bar" lay-percent=""></div></div></td>\',\n' +
            '          \'<td>\',\n' +
            '            \'<button class="layui-btn layui-btn-xs ${{param}}-reload layui-hide">重传</button>\',\n' +
            '            \'<button class="layui-btn layui-btn-xs layui-btn-danger ${{param}}-delete">删除</button>\',\n' +
            '          \'</td>\',\n' +
            '        \'</tr>\'].join(\'\'));\n' +
            '        \n' +
            '        // 单个重传\n' +
            '        tr.find(\'.${{param}}-reload\').on(\'click\', function(){\n' +
            '          obj.upload(index, file);\n' +
            '        });\n' +
            '        \n' +
            '        // 删除\n' +
            '        tr.find(\'.${{param}}-delete\').on(\'click\', function(){\n' +
            '          delete files[index]; // 删除对应的文件\n' +
            '          tr.remove(); // 删除表格行\n' +
            '          // 清空 input file 值，以免删除后出现同名文件不可选\n' +
            '          uploadListIns.config.elem.next()[0].value = \'\'; \n' +
            '        });\n' +
            '        \n' +
            '        that.elemList.append(tr);\n' +
            '        element.render(\'progress\'); // 渲染新加的进度条组件\n' +
            '      });\n' +
            '    },\n' +
            '    done: function(res, index, upload){ // 成功的回调\n' +
            '      var that = this;\n' +
            '      // if(res.code == 0){ // 上传成功\n' +
            '        var tr = that.elemList.find(\'tr#${{param}}-upload-\'+ index)\n' +
            '        var tds = tr.children();\n' +
            '        tds.eq(3).html(\'\'); // 清空操作\n' +
            '        delete this.files[index]; // 删除文件队列已经上传成功的文件\n' +
            '        return;\n' +
            '      //}\n' +
            '      this.error(index, upload);\n' +
            '    },\n' +
            '    allDone: function(obj){ // 多文件上传完毕后的状态回调\n' +
            '      console.log(obj)\n' +
            '    },\n' +
            '    error: function(index, upload){ // 错误回调\n' +
            '      var that = this;\n' +
            '      var tr = that.elemList.find(\'tr#${{param}}-upload-\'+ index);\n' +
            '      var tds = tr.children();\n' +
            '       // 显示重传\n' +
            '      tds.eq(3).find(\'.${{param}}-reload\').removeClass(\'layui-hide\');\n' +
            '    },\n' +
            '    progress: function(n, elem, e, index){ // 注意：index 参数为 layui 2.6.6 新增\n' +
            '      element.progress(\'${{param}}-progress-demo-\'+ index, n + \'%\'); // 执行进度条。n 即为返回的进度百分比\n' +
            '    }\n' +
            '  });\n' +
            '});',
        "extConfigs": ["label_name", "null_able", "verify_content"]
    },
    "upload-file-single": {
        "type": "upload",
        "name": "单文件上传",
        "script": 'layui.use(function(){\n' +
            '  var upload = layui.upload;\n' +
            '  // 渲染\n' +
            '  upload.render({\n' +
            '    elem: \'#${{param}}-upload-choose\',\n' +
            '    url: \'\', // 此处配置你自己的上传接口即可\n' +
            '    auto: false,\n' +
            '    // multiple: true,\n' +
            '    bindAction: \'#${{param}}-upload-action\',\n' +
            '    done: function(res){\n' +
            '      layer.msg(\'上传成功\');\n' +
            '    }\n' +
            '  });\n' +
            '});',
        "extConfigs": ["label_name", "null_able", "verify_content"]
    },
    "ueditor": {
        "type": "input",
        "name": "富文本编辑器",
        "script": ' window.UEDITOR_HOME_URL = "../../plugin/ueditor/";\n' +
            '    require(["ZeroClipboard", "ueditor", "ueditorconfig"], function (ZeroClipboard) {\n' +
            '        window[\'ZeroClipboard\'] = ZeroClipboard;\n' +
            '        ue = UE.getEditor(\'${{param}}-editor_zh\', {\n' +
            '            autoFloatEnabled: false,\n' +
            '            zIndex: 100,\n' +
            '            initialFrameWidth: \'100%\',\n' +
            '            initialFrameHeight: 300\n' +
            '            , elementPathEnabled: false\n' +
            '            , autoHeightEnabled: false,\n' +
            '            maximumWords: 10000,\n' +
            '            serverUrl: $.projectpath + \'/ueditorController?upRePath=\' \n' +
            '        });\n' +
            '        ue.ready(function () {\n' +
            '            //赋值\n' +
            '\t\t\tue.setContent("数据库值");\n' +
            '\t\t\t//取值\n' +
            '\t\t\tvar content = ue.getContent();\n' +
            '        });\n' +
            '    });',
        "extConfigs": ["field_len", "label_name", "null_able"]
    },
    "picture-select": {
        "type": "upload",
        "name": "图片剪裁",
        "script": '$("#${{param}}-btnselimg").click(function () {\n' +
            '\tjQuery.getparent().layer.open({\n' +
            '\t\ttype: 2,\n' +
            '\t\ttitle: \'选择图片\',\n' +
            '\t\tshadeClose: false,\n' +
            '\t\tarea: [\'1100px\', \'90%\'],\n' +
            '\t\tcontent: \'plugin/cropper/uploadoss.html?v=\' + (Arg("v") || 1) + "&Ratio=" + (142 / 142),\n' +
            '\t\tsuccess: function (layero, index) {\n' +
            '\t\t},\n' +
            '\t\tbtn: ["确定", "取消"],\n' +
            '\t\tyes: function (index, layero) { //或者使用btn1\n' +
            '\t\t\tvar w = layero.find(\'iframe\')[0].contentWindow;\n' +
            '\t\t\tvar option = {\n' +
            '\t\t\t\tregion: "oss-cn-beijing",\n' +
            '\t\t\t\tbucket: "tbfile",\n' +
            '\t\t\t\tpath: ""\n' +
            '\t\t\t};\n' +
            '\t\t\tw.uploadFile(option, function (file) {\n' +
            '\t\t\t\tjQuery.getparent().layer.close(index);\n' +
            '\t\t\t\t$(\'#${{param}}-img_picurl\').attr(\'src\', ossPrefix + file.key + \'?x-oss-process=image/resize,m_lfit,w_142,h_142\');\n' +
            '\t\t\t\t$("#${{param}}-txtimgurl").val(file.key);\n' +
            '\t\t\t});\n' +
            '\t\t}\n' +
            '\t});\n' +
            '});\n',
        "extConfigs": ["label_name", "null_able", "verify_content"]
    },
    "selarea": {
        "type": "select",
        "name": "下拉区域-三级",
        "value": "只读",
        "extConfigs": ["label_name", "null_able","relateColumn"]
    }
// todo 待补充
};

let extConfigType = {
    null_able: {
        showType: "input",
        labelName: "是否必填项",
        inputType: "checkbox",
        value: (columnName) => "YES",
        placeholder: "",
        other: 'lay-skin="switch" title="是|否"',
        verify: "required",
        layFilter: (columnName) => columnName + "_null_switch-filter",
        event: function (item) {
            layui.form.on('switch(' + item.column_name + '_null_switch-filter)', function (data) {
                $("#" + item.column_name + "_id > div > label > em").remove();
                if (data.elem.checked) {
                    $("#" + item.column_name + "_id > div > label").prepend('<em style="color: #aa1111">* </em>');
                }
            });
        },
        backShowTrigger: function (item) {
            if (item["null_able"] === "YES") {
                layui.event.call($("#null_able")[0], "form", 'switch(' + item.column_name + '_null_switch-filter' + ')', {
                    elem: $("#null_able")[0]
                    , value: "YES"
                    , othis: $("#null_able").next()
                });
            }

        }
    },
    only_able: {
        showType: "input",
        labelName: "是否验证唯一",
        inputType: "checkbox",
        placeholder: "",
        value: (columnName) => "YES",
        other: 'lay-skin="switch" title="是|否"',
        verify: "",
        layFilter: (columnName) => columnName + "_only_switch-filter",
        event: function (item) {
        },
        backShowTrigger: function (item) {

        }
    },
    field_len: {
        showType: "input",
        labelName: "字段长度",
        inputType: "number",
        placeholder: "长度限制",
        value: (columnName) => fieldInfo.get(columnName).char_len,
        other: 'min="0" step="1" lay-affix="number"',
        verify: "",
        layFilter: (columnName) => "",
        event: function (item) {
        },
        backShowTrigger: function (item) {

        }
    },
    label_name: {
        showType: "input",
        labelName: "显示名称",
        inputType: "text",
        placeholder: "请输入label名称",
        value: (columnName) => fieldInfo.get(columnName).column_comment,
        other: '',
        verify: "required",
        layFilter: (columnName) => "",
        event: function (item) {
            $('#label_name').on('blur', function () {
                let selectNode = $("#" + item.column_name + "_label_show")[0];
                let text = '';
                if ($("#" + item.column_name + "_label_show > em").length > 0) {
                    text += '<em style="color: #aa1111">* </em>';
                }
                if (this.value.trim().length === 0 && selectNode) {
                    text += item.column_name;
                    selectNode.innerHTML = text;
                } else {
                    text += this.value;
                    selectNode.innerHTML = text;
                }
            });
        },
        backShowTrigger: function (item) {
            $("#label_name").trigger("blur");
        }
    },
    verify_content: {
        showType: "select",
        labelName: "其他校验规则",
        inputType: "",
        placeholder: "",
        value: (columnName) => "",
        other: '',
        verify: "",
        layFilter: (columnName) => columnName + "_verify-filter",
        formItemId: (columnName) => columnName + "_verify_id",
        options: function () {
            return '               <option value="">验证规则</option>\n' +
                '                    <option value="phone">手机号</option>\n' +
                '                    <option value="email">邮箱</option>\n' +
                '                    <option value="url">网址</option>\n' +
                '                    <option value="number">数字</option>\n' +
                '                    <option value="date">日期</option>\n' +
                '                    <option value="identity">身份证</option>\n' +
                '                    <option value="regexp">自定义正则</option>\n';
        },
        event: function (item) {
            //字段验证事件
            layui.form.on('select(' + item.column_name + '_verify-filter)', function (data) {
                let value = data.value;
                $("#regexp_content").remove();
                if (value === 'regexp') {
                    $("#" + item.column_name + "_verify_id").children().last().after(' <div class="layui-input-block" id="regexp_content" style="margin-top: 2px">\n' +
                        '                <input type="text" name="regexp_content"  autocomplete="off" placeholder="请输入自定义正则表达式" lay-verify="required" class="layui-input">\n' +
                        '            </div>');
                }
            });
        },
        backShowTrigger: function (item) {
            let idName = item.column_name + "_verify-filter";
            layui.event.call(this, "form", 'select(' + idName + ')', {
                elem: $("#verify_content")[0]
                , value: item["verify_content"]
                , othis: $("#verify_content").next()
            });
        }
    },
    date_format: {
        showType: "input",
        labelName: "日期格式",
        inputType: "text",
        value: (columnName) => "",
        placeholder: "请输入日期格式（默认：yyyy-MM-dd)",
        other: '',
        verify: "",
        layFilter: (columnName) => "",
        event: function (item) {
            $('#date_format').on('blur', function () {
                let dateArr = ["year", "month", "date", "datetime", "time"];
                if (dateArr.includes(item.type)) {
                    layui.laydate.render({
                        elem: '#' + item.column_name + "-laydate",
                        type: item.type,
                        format: this.value
                    });
                } else {
                    layui.laydate.render({
                        elem: '#' + item.column_name + "-laydate-range",
                        type: item.type.replace("-range", ""),
                        format: this.value,
                        range: ['#' + item.column_name + '-laydate-start-date', '#' + item.column_name + '-laydate-end-date']
                    });
                }

            });
        },
        backShowTrigger: function (item) {
            $("#date_format").trigger("blur");
        }
    },
    other_data: {
        showType: "combination",
        labelName: "自定义数据源",
        inputType: "object",
        value: (columnName) => "",
        placeholder: "关联其他表数据:{key: 表名,value: 字段名}",
        other: '',
        verify: "required",
        layFilter: (columnName) => "",
        children: {
            key: {
                showType: "input",
                placeholder: "表名",
                inputType: "text",
                verify: "required",
                layFilter: (columnName) => "",
            },
            value: {
                showType: "input",
                placeholder: "字段名",
                inputType: "text",
                verify: "required",
                layFilter: (columnName) => "",
            },
        },
        event: function (item) {
            let callF = new SelectCallback(item);
            $('#Object_other_data_value').on('blur', function (data) {
                callF.fun["DB"](this, item);
            });
        },
        backShowTrigger: function (item) {
            $('#Object_other_data_value').trigger("blur");
        }
    },
    dict: {
        showType: "select",
        labelName: "选择数据字典",
        inputType: "",
        placeholder: "",
        other: '',
        value: (columnName) => "",
        verify: "required",
        formItemId: (columnName) => "",
        layFilter: (columnName) => columnName + "_dict",
        options: function () {
            let dict = '<option value="">请选择字典</option></br>';
            dictList.forEach(item => {
                dict += '<option value="' + item.dict_type + '">' + item.dict_name + '</option>';
            });
            return dict;
        },
        event: function (item) {
            let dictFilter = item.column_name + "_dict";
            let callF = new SelectCallback(item);
            layui.form.on('select(' + dictFilter + ')', callF.fun["dict"].bind(callF));
        },
        backShowTrigger: function (item) {
            let dictSelectName = item.column_name + "_dict";
            let node = $("#dict");
            layui.event.call(this, "form", 'select(' + dictSelectName + ')', {
                elem: node[0]
                , value: item.dict
                , othis: node.next()
            });
        }
    },
    data_type: {
        showType: "combination",
        labelName: "选择数据源",
        inputType: "select",
        placeholder: "",
        other: '',
        value: (columnName) => "",
        verify: "required",
        formItemId: (columnName) => "",
        components: ["other_data", "dict", "custom_data"],
        layFilter: (columnName) => columnName + "_data_type",
        options: function () {
            return '<option value="">请选择数据源</option></br>' +
                '                    <option value="other_data">其他表数据</option>\n' +
                '                    <option value="dict">数据字典</option>\n' +
                '                    <option value="custom_data">自定义数据</option>\n';
        },
        event: function (item) {
            //todo 抽出为全局
            let filter = item.column_name + "_data_type";
            let that = this;
            layui.form.on('select(' + filter + ')', function (data) {
                let value = data.value;
                //全部隐藏
                let filterValue = [];
                that.components.forEach(component => {
                    let idName = "data_type_" + component;
                    let node = $("#" + idName);
                    if (!node.hasClass("hidden")) {
                        node.addClass("hidden");
                    }
                    $("#" + idName + "  .myInput").removeAttr("lay-verify");
                    if (component !== value) {
                        filterValue.push(component);
                    }
                });
                $("#data_type_" + value).removeClass("hidden");
                $("#data_type_" + value + "  .myInput").attr("lay-verify", "required");
                globalData.filter(item.column_name, filterValue);
            });
        },
        backShowTrigger: function (item) {
            let filter = item.column_name + "_data_type";
            let node = $("#data_type");
            layui.event.call(this, "form", 'select(' + filter + ')', {
                elem: node[0]
                , value: item.data_type
                , othis: node.next()
            });
        }
    },
    custom_data: {
        showType: "options",
        labelName: "自定义数据",
        inputType: "text",
        value: (columnName) => "",
        placeholder: "",
        other: 'style="display: flex;\n' +
            '    flex-direction: column;"',
        verify: "required",
        layFilter: (columnName) => "",
        addObject: undefined,
        event: function (item) {
            let callback = function (type, data, id) {
                let selectNode = $("#" + item.column_name + "_id_" + item.type);
                if (selectNode.children().length > 0) {
                    let node = $("#" + item.column_name + "_id_" + item.type + " #" + id);
                    if (node.length > 0){
                        node.next().remove();
                        node[0].remove();
                    }
                }
                if (type === "add") {
                    selectNode.append(getPreviewDBItem(item.type, item, data, id));
                }
                layui.form.render($("#preview"));
            };
            let optionItem = new OptionsAdd("custom_data", callback);
            $("#custom_data").append(optionItem.getAddBtnHtml());
            optionItem.init();
            this.addObject = optionItem;
        },
        backShowTrigger: function (item) {
            let selectNode = $("#" + item.column_name + "_id_" + item.type);
            selectNode.children().remove();
            this.addObject && this.addObject.backShow(item["custom_data"]);
        }
    },
    relateColumn: {
        showType: "input",
        labelName: "关联字段",
        inputType: "text",
        placeholder: "请输入",
        value: (columnName) => "",
        other: '',
        verify: "",
        layFilter: (columnName) => "",
        event: function (item) {
        },
        backShowTrigger: function (item) {

        }
    },
};

let components = {};
formTypeMap = new Map(Object.entries(formTypeMap));
let optionsMap = new Map();

formTypeMap.forEach((value, key, map) => {
    let type = value.type;
    if (!optionsMap.has(type)) {
        optionsMap.set(type, []);
    }
    optionsMap.get(type).push('<option value="' + key + '">' + value.name + '</option></br>');

});
//当前表名
let tableName = '';

let copyContent = new Map;
let dictList = [];
let tableList = [];

//不展示字段
const hideColumns = ["id", "lan", "uid", "departno", "creatime", "alterid", "altime", "isdel"];


//字段注释和长度信息表
let fieldInfo = new Map;

/**
 * 自定义数据格式，不通用
 */
class IMap extends Map {
    filterMap = new Map;

    /**
     * 自定义数据结构，不通用
     * @param key
     * @param value 数组形式
     * @param removeAllFlag
     */
    filter(key, value, removeAllFlag = false) {
        if (removeAllFlag) {
            this.filterMap.clear();
        }
        this.filterMap.set(key, value);
    }

    getI(key) {
        let value = super.get(key);
        if (!value) {
            return value;
        }
        let that = this;
        let data = {};
        let filter = false;
        if (that.filterMap.has(key)) {
            filter = true;
        }
        Object.entries(value).forEach(([k, v]) => {
            if (!filter || !that.filterMap.get(key).includes(k)) {
                if (v instanceof Array) {
                    data[k] = v;
                } else if (v instanceof Object) {
                    // data["Object_$" + k] = k;
                    Object.entries(v).forEach(([k1, v1]) => {
                        data["Object_" + k + "_" + k1] = v1;
                    });
                } else {
                    data[k] = v;
                }
            }
        });
        // console.log(data);
        return data;
    }

    get(key, cleanFlag = false) {
        if (!key) {
            return null;
        }
        if (cleanFlag) {
            let value = super.get(key);
            let data = {};
            let that = this;
            let filter = false;
            if (that.filterMap.has(key)) {
                filter = true;
            }
            if (filter) {
                Object.entries(value).forEach(([k, v]) => {
                    if (!that.filterMap.get(key).includes(k)) {
                        data[k] = v;
                    }
                });
            } else {
                return value;
            }

            return data;
        }
        return this.getI(key);
    }

    set(key, value) {
        let objectKeys = [];
        let objectItems = [];
        let arrayKeys = [];
        let arrayItems = [];
        let data = {};
        Object.entries(value).forEach(([k, v]) => {
            if (k.startsWith("Object_$")) {
                objectKeys.push(k.replace("Object_$", ""));
            } else if (k.startsWith("Object_")) {
                objectItems.push(k);
            } else {
                data[k] = v;
            }
        });
        objectKeys.forEach(ok => {
            let object = {};
            objectItems.filter(it => it.startsWith("Object_" + ok)).forEach(it => {
                object[it.replace("Object_" + ok + "_", "")] = value[it];
            });
            data[ok] = object;
        });

        value = data;
        //处理数组类型数据
        let fData = {};
        Object.entries(value).forEach(([k, v]) => {
            if (k.startsWith("Array_$$")) {
                arrayKeys.push(k);
            } else {
                fData[k] = v;
            }
        });
        let dataMap = {};
        arrayKeys.forEach(ak => {
            let key = ak.slice(ak.lastIndexOf("##") + 2);
            if (!dataMap[key]) {
                dataMap[key] = [];
            }
            dataMap[key].push(value[ak]);
        });
        $.extend(fData, dataMap);
        // console.log(fData);
        super.set(key, fData);
        return this;
    }
}

/**
 * 字段顺序 <em style="color:red">不包括隐藏的字段</em>
 */

let fieldArrSort = [];

let sortable;

let globalData = new IMap();

// 当前字段
let curField = "";


class OptionsAdd extends ShowHtml {
    #type_name = 'optionsAdd';

    optionColumnIdArr = [];
    callback;

    constructor(type, callback) {
        super(type);
        this.callback = callback;
    }

    getShowItemContentHtml(id) {
        let type = this.type;
        let htmlStr = '';
        htmlStr += '<div class="layui-input-inline" style="width:100%;" id="' + id + '_' + type + '_item">\n';
        htmlStr += ' <input type="text" value="' + type + '" name="' + "Object_$Array_$$" + this.index + "##" + type + '" style="display: none" class="layui-input">';
        htmlStr += '<input type="text" id="' + id + '_' + type + '_key" name="Object_Array_$$' + this.index + "##" + type + "_" + 'key' + '" placeholder="key" lay-verify="required" class="layui-input input-item"/>';
        htmlStr += '<input type="text" id="' + id + '_' + type + '_value" name="Object_Array_$$' + this.index + "##" + type + "_" + 'value' + '" placeholder="value" lay-verify="required" class="layui-input input-item"/>';
        htmlStr +=
            '   <button type="button" class="layui-btn layui-btn-primary input-item" id="' + id + '_' + type + '_delete"><i\n' +
            '       class="layui-icon layui-icon-subtraction "></i></button>\n' +
            '  </div>';
        return htmlStr;
    }

    getDataArr() {
        return this.optionColumnIdArr;
    }

    setDataArr(data) {
        this.optionColumnIdArr = data;
    }

    pushIdArr(id) {
        this.optionColumnIdArr.push(id);
    }

    backShow(data) {
        let dataObj = {};
        let that = this;
        data && data.forEach(item => {
            $("#" + that.type + "_add").trigger("click");
            let key = 'Object_Array_$$' + this.index + "##" + that.type + "_" + 'key';
            let value = 'Object_Array_$$' + this.index + "##" + that.type + "_" + 'value';
            dataObj[key] = item.key;
            dataObj[value] = item.value;
        });
        layui.form.val('configForm', dataObj);
        this.getDataArr().forEach(id => {
            $("#" + id + '_' + this.type + "_value").trigger("blur");
        });
    }

    addSelectEvent(id) {
        let that = this;
        $("#" + id + '_' + this.type + "_value").on("blur", function () {
            let value = this.value;
            that.callback && that.callback("add", value, id);
        });
    }

    delSelectEvent(id) {
        this.callback && this.callback("del", null, id);
    }
}

