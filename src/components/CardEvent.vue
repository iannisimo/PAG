<template>
    <div class="event-card">
        <div class="course">
            {{ course }}
        </div>
        <div class="profs">
            <div v-for="prof in profs" :key="prof.id">
                {{ prof['cognome'] }} {{ prof['nome'][0] }}.
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardEvent',
    props: {
        course: {
            type: String,
            required: true
        },
        profs: {
            type: Array,
            required: true
        },
        width: {
            type: String,
            required: true
        },
    }, 
    default: {
        course: 'test',
        profs: ['test1', 'test2'],
        width: '100px'
    },
    mounted() {
        this.$el.style.width = this.width;
    }
};
</script>

<style>
.event-card {
    background-color: #cbcde6;
    border: 1px solid black;
    border-radius: 3px;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
    position: relative;
    z-index: 3;
}
.course {
    font-weight: bold;
    font-size: .8rem;
    margin-bottom: 0.5rem;
    background-color: #043659;
    color: white;

    display: block;/* or inline-block */
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
    max-height: 3.6em;
    line-height: 1.8em;
}
.profs {
    font-size: 0.8rem;
    font-style: italic;
    display: flex;
    flex-direction: column;
}
</style>