window.HackGrid = (function() {
  // Empty module for backward compatibility
  return {};
})();

document.addEventListener('DOMContentLoaded', () => {
  
  function handleHash() {
    if(window.location.hash.startsWith('#hackathon/')) {
      setTimeout(() => {
        const id = window.location.hash.split('/')[1];
        if(window.HackDetail) window.HackDetail.show(id);
      }, 100);
    } else if (window.location.hash === '' || window.location.hash === '#') {
      if(window.HackDetail) window.HackDetail.hide();
    }
  }

  handleHash();
  window.addEventListener('hashchange', handleHash);
});
