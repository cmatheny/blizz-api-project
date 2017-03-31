SERVER_NAME = None

MONGO_HOST = 'db'
MONGO_PORT = 27017

# Skip these if your db has no auth. But it really should.
# MONGO_USERNAME = '<your username>'
# MONGO_PASSWORD = '<your password>'

MONGO_DBNAME = 'apitest'

RESOURCE_METHODS = ['GET']
ITEM_METHODS = ['GET', 'PATCH', 'PUT', 'DELETE']

user = {
    # Schema definition, based on Cerberus grammar. Check the Cerberus project
    # (https://github.com/pyeve/cerberus) for details.
    'username': {
        'type': 'string',
        'minlength': 4,
        'maxlength': 30,
        'required': True,
        'unique': True,
    },
        'password': {
        'type': 'string',
        'minlength': 4,
        'maxlength': 30,
        'required': True,
        'unique': True,
    },
    # 'role' is a list, and can only contain values from 'allowed'.
    'role': {
        'type': 'list',
        'allowed': ["user", "admin"],
    }
}

profile = {
    'owner': {
        'type': 'string',
        'minlength': 4,
        'maxlength': 30,
        'required': True,
    },
}

users = {

    # by default the standard item entry point is defined as
    # '/people/<ObjectId>'. We leave it untouched, and we also enable an
    # additional read-only entry point. This way consumers can also perform
    # GET requests at '/people/<lastname>'.
    'additional_lookup': {
        'url': 'regex("[\w]+")',
        'field': 'username'
    },

    # We choose to override global cache-control directives for this resource.
    'cache_control': 'max-age=10,must-revalidate',
    'cache_expires': 10,
    
    'resource_methods': ['GET', 'POST'],

    'schema': user
}

DOMAIN = {
    'people': people,
}
