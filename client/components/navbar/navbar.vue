<template>
    <nav id="main-nav" class="navbar navbar-fixed-top navbar-dark bg-inverse">
        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar2">
            &#9776;
        </button>
        <div class="collapse navbar-toggleable-xs" id="exCollapsingNavbar2">
            <a class="navbar-brand" href="#">Qniform</a>
            <ul class="nav navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" v-link="{ name: 'home', exact: true }">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" v-link="{ name: 'dashboard', exact: true }">Dashboard</a>
                </li>
            </ul>
            <div class="form-inline navbar-form pull-right">
                <p class="form-control-static">{{ display }}&nbsp;</p>
                <button v-if="!loggedIn" class="btn btn-primary" @click="signIn()">
                    <i class="fa fa-fw fa-envelope-o"></i>
                    <span>Sign In</span>
                </button>
                <button v-if="loggedIn" class="btn btn-primary" @click="signOut()">
                    <i class="fa fa-fw fa-sign-out"></i>
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    </nav>
</template>

<script type="text/babel" lang="es">
    import _ from 'lodash';
    import personaSvc from '../persona/personaService';

    export default {
        data: function()
        {
            return {
                user: personaSvc.currentUser
            };
        },
        computed: {
            loggedIn: function()
            {
                return !!this.user.email;
            },
            display: function()
            {
                return this.user.name || this.user.email;
            }
        },
        methods: {
            signIn: function()
            {
                personaSvc.signIn();
            },
            signOut: function()
            {
                personaSvc.signOut();
            }
        }
    }
</script>