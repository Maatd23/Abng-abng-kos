<template>
  <nav
    id="navbar"
    class="sticky top-20 z-30 flex w-full flex-row justify-end bg-gray-100 px-4 sm:justify-between"
  >
    <div>
      <h1>home</h1>
    </div>
    <button
      id="btnSidebarToggler"
      type="button"
      class="py-4 text-2xl hover:text-gray-200 ml-auto"
    >
      <svg
        id="navClosed"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-8 w-8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <svg
        id="navOpen"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="hidden h-8 w-8"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </nav>
</template>

<script>
export default {}
</script>

<style></style>
