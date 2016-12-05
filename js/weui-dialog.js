/**
 * Created by waima00 on 2016/12/4.
 */
/**
 * ����weui��jQuery�ĶԻ�����
 * �汾��1.1
 * ���ߣ�NineTeen
 *
 */

;
(function($, window, document, undefined) {
    /*-----------------------------------------------------------
     * |                                                        |
     * |                        ȫ�ֱ���                            |
     * |                                                        |
     * ----------------------------------------------------------
     */
    var _this; //�������
    var that; //�����Ԫ��

    //dialog ģ�� DOM��
    var dialogModel = '<div class="weui_dialog_alert" id="dialog" style="display:none ;">' +
        '<div class="weui_mask"></div>' +
        '<div class="weui_dialog">' +
        '<div class="weui_dialog_hd"><strong class="weui_dialog_title" data-title=""></strong></div>' +
        '<div class="weui_dialog_bd" data-content=""></div>' +
        '<div class="weui_dialog_ft">' +
        '<a href="javascript:;" class="weui_btn_dialog default " data-cancle="" alt="cancle"></a>' +
        '<a href="javascript:;" class="weui_btn_dialog primary " data-ok="" alt="ok"></a>' +
        '</div></div></div>';

    /*-----------------------------------------------------------
     * |                                                        |
     * |                        ���캯��                            |
     * |                                                        |
     * ----------------------------------------------------------
     */
    var Dialog = function(opt) {
        this.defaults = {
            title: "Dialog����",
            content: "Dialog��ʾ����",
            ok: "ȷ��",
            cancle: "ȡ��",
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
     * |                        ˽�з���                            |
     * |                                                        |
     * ----------------------------------------------------------
     */

    //���DOM
    function add() {
        $("#dialog").remove();
        if(that.html() == undefined) {
            $("body").append(dialogModel);
        } else {
            that.append(dialogModel);
        }
    }
    //�����ʼ��
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

    //�¼���
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
     * |                        ���з���                            |
     * |                                                        |
     * ----------------------------------------------------------
     */
    Dialog.prototype = {
        //��ʾ
        show: function() {
            $("#dialog").show();
        },
        //�ر�
        close: function() {
            $("#dialog").hide();
            this.options["closeFcn"]();
        },
        //�Ƴ�dom
        remove: function() {
            $("#dialog").remove();
        },
        //���ñ���
        title: function(v) {
            this.options['title'] = v;
            init(this.options);
        },
        //��������
        content: function(v) {
            this.options['content'] = v;
            init(this.options);
        }

    };

    //�������
    $.fn.weuiDialog = function(options) {
        that = $(this);
        _this = new Dialog(options);
        return _this;
    };

})(jQuery, window, document);