//Blank template for all components

// This must me done to hook on Alpine.js lifecycle.
// This callback is executed when the whole framework is initialized
document.addEventListener('alpine:init', () => {

    // This can bind some pre-defined data inside your application using "x-data".
    // Using this, you can re-use this data multiple times (ex. for components)
    // you can also specifiy some parameters to pass to it
    Alpine.data('blankTemplate', () => ({

        // Code here...
    }))
})
