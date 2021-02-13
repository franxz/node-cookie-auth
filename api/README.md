# auth

## curl

```sh
curl -v -X POST localhost:3000/register -H 'Content-Type: application/json' \
    -d '{"name": "mario", "email": "mario@gmail.com", "password": "Helado16", "passwordConfirmation": "Helado16"}'
```

```sh
curl -v localhost:3000/home -H 'Content-Type: application/json' \
    --cookie 'sid=s%3AG9Z36qEmrmBn-dHAg3Kiohw4dg1jO-9t.alfk5lg%2FyYUp0rSRSdygg8tNJJ3UEmTQWw4ztoXC4nY'
```

```sh
curl -X POST localhost:3000/login -H 'Content-Type: application/json' \
    -d '{"email": "mario@gmail.com", "password": "Helado16"}'
```