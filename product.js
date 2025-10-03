const urlData = new URLSearchParams(window.location.search)

let name = urlData.get('name')
let id = urlData.get("id")

function getSingleProduct() {
  fetch(`https://dummyjson.com/products/${id}`).then((response) => response.json()).then((result) => showProduct(result))
}

getSingleProduct()

function showProduct(result) {
  const { title, description, thumbnail, price } = result
  let cardElementContainer = document.getElementById('container')
  cardElementContainer.innerHTML = `<div class="container py-5">
      <div class="row">
        <!-- Product Image -->
        <div class="col-md-5">
          <div class="card shadow-sm">
            <img src='${thumbnail}'
                 class="card-img-top p-3" alt="Essence Mascara">
          </div>
        </div>
  
        <!-- Product Info -->
        <div class="col-md-7">
          <h2 class="fw-bold">${title}</h2>
          <p class="text-muted">Category: <span class="badge bg-primary">Beauty</span></p>
          <p class="lead">${description}</p>
          
          <h4 class="text-success">Price: ${price}
            <small class="text-danger text-decoration-line-through">$11.15</small>
            <span class="badge bg-danger">10% OFF</span>
          </h4>
          
          <p><strong>Stock:</strong> 99 (In Stock)</p>
          <p><strong>Brand:</strong> Essence</p>
          <p><strong>SKU:</strong> BEA-ESS-ESS-001</p>
          <p><strong>Warranty:</strong> 1 week warranty</p>
          <p><strong>Shipping:</strong> Ships in 3-5 business days</p>
          <p><strong>Return Policy:</strong> No return policy</p>
          <p><strong>Minimum Order Quantity:</strong> 48</p>
          
          <button class="btn btn-success btn-lg mt-2">Add to Cart</button>
        </div>
      </div>
  
      <!-- Reviews Section -->
      <div class="row mt-5">
        <div class="col-12">
          <h3 class="mb-3">Customer Reviews</h3>
          
          <div class="list-group">
            <div class="list-group-item">
              <strong>Eleanor Collins</strong> ⭐⭐⭐ <br>
              <small class="text-muted">Would not recommend!</small>
            </div>
            <div class="list-group-item">
              <strong>Lucas Gordon</strong> ⭐⭐⭐⭐ <br>
              <small class="text-muted">Very satisfied!</small>
            </div>
            <div class="list-group-item">
              <strong>Eleanor Collins</strong> ⭐⭐⭐⭐⭐ <br>
              <small class="text-muted">Highly impressed!</small>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Meta Information -->
      <div class="row mt-5">
        <div class="col-md-6">
          <h4>Product Details</h4>
          <ul>
            <li><strong>Weight:</strong> 4g</li>
            <li><strong>Dimensions:</strong> 15.14 x 13.08 x 22.99 cm</li>
            <li><strong>Barcode:</strong> 5784719087687</li>
          </ul>
        </div>
        <div class="col-md-6 text-center">
          <h4>Scan QR Code</h4>
          <img src="https://cdn.dummyjson.com/public/qr-code.png" alt="QR Code" class="img-fluid w-50">
        </div>
      </div>
    </div>`

}
