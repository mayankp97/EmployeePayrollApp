function makePromiseCall(methodType, url, async=true, data=null)
{
    return new Promise(function (resolve, reject)
    {
        let xhr = new XMLHttpRequest();
        xhr.onload = function()
        {
            //console.log(methodType + " State Changed called at: " + showTime() + "Ready state: " + xhr.readyState + " Status: " + xhr.status)
            if(xhr.status.toString().match("^[2][0-9]{2}$"))
            {
                    resolve(xhr.responseText);
            }
            else if(xhr.status.toString().match("^[4,5][0-9]{2}$"))
            {
                reject({
                status: xhr.status,
                statusText: xhr.statusText
                }); 
                console.log("Handle 400 client error or 500 server error");
            }
        }
        xhr.onerror = function () 
        {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
                }); 
        }
        xhr.open(methodType, url, async);
        if(data)
        {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }
        else xhr.send();
    });
}