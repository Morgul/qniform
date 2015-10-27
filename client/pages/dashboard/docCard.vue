<template>
    <!-- Document Card -->
    <div class="card" :class="{ 'card-inverse': deleting, 'card-danger': deleting }">
        <div v-if="!deleting" class="card-block">
            <h4 class="card-title">{{ doc.title }}</h4>
            <p class="card-text">{{ doc.description }}</p>
            <div class="updated">
                <small class="text-muted">Last updated {{ doc.updated | fromNow }}</small>
            </div>
            <div class="controls btn-toolbar">
                <button class="btn btn-sm btn-secondary-outline" @click="showSettings()">
                    <i class="fa fa-fw fa-gears"></i>
                </button>
                <button class="btn btn-sm btn-danger-outline" @click="maybeDelete(true)">
                    <i class="fa fa-fw fa-trash-o"></i>
                </button>
            </div>
        </div>
        <div v-if="deleting" class="card-block text-center">
            <h4 class="card-title">Delete this manuscript?</h4>
            <p class="card-text">"{{ doc.title }}"</p>
            <div class="controls btn-toolbar">
                <button class="btn btn-sm btn-secondary" @click="maybeDelete(false)">
                    <i class="fa fa-fw fa-undo"></i>
                </button>
                <button class="btn btn-sm btn-warning" @click="deleteDoc()">
                    <i class="fa fa-fw fa-trash-o"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Settings Modals -->
    <modal width="800px" v-ref:settings>
        <div class="modal-header" slot="header">
            <h4 class="modal-title">
                <i class="fa fa-fw fa-gears"></i> Settings for "{{ doc.title }}"
            </h4>
        </div>
        <div class="modal-body" slot="body">
            <form>
                <fieldset class="form-group">
                    <label for="title"><b>Title</b></label>
                    <input type="text" class="form-control" id="title" placeholder="Enter Title..." v-model="newDoc.title">
                    <small class="text-muted">Don't stress over a title; you can change this as many times as you want.</small>
                </fieldset>
                <fieldset class="form-group">
                    <label for="desc"><b>Description</b></label>
                    <textarea rows="3" class="form-control" id="desc" placeholder="Enter description..." v-model="newDoc.description"></textarea>
                    <small class="text-muted">Keep it brief: 2 to 5 sentences at the most.</small>
                </fieldset>
            </form>
        </div>
        <div class="modal-footer" slot="footer">
            <button type="button"
                    class="btn btn-primary"
                    @click="saveSettings()">Save changes</button>
            <button type="button"
                    class="btn btn-secondary"
                    @click="closeSettings()">Close</button>
        </div>
    </modal>
</template>

<script type="text/babel" lang="es">
    import _ from 'lodash';

    export default {
        props: ['doc'],
        components: {
            modal: vueboot.modal
        },
        data: function()
        {
            return {
                deleting: false
            }
        },
        computed: {
            newDoc: function()
            {
                return _.clone(this.doc);
            }
        },
        methods: {
            maybeDelete: function(value)
            {
                this.deleting = value;
            },
            deleteDoc: function()
            {
                //TODO: Instead, we should delete the document from the database.
                this.$parent.removeDoc(this.doc);
            },
            showSettings: function()
            {
                this.$refs.settings.showModal();
            },
            saveSettings: function()
            {
                this.doc.title = this.newDoc.title;
                this.doc.description = this.newDoc.description;

                //TODO: Save document!
                console.log('saved!', this.doc);

                this.$refs.settings.hideModal();
            },
            closeSettings: function()
            {
                this.$refs.settings.hideModal();
            }
        }
    };
</script>