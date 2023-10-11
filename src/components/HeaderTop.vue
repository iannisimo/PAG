<template>
    <div class="header">
        <div class="header__left">
            <span>{{ display_title }}</span>
        </div>
        <div class="header__center">
            <VueDatePicker v-model="picked" 
                    :enable-time-picker="false" 
                    :format="'dd/MM/yyyy'" 
                    :clearable="false" 
                    :auto-apply="true" 
                >
                <template #trigger>
                    <img src='/icons/fa-calendar.svg' class="nav-ico"/>
                </template>
            </VueDatePicker>
        </div>
        <div class="header__right">
            <a href="https://unipi.prod.up.cineca.it/calendarioPubblico/linkCalendarioId=63223a029f080a0aab032afc">
                <img src='/icons/fa-uni.svg' class="nav-ico"/>
            </a>
            <a href="https://github.com/iannisimo/pag">
                <img src='/icons/fa-github.svg' class="nav-ico"/>
            </a>
        </div>
    </div>
</template>

<style>
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #043659;
    color: #fff;
    z-index: 20;
    height: 6vh;
}
.header > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-inline: 2vmin;
    align-items: center;
    gap: 2vmin;
}
.header__left {
    font-size: 3vh;
    font-weight: bold;
}
.nav-ico {
    width: auto;
    height: 3vh;
    /* I dunno why the fudge i cant download them in white */
    filter: invert(100%);
}
</style>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

/* import font awesome icon component */


export default {
    name: 'HeaderTop',
    components: {
        VueDatePicker,
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
            display_title: this.title,
        }
    },
    mounted() {
        // Change title
        this.handleResize();
        // Get date from url
        const urlParams = new URLSearchParams(window.location.search);
        const date = urlParams.get('date');
        if (date) {
            this.picked = new Date(date);
        } else {
            this.picked = new Date();
        }
        window.addEventListener('resize', this.handleResize);
    },
    unmounted() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            let vw = window.innerWidth
            if (vw < 767) {
                this.display_title = this.titleShort;
            } else {
                this.display_title = this.title;
            }
        }
    },
    watch: {
        picked(a, b) {
            if (a == null || b == null) {
                return;
            }
            if (a - b !== 0) {
                // Reload page with new date
                window.location.href = `?date=${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
            }
        }
    }
};
</script>