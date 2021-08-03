
export default function service(){
    // let deferredPrompt;
    
    
    // window.addEventListener("beforeinstallprompt", (e) => {
    //   // Prevent the mini-infobar from appearing on mobile
    //   e.preventDefault();
    //   // Stash the event so it can be triggered later.
    //   deferredPrompt = e;
    //   // Update UI notify the user they can install the PWA
    //   // showInstallPromotion();
    // });
    // const installApp = document.getElementById("installApp");
    
    // installApp.addEventListener("click", async () => {
    //   console.log(deferredPrompt);
    //   if (deferredPrompt) {
    //     deferredPrompt.prompt();
    //     const { outcome } = await deferredPrompt.userChoice;
    //     if (outcome === "accepted") {
    //       deferredPrompt = null;
    //     }
    //   } else {
    //     alert(
    //       "This is not working in your browser you can download this app simply by clicking on add to home screen"
    //     );
    //   }
    // });
    
    console.log("why not registering");
    if ("serviceWorker" in navigator) {
      console.log("Insode afaf")
      navigator.serviceWorker
        .register(`${process.env.PUBLIC_URL}/sw.js`,{
          scope:"/"
        })
        .then((reg) => console.log("service worker registered"))
        .catch((err) => console.log("service worker not registered", err));
    }
    }