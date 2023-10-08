<template>
    <div class="table">
        <div class="table-header">
            <div class="table-header-col table-header-aule">
                Aule
            </div>
            <div v-for="col in displayCols" :key="col.id" class="table-header-col">
                {{ formatTime(col.id) }}
            </div>
        </div>
        <div class="table-body">
            <div v-for="row in rows" :key="row.id" :id="row.id" class="table-row">
                <div class="table-row-col table-row-aula">
                    {{ row.descrizione }}
                </div>
            </div>
            <div class="tbody"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DivScheduler',
    props: {
        h_start: {
            type: Number,
            required: true
        },
        h_end: {
            type: Number,
            required: true
        },
        step: {
            type: Number,
            required: true
        },
        rows: {
            type: Array,
            required: true
        },
        events: {
            type: Array,
            required: true
        }
    },
    computed: {
        cols() {
            let cols = [];
            let hstart = this.h_start * 60;
            let hend = this.h_end * 60;
            for (let i = hstart; i <= hend; i+= this.step) {
                cols.push({
                    id: i,
                });
            }
            return cols;
        },
        displayCols() {
            return this.cols.filter(col => col.id % 60 === 0);
        }
    },
    methods: {
        formatTime(time) {
        // Apply the function here
        let hours = Math.floor(time / 60);
        let minutes = time % 60;
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        },
    },
};
</script>

<style>
.table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    overflow-x: auto;
}
.table-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
}
.table-body {
    overflow-y: auto;
}
.table-header-col {
    min-width: 75px;
}
.table-row-col {
    min-width: 75px;
}
.table-row-aula, .table-header-aule {
    width: 100px;
    background-color: blueviolet;
    position: static;
    left: 0;
    z-index: 1;
}
.tbody {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>