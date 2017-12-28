<template>
    <div class="hello">
        <h2>大埔河长制</h2>
        <ul>
            <li v-for="page in pages">
                <router-link :to="page.path">{{page.meta.title}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import router from '../router'

    export default {
        name: 'index',
        data() {
            return {
                pages: router.options.routes
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
