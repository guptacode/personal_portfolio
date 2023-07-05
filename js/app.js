const hiddenElements = document.querySelectorAll('.hidden');

// Callback function to run everytime the visibility of an element changes. 
// It will loop over every element with th class 'hidden' and change it to show to trigger animation once its visible in the viewport.
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');

        }
    });
});

hiddenElements.forEach(element => observer.observe(element));