<template>
  <div class="book-item-fav">
    <router-link :to="{ name:'viewbook', params:{bookid: book.id}}">
    <a bkey=book.id class="book-item" >
      <img :src="book.picture" height="256">
      <h4 class="book-name">{{book.name| truncate(24, '...')}}</h4>
      <a>
        <span v-if="!book.authors">No authors to display</span>
        <span v-else class="authors">
        <h4 v-for="(author, index) in book.authors" :key="index" class="author">{{author}} </h4>
        </span>
      </a>
    </a>
    </router-link>
    <v-btn color="#DF4165" dark @click="removeFav" class="remove-button">Remove</v-btn>
  </div>
</template>

<script>
//import axios from 'axios';

export default {
    props: {
        book: {
            type: Object,
            required: true,
        }
    },
    data: () => ({
        authors: null,
        title: '',
        pic: '',
    }),
    methods: {
      removeFav() {
        let items = [];
        const all = JSON.parse(localStorage.getItem('items'));
        all.map(data=>{
          if(data.id != this.book.id){
            items.push(data);
          }
        })
        localStorage.setItem('items',JSON.stringify(items));  
        window.location.reload()
      }
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

    .book-item-fav {
      display: inline;
    }
    
    .book-item {
        text-align: start;
    }

    .book-name {
        margin-top: 5px;
        color: black;
        align-items: flex-end;
        font-weight: bold;
    }

    .authors{
        display: flex;
        flex-direction: row;
        font-size: 14px;
        color: black;
    }

    .author{
      margin-right: 7px;
    }

    .remove-button {
      margin-top: 10%;
    }

</style>
