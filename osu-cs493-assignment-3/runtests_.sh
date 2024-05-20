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

# Post 
status 'POST create-user should return success'
curl -v POST \
    -H 'Content-Type: application/json' \
    -d '{ 
      "name": "someName", 
      "email": "someEmail@someDomain", 
      "password": "somePassword" 
    }' \
    http://localhost:8000/users/
