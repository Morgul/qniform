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
                        <button class="btn btn-sm btn-secondary-outline" data-toggle="modal" data-target="#docSettings">
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
        </div>

        <!-- Modal -->
        <div class="modal fade" id="docSettings" tabindex="-1" role="dialog" aria-labelledby="docSettings" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel"><i class="fa fa-gears"></i> Document Settings</h4>
                    </div>
                    <div class="modal-body">
                        Fucking hell.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
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
                        title: "My Test Story",
                        description: "A sample description would go here.",
                        deleting: false,
                        created: new Date('11-08-84'),
                        updated: new Date('2015-09-28T18:23:45.579Z')
                    },
                    {
                        title: "Other Stories",
                        description: "A sample description would go here.",
                        deleting: false,
                        created: new Date('9-18-14'),
                        updated: new Date('2-10-15')
                    },
                    {
                        title: "Alice im Wunderland",
                        description: "Es ist nicht pornografischen Inhalten. Ich schwöre.",
                        deleting: false,
                        created: new Date('3-21-15'),
                        updated: new Date('4-11-15')
                    },
                    {
                        title: "Me, You, Writing and Procrastination",
                        description: "An ongoing example of what not to do.",
                        deleting: false,
                        created: new Date('12-01-1992'),
                        updated: new Date('1-10-1993')
                    },
                    {
                        title: "Other Story 1",
                        description: "A sample description would go here.",
                        deleting: false,
                        created: new Date('9-18-14'),
                        updated: new Date('2-10-15')
                    },
                    {
                        title: "Other Story 2",
                        description: "A sample description would go here.",
                        deleting: false,
                        created: new Date('9-18-14'),
                        updated: new Date('2-10-15')
                    },
                    {
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
            maybeDelete: function(doc, value)
            {
                doc.deleting = value;
            },

            deleteDoc: function(index)
            {
                this.manuscripts.splice(index, 1);
            }
        }
    }
</script>