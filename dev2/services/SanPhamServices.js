//Danh sách sản phẩm
function SanPhamService(){
    //lấy danh sách sp
    this.layDanhSachSP = function(){
        var promise = axios({
            method: 'get',
            url: 'https://mockapi.io/projects/636a3efbc07d8f936d9799bc',
          });
        return promise;
        

    }
    this.themSP = function (spNew) {
        var promise= axios({
            method: 'post',
            url: 'https://mockapi.io/projects/636a3efbc07d8f936d9799bc',
            data:spNew
          });

         return promise
    }
    this.XoaSP = function (id) {
        return axios({
            method: 'delete',
            url: `https://mockapi.io/projects/636a3efbc07d8f936d9799bc/${id}`,
          });
    }
    this.layChiTietSP = function(id){
        return axios({
            method: 'get',
            url: `https://mockapi.io/projects/636a3efbc07d8f936d9799bc/${id}`,
          });
    }
    this.capNhatSP = function(id, newData){
        return axios({
            method: 'put',
            url: `https://mockapi.io/projects/636a3efbc07d8f936d9799bc/${id}`,
            data: newData
          });
    }

}