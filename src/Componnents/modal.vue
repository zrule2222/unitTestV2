<template>

  <div>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">

          <p v-if="this.actionType != 'edit'" class="modal-card-title">Add Article</p>
          <p v-if="this.actionType == 'edit'" class="modal-card-title">Edit Article</p>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input class="input" :class="badTitle ? 'is-danger' : ''" v-model="title"
                type="text" placeholder="Title">
              <p v-show="badTitle" class="help is-danger">Tittle is empty</p>
            </div>
          </div>
          <div class="field">
            <label class="label">Author</label>
            <div class="control">
              <div class="select" :class="badAuthor ? 'is-danger' : ''">
                <select v-model="author" :disabled="this.actionType == 'edit' ? true : false">
                  <option value="" disabled selected>Select author</option>
                  <option v-for="author in Authors" :key="author.id" :value="author.id">{{ author.name }}</option>
                </select>
                <p v-show="badAuthor" class="help is-danger">Author not selected</p>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Content</label>
            <div class="control">
              <textarea :class="badContent ? 'is-danger' : ''" v-model="content"
                class="textarea" placeholder="Content area"></textarea>
              <p v-show="badContent" class="help is-danger">Content is empty</p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="doAction" class="button is-success">Save changes</button>
          <button @click.prevent="close()" class="button is-danger">Close</button>
        </footer>


      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      Authors: [],
      title: "",
      content: "",
      author: '',
      badTitle: false,
      badContent: false,
      badAuthor: false,
    }
  },
  props: {
    actionType: { type: String, required: true },
    editIndex: { type: Number },
    isActive: { type: Boolean, default: false, required: true }
  },
  methods: {
    closeAfterAction(type, sucess) {
      this.$emit('close-after-action', { type: type, sucess: sucess });
    },
    async getAuthors() {
      this.Authors = await this.$articles.getAuthors('')
    },
    validateForm() {
      if (!this.title) {
        this.badTitle = true
        return false
      }
      else {
        this.badTitle = false
      }
      if (!this.author) {
        this.badAuthor = true
        return false
      }
      else {
        this.badAuthor = false
      }
      if (!this.content) {
        this.badContent = true
        return false
      }
      else {
        this.badContent = false
      }
      return true
    },
    async setInitialEditDAta() {
      if (this.actionType == 'edit') {
        const response = await this.$articles.getArticles(this.editIndex)
        this.author = response.author
        this.title = response.title
        this.content = response.body

      }
    },
    async doAction() {
      if(this.actionType == 'edit'){
        if (!this.validateForm()) {
        return
      }
        try {
          await this.$articles.updateArticle(this.editIndex, this.title, this.content)
          this.closeAfterAction('update', 'sucess')
        }
        catch (err) {
          this.closeAfterAction('update', 'failure')
        }
      }
    
    else{
      if (!this.validateForm()) {
        return
      }
      let article = {
        title: this.title,
        body: this.content,
        author: this.author,
        //created_at: new Date().toLocaleString(),
        //updated_at: new Date().toLocaleString()
      }
      try {
        await this.$articles.postArticle(article)
        this.closeAfterAction('create', 'sucess')
      }
      catch (err) {
        this.closeAfterAction('create', 'failure')
      }
    }

    },
    close() {
      this.$emit('close');
    }
  },

  created() {
    this.getAuthors()
    this.setInitialEditDAta()

  }
}
</script>