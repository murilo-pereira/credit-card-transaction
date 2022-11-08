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

```
 - accountId: number
 - cpf: string length(11)
 - benefitAmounts: object
 - benefitAmounts.meal: number
 - benefitAmounts.food: number
 - benefitAmounts.culture: number
 - cash: number
```

```json
{
  "accountId": 1,
  "cpf": "11122233344",
  "benefitAmounts": {
    "meal": 100,
    "food": 100,
    "culture": 100 
  },
  "cash": 100
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

```
 - account: number
 - totalAmount: number
 - mcc: string length(4)
 - merchant: string length(40)
```

```json
{
  "account": 1,
  "totalAmount": 30,
  "mcc": "5411",
  "merchant": "SUPERMERCADO DO ZE          SAO PAULO BR"
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

+ L4 - Concurrent transactions

````
To-do: Implement a library to check if there is already a transaction being processed for the account.

- I would put this transaction information being processed for the account, in a centralized Redis for example,
  and query at the beginning of each transaction.
````