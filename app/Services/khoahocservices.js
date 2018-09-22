function KhoaHocService() {
    this.LayDanhSachKhoaHoc = function () {
        var  apiURL = `http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc`;
        // không có done, fail mà sử dụng return vì ajax là cơ chế bất đồng bộ
        return $.ajax({
            url:apiURL,
            type: "GET",
            dataType: "json"
        });
    }
    this.ThemKhoaHoc = function (khoaHoc) {
        var apiURL = `http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc`;
        return $.ajax({
            url:apiURL,
            type:"POST",
            dataType:"json",
            data: khoaHoc
        });
    }
    this.CapNhatKhoaHoc = function (khoaHoc) {
        var apiURL = `http://sv.myclass.vn/api/QuanLyTrungTam/capnhatkhoahoc`;
        return $.ajax({
            type:"PUT",
            url:apiURL,
            dataType:"json",
            data: khoaHoc
        });
    }
    // PUT: CHÌNH SỬA
    // PUT VÀ POST NHƯ NHAU
    // GET: BỊ GIỚI HẠN KÍ TỰ
}