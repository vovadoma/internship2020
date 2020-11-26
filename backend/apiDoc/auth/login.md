## login User
-------------------------

## Request

    POST http://localhost:5000/api/login

- Request Body : 
    ```json
        {  
            "formData": {
                "email": "email",   // Example: "name@gmail.com"
                "password": "password" //Example:  "123456"
            }
        }
    
    ```

## Response

```json
        //if valid data
        {
       "token": "token"// Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ................
        }   

        //if invalid  data
        {
        "errors": [array] //  one or more fields are empty or invalid. Example:  [{"value": "namegmail.com","msg": "Incorrect email","param": "email","location": "body"}]
        "error": "string" // common mistake. Example: "User already exists"
        }

```
