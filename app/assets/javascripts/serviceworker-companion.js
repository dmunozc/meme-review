if (navigator.serviceWorker) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
      if (!navigator.serviceWorker.controller) {
        return;
      }
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      if(registration.waiting){
        updateReady(registration.waiting);
        return;
      }
      if(registration.installing){
        trackInstalling(registration.installing);
        return;
      }
      if (registration.active) {
        console.log("active");
      }
      registration.addEventListener('updatefound',function(){
        trackInstalling(registration.installing);
      });
      // Ensure refresh is only called once.
      // This works around a bug in "force update on reload".
      var refreshing;
      navigator.serviceWorker.addEventListener('controllerchange', function() {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
      });
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
    
  });
  
}
function trackInstalling(worker){
  worker.addEventListener('statechange', function() {
    if (worker.state == 'installed') {
      updateReady(worker);
    }
  });
}
function updateReady(worker){
  var handler = function(event) {worker.postMessage({action: 'skipWaiting'});};
  buildSnackbar('New version available', 10000, handler,'Update');
     
  
  /*
  var toast = this._toastsView.show("New version available", {
      buttons: ['refresh', 'dismiss']
    });
  
    toast.answer.then(function(answer) {
      if (answer != 'refresh') return;
      worker.postMessage({action: 'skipWaiting'});
    });*/
  
}
