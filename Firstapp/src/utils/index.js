import queryString from 'query-string';

let rootUrl = 'https://www.fastmock.site/mock/82f411fafe7fc7951b8846289cece630/api';

let myFetch = {
    get(url,queryParams){
        url = rootUrl+url
        if(queryParams){
            url += "?"+queryString.stringify(queryParams);
        }
        
        return fetch(url)
        .then(res=>res.json())
    },
    post(url,body){
        return fetch(rootUrl+url,{
            method:'POST',
            headers:{
                "Accept":'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        })
        .then(res=>res.json())
        // .then(res=>{
        //     console.log(res);
        //     //Actions.lightbox();
        // })
    }
}

export {myFetch};

 