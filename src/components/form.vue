<template>

    <form @submit.prevent=""><slot></slot></form>

</template>

<script>
  export default {
    data() {
      return {}
    },
    props: ['action']
  }

</script>
