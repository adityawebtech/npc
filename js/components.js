document.addEventListener('DOMContentLoaded', () => {
    // Load header
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            initHamburgerMenu();
        });
    
    // Load footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });
});
