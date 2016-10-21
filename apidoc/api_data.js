define({ "api": [
  {
    "type": "get",
    "url": "/auth/currentuser",
    "title": "Get currentuser",
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "GetCurrentUser",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "data",
            "description": "<p>The connected user, if he's not connected, data = null.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/authRouter/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/auth/facebook",
    "title": "Facebook auth",
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "GetFacebook",
    "group": "Auth",
    "description": "<p>Passport facebook authentication entry.</p>",
    "version": "0.0.0",
    "filename": "server/routes/authRouter/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/auth/facebook/callback",
    "title": "Facebook auth callback",
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "GetFacebookCallback",
    "group": "Auth",
    "description": "<p>Passport facebook authentication callback.</p>",
    "version": "0.0.0",
    "filename": "server/routes/authRouter/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/auth/google",
    "title": "Google auth",
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "GetGoogle",
    "group": "Auth",
    "description": "<p>Passport google authentication entry.</p>",
    "version": "0.0.0",
    "filename": "server/routes/authRouter/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/auth/google/callback",
    "title": "Google auth callback",
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "GetGoogleCallback",
    "group": "Auth",
    "description": "<p>Passport google authentication callback.</p>",
    "version": "0.0.0",
    "filename": "server/routes/authRouter/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/auth/twitter",
    "title": "Twitter auth",
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "GetTwitter",
    "group": "Auth",
    "description": "<p>Passport twitter authentication entry.</p>",
    "version": "0.0.0",
    "filename": "server/routes/authRouter/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/auth/twitter/callback",
    "title": "Twitter auth callback",
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "GetTwitterCallback",
    "group": "Auth",
    "description": "<p>Passport twitter authentication callback.</p>",
    "version": "0.0.0",
    "filename": "server/routes/authRouter/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Post login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>Email or username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "Login",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "data",
            "description": "<p>The user connected.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Bad password or username</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/authRouter/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/auth/logout",
    "title": "Get logout",
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "Logout",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if logout succeed, else false.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/authRouter/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/signup",
    "title": "Post signup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": "<p>A new user.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "Signup",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "data",
            "description": "<p>The new user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "Bad-Request",
            "description": "<p>Some required parameters was not provided</p>"
          }
        ],
        "Error 422": [
          {
            "group": "Error 422",
            "optional": false,
            "field": "Unprocessable-Entity",
            "description": "<p>Email or username already taken or username is not valid.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/authRouter/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "put",
    "url": "/auth/unlink",
    "title": "Put unlink account",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>Type of auth strategy that you want to unlink (FACEBOOK, TWITER, GOOGLE).</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "ROLE_USER"
      }
    ],
    "name": "UnlinkAccount",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>A message about what happened.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/authRouter/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "put",
    "url": "/api/auth/signup",
    "title": "Update password",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "user_id",
            "description": "<p>User unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>User old password.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "newPassword",
            "description": "<p>User new password.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "ROLE_USER"
      }
    ],
    "name": "UpdatePassword",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if logout succeed, else false.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "Bad-Request",
            "description": "<p>Some required parameters was not provided.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/authRouter/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "delete",
    "url": "/api/collections/:collections_id",
    "title": "Delete collection",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "collection_id",
            "description": "<p>Collection unique ID.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "ROLE_USER"
      }
    ],
    "name": "DeleteCollection",
    "group": "Collection",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>A message about what happened.</p>"
          }
        ]
      }
    },
    "description": "<p>You must be the author of the collection or be granted admin to do this.</p>",
    "version": "0.0.0",
    "filename": "server/routes/collectionRouter/index.js",
    "groupTitle": "Collection"
  },
  {
    "type": "get",
    "url": "/api/collections/:collections_id",
    "title": "Get one",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "collection_id",
            "description": "<p>Collection unique ID.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "GetCollection",
    "group": "Collection",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Collection",
            "optional": false,
            "field": "data",
            "description": "<p>A collection.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "Not-Found",
            "description": "<p>Cannot find collection with id passed as param.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/collectionRouter/index.js",
    "groupTitle": "Collection"
  },
  {
    "type": "get",
    "url": "/api/collections",
    "title": "Get multiple",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "defaultValue": "0",
            "description": "<p>Skip x element.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "defaultValue": "8",
            "description": "<p>Limit x element.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sort_field",
            "description": "<p>Field used to sort (sort_dir must be defined).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "sort_dir",
            "description": "<p>Sort direction (-1, 1) (sort_field must be defined).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "search",
            "description": "<p>Search collections with title containing the search param.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "_author",
            "description": "<p>User unique ID. To get collections created by this user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "_starredBy",
            "description": "<p>User unique ID. To get collections starred by this user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "custom_sort",
            "description": "<p>To sort collections by user choice (_author must be defined).</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "isFeatured",
            "description": "<p>To get featured collections.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "isOnDiscover",
            "description": "<p>To get collections on discover page.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "GetCollections",
    "group": "Collection",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Collection[]",
            "optional": false,
            "field": "data",
            "description": "<p>Array of collection.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/collectionRouter/index.js",
    "groupTitle": "Collection"
  },
  {
    "type": "post",
    "url": "/api/collections",
    "title": "Post collection",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Collection",
            "optional": false,
            "field": "collection",
            "description": "<p>A new collection.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "ROLE_USER"
      }
    ],
    "name": "PostCollection",
    "group": "Collection",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Collection",
            "optional": false,
            "field": "data",
            "description": "<p>The new collection.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "Bad-Request",
            "description": "<p>Some required parameters was not provided</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/collectionRouter/index.js",
    "groupTitle": "Collection"
  },
  {
    "type": "put",
    "url": "/api/collections/:collections_id",
    "title": "Update collection",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "collection_id",
            "description": "<p>Collection unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Collection",
            "optional": false,
            "field": "collection",
            "description": "<p>A collection that contain only the attributes that you want to update.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "ROLE_USER"
      }
    ],
    "name": "PutUpdateCollection",
    "group": "Collection",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Collection",
            "optional": false,
            "field": "data",
            "description": "<p>A collection updated.</p>"
          }
        ]
      }
    },
    "description": "<p>You must be the author of the collection or be granted admin to do this.</p>",
    "version": "0.0.0",
    "filename": "server/routes/collectionRouter/index.js",
    "groupTitle": "Collection"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "server/doc/main.js",
    "group": "D__node_invow_server_doc_main_js",
    "groupTitle": "D__node_invow_server_doc_main_js",
    "name": ""
  },
  {
    "type": "put",
    "url": "/api/users/helpers/confirm-email/:confirmation_token",
    "title": "Confirm an email",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmation_token",
            "description": "<p>The conformation token.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "ROLE_USER"
      }
    ],
    "name": "GetConfirmEmail",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>True if email confirmation succeed, else false.</p>"
          }
        ]
      }
    },
    "description": "<p>You must be the user you plan to update or be granted admin to do this.</p>",
    "version": "0.0.0",
    "filename": "server/routes/userRouter/index.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users/:user_id",
    "title": "Get one user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>User unique ID.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "GetUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "data",
            "description": "<p>A user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/userRouter/index.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users",
    "title": "Get multiple users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "defaultValue": "0",
            "description": "<p>Skip x element.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Limit x element.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sort_field",
            "description": "<p>Field used to sort (sort_dir must be defined).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "sort_dir",
            "description": "<p>Sort direction (-1, 1) (sort_field must be defined).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "search",
            "description": "<p>Search users with name or username containing the search param.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "GetUsers",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User[]",
            "optional": false,
            "field": "data",
            "description": "<p>Array of user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/userRouter/index.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users/helpers/valid-email",
    "title": "Valid an email format",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The email that you want to valid.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "GetValidEmail",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isValid",
            "description": "<p>True if the email is valid, else false.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/userRouter/index.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users/helpers/valid-username",
    "title": "Valid a username format",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The username that you want to valid.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "GetValidUsername",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isValid",
            "description": "<p>True if the username is valid, else false.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/userRouter/index.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/users/:user_id",
    "title": "Update a user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>User unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": "<p>A user that contain only the attributes that you want to update.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "ROLE_USER"
      }
    ],
    "name": "PutUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "data",
            "description": "<p>A user updated.</p>"
          }
        ]
      }
    },
    "description": "<p>You must be the user you plan to update or be granted admin to do this.</p>",
    "version": "0.0.0",
    "filename": "server/routes/userRouter/index.js",
    "groupTitle": "User"
  }
] });
