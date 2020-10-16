<template>
    <div class="pb-2">
        <p class="text-2xl font-bold text-orange-500">{{person.Name}}</p>
        <p >{{person.City}}, {{person.Country}}</p>
    </div>
</template>

<script>
export default {
    props: ['person'],
};
</script>

