<template>
    
    <div @click.stop="liked = !liked"  class="cursor-pointer pointer-events-auto">
        <svg :class="!liked ? 'stroke-black' : 'text-red-500 fill-current' " fill="none" stroke-linejoin="round" width="32" height="32" viewBox="0 0 25 23" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 22L10.8325 20.4951C4.91 15.145 1 11.6144 1 7.29428C1 3.76376 3.77725 1 7.325 1C9.326 1 11.2465 1.92698 12.5 3.3861C13.7535 1.92698 15.674 1 17.675 1C21.2227 1 24 3.76376 24 7.29428C24 11.6144 20.09 15.145 14.1675 20.4951L12.5 22Z" />
        </svg>
    </div>
</template>

<script>
import Heart from './Heart'
export default {
    components: {Heart},
    props: ['value'],
    computed: {
        liked: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    }
}
</script>