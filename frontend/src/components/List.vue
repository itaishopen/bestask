<template>
    <section class="list">
        {{list.title}}
        <ul class="list-cards">
            <li v-for="card in list.cards" :key="card._id">
                <card-preview :card="card"></card-preview>
            </li>
        </ul>
        <button>add card</button>
    </section>
</template>


<script>
import CardPreview from "@/components/CardPreview.vue";
export default {
    name: "list",
    props: ['list'],
    data() {
        return {};
    },
    components: {
        CardPreview
    },
    computed: {

    },
    created() {
        // console.log(this.list);
    }
};
</script>

<style>
.list-cards {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>
