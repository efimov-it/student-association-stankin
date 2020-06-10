<template>
    <div class="wp-wrapper">
        <div :class="'wp-page_loading' + (!loaded ? ' wp-page_loading__shown' : '')"
             ref="loading">
            <p class="wp-page_loading-text">Загрузка...</p>
            <div class="preloader" />
        </div>
        <div :class="'wp-page wp-page__news' + (loaded ? ' wp-page__shown' : '')">
            <h1 class="wp-page_title content-title">{{title}}</h1>
            <p class="wp-page_date">{{date}}</p>
            <div class="wp-page_content" v-html="html" />
            <p @click="hasHistory()
                    ? $router.go(-1) 
                    : $router.push('/')"
                    class="link link__back"
                    type="button">
                    Назад
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            title: '',
            html: '',
            date: '',
            loaded: false
        }
    },
    methods: {
        hasHistory () {
            return window.history.length > 2;
        },
        loadPost() {
            global.sendRequest({
                url: 'wp/v2/posts/' + this.$route.params.id,
                resolve: resp => {
                    this.html = resp.content.rendered;
                    this.title = resp.title.rendered;
                    this.date = (new Date(resp.date)).toLocaleString();
                    setTimeout( () => {
                        this.loaded = true;
                        setTimeout(()=>this.$refs.loading.style.display = 'none',300);
                    }, 300);
                }
            });
        }
    },

    created () {
        this.loadPost();
    }
}
</script>