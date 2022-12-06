// Danh sách sản phẩm
function SanPhamService(){
    
    // lấy danh sách sản phẩm
    this.layDanhSachSP = function(){
        // trạng thái: chờ lấy dữ liệu (pending)
        return axios({
            method: 'get',
            url: 'https://63838bbb1ada9475c80294b8.mockapi.io/Products',
        });

        return promise;
    }

    this.getProduct = id => {
        return axios({
            method: 'get',
            url: `https://63838bbb1ada9475c80294b8.mockapi.io/Products/${id}`,
        });
    }

}
// END //
