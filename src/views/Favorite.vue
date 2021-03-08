<template>
  <div class="favorite">
    <v-app>
      <v-main>
        <router-link to="/"><v-btn light color="white" class="back-fav"><v-icon left light>mdi-less-than</v-icon>Back</v-btn></router-link>
        <BookListFav/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import BookListFav from '@/components/BookListFav';

export default {
    name:"favorite",
    components: {
      BookListFav
    },
    methods: {
    },
}
</script>

<style scoped>
  .back-fav {
    margin: 3% 5%;
  }
</style>