class userRendered{
    static userHtml(user){
        return `
                      <div class="d-flex mt-2">
                          <div class="d-flex">
                              <img class="mentions rounded-circle user-image" data-user-id="${user.id}" src="${user.image}"/>
                              <div class="notifications mt-1 ms-2">
                                  <p id="notif_para" class="text-muted">
                                      <a href="#" class="fw-bold text-black text-decoration-none user-name" data-user-id="${user.id}">${user.username}</a><br />
                                      Follows You
                                  </p>
                              </div>
                          </div>
                          <div class="icon_notif ms-auto d-flex justify-content-center align-items-center rounded-circle bg-light">
                              <i class="bx bx-user-plus"></i>
                          </div>  
                      </div>`
    }
    
    // because i have to only show userimage or username thats why create another method for showing only stories data
     static showUserstories(user){
         return `
         <div class="stories position-relative">
             <img class="stories_img" src="${user.image}" />
             <p class="story_name position-absolute text-black">${user.username}</p>
         </div>`
    }
}

export default userRendered