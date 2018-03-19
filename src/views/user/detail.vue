<template>
  <div id="UserDetail">
      {{id}}
  </div>
</template>
<script>
export default {
  name: 'UserDetail',
  data() {
    return {
      id: '',
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.id = id;
  },
  methods:{

  },
}
</script>
<style></style>
