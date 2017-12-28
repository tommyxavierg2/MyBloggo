<template>
    <div class="">
      <ul class="nav nav-tabs nav-justified" >
        <li v-for="tab in tabs"><a class="tabs" data-toggle="tab" :href="tab.ref">{{tab.name}}</a></li>
      </ul>

     <div class="tab-content"><slot></slot></div>
   </div>

</template>

<script>

  export default {
    data() {
      return {}
    },
    props: ['tabs', 'tabs_content']
  }
</script>
