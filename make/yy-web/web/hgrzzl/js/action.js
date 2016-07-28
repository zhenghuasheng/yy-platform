//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

//取cookies函数
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}

function openSubmit() {
    $('#content')[0].src = "./request.html?system=" + getUrlParam('system') + "&source=" + getUrlParam("source");
    //window.location = "./request.html?system=" + getUrlParam('system') + "&source=" + getUrlParam("source");
}

function openStatus() {
    $('#content')[0].src = "./status.html?system=" + getUrlParam('system') + "&source=" + getUrlParam("source");
    //window.location = "./status.html?system=" + getUrlParam('system') + "&source=" + getUrlParam("source");
}

function submitRequest() {
    var formValidation = $('#defaultForm').data('bootstrapValidator');
    formValidation.validate();

    if (!formValidation.isValid()) {
        $("#myModalBody").html('请正确填写个人信息');
        $('#myModal').modal('show');
        return;
    }

    var name = $("#nameField")[0].value;
    var phone = $("#phoneField")[0].value;
    var idcard = $("#idcardField")[0].value;

    $.post("/action/hg/submit.do",
        {
            name: name,
            phone: phone,
            idCard: idcard,
            system: getUrlParam('system'),
            source: getUrlParam('source'),
            sourcename: getUrlParam("sourcename")
        },

        function (data, status) {
            if (status === "success") {
                if (!data.succeed) {
                    $("#myModalBody").html(data.ptError);
                    $('#myModal').modal('show');
                    return;
                }

                $("#myModalBody").html('申请提交成功');
                $('#myModal').modal('show');
                $('#defaultForm').data('bootstrapValidator').resetForm(true);
                //window.location = "/hgrzzl/status.html";
            }
        });
}

function getStatusList() {
    $.post("/action/hg/list.do",
        {
            system: getUrlParam('system'),
            source: getUrlParam('source')
        },

        function (data, status) {
            if (status === "success") {
                if (!data.succeed) {
                    alert(data.ptError);
                    return;
                }

                var requestList = $("#requestList")[0];

                while (requestList.rows.length > 1) {
                    requestList.deleteRow(requestList.rows.length - 1);
                }

                for (var i = 0; i < data.object.hgRequestList.length; ++i) {
                    var row = requestList.insertRow();
                    var id = row.insertCell(0);
                    id.innerHTML = data.object.hgRequestList[i].f_ciid;
                    var name = row.insertCell(1);
                    name.innerHTML = data.object.hgRequestList[i].f_name;
                    var phone = row.insertCell(2);
                    phone.innerHTML = data.object.hgRequestList[i].f_phone;
                    var status = row.insertCell(3);
                    status.innerHTML = data.object.hgRequestList[i].status;
                }
            }
        });
}

function requestValidate() {
    $('#defaultForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            userName: {
                validators: {
                    notEmpty: {
                        message: '姓名不能为空'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: '电话不能为空'
                    },
                    regexp: {
                        regexp: /^1(3|5|8)[0-9]{9}$/,
                        message: '请输入正确的手机号码，11位'
                    }
                }
            },
            idCard: {
                validators: {
                    notEmpty: {
                        message: '身份证号码不能为空'
                    },
                    regexp: {
                        regexp: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
                        message: '中国大陆的身份证为15位或18(加上X)位'
                    }
                }
            }
        }
    });
    //$('#defaultForm').bootstrapValidator('validate');
}
