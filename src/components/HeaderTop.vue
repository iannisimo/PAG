<template>
    <header>
        <h1>{{ display_title }}</h1>
        <nav>
            <ul>
                <datepicker v-model="picked"></datepicker>
                <li v-for="link in links" :key="link.id">
                    <a :href="link.url">{{ link.label }}</a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import datepicker from 'vue3-datepicker'

export default {
    name: 'HeaderTop',
    components: {
        datepicker
    },
    props: {
        title: {
            type: String,
            required: true
        },
        titleShort: {
            type: String,
            required: true
        },
        links: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            picked: null,
            display_title: this.title
        }
    },
    created() {
        // Change title
        let vw = window.innerWidth
        if (vw < 767) {
            this.display_title = this.titleShort;
        } else {
            this.display_title = this.title;
        }
        // Get date from url
        const urlParams = new URLSearchParams(window.location.search);
        const date = urlParams.get('date');
        if (date) {
            this.picked = new Date(date);
        } else {
            this.picked = new Date();
        }
    },
    watch: {
        picked(a, b) {
            if (a == null || b == null) {
                return;
            }
            if (a !== b) {
                // Reload page with new date
                window.location.href = `?date=${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
            }
        }
    }
};
</script>

<style>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #043659;
    color: #fff;
    top: 0;
    margin: 0;
}
h1 {
    margin: 0;
    font-size: 2rem;
}
nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}
nav li {
    margin-left: 1rem;
}
nav a {
    color: #fff;
    text-decoration: none;
}
</style>