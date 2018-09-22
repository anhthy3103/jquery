function DanhSachKhoaHoc() {
    this.MangKhoaHoc = [];
    this.LayDanhSachKhoaHoc = function (maKhoaHoc) //Input: taiKhoan
    {
        var KhoaHoc = {};
        this.MangKhoaHoc.map(function(khoaHoc, index)
        {
            
            if (khoaHoc.MaKhoaHoc == maKhoaHoc) {
                KhoaHoc = khoaHoc;
            }
        });
        return KhoaHoc;
    }
}

