'use strict';

import express from 'express';
// import * as BitbucketService from '../services/Bitbucket';
var AuthenticationClient = require('auth0').AuthenticationClient;

var auth0 = new AuthenticationClient({
    domain: 'okcoder.auth0.com',
    clientId: 'WaSLuhdhe0rmy11334ya8JuehefOZk8O',
    clientSecret: '8h3zYaQHjjvUuLcrCXnGLIPEhVGYHle4YNziG8G-gU5_0t3jbpu5FPfNClzj_C_7'
});

auth0.clientCredentialsGrant(
    {
        audience: 'https://okcoder.auth0.com/api/v2/',
        scope: '{MANAGEMENT_API_SCOPES}'
    },
    function(err, response) {
        if (err) {
            // Handle error.
        }
        console.log(response.access_token);
    }
);

const ManagementClient = require('auth0').ManagementClient;

const management = new ManagementClient({
    token: '{YOUR_API_V2_TOKEN}',
    domain: 'okcoder.auth0.com'
});

export const router = express.Router();

router.route('/')
    .get(getBitbucketRepositories);

async function getBitbucketRepositories(req, res, next) {
    return res.status(200).send();
    // ApplicationService.createApplicationToken
}