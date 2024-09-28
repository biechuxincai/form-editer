/**
 * Created by bsj on 2024/7/24 11:54
 */
class ShowHtml {
    fieldArr = [];
    exitFieldMap = new Map();
    index = 0;
    count = 0;

    constructor(type) {
        this.type = type;
    }

    getShowItemContentHtml() {
    }

    /**
     * 获取相对应的添加按钮
     * @returns {string}
     */
    getAddBtnHtml() {
        if (this.type) {
            return '  <button type="button" class="layui-btn layui-btn-primary " id="' + this.type + '_add" style="width:80px;"><i\n' +
                '                            class="layui-icon layui-icon-addition"></i></button>';
        } else {
            return "<span>暂无数据</span>";
        }
    }

    init() {
        let uid = uuid();
        this.addItem(uid);
    }

    addItem(id) {
        let that = this;
        let type = this.type;
        $("#" + type + "_add").click(function () {
            that.count++;
            that.index++;
            that.pushIdArr(id);
            //移除按钮
            $("#" + type + "_add").remove();
            //新增条件
            $("#" + type).append(that.getShowItemContentHtml(id, type));
            //删除事件
            that.delSearchFieldAddEvent(id, type);
            //在最后条件添加新增按钮
            $("#" + type + " div:last-child").append(that.getAddBtnHtml());
            layui.form.render();
            //添加事件
            let uid = uuid();
            that.addItem(uid, type);

            //额外的选择事件
            that.addSelectEvent(id);
        });
    }

    /**
     * 删除事件
     * @param id 节点id
     */
    delSearchFieldAddEvent(id) {
        let that = this;
        let type = this.type;
        $("#" + id + "_" + type + "_delete").click(function () {
            that.count--;
            //移除按钮
            $("#" + id + "_" + type + "_item").remove();
            //删除数据
            let arr = that.getDataArr();
            that.setDataArr(arr.filter(item => item !== id));
            that.exitFieldMap.delete(id);
            //移除按钮
            $("#" + type + "_add").remove();
            //添加按钮
            //在最后条件添加新增按钮
            if ($("#" + type).children().length > 0) {
                $("#" + type + " div:last-child").append(that.getAddBtnHtml());
            } else {
                $("#" + type).append(that.getAddBtnHtml());
            }
            layui.form.render();
            //添加事件
            let uid = uuid();
            that.addItem(uid, type);
            //额外的选择事件
            that.delSelectEvent(id);
        });
    }

    pushIdArr(id) {
    }

    /**
     * 添加额外的监听事件
     * @param id
     */
    addSelectEvent(id) {
    }

    delSelectEvent(id) {

    }

    getDataArr() {
        return [];
    }

    setDataArr(data) {
    }

    /**
     * 回显
     * @param data
     */
    backShow(data) {
    }

    dealData(data) {
        return {};
    }
}

class SearchType extends ShowHtml {
    #type_name = 'table_search_type';
    // exitFieldArr = [];
    dictList = [];
    searchFieldAddIdArr = [];
    selectTypes = ["select"];
    inputTypes = ["input"];
    dateTypes = ["date", "month", "year", "datetime", "date_range", "month-range", "year-range", "datetime-range"];
    options = "";
    typeOptions = "";
    operateOptionMap = new Map;

    constructor(type, fieldTypeArr) {
        super(type, fieldTypeArr);
    }

    init() {

        this.options = '<option value="">请选择</option></br>';
        // this.exitFieldArr = Array.from(this.exitFieldMap.values());

        this.operateOptionMap.set("input", []);
        this.operateOptionMap.set("select", []);
        this.operateOptionMap.set("date", []);

        this.fieldArr.forEach(item => {
            let labelName = item.label_name ? "(" + item.label_name + ")" : "";
            this.options += '<option value="' + item.column_name + '">' + item.column_name + labelName + '</option></br>';
        });

        this.typeOptions = '<option value="">请选择</option></br>';
        this.fieldTypeArr.forEach(item => {
            if (this.selectTypes.includes(item.dict_value)) {
                this.operateOptionMap.get("select").push('<option value="' + item.dict_value + '">' + item.dict_label + '</option></br>');
            }
            if (this.inputTypes.includes(item.dict_value)) {
                this.operateOptionMap.get("input").push('<option value="' + item.dict_value + '">' + item.dict_label + '</option></br>');
            }
            if (this.dateTypes.includes(item.dict_value)) {
                this.operateOptionMap.get("date").push('<option value="' + item.dict_value + '">' + item.dict_label + '</option></br>');
            }
        });
        this.operateOptionMap.forEach((value, key) => {
            this.typeOptions += '<optgroup label="' + key + '">';
            this.typeOptions += value.join('');
            this.typeOptions += '</optgroup>';
        });
        super.init();
    }

    setInitData(fieldArr, fieldTypeArr, dictList) {
        this.fieldArr = fieldArr;
        this.dictList = dictList;
        this.fieldTypeArr = fieldTypeArr;
    }

    getShowItemContentHtml(id) {
        let type = this.type;
        let htmlStr = '';

        htmlStr += '<div class="layui-input-block" id="' + id + '_' + type + '_item">\n';
        // 选择添加

        htmlStr += '<div class="layui-input-inline" style="width: 215px">\n';
        htmlStr += ' <select name="' + id + '_' + type + '_select" lay-verify="required" lay-filter="' + id + '_' + type + '_select">';
        htmlStr += this.options;
        htmlStr += ' </select>';
        htmlStr += ' </div>\n';

        htmlStr += ' <div class="layui-input-inline">\n';
        htmlStr += ' <select name="' + id + '_' + type + '_input" lay-verify="required" lay-filter="' + id + '_' + type + '_input">';
        htmlStr += this.typeOptions;
        htmlStr += ' </select>';
        htmlStr += ' </div>\n';

        htmlStr +=
            '   <button type="button" class="layui-btn layui-btn-primary" id="' + id + '_' + type + '_delete"><i\n' +
            '       class="layui-icon layui-icon-subtraction "></i></button>\n' +
            '  </div>';
        return htmlStr;
    }

    addSelectEvent(id) {
        let that = this;
        let type = this.type;
        layui.form.on('select(' + id + '_' + type + '_select' + ')', function (data) {
            that.exitFieldMap.set(id, data.value);
        });
        // layui.form.on('select(' + id + '_' + type + '_input' + ')', function (data) {
        //     let elem = data.elem; // 获得 select 原始 DOM 对象
        //     let value = data.value; // 获得被选中的值
        //     let text = elem.options[elem.options.selectedIndex].text; //获取被选中的text
        //     // 更新事件
        //     if (value === "1") {
        //         // 下拉添加字典选择
        //         let htmlStr = '';
        //         let typeOptions = '<option value="">请选择</option></br>';
        //         that.dictList.forEach(item => {
        //             typeOptions += '<option value="' + item.dict_type + '">' + item.dict_name + '</option></br>';
        //         });
        //         htmlStr += ' <div class="layui-input-inline" id="' + id + '_' + type + '_dict' + '" >\n';
        //         htmlStr += ' <select name="' + id + '_' + type + '_dict" lay-verify="required" lay-filter="' + id + '_' + type + '_dict">';
        //         htmlStr += typeOptions;
        //         htmlStr += ' </select>';
        //         htmlStr += ' </div>\n';
        //         $("#" + id + '_' + type + '_item' + ' > div:nth-child(2)').after(htmlStr);
        //         layui.form.render("select");
        //     } else {
        //         // 删除字典选择器
        //         $("#" + id + '_' + type + '_dict').remove();
        //     }
        // });
    }


    getDataArr() {
        return this.searchFieldAddIdArr;
    }

    setDataArr(data) {
        this.searchFieldAddIdArr = data;
    }

    pushIdArr(id) {
        this.searchFieldAddIdArr.push(id);
    }

    backShow(data) {
        let dataObj = {};
        let that = this;
        data.forEach(item => {
            $("#" + that.type + "_add").trigger("click");
            let uid = that.searchFieldAddIdArr[that.searchFieldAddIdArr.length - 1];
            let selectName = uid + "_" + that.type + "_select";
            let inputName = uid + "_" + that.type + "_input";

            dataObj[selectName] = item.field;
            dataObj[inputName] = item.type;
            if (item.select) {
                let dictName = uid + "_" + that.type + "_dict";
                dataObj[dictName] = item.select;
                let node = $("#" + inputName);
                node.val(item.type);
                layui.event.call(this, "form", 'select(' + inputName + ')', {
                    elem: node[0]
                    , value: item.type
                    , othis: node.next()
                });
            }
        });
        layui.form.render("select");
        layui.form.val('formOk', dataObj);
    }

    dealData(data) {
        return super.dealData(data);
    }
}

class ShowType extends ShowHtml {
    #type_name = 'table_show_type';

    showFieldAddIdArr = [];

    // exitFieldArr = [];

    constructor(type) {
        super(type);
    }

    setInitData(fieldArr, fieldTypeArr) {
        this.fieldArr = fieldArr;
        this.fieldTypeArr = fieldTypeArr;
    }

    getShowItemContentHtml(id) {
        let type = this.type;
        let htmlStr = '';
        let options = '<option value="">请选择</option></br>';
        // this.exitFieldArr = Array.from(this.exitFieldMap.values());
        this.fieldArr
            .forEach(item => {
                let labelName = item.label_name ? "(" + item.label_name + ")" : "";
                options += '<option value="' + item.column_name + '">' + item.column_name + labelName + '</option></br>';
            });
        let typeOptions = '<option value="">请选择</option></br>';
        this.fieldTypeArr.forEach(item => {
            typeOptions += '<option value="' + item.dict_value + '">' + item.dict_label + '</option></br>';
        });
        let sortOptions = '<option value="">是否排序</option></br>';
        sortOptions += '<option value="true">是</option></br>';
        sortOptions += '<option value="false" selected>否</option></br>';

        htmlStr += '<div class="layui-input-block " id="' + id + '_' + type + '_item">\n';
        // 选择添加
        htmlStr += '<div class="layui-input-inline" style="width: 180px">\n';
        htmlStr += ' <select name="' + id + '_' + type + '_select" lay-verify="required" lay-filter="' + id + '_' + type + '_select">';
        htmlStr += options;
        htmlStr += ' </select>';
        htmlStr += ' </div>\n';

        htmlStr += ' <div class="layui-input-inline">\n';
        htmlStr += ' <select name="' + id + '_' + type + '_input" lay-verify="required" lay-filter="' + id + '_' + type + '_input">';
        htmlStr += typeOptions;
        htmlStr += ' </select>';
        htmlStr += ' </div>\n';

        htmlStr += ' <div class="layui-input-inline">\n';
        htmlStr += '  <input type="text" name="' + id + '_' + type + '_width" id="' + id + '_' + type + '_width" lay-verify="required" placeholder="请输入列宽度" autocomplete="off"\n' +
            '                       class="layui-input">';
        htmlStr += ' </div>\n';

        htmlStr += ' <div class="layui-input-inline">\n';
        htmlStr += ' <select name="' + id + '_' + type + '_sort" lay-verify="required" lay-filter="' + id + '_' + type + '_sort">';
        htmlStr += sortOptions;
        htmlStr += ' </select>';
        htmlStr += ' </div>\n';

        htmlStr +=
            '   <button type="button" class="layui-btn layui-btn-primary layui-col-md1" id="' + id + '_' + type + '_delete"><i\n' +
            '       class="layui-icon layui-icon-subtraction "></i></button>\n' +
            '  </div>';
        return htmlStr;
    }

    /**
     * 添加额外的监听事件
     * @param id
     */
    addSelectEvent(id) {
        let that = this;
        let type = this.type;
        layui.form.on('select(' + id + '_' + type + '_select' + ')', function (data) {
            that.exitFieldMap.set(id, data.value);
        });
    }

    getDataArr() {
        return this.showFieldAddIdArr;
    }

    setDataArr(data) {
        this.showFieldAddIdArr = data;
    }

    pushIdArr(id) {
        this.showFieldAddIdArr.push(id);
    }

    backShow(data) {
        let dataObj = {};
        let that = this;
        data.forEach(item => {
            $("#" + that.type + "_add").trigger("click");
            let uid = that.showFieldAddIdArr[that.showFieldAddIdArr.length - 1];
            let selectName = uid + "_" + that.type + "_select";
            let inputName = uid + "_" + that.type + "_input";
            let width = uid + "_" + that.type + "_width";
            let sort = uid + "_" + that.type + "_sort";
            dataObj[selectName] = item.field;
            dataObj[inputName] = item.type;
            dataObj[width] = item.width;
            dataObj[sort] = item.sort;
        });
        layui.form.val('formOk', dataObj);
    }

}

class OptionType extends ShowHtml {
    #type_name = 'table_option_type';

    optionColumnIdArr = [];

    constructor(type, fieldTypeArr) {
        super(type, fieldTypeArr);
    }

    setInitData(fieldTypeArr) {
        this.fieldTypeArr = fieldTypeArr;
    }

    getShowItemContentHtml(id) {
        let type = this.type;
        let htmlStr = '';
        let typeOptions = '<option value="">请选择</option></br>';
        this.fieldTypeArr.forEach(item => {
            typeOptions += '<option value="' + item.dict_value + '">' + item.dict_label + '</option></br>';
        });
        htmlStr += '<div class="layui-input-block" id="' + id + '_' + type + '_item">\n';

        htmlStr += ' <div class="layui-input-inline">\n';
        htmlStr += ' <select name="' + id + '_' + type + '_input" lay-verify="required" lay-filter="' + id + '_' + type + '_input">';
        htmlStr += typeOptions;
        htmlStr += ' </select>';
        htmlStr += ' </div>\n';

        htmlStr += ' <div class="layui-input-inline">\n';
        htmlStr += '<input type="text" name="' + id + '_' + type + '_permission"  placeholder="请输入权限" autocomplete="off" class="layui-input">';
        htmlStr += ' </div>\n';

        htmlStr +=
            '   <button type="button" class="layui-btn layui-btn-primary" id="' + id + '_' + type + '_delete"><i\n' +
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
        data.forEach(item => {
            $("#" + that.type + "_add").trigger("click");
            let uid = that.optionColumnIdArr[that.optionColumnIdArr.length - 1];
            let inputName = uid + "_" + that.type + "_input";
            let permName = uid + "_" + that.type + "_permission";
            dataObj[inputName] = item.field;
            dataObj[permName] = item.permission;
        });
        layui.form.val('formOk', dataObj);
    }

}

class BitchOptionType extends OptionType {
    #type_name = 'table_bitch_option_type';
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