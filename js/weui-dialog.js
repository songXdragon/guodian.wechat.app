/**
 * Created by waima00 on 2016/12/4.
 */
/**
 * 基于weui和jQuery的对话框插件
 * 版本：1.1
 * 作者：NineTeen
 *
 */

;
(function($, window, document, undefined) {
    /*-----------------------------------------------------------
     * |                                                        |
     * |                        全局变量                            |
     * |                                                        |
     * ----------------------------------------------------------
     */
    var _this; //插件对象
    var that; //插件父元素

    //dialog 模版 DOM树
    var dialogModel = '<div class="js_dialog" id="dialog" style="display:none ;">' +
        '<div class="weui-mask"></div>' +
        '<div class="weui-dialog">' +
        '<div class="weui-dialog__hd"><strong class="weui-dialog__title" data-title=""></strong></div>' +
        '<div class="weui-dialog__bd" data-content=""></div>' +
        '<div class="weui-dialog__ft">' +
        '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default " data-cancle="" alt="cancle"></a>' +
        '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary " data-ok="" alt="ok"></a>' +
        '</div></div></div>';

    /*-----------------------------------------------------------
     * |                                                        |
     * |                        构造函数                            |
     * |                                                        |
     * ----------------------------------------------------------
     */
    var Dialog = function(opt) {
        this.defaults = {
            title: "Dialog标题",
            content: "Dialog提示内容",
            ok: "确定",
            cancle: "取消",
            okFcn: function() {
                return true;
            },
            cancleFcn: function() {
                return true;
            },
            closeFcn: function() {
                return true;
            }
        }
        this.options = $.extend({}, this.defaults, opt);
        init(this.options);
    };

    /*-----------------------------------------------------------
     * |                                                        |
     * |                        私有方法                            |
     * |                                                        |
     * ----------------------------------------------------------
     */

    //添加DOM
    function add() {
        $("#dialog").remove();
        if(that.html() == undefined) {
            $("body").append(dialogModel);
        } else {
            that.append(dialogModel);
        }
    }
    //插件初始化
    function init(ops) {
        add();
        $.each(ops, function(key, value) {
            if(typeof(value) == "string" && value) {
                $("#dialog").find('[data-' + key + ']').html(value);
            } else if(typeof(value) == "string" && !value) {
                $("#dialog").find('[data-' + key + ']').remove();
            } else {
                //              console.log("this is function");
            }
        });
        bind();
    }

    //事件绑定
    function bind() {
        $("#dialog a[data-ok],#dialog a[data-cancle]").on("click", function(e) {
            if(typeof _this.options[$(e.target).attr("alt") + "Fcn"] == "function") {
                if(_this.options[$(e.target).attr("alt") + "Fcn"]() === false) {
                    return false;
                } else {
                    _this.close();
                }
            } else {
                return false;
            }

        });
    }

    /*-----------------------------------------------------------
     * |                                                        |
     * |                        公有方法                            |
     * |                                                        |
     * ----------------------------------------------------------
     */
    Dialog.prototype = {
        //显示
        show: function() {
            $("#dialog").show();
        },
        //关闭
        close: function() {
            $("#dialog").hide();
            this.options["closeFcn"]();
        },
        //移除dom
        remove: function() {
            $("#dialog").remove();
        },
        //设置标题
        title: function(v) {
            this.options['title'] = v;
            init(this.options);
        },
        //设置内容
        content: function(v) {
            this.options['content'] = v;
            init(this.options);
        }

    };

    //插件主体
    $.fn.weuiDialog = function(options) {
        that = $(this);
        _this = new Dialog(options);
        return _this;
    };

})(jQuery, window, document);