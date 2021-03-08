<template>
  <div class="book-item">
    <router-link :to="{ name:'viewbook', params:{bookid: book.id}}">
    <a bkey=book.id>
      <template v-if="volumeInfo.imageLinks">
        <img :src="volumeInfo.imageLinks.thumbnail" :alt="volumeInfo.title" height="128">
      </template>
      <template v-else>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"
          :alt="volumeInfo.title"
          height="128"
        >
      </template>
      <h4 class="book-title ">{{ volumeInfo.title | truncate(28, '...')}}</h4>

      <a class="author">
        <span v-if="!volumeInfo.authors">No authors to display</span>
        <span v-else>
          <span v-for="(author, index) in volumeInfo.authors" :key="index">
              {{
              index + 1 !== volumeInfo.authors.length && index + 1 !== book.volumeInfo.authors.length-1 ? author + ', ' : index + 1 == book.volumeInfo.authors.length && index+1 !== 1 ? ' and ' + author : author
              }}
          </span>
        </span>
      </a>
    </a>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    }
  },
  data: () => ({
      
  }),
  computed: {
    volumeInfo(){
        return this.book.volumeInfo
    },
  },
  method: {
    
  }
}
</script>

<style scoped>
    ul {
    padding: 0;
    }

    ul li {
    display: inline-block;
    }

    ul li:first-child {
    list-style: none;
    }

    .book-item {
        text-align: start;
    }

    .book-title {
        font-size: 0.8rem;
        font-weight: 600;
        margin-top: 5px;
        color: black;
        align-items: flex-end;
    }

    .author {
        font-size: 0.70rem;
        color: black;
    }

</style>
