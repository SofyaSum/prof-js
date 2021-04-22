const API = 'https://raw.githubusercontent.com/SofyaSum/prof-js/main/responses'

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList{
    constructor(container = '.product-content'){
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => {
                 this.goods = [...data];
                 this.render()
            })
    } 
    
    // _fetchProducts(cb){
    //   getRequest(`${API}/catalogData.json`, (data) => {
    //     this.goods = JSON.parse(data);
    //     console.log(this.goods);
    //     cb();
    //   })
    // }

    _getProducts(){
      return fetch(`${API}/catalogData.json`)
          .then(result => result.json())
          .catch(error => {
              console.log(error);
          })
    }

    getSum() {
      // let sum = 0;
      // for (let product of this.goods){
      //   sum += product.price;
      // }
      // alert(`${sum} $`);
      return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    
    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend',productObj.render())
//            block.innerHTML += productObj.render();
        }
    }

}


class ProductItem{
	constructor(product){
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
		this.img = product.img;
		
	}
	
	render(){
		 return `<div class="product-box" data-id="${this.id}">
              <div class="hover-box">
                <button class="hover-btn"><img src="img/w_cart.png" alt="">Add to Cart</button>
              </div>
              <a href="single-page.html" class="product-link">
                <img src="img/${this.img}" alt="${this.title}">
                <div class="stars">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
                <p class="product-text">${this.title}</p> 
                <p class="price">$${this.price}.00</p>
              </a>
            </div>`
	}
}

class Cart{

  addGoods(){}

  removeGoods(){}

  render(){}
}

class ProductCart {

  render (){}
}

let list = new ProductsList();
list.render();
list.getSum();


