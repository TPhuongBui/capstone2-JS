//Danh sách sản phẩm
function SanPhamService(){
    //lấy danh sách sp
    
    this.layDanhSachSP = function(){
        var promise = axios({
            method: 'get',
            url: 'https://63838bbb1ada9475c80294b8.mockapi.io/Products',
          });
        return promise;
        

    }
    this.themSP = function (spNew) {
        var promise= axios({
            method: 'post',
            url: 'https://63838bbb1ada9475c80294b8.mockapi.io/Products',
            data:spNew
          });

         return promise
    }


    this.XoaSP = function (id) {
        return axios({
            method: 'delete',
            url: `https://63838bbb1ada9475c80294b8.mockapi.io/Products/${id}`,
          });
    }


    this.layChiTietSP = function(id){
        return axios({
            method: 'get',
            url: `https://63838bbb1ada9475c80294b8.mockapi.io/Products/${id}`,
          });
    }

    
    this.capNhatSP = function(id, newData){
        return axios({
            method: 'put',
            url: `https://63838bbb1ada9475c80294b8.mockapi.io/Products/${id}`,
            data: newData
          });
    }

}