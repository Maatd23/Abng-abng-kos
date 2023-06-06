<template>
  <body class="antialiased font-sans">
    <div class="max-w-6xl">
      <div class="flex justify-start">
        <div class="max-w-sm w-full sm:w-full lg:w-full py-6 px-3">
          <div class="bg-white shadow-xl rounded-lg overflow-hidden">
            <div
              class="bg-cover bg-center h-56 p-4"
              :style="`background-image: url(${kosan.imgUrl})`"
            >
              <div v-if="heart === false" class="flex justify-end">
                <svg
                  class="h-6 w-6 text-white hover:text-red-500 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"
                  ></path>
                </svg>
                <svg
                  v-if="heart === true"
                  class="h-6 w-6 text-red-500 fill-current"
                  fill="red"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="p-4">
              <p class="uppercase tracking-wide text-sm font-bold text-gray-700">
                {{ kosan.name }}
              </p>
              <p class="text-3xl text-gray-900">{{ formatCurency }}</p>
              <p class="text-gray-700">{{ kosan.address }}</p>
            </div>
            <div class="flex p-4 border-t border-gray-300 text-gray-700">
              <div class="flex-1 inline-flex items-center">
                <svg
                  class="h-6 w-6 text-gray-600 fill-current mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M0 16L3 5V1a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4l3 11v5a1 1 0 0 1-1 1v2h-1v-2H2v2H1v-2a1 1 0 0 1-1-1v-5zM19 5h1V1H4v4h1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1zm0 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V6h-2v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6H3.76L1.04 16h21.92L20.24 6H19zM1 17v4h22v-4H1zM6 4v4h4V4H6zm8 0v4h4V4h-4z"
                  ></path>
                </svg>
                <p>
                  <span class="text-gray-900 font-bold">{{ kosan.rooms }}</span> Bedrooms
                </p>
              </div>
            </div>
            <div class="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
              <div class="text-xs uppercase font-bold text-gray-600 tracking-wide">See Details</div>
              <div class="flex items-center pt-2">
                <button
                  @click.prevent="detail(kosan.id)"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { mapActions } from 'pinia'
import { useKosanStore } from '../stores/kosan'
export default {
  props: ['kosan'],
  data() {
    return {
      heart: false
    }
  },
  computed: {
    formatCurency() {
      return this.kosan.price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
    }
  },
  methods: {
    ...mapActions(useKosanStore, ['oneKosan']),
    detail(id) {
      this.oneKosan(id)
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style></style>
