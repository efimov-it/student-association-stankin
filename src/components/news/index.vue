<template>
    <div class="news-block_wrapper">
        <div class="news-block"
             v-if="news.length > 0">
            <NewsBlock v-for="(newsItem, index) in news"
                    :key="index"
                    :newsItem="newsItem" />
        </div>

        <div v-else>
            Публикации отсутствуют...<br />
        </div>
        
        <div class="news-pagination"
             v-if="pagination && pagesCount > 1">
            <button class="news-pagination_button"
                    v-if="curentPage > 1"
                    @click="loadPost({page: --curentPage})">&lt;</button>

            <button :class="'news-pagination_button' + (curentPage == n ? ' news-pagination_button__active' : '')"
                    v-for="(n, i) in pagesCount"
                    :key="i"
                    @click="loadPost({page: curentPage = n})">{{n}}</button>
            
            <button class="news-pagination_button"
                    v-if="curentPage < pagesCount"
                    @click="loadPost({page: ++curentPage})">&gt;</button>
        </div>
    </div>
</template>

<script>
import NewsBlock from '../news-block/';
import './news.scss';
export default {
    props: ['pagination'],
    components: {
        NewsBlock
    },
    data () {
        return {
            news: [],
            pagesCount: 1,
            curentPage: 1,
            categoryId: 1
        }
    },
    methods: {
        loadPost({perPage = (this.pagination ? 18 : 9), page = 1}) {
            global.sendRequest({
                url: 'wp/v2/posts?categories='+this.categoryId+'&per_page='+perPage+'&page='+page,
                resolve: (data, resp) => {
                    if (this.news.length == 0) {
                        const totalItemsCount = parseInt(resp.headers['x-wp-total']);
                        this.pagesCount = parseInt(totalItemsCount / 18) + 1;
                    }
                    
                    let tmpPosts = [];
                    data.forEach((post, index) => {
                        global.sendRequest({
                            url: post._links['wp:featuredmedia'][0].href,
                            resolve: (imgData) => {
                                tmpPosts.push({
                                    title: post.title.rendered,
                                    date: post.date,
                                    img: imgData.guid.rendered,
                                    link: '/news/'+post.id
                                });

                                if (index == data.length - 1) {
                    
                                    tmpPosts.sort((a, b) => {
                                        a = (new Date(a.date)).getTime();
                                        b = (new Date(b.date)).getTime()
                                        return a < b ?
                                            (a == b ? 0 : 1) :
                                            -1;
                                    });
                                    this.news = tmpPosts;
                                }
                            }
                        });
                    });
                }
            });
        }
    },

    created () {
        if (this.$route.path.indexOf('category') >= 0) {
            this.categoryId = this.$route.params.id;
        }
        this.loadPost({});
    }
}
</script>

<style lang="scss">
    .news-block {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
</style>