class UI{
  constructor(){
    this.img = document.getElementById('user-photo');
    this.name = document.getElementById('user-name');
    this.date = document.getElementById('date');
    this.userName = document.getElementById('user-username');
    this.bio = document.getElementById('user-bio');
    this.repoCount = document.getElementById('user-repo-count');
    this.followersCount = document.getElementById('user-followers-count');
    this.followingCount = document.getElementById('user-following-count');
    this.location = document.getElementById('user-location');
    this.twitter = document.getElementById('user-twitter');
    this.linkGithub = document.getElementById('user-link-github');
    this.email = document.getElementById('user-email');
    this.reposCardBody = document.getElementById('repos-cardBody');
    this.lastUsers = document.getElementById('last-users');
    
  }
  clearInput(){
    searchInput.value = '';
  }
  displayUserData(response){
    this.img.src = response.avatar_url;
    this.name.textContent = response.name;
    this.date.textContent = 'Joined'+ ' ' + response.created_at;
    this.userName.textContent = '@'+response.login;
    this.bio.textContent = response.bio;
    this.repoCount.textContent = response.public_repos;
    this.followersCount.textContent = response.followers;
    this.followingCount.textContent = response.following;
    this.location.innerHTML= response.location;
    this.twitter.innerHTML = response.twitter_username;
    this.linkGithub.innerHTML = response.html_url;
    this.email.innerHTML = response.email;
    
  }
  displayRepoData(repos){
    repos.forEach(repo =>{
      if(document.getElementById('mode-icon-dark')){
        this.reposCardBody.innerHTML += `
        <div class='mb-4'>
          <a href="${repo.html_url}" class="text-decoration-none ">${repo.name}</a>
          <div class="mt-2">
            <button type="button" class="btn btn-sm btn-primary bg-secondary border-0">
              Stars <span class="badge text-bg-light">${repo.stargazers_count}</span>
            </button>
            <button type="button" class="btn btn-sm btn-primary bg-secondary border-0">
              Forks <span class="badge text-bg-light">${repo.forks_count}</span>
            </button>
          </div>
        </div>
      `
      }
      else{
        this.reposCardBody.innerHTML += `
        <div class='mb-4'>
          <a href="${repo.html_url}" class="text-decoration-none ">${repo.name}</a>
          <div class="mt-2">
            <button type="button" class="btn btn-sm btn-primary innercard-bg border-0">
              Stars <span class="badge text-bg-light">${repo.stargazers_count}</span>
            </button>
            <button type="button" class="btn btn-sm btn-primary innercard-bg border-0">
              Forks <span class="badge text-bg-light">${repo.forks_count}</span>
            </button>
          </div>
        </div>
      `

      }
    })
  }
  displayLastSearch(username){
    let users = Storage.getDataFromStorage();
    if(users.indexOf(username)===-1){
      if(document.getElementById('mode-icon-dark')){
        const existingContent = this.lastUsers.innerHTML;
        const newContent = `
           <a href="https://github.com/${username}" target='_blank' class="text-decoration-none mb-2">
               <li class="list-group-item bg-light border-0 rounded">${username}</li>
            </a>
        `
        this.lastUsers.innerHTML = newContent + existingContent;
      }
      else{
        const existingContent = this.lastUsers.innerHTML;
        const newContent = `
           <a href="https://github.com/${username}" target='_blank' class="text-decoration-none mb-2">
               <li class="list-group-item innercard-bg border-0 rounded">${username}</li>
            </a>
        `
        this.lastUsers.innerHTML = newContent + existingContent;
      }
    }
    else{
      this.lastUsers.querySelectorAll('li').forEach(liItem =>{
        if(liItem.textContent === username){
          liItem.parentElement.remove();
          const existingContent = this.lastUsers.innerHTML ;
          if(document.getElementById('mode-icon-dark')){
            const newContent = `
             <a href="https://github.com/${username}" target='_blank' class="text-decoration-none mb-2">
                 <li class="list-group-item bg-light border-0 rounded">${username}</li>
              </a>`
              this.lastUsers.innerHTML = newContent + existingContent;
          }
          else{
            const newContent = `
             <a href="https://github.com/${username}" target='_blank' class="text-decoration-none mb-2">
                 <li class="list-group-item innercard-bg border-0 rounded">${username}</li>
              </a>`
              this.lastUsers.innerHTML = newContent + existingContent;
          }
        }
      })
    }
    
  }
  addSearchedUserToUI(){
    let users = Storage.getDataFromStorage();
    users.forEach( user => {
      this.lastUsers.innerHTML += `
       <a href="https://github.com/${user}" target='_blank' class="text-decoration-none mb-2">
           <li class="list-group-item innercard-bg border-0 rounded">${user}</li>
        </a>
      `
    })
  }
  clearAllLastSearchedUsersFromUI(){
    while(this.lastUsers.firstElementChild !== null){
      this.lastUsers.firstElementChild.remove();
    }
  }
  changeUIColorMode(){

    if(document.getElementById('mode-icon-dark')){
      document.body.className = 'innercard-bg';
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      innerCard.classList.remove('bg-light')
      this.lastUsers.querySelectorAll('li').forEach(liItem =>{
        liItem.classList.remove('bg-light');
        liItem.classList.add('innercard-bg');
      });
      this.repoCount.classList.remove('text-dark')
      this.followersCount.classList.remove('text-dark')
      this.followingCount.classList.remove('text-dark')
      document.querySelectorAll('i').forEach(el=>{
        el.classList.remove('text-dark');
      })
      this.reposCardBody.querySelectorAll('button').forEach(btn =>{
        btn.classList.remove('bg-secondary');
        btn.classList.add('innercard-bg');
      })
      document.getElementById('mode-text').textContent = 'LIGHT';
      document.getElementById('mode-icon-dark').remove();

      //Mode Button
      const lightIcon = document.createElement('span');
      lightIcon.className ="material-symbols-outlined ms-2";
      lightIcon.id = 'mode-icon-light';
      lightIcon.style = "font-size: 18px";
      lightIcon.textContent = " light_mode";
      modeButton.appendChild(lightIcon);
    }
    else{

      document.body.className = 'bg-light';
      document.documentElement.removeAttribute('data-bs-theme');
      innerCard.classList.add('bg-light')
      this.lastUsers.querySelectorAll('li').forEach(liItem =>{
        liItem.classList.remove('innercard-bg');
        liItem.classList.add('bg-light');
      });
      this.repoCount.classList.add('text-dark')
      this.followersCount.classList.add('text-dark')
      this.followingCount.classList.add('text-dark')
      document.querySelectorAll('i').forEach(el=>{
        el.classList.add('text-dark');
      })
      this.reposCardBody.querySelectorAll('button').forEach(btn =>{
        btn.classList.remove('innercard-bg');
        btn.classList.add('bg-secondary');
      })
      document.getElementById('mode-text').textContent = 'DARK';
      document.getElementById('mode-icon-light').remove();
  
      // Mode Button
      const darkIcon = document.createElement('i');
      darkIcon.className ='fa-regular fa-moon ms-2';
      darkIcon.id = 'mode-icon-dark';
      modeButton.appendChild(darkIcon);
    }

  }
  displayErrorMessage(message){
    const messageError = document.getElementById('messageError');
    messageError.innerHTML = `<span class="text-danger light-text">${message}</span>`;
    setTimeout(()=>{
      messageError.innerHTML = '';
    },3000);
  }
}




 



