Vue.component('catalog', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: []
        }
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'igm');
            this.filtered = this.products.filter(el => regexp.test(el.title));
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        // this.$parent.getJson(`getProducts.json`)
        //     .then(data => {
        //         for(let el of data){
        //             this.products.push(el);
        //             this.filtered.push(el);
        //         }
        //     })
    },
    template: `
        <div class="product-content">
            <prod v-for="item of filtered" :key="item.id" :product="item"></prod>
        </div>
    `
});
Vue.component('prod', {
    props: ['product'],
    template: `
          <div class="product-box">
            <div class="hover-box">
              <button class="hover-btn"@click="$parent.$parent.$refs.cart.addProduct(product)"><img src="img/w_cart.png" alt="">Add to Cart</button>
            </div>
            <a href="single-page.html" class="product-link">
              <img :src=product.img :alt="product.title">
              <div class="stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <p class="product-text">{{product.title}}</p>
              <p class="price">{{product.price}} $</p>
            </a>
          </div>

    `
})