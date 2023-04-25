<template>

  <div>
    <div class="box">
      <p :id="'title'" class="is-size-3 is-family-primary has-text-weight-bold">{{ Article.title }}</p>
      <p :id="'authorName'" class="">{{ AuthorName }}</p>
      <p :id="'date'">{{ calculateDate }}</p>
      <router-link :id="'redirectToArticle'" :to="{ name: 'SpesificArticle', params: { id: Article.id } }">
        <button :id="'articleRedirectButton'" class="button is-link">View</button>
      </router-link>
      <button :id="'edit'" @click="$emit('show-edit', Article.id)" class="button is-info">Edit</button>
      <button :id="'delete'" @click="deleteArticle(Article.id)" class="button is-danger">Delete</button>




    </div>
  </div>

</template>

<script>


export default {
  props: {
    'Article': { type: Object, required: true }

  },
  name: 'Articles',
  data() {
    return {
      AuthorName: '',
    }
  },
  methods: {

    async getAuthor() {
      const response = await this.$articles.getAuthors(this.Article.author)
      this.AuthorName = response.name
    },
    async deleteArticle(index) {
      if (confirm("Do you really want to delete?")) {
        try {
          await this.$articles.deleteArticle(index)
          this.$emit('delete-action', { actionType: 'delete', sucess: 'sucess' })
        }
        catch (err) {
          this.$emit('delete-action', { actionType: 'delete', sucess: 'failure' })
        }
      }

    }

  },
  computed: {
    calculateDate() {
      let DateCreated = new Date(this.Article.created_at)
      let DateUpdated = new Date(this.Article.updated_at)
      return DateCreated.getTime() < DateUpdated.getTime() ? DateUpdated.toLocaleString() : DateCreated.toLocaleString()
    }

  },
  created() {
    this.getAuthor()
  }

}

</script>