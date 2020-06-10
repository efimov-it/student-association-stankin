<template>
    <div class="wp-wrapper">
        <div :class="'wp-page_loading' + (!loaded ? ' wp-page_loading__shown' : '')"
             ref="loading">
            <p class="wp-page_loading-text">Загрузка...</p>
            <div class="preloader" />
        </div>
        <div :class="'wp-page' + (loaded ? ' wp-page__shown' : '')">
            <h1 class="wp-page_title content-title">{{title}}</h1>
            <div class="wp-page_content" v-html="html" />
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            title: 'Заголовок',
            html: '',
            loaded: false
        }
    },
    methods: {
        loadPage() {
            global.sendRequest({
                url: 'wp/v2/pages/' + this.$route.params.id,
                resolve: resp => {
                    this.title = resp.title.rendered;
                    this.html = resp.content.rendered;
                    setTimeout( () => {
                        this.loaded = true;
                        setTimeout(()=>this.$refs.loading.style.display = 'none',300);
                    }, 300);
                }
            });
        }
    },
    created () {
        this.loadPage();
    }
}
</script>