// IIFE - runs this code right away
(function () {
    // This function runs when the page loads
    function start() {
        console.log("App started...");
    }

    // Run start() when the window finishes loading
    window.addEventListener("load", start);
})();
