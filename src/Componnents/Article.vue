<template>

  <div>
    <div class="box">
      <p class="is-size-3 is-family-primary has-text-weight-bold">{{ Article.title }}</p>
      <p class="">{{ AuthorName }}</p>
      <p>{{ calculateDate }}</p>
      <router-link :to="{ name: 'SpesificArticle', params: { id: Article.id } }">
        <button class="button is-link">View</button>
      </router-link>
      <button @click="$emit('show-edit', Article.id)" class="button is-info">Edit</button>
      <button @click="deleteArticle(Article.id)" class="button is-danger">Delete</button>




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