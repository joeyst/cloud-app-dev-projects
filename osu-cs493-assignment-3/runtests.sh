cd tests
newman run -e api_tests.postman_environment.json api_tests.postman_collection.json

status() {
    printf "\n=====================================================\n"
    printf "%s\n" "$1"
    printf -- "-----------------------------------------------------\n"
}

BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ==== Business endpoints ==== 
echo -e "${BLUE}"

# Creating user. 
status 'POST create-user should return success'
curl -v -X POST \
    -H 'Content-Type: application/json' \
    -d '{ 
      "name": "someName", 
      "email": "someEmail@someDomain", 
      "password": "somePassword" 
    }' \
    http://localhost:8000/users/

status 'POST create-user should return failure'
curl -v -X POST \
    -H 'Content-Type: application/json' \
    -d '{ 
      "name": "someName2", 
      "email": "someEmail@someDomain", 
      "password": "somePassword2",
      "admin": true
    }' \
    http://localhost:8000/users/

# Logging in. 
status 'POST log-in should return success'
curl -v -X POST \
    -H 'Content-Type: application/json' \
    -d '{ 
      "email": "someEmail@someDomain", 
      "password": "somePassword" 
    }' \
    http://localhost:8000/users/login/

status 'POST log-in should return failure'
curl -v -X POST \
    -H 'Content-Type: application/json' \
    -d '{ 
      "email": "someEmail@someDomain", 
      "password": "somePassword2" 
    }' \
    http://localhost:8000/users/login/
