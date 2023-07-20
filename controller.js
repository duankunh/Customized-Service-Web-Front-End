$(document).ready(function () {




    // part1: validating information
    // set variable
    const placeholder6 = document.getElementById("notification")
    const username = document.querySelector("#username")

    // check if function contains required element
    function checkuservalid(str) {
        return /^[A-Za-z0-9_]*$/.test(str);
    }



    // check if username is valid
    username.onkeyup = function () {
        const placeholder1 = document.getElementById("username_notification")
        if (username.value.length < 6 || !(checkuservalid(username.value))) {
            placeholder1.innerHTML = "Username is invalid"
            username.style.backgroundColor = "red"

        }
        else {
            placeholder1.innerHTML = ""
            username.style.backgroundColor = ""
        }

    }


    // check passwordpa
    // set variable 
    const password1 = document.getElementById("password1")
    const password2 = document.getElementById("password2")

    // check if function contains required element
    function checkpasswordvalid(str) {
        const upper = /[A-Z]/.test(str)
        const lower = /[a-z]/.test(str)
        const digital = /[0-9]/.test(str)
        const sign = /[!@#$%^&*]/.test(str)
        return /^[A-Za-z0-9!@#$%^&*]*$/.test(str) && upper && lower && digital && sign;
    }

    // check if password is valid
    password1.onkeyup = function () {
        const placeholder2 = document.getElementById("password1_notification")
        check_repeat()
        if (password1.value.length < 8 || !(checkpasswordvalid(password1.value))) {
            placeholder2.innerHTML = "Password is invalid"
            password1.style.backgroundColor = "red"
        }
        else {
            placeholder2.innerHTML = ""
            password1.style.backgroundColor = ""
        }


    }

    // check repeating password
    function check_repeat() {
        const placeholder3 = document.getElementById("password2_notification")
        if (password1.value === password2.value) {
            placeholder3.innerHTML = ""
            password2.style.backgroundColor = ""
        }
        else {
            placeholder3.innerHTML = "Passwords don't match"
            password2.style.backgroundColor = "red"
        }
    }
    password2.onkeyup = check_repeat

    // check email
    // set variable
    const email = document.getElementById("email")

    // check if email is valid part 1
    // TODO: change it later
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    // check if email is valid part 2
    email.onkeyup = function () {
        const placeholder4 = document.getElementById("email_notification")
        if (validateEmail(email.value)) {
            placeholder4.innerHTML = ""
            email.style.backgroundColor = ""



        }
        else {
            placeholder4.innerHTML = "Email is invalid"
            email.style.backgroundColor = "red"
        }
    }

    // check phone number
    // set variable
    const phone = document.getElementById("phone")

    //check if function contains required element part1
    function checkPhone(str) {
        var re = /[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/;

        return re.test(str);
    }

    //check if function contains required element part2
    phone.onkeyup = function () {
        const placeholder5 = document.getElementById("phone_notification")
        if (checkPhone(phone.value) && phone.value.length === 12) {
            placeholder5.innerHTML = ""
            phone.style.backgroundColor = ""
        }
        else {
            placeholder5.innerHTML = "Phone is invalid"
            phone.style.backgroundColor = "red"
        }
    }

    // part2: sending response

    // set response function if needed 
    function sendresponse() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://csc309.teach.cs.toronto.edu/a2/register")
        xhttp.setRequestHeader("Content-Type", "application/json")
        let data = JSON.stringify({ "username": username.value, "password1": password1.value, "password2": password2.value, "email": email.value, "phone": phone.value })


        xhttp.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                placeholder6.innerHTML = "User added"
            }
            if (this.readyState == XMLHttpRequest.DONE && this.status == 404) {
                placeholder6.innerHTML = "Unknown error occurred"
            }
            if (this.readyState == XMLHttpRequest.DONE && this.status == 409) {
                placeholder6.innerHTML = "Username has already been taken"
            }
        }
        xhttp.send(data)
    }


    // set variable 
    const register = document.getElementById("register")
    register.onclick = function () {
        if (checkPhone(phone.value) && validateEmail(email.value) && checkpasswordvalid(password1.value) && checkuservalid(username.value) && password1.value === password2.value) {
            sendresponse()
        }
        else {
            placeholder6.innerHTML = "At least one field is invalid. Please correct it before proceeding"
        }


    }

    //part3 first day at Amazon

    //set variable 
    const Name = document.getElementById("name")
    const Price = document.getElementById("price")
    const Quantity = document.getElementById("quantity")
    const add_update_item = document.getElementById("add_update_item")

    // set function check if all three field are met by every one second

    function checkbutton() {
        add_update_item.disabled = true
        if (Name.value.replace(/ /g, "_").trim().length !== 0 && Price.value.trim().length !== 0 && Quantity.value.trim().length !== 0) {
            add_update_item.disabled = false
        }
        else {
            add_update_item.disabled = true
        }
    }

    // function that check if button is eligible for every second
    setInterval(checkbutton, 1000)


    // function that display item
    function displayitem(name, price, quantity, total) {
        // fix duplicate issue later(set if condition later)
        // round to two decimal
        var total = Number(price * quantity).toFixed(2)
        return "<tr id = '" + name + "'>\
    <td> " + name + "</td>\
    <td>" + price + "</td>\
    <td>" + quantity + "</td>\
    <td>" + total + "</td>\
    <td> <button class = 'decrease'> - </button> </td>\
    <td> <button class = 'increase'> + </button> </td>\
    <td> <button class = 'delete'> delete </button> </td>\
    </tr>"
    }





    // add customer table
    var bodyitem = document.querySelectorAll("#cart-items tbody tr")
    var judge = 0
    add_update_item.onclick = function () {
        bodyitem = document.querySelectorAll("#cart-items tbody tr")
        //if condition to check duplicate.
        for (let idname of bodyitem) {
            // if the item is already in the list, then update it.
            if (Name.value.replace(/ /g, "_") === idname.id) {
                var invalue = document.getElementById(Name.value.replace(/ /g, "_")).querySelectorAll("td")
                invalue[1].innerHTML = Number(Price.value).toFixed(2)
                invalue[2].innerHTML = Number(Quantity.value).toFixed(2)
                invalue[3].innerHTML = Number(Price.value * Quantity.value).toFixed(2)
                judge = 1



                //calculate --------------------
                let rowlist = document.getElementById("cart-items").rows
                let sum = 0
                for (let row4 of rowlist) {
                    if (row4.querySelector("td:nth-child(4)") !== null) {
                        sum += Number(row4.querySelector("td:nth-child(4)").innerHTML)
                    }
                }
                document.getElementById("subtotal").innerHTML = sum.toFixed(2)
                document.getElementById("taxes").innerHTML = (sum * 0.13).toFixed(2)
                document.getElementById("grand_total").innerHTML = (Number(document.getElementById("subtotal").innerHTML) + Number(document.getElementById("taxes").innerHTML)).toFixed(2)
                //calculate --------------------
            }

        }
        if (judge === 0) {
            $("#cart-items").append(displayitem(Name.value.replace(/ /g, "_"), Number(Price.value).toFixed(2), Number(Quantity.value).toFixed(2)))
            // enable "-" "+" "delete"

            // first: handle delete button
            const deleterow = document.getElementById(Name.value.replace(/ /g, "_"))
            deleterow.querySelector("td:nth-child(7)").addEventListener("click", function () {
                deleterow.parentNode.removeChild(deleterow);

                //calculate --------------------
                let rowlist = document.getElementById("cart-items").rows
                let sum = 0
                for (let row4 of rowlist) {
                    if (row4.querySelector("td:nth-child(4)") !== null) {
                        sum += Number(row4.querySelector("td:nth-child(4)").innerHTML)
                    }
                }
                document.getElementById("subtotal").innerHTML = sum.toFixed(2)
                document.getElementById("taxes").innerHTML = (sum * 0.13).toFixed(2)
                document.getElementById("grand_total").innerHTML = (Number(document.getElementById("subtotal").innerHTML) + Number(document.getElementById("taxes").innerHTML)).toFixed(2)
                //calculate --------------------
            })

            // then: handle plus button
            const plus = document.getElementById(Name.value.replace(/ /g, "_")).getElementsByClassName("increase")
            for (let row2 of plus) {
                row2.addEventListener("click", function () {
                    let index2 = this.parentElement.parentElement.querySelector("td:nth-child(3)")
                    let index3 = this.parentElement.parentElement.querySelector("td:nth-child(4)")
                    let index4 = this.parentElement.parentElement.querySelector("td:nth-child(2)")
                    index2.innerHTML = (1 + Number(index2.innerHTML)).toFixed(2)
                    index3.innerHTML = (Number(index2.innerHTML) * Number(index4.innerHTML)).toFixed(2)




                    //calculate --------------------
                    let rowlist = document.getElementById("cart-items").rows
                    let sum = 0
                    for (let row4 of rowlist) {
                        if (row4.querySelector("td:nth-child(4)") !== null) {
                            sum += Number(row4.querySelector("td:nth-child(4)").innerHTML)
                        }
                    }
                    document.getElementById("subtotal").innerHTML = sum.toFixed(2)
                    document.getElementById("taxes").innerHTML = (sum * 0.13).toFixed(2)
                    document.getElementById("grand_total").innerHTML = (Number(document.getElementById("subtotal").innerHTML) + Number(document.getElementById("taxes").innerHTML)).toFixed(2)
                    //calculate --------------------
                })
            }


            const minus = document.getElementById(Name.value.replace(/ /g, "_")).getElementsByClassName("decrease")
            for (let row3 of minus) {
                row3.addEventListener("click", function () {
                    let index5 = this.parentElement.parentElement.querySelector("td:nth-child(2)")
                    let index6 = this.parentElement.parentElement.querySelector("td:nth-child(3)")
                    let index7 = this.parentElement.parentElement.querySelector("td:nth-child(4)")
                    Number(index6.innerHTML) - 1 > 0 ? index6.innerHTML = (Number(index6.innerHTML) - 1).toFixed(2) : index6.innerHTML = "0"
                    index7.innerHTML = (Number(index5.innerHTML) * Number(index6.innerHTML)).toFixed(2)

                    //calculate --------------------
                    let rowlist = document.getElementById("cart-items").rows
                    let sum = 0
                    for (let row4 of rowlist) {
                        if (row4.querySelector("td:nth-child(4)") !== null) {
                            sum += Number(row4.querySelector("td:nth-child(4)").innerHTML)
                        }
                    }
                    document.getElementById("subtotal").innerHTML = sum.toFixed(2)
                    document.getElementById("taxes").innerHTML = (sum * 0.13).toFixed(2)
                    document.getElementById("grand_total").innerHTML = (Number(document.getElementById("subtotal").innerHTML) + Number(document.getElementById("taxes").innerHTML)).toFixed(2)
                    //calculate --------------------
                })


            }

            let rowlist = document.getElementById("cart-items").rows
            let sum = 0
            for (let row4 of rowlist) {
                if (row4.querySelector("td:nth-child(4)") !== null) {
                    sum += Number(row4.querySelector("td:nth-child(4)").innerHTML)
                }
            }
            document.getElementById("subtotal").innerHTML = sum.toFixed(2)
            document.getElementById("taxes").innerHTML = (sum * 0.13).toFixed(2)
            document.getElementById("grand_total").innerHTML = (Number(document.getElementById("subtotal").innerHTML) + Number(document.getElementById("taxes").innerHTML)).toFixed(2)
        }
        judge = 0
    }


    // last part: load page. cheer up!!!!!


    // display page function information
    function displayPage(paragraphnumber, likes, content) {
        //TODO:check it later, I mean when paragraph reach the end !!!!!!!!!!!!!!
        return "<div id = 'paragraph_" + paragraphnumber + "'>\
    <p>" + content + "<b>(Paragraph: " + paragraphnumber + ")</b></p>\
    <button class = 'like'>Likes: " + likes + "</button>\
    </div>"
    }





    //no more page to load

    const nopage = "<div><p><b>You have reached the end</b></p>"
    var prohibit = 0
    var paranum = 1
    // load page function information (two url, page and like)
    function loadPage() {

        // here is issue

        if (prohibit === 0) {
            let requestUrl = "https://csc309.teach.cs.toronto.edu/a2/text/data?paragraph=" + paranum
            // get response from server
            $.ajax({
                async: false,
                url: requestUrl,
                method: "GET",
                dataTyoe: "json"
            }).then(function (respJson) {
                for (let d of respJson.data) {
                    blockcontent = displayPage(
                        d.paragraph,
                        d.likes,
                        d.content
                    )
                    paranum = Number(d.paragraph) + 1
                    $("#data").append(blockcontent)


                    // add like response
                    var likebutton = document.getElementsByClassName("like")[Number(d.paragraph) - 1]
                    likebutton.addEventListener("click", function () {


                        // fetch url
                        fetch("https://csc309.teach.cs.toronto.edu/a2/text/likes", {
                            method: 'POST',
                            body: JSON.stringify({
                                "paragraph": d.paragraph
                            }),
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then(response => response.json()).then(data => {
                            this.innerHTML = "Likes: " + data.data.likes
                        })

                    })



                }
                if (respJson.next === false) {
                    $("#data").append(nopage)
                    prohibit = 1
                }




            })
        }
    }



    // start loadpage
    window.onload = loadPage()


    // test case here

    window.onscroll = function () {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            loadPage();
        }
    };

})








