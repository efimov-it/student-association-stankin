<template>
    <nav class="menu_wrapper"
         v-if="state">
      <div :class="'menu_background' +
                   (shown ? ' menu_background__shown' : '')"
           @click="close" />

      <div :class="'menu_formWrapper' +
                   (shown ? ' menu_formWrapper__shown' : '')">
        <div class="menu_mainPage">
          <header class="menu_header">
            <h2 class="menu_headerTitle">
              Меню
            </h2>
          </header>
          <ScrollBar class="menu_content"
                     @ps-scroll-y="menuScrolling">

            <div :class="'menu_loading' + (Object.keys($store.getters.getMenuItems).length == 0 ? ' menu_loading__shown' : '')"
                ref="loading">
                <p class="menu_loading-text">Загрузка...</p>
                <div class="preloader" />
            </div>

            <div class="menu_mainItem"
                 v-for="(menuItem, index) in $store.getters.getMenuItems"
                 :key="index">
              <img class="menu_mainItem-Background-Image"
                  :src="menuItem.image"
                  :alt="menuItem.title" />
              <div class="menu_mainItem-Background"
                   v-if="menuItem.link == null"
                   @click="currentMenuItem = index">
                <h2 class="menu_mainItem-Title">{{menuItem.title}}</h2>
              </div>
              <router-link class="menu_mainItem-Background"
                           v-else
                           :to="menuItem.link"
                           @click.native="close">
                <h2 class="menu_mainItem-Title">{{menuItem.title}}</h2>
              </router-link>
            </div>

          </ScrollBar>
          <div class="menu_content-fade"
               :style="showScrollFade ? 'opacity: 1;' : ''" />
        </div>
        
        <div :class="'menu_subPage' + (currentMenuItem != null ? ' menu_subPage__shown' : '')">
          <div v-if="currentMenuItem != null">
            <header class="menu_header">
              <button type="button"
                      class="icon icon-arrow menu_back-button"
                      @click="currentMenuItem = null" />
              <h2 class="menu_headerTitle menu_headerTitle__sub-title">
                {{$store.getters.getMenuItems[currentMenuItem].title}}
              </h2>
            </header>
            <ScrollBar class="menu_content">
              <router-link v-for="(menuSubItem, index) in $store.getters.getMenuItems[currentMenuItem].childrens"
                           :key="index"
                           :to="menuSubItem.link"
                           :name="menuSubItem.title"
                           @click.native="close();
                                          $store.commit('setCurentCategory', (menuSubItem.link.indexOf('category') >= 0 ? menuSubItem.title : null))"
                           class="menu_sub-menu-link">
                {{menuSubItem.title}}
              </router-link>
            </ScrollBar>
          </div>
        </div>

        <footer class="menu_footer">
          <div class="menu_socialLinks"
               v-if="false">
            <a class="icon icon-telegram button_hoverEffect"
               href="https://t.me"
               target="_blank"
               name='Ассоциация выпускников МГТУ "Станкин" в Telegram'
               title='Ассоциация выпускников МГТУ "Станкин" в Telegram' />
               
            <a class="icon icon-facebook button_hoverEffect"
               href="https://facebook.com"
               target="_blank"
               name='Ассоциация выпускников МГТУ "Станкин" в Facebook'
               title='Ассоциация выпускников МГТУ "Станкин" в Facebook' />
               
            <a class="icon icon-vk button_hoverEffect"
               href="https://vk.com"
               target="_blank"
               name='Ассоциация выпускников МГТУ "Станкин" в Вконтакте'
               title='Ассоциация выпускников МГТУ "Станкин" в Вконтакте' />
               
            <a class="icon icon-youtube button_hoverEffect"
               href="https://youtube.com"
               target="_blank"
               name='Ассоциация выпускников МГТУ "Станкин" на YouTube'
               title='Ассоциация выпускников МГТУ "Станкин" на YouTube' />
          </div>

          <a class="link menu_siteLink"
              href="https://stankin.ru"
              target="_blank"
              name='Официальный сайт МГТУ "Станкин"'
              title='Перейти к официальному сайту МГТУ "Станкин"'>
            Официальный сайт МГТУ "Станкин"
          </a>

          <p class="copyRaights">
            © {{(new Date()).getFullYear()}}
          </p>
        </footer>

        <button type="button"
                class="menu_closeButton"
                title="Закрыть меню"
                @click="close" />
      </div>
    </nav>
</template>

<script>
import './menu.scss';
import ScrollBar from 'vue-custom-scrollbar';
export default {
    components: {
      ScrollBar
    },
    props: ['state'],
    data () {
        return {
            shown: false,
            lastState: false,
            showScrollFade: false,
            currentMenuItem: null
        }
    },
    methods: {
        close () {
            this.shown = false;
            this.currentMenuItem = null;
            setTimeout(()=>{
                this.$emit('close');
            }, 300)
        },
        menuScrolling (e) {
          this.showScrollFade = e.target.scrollTop > 0;
        }
    },
    created () {
        this.lastState = this.state;
    },
    updated () {
        if (this.state != this.lastState) {
          setTimeout(()=> {
            this.shown = this.state;
          }, 100);
        }
        this.lastState = this.state;
    }
}
</script>