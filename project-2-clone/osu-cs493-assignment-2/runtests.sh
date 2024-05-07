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

# Get 
status 'GET business-by-id should return success'
curl http://localhost:8000/businesses/0

status 'GET business-by-id should return failure'
curl http://localhost:8000/businesses/ab

# Get all 
status 'GET business list should return success'
curl http://localhost:8000/businesses/

# Post 
status 'POST business-by-response-body should return success'
curl -v -X POST \
    -H 'Content-Type: application/json' \
    -d '{ 
      "name": "someName", 
      "streetAddress": "someStreetAddress", 
      "city": "someCity", 
      "state": "someState", 
      "zip": "someZip", 
      "phoneNumber": "somePhoneNumber", 
      "category": "someCategory", 
      "subcategories": ["someSubcategory1", "someSubcategory2"], 
      "website": "someWebsite.someTopLevelDomain", 
      "email": "someEmail@someDomain" 
    }' \
    http://localhost:8000/businesses/

# Put 
status 'PUT business-by-response-body-by-id should return success'
curl -v -X PUT \
    -H 'Content-Type: application/json' \
    -d '{ 
      "name": "someName", 
      "streetAddress": "someStreetAddress", 
      "city": "someCity", 
      "state": "someState", 
      "zip": "someZip", 
      "phoneNumber": "somePhoneNumber", 
      "category": "someCategory", 
      "subcategories": ["someSubcategory1", "someSubcategory2"], 
      "website": "someWebsite.someTopLevelDomain", 
      "email": "someEmail@someDomain" 
    }' \
    http://localhost:8000/businesses/0

status 'PUT business-by-response-body-by-id should return failure'
curl -v -X PUT \
    -H 'Content-Type: application/json' \
    -d '{ 
      "name": "someName", 
      "streetAddress": "someStreetAddress", 
      "city": "someCity", 
      "state": "someState", 
      "zip": "someZip", 
      "phoneNumber": "somePhoneNumber", 
      "category": "someCategory", 
      "subcategories": ["someSubcategory1", "someSubcategory2"], 
      "website": "someWebsite.someTopLevelDomain", 
      "email": "someEmail@someDomain" 
    }' \
    http://localhost:8000/businesses/ab

# Delete 
status 'DELETE business-by-id should return success'
curl -v -X DELETE http://localhost:8000/businesses/0

status 'DELETE business-by-id should return failure'
curl -v -X DELETE http://localhost:8000/businesses/ab

# ==== Review endpoints ====
echo -e "${PURPLE}"

# Get 
status 'GET reviews-list-by-user-id should return success'
curl http://localhost:8000/reviews/0

status 'GET reviews-list-by-user-id should return failure'
curl http://localhost:8000/reviews/ab

# Post 
status 'POST reviews-by-business-id should return success'
curl -v -X POST \
    -H 'Content-Type: application/json' \
    -d '{ 
      "starRating": "someStarRating",
      "dollarSignRating": "someDollarSignRating",
      "writtenReview": "someWrittenReview"
    }' \
    http://localhost:8000/reviews/0

# Put 
status 'PUT reviews-by-review-id should return success'
curl -v -X PUT \
    -H 'Content-Type: application/json' \
    -d '{ 
      "starRating": "someStarRating",
      "dollarSignRating": "someDollarSignRating",
      "writtenReview": "someWrittenReview"
    }' \
    http://localhost:8000/reviews/0

status 'PUT reviews-by-review-id should return failure'
curl -v -X PUT \
    -H 'Content-Type: application/json' \
    -d '{ 
      "starRating": "someStarRating",
      "dollarSignRating": "someDollarSignRating",
      "writtenReview": "someWrittenReview"
    }' \
    http://localhost:8000/reviews/ab

# Delete 
status 'DELETE review-by-id should return success'
curl -v -X DELETE http://localhost:8000/reviews/0

status 'DELETE review-by-id should return failure'
curl -v -X DELETE http://localhost:8000/reviews/ab

# ==== Photo endpoints ====
echo -e "${CYAN}"

# Post 
status 'POST photos-by-business-id should return success'
curl -v -X POST \
    -H 'Content-Type: application/json' \
    -d '{ 
      "photo": "somePhoto",
      "caption": "someCaption"
    }' \
    http://localhost:8000/photos/0

# Get 
status 'GET photos-list-by-user-id should return success'
curl http://localhost:8000/photos/0

status 'GET photos-list-by-user-id should return failure'
curl http://localhost:8000/photos/ab

# Put 
status 'PUT photos-by-photo-id should return success'
curl -v -X PUT \
    -H 'Content-Type: application/json' \
    -d '{ 
      "photo": "somePhoto",
      "caption": "someCaption"
    }' \
    http://localhost:8000/photos/0

status 'PUT photo-by-photo-id should return failure'
curl -v -X PUT \
    -H 'Content-Type: application/json' \
    -d '{ 
      "photo": "somePhoto",
      "caption": "someCaption"
    }' \
    http://localhost:8000/photos/ab

# Delete 
status 'DELETE photo-by-id should return success'
curl -v -X DELETE http://localhost:8000/photos/0

status 'DELETE photo-by-id should return failure'
curl -v -X DELETE http://localhost:8000/photos/ab
