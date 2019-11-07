function DanhSachNV() {
    this.mangNhanVien = [];
    this.themNV = function (nhanVien) {
        this.mangNhanVien.push(nhanVien);
    }
    this.xoaNhanVien = function (manv) {
        // Tạo var viTri = -1
        //Duyệt mảng
        // Nếu maNV === item.manv
        // viTri = index;
        // array.splice(viTri, 1)'
        var viTri = this.timViTri(manv);
        if (viTri !== -1) {
            this.mangNhanVien.splice(viTri, 1);
        }
    };
    this.timViTri = function (manv) {
        var viTri = -1;
        this.mangNhanVien.map(function (item, index) {
            if (manv === item.manv) {
                viTri = index;
            }
        });
        return viTri;
    }
}

DanhSachNV.prototype.layThongTinUser = function (manv) {
    var viTri = this.timViTri(manv);
    return this.mangNhanVien[viTri];
}
DanhSachNV.prototype.capNhatUser = function (nhanVien) {
    var viTri = this.timViTri(nhanVien.manv);
    if (viTri !== -1) {
        this.mangNhanVien[viTri] = nhanVien;
    }
}
DanhSachNV.prototype.timNhanVien = function (chuoiTimKiem) {
    // Tạo mảng rỗng mangTimKiem = []
    // Duyệt mảng
    // Nếu chuoiTimKiem có tồn tại trong mảng
    // mangTimKiem.push nhân viên tìm thấy
    // Trả về mangTimKiem

    var mangTimKiem = [];
    this.mangNhanVien.map(function (item) {
        // Thay 3 dấu bằng hàm indexOf javascript
        // if (chuoiTimKiem === item.hoten) {
        //     mangTimKiem.push(item);
        // }
        if (item.hoten.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1) {
            mangTimKiem.push(item);
        }
    });
    return mangTimKiem;
}