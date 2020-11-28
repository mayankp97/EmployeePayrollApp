  
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime()
{
    const date = new Date();
    return date.getHours() + "Hrs: " + date.getMinutes() + "Mins: " + date.getSeconds() + "Secs:" + date.getMilliseconds() + "Ms";
}
function makeAJAXCall(methodType, url, callback, async=true, data=null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log(methodType + " State Changed called at: " + showTime() + "Ready state: " + xhr.readyState + " Status: " + xhr.status)
        if(xhr.readyState === 4)
        {
            if(xhr.status === 200 || xhr.status === 201)
            {
                callback(xhr.responseText);
            }
            else if(xhr.status >= 400)
            {
                console.log("Handle 400 client error or 500 server error");
            }
        }   
    } 
    xhr.open(methodType, url, async);
    console.log( methodType+"Open called");
    if(data)
    {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }
    else xhr.send();
    console.log(methodType+" Request sent to server");
}
const getUrl = " http://localhost:3000/employees/"
function getUserDetails(data)
{
    console.log("Get User Data at: " + showTime() + " Value: " + data);
}
makeAJAXCall("GET", getUrl, getUserDetails, true);
console.log("Made GET AJAX call to the server at " + showTime());

const deleteURL = "http://localhost:3000/employees/2";
function userDeletedData(data)
{
    console.log("User Deleted : "+ data);
}
makeAJAXCall("DELETE", deleteURL, userDeletedData, true);
console.log("Made DELETE AJAX call to the server at " + showTime());

const postURL = "http://localhost:3000/employees";
const empData = {
    "name":"Ms. LadyFinger",
    "salary":"5000000"
  }
function userAdded(data)
{
    console.log("User Added : "+ data);
}
makeAJAXCall("POST", postURL, userAdded, true, empData);
console.log("Made POST AJAX call to the server at " + showTime());