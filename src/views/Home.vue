<template>
  <div class="home">
    <v-app>
      <v-main>
        <div class="main-body">
          <v-row justify="end">
            <v-col md=2 align="end" class="fav-button" >
              <router-link to="/favorite"><v-btn dark color="#00BFA5"><v-icon left dark>mdi-heart</v-icon><a class="fav-button-content">My Favorite</a>
              </v-btn></router-link>
            </v-col>
          </v-row>
          <v-row>
            <form @submit.prevent="search" class="search-section">
              <input type="text" v-model="keyword" placeholder="Enter keywords..." class="input-search">
              <v-btn type="submit" value="Search" class="button-search"><v-icon light>mdi-magnify</v-icon></v-btn>
            </form>
          </v-row>
          <v-row align="start">
            <v-col md=auto class='mr-auto'>
              <v-btn light color="white" @click.stop="drawer = !drawer">
                <v-icon left light>mdi-filter</v-icon>filter
              </v-btn>
            </v-col>
              <v-col md=auto>
                <v-select :items="['relevance','newest']" label="sort by" v-model="orderBy" @change="search" solo></v-select>
              </v-col>
              <v-col md=auto>
                <v-btn-toggle v-model="toggle_exclusive" mandatory>
                  <v-btn @click="listActive = false, gridActive=true">
                    <v-icon left>mdi-microsoft</v-icon>Grid
                  </v-btn>
                  <v-btn @click="listActive = true, gridActive = false">
                    <v-icon left>mdi-format-list-bulleted</v-icon>List
                  </v-btn>
                </v-btn-toggle>
              </v-col>
          </v-row>
          <BookList :books="books" :class="{ listMode: listActive, gridMode: gridActive }"/>
        </div>
        <v-navigation-drawer v-model="drawer" absolute bottom temporary>
          <v-radio-group v-model="filterType" class="drawer-filter">
            <p>Filter</p>
            <v-radio key="partial" label="Partial" value="partial"></v-radio>
            <v-radio key="full" label="Full" value="full"></v-radio>
            <v-radio key="free-ebooks" label="Free eBooks" value="free-ebooks"></v-radio>
            <v-radio key="paid-ebooks" label="Paid eBooks" value="paid-ebooks"></v-radio>
            <v-radio key="ebooks" label="eBooks" value="ebooks"></v-radio>
          </v-radio-group>
          <v-radio-group v-model="printType" class="drawer-filter">
            <p>Print Type</p>
            <v-radio key="all" label="All" value="all"></v-radio>
            <v-radio key="books" label="Books" value="books"></v-radio>
            <v-radio key="magazines" label="Magazines" value="magazines"></v-radio>
          </v-radio-group>
          <div class="drawer-button">
            <template v-if="printType === undefined">
              <v-btn dark color="#00BFA5" type="submit" @click="searchFilter" class="drawer-filter">Apply</v-btn>
            </template>
            <template v-if="printType != undefined">
              <v-btn dark color="#00BFA5" type="submit" @click="searchFilterPrint" class="drawer-filter">Apply</v-btn>             
            </template>
            <v-btn light class="drawer-filter" @click="clearFilter">Clear</v-btn>
          </div>
        </v-navigation-drawer>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';
import BookList from '@/components/BookList';

export default {
  name: 'Home',
  components: {
    BookList
  },
  data: () => ({
    drawer: false,
    group: null,
    toggle_exclusive: undefined,
    filterType: undefined,
    printType: 'all',
    listActive: false,
    gridActive: true,
    books: [],
    keyword: '',
    orderBy: 'newest',
    maxResults: '27',
  }),
  watch: {
    group () {
      this.drawer = false
    },
  },
  mounted() {
    axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:&orderBy=${this.orderBy}&maxResults=${this.maxResults}`
    )
    .then(response => {
      this.books = response.data.items
    })
  },
  methods: {
    clearFilter(){
      this.filterType = undefined;
      this.printType = 'all';
      axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:&orderBy=${this.orderBy}&maxResults=${this.maxResults}`
      )
      .then(response => {
        this.books = response.data.items
      })
    },
    search() {
      this.books = []
      axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${this.keyword}&orderBy=${this.orderBy}&maxResults=${this.maxResults}`
      )
      .then(response => {
        this.books = response.data.items
      })
    },
    searchFilter() {
      this.books = []
      axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${this.keyword}&filter=${this.filterType}&maxResults=${this.maxResults}`
      )
      .then(response => {
        this.books = response.data.items
      })
    },
    searchFilterPrint() {
      this.books = []
      axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${this.keyword}&filter=${this.filterType}&printType=${this.printType}&maxResults=${this.maxResults}`
      )
      .then(response => {
        this.books = response.data.items
      })
    }
  },
  
}
</script>

<style>

  h1,h2,h3,h4,h5,h6,a,p {
    font-weight: normal;
    font-family: 'Source Sans Pro', sans-serif;
  }

  .main-body {
    margin: 4%;
  }

  .fav-button-content {
    color:white;
  }
  
  .fav-button {
    margin-bottom: 1%;
  }

  .gridMode{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(128px,1fr));
    grid-gap: 2rem;
  }

  .listMode{
    display: grid;
    grid-template-columns: repeat(auto-fit);
    grid-gap: 2rem;
  }

</style>

<style scoped>
  .fav-button {
    margin-bottom: 1%;
  }

  .drawer-filter {
    margin: 8%;
  }
  
  .drawer-button {
    display: flex;
    justify-content: center;
  }

  .fav-button-content {
    color:white;
  }

  .search-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 12px;
  }

  .input-search {
    background-color: #EFEFEF;
    height: 2.5rem;
    width: 100%;
    border-radius: 5px;
    margin-right: 10px;
    padding: 10px 10px;
  }

</style>