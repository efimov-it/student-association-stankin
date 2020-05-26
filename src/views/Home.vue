<template>
  <div class="home">
    <div class="home_topContainer"
         @mousemove="particlesMoving">
      <div class="home_content">
        <h2 class="content-title">
          АССОЦИАЦИЯ ВЫПУСКНИКОВ МГТУ «СТАНКИН»
        </h2>

        <p class="home_contentText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nulla id elit et enim pharetra sodales. Donec vitae efficitur arcu.
          In pharetra consectetur erat et faucibus. Suspendisse ut lorem
          eleifend, volutpat nisi vel, eleifend enim. Duis sed nibh nisl.
          Ut vehicula elit vitae enim aliquet, at tristique leo rhoncus.
          Morbi viverra erat sit amet neque aliquet, sit amet consectetur
          est cursus. Maecenas bibendum purus at sodales maximus.
        </p>

        <router-link to="/join"
                     class="button__banner"
                     title='Подать заявку на вступление в ассоциацию выпускников МГТУ "Станкин"'>
          Вступить в ассоциацию
        </router-link>
      </div>

      <div class="home_banner">
        <div class="home_bannerParticle"
             ref="particle_1"
             X="150"
             Y="-75" />
        <div class="home_bannerParticle"
             ref="particle_2"
             X="450"
             Y="-50" />
        <div class="home_bannerParticle"
             ref="particle_3"
             X="550"
             Y="200" />
        <div class="home_bannerParticle"
             ref="particle_4"
             X="50"
             Y="350" />

        <img class="home_bannerImage"
             src="../assets/img/main-page-banner.jpg"
             alt="Баннер" />

        <div class="home_bannerParticle"
             ref="particle_5"
             X="250"
             Y="450" />
        <div class="home_bannerParticle"
             ref="particle_6"
             X="300"
             Y="420" />
        <div class="home_bannerParticle"
             ref="particle_7"
             X="520"
             Y="375" />
      </div>

      <div class="home_scroll-down" />
    </div>

    <h2 class="content-title home_newsHeader">Новости и события</h2>
    <News />
  </div>
</template>

<script>
import '../scss/home.scss'

import News from '../components/news-block';
export default {
  components: {
    News
  },
  data () {
    return {
      lastMouseX: null,
      lastMouseY: null
    }
  },
  methods: {
    particlesMoving (e) {
      const X = e ? e.x : null;
      const Y = e ? e.y : null;

      if (X && window.innerWidth >= 1000) {
        Object.keys(this.$refs).forEach((key, i) => {
          const current = this.$refs[key];

          const dX = (X / window.innerWidth * 30) * (1 + i / 6);
          const dY = (Y / window.innerHeight * 30) * (1 + i / 6);
          
          current.style.transform = 'translate('+(parseInt(current.getAttribute('X')) - dX)+'px, '+(parseInt(current.getAttribute('Y')) - dY)+'px)';
        });
      }
      else {
        Object.keys(this.$refs).forEach(key => {
          const current = this.$refs[key];
          current.style.transform = 'translate('+current.getAttribute('X')+'px, '+current.getAttribute('Y')+'px)';
        });
      }
    }
  },

  created () {
    this.$nextTick( function () {
      this.particlesMoving();
    });
  }
}
</script>