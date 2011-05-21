/**
 * Created by .
 * User: aleksandarro
 * Date: 5/16/11
 * Time: 11:57 PM
 * To change this template use File | Settings | File Templates.
 */


function initCanvas(){

  shared.container = document.getElementById( shared.config.domSrc );

  shared.container.stats = new Stats();
  shared.container.stats.domElement.style.position = 'absolute';
  shared.container.stats.domElement.style.top = '0px';
  shared.container.appendChild( shared.container.stats.domElement );
  
}
