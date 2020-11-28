let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime()
{
    const date = new Date();
    return date.getHours() + "Hrs: " + date.getMinutes() + "Mins: " + date.getSeconds() + "Secs:" + date.getMilliseconds() + "Ms";
}
function makePromiseCall(methodType, url, async=true, data=null)
{
    return new Promise(function (resolve, reject)
    {
        let xhr = new XMLHttpRequest();
        xhr.onload = function()
        {
            console.log(methodType + " State Changed called at: " + showTime() + "Ready state: " + xhr.readyState + " Status: " + xhr.status)
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
        xhr.open(methodType, url, async);
        if(data)
        {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }
        else xhr.send();
        console.log(methodType+" Request sent to server");
    });
}




const getURL = "http://localhost:3000/employees/1";
makePromiseCall("GET", getURL, true)
               .then(responseText => {
                console.log("Get User Data at: " + showTime() + " Value: " + responseText);
            })
               .catch(error => console.log("Get error status : "+ JSON.stringify(error)));
console.log("Made GET Promise call to the server at " + showTime());

const deleteURL = "http://localhost:3000/employees/13";
makePromiseCall("DELETE", deleteURL, false)
            .then(responseText => {
                console.log("User Deleted at: " + showTime() + "Value: "+ responseText);
            })
            .catch(error => console.log("delete error status : "+ JSON.stringify(error)));
console.log("Made DELETE Promise call to the server at " + showTime());

const postURL = "http://localhost:3000/employees";
const empData = {
    "name":"Mr. Banana",
    "salary":"50"
  }
function fun(){
    makePromiseCall("POST", postURL, true, empData)
               .then(responseText => {
                console.log("User Added at: " + showTime() + "Value: "+ responseText);
            })
            .catch(error => console.log("post error status : "+ JSON.stringify(error)));
}
setTimeout(fun,500);
console.log("Made POST Promise call to the server at " + showTime());

