<template>
    <h2 id="test">
        Welcome, <span class="friend">{{ friend }}</span>.
    </h2>
</template>

<style>
    #test .friend { color: #f90 }
</style>

<script type="text/babel" lang="es">
    export default {
        data: function()
        {
            return {
                friend: 'World'
            };
        }
    }
</script>