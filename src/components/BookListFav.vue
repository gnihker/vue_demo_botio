<template>
  <div>
    <h2 class="favTitle">My Favorite</h2>
    <div class="book-list-fav gridFav">
      <BookItemFav v-for="book in bookshelf" :key="book.id" :book="book"/>
    </div>
  </div>
</template>

<script>
import BookItemFav from "./BookItemFav";

export default {
    data: () => ({
        bookshelf:undefined,
    }),
    mounted() {
        this.bookshelf = JSON.parse(localStorage.getItem('items'))
    },
    components: {
        BookItemFav
    }
};
</script>

<style>
  .favTitle {
    margin-left: 5%;
    font-size: 2rem;
  }

  .gridFav{
    margin: 1% 5%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(128px,256px));
    grid-gap: 0.5rem;
  }
</style>
