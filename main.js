// let index = 0;
// const leftbtntwo = document.querySelector('.fa-chevron-left-two')

// const rightbtntwo = document.querySelector('.fa-chevron-right-two')

// const imgNubertwo = document.querySelectorAll('.slider-product-one-content-items');

// rightbtntwo.addEventListener("click", function(){
//     index  = index + 1

//     if(index>imgNubertwo.length-1){
//         index = 0
//     }
//     document.querySelector('.slider-product-one-content-items-content').style.right = index * 100+"%"
// })

// leftbtntwo.addEventListener("click", function(){
//     index  = index - 1

//     if(index<=0){
//         index = imgNubertwo.length -1
//     }
//     document.querySelector('.slider-product-one-content-items-content').style.right = index * 100+"%"
// })
let index = 0;
const leftbtntwo = document.querySelector('.fa-chevron-left-two')
const rightbtntwo = document.querySelector('.fa-chevron-right-two')
const imgNubertwo = document.querySelectorAll('.slider-product-one-content-items');

// Tính số lượng slides cần trượt
const maxIndex = imgNubertwo.length - 1;

rightbtntwo.addEventListener("click", function(){
    index = index + 1
    if(index > maxIndex){
        index = 0
    }
    document.querySelector('.slider-product-one-content-items-content').style.transform = `translateX(-${index * 100}%)`
})

leftbtntwo.addEventListener("click", function(){
    index = index - 1
    if(index < 0){
        index = maxIndex
    }
    document.querySelector('.slider-product-one-content-items-content').style.transform = `translateX(-${index * 100}%)`
})


// lọc sản phẩm

document.getElementById('priceFilter').addEventListener('change', function() {
    const selectedRange = this.value;
    const products = document.querySelectorAll('.product-gallrery-one-content-product-items');
    
    products.forEach(product => {
        const priceText = product.querySelector('.product-gallrery-one-content-product-items-text li:nth-child(4)').textContent;
        const price = parseInt(priceText.replace(/\D/g, '')); // Chuyển giá thành số
        
        if (selectedRange === 'all') {
            product.style.display = 'block';
        } else {
            const [min, max] = selectedRange.split('-').map(Number);
            
            if (max) {
                // Khoảng giá có cả min và max
                if (price >= min && price <= max) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            } else {
                // Trên 15 triệu
                if (price >= min) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            }
        }
    });
});

// chi tiết sản phầm

// Thêm sự kiện click cho sản phẩm
document.querySelectorAll('.product-gallrery-one-content-product-items').forEach(item => {
    item.addEventListener('click', function() {
        showProductDetail(this);
    });
});

document.querySelectorAll('.slider-product-one-content-item').forEach(item => {
    item.addEventListener('click', function() {
        showProductDetail(this);
    });
});

function showProductDetail(productElement) {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close');

//     // Cập nhật hàm showProductDetail để xử lý cả slider và product gallery
// function showProductDetail(productElement) {
//     const modal = document.getElementById('productModal');
//     const closeBtn = document.querySelector('.close');
    
    // Lấy thông tin sản phẩm
    const productImage = productElement.querySelector('img').src;
    const productName = productElement.querySelector('li:first-child').textContent;
    const originalPrice = productElement.querySelector('li:nth-child(3) a').textContent;
    const currentPrice = productElement.querySelector('li:nth-child(4)').textContent;

    
    
    // Cập nhật nội dung modal
    document.getElementById('modalProductImage').src = productImage;
    document.getElementById('modalProductName').textContent = productName;
    document.getElementById('modalProductOriginalPrice').textContent = originalPrice;
    document.getElementById('modalProductPrice').textContent = currentPrice;

    // Hiển thị modal
    modal.style.display = "block";

    // Đóng modal khi click vào nút close
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Đóng modal khi click bên ngoài
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


// lọc sản phẩm 
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('#brandFilter button');
    const products = document.querySelectorAll('.product-gallrery-one-content-product-items');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const brand = this.getAttribute('data-brand');
            
            products.forEach(product => {
                // Lấy tên sản phẩm từ phần tử li đầu tiên
                const productName = product.querySelector('.product-gallrery-one-content-product-items-text li:first-child').textContent.toUpperCase();
                
                if (brand === 'ALL') {
                    product.style.display = '';
                } else {
                    // Kiểm tra xem tên sản phẩm có chứa tên thương hiệu không
                    if (productName.includes(brand)) {
                        product.style.display = '';
                    } else {
                        product.style.display = 'none';
                    }
                }
            });
        });
    });

    
});



// lọc sản phẩm theo giá + thương hiệu


document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('#brandFilter button');
    const priceFilter = document.getElementById('priceFilter');
    const products = document.querySelectorAll('.product-gallrery-one-content-product-items');

    // Hàm lọc sản phẩm
    function filterProducts() {
        const selectedBrand = document.querySelector('#brandFilter button.active').getAttribute('data-brand');
        const selectedPrice = priceFilter.value;

        products.forEach(product => {
            const productName = product.querySelector('.product-gallrery-one-content-product-items-text li:first-child').textContent.toUpperCase();
            const priceText = product.querySelector('.product-gallrery-one-content-product-items-text li:nth-child(4)').textContent;
            const price = parseInt(priceText.replace(/\D/g, ''));

            // Kiểm tra điều kiện thương hiệu
            let matchBrand = selectedBrand === 'ALL' || productName.includes(selectedBrand);

            // Kiểm tra điều kiện giá
            let matchPrice = true;
            if (selectedPrice !== 'all') {
                const [min, max] = selectedPrice.split('-').map(Number);
                if (max) {
                    matchPrice = price >= min && price <= max;
                } else {
                    matchPrice = price >= min;
                }
            }

            // Hiển thị sản phẩm nếu thỏa mãn cả hai điều kiện
            if (matchBrand && matchPrice) {
                product.style.display = '';
                product.classList.remove('hide');
            } else {
                product.style.display = 'none';
                product.classList.add('hide');
            }
        });
    }

    // Sự kiện click cho nút lọc thương hiệu
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterProducts();
        });
    });

    // Sự kiện thay đổi cho select giá
    priceFilter.addEventListener('change', filterProducts);

    // Kích hoạt lọc mặc định khi trang load
    filterProducts();
});