# curl commands
resource: https://www.youtube.com/watch?v=7XUibDYw4mc&t=6s
FTP not included (last 2 minutes)
- GET: curl <url> ==> normal GET request
    - example: curl localhost:3000/get-all-products 
- GET: curl -o <filename> <url>  ==> gets the resource the from url and saves it in a file
    - example: curl allProducts localhost:3000/get-all-products 
- GET: curl -O <url>  ==>   downloads the resource (can also be an image for example) from the url 
                            and saves it in a file called like the resource itself
    - example: curl -O localhost:3000/get-all-products 
- POST: curl -d "<key=value pairs, connect with &>" <url>
    - example: curl -d "articleNo=pc-0002&name=Dell PC 2022&discription=nice&price=500" localhost:3000/create-product
- PUT:  curl -X PUT -d "<key=value pairs, connect with &>" <url>
    - example: curl -X PUT -d "articleNo=pc-0002&price=1000" localhost:3000/update-product
- DELETE: curl -X DELETE -d "<key=value pair>" <url>
    -example:  curl -X DELETE -d "articleNo=pc-0002" localhost:3000/delete-product


- flags: 
    -i: includes headers  
    -I: headers only  
    -o: save response under following file name  
    -O: download the resource and save it under recourse name\
    --limit-rate <amount of bytes>B: sets a limit to the download request  
    -d, --data: data to pass along with the post request  
    -X, --request <command>: Specify request command to use  
    -u, --user <user:password>: Server user and password, need when secured routes present  
            -example: curl -u bob:pw123 http://localhost:3000/someSecuredRoute
    -L, --location: Follow redirects  
        -example: curl http://google.com  
        vs  
        -example: curl -L http://google.com  