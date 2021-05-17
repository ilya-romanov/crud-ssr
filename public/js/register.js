const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = document.createElement('input');
    input.setAttribute('name', 'approved');
    input.setAttribute('value', 'false');
    input.setAttribute('type', 'hidden');

    form.appendChild(input);
    form.submit();
});


