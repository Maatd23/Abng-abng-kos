<template>
  <div class="h-screen flex">
    <div class="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
      <div class="w-full px-8 md:px-32 lg:px-24">
        <form class="bg-white rounded-md shadow-2xl p-5" @submit.prevent="Register">
          <h1 class="text-gray-800 font-bold text-2xl mb-1">Sign Up!</h1>
          <p class="text-sm font-normal text-gray-600 mb-8">Enter your information to register</p>
          <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
            <input
              class="pl-2 w-full outline-none border-none"
              v-model="dataInput.name"
              type="name"
              placeholder="Full Name"
            />
          </div>
          <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
            <textarea
              v-model="dataInput.address"
              class="pl-2 w-full outline-none border-none"
              placeholder="Address"
            >
            </textarea>
          </div>
          <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
            <input
              v-model="dataInput.phoneNumber"
              class="pl-2 w-full outline-none border-none"
              type="handphone"
              placeholder="handphone"
            />
          </div>
          <div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
            <input
              v-model="dataInput.email"
              class="pl-2 w-full outline-none border-none"
              type="email"
              placeholder="Email Address"
            />
          </div>
          <div class="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl">
            <input
              v-model="dataInput.password"
              class="pl-2 w-full outline-none border-none"
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <button
            @click="setRole('customer')"
            type="submit"
            class="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
          >
            Customer
          </button>

          <div class="flex items-center justify-center">
            <div class="border-t border-gray-300 w-2/5"></div>
            <span class="text-gray-500 mx-4">or</span>
            <div class="border-t border-gray-300 w-2/5"></div>
          </div>
          <button
            @click="setRole('owner')"
            type="submit"
            class="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
          >
            Owner Kosan
          </button>
          <div class="flex justify-center mt-4">
            <a
              @click.prevent="this.$router.push('/login')"
              href="#"
              class="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >Already have an account</a
            >
          </div>
        </form>
      </div>
    </div>
    <div
      class="hidden lg:flex w-full lg:w-1/2 login_img_section bg-center bg bg-no-repeat justify-around items-center"
    >
      <div class="bg-black opacity-20 justify-end inset-0 z-0"></div>
      <div class="w-full mx-auto px-20 flex-col items-end justify-end space-y-6">
        <h1 class="text-white font-bold ml-96 text-4xl font-sans">Simple App</h1>
        <p class="text-white ml-96 mt-1">The simplest app to use</p>
        <div class="flex justify-end lg:justify-start ml-96 mt-4">
          <a
            href="#"
            @click.prevent="$router.push('/home')"
            class="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
            >Get Started</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useKosanStore } from '../stores/kosan'
export default {
  data() {
    return {
      dataInput: {
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
        password: ''
      },
      selectedRole: ''
    }
  },
  methods: {
    ...mapActions(useKosanStore, ['handleRegisterOwner', 'handleRegister']),
    Register() {
      console.log('masuk')
      if (this.selectedRole === 'owner') {
        this.handleRegisterOwner(this.dataInput)
      } else if (this.selectedRole === 'customer') {
        this.handleRegister(this.dataInput)
      }
    },
    setRole(role) {
      this.selectedRole = role
    }
  }
}
</script>

<style>
.login_img_section {
  background: linear-gradient(rgba(2, 2, 2, 0.7), rgba(0, 0, 0, 0.7)),
    url(https://images.unsplash.com/photo-1650825556125-060e52d40bd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
