const session = require("express-session");
// On crée l'object qui nous permettra de gérer les sessions avec Redis
const RedisStore = require('connect-redis')(session);
const redis = require("redis");

// L'host, c'est-à-dire l'adresse d'où se trouve la base Redis
// La notation a = b || c en JS veut dire, j'affecte à a la valeur de b si elle existe (non chaine de caractère vide, non null et non undefined), sinon je prends la valeur c
// Il faut lire ça: mongoDBHost est la variable d'environnement REDIS_HOST si elle est définie sinon c'est "localhost"
const redisHost = process.env.REDIS_HOST || "localhost";

// On configure le client Redis
const redisClient = redis.createClient({ host: 'redis-bdd', port: 6379 })

// S'il y a une erreur on veut dire laquelle
redisClient.on('error', (err) => {
    console.log("Impossible d'établir une connexion avec redis. " + err);
});

// Si la connection est un succès, on veut le dire
redisClient.on('connect', () => {
    console.log("Connexion à redis avec succès");
});

const sessionMiddleware = session({

    // On utilise redis pour stocker les sessions utilisateur
    store: new RedisStore({client: redisClient}),
  
    // C'est ce qui permet d'encoder et décoder les sessions pour des raisons de sécurité évidentes (il doit être méconnu de tous pour ne pas se faire pirater)
    secret: "JeSuisSecret!",
  
    // Le domain (le début de l'URL) sur lequel la session doit être active, si votre site est https://test.com
    // le domaine sera "test.com" mais comme on fait du devloppement en local, ici il le domain est "localhost"
    domain: "localhost",
  
    // Quelques autres options
    //credentials: true,
    //name: "sid",
    resave: false,
    saveUninitialized: false,
    proxy: true,
  
    // Le cookie qui servira à stocker la session
    cookie: {
  
        // Si vrai, ne transmettre le cookie que par https.
        // On est en développement donc juste en http, on doit donc mettre false
        secure: false,
  
        // Si vrai, empêche le JS côté client de lire le cookie
        // Comme on est en développement, on peut le mettre à false, mais en production il doit être à true
        httpOnly: false,
  
        // La durée de vie de la session en millisecondes, après ce délai la session sera détruite, il faudra par exemple se reconnecter pour se recréer une session
        maxAge: 86400000, // 86400000ms = 1 jour
  
        // On laisse le même domaine que dans les options plus haut
        domain: "localhost"
        //sameSite: "none"
    },
  })

const wrap = (expressMiddleware) => (socket, next) => expressMiddleware(socket.request, {}, next);

module.exports = {sessionMiddleware, wrap};