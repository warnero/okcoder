import * as Bitbucket from '../controllers/Bitbucket';

export default function(app) {
    return {
        application: app.use('/bitbucket', Bitbucket.router)
    }
}