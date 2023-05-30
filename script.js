

const header = document.createElement("h1");
   header.setAttribute("class","text-center");
   header.setAttribute("id","title");
   header.innerHTML = "<h1>Restcountries & Weather Using Fetch API</h1>"
  

   const restCountriesAPI = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,latlng,cca3';
   const openWeatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=';
   const apiKey = '2edf94c2e5d04ea55dabd9c813b51c00';  //check  

       //rest country data
    async function getCountryData(){
      const response= await fetch(restCountriesAPI);
      const countries= await response.json();
      return countries;
    }

        //city
    async function getWeatherData(city){
      const response= await fetch(`${openWeatherAPI}${city}&appid=${apiKey}`);
      const weatherData= await response.json();
      return weatherData;
    }

    // creating column with card card-header card-body 
       function createCard(country){
         const column = document.createElement('div');
         column.classList.add('col-lg-4','col-sm-12');

         const card = document.createElement('div');
         card.classList.add('card'); 
         card.setAttribute("id","card");

         const cardHeader= document.createElement('div');
         cardHeader.classList.add('card-header');

         const countryName= document.createElement('h3'); 
         countryName.classList.add('text-center');

         countryName.textContent= country.name.common;
          cardHeader.appendChild(countryName);

         const cardBody= document.createElement('div');
         cardBody.classList.add('card-body');
         
         //flag
         const flagImage=document.createElement('img');
         flagImage.classList.add('card-img-top');
         flagImage.src=country.flags.png;
         cardBody.appendChild(flagImage);

         //cardtext  (for card text use para tag)
         const cardText=document.createElement('div');
         cardText.classList.add('card-text');

         //region
          const region=document.createElement('p');
          region.textContent= `Region: ${country.region}`;
          cardText.appendChild(region);
        
          //capital
          const capital=document.createElement('p');
          capital.textContent= `Capital: ${country.capital[0]}`;
          cardText.appendChild(capital);
      
         //latitute longitude
         const latLong= document.createElement('p');
         latLong.textContent= `Latitute Longitude: ${country.latlng}`;
         cardText.appendChild(latLong);

         //countries code
         const countryCode=document.createElement('p');
         countryCode.textContent= `Country Code: ${country.cca3}`;
         cardText.appendChild(countryCode);
      
         cardBody.appendChild(cardText);
      
         //weather button
         const weatherBtn= document.createElement('button');
         weatherBtn.classList.add('btn','btn-primary');
         weatherBtn.textContent='Click for Weather';

         //for click
         weatherBtn.addEventListener('click',async()=>{
            try{
               const weatherData= await getWeatherData(country.capital[0]);
               alert(`Current temperature in ${country.capital[0]} is ${weatherData.main.temp} Kelvin`);
            }catch(error){
               console.error(error);
            }
         })
         cardBody.appendChild(weatherBtn);
         card.append(cardHeader,cardBody);
         column.appendChild(card);
         cardContainer.appendChild(header); //header
         return column;
      }       

      //  
      async function main(){
         try{
            const countriesData= await getCountryData();
            countriesData.sort((a,b)=>{
               const name1 =a.name.common.toUpperCase();
               const name2 =b.name.common.toUpperCase();
               if(name1<name2){
                  return -1;
               }
               if(name1>name2){
                  return 1;
               }
               return 0;
            })
             
            const cardContainer = document.getElementById('cardContainer');
            cardContainer.classList.add('container');

            const row=  document.createElement('div');
            row.classList.add('row');
             
            //append card to the row
            for(let i=0; i<countriesData.length;i++){
               const card = createCard(countriesData[i]);
               row.appendChild(card);
               
            }   
            cardContainer.appendChild(row);
           
         }catch(error){
            console.log(error)
         }
      }
        main();
      
  