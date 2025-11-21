
// Add some interactive effects
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.feature-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to enter button
    const enterButton = document.querySelector('.enter-button');
    enterButton.addEventListener('click', function (e) {
        e.preventDefault();
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
            window.location.href = this.href;
        }, 150);
    });
});


// Handle scan button: use selectedRecipeId stored in sessionStorage
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('scanButton');
    if (!btn) return;
    btn.addEventListener('click', function () {
        const selected = sessionStorage.getItem('selectedRecipeId');
        if (selected) {
            // Show QR modal for the stored recipe id
            try {
                generateQRCode(selected);
            } catch (e) {
                console.error('Failed to generate QR on index:', e);
                alert('Unable to generate QR code.');
            }
        } else {
            // No recipe selected — open the QR modal so the phone can scan the app landing
            console.warn('No selectedRecipeId in sessionStorage — opening landing QR');
            try {
                // Call generateQRCode with no id to produce a landing-only QR
                generateQRCode(null);
            } catch (e) {
                console.error('Failed to open QR for landing:', e);
                // Fallback: redirect to landing page
                window.location.href = 'pages/landing.html';
            }
        }
    });
});
