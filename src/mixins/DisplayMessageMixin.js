
export default {
  props: {

    type: String,
    sucess: String
  },
  methods: {
    setMessage() {
      this.messageToDisplay = `The ${this.type} action was a ${this.sucess}`
    }
  },
  created() {
    this.setMessage()
  }
};