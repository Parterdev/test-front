//Importamos el módulo database de Firebase
import * as firebase from "firebase";
import "firebase/database";

//Variable de configuracion Firebase
let config = {
  apiKey: "xxx",
  authDomain: "test-front-firebase.firebaseapp.com",
  databaseURL: "https://test-front-firebase.firebaseio.com",
  projectId: "test-front-firebase",
  storageBucket: "test-front-firebase.appspot.com",
  messagingSenderId: "416960706553",
  appId: "xxx"
};

//Inicializacion de firebase a partir de su config
firebase.initializeApp(config);

//Exportamos el servicio DB de Firebase
export default firebase.database();


/* import * as firebase from "firebase";
import "firebase/database";

let config = {
  apiKey: "xxx",
  authDomain: "bezkoder-firebase.firebaseapp.com",
  databaseURL: "https://bezkoder-firebase.firebaseio.com",
  projectId: "bezkoder-firebase",
  storageBucket: "bezkoder-firebase.appspot.com",
  messagingSenderId: "xxx",
  appId: "xxx",
};

firebase.initializeApp(config);

export default firebase.database();
 */