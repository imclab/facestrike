/**
 * Created by .
 * User: aleksandarro
 * Date: 5/17/11
 * Time: 12:38 AM
 * To change this template use File | Settings | File Templates.
 */

//



function initEventListeners()
{
   shared.container.addEventListener( 'mousedown', onDocumentMouseDown, false );
}

function onDocumentMouseDown( event ) {

 // event.preventDefault();

  shared.container.addEventListener( 'mousemove', onDocumentMouseMove, false );
  shared.container.addEventListener( 'mouseup', onDocumentMouseUp, false );
  shared.container.addEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseMove( event ) {

  shared.mouse.x = event.clientX - shared.halfWidth;

}

function onDocumentMouseUp( event ) {

  shared.container.removeEventListener( 'mousemove', onDocumentMouseMove, false );
  shared.container.removeEventListener( 'mouseup', onDocumentMouseUp, false );
  shared.container.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseOut( event ) {

  shared.container.removeEventListener( 'mousemove', onDocumentMouseMove, false );
  shared.container.removeEventListener( 'mouseup', onDocumentMouseUp, false );
  shared.container.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}