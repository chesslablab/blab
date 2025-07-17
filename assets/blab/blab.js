window.addEventListener('message', (event) => {
  if (event.origin !== window.location.origin) return;
  let iframe = document.getElementById(event.data.id);
  iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
}, false);