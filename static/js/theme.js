document.addEventListener('DOMContentLoaded', () => {
    // Create toggle switch container
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'theme-switch-wrapper';
    toggleContainer.style.position = 'fixed';
    toggleContainer.style.top = '10px';
    toggleContainer.style.right = '10px';

    // Create checkbox input for toggle
    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';
    toggleInput.id = 'theme-toggle';
    toggleInput.className = 'theme-switch';

    // Create label for toggle
    const toggleLabel = document.createElement('label');
    toggleLabel.htmlFor = 'theme-toggle';
    toggleLabel.className = 'theme-switch-label';

    // Append elements
    toggleContainer.appendChild(toggleInput);
    toggleContainer.appendChild(toggleLabel);
    document.body.appendChild(toggleContainer);

    // Handle theme toggle
    toggleInput.addEventListener('change', () => {
        const theme = toggleInput.checked ? 'dark' : 'light';
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        toggleInput.checked = savedTheme === 'dark';
    }
});