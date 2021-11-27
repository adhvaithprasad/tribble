var admin = require("firebase-admin");
//m
// Fetch the service account key JSON file contents
var serviceAccount = require("./tribble-66bad-firebase-adminsdk-5tfkm-314c455c50.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tribble-66bad-default-rtdb.asia-southeast1.firebasedatabase.app"
});
// Import Admin SDK
const { getDatabase } = require('firebase-admin/database');

// Get a database reference to our blog
const db = getDatabase();
var ref = db.ref('/');
const path = require('path');
const Server = require('node-git-server');
 
const repos = new Server(path.resolve(__dirname, 'tmp'), {
    autoCreate: true,
    authenticate: ({type, repo, user}, next) => {
      if(type == 'push') {
        user((username, password) => {
          console.log(username, password);
          // next();
        });
      } else {
        next();
      }
    }
});
const port = process.env.PORT || 7005;
 
repos.on('push', (push) => {
    push.accept();
    var repo_clone_link = "https://tribble.adhvaithprasad.repl.co/"+push.repo ;
    var m = push.repo;
var repo_name = m.split('.')[0] ;
ref.child(repo_name).child(push.commit).set({
  commit: push.commit,
  repo:push.repo,
  branch:push.branch
});

    push.accept();
});
 
repos.on('fetch', (fetch) => {
    console.log(`fetch ${fetch.commit}`);
    fetch.accept();
});
 
repos.listen(port, () => {
    console.log(`node-git-server running at http://localhost:${port}`)
});









// repos.on('push', function (push) {
//     // console.log('push ' + push.repo + '/' + push.commit
//     //     + ' (' + push.branch + ')'
//     // );
//     console.log(push);
//     push.accept();
//     var repo_clone_link = "https://tribble.adhvaithprasad.repl.co/"+push.repo ;
//     var m = push.repo;
// var repo_name = m.split('.')[0] ;
// ref.child(repo_name).child(push.commit).set({
//   commit: push.commit,
//   repo:push.repo,
//   branch:push.branch
// });


// });

// repos.on('fetch', function (fetch) {
//     console.log('fetch ' + fetch.commit);
//     fetch.accept();
// });

// var http = require('http');
// var server = http.createServer(function (req, res) {

//     repos.handle(req, res);
      
// });

// server.listen(7000);
