import _ from 'lodash';

const nameBank = [
  'Syreeta Spraggins',
  'Alden Tomlin',
  'Leora Matheney',
  'Keenan Paolucci',
  'Ivette Pigeon',
  'Thanh Cyphers',
  'Elisa Bowens',
  'Daniela Beers',
  'Adelia Hazen',
  'Flor Archer'
];
const addressBank = ['526-3499 Ullamcorper, Rd.', '4387 Sed Avenue', 'P.O. Box 467, 471 Eu Avenue'];
const address2Bank = ['Apartment 6', 'Unit 27B', '#1'];
const cityBank = ['Austin', 'Springfield', 'Hawthorne', 'Paris'];
const stateBank = ['FL', 'CA', 'IL', 'NY'];
const zipBank = ['11101', '60202', '38270', '64889'];
const eventBank = ['40th Birthday', 'Our 49th Wedding Anniversary', 'Just Because'];
const dateBank = ['August 19, 2017', 'January 5, 2017', 'December 1 , 2016'];
const personBank = [
  {
    name: 'Brynn Jimenez',
    email: '${YOUR_EMAIL_HERE}+brynnjimenez@gmail.com'
  },
  {
    name: 'Ila Mcintosh',
    email: '${YOUR_EMAIL_HERE}+ilamcintosh@gmail.com'
  },
  {
    name: 'Lucy Horton',
    email: '${YOUR_EMAIL_HERE}+lucyhorton@gmail.com'
  },
  {
    name: 'Sebastian Schmidt',
    email: '${YOUR_EMAIL_HERE}+sebastianschmidt@gmail.com'
  },
  {
    name: 'Myles Dawson',
    email: '${YOUR_EMAIL_HERE}+mylesdawson@gmail.com'
  },
  {
    name: 'Branden Thornton',
    email: '${YOUR_EMAIL_HERE}+brandenthornton@gmail.com'
  },
  {
    name: 'Hedy Melton',
    email: '${YOUR_EMAIL_HERE}+hedymelton@gmail.com'
  },
  {
    name: 'Shaine Love',
    email: '${YOUR_EMAIL_HERE}+shainelove@gmail.com'
  },
  {
    name: 'Eric Booker',
    email: '${YOUR_EMAIL_HERE}+ericbooker@gmail.com'
  },
  {
    name: 'Bree Burch',
    email: '${YOUR_EMAIL_HERE}+breeburch@gmail.com'
  }
];
const answerBank = [
  'Cherubfish, salamanderfish, dartfish dealfish gombessa slimy mackerel bangus, ocean perch.',
  'Driftfish greeneye mackerel shark dartfish Razorback sucker roughy snook lampfish.',
  'African glass catfish silverside.',
  'Burrowing goby blue eye Chinook salmon gianttail Colorado squawfish; blenny; whale catfish hawkfish.',
  'Riffle dace tailor tadpole cod knifefish Red salmon, medaka, yellow weaver ling cod.',
  'Trumpetfish channel catfish bandfish trevally roach yellowfin skilfish, ribbonbearer.'
];
const imageBank = [
  'http://baby-animals.net/wp-content/gallery/baby-seal-wallpapers/Sweet-seal-wallpapers.jpg',
  'https://static1.squarespace.com/static/557e1aa2e4b069fd29c25360/t/55d4e77fe4b0d3dfa4f25bd6/1440016259505/Snowy-owl-000069334339_Large.jpg?format=1000w',
  'http://thenextweb.com/wp-content/blogs.dir/1/files/2013/08/ballmer-wp8.jpg',
  'https://i.ytimg.com/vi/Tqkq4zUJ3Yw/maxresdefault.jpg'
];

export const getName = () => _.sample(nameBank);
export const getAddress = () => _.sample(addressBank);
export const getAddress2 = () => _.sample(address2Bank);
export const getCity = () => _.sample(cityBank);
export const getState = () => _.sample(stateBank);
export const getZip = () => _.sample(zipBank);
export const getEvent = () => _.sample(eventBank);
export const getDate = () => _.sample(dateBank);
export const getPerson = () => _.sample(personBank);
export const getAnswer = () => _.sample(answerBank);
export const getImageUrl = () => _.sample(imageBank);

export function getProfile() {
  return {
    // Name & Email
    ...getPerson(),
    address: getAddress(),
    address2: getAddress2(),
    city: getCity(),
    state: getState(),
    zip: getZip(),
    picture: getImageUrl()
  };
}
