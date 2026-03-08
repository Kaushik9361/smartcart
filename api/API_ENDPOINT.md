Create Product
POST /api/products

Body

{
 "name": "Milk",
 "price": 45,
 "stock": 30,
 "barcode": "12345678"
}

RESPONSE:

Status code: 201

{
    "success": true,
    "data": {
        "id": 1,
        "name": "Milk",
        "price": 45,
        "stock": 30,
        "barcode": "12345678",
        "created_at": "2026-03-08T09:48:19.996Z"
    }
}

==================================================================
GET http://localhost:5000/api/products/:id

RESPONSE:

Status code: 200
{
    "success":true,
    "data":{
        "id":1,
        "name":"Milk",
        "price":45,
        "stock":30,
        "barcode":"12345678",
        "created_at":"2026-03-08T09:48:19.996Z"
        }
}
==================================================================
GET ALL PRODUCTS

GET http://localhost:5000/api/products/     
RESPONSE:

Status code: 200

BRING ALL PRODUCTS FORM DB

=================================================================
UPDATE THE PRODCTS

PUT http://localhost:5000/api/products/:id


BODY[JOSN] COLUMNS TO UPDATE:
{
 "price": 55,
 "stock": 30
}
RESPONSE:

Status code: 200

{
    "success": true,
    "data": {
        "id": 1,
        "name": "Milk",
        "price": 55,
        "stock": 30,
        "barcode": "12345678",
        "created_at": "2026-03-08T09:48:19.996Z"
    }
}
==========================================
DELETE THE PRODUCT

DELETE http://localhost:5000/api/products/1

RESPONSE:

Status code: 200

{
    "success": true,
    "message": "Product deleted successfully"
}
==============================================


