<template>
    <div>
        <p class="text-xl font-bold">{{person.Name}}</p>
        <p class="text-xl">{{person.City}}, {{person.Country}}</p>
    </div>
</template>

<script>
export default {
    props: ['person'],
};
</script>

