var debugSWComp = false;
var isSubscribed = false;
var applicationServerPublicKey = "BM1WV_YQ4hjtnW_8ic7lIV2NzI7XDLL2FQnMjLSm8tYTriKDt0zB3IrnjOipFJSfZxjDeA2YVk-cZbypoT-CDoY";
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
      initializeUI(registration);
    }).catch(function(err){
      //Here the service worker failed to register!
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
  var updateButton = '<button class="btn-flat toast-action">Update</button>';
  var toastContent = '<span>New Version Available</span>' + updateButton;
  M.toast({html: toastContent, displayLength: 7000, completeCallback: function(){worker.postMessage({action: 'skipWaiting'});}}, 20000);
}

function initializeUI(swRegistration) {
   $("#sub-nav").click(function() {
    $("#sub-nav").addClass("disabled");
    if (isSubscribed) {
      unsubscribeUser(swRegistration);
    } else {
      subscribeUser(swRegistration);
    }
  });
  $("a#sub-nav").click(function() {
    $("a#sub-nav").addClass("disabled");
    if (isSubscribed) {
      unsubscribeUser(swRegistration);
    } else {
      subscribeUser(swRegistration);
    }
  });
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);
    updateBtn();
  });
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    $("#sub-nav").val('SUBSCRIPTION N/A<i class="material-icons right">notifications_none</i>');
    $("#sub-nav").addClass("disabled");
    $("a#sub-nav").val('SUBSCRIPTION N/A<i class="material-icons right">notifications_none</i>');
    $("a#sub-nav").addClass("disabled");
    updateSubscriptionOnServer(null);
    return;
  }
  if (isSubscribed) {
    $("#sub-nav").text('UNSUBSCRIBE');
    $("#sub-nav").append('<i class="material-icons right">notifications_active</i>');
    $("a#sub-nav").text('UNSUBSCRIBE');
    $("a#sub-nav").append('<i class="material-icons right">notifications_active</i>');
    //pushButton.textContent = 'Disable Push Messaging';
  } else {
    $("#sub-nav").text('SUBSCRIBE');
    $("#sub-nav").append('<i class="material-icons right">notifications_none</i>');
    $("a#sub-nav").text('SUBSCRIBE');
    $("a#sub-nav").append('<i class="material-icons right">notifications_none</i>');
    //pushButton.textContent = 'Enable Push Messaging';
  }

  $("#sub-nav").removeClass("disabled");
  $("a#sub-nav").removeClass("disabled");
}
function subscribeUser(swRegistration) {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    updateSubscriptionOnServer(subscription);
  })
  .catch(function(err) {
    
  });
}
function unsubscribeUser(swRegistration) {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
  })
  .then(function() {
    updateSubscriptionOnServer(null);
  });
}
function updateSubscriptionOnServer(subscription) {

  if (subscription) {
    $.post("/subscribe", { subscription: subscription.toJSON() }, function( data, textStatus, jqXHR ) {
      if(jqXHR.status == 201){
        isSubscribed = true;
      }else{
        
      }
      updateBtn();
    });
    //subscriptionDetails.classList.remove('is-invisible');
  } else {
    $.post("/unsubscribe", function( data, textStatus, jqXHR ) {
      if(jqXHR.status == 200){
        isSubscribed = false;
      }else{
        
      }
      updateBtn();
    });
    //subscriptionDetails.classList.add('is-invisible');
  }
}


function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}