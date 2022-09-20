'use strict';

const timeOpenArray = [
  'Time:',
  '6am:',
  '7am:',
  '8am:',
  '9am:',
  '10am:',
  '11am:',
  '12pm:',
  '1pm:',
  '2pm:',
  '3pm:',
  '4pm:',
  '5pm:',
  '6pm:',
  '7pm:',
];
/* Arguments to be used when invocating City constructor */
const cityArgs = [
  ['Seattle', 23, 65, 6.3],
  ['Tokyo', 3, 24, 1.2],
  ['Dubai', 11, 38, 3.7],
  ['Paris', 20, 38, 2.3],
  ['Lima', 2, 16, 4.6],
];

/* Select the table element from HTML to build the table on */
const table = document.querySelector('table');

/* Utility Functions */
// Used MDN for template
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* This array is where all data is pulled from for all functions to */
const locations = [];

/* Constructor for cties */
function City(cityName, minCust, maxCust, avgSales) {
  this.cityName = cityName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSales = avgSales;
  this.results = [this.cityName];
  this.totalSales = 0;
  locations.push(this);
}

City.prototype.custPerHour = function () {
  for (let i = 0; i < timeOpenArray.length - 1; i++) {
    const num = Math.floor(this.avgSales * randInt(this.minCust, this.maxCust));
    this.totalSales += num;
    this.results.push(num);
  }
};

City.prototype.render = function () {
  const tableRow = document.createElement('tr');
  table.appendChild(tableRow);
  let tableData = document.createElement('td');
  // tableRow.class = this.cityName.toLowerCase();
  for (let data of this.results) {
    tableData = document.createElement('td');
    tableData.innerText = data;
    tableRow.appendChild(tableData);
  }
};

/* Generate new City objects that contain the data in cityArgs array */
for (let data of cityArgs) {
  new City(...data);
}

function createHeading() {
  for (let time of timeOpenArray) {
    const tableHead = document.createElement('th');
    tableHead.innerText = `${time}`;
    table.appendChild(tableHead);
  }
}

function buildThePage() {
  createHeading();
  for (let city of locations) {
    city.custPerHour();
    city.render();
  }
}
buildThePage();
