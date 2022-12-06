var spService = new SanPhamService();
var validation = new Validation();
function layDanhSachSanPham() {
  var promise = spService.layDanhSachSP();
  promise.then(function (result) {
    //Hiển thị lên UI
    hienThiDashboard(result.data);
  });
  promise.catch(function (error) {
    console.log(error);
  });
}
layDanhSachSanPham();

function hienThiDashboard(mangSP) {
  var content = "";
  mangSP.map(function (sp) {
    content += `
        <tr>
        <td>${sp.id}</td>
        <td>${sp.name}</td>
        <td><img src="${sp.img}" alt="" style="width: 100%"></td>
        <td>$${sp.price}</td>
        <td>${sp.frontCamera}</td>
        <td>${sp.backCamera}</td>
        <td>${sp.screen}</td>
        <td>${sp.desc}</td>
        <td>${sp.type}</td>
        <td class="d-flex">
        <button class="btn1 btn-danger" onclick="xoaSanPham('${sp.id}')">Xóa</button>
        <button class="btn1 btn-info"  onclick="xemCT('${sp.id}')" data-toggle="modal" data-target="#myModal">Xem</button>
        </td>
        </tr>
      `;
  });
  document.querySelector("#tbodyTableList").innerHTML = content;
}
document.querySelector("#btnThemSP").onclick = function () {

  document.querySelector("#myModal .modal-footer").innerHTML = `<button class="btn btn-success" onclick="themSanPham()">Thêm sản phẩm</button>` + `<button id="btnCapNhat" onclick="" type="button" class="btn btn-success">Reset</button>` + `<button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>`
}




function themSanPham() {
  // console.log("hàm thêm sp");
  var TenSP = document.querySelector("#TenSP").value;
  var Hinhanh = document.querySelector("#Hinhanh").value;
  var gia = document.querySelector("#GiaSP").value;
  var Manhinh = document.querySelector("#Manhinh").value;
  var Thongsosau = document.querySelector("#Thongsosau").value;
  var Thongsotruoc = document.querySelector("#Thongsotruoc").value;
  var Mota = document.querySelector("#Mota").value;
  var Loai = document.querySelector("#Loai").value;
  var isValid = true;
  isValid &= validation.checkEmpty(TenSP, "Tên sản phẩm không được để trống", "spanTen")
  isValid &= validation.checkEmpty(Hinhanh, "Hình ảnh không được để trống", "spanHinhanh")
  isValid &= validation.checkEmpty(gia, "Giá không được để trống ", "spanGia")
  isValid &= validation.checkEmpty(Manhinh, "Màn hình  không được để trống ", "spanManhinh")
  isValid &= validation.checkEmpty(Thongsosau, "Thông số sau không được để trống ", "spanThongsosau")
  isValid &= validation.checkEmpty(Thongsotruoc, "Thông số trước không được để trống ", "spanThongsotruoc")
  isValid &= validation.checkEmpty(Mota, "Mô tả không được để trống ", "spanMota")
  isValid &= validation.checkDropdown("Loai", "Bạn chưa chọn loại sản phẩm", "spanLoai");
  if (isValid) {
    var spNew = new SanPham(TenSP, Hinhanh, gia, Thongsotruoc, Thongsosau, Manhinh, Mota, Loai);
    // console.log(spNew)
    spService.themSP(spNew)
    .then(function (result) {
      // console.log(result);
      alert("thêm thành công")
      document.querySelector("#TenSP").value = ""
      document.querySelector("#Hinhanh").value = ""
      document.querySelector("#GiaSP").value = ""
      document.querySelector("#Manhinh").value = ""
      document.querySelector("#Thongsosau").value = ""
      document.querySelector("#Thongsotruoc").value = ""
      document.querySelector("#Mota").value = ""
      document.querySelector("#Loai").value = ""
      layDanhSachSanPham();
    })
      .catch(function (error) {
        // console.log(error);
        alert("thêm không thành công")
      })
  }
}
function xoaSanPham(id) {
  spService.XoaSP(id).then(function (result) {
    alert("xóa thành công")
    layDanhSachSanPham();

  })
    .catch(function (error) {
      console.log(error)
      alert("xóa thất bại")

    })
}
function xemCT(id) {
  spService.layChiTietSP(id).then(function (result) {
    console.log(result.data);
    document.querySelector("#TenSP").value = result.data.name;
    document.querySelector("#Hinhanh").value = result.data.img;
    document.querySelector("#GiaSP").value = result.data.price
    document.querySelector("#Manhinh").value = result.data.screen;
    document.querySelector("#Thongsosau").value = result.data.backCamera;
    document.querySelector("#Thongsotruoc").value = result.data.frontCamera;
    document.querySelector("#Mota").value = result.data.desc;
    document.querySelector("#Loai").value = result.data.type;
    //them button cap nhat
    document.querySelector("#myModal .modal-footer").innerHTML = `<button class="btn btn-success" onclick="capNhatSanPham('${id}')">Cập nhật</button>`
  })
    .catch(function (error) {
      alert("xem thất bại")
    })
}
function capNhatSanPham(id) {
  var TenSP = document.querySelector("#TenSP").value;
  var Hinhanh = document.querySelector("#Hinhanh").value;
  var gia = document.querySelector("#GiaSP").value;
  var Manhinh = document.querySelector("#Manhinh").value;
  var Thongsosau = document.querySelector("#Thongsosau").value;
  var Thongsotruoc = document.querySelector("#Thongsotruoc").value;
  var Mota = document.querySelector("#Mota").value;
  var Loai = document.querySelector("#Loai").value;
  var isValid = true;
  isValid &= validation.checkEmpty(TenSP, "Tên sản phẩm không được để trống", "spanTen")
  isValid &= validation.checkEmpty(Hinhanh, "Hình ảnh không được để trống", "spanHinhanh")
  isValid &= validation.checkEmpty(gia, "Giá không được để trống ", "spanGia")
  isValid &= validation.checkEmpty(Manhinh, "Màn hình  không được để trống ", "spanManhinh")
  isValid &= validation.checkEmpty(Thongsosau, "Thông số sau không được để trống ", "spanThongsosau")
  isValid &= validation.checkEmpty(Thongsotruoc, "Thông số trước không được để trống ", "spanThongsotruoc")
  isValid &= validation.checkEmpty(Mota, "Mô tả không được để trống ", "spanMota")
  isValid &= validation.checkDropdown("Loai", "Bạn chưa chọn loại sản phẩm", "spanLoai");
  if (isValid) {
    var newData = new SanPham(TenSP, Hinhanh, gia, Thongsotruoc, Thongsosau, Manhinh, Mota, Loai);

    spService.capNhatSP(id, newData).then(function (result) {
      alert("Cập Nhật Thành Công")
      document.querySelector("#TenSP").value = ""
      document.querySelector("#Hinhanh").value = ""
      document.querySelector("#GiaSP").value = ""
      document.querySelector("#Manhinh").value = ""
      document.querySelector("#Thongsosau").value = ""
      document.querySelector("#Thongsotruoc").value = ""
      document.querySelector("#Mota").value = ""
      document.querySelector("#Loai").value = ""
      document.querySelector("#myModal .close").click();
      layDanhSachSanPham()


    })
      .catch(function (error) {
        alert("Cập Nhật Thất Bại")

      })
  }
}


function timKiemsanpham() {
  var tuKhoatim = document.querySelector("#searchName").value;
  var promise = spService.layDanhSachSP();
  promise.then(function (result) {
    var mangKetQua = [];
    var tuKhoa = tuKhoatim.toLowerCase().replace(/\s/g, "")
    result.data.map(function (sp) {
      var ten = sp.name.toLowerCase().replace(/\s/g, "");
      var viTri = ten.indexOf(tuKhoa);
      if (viTri > -1) {
        mangKetQua.push(sp)
      }
    })
    hienThiDashboard(mangKetQua);
  });
  promise.catch(function (error) {
    alert("tìm kiếm thất bại")
  });

}
document.querySelector("#searchName").onkeydown = timKiemsanpham