/**
 * Created by .
 * User: aleksandarro
 * Date: 5/16/11
 * Time: 11:57 PM
 * To change this template use File | Settings | File Templates.
 */

var model = [];

function initModels() {

  model.push({"file": 'assets/models/pin.js', "name": 'pin' });

  modelLoader(0);

  function modelLoader(id) {
    if(model[id].geometry !== 'undefined' ){
      loader = new THREE.JSONLoader();
      loader.load({ model: model[id].file, callback: function(g) {
        model[id].geometry = g;
        if (id < model.length-1) modelLoader(id+1);
        else { initScene(); }
      } });
    }
  }

}