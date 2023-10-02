const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const modeButton = document.getElementById('mode');
this.clearButton = document.getElementById('clear-btn');

const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
  searchButton.addEventListener('click',getData);
  document.addEventListener('DOMContentLoaded',addSearchedUserFromStorageToUI);
  clearButton.addEventListener('click',clearAll);
  modeButton.addEventListener('click',changeMode);
}

function getData(){
  const username = searchInput.value.trim();
  if(username !== ''){
    github.getDataFromGithub(username)
    .then(response => {
      if(response.user.message === 'Not Found'){
        ui.displayErrorMessage('User Not Found!');
      }
      else{
        ui.clearInput();
        ui.displayLastSearch(username);
        Storage.addUserToStorage(username);
        ui.displayUserData(response.user);
        ui.displayRepoData(response.repo);
      }
    })
    .catch(err => console.log(err));
  }
  else{
    ui.displayErrorMessage('Please enter a valid username!');
  }
  
}
function addSearchedUserFromStorageToUI(){
  ui.addSearchedUserToUI();
}
function clearAll(){
  Storage.clearAllSearchedUsersFromStorage();
  ui.clearAllLastSearchedUsersFromUI();
}
function changeMode(){
  ui.changeUIColorMode();
}