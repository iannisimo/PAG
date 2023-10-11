<template>
    <div class="table-container">
        <table>
            <colgroup>
                <col class="col-aule">
                <col v-for="col in cols" :key="col.id">
            </colgroup>
            <thead>
                <tr id="header">
                    <th>
                        Aule
                    </th>
                    <th v-for="col in displayCols" :key="col.id" :colspan="60 / step">
                        {{ formatTime(col.id) }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" :key="row.codice" :id="row.codice">
                    <th>
                        <!-- Also capitalize the first letter -->
                        {{ capitalizeFirst(row.descrizione.replace('Fib ', '')) }}
                    </th>
                    <th v-for="col in cols" :key="col.id" :id="row.codice + '-' + col.id"></th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import CardEvent from './CardEvent.vue';
import renderComponent from '@/renderComponent';

export default {
    name: 'SchedulerTable',
    children: {
        CardEvent
    },
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
        },
    },
    mounted() {
        for (let i = 0; i < this.events.length; i++) {
            let event = this.events[i];
            let start = new Date(event.dataInizio).getHours() * 60 + new Date(event.dataInizio).getMinutes();
            let end = new Date(event.dataFine).getHours() * 60 + new Date(event.dataFine).getMinutes();
            let duration = end - start;
            let colspan = duration / this.step;
            let auleevento = event.aule;
            let col = start;
            col = Math.round(col / this.step) * this.step;
            for (let j = 0; j < auleevento.length; j++) {
                let row = auleevento[j].codice;
                let cell = document.getElementById(row + '-' + col);

                renderComponent({
                    el: cell,
                    component: CardEvent,
                    props: {
                        // course: event.nome,
                        // profs: event.docenti.slice(0,2),
                        card_event: event,
                        width: `${colspan*77}px`
                    }
                })
            }
        }
        let now = new Date();
        let nowCol = Math.round((now.getHours() * 60 + now.getMinutes()) / this.step) * this.step;
        let cells = document.querySelectorAll(`[id$="${nowCol}"]`);
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            cell.classList.add('now');
        }
    },
    methods: {
        formatTime(time) {
            let hours = Math.floor(time / 60);
            let minutes = time % 60;
            return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        },
        capitalizeFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
    },
};
</script>

<style>
table {
    border-collapse: collapse;
}
.table-container {
    width: 100%;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
}
tr {
    border-bottom: 1px solid #000;
    height: 2em;
}
table thead tr {
    height: 2em;
}
th {
    width: 75px;
    max-width: 75px;
    min-width: 75px;
    border-right: 1px dashed #000;
}
.now {
    border-left: 2px dashed red;
    z-index: 6;
}
table tr th:first-child, .col-aule {
    width: 100px;
    background-color: #eeeeee;
    position: sticky;
    left: 0;
    z-index: 5;
}
</style>