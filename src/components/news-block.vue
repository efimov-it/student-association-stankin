<template>
    <div class="news-block">
        <router-link :to="newsItem.link ? newsItem.link : '/'"
                     class="news-block_item"
                     v-for="(newsItem, index) in news"
                     :key="index">
            <img v-if="newsItem.img"
                 :src="newsItem.img"
                 :alt="newsItem.title"
                 class="news-block_itemImage" />
            <div v-else
                 :alt="newsItem.title"
                 class="news-block_itemImage" />
            <div class="news-block_itemDate">
                {{newsItem.date ? (new Date(newsItem.date)).toLocaleDateString() : '__.__.____'}}
            </div>
            <div class="news-block_itemText-wrapper">
                <h2 class="news-block_itemText">
                    {{newsItem.title}}
                </h2>
            </div>
        </router-link>
    </div>
</template>

<script>
import '../scss/news.scss';
export default {
    data () {
        return {
            news: [
                {
                    title: '',
                    date: '',
                    img: null,
                    link: false
                },
                {
                    title: '',
                    date: '',
                    img: null,
                    link: false
                },
                {
                    title: '',
                    date: '',
                    img: null,
                    link: false
                },
            ]
        }
    },
    methods: {
        loadPost() {
            global.sendRequest({
                url: 'wp/v2/posts?categories=1',
                resolve: resp => {
                    let tmpPosts = [];
                    resp.forEach(async (post, index) => {
                        await global.sendRequest({
                            url: post._links['wp:featuredmedia'][0].href,
                            resolve: (imgData) => {
                                tmpPosts.push({
                                    title: post.title.rendered,
                                    date: post.date,
                                    img: imgData.guid.rendered,
                                    link: '/news/'+post.id
                                });

                                if (index == resp.length - 1) {
                    
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
        this.loadPost();
    }
}
</script>