class Storage{
  static getDataFromStorage(){
    let users;
    if(localStorage.getItem('searched') === null){
      users = [];
    }
    else{
      users = JSON.parse(localStorage.getItem('searched'))
    }
    return users;
  }
  static addUserToStorage(username){
    let users = this.getDataFromStorage();
    if(users.indexOf(username) === -1){
      users.unshift(username);
    }
    else{
      users.forEach((user,index)=>{
        if(user === username){
          users.splice(index,1);
          users.unshift(user);
        }
      })
    }
    localStorage.setItem('searched',JSON.stringify(users));
  }
  static clearAllSearchedUsersFromStorage(){
    localStorage.removeItem('searched');
  }
}