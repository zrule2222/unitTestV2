<template>
    <div>
        <ul>
            <li class="pagination-link" :class="currentPage == page ? 'is-current' : ''" v-for="page in pages"
                :key="page" @click="$emit('onPageChange', { page: page })">{{ page }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        pages: { type: Number, default: 1, required: true },
        currentPage: { type: Number, default: 1, required: true }
    }
}
</script>

