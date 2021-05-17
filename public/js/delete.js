const form = document.querySelector('form');

form.addEventListener('submit', async e => {
    try{
    e.preventDefault();
    const articleNo = document.querySelector('#articleNo').value;
    const resp = await axios.delete('http://localhost:3000/delete', {data: {articleNo}});
    console.log('response:', resp.data);
} catch(e) {console.log('caught in frontend axios, delete.js: e.message', e.message);}
});
