<template>
    <div class="event-container">
        <Popper hover placement="top">
            <div class="event-card">
                <div class="course">
                    {{ course }}
                </div>
            </div>
            <template #content>
                <div class="popper">
                    <div class="popper__arrow" data-popper-arrow></div>
                    <div class="popper__content">
                        <div class="popper__content__course">
                            <span> {{ course }} </span>
                            <span v-if="partition !== ''"> ({{ partition }}) </span>
                        </div>
                        <div class="popper__content__hours">
                            Orario {{ date2hour(dataInizio) }} - {{ date2hour(dataFine) }}
                        </div>
                        <div class="popper__content__info">
                            <div class="popper__content__info__professors">
                                <span v-for="professor in professors" :key="professor">
                                    {{ professor }}
                                </span>
                            </div>
                            <div class="popper__content__info__courses">
                                <span v-for="room in courses" :key="room">
                                    {{ room }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Popper>
        </div>
</template>

<script>

import Popper from "vue3-popper";


export default {
    components: {
        Popper
    },
    name: 'CardEvent',
    props: {
        card_event: {
            type: Object,
            required: true
        },
        width: {
            type: String,
            required: true
        },
    }, 
    data() {
        return {
            course: this.card_event.nome,
            dataInizio: this.card_event.dataInizio,
            dataFine: this.card_event.dataFine,
        }
    },
    computed: {
        professors() {
            let professors = [];
            for (let i = 0; i < this.card_event.docenti.length; i++) {
                professors.push(this.card_event.docenti[i].nome[0] + '. ' + this.card_event.docenti[i].cognome);
            }
            return professors;
        },
        courses() {
            let courses = [];
            for (let i = 0; i < this.card_event.corsi.length; i++) {
                courses.push(this.card_event.corsi[i].extCode);
            }
            courses = courses.filter((v, i, a) => a.indexOf(v) === i);
            return courses;
        },
        partition() {
            const dd = this.card_event.evento.dettagliDidattici;
            if (dd.length === 0) return '';
            if ('partizione' in dd[0] === false) return '';
            if (dd[0].partizione === null) return '';
            return dd[0].partizione.descrizione;
        }
    },
    methods: {
        date2hour(date) {
            let d = new Date(date);
            let hour = d.getHours();
            if (hour < 10) {
                hour = '0' + hour;
            }
            let min = d.getMinutes();
            if (min < 10) {
                min = '0' + min;
            }
            return hour + ':' + min;
        }
    },
    mounted() {
        this.$el.style.width = this.width;
    }
};
</script>

<style>

:root {
    --popper-theme-background-color: #eeeeee;
    --popper-theme-background-color-hover: #eeeeee;
    --popper-theme-text-color: #2c3e50;
    --popper-theme-border-width: 0px;
    --popper-theme-border-style: solid;
    --popper-theme-border-radius: 5px;
    --popper-theme-padding: 5px;
    --popper-theme-box-shadow: 0 5px 30px -5px rgba(0, 0, 0, 0.25);
}

.popper__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-weight: normal;
    font-size: .9rem;
}

.popper__content__course {
    font-weight: bold;
}

.popper__content__info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
}

.popper__content__info__professors {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

.popper__content__info__courses {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
}

.event-container {
    position: relative;
    height: 100%;
}
.event-container .inline-block {
    width: 100%;
}
.event-container .inline-block .popper {
    max-width: 90vw;
}
.event-card {
    background-color: #043659;
    border: 1px solid black;
    border-radius: 3px;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 3;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    transition: all .1s ease-out;
}
.event-card:hover {
    background-color: #144669;

}
.course {
    font-weight: bold;
    font-size: .8rem;
    height: fit-content;
    margin-left: 5px;
    margin-right: 5px;
    color: white;

    display: block;/* or inline-block */
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
    max-height: 1.8em;
    line-height: 1.8em;
}
</style>