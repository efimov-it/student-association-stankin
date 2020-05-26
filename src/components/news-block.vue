<template>
    <div class="news-block">
        <router-link :to="newsItem.link"
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
                {{(new Date(newsItem.date)).toLocaleDateString()}}
            </div>
            <h2 class="news-block_itemText">
                {{newsItem.title}}
            </h2>
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
                    title: 'Заголовок новости Заголовок новости Заголовок новости Заголовок новости Заголовок новости Заголовок новости Заголовок новости Заголовок новости',
                    date: '2020-05-01',
                    img: null,
                    link: '/news/1'
                },
                {
                    title: 'Заголовок новости',
                    date: '2020-05-01',
                    img: null,
                    link: '/news/1'
                },
                {
                    title: 'Заголовок новости',
                    date: '2020-05-01',
                    img: null,
                    link: '/news/1'
                },
                {
                    title: 'Заголовок новости',
                    date: '2020-05-01',
                    img: null,
                    link: '/news/1'
                },
                {
                    title: 'Заголовок новости',
                    date: '2020-05-01',
                    img: null,
                    link: '/news/1'
                },
                {
                    title: 'Заголовок новости',
                    date: '2020-05-01',
                    img: null,
                    link: '/news/1'
                },
                {
                    title: 'Заголовок новости',
                    date: '2020-05-01',
                    img: null,
                    link: '/news/1'
                },
                {
                    title: 'Заголовок новости',
                    date: '2020-05-01',
                    img: null,
                    link: '/news/1'
                },
                {
                    title: 'Заголовок новости',
                    date: '2020-05-01',
                    img: null,
                    link: '/news/1'
                }
            ]
        }
    }
}
</script>