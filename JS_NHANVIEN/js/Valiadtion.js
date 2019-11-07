function Validation() {
    this.checkRong = function (input, id, message) {
        if (input === "") {
            getEle(id).style.display = "block";
            getEle(id).innerHTML = message;
            return false;
        } else {
            getEle(id).style.display = "none";
            getEle(id).innerHTML = "";
            return true;
        }
    };
    this.checkKiTu = function (input, id, message, min, max) {
        if (input.length >= min && input.length <= max) {
            getEle(id).style.display = "none";
            getEle(id).innerHTML = "";
            return true;
        } else {
            getEle(id).style.display = "block";
            getEle(id).innerHTML = message;
            return false;
        }
    };
    this.checkChucVu = function (id, spanid, message) {
        if (getEle(id).selectedIndex !== 0) {
            // hop le
            getEle(spanid).style.display = "none";
            getEle(spanid).innerHTML = "";
            return true;
        }
        getEle(spanid).style.display = "block";
        getEle(spanid).innerHTML = message;
        return false;
    };
    this.checkEmail = function (input, spanid, message) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (input.match(mailformat)) {
            // Hop lệ
            getEle(spanid).style.display = "none";
            getEle(spanid).innerHTML = "";
            return true;
        }
        getEle(spanid).style.display = "block";
        getEle(spanid).innerHTML = message;
        return false;
    };
    this.checkString = function (input, spanid, message) {
        var pattern = new RegExp(

            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +

            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +

            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"

        );
        if (pattern.test(input)) {
            getEle(spanid).style.display = "none";
            getEle(spanid).innerHTML = "";
            return true;
        }
        getEle(spanid).style.display = "block";
        getEle(spanid).innerHTML = message;
        return false;
    };
    this.checkTrungCode = function (input, spanid, message, mangNV) {
        // Duyệt mảng
        // So sánh input có trùng
        // Nếu trùng => false
        // Ngược lại => true
        var check = mangNV.some(function (item) {
            return input === item.manv;
        })
        if (check === true) {
            getEle(spanid).style.display = "block";
            getEle(spanid).innerHTML = message;
            return false;
        }
        getEle(spanid).style.display = "none";
        getEle(spanid).innerHTML = "";
        return true;
    }

}