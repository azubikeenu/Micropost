import { http } from "./http";
import { ui } from './ui'


// get posts on DOM load
document.addEventListener( "DOMContentLoaded", getPosts )

function getPosts () {
    http.get( "http://localhost:3000/posts" )
        .then( res => ui.showPosts( res ) )
        .catch( err => console.log( err ) )
}

// listen for add post
document.querySelector( ".post-submit" ).addEventListener( 'click', submitPost )
// listen for delete
document.querySelector( "#posts" ).addEventListener( 'click', deletePost )
//listen for edit state
document.querySelector( "#posts" ).addEventListener( 'click', EnableEdit )

// listen for cancel
document.querySelector( ".card-form" ).addEventListener( 'click', CancelEdit )


// add post
function submitPost () {
    const title = document.querySelector( '#title' ).value
    const body = document.querySelector( '#body' ).value
    // const id = document.querySelector( "#id" ).value;
    if ( title === '' || body === '' ) {
        ui.showAlert( 'Please fill all fields', "alert alert-danger" )

    } else {
        // check for id
        const data = { body, title }
        const id = ui.getId();
        if ( id ) {
            // edit post
            http.put( `http://localhost:3000/posts/${id}`, data )
                .then( () => {
                    ui.showAlert( "Post edited", "alert alert-success" )
                    ui.changeFormState( "add" )
                    getPosts();
                } ).catch( ( error ) => ui.showAlert( error.message, "alert alert-danger" ) )
        } else {
            // create post
            http.post( "http://localhost:3000/posts", data )
                .then( data => {
                    //show the alert
                    ui.showAlert( "Post added", "alert alert-success" )
                    //clear fields
                    ui.clearFields()
                    getPosts();
                } ).catch( error => ui.showAlert( error.message, "alert alert-danger" ) )
        }

    }
}


// delete post
function deletePost ( e ) {
    if ( e.target.parentElement.classList.contains( 'delete' ) ) {
        const id = e.target.parentElement.dataset.id
        if ( confirm( 'are you sure you want to delete' ) ) {
            http.delete( `http://localhost:3000/posts/${id}` )
                .then( () => {
                    ui.showAlert( "Post removed", 'alert alert-success' )
                    getPosts();
                } )
                .catch( error => ui.showAlert( error.message, "alert alert-danger" ) )
        }
    }

    e.preventDefault();
}


// enable edit state

function EnableEdit ( e ) {
    if ( e.target.parentElement.classList.contains( 'edit' ) ) {
        const link = e.target.parentElement;
        const id = link.dataset.id;
        const body = link.previousElementSibling.textContent
        const title = link.previousElementSibling.previousElementSibling.textContent
        const data = { id, title, body };
        // fill form with the current post
        ui.fillForm( data )


    }
    e.preventDefault();
}


// cancel edit state

function CancelEdit ( e ) {
    if ( e.target.classList.contains( 'post-cancel' ) ) {
        ui.changeFormState( 'add' )
    }
    e.preventDefault();
}