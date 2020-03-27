const weather_form = document.querySelector('form');
const search_value = document.querySelector('input');

const data1 = document.querySelector('#data-1');
const data2 = document.querySelector('#data-2');

weather_form.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = search_value.value;
    data1.textContent = 'Loading ...';
    data2.textContent = '';
    fetch(`/weather?address=${address}`).then(res => {
        res.json().then(data => {
            data1.textContent = data.location;
            data2.textContent = `It's ${data.temperature} C outside and the humidity is ${data.humidity}% the probability of rain is ${data.precipProbability}%`;
        });
    });
});

