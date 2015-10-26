<template>
    <div id="dashboard">
        <div id="searchbar" class="clearfix">
            <div class="btn-toolbar pull-right">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for Manuscript..." v-model="docFilter">
                    <span class="input-group-btn">
                        <button class="btn btn-primary">
                            <i class="fa fa-fw fa-plus"></i>
                        </button>
                    </span>
                </div>
            </div>
        </div>

        <div id="manuscripts">
            <div v-for="doc in manuscripts | filterBy docFilter" :class="{ card: true, 'card-inverse' : doc.deleting,  'card-danger': doc.deleting }">
                <div v-if="!doc.deleting" class="card-block">
                    <h4 class="card-title">{{ doc.title }}</h4>
                    <p class="card-text">{{ doc.description }}</p>
                    <div class="updated">
                        <small class="text-muted">Last updated {{ doc.updated | fromNow }}</small>
                    </div>
                    <div class="controls btn-toolbar">
                        <button class="btn btn-sm btn-secondary-outline" @click="showSettings($index)">
                            <i class="fa fa-fw fa-gears"></i>
                        </button>
                        <button class="btn btn-sm btn-danger-outline" @click="maybeDelete(doc, true)">
                            <i class="fa fa-fw fa-trash-o"></i>
                        </button>
                    </div>
                </div>
                <div v-if="doc.deleting" class="card-block text-center">
                    <h4 class="card-title">Delete this manuscript?</h4>
                    <p class="card-text">"{{ doc.title }}"</p>
                    <div class="controls btn-toolbar">
                        <button class="btn btn-sm btn-secondary" @click="maybeDelete(doc, false)">
                            <i class="fa fa-fw fa-undo"></i>
                        </button>
                        <button class="btn btn-sm btn-warning" @click="deleteDoc($index)">
                            <i class="fa fa-fw fa-trash-o"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Settings Modals -->
            <modal width="800px" v-ref:settings v-for="doc in clone(manuscripts) | filterBy docFilter">
                <div class="modal-header" slot="header">
                    <h4 class="modal-title">
                        <i class="fa fa-fw fa-gears"></i> Settings for "{{ doc.$orig.title }}"
                    </h4>
                </div>
                <div class="modal-body" slot="body">
                    <form>
                        <fieldset class="form-group">
                            <label for="title"><b>Title</b></label>
                            <input type="text" class="form-control" id="title" placeholder="Enter Title..." v-model="doc.title">
                            <small class="text-muted">Don't stress over a title; you can change this as many times as you want.</small>
                        </fieldset>
                        <fieldset class="form-group">
                            <label for="desc"><b>Description</b></label>
                            <input type="text" class="form-control" id="desc" placeholder="Enter description..." v-model="doc.description">
                            <small class="text-muted">Keep it brief: 2 to 5 sentences at the most.</small>
                        </fieldset>
                    </form>
                </div>
                <div class="modal-footer" slot="footer">
                    <button type="button"
                            class="btn btn-primary"
                            @click="saveSettings($index, doc)">Save changes</button>
                    <button type="button"
                            class="btn btn-secondary"
                            @click="closeSettings($index)">Close</button>
                </div>
            </modal>
        </div>
    </div>
</template>

<style lang="sass" src="./dashboard.scss"></style>

<script type="text/babel" lang="es">
    import _ from 'lodash';
    //import vueboot from 'vueboot';

    export default {
        name: 'Dashboard',
        components: {
            modal: vueboot.modal
        },
        data: function()
        {
            return {
                docFilter: "",
                manuscripts: [
                    {
                        id: '1',
                        title: "My Test Story",
                        description: "A sample description would go here.",
                        deleting: false,
                        created: new Date('11-08-84'),
                        updated: new Date('2015-09-28T18:23:45.579Z')
                    },
                    {
                        id: '2',
                        title: "Other Stories",
                        description: "A sample description would go here.",
                        deleting: false,
                        created: new Date('9-18-14'),
                        updated: new Date('2-10-15')
                    },
                    {
                        id: '3',
                        title: "Alice im Wunderland",
                        description: "Es ist nicht pornografischen Inhalten. Ich schwöre.",
                        deleting: false,
                        created: new Date('3-21-15'),
                        updated: new Date('4-11-15')
                    },
                    {
                        id: '4',
                        title: "Me, You, Writing and Procrastination",
                        description: "An ongoing example of what not to do.",
                        deleting: false,
                        created: new Date('12-01-1992'),
                        updated: new Date('1-10-1993')
                    },
                    {
                        id: '5',
                        title: "Other Story 1",
                        description: "A sample description would go here.",
                        deleting: false,
                        created: new Date('9-18-14'),
                        updated: new Date('2-10-15')
                    },
                    {
                        id: '6',
                        title: "Other Story 2",
                        description: "A sample description would go here.",
                        deleting: false,
                        created: new Date('9-18-14'),
                        updated: new Date('2-10-15')
                    },
                    {
                        id: '7',
                        title: "Other Story 3",
                        description: "A sample description would go here.",
                        deleting: false,
                        created: new Date('9-18-14'),
                        updated: new Date('2-10-15')
                    }
                ]
            };
        },
        methods: {
            clone: function(list)
            {
                return _.map(list, (item) => {
                    var clone = _.clone(item);
                    clone.$orig = item;

                    return clone;
                });

            },
            maybeDelete: function(doc, value)
            {
                doc.deleting = value;
            },
            deleteDoc: function(index)
            {
                this.manuscripts.splice(index, 1);
            },
            showSettings: function(index)
            {
                this.$refs.settings[index].showModal();
            },
            saveSettings: function(index, doc)
            {
                doc.$orig.title = doc.title;
                doc.$orig.description = doc.description;

                //TODO: Save document!

                console.log('save!', doc);

                this.$refs.settings[index].hideModal();
            },
            closeSettings: function(index)
            {
                this.$refs.settings[index].hideModal();
            }
        }
    }
</script>