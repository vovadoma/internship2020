## Create User
-------------------------

## Request

    POST http://localhost:5000/api/registration

- Request Body : 
```json

    {  
        "formData": {
            "firstName": "firstName", // Example: 'Sergey'
            "lastName": "lastName",// Example: 'Rozum'
            "phone": "phone", // Example: '+380505055055'
            "email": "email", // Example: 'name@gmail.ru'
            "password": "password" // Example: '123456'
        }
    }

```
## Response

```json
    // if valid data
    {
        "logged": true
    }
    
    //if invalid data
    {
        "errors": [array] //  one or more fields are empty or invalid. Example:  [{"value": "namegmail.com","msg": "Incorrect email","param": "email","location": "body"}]
        "error": "string" // common mistake. Example: "User already exists"
    }


```
