<template>
    <div>
        <p class="text-3xl font-bold text-orange-500">{{person.Name}}</p>
        <p class="text-xl">{{person.City}}, {{person.Country}}</p>
    </div>
</template>

<script>
export default {
    props: ['person'],
};
</script>

