<template>
  <div id="app">
    <header class="header">
      <button type="button"
              class="menuButton"
              title="Главное меню"
              @click="menuState = !menuState" />

      <router-link class="logo"
                   to="/"
                   name="На главную"
                   title="На главную">
        <div :class="'a-logo' + ($store.getters.getSiteDataReadyState ? ' a-logo_loaded' : '')"
             v-if="showAnimatedLogo">
          <div class="a-logo_wrapper">
            <div class="a-logo_organisation">
              Ассоциация<br />выпускников
            </div>
          </div>

          <div class="a-logo_separator-wrapper">
            <div class="a-logo_separator a-logo_separator-a" />
            <div class="a-logo_separator a-logo_separator-b" />
          </div>
          
          <div class="a-logo_wrapper">
            <img class="a-logo_university"
                 src="./assets/a-logo150.png"
                 alt="Логотип" />
          </div>
        </div>
        <img src="./assets/logo100.png"
             alt="Логотип"
             v-else />
      </router-link>

      <a class="link header_link"
         href="https://stankin.ru"
         target="_blank"
         name='Официальный сайт МГТУ "Станкин"'
         title='Перейти к официальному сайту МГТУ "Станкин"'>
        Официальный сайт МГТУ "Станкин"
      </a>
    </header>

    <main :class="'main-container' + ($store.getters.getSiteDataReadyState ? '' : ' main-container__hidden')"
          ref="scrollingContent"
          @scroll="pageScroll">
      <transition name="fade">
        <router-view class="main-content" :key="$route.path" />
      </transition>
    </main>

    <div :class="'wp-page_loading' + (!$store.getters.getSiteDataReadyState ? ' wp-page_loading__shown' : '')"
          ref="loading"
          v-if="loadingShown">
        <p class="wp-page_loading-text">Загрузка...</p>
        <div class="preloader" />
    </div>

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
import './scss/animated-logo.scss';
import Menu from './components/menu/';
export default {
  components: {
    Menu
  },
  data () {
    return {
      loadingShown: true,
      menuState: false,
      lastUrl: window.location.href,
      showAnimatedLogo: true
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
  },
  updated () {
    if (window.location.href != this.lastUrl){
      this.scrollToTop();
      this.lastUrl = window.location.href;
    }

    if (this.$store.getters.getSiteDataReadyState) {
      setTimeout(()=>{
        this.loadingShown = false;
      }, 1000);
    }
  },

  beforeCreate () {
    this.$store.dispatch('getMenuItems');
    this.$store.dispatch('loadSiteData');
  }
}
</script>
