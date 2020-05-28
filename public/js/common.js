const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    fetch('http://localhost:3000/weather?address=boston').then((response) => {
        response.json().then((data) => {
            if(data.error){
                    console.log('error');
            }else{
                    console.log(data);
            }
        })
    })
});
 