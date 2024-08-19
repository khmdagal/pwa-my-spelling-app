let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    showInstallPromotion();
});

// Show the install prompt
const showInstallPromotion = () => {
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block';

    installButton.addEventListener('click', async () => {
        installButton.style.display = 'none';
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
    });
};

window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
});



/*
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
    deferredPrompt = e;
    showInstallPromotion();
});

// Show the install prompt
const showInstallPromotion = () => {
const installButton = document.getElementById('installButton');
installButton.style.display = 'block';

installButton.addEventListener('click', async () => {
installButton.style.display = 'none';
deferredPrompt.prompt();
const { outcome } = await deferredPrompt.userChoice;
if (outcome === 'accepted') {
console.log('User accepted the install prompt');
} else {
console.log('User dismissed the install prompt');
}
deferredPrompt = null;
});
};

window.addEventListener('appinstalled', () => {
console.log('PWA was installed');
});
*/