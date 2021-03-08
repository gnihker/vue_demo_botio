<template>
  <div class="viewBook">
    <v-app>
      <v-main class="bookInfo-body">
        <div class="bookInfo-top-button">
          <router-link to="/"><v-btn light color="white"><v-icon left light>mdi-less-than</v-icon>Back</v-btn></router-link>
          <router-link to="/favorite"><v-btn dark color="#00BFA5"><v-icon left dark>mdi-heart</v-icon><a class="fav-button-content">My Favorite</a></v-btn></router-link>
        </div>
        <div class="upper-part">
          <template v-if="pic">
            <img :src="pic" :alt="title" height="256">
          </template>
          <template v-else>
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png" :alt="title" height="256">
          </template>
          <div class="right-info">
            <h3 class="thisbook-title">{{title}}</h3>
            <div class="all-authors"><h4 class="thisbook-author" v-for="author in authors" :key="author" ><br/>{{author}}</h4></div>
            <div class="description-info">
              <h4 v-html="desc"></h4>
            </div>
            <div class="info-group">
              <h6 class="page-num">{{pageCount}} pages</h6>
              <span class="isbn-num"><h6 class="isbn-half1">ISBN_10</h6><h6 class="isbn-half2">{{isbn10}}</h6></span>
              <span class="isbn-num"><h6 class="isbn-half1">ISBN_13</h6><h6 class="isbn-half2">{{isbn13}}</h6></span>
              <v-btn dark small color="#00BFA5" class="add-fav" @click="addToFav"><v-icon left dark>mdi-heart</v-icon><a class="fav-button-content">Add to Favorite</a></v-btn>
              <v-btn dark small :href="volumeInfo.previewLink"><v-icon left dark>mdi-link-variant</v-icon><a class="fav-button-content">Preview</a></v-btn>
            </div>
          </div>
        </div>
        
      </v-main>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name:"viewBook",
    data: () => ({
      thisBook: null,
      authors: null,
      desc: null,
      pageCount: 0,
      title: '',
      pic: '',
      isbn10: '',
      isbn13: '',
    }),
    mounted() {
        axios.get(
          `https://www.googleapis.com/books/v1/volumes/${this.$route.params.bookid}`
        )
        .then(response => {
          this.thisBook = response.data
          this.authors = response.data.volumeInfo.authors
          this.desc = response.data.volumeInfo.description
          this.pageCount = response.data.volumeInfo.pageCount
          this.isbn10 = response.data.volumeInfo.industryIdentifiers[0].identifier
          this.isbn13 = response.data.volumeInfo.industryIdentifiers[1].identifier
          this.title = response.data.volumeInfo.title
          this.pic = response.data.volumeInfo.imageLinks.thumbnail
        })
    },
    computed: {
      volumeInfo(){
          return this.thisBook.volumeInfo
      },
    },
    methods: {
      addToFav() {
        var items = [];
          let item = {
            id: this.thisBook.id,
            name: this.title,
            authors: this.authors,
            picture: this.pic
          };
          if(JSON.parse(localStorage.getItem('items')) === null){
            items.push(item);
            localStorage.setItem("items",JSON.stringify(items));
          } else{
            const localItems = JSON.parse(localStorage.getItem('items'));
            localItems.map(data=>{
              if(item.id == data.id){
                return
              }else{
                items.push(data);
              }
            });
            items.push(item);
            localStorage.setItem('items',JSON.stringify(items));   
          }

      }
    }
}

</script>

<style scoped>
  .bookInfo-body {
    margin: 5%;
  }
  .bookInfo-top-button {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4%;
  }

  /* all info text */
  .right-info {
    display: flex;
    flex-direction: column;
    margin: 0 5%;
  }
  .all-authors {
    display: flex;
    flex-direction: row;
  }
  .upper-part {
    display: flex;
    flex-direction: row;
  }
  .thisbook-author {
    margin-right: 10px;
  }
  .thisbook-title {
    font-weight: bold;
  }
  .description-info {
    margin: 3% 0;
  }


  /* all info box */
  .info-group {
    display: flex;
    flex-direction: row;
    margin-top: 1%;
  }

  /* page count box */
  .page-num {
    display: flex;
    background-color: #3081d8;
    max-width: fit-content;
    padding: 3px 6px;
    border-radius: 4px;
    color: white;
    text-align: center;
    margin-right: 10px;
    align-items: center;
    height: 28px;
  }

  /* info box */
  .isbn-half1 {
    background-color: rgb(59, 54, 54);
    color: white;
    padding: 2px 8px;
    border-radius: 4px 0 0 4px;
    height: 28px;
    display: flex;
    align-items: center;
  }
  .isbn-half2 {
    background-color: rgb(236, 236, 236);
    padding: 2px 8px;
    border-radius: 0 4px 4px 0;
    height: 28px;
    display: flex;
    align-items: center;
  }
  .isbn-num {
    display: inline-flex;
    flex-direction: row;
    padding: 2px 4px;
    margin-right: 10px;
  }
  .add-fav {
    margin-right: 15px;
  }

</style>