<template>
    <div class="news-list">
        <h1 class="content-title">{{$store.getters.getCurentCategory ? $store.getters.getCurentCategory : 'Новости ассоциации'}}</h1>
        <NewsBlocks :pagination="true"  />
    </div>
</template>

<script>
import NewsBlocks from '@/components/news/';
export default {
    components: {
        NewsBlocks
    }
}
</script>
