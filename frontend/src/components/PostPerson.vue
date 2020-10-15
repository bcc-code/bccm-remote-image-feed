<template>
    <div>
        <p class="font-4xl text-orange">{{person.Name}}</p>
        {{person.City}}, {{person.Country}}
    </div>
</template>

<script>
export default {
    props: ['person'],
};
</script>

