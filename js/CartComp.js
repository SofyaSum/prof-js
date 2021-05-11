Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          total: 0
      }
    },
    computed: {
        getSum(){
            for(let el of cartItems){
                total += this.el.quantity*this.el.price;
            }
            return total;
        }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartItems.find(el => el.id === product.id);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
    },
    mounted(){
         this.$parent.getJson(`${API + this.cartUrl}`)
             .then(data => {
                 for(let el of data.contents){
                     this.cartItems.push(el);
                 }
             });
    },
    template: `
          <div class="login-drop">
            <p class="empty-cart" v-if="!cartItems.length">Cart is empty</p>
            <cart-item 
                v-for="item of cartItems" 
                :key="item.id"
                :cart-item="item"
                @remove="remove">
            </cart-item>
            <div class="drop-box" v-if="total">
              <p>TOTAL</p>
              <p>{{total}}$</p>
            </div>
            <a href="checkout.html" class="login-btn">Checkout</a>
            <a class="login-btn" href="shopping-cart.html">Go to cart</a>
          </div>
`
});
Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
            <div class="login-drop-box">
              <img :src=cartItem.img :alt="cartItem.title">
              <div class="login-drop-text">
                <h3>{{cartItem.title}}</h3>
                <div class="stars">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i>
                </div>
                <p>{{cartItem.quantity}} x {{cartItem.price}}$</p>
              </div>
              <button class="delete" @click="$emit('remove', cartItem)"><i class="fas fa-times-circle"></i></button>
            </div>

    `
});

        // <div>
        //     <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
        //     <div class="cart-block" v-show="showCart">
        //         <p v-if="!cartItems.length">Cart is empty</p>
        //         <cart-item class="cart-item" 
        //         v-for="item of cartItems" 
        //         :key="item.id_product"
        //         :cart-item="item" 
        //         :img="imgCart"
        //         @remove="remove">
        //         </cart-item>
        //     </div>
        // </div>


                // <div class="cart-item">
                //     <div class="product-bio">
                //         <img :src="img" alt="Some image">
                //         <div class="product-desc">
                //             <p class="product-title">{{cartItem.product_name}}</p>
                //             <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                //             <p class="product-single-price">$ {{cartItem.price}} each</p>
                //         </div>
                //     </div>
                //     <div class="right-block">
                //         <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                //         <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                //     </div>
                // </div>