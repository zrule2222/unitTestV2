export default {
    data() {
        return {
            isModalVisible: false,
            showUpdateMessage: false,
            editIndex: 0,
            actionType: "",
        }
    },

    methods: {
        closeActionModal() {
            this.showUpdateMessage = false;
            if (this.showActionType == 'delete' && this.sucess == 'sucess') {
              this.getArticles(this.currentPage)
            }
            this.showActionType = ''
            this.sucess = ''
          },
    }
};