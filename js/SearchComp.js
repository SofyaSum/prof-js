Vue.component('search-form', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `
          <form action="#" class="search" @submit.prevent="$parent.$refs.products.filter(userSearch)">
            <input class="search-field" type="text" placeholder="Search for Item..." v-model="userSearch">
            <button class="search-btn" type="submit"><i class="fas fa-search"></i></button>
          </form>

    `
});

/* <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
        <input type="text" class="search-field" v-model="userSearch">
        <button class="btn-search" type="submit">
            <i class="fas fa-search"></i>
        </button>
    </form> */