const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");
const datahide = document.querySelector(".middle_layer");
const week_day = document.getElementById("day");
const today_date = document.getElementById("today_date");

const getInfo = async (event) => {
	event.preventDefault();
	datahide.classList.remove("data_hide");
	let city_val = cityName.value;
	if (city_val === "") {
		city_name.innerText = "Please write the name of the city before searching";
		datahide.classList.add("data_hide");
	} else {
		try {
			let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_val}&units=metric&appid=3da3fd6f8ae7a5d32b99846f4a13c651`;
			let response = await fetch(url);
			const data = await response.json();
			const arrData = [data];
			const cityTemp = arrData[0].main.temp;
			city_name.innerText = `${arrData[0].name} , ${arrData[0].sys.country}`;
			temp.innerHTML = `<span class="num">${cityTemp}</span> <sup>o</sup>C`;
			const tempmood = arrData[0].weather[0].main;
			if (tempmood == "Clear") {
				temp_status.innerHTML = `<i class="fa-solid fa-sun" style="color:#eccc68"></i>`;
			} else if (tempmood == "Clouds") {
				temp_status.innerHTML = `<i class="fa-solid fa-cloud" style="color:#f1f2f6"></i>`;
			} else if (tempmood == "Rain") {
				temp_status.innerHTML = `<i class='fa-solid fa-cloud-rain' style="color:#a4b0be"></i>`;
			} else {
				temp_status.innerHTML = `<i class='fa-solid fa-cloud' style="color:#009ad8"></i>`;
			}
		} catch {
			city_name.innerText = "Please enter the city name properly";
			datahide.classList.add("data_hide");
		}
	}
};

const getDate = () => {
	const weekday = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let today = new Date();
	let day = weekday[today.getDay()];
	let dateday = today.getDate();
	const monthArray = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let month = monthArray[today.getMonth()];
	let date = dateday + " " + month;
	week_day.innerText = day;
	today_date.innerText = date;
	//console.log(`day=${day} and date =${date}`);
};

getDate();

submitBtn.addEventListener("click", getInfo);
//body.addEventListener("load", getDate);
