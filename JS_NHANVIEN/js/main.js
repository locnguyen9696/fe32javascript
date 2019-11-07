var danhSachNV = new DanhSachNV();
var validation = new Validation();
getLocalStorage();
document.getElementById("btnThem").addEventListener("click", function () {
    getEle("btnCapNhat").style.display = "none";
    getEle("btnThemNV").style.display = "block";
    getEle("msnv").removeAttribute("disabled");
});

getEle("btnThemNV").addEventListener("click", function () {
    var manv = getEle("msnv").value;
    var hoten = getEle("name").value;
    var email = getEle("email").value;
    var pass = getEle("password").value;
    var date = getEle("datepicker").value;
    var position = getEle("chucvu").value;

    // danhSachNV.themNV(NV);

    // Đặt cờ (true or false)
    var isValid = true;
    // Mã nhân viên
    isValid &= validation.checkRong(manv, "tbMaNV", "(*) Bắt buộc nhập.") && validation.checkTrungCode(manv, "tbMaNV", "Mã đã tồn tại", danhSachNV.mangNhanVien);

    // Họ tên
    isValid &= validation.checkRong(hoten, "tbTen", "(*) Bắt buộc nhập.") && validation.checkString(hoten, "tbTen", "Họ tên không hợp lệ");
    // Email
    isValid &= validation.checkRong(email, "tbEmail", "(*) Bắt buộc nhập.") && validation.checkEmail(email, "tbEmail", "Email không hợp lệ.");
    // Pass
    isValid &= validation.checkRong(pass, "tbMatKhau", "(*) Bắt buộc nhập.") && validation.checkKiTu(pass, "tbMatKhau", "Ký tự cho phép từ 6-12.", 6, 12);
    // Chức vụ
    isValid &= validation.checkChucVu("chucvu", "tbChucVu", "Vui lòng chọn chức vụ");
    if (isValid) {
        var nhanVien = new NhanVien(manv, hoten, email, pass, date, position);
        danhSachNV.themNV(nhanVien);
        console.log(danhSachNV.mangNhanVien);
        taoBang();
        setLocalStorage();
    }

});
function taoBang(mang = danhSachNV.mangNhanVien) {
    var tbody = getEle("tableDanhSach");
    var content = "";
    mang.map(function (item, index) {
        content += `
            <tr>
                <td>${item.manv}</td>
                <td>${item.hoten}</td>
                <td>${item.email}</td>
                <td>${item.date}</td>
                <td>${item.position}</td>
                <td>
                <button class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="suaNhanVien('${item.manv}')">Sửa</button>
                <button class="btn btn-danger" onclick="xoa('${item.manv}')">Xóa</button>
                </td>
            </tr>        
        `
    });
    tbody.innerHTML = content;
};
function xoa(manv) {
    danhSachNV.xoaNhanVien(manv);
    taoBang();
    setLocalStorage();
}
function suaNhanVien(manv) {
    getEle("btnThemNV").style.display = "none";
    getEle("btnCapNhat").style.display = "block";
    var nhanVien = danhSachNV.layThongTinUser(manv);
    getEle("msnv").value = nhanVien.manv;
    getEle("msnv").setAttribute("disabled", true);
    getEle("name").value = nhanVien.hoten;
    getEle("email").value = nhanVien.email;
    getEle("password").value = nhanVien.pass;
    getEle("datepicker").value = nhanVien.date;
    getEle("chucvu").value = nhanVien.position;
}
// Cập nhật thông tin
getEle("btnCapNhat").addEventListener("click", function () {
    var manv = getEle("msnv").value;
    var hoten = getEle("name").value;
    var email = getEle("email").value;
    var pass = getEle("password").value;
    var date = getEle("datepicker").value;
    var position = getEle("chucvu").value;

    var nhanVien = new NhanVien(manv, hoten, email, pass, date, position);
    danhSachNV.capNhatUser(nhanVien);
    taoBang();
    setLocalStorage();
})
// Tìm kiếm NV
// keyup để tìm kiếm từng kí tự
getEle("searchName").addEventListener("keyup", function () {
    var findString = getEle("searchName").value;
    var mangTimKiem = danhSachNV.timNhanVien(findString);

    taoBang(mangTimKiem);
})
// Lưu data xuống bảng tạm
// Tham số bắt buộc phải chuỗi, JSON.stringify để chuyển mảng thành String
function setLocalStorage() {
    localStorage.setItem("Danh Sách Nhân Viên", JSON.stringify(danhSachNV.mangNhanVien))
}
// Lấy mảng từ localStorage
function getLocalStorage() {
    if (localStorage.getItem("Danh Sách Nhân Viên")) {
        danhSachNV.mangNhanVien = JSON.parse(localStorage.getItem("Danh Sách Nhân Viên"));
    }
    taoBang();
}
// Xóa nhân viên

function getEle(id) {
    return document.getElementById(id);
};