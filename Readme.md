## Credit Card Transaction

+ Requirements

|                                      |
|--------------------------------------|
| Docker                               |
| Docker Compose                       |

--------------------

+ Run if this is your first time installing the application
```sh
$ make build
```

+ Run to start the application
```sh
$ make up
```

+ Run to stop the application
```sh
$ make down
```

--------------------

+ Endpoints

````
host=localhost:8080
````

--------------------

POST `${host}/api/account`

- Request

```json
{
  "accountId": 1, //number
  "cpf": "11122233344", //string length(11)
  "benefitAmounts": { //object
    "meal": 100, //number
    "food": 100, //number
    "culture": 100 //number
  },
  "cash": 100 //number
}
```

- Response

````
Status: 200 Ok

SUCCESS = '00',
USER_ALREADY_REGISTERED = '01',
SERVER_ERROR = '07'

{
    "code": ${code}
}
````

````
Status: 400 Bad Request

{
    "name": "BadRequestError",
    "message": "Invalid body, check 'errors' property for more info.",
    "errors": []
}
````

--------------------

POST `${host}/api/transaction`

- Request

```json
{
  "account": 1, //number
  "totalAmount": 30, //number
  "mcc": "5411", //string length(4)
  "merchant": "SUPERMERCADO DO ZE          SAO PAULO BR" //string length(40)
}
```

- Response

````
Status: 200 Ok

APPROVED = '00',
REJECTED_BALANCE = '51',
REJECTED = '07'

{
    "code": ${code}
}
````

````
Status: 400 Bad Request

{
    "name": "BadRequestError",
    "message": "Invalid body, check 'errors' property for more info.",
    "errors": []
}
````