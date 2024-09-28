require.config({
    paths: {
        jquery: '../../../sys/jquery',
        system: '../../../sys/system',
        layui: "../../../layui-btkj/layui",
    },
    shim: {
        "system": {
            deps: ["jquery"]
        },
        "layui": {
            deps: ["jquery", "system"]
        },
        "config": {
            deps: ["layui"]
        }
    },
    waitSeconds: 0
});
var objdata = {
    arrDeptType: [],
    objMenuPid: {}, //栏目对象
    arrMenuTree: [] //栏目树数组
};
require(["jquery", "system", 'layui'], function () {

    layui.use(['form'], function () {
        var form = layui.form;
        var layer = layui.layer;
        var url = layui.url();

        var field_len = url.search.field_len;
        var null_able = decodeURI(url.search.null_able);
        var label_name = decodeURI(url.search.label_name);
        var verify_content = decodeURI(url.search.verify_content);
        var regexp_content = decodeURI(url.search.regexp_content);
        if (verify_content === 'regexp') {
            $("#verify_id").after(' <div class="layui-input-inline" id="regexp_content">\n' +
                '                <input type="text" name="regexp_content" autocomplete="off" placeholder="请输入自定义正则表达式" lay-verify="required" class="layui-input">\n' +
                '            </div>');
        }
        form.val('formOk', {
            "field_len": field_len !== 'undefined' ? field_len : 0,
            "null_able": null_able === 'YES' ? null_able : null,
            "label_name": label_name !== 'undefined' ? label_name : '',
            "verify_content": verify_content !== 'undefined' ? verify_content : '',
            "regexp_content": regexp_content !== 'undefined' ? regexp_content : ''
        });
        //修改 回显
        $("#saveOK").click(function (event, callback) {
            form.submit('formOk', function (data) {
                var field = data.field; // 获取表单字段值
                field['null_able'] = field.null_able === 'on' ? 'YES' : 'NO';
                callback && callback(field);
                return false;
            });
            return false;
        });
        form.on('select(verify-filter)', function (data) {
            let value = data.value;
            if (value === 'regexp') {
                $("#verify_id").after(' <div class="layui-input-inline" id="regexp_content">\n' +
                    '                <input type="text" name="regexp_content" autocomplete="off" placeholder="请输入自定义正则表达式" lay-verify="required" class="layui-input">\n' +
                    '            </div>');
            } else {
                $("#regexp_content").remove();
            }
        });
    });

});
