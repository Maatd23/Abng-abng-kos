<template>
  <!-- follow me on twitter @asad_codes -->
  <section class="sticky z-20 top-0 mx-auto">
    <!-- navbar -->
    <nav class="flex justify-between bg-gray-900 text-white w-screen">
      <div class="px-5 xl:px-12 py-6 flex w-full items-center">
        <a class="text-3xl font-bold font-heading" href="#" @click.prevent="$router.push('/')">
          <!-- <img class="h-9" src="logo.png" alt="logo"> -->
          <div
            id="main_container"
            class="relative grid place-content-center place-items-center gap-2 before:bg-gradient-to-t before:from-teal-500/70 before:via-fuchsia-600 before:to-transparent before:blur-xl before:filter"
          >
            <div class="flex items-center">
              <div>
                <h1 class="title text-lg font-black text-teal-500">Abang</h1>
              </div>
              <h2 class="cursive text-lg font-thin text-fuchsia-600">Kost</h2>
            </div>
          </div>
        </a>
        <!-- Nav Links -->
        <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">

        </ul>
        <!-- Header Icons -->
        <div class="hidden xl:flex items-center space-x-5 items-center">
          <!-- Sign In / Register      -->
          <a
            class="flex items-center hover:text-gray-200 cursor-pointer"
            @click="profile = !profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        </div>
      </div>
      <div
        class="fixed right-3 mt-20 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-gray-900 shadow-md"
        x-show="profileOpen"
        :class="{ hidden: !profile }"
        x-transition
      >
        <div class="flex items-center space-x-2 p-2">
          <img
            src="https://api.dicebear.com/6.x/big-smile/svg?seed=admin"
            alt="avatar"
            class="h-9 w-9 rounded-full"
          />
          <div class="font-medium cursor-default">
            {{ login ? email.split('@')[0] : 'haiii' }}
          </div>
        </div>

        <div class="flex flex-col space-y-3 p-2" v-if="login">
          <a href="#" @click.prevent="$router.push('/')" class="transition hover:text-blue-600">Home</a>
          <a v-if="role === 'owner'"
            @click.prevent="$router.push('/addKosan')"
            href="#"
            class="transition hover:text-blue-600"
            >Add Kosan</a
          >
        </div>

        <div class="p-2" v-if="login">
          <button
            class="flex items-center space-x-2 transition hover:text-blue-600"
            @click="handleLogout"
          >
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            <div>Log Out</div>
          </button>
        </div>
        <div class="p-2" v-if="!login">
          <button
            class="flex items-center space-x-2 transition hover:text-blue-600"
            @click="$router.push('/login')"
          >
            <i class="fa-solid fa-right-to-bracket"></i>
            <div>Log In</div>
          </button>
        </div>
      </div>
      <!-- Responsive navbar -->
      <a class="xl:hidden flex mr-6 items-center" href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 hover:text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span class="flex absolute -mt-5 ml-4">
          <span
            class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"
          ></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"> </span>
        </span>
      </a>
      <a class="navbar-burger self-center mr-12 xl:hidden" href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 hover:text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </a>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      profile: false,
      login: false,
      email: localStorage.email,
      role: localStorage.role
    }
  },
  methods: {
    handleLogout() {
      this.login = false
      localStorage.clear()
      this.$router.push('/')
    }
  },
  created() {
    if (localStorage.access_token) {
      this.login = true
    }
  }
}
</script>

<style></style>
