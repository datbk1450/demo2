let products = JSON.parse(localStorage.getItem('products')) || [];

// Hiển thị danh sách sản phẩm
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" width="50"></td>
            <td>${product.name}</td>
            <td>${formatPrice(product.price)}</td>
            <td>
                <button class="btn btn-edit" onclick="editProduct(${index})">Sửa</button>
                <button class="btn btn-delete" onclick="deleteProduct(${index})">Xóa</button>
                <button class="btn" onclick="viewDetails(${index})">Chi tiết</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

// Thêm/Sửa sản phẩm
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const productId = document.getElementById('productId').value;
    const product = {
        name: document.getElementById('productName').value,
        image: document.getElementById('productImage').value,
        price: parseInt(document.getElementById('productPrice').value),
        originalPrice: parseInt(document.getElementById('productOriginalPrice').value),
        specs: document.getElementById('productSpecs').value,
    };

    if (productId === '') {
        // Thêm mới
        products.push(product);
    } else {
        // Cập nhật
        products[parseInt(productId)] = product;
    }

    // Lưu vào localStorage
    localStorage.setItem('products', JSON.stringify(products));
    
    // Reset form và hiển thị lại danh sách
    this.reset();
    document.getElementById('productId').value = '';
    displayProducts();
});

// Sửa sản phẩm
function editProduct(index) {
    const product = products[index];
    document.getElementById('productId').value = index;
    document.getElementById('productName').value = product.name;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productOriginalPrice').value = product.originalPrice;
    document.getElementById('productSpecs').value = product.specs;
}

// Xóa sản phẩm
function deleteProduct(index) {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
    }
}

// Xem chi tiết sản phẩm
function viewDetails(index) {
    const product = products[index];
    alert(`
        Tên: ${product.name}
        Giá: ${formatPrice(product.price)}
        Giá gốc: ${formatPrice(product.originalPrice)}
        Thông số kỹ thuật:
        ${product.specs}
    `);
}

// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

// Khởi tạo hiển thị
displayProducts();