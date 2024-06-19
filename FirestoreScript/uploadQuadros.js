var admin = require('firebase-admin');
var serviceAccount = require('./luludecorafirebase-firebase-adminsdk-bjdag-524dd68fef.json');
var fs = require('fs');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

// Lê o arquivo JSON e converte para um objeto JavaScript
var data = JSON.parse(fs.readFileSync('quadros.json', 'utf8'));

data.forEach(function(item) {
  db.collection('quadros').add(item)
    .then(function(docRef) {
      console.log('Documento adicionado com ID:', docRef.id);
    })
    .catch(function(error) {
      console.error('Erro ao adicionar documento:', error);
    });
});
