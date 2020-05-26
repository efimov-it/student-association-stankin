<template>
  <div id="app">
    <header class="header">
      <button type="button"
              class="menuButton"
              title="Главное меню"
              @click="menuState = !menuState" />

      <router-link class="logo"
                   to="/"
                   name="На главную">
        <img src="./assets/logo100.png"
             alt="Логотип" />
      </router-link>

      <a class="link header_link"
         href="https://stankin.ru"
         target="_blank"
         name='Официальный сайт МГТУ "Станкин"'
         title='Перейти к официальному сайту МГТУ "Станкин"'>
        Официальный сайт МГТУ "Станкин"
      </a>
    </header>

    <main class="main-container"
          ref="scrollingContent"
          @scroll="pageScroll">
      <transition name="fade">
        <router-view />
      </transition>
    </main>

    <div class="toTopButton"
         ref="scrollToTopButton"
         @click="scrollToTop">
      На верх
    </div>
    
    <Menu :state="menuState"
          @close="menuState = false" />
  </div>
</template>

<script>
import Menu from './components/menu';
export default {
  components: {
    Menu
  },
  data () {
    return {
      menuState: false
    }
  },

  methods: {
    pageScroll() {
      if (this.$refs.scrollingContent.scrollTop > 600)
      {
        this.$refs.scrollToTopButton.style.display = 'block';

        const timeout = setTimeout(() => {
          this.$refs.scrollToTopButton.style.opacity = 1;

          clearTimeout(timeout);
        }, 100);
      }
      else {
        this.$refs.scrollToTopButton.style.opacity = 0;
          
        const timeout = setTimeout(() => {
          this.$refs.scrollToTopButton.style.display = 'none';

          clearTimeout(timeout);
        }, 300);
      }
    },
    scrollToTop () {
      const timer = setInterval(()=>{
        if (this.$refs.scrollingContent.scrollTop > 20) {
          this.$refs.scrollingContent.scrollTop -= 20;
        }
        else {
          this.$refs.scrollingContent.scrollTop = 0;
          clearInterval(timer);

          this.$refs.scrollToTopButton.style.opacity = 0;
            
          const timeout = setTimeout(() => {
            this.$refs.scrollToTopButton.style.display = 'none';

            clearTimeout(timeout);
          }, 300);
        }
      }, 1);
    }
  }
}
</script>
