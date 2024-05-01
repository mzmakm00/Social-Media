// The html code of showing post that create dynamically data 

class PostRenderer {
    // card Html 
    static postHtml(userData, post, hashtagsHTML) {
        return `<div class="card mt-2 rounded-4">
            <div class="card-body bg-whtie text-dark">
                <div class="user d-flex justify-content-between align-items-center">
                    <div class="d-flex justify-content-between align-items-center">  
                        <div class="profile-photo">
                            <img src=${userData.image} class="rounded-circle feed-profile-img" alt="Profile Photo">
                        </div>
                        <div class="ms-3" data-user-id="${userData.id}">
                            <p id="post_name" class = "post-user-name">                                
                            <span class="userName fw-bold text-black">${userData.firstName} ${userData.lastName}</span><br />
                                <small>${userData.address.address}</small>
                            </p>
                        </div>
                    </div>
                    <div class="ms-auto">
                        <span><i class='bx bx-dots-horizontal-rounded'></i></span>
                    </div>
                </div>

                <div class="photo mt-3">
                    <img src="https://source.unsplash.com/random/${post.id}" class="img-fluid" alt="Feed Photo">
                </div>

                <div class="action-buttons mt-2 d-flex justify-content-between align-items-center ">
                    <div class="interaction-buttons">
                        <span class="span_interactions"><i class='bx bx-heart'></i></span>
                        <span class="span_interactions" ><i class='bx bx-comment-dots'></i></span>
                        <span class="span_interactions "><i class='bx bx-share-alt'></i></span>
                    </div>
                    <div class="bookmark ml-auto">
                        <span><i class='bx bx-bookmark'></i></span>
                    </div>
                </div>

                <div class="liked-by mt-2 d-flex align-content-center ">
                    <span><img src="images/profile-10.jpg" class="rounded-circle" alt="Profile Photo"></span>
                    <span><img src="images/profile-4.jpg" class="rounded-circle" alt="Profile Photo"></span>
                    <span><img src="images/profile-15.jpg" class="rounded-circle" alt="Profile Photo"></span>
                    <p class="m-0 p-0">Liked by <b>Ernest Achiever</b> and <b>${post.reactions} others</b></p>
                </div>

                <div class = "caption d-flex">
                    <div class="profile-photo">
                        <img src=${userData.image} class="rounded-circle comment-profile-img" alt="Profile Photo">
                    </div>
                    <div class="caption">
                        <p class="ms-2 m-0 p-0"><b>${userData.firstName} ${userData.lastName}</b> ${post.body} <br/>
                            <span id="tags" class="text-muted">${hashtagsHTML}</span>
                        </p>
                    </div>
                </div> 
                <!-- Comments container -->
                <div class="comments-container">
                    <!-- Comments will be appended here -->
                </div>

                <!--<div class="comments text-muted">
                    <button class="btn btn-link view-all-comments" data-post-id="${post.id}">View all comments</button>
                </div>-->

                <!--Comment Input-->
                <div class="comment-input mt-3 position-relative" style = "display: none;">
                    <input type="text" class="form-control " placeholder="Add a comment......">
                    <button class="btn btn-primary position-absolute comment-post" data-post-id="${post.id}">Add</button>
                </div>

                <!-- Update input field 
                <div class="comment-input mt-3" style="display: none;">
                    <input type="text" class="form-control position-relative" placeholder="Write a comment...">
                    <button class="btn btn-primary position-absolute comment-post" data-post-id="${post.id}">Update</button>
                </div> -->

            </div>

        </div>`;
    }

    // Card comments Html
    static commentHtml(comment, userImage, currentUserId) {
        return `
            <div class="d-flex justify-content-between mycomment">
                <div class="caption d-flex justify-content-between">
                    <div class="profile-photo">
                        <img src="${userImage}" class="rounded-circle comment-profile-img" alt="Profile Photo">
                    </div>   
                    <div class="usercomment">   
                        <p class="ms-2 m-0 p-0"><b>${comment.user.username}</b><span class="ms-2">${comment.body}.</span></p>
                    </div>
                </div>
                <div class="mycomment-actions">
                    <!-- Display edit and delete buttons only if the comment belongs to the current user -->
                    ${ currentUserId ? `
                        <div class="dropdown">
                            <button class="btn py-0 px-0 rounded-1 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAH9JREFUSEvt07EJQmEMhdHzprAQBHEgl7FxA3EgxxEFC0ewU5RU4k9I8SqTKlySe+Ejmcxc08z+OiAl3Ij+FNEWBzyxwyk4VPXP2q8rumEZpmdsor9jUdCHAVeswuiCdfRVfRjwRnHEA/svRBV9GJCeXmWgPzml1YgaUUogHXgBgiQeGSYuyzUAAAAASUVORK5CYII="/>
                            </button>
                            <ul class="dropdown-menu" style="">
                                <li><a class="dropdown-item edit-comment" data-comment-id="${comment.id}" href="#">Edit</a></li>
                                <li><a class="dropdown-item delete-comment" data-comment-id="${comment.id}" href="#">Delete</a></li>
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>`;
    }
}


export default PostRenderer;



