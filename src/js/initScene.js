/**
 * Created by .
 * User: aleksandarro
 * Date: 5/17/11
 * Time: 12:13 AM
 * To change this template use File | Settings | File Templates.
 */


function initScene(scene){

  if (scene) shared.currentScene.id = scene;
  if (shared.currentScene.id == 'sandbox') { shared.currentScene = new SandboxScene(); }
  render();
  
}