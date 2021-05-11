const API = 'https://raw.githubusercontent.com/SofyaSum/prof-js/main/responses';

const app = new Vue({
    el: '#app',
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
    }
})

