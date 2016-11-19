Limited push:
```js
curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZDkzNzQ5My1mZTg5LTQxMmMtYWNmZi00NmYwMTgxYzhiNzEifQ.flbueDuGnNDdv-Q1WdScKBHbh991HH8oG0T6ADGRd7U" -H "Content-Type: application/json" -d '{
    "tokens": ["DEV-6e2fe88a-e1d1-4979-bafa-79800600192b", "DEV-4246ca82-7e89-46b2-a024-d423c733e17e"],
    "profile": "fake_push_profile",
    "notification": {
        "message": "Hello World2!"
    }
}' "https://api.ionic.io/push/notifications"
```
facebook plugin:

```js
"cordova-plugin-facebook4": {
            "APP_ID": "1653218781618586",
            "APP_NAME": "GeoRespect",
            "PACKAGE_NAME": "io.cordova.myapp37fa9479f98a49f4a53ab78472334b15"
        },
```