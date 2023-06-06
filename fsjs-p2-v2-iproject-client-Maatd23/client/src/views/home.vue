<template>
  <div>
    <div id="height" class="flex items-center justify-center">
      <div
        class="relative w-full block p-8 mr-6 overflow-hidden flex flex-nowrap text-center h-80 w-[1320px] items-center justify-center"
      >
        <swiper :navigation="true" :modules="modules" class="mySwiper">
          <swiper-slide
            ><img
              src="https://static.mamikos.com/uploads/cache/data/sanjunipero_header_desktop/2023-02-07/uVGsSZ5U-2048x682.jpg"
              alt=""
              srcset=""
          /></swiper-slide>
          <swiper-slide
            ><img
              src="https://static.mamikos.com/uploads/cache/data/event/2023-05-02/HN4WnmIj-540x720.jpg"
              alt=""
              srcset="" /></swiper-slide
          ><swiper-slide
            ><img
              src="https://static.mamikos.com/uploads/cache/data/event/2023-04-27/iCV4gvAY-540x720.jpg"
              alt=""
          /></swiper-slide>
          <swiper-slide
            ><img
              src="https://static.mamikos.com/uploads/cache/data/event/2023-05-02/jbhKlmUQ-540x720.jpg"
              alt=""
              srcset="" /></swiper-slide
          ><swiper-slide
            ><img
              src="https://static.mamikos.com/uploads/cache/data/event/2023-05-02/WfdCfGGM-540x720.jpg"
              alt=""
              srcset=""
          /></swiper-slide>
          <swiper-slide
            ><img
              src="https://static.mamikos.com/uploads/cache/data/event/2022-03-25/VTcV35Br-540x720.jpg"
              alt=""
              srcset="" /></swiper-slide
          ><swiper-slide
            ><img
              src="https://static.mamikos.com/uploads/cache/data/event/2023-03-27/SBu6uYXg-540x720.jpg"
              alt=""
              srcset=""
          /></swiper-slide>
          <swiper-slide
            ><img
              src="https://static.mamikos.com/uploads/cache/data/event/2023-03-01/pGvVNlMG-540x720.jpg"
              alt=""
              srcset="" /></swiper-slide
          ><swiper-slide
            ><img
              src="https://static.mamikos.com/uploads/cache/data/event/2023-04-27/jzMGCKzG-540x720.jpg"
              alt=""
              srcset=""
          /></swiper-slide>
        </swiper>
      </div>
    </div>
    <div>
      <div class="sticky top-20 z-20">
        <navbarfilter class="flex" />
        <sidebar class="mt-5 flex-1 z-1" :fasilitas="fasilitas" />
      </div>
      <div id="content" class="main-content grid grid-cols-4">
        <card v-for="kosan in kosans" :key="kosan.id" :kosan="kosan" />
      </div>
      <div class="max-w-2xl -mr-72 mt-3 mb-10 mx-auto content-end">
        <nav aria-label="Page navigation example">
          <ul class="inline-flex -space-x-px">
            <li class="cursor-pointer">
              <a
                @click.prevent="
                  page > 1
                    ? $router.push({ path: '/', query: { page: +page - 1, search } })
                    : $router.push({ path: '/', query: { page: 1, search } })
                "
                class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >Previous</a
              >
            </li>
            <li v-for="(n, i) in totalPage" :key="i">
              <a
                @click.prevent="$router.push({ path: '/', query: { page: n, search } })"
                :class="
                  page == n
                    ? 'bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white cursor-pointer'
                    : 'bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer'
                "
                >{{ n }}</a
              >
            </li>
            <li>
              <a
                @click.prevent="
                  page < totalPage
                    ? $router.push({ path: '/', query: { page: +page + 1, search } })
                    : $router.push({ path: '/', query: { page: page, search } })
                "
                class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/navigation'

// import required modules
import { Navigation } from 'swiper'
import Navbarfilter from '../components/navbarfilter.vue'
import Sidebar from '../components/sidebar.vue'
import Card from '../components/card.vue'
import { mapActions, mapWritableState } from 'pinia'
import { useKosanStore } from '../stores/kosan'

export default {
  components: {
    Swiper,
    SwiperSlide,
    Sidebar,
    Navbarfilter,
    Card
  },
  Navbarfilteretup() {
    return {
      modules: [Navigation]
    }
  },
  setup() {
    return {
      modules: [Navigation]
    }
  },
  mounted() {
    document.addEventListener('DOMContentLoaded', () => {
      const navbar = document.getElementById('navbar')
      const height = document.getElementById('height')
      const sidebar = document.getElementById('sidebar')
      const btnSidebarToggler = document.getElementById('btnSidebarToggler')
      const navClosed = document.getElementById('navClosed')
      const navOpen = document.getElementById('navOpen')
      const content = document.getElementById('content')

      btnSidebarToggler.addEventListener('click', (e) => {
        e.preventDefault()
        sidebar.classList.toggle('show')
        navClosed.classList.toggle('hidden')
        navOpen.classList.toggle('hidden')
        content.classList.toggle('translate')
      })

      sidebar.style.top = parseInt(navbar.clientHeight) + 150 + 'px'
      console.log(sidebar.style.top)
    })
  },
  computed: {
    ...mapWritableState(useKosanStore, ['kosans', 'fasilitas', 'totalPage', 'page'])
  },
  methods: {
    ...mapActions(useKosanStore, ['fecthKosan', 'fetchFasilitas'])
  },
  watch: {
    '$route.query'() {
      this.page = this.$route.query.page
      this.search = this.$route.query.search
      this.fecthKosan()
    }
  },
  created() {
    this.fecthKosan()
    this.fetchFasilitas()
  }
}
</script>

<style>
#app {
  height: 100%;
}
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
