const form = document.querySelector('form');

form.addEventListener('submit', async e => {
    e.preventDefault();
    console.log('front end axios triggered');
    const articleNo = document.querySelector('#articleNo').value;
    const price = document.querySelector('#price').value;
    console.log(await axios.put('http://localhost:3000/update', { articleNo, price }));
    return;
});
