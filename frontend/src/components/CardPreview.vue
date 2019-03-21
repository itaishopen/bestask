<template>
    <div class="card-preview flex">
        <div class="title-card">{{card.title}}</div>
    </div>
</template>

<script>
export default {
    name: 'CardPreview',
    props: ['card'],
    created() { },
    data() {
        return {};
    },
    computed: {

    },
    methods: {},
    components: {}
};
</script>
<style>
.title-card{
    padding: 30px;
    width: 150px;
    background-color: rgb(255, 255, 255);
    border: 1px solid black;
    font-size: 22px;
    margin: 5px;
}
</style>
