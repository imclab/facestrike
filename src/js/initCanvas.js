/**
 * Created by .
 * User: aleksandarro
 * Date: 5/16/11
 * Time: 11:57 PM
 * To change this template use File | Settings | File Templates.
 */

var container, stats;

function initCanvas(){

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  container.appendChild( stats.domElement );
  
}
