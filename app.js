const searchForm = document.getElementById('search-form');
const search = document.getElementById('search');
const filterForm = document.getElementById('filter-form');
const filter = document.getElementById('filter');
const countries = document.getElementById('countries');
const modeContainer = document.getElementById('mode-container');
const modal = document.getElementById('modal');
const singleCountry = document.getElementById('single-country');
const closeBtn = document.getElementById('closeBtn');


// Event listeners
searchForm.addEventListener('keyup', (e) => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    searchCountry(searchTerm);
})

filterForm.addEventListener('click', (e) => {
    e.preventDefault();

    const filterTerm = filter.value;

    filterCountry(filterTerm);
})

modeContainer.addEventListener('click', () => {
    document.querySelector('header').classList.toggle('dark');
    document.querySelector('main').classList.toggle('dark');
    modal.classList.toggle('dark');
})

// Close modal and back to home page
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
})

// Fetching all countries from api
const allCountries = async () => {
    const res = await fetch(`https://restcountries.eu/rest/v2/all`);
    const data = await res.json();

    console.log(data);
    showCountries(data);
}

allCountries();

// Search for a country
const searchCountry = async (term) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${term}`);
    const data = await res.json();

    console.log(data);
    showCountries(data);
}

// Filter countries by region
const filterCountry = async (term) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/region/${term}`);
    const data = await res.json();

    console.log(data);
    showCountries(data);
}

// Show countries
const showCountries = (data) => {
    countries.innerHTML = data.map(item => `
    
        <div class = 'country' data-countryID = '${item.callingCodes[0]}'>
        
            <div class = 'country-header'>
            
                <img src = '${item.flag}' alt = '${item.name}' />

            </div>

            <div class = 'country-body'>
            
                <h5>${item.name}</h5>

                <ul>
                    <li><strong>Population: </strong>${item.population.toLocaleString()}</li>
                    <li><strong>Region: </strong>${item.region}</li>
                    <li><strong>Capital: </strong>${item.capital}</li>
                </ul>
            
            </div>
        
        </div>
    
    `).join('');
}

// Fetch single country
countries.addEventListener('click', e => {
    const countryInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains('country');
        }else{
            return false;
        }
    });

    if(countryInfo){
        const countryId = countryInfo.getAttribute('data-countryID');
        getCountryById(countryId);
    }

    modal.style.display = 'block';
})

// Get countries by their Ids
const getCountryById = async (country) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/callingcode/${country}`);
    const data = await res.json();

    console.log(data[0]);
    addCountryToDOM(data[0]);
}

// Add countries to DOM
const addCountryToDOM = (country) => {
    singleCountry.innerHTML =  `
    
        <img src = '${country.flag}' alt = '${country.name}' />

        <div class = 'single-country-text'>
        
            <h2>${country.name}</h2>

            <div class = 'list-container'>

                <ul class = 'left-side'>

                    <li><strong>Native Name: </strong>${country.nativeName}</li>
                    <li><strong>Population: </strong>${country.population.toLocaleString()}</li>
                    <li><strong>Region: </strong>${country.region}</li>
                    <li><strong>Sub Region: </strong>${country.subregion}</li>
                    <li><strong>Capital: </strong>${country.capital}</li>
                
                </ul>
                <ul class = 'right-side'>
                
                    <li><strong>Top Level Domain: </strong>${country.topLevelDomain[0]}</li>
                    <li><strong>Currencies: </strong>${country.currencies[0].name}</li>
                    <li><strong>Languages: </strong>${country.languages[0].name}</li>
                
                </ul>
            
            </div>

                <ul class = 'borders'>

                    <li><strong>Borders: </strong>${country.borders}</li>
        
                </ul>
        
        </div>
    `;
}
