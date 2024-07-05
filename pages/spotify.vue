<template>
  <div>{{access_token}}

    <button @click.prevent="getToken">토큰발급</button>

    <button @click.prevent="search">검색테스트</button>

    <div class="col-md-6 mt-5 mx-auto">
      <div v-for="item in result" :key="item.id"
        class="h3 mb-3 font-weight-normal artist-item">
        <div class="left-content">        
          <div :style="`background-image: url(${item.images[0].url})`" class="artist-thumb">
          </div>
      </div>
        <div class="right-content">
          <div>{{ item.name }}</div>
        </div>

      </div>
    </div>

    
  </div>
</template>
<style scoped>
.flex-container {
  flex: auto
}
.artist-item {
  height: 200px;
  margin: 30px;
  background-color: black;
  color: white;
  box-shadow: inset;
}
.artist-item .left-content{
 float: left;
 width: 200px;
}

.artist-item .right-content{
 float: left;
 height: 100%;
 width: calc(100%-200px);
 /* width: 200px; */
}
.artist-item .artist-thumb {
  width: auto;
  height:200px;
  background-repeat: no-repeat;
  background-size: contain;
  border: 1px solid gray
}

</style>
<script>
import { getSpotifyToken, setSpotifyToken } from '~/util/user'
export default {
  name: 'HiBamm',
  layout: 'basic',
  data () {
    return {
      access_token: "",
      result: []
    }
  },

  mounted () {
    this.getToken();

    this.result = JSON.parse(localStorage.getItem("temp")) || [];
  },

  methods: {
    async getToken () {

      try {
        
        const token = getSpotifyToken();

        if(token) {
          this.access_token = token;

          return token;

        } else {
          const res = await this.$axios.$post("/api/token")
          setSpotifyToken(res.access_token, res.expires_in)
          this.access_token = res.access_token;

          return res.access_token;
        }

        
      } catch (e) {
        return ""
      }
      
    },

    async search () {
      if(!this.getToken()) {
        this.result = "토큰발급먼저하셈"
        return;
      }
      try {
        const config = {
          headers: {
            "Authorization": this.access_token
          }
        }
        const res = await this.$axios.$post("/api/search",{}, config)
        this.result = res.artists.items;
        window.result = res;

        localStorage.setItem("temp", JSON.stringify(this.result));
      } catch (e) {

      }
    }
  }
}
</script>

