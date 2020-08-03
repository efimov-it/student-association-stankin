<template>
    <router-link :to="newsItem.link ? newsItem.link : '/'"
                    class="news-block_item">
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
</template>

<script>
import './news-block.scss'
export default {
    props: ['newsItem']
}
</script>