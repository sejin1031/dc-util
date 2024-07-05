<template>
  <div>
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form @submit.prevent="login">
          <h2 class="h3 mb-3 font-weight-normal">로그인하기</h2>
          <div class="form-group">
            <label for="email">이메일주소</label>
            <input v-model="email" type="email"  class="form-control" placeholder="이메일주소" />
          </div>
          <div class="form-group">
            <label for="password">암호</label>
            <input v-model="password" type="password"  class="form-control" placeholder="암호" />
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="$router.push('/spotify')">로그인하기</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'basic',
  data:() => ({
    email: '',
    password: '',
  })
}
</script>