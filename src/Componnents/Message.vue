<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <section class="modal-card-body">
                <label class="label">{{ messageToDisplay }}</label>

            </section>
            <footer class="modal-card-foot">
                <button @click.prevent="close()" class="button is-danger">Close</button>
            </footer>


        </div>
    </div>
</template>

<script>
import mixin from '../mixins/DisplayMessageMixin.js'

export default {
    name: 'ActionMessage',
    mixins: [mixin],
    data() {
        return {
            messageToDisplay: ''
        }
    },
    props: {
        isActive: { type: Boolean, default: false, required: true }
    },
    methods: {
        close() {
      this.$emit('close-action');
    }
    }
}
</script>