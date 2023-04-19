export default {
    data() {
        return {
            isModalVisible: false,
           
            showActionType: '',
            sucess: '',
            editIndex: 0,
            actionType: "",
            
        }
    },

    methods: {
        showModal(bool) {
            this.isModalVisible = bool;
        },
        toggleModalVisibility() {
            this.isModalVisible != this.isModalVisible;
        },
        showEditModal(index) {
            this.editIndex = index
            this.actionType = 'edit'
            this.isModalVisible = true;
          },
          closeModal() {
            this.isModalVisible = false;
            this.editIndex = -1
            this.actionType = ''
          },
          closeModalAfterAction(data) {
            this.isModalVisible = false;
            this.getArticles(1)
            this.currentPage = 1
            this.editIndex = -1
            this.showActionType = data.type
            this.sucess = data.sucess
            this.showUpdateMessage = true
          }
    }
};