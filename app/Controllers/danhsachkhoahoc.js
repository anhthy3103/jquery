$(document).ready(function () {
    var dsKhoaHoc = new DanhSachKhoaHoc();
    var svKhoaHoc = new KhoaHocService();
    var svNguoiDung = new NguoiDungService();
    // gọi phương thức từ service thông qua api đã cài đặt lấy dữ liệu
    svKhoaHoc.LayDanhSachKhoaHoc()
        .done(function (data) {
            dsKhoaHoc.MangKhoaHoc = data;
            LoadDanhSachKhoaHoc(data);
            // console.log(data);
        })
        .fail(function (error) {
            console.log(error);
        });
    // load nội dung cho thẻ select người tạo
    svNguoiDung.LayDanhSachNguoiDung().done(function (MangNguoiDung) {
        //gọi hàm load nội dung cho thẻ select
        // console.log(MangNguoiDung);
        LoadSelectNguoiDung(MangNguoiDung);
    }).fail(function (error) {
        console.log(error);
    })

    function LoadSelectNguoiDung(MangNguoiDung) {
        var noiDungSelect = "";
        MangNguoiDung.map(function (nguoiDung, index) {
            if (nguoiDung.MaLoaiNguoiDung == "GV") {
                noiDungSelect += `
                        <option value="${nguoiDung.TaiKhoan}">${nguoiDung.HoTen} </option>
                    `;
            }
        });
        $("#NguoiTao").html(noiDungSelect);
    }

    function LoadDanhSachKhoaHoc(MangKhoaHoc) {
        var noiDungTable = ``;
        // index: vị trí phần tử trong mảng khóa học
        // khoahoc: đối tượng trong mảng
        // cách 1: dùng for
        // for (let i = 0; i < MangKhoaHoc.length; i++) {
        //     var khoahoc = MangKhoaHoc[i];

        // }
        // cách 2: dùng map, tương tự như each
        MangKhoaHoc.map(function (khoahoc, index) {
            var moTa = khoahoc.MoTa;
            if (khoahoc.MoTa != null) {
                // Biểu thức điều kiện ? Đúng thực hiện biểu thức 1: sai thực hiện biểu thức 2 = if-else
                khoahoc.MoTa.length >= 100 ? moTa = khoahoc.MoTa.substring(0, 100) : moTa = khoahoc.MoTa;
            }
            noiDungTable += `
            <tr>
                <td></td>
                <td>${khoahoc.MaKhoaHoc}</td>
                <td>${khoahoc.TenKhoaHoc}</td>
                <td>${moTa}...</td>
                <td> <img src='${khoahoc.HinhAnh}' width="80" height="80"/></td>
                <td>${Number(khoahoc.LuotXem).toLocaleString()}</td>
                <td>${khoahoc.NguoiTao}</td>
                <td><button class="btn btn-primary btnChinhSua" makhoahoc="${khoahoc.MaKhoaHoc}">Chỉnh sửa</button></td>
                <td><button class="btn btn-warning btnXoa" makhoahoc="${khoahoc.MaKhoaHoc}">Xóa</button></td>
            </tr>
            `;
        })
        $("#tblDanhSachKhoaHoc").html(noiDungTable);
    }
    $("#btnThemKhoaHoc").click(function () {
        $("#btnModal").trigger('click');
        $('.modal-title').html('Thêm khóa học');
        var modalFooter = `
            <button class="btn btn-success" id="btnThemKH">Thêm khóa học</button>
            <button class="btn btn-dark" data-dismiss="modal">Hủy</button>
        `
        $('.modal-footer').html(modalFooter);
        //Clear dữ liệu input
        $('.modal-body input').val('');
    })

    $("body").delegate("#btnThemKH", "click", function () {
        var khoaHoc = new KhoaHoc();
        khoaHoc.MaKhoaHoc = $("#MaKhoaHoc").val();
        khoaHoc.TenKhoaHoc = $("#TenKhoaHoc").val();
        khoaHoc.MoTa = $("#MoTa").val();
        khoaHoc.MoTa = CKEDITOR.instances.MoTa.getData();

        khoaHoc.LuotXem = $("#LuotXem").val();
        khoaHoc.NguoiTao = $("#NguoiTao").val();
        console.log(khoaHoc);
        //   gọi service post dữ liệu khóa học lên server
        svKhoaHoc.ThemKhoaHoc(khoaHoc).done(function (ketqua) {
            // console.log(ketqua);
            if (ketqua) {
                location.reload(); //thêm thành công refresh lại trang
            }
        }).fail(function (error) {
            console.log(error);
        })
    });

    // chỉnh sửa khóa học
    $("body").delegate(".btnChinhSua", "click", function () {

        //Thao tác với popup
        //Thay đổi header và footer
        $("#btnModal").trigger('click');
        $('.modal-title').html('Thêm khóa học');
        var modalFooter = `
            <button class="btn btn-success" id="btnLuu">Lưu</button>
            <button class="btn btn-dark" data-dismiss="modal">Hủy</button>
        `;
        $('.modal-footer').html(modalFooter);
        // lấy mã khóa học từ chính nút chỉnh sửa
        var MaKhoaHoc = $(this).attr("makhoahoc");
        var khoaHoc = dsKhoaHoc.LayDanhSachKhoaHoc(MaKhoaHoc);
        console.log(khoaHoc);
            //Load giá trị lên thẻ input
            $("#MaKhoaHoc").val(khoaHoc.MaKhoaHoc);
            $("#TenKhoaHoc").val(khoaHoc.TenKhoaHoc);
            $("#MoTa").val(khoaHoc.MoTa);
            $("#LuotXem").val(khoaHoc.LuotXem);
            $("#NguoiTao").val(khoaHoc.NguoiTao);
        
     
    });

    $("body").delegate("#btnLuu", "click", function () {
        var khoaHoc = new KhoaHoc();
        khoaHoc.MaKhoaHoc = $("#MaKhoaHoc").val();
        khoaHoc.TenKhoaHoc = $("#TenKhoaHoc").val();
        khoaHoc.MoTa = $("#MoTa").val();
        khoaHoc.LuotXem = $("#LuotXem").val();
        khoaHoc.NguoiTao = $("#NguoiTao").val();
        console.log(khoaHoc);
        //   gọi service post dữ liệu khóa học lên server
        svKhoaHoc.ThemKhoaHoc(khoaHoc).done(function (ketqua) {
            // console.log(ketqua);
            if (ketqua) {
                location.reload(); //thêm thành công refresh lại trang
            }
        }).fail(function (error) {
            console.log(error);
        })
    });
    CKEDITOR.replace("MoTa");
})