const spService = new SanPhamService();
let listProductList = [];
let listItemCart = [];
let subTotal = 0;
let cartCount = 0;
const taxRate = 0.05;
const getELE = id => document.getElementById(id);

// lấy data từ API
function layDanhSachSanPham() {
    var promise = spService.layDanhSachSP();

    promise.then(function (result) {

        //? thành công (resolve)
        //todo: Hiển thị lên table, chỉ chạy hiển thị khi lấy dữ liệu thành công
        showMainPhoneList(result.data);
        listProductList = result.data;
        // console.log(listProductList);
    })

    promise.catch(function (error) {

        //? thất bại (reject)
        console.log(error);
    })

}
layDanhSachSanPham();
// END //


// Hiển thị list sản phẩm ra màn hình chính
function showMainPhoneList(phoneArray) {
    var content = "";
    phoneArray.map(function (sp) {
        // content(mới) = content(cũ) + `<tr></tr>`
        content += `<div class="col-xs-4 col-lg-3 mainCart">
        <div class="cartTop">
            <img src="${sp.img}" alt="#">
        </div>
        <div class="cartBody active">
            <h2>${sp.name}</h2>
            <h3>$${sp.price}</h3>
            <p>Camera trước: ${sp.frontCamera} <br> Camera sau: ${sp.backCamera}</p>
        </div>
        <div class="cartBottom ">
            <button class="btn btn-success" id = "btnThem" onclick="addToCart(${sp.id})">Thêm vào giỏ hàng</button>
        </div>
        </div>`
    });

    // console.log(content);

    document.querySelector("#tblDanhSachSP").innerHTML = content;
}
// END //


// Tạo và dùng local storage

const saveData = () => {
    localStorage.setItem("List Products", JSON.stringify(listItemCart));
    countQuantity();
};

// Get data localStorage
const fetchData = () => {
    const localCart = localStorage.getItem("List Products")
    if (localCart) listItemCart = JSON.parse(localCart)
    showCartPhoneList();
    countQuantity();
};
fetchData();
// END //


// Hiển thị sản phẩm thêm vào trong giỏ hàng và các tính năng tính tổng tiền
function showCartPhoneList() {
    var content = "";
    console.log(listItemCart);
    listItemCart.map(function (sp) {
        content += `
        <div class="product">
            <div class="product__1">
            <div class="product__thumbnail">
                <img src="${sp.product.img}"
                alt="Italian Trulli">
            </div>
            <div class="product__details">
                <div><b>${sp.product.name}</b></div>
                <div class="tertiary"><span>${sp.product.screen}</span></div>
                <div>Back Camera: <span class="tertiary">${sp.product.backCamera}</span></div>
                <div>Front Camera: <span class="tertiary">${sp.product.frontCamera}</span></div>
                <div><a href="#!" onclick="btnRemove('${sp.product.id}')">Remove</a></div>
            </div>
            </div>
            <div class="product__2">
            <div class="qty">
                <span><b>Quantity:</b> </span> &nbsp; &nbsp;
                <span class="minus bg-dark" onclick="btnMinus('${sp.product.id}')">-</span>
                <span class="quantityResult mx-2">${sp.quantity}</span>
                <span class="plus bg-dark" id="plus" onclick="btnPlus('${sp.product.id}')">+</span>
            </div>
            <div class="product__price"><b>$${sp.quantity * sp.product.price}</b></div>
            </div>
        </div>`
    });

    document.querySelector("#cartList").innerHTML = content;
    subTotal = totalMoney();
    cartCount = countQuantity();
    let shippingAmount;
    if (subTotal > 5000) {
        shippingAmount = 0;
    } else {
        shippingAmount = subTotal * 0.1;
    }

    getELE("subTotal").innerHTML = '$' + subTotal;
    getELE("shipping").innerHTML = '$' + shippingAmount;
    getELE("tax").innerHTML = '$' + subTotal * taxRate;
    getELE("priceTotal").innerHTML = '$' + Number(subTotal + shippingAmount + (subTotal * taxRate));
    subTotal = Number(subTotal + shippingAmount + (subTotal * taxRate));
    getELE("cartCount").innerHTML = cartCount;

}
// END //



// Thêm sản phẩm vào giỏ hàng
function addToCart(id) {
    const existedProduct = listItemCart.find(cartItem => cartItem.product.id == id);
    if (existedProduct) {
        existedProduct.quantity += 1;
    } else {
        for (const productItem of listProductList) {
            if (productItem.id == id) {
                var product = productItem;
                var cartItem = new CartItem(product, 1);
                listItemCart.push(cartItem);
            }
        }
    }

    showCartPhoneList();
    saveData();
}
// END //



// đếm số sản phẩm hiển thị ở header giỏ hàng
function countQuantity() {
    let count = 0;
    for (i = 0; i < listItemCart.length; i++) {
        count += listItemCart[i].quantity;
    }
    return count;
}
// END //



// Hàm tính tổng tiền trong giỏ hàng
function totalMoney() {
    let sum = 0;
    for (i = 0; i < listItemCart.length; i++) {
        sum += Number(listItemCart[i].product.price) * Number(listItemCart[i].quantity);
        console.log(sum);
    }
    return sum;
}
// END //



// Lọc iphone và samsung trong giỏ hàng
function filterProduct(val) {
    let listItemProductFilter = [];
    for (i = 0; i < listProductList.length; i++) {
        if (listProductList[i].type == val.value) {
            listItemProductFilter.push(listProductList[i]);
        }
    }
    if (val.value == "All") {
        listItemProductFilter = listProductList;
    }
    showMainPhoneList(listItemProductFilter);
}
// END //



// Hàm common xóa 1 sản phẩm
function removeItemInCart(idProduct) {
    // Tạo mạng rác
    let listItemCartFilter = [];

    // Chạy vòng for để load toàn bộ data của cart
    for (i = 0; i < listItemCart.length; i++) {
        // Kiểm tra nếu id được chọn bằng với id của mảng đang duyệt thì bỏ qua nó (không thêm vào mảng rác), ngược lại thì các item cart khác sẽ được thêm vào rác
        if (listItemCart[i].product.id == idProduct) {
            continue;
        }
        listItemCartFilter.push(listItemCart[i]);
    }
    listItemCart = listItemCartFilter;
}
// END //




// Event khi click vào remove 1 sản phẩm
function btnRemove(idProduct) {
    let isRemoveInCart = confirm("Bạn muốn xóa sản phẩm này không?")
    if(isRemoveInCart == true){
        removeItemInCart(idProduct);
    }
    showCartPhoneList();
    saveData();
}
// END //

// Dấu cộng trong giỏ hàng
function btnPlus(idProduct) {
    for (i = 0; i < listItemCart.length; i++) {
        if (listItemCart[i].product.id == idProduct) {
            if (listItemCart[i].quantity < 100) {
                listItemCart[i].quantity += 1;
                // console.log("Mày đây rồi");
            }
        }
    }
    showCartPhoneList();
    saveData();
}
// END // 



// Dấu trừ trong giỏ hàng
function btnMinus(idProduct) {
    for (i = 0; i < listItemCart.length; i++) {
        if (listItemCart[i].product.id == idProduct) {
            if (listItemCart[i].quantity <= 100 & listItemCart[i].quantity > 1) {
                listItemCart[i].quantity -= 1;
                // console.log("Mày đây rồi");
            } else if (listItemCart[i].quantity <= 1) {
                removeItemInCart(idProduct);
            }
        }
    }
    showCartPhoneList();
    saveData();
}
// END //



// Hàm common xóa toàn bộ sản phẩm
function removeCart(){
    listItemCart = [];
    showCartPhoneList();
    saveData;
}

// Clear sản phẩm ra khỏi giỏ hàng
const clearCart = () => {
    let isRemoveCart = confirm("Bạn chắc chắn muốn xóa toàn bộ sản phẩm trong giỏ hàng không?");
    if(isRemoveCart == true){
        removeCart();
    }
    saveData();
};
// END //



//Nút thanh toán
payNow = () => {
    Swal.fire({
        title: 'Payment',
        text: `
        Total amount to be paid: ${getELE("priceTotal").innerText}`,
        // Total amount to be paid: $${subTotal}`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Order Now',
    }).then(() => {
        if (listItemCart.length > 0) {
            Swal.fire({
                title: 'Have A Good Day!',
                text: 'Your order will be delivered to you in 3-5 working days',
                imageUrl: 'https://img.freepik.com/premium-vector/thank-you-hand-lettering-thank-you-with-decorative-graphic_136321-1421.jpg?w=2000',
                imageWidth: 400,
                imageHeight: 275,
                imageAlt: 'Custom image',
            })
            removeCart();
            // listItemCart = [];
            // showCartPhoneList();
            // saveData();
        }else{
            Swal.fire({
                title: 'ERROR',
                text: 'No Product In Cart!',
                imageUrl: 'https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132__340.png',
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: 'Custom image',
            })}
    })
}
// END //







