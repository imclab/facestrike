/**
 * Created by .
 * User: aleksandarro
 * Date: 5/17/11
 * Time: 12:13 AM
 * To change this template use File | Settings | File Templates.
 */

var currentScene = '';

function initScene(scene){

  if (scene) currentScene = scene;
  if (currentScene == 'sandbox') { initSanboxScene(); }
  
}