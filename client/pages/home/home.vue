<template>
    <h1>Qniform Home Page</h1>

    <p class="text-muted">{{ fullMsg }}</p>

    <!-- Test Tag -->
    <test></test>
</template>
<script type="text/babel" lang="es">
    import test from '../../components/test_tag/test.vue';

    export default {
        name: 'Home',
        data: () =>
        {
            return { msg: 'Hello' };
        },
        computed: {
            fullMsg: function()
            {
                var now = Date.now();
                return `${ this.msg } World (${ now })`;
            }
        },
        components: {
            test
        }
    }
</script>