<template>
  <div>
    <div class="box has-background-primary is-size-1 is-family-primary is-justify-content-center has-text-centered">
      <h1>Post page</h1>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <button @click="showModal(true)" class="button is-primary mb-5 mr-4">Add article</button>
      <div class="control">
        <input v-model="searchedValue" @input="getArticles(1)" class="input" type="text" placeholder="Look for Article">
      </div>
      <button class="button" @click="logout">
    <span class="icon is-small">
      <i class="fa-solid fa-right-from-bracket"></i>
    </span>
  </button>
    </div>
    <Modal v-if="isModalVisible" @close-after-action="closeModalAfterAction" @close="closeModal()"
      :is-active="isModalVisible" :actionType="this.actionType" :editIndex="this.editIndex"></Modal>
    <ActionMessage v-if="showUpdateMessage" :isActive="showUpdateMessage" :type="showActionType" :sucess="sucess"
      @close-action="closeActionModal()"></ActionMessage>
    <div class="field has-addons">
    </div>


    <div v-if="!noArticles" class="tile is-ancestor">

      <div v-for="article in articles" :key="article.id" class="tile has-text-centered is-child is-parent">

        <Articles @delete-action="setDeleteActionMessage" @show-edit="showEditModal" :Article="article"> </Articles>
      </div>
    </div>
    <div v-else class="notification is-danger has-text-centered">
      <p>Currently there are no articles</p>
    </div>
    <div class="columns is-centered">
    <Pagination @onPageChange="handlePageChange" :currentPage="currentPage" :pages="pagesCount"></Pagination>
</div>
  </div>
</template>

<script>
import modalMixin from '../mixins/ModalMixin.js'
import MessageMixing from '../mixins/MessageMixin.js'
import Articles from '../Componnents/Article.vue'
import Pagination from '../Componnents/pagination.vue'
import Modal from '../Componnents/modal.vue'
import ActionMessage from '../Componnents/Message.vue'
export default {
  name: 'postPage',
  mixins: [modalMixin,MessageMixing],
  components: {
    Articles,
    Pagination,
    Modal,
    ActionMessage,
  },
  data() {
    return {
      articles: [],
      pagesCount: 0,
      limit: 2,
      noArticles: false,
      searchedValue: "",
      currentPage: 1,
    }
  },
  methods: {
    async getArticles(page) {
      let totalPages = page < 0 || !page ? 1 : page
      try{
      const response = await this.$articles.getArticlesByPage(totalPages, this.limit, this.searchedValue)
      const response2 = await this.$articles.getArticlesByPageCount(totalPages, this.limit, this.searchedValue)
      this.pagesCount = response2.data.pagecount
      if (response2.data.pagecount > 0) {
        this.articles = response.data
        this.noArticles = false
      }
      else {
        this.noArticles = true
      }
    }
    catch(err){
      this.noArticles = true
    }

    },
    async logout(){
      try{
   await this.$articles.logout()
      }
      catch(error){
        this.showActionType = "Logout"
      this.sucess = "failure"
      this.showUpdateMessage = true
      }
    },
    handlePageChange(data) {
      this.currentPage = data.page
      this.getArticles(data.page)
    },
    setDeleteActionMessage(data) {
      this.showActionType = data.actionType
      this.sucess = data.sucess
      this.showUpdateMessage = true
    },


  },
  created() {
    
    this.getArticles(1)

  }
}
</script>
