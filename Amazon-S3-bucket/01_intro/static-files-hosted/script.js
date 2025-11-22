document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('action-btn');
    const message = document.getElementById('message');

    button.addEventListener('click', () => {
        message.classList.toggle('show');
        
        if (message.classList.contains('show')) {
            button.textContent = 'Hide Message';
            confettiEffect();
        } else {
            button.textContent = 'Click Me!';
        }
    });

    // Simple console log to verify JS is running
    console.log('S3 Static Site Script Loaded Successfully!');
});

function confettiEffect() {
    // A simple visual effect could go here, but for now we'll just log
    console.log('Confetti! 🎉');
}
