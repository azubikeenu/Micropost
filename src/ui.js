class UI {
    constructor() {
        this.post = document.querySelector( "#posts" );
        this.title = document.querySelector( "#title" );
        this.body = document.querySelector( "#body" );
        this.id = document.querySelector( "#id" );
        this.submitPost = document.querySelector( ".post-submit" );
        this.formState = "add";
    }

    showPosts ( posts ) {
        let output = '';
        posts.forEach( post => {
            output += `
               <div class="card mb-3">
               <div class="card-body">
               <h1 class="card-title"> ${post.title}</h1>
                <p class="card-text"> ${post.body}</p>
                <a href="#" class ="edit card-link" data-id = ${post.id}>
                    <i class="fa fa-pencil"></i>
                </a>
                <a href="#" class="delete card-link" data-id = ${post.id}>
                    <i class="fa fa-remove"></i>
                </a>
               </div>
             </div>
            `
        } )

        this.post.innerHTML = output
    }

    showAlert ( message, className ) {
        this.clearAlert();
        const div = document.createElement( 'div' );
        div.className = className;
        div.appendChild( document.createTextNode( message ) );
        const container = document.querySelector( ".postsContainer" );
        const post = document.querySelector( "#posts" );
        container.insertBefore( div, post );

        // time out afer 3 secs
        setTimeout( () => {
            this.clearAlert()
        }, 3000 )

    }
    clearAlert () {
        if ( document.querySelector( '.alert' ) ) {
            document.querySelector( '.alert' ).remove();
        }

    }
    clearFields () {
        this.title.value = "";
        this.body.value = "";
    }
    // fill form to edit
    fillForm ( data ) {
        this.title.value = data.title;
        this.body.value = data.body;
        this.id.value = data.id;

        // change form state
        this.changeFormState( "edit" )

    }
    clearIdInput () {
        this.id.value = "";
    }
    changeFormState ( type ) {
        if ( type === 'edit' ) {
            //remove cancel button if exists
            this.removeCancelButton();
            this.submitPost.textContent = "Update Post"
            this.submitPost.className = "post-submit btn btn-warning btn-block"

            // create a cancelbutton
            const cancel = document.createElement( 'button' );
            cancel.className = 'post-cancel btn btn-light btn-block';
            cancel.appendChild( document.createTextNode( "Cancel" ) )
            const cardForm = document.querySelector( '.card-form' );
            const formEnd = document.querySelector( '.form-end' )
            cardForm.insertBefore( cancel, formEnd )

        } else {
            this.submitPost.textContent = "Post It"
            this.submitPost.className = "post-submit btn btn-primary btn-block";
            if ( document.querySelector( ".post-cancel " ) ) {
                document.querySelector( ".post-cancel " ).remove();
            }
            this.clearIdInput()
            this.clearFields();

        }
    }
    removeCancelButton () {
        if ( document.querySelector( ".post-cancel" ) ) {
            document.querySelector( ".post-cancel" ).remove();
        }

    }
    getId () {
        return this.id.value;
    }

}


export const ui = new UI();