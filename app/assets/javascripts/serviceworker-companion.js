var debugSWComp = false;
if (navigator.serviceWorker) {
  $(document).on('turbolinks:load', function() {
    navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
      //once I am here, the service woker was succesfully registered
      //return if it is not the service worker that controls this page
      //i.e. this page didnt load using a service worker, so they loaded content from the network
      if (!navigator.serviceWorker.controller) {
        return;
      }
      if (debugSWComp) {console.log('ServiceWorker registration successful with scope: ', registration.scope);}
      //there is an update ready
      if(registration.waiting){
        if (debugSWComp) {console.log("waiting");}
        updateReady(registration.waiting);
        return;
      }
      //there is an update in progress
      if(registration.installing){
        if (debugSWComp) {console.log("installing");}
        trackInstalling(registration.installing);
        return;
      }
      //service worker is active
      if (registration.active) {
        if (debugSWComp) {console.log("active");}
      }
      registration.addEventListener('updatefound',function(){
        if (debugSWComp) {console.log("update found");}
        trackInstalling(registration.installing);
      });
      // Ensure refresh is only called once.
      // This works around a bug in "force update on reload".
      var refreshing;
      navigator.serviceWorker.addEventListener('controllerchange', function() {
        if (debugSWComp) {console.log("controller change");}
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
      });
    }).catch(function(err){
      //Here the service worker failed to register!
      console.log('ServiceWorker registration failed: ', err);
    });
    
  });
  
}
function trackInstalling(worker){
  if (debugSWComp) {console.log("tracking installing");}
  worker.addEventListener('statechange', function() {
    //if there is an update ready
    if (worker.state == 'installed') {
      updateReady(worker);
    }
  });
}
function updateReady(worker){
  if (debugSWComp) {console.log("update ready");}
  var $updateButton = $('<button class="btn-flat toast-action">Update</button>');
  $updateButton.click(function(e){
    worker.postMessage({action: 'skipWaiting'});
  });
  var $toastContent = $('<span>New Version Available</span>').add($updateButton);
  Materialize.toast($toastContent, 20000);
}
