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
            <doc-card :doc="doc" v-for="doc in manuscripts | filterBy docFilter"></doc-card>
        </div>
    </div>
</template>

<style lang="sass" src="./dashboard.scss"></style>

<script type="text/babel" lang="es">
    import _ from 'lodash';

    import docCard from './docCard.vue';

    export default {
        name: 'Dashboard',
        components: {
            docCard: docCard
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
            removeDoc: function(doc)
            {
                var idx = _.findIndex(this.manuscripts, { id: doc.id });
                this.manuscripts.splice(idx, 1);
            }
        }
    }
</script>