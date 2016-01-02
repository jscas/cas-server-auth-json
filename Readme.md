# cas-server-auth-json

This module provides a simple reference implementation of an authentication
plugin for [cas-server][cs]. The plugin reads a JSON file and uses the parsed
data to validate credentials.

Example JSON data file:

```javascript
{
  "luser": {
    "password": "123456",
    "firstName": "Local",
    "lastName": "User"
  }
}
```

Keys on the parent object represent usernames. The only required property of a
user object is the `password` property. Any other properties will be returned
as extra attributes in a CAS 3.0 service validation response.

When the plugin is initialized it can be passed a configuration object that
specifies the data file:

```javascript
{
  credentialStore: '/path/to/data.json'
}
```

Note: the data file must have a `.json` extention. Otherwise it will not be
parsed correctly. Also, if you do not supply a file the plugin will default
to using the included [store.example.json](store.example.json) file.

[cs]: https://github.com/jscas/cas-server
