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
                        {{ row.descrizione }}
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
    default: {
        h_start: 8,
        h_end: 20,
        step: 30,
        rows: ["A1", "A2", "A3", "A4", "A5", "A6", "A7"],
        events: [{
            nome: "test",
            data_inizio: "2023-10-05T12:00:00.000Z",
            data_fine: "2023-10-05T14:00:00.000Z",
            aule: ["A1"]
        }]
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
                        course: event.nome,
                        profs: event.docenti.slice(0,2),
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
    overflow-x: auto;
}
thead {
    position: sticky;
    top: 0;
}
tr {
    height: 100px;
    border-bottom: 1px solid #000;
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