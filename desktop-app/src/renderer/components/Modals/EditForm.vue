<template>
    <form action="javascript:void(0);" title="Edit task">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Edit task
                    <b-icon pack="fa" icon="pencil" type="is-primary">
                    </b-icon>
                </p>
            </header>
            <section class="modal-card-body">
                <b-field label="Title">
                    <b-input type="text" v-model="newTitle" required>
                    </b-input>
                </b-field>

                <b-field label="Text">
                    <b-input type="textarea" v-model="newText" :placeholder="text" minlength="2" rows="20">
                    </b-input>
                </b-field>

                <b-field label="Tags">
                    <b-input type="text" v-model="newTags" :placeholder="tags">
                    </b-input>
                </b-field>

                <b-field label="Priority">
                    <b-input type="text" v-model="newPriority" :placeholder="priority.toString()">
                    </b-input>
                </b-field>

                <b-field label="Preview:">
                    <p id="text_preview" style="color: black !important;" v-html="newText.replace(/(?:\r\n|\r|\n)/g, '<br />')"></p>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button v-on:click="edit" class="button is-success">Edit</button>
            </footer>
        </div>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    props: ['title', 'text', 'tags', 'priority'],
    data: () => ({
        newTitle: 'aaaaa',
        newText: 'bbbbb',
        newTags: 'ccccc',
        newPriority: 'ddddd'
    }),

    methods: {
        edit: function (event) {



            var task_id;
            typeof this.$route.params.id !== "undefined" ? task_id = this.$route.params.id : task_id = 1;


            axios.put(`http://flaskbackend.herokuapp.com/tasks/` + task_id, {
                title: this.newTitle,
                text: this.newText.replace(/(?:\r\n|\r|\n)/g, '<br />'),
                tags: this.newTags.split(),
                priority: this.newPriority
            })
                .then(response => {
                    // JSON responses are automatically parsed.


                    this.$events.emit('testEvent');
                    this.$events.emit('refreshTask');
                    this.$toast.open({
                        message: 'Task edited correctly',
                        type: 'is-success'
                    })
                    this.$parent.close()

                })
                .catch(e => {
                    this.errors.push(e)
                })

        },


    },

    mounted() {

        this.newTitle = this.title;
        this.newText = this.text.replace(/<br\s*\/?>/gi, ' \n ');
        this.newTags = this.tags;
        this.newPriority = this.priority;

    }

}
</script>

<style scoped>
.modal-card {
    width: 640;
}

.text_preview {
    color: #000 !important;
}

#text_preview>>>h2 {
    font-size: 2.5em !important;
    font-weight: bold;
}

#text_preview>>>h3 {
    font-size: 2em !important;
    font-weight: bold;
}

#text_preview>>>h4 {
    font-size: 1.5em !important;
}
</style>