/**
 *Easy Http Library
 @description : Libbrary for making Http calls
 @version 2.0.0
 @author Enu Azubike Richard
 @license MIT
 */

class EasyHttp {
    /**
    * @param {String} url
    * @returns {Object}
    */
    async get ( url ) {
        const response = await fetch( url )
        return response.json();
    }


    /**
     * @param {String} url
     * @param {Object} data
     * @returns {void}
     */

    async post ( url, data ) {
        const response = await fetch( url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        } )
        return response.json();
    }

    /**
    * @param {String} url
    * @param {Object} data
    * @returns {void}
    */
    async put ( url, data ) {
        const response = await fetch( url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        } )
        return response.json();
    }

    /**
    * @param {String} url
    * @returns {void}
    */
    async delete ( url ) {
        await fetch( url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        } )
        return "Resource deleted";

    }
}

export const http = new EasyHttp();