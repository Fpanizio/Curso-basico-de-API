const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch(env){
        case 'dev':
            return {
               bd_string: 'mongodb+srv://adm:NuYAG2bip@clusterapi.2gi31.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
               jwt_pass: 'batata',
               jwt_expires_in: '1d'
            }
        case 'hml':
            return {
                bd_string: 'mongodb+srv://adm:NuYAG2bip@clusterapi.2gi31.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
                jwt_pass: 'batata',
               jwt_expires_in: '1d'
            }
        case 'prod':
            return {
                bd_string: 'mongodb+srv://adm:NuYAG2bip@clusterapi.2gi31.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
                jwt_pass: 'asdf1123j12opj3o12j31o241o2i4',
               jwt_expires_in: '1d' 
            }
    }
}

console.log(`iniciando a api em ambiente ${env.toUpperCase()}`);

module.exports = config();