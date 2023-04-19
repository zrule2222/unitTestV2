<template>
  <div>
    <div class="box has-background-warning is-size-1 is-family-primary has-text-centered">
      <h1>Post details page</h1>
    </div>
    <div class="container has-text-centered">
      <section class="section">
        <div class="content is-medium">
          <h1 class="title">{{ title }}</h1>
          <h2 class="subtitle">{{ author }}</h2>
          <p>{{ articleContent }}</p>
          <p>{{ date }}</p>
          <button @click="showModal(true)" class="button is-info">Edit</button>
          <button @click="deleteArticle($route.params.id)" class="button is-danger">Delete</button>
          <Modal v-if="isModalVisible" @close-after-action="closeModalAfterAction" @close="showModal(false)"
            :is-active="isModalVisible" :actionType="'edit'" :editIndex="parseInt(this.$route.params.id)"></Modal>
          <ActionMessage v-if="showUpdateMessage" :isActive="showUpdateMessage" :type="showActionType" :sucess="sucess"
            @close-action="closeActionModal()"></ActionMessage>
        </div>
      </section>
    </div>
  </div>

</template>

<script>
import modalMixin from '../mixins/ModalMixin.js'
import Modal from '../Componnents/modal.vue'
import ActionMessage from '../Componnents/Message.vue'
export default {
  name: 'articleView',
  mixins: [modalMixin],
  data() {
    return {
      title: '',
      author: '',
      articleContent: '',
      date: '',

      showUpdateMessage: false
    }
  },
  components: {
    Modal,
    ActionMessage
  },
  methods: {
    async getArticleData() {
      try {
        const response = await this.$articles.getArticles(this.$route.params.id)
        const createdAt = new Date(response.created_at)
        const updatedAt = new Date(response.updated_at)
        const response2 = await this.$articles.getAuthors(response.author)
        this.title = response.title
        this.author = response2.name
        this.articleContent = response.body
        this.date = createdAt.getTime() < updatedAt.getTime() ? updatedAt.toLocaleString() : createdAt.toLocaleString()
      }
      catch (err) {
        console.log(err)
      }
    },
    async deleteArticle(index) {
      if (confirm("Do you really want to delete?")) {
        try {
          await this.$articles.deleteArticle(index)
          this.closeModalAfterAction({ type: 'delete', sucess: 'sucess' })
        }
        catch (err) {
          this.closeModalAfterAction({ type: 'delete', sucess: 'failure' })
        }
      }
    },
    closeModalAfterAction(data) {
      this.isModalVisible = false;
      this.showActionType = data.type
      this.sucess = data.sucess
      this.showUpdateMessage = true
    },
    closeActionModal() {
      this.showUpdateMessage = false;
      if (this.showActionType == 'update' && this.sucess == 'sucess') {
        this.getArticleData()
      }
      else if (this.showActionType == 'delete' && this.sucess == 'sucess') {
        this.$router.push('/posts')
      }
      this.showActionType = ''
      this.sucess = ''
    }
  },

  created() {
    this.getArticleData()

  }
}
</script>