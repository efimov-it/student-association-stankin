<template>
    <nav class="menu_wrapper"
         v-if="state">
      <div :class="'menu_background' +
                   (shown ? ' menu_background__shown' : '')" />

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
            <div class="menu_mainItem"
                 v-for="(menuItem, index) in menuItems"
                 :key="index">
              <img class="menu_mainItem-Background-Image"
                  src="../assets/img/main-page-banner.jpg"
                  :alt="menuItem.text" />
              <div class="menu_mainItem-Background"
                   v-if="menuItem.children"
                   @click="currentMenuItem = index">
                <h2 class="menu_mainItem-Title">{{menuItem.text}}</h2>
              </div>
              <router-link class="menu_mainItem-Background"
                           v-else
                           :to="menuItem.link"
                           @click.native="close">
                <h2 class="menu_mainItem-Title">{{menuItem.text}}</h2>
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
                {{menuItems[currentMenuItem].text}}
              </h2>
            </header>
            <ScrollBar class="menu_content">
              <router-link v-for="(menuSubItem, index) in menuItems[currentMenuItem].children"
                           :key="index"
                           :to="menuSubItem.link"
                           :name="menuSubItem.text"
                           @click.native="close"
                           class="menu_sub-menu-link">
                {{menuSubItem.text}}
              </router-link>
            </ScrollBar>
          </div>
        </div>

        <footer class="menu_footer">
          <div class="menu_socialLinks">
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
            currentMenuItem: null,
            
            menuItems : [
                {
                    text: 'Об ассоциации',
                    children: [
                        {
                            text: 'Структура Ассоциации',
                            link: '/structura_associacii'
                        },
                        {
                            text: 'Состав Попечительского Совета',
                            link: '/sostav_soveta'
                        },
                        {
                            text: 'Легендарные выпускники',
                            link: '/legendarnie_vipuskniki'
                        },
                        {
                            text: 'Преимущества Ассоциации',
                            link: '/preimushestva'
                        },
                        {
                            text: 'Программа Лояльности',
                            link: '/programma_loyalnosti'
                        },
                        {
                            text: 'Правовая информация',
                            link: '/pravovaya_informatsia'
                        },
                        {
                            text: 'Контакты',
                            link: '/kontakti'
                        }
                    ]
                },
                {
                    text: 'Новости и события',
                    children: [
                        {
                            text: 'Мероприятия и встречи',
                            link: '/meropriyatiya_i_vstrechi'
                        },
                        {
                            text: 'Поздравления с 90-летием Университета от выпускников',
                            link: '/pozdravlenia_universiteta'
                        },
                        {
                            text: 'Интервью с выпускниками',
                            link: '/interviu_s_vipusknikami'
                        },
                        {
                            text: 'Новости',
                            link: '/news'
                        }
                    ]
                },
                {
                    text: 'История университета',
                    children: [
                        {
                            text: 'Обращение Ректора МГТУ «СТАНКИН» Е.Г.Катаевой к студентам и выпускникам',
                            link: '/obraschenie_rectora'
                        },
                        {
                            text: 'Фильм об истории Университета',
                            link: '/history'
                        },
                        {
                            text: 'Тест «Хорошо ли ты знаешь историю Университета',
                            link: '/test'
                        }
                    ]
                },
                {
                    text: 'Рейтинг университета',
                    link: '/university-rating'
                }
            ]
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