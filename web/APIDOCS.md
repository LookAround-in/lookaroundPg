## API Request: Get Explore PG

### Endpoint

`GET http://localhost:3000/api/v1/pg/getExplorePg`

### Response Structure

On a successful request, the API returns a JSON response with the following structure:

- **success** (boolean): Indicates whether the request was successful.
    
- **message** (string): A message providing additional context (if any).
    
- **data** (array): An array of PG accommodation objects, each containing:
    
    - **id** (string): Unique identifier for the PG.
        
    - **createdAt** (string): Timestamp of when the PG was created.
        
    - **updatedAt** (string): Timestamp of the last update.
        
    - **title** (string): Title of the PG accommodation.
        
    - **hostId** (string): Identifier for the host of the PG.
        
    - **description** (string): Description of the PG.
        
    - **propertyType** (string): Type of property (e.g., apartment, house).
        
    - **foodIncluded** (boolean): Indicates if food is included.
        
    - **furnishing** (string): Furnishing details.
        
    - **address** (string): Address of the PG.
        
    - **latitude** (float): Latitude of the PG location.
        
    - **longitude** (float): Longitude of the PG location.
        
    - **pgRules** (string): Rules associated with the PG.
        
    - **moveInStatus** (string): Status regarding move-in availability.
        
    - **virtualTourUrl** (string): URL for a virtual tour of the PG.
        
    - **images** (array): Array of image URLs.
        
    - **rating** (integer): Average rating of the PG.
        
    - **reviews** (array): Array of reviews.
        
    - **Host** (object): Host details including:
        
        - **id** (string): Unique identifier for the host.
            
        - **userId** (string): User identifier.
            
        - **contactNumber** (string): Host's contact number.
            
        - **alternateContact** (string): Alternate contact number.
            
        - **whatsApp** (string): WhatsApp contact.
            
        - **Address** (string): Host's address.
            
        - **createdAt** (string): Timestamp of host creation.
            
        - **updatedAt** (string): Timestamp of the last update.
            
    - **furnitures** (array): Array of furniture objects associated with the PG.
        
    - **amenities** (array): Array of amenities objects associated with the PG.
        
    - **sharingTypes** (array): Array of sharing type objects, each containing:
        
        - **id** (string): Unique identifier for the sharing type.
            
        - **createdAt** (string): Timestamp of creation.
            
        - **updatedAt** (string): Timestamp of the last update.
            
        - **type** (string): Type of sharing arrangement.
            
        - **description** (string): Description of the sharing type.
            
        - **price** (float): Price associated with the sharing type.
            
        - **availability** (integer): Availability status.
            
        - **pgDataId** (string): Identifier linking to PG data.
            
        - **pricePerMonth** (float): Monthly price.
            
        - **pricePerDay** (float): Daily price.
            
        - **deposit** (float): Deposit amount.
            
        - **refundableDeposit** (boolean): Indicates if the deposit is refundable.
            
        - **refundableAmount** (float): Amount that is refundable.
            
        - **maintainanceCharges** (float): Maintenance charges.
            
        - **electricityCharges** (float): Electricity charges.
            
        - **waterCharges** (float): Water charges.
            
        - **maintenanceIncluded** (boolean): Indicates if maintenance is included.
            

### Response Example

``` json
{
  "success": true,
  "message": "",
  "data": [
    {
      "id": "",
      "createdAt": "",
      "updatedAt": "",
      "title": "",
      "hostId": "",
      "description": "",
      "propertyType": "",
      "foodIncluded": true,
      "furnishing": "",
      "address": "",
      "latitude": 0,
      "longitude": 0,
      "pgRules": "",
      "moveInStatus": "",
      "virtualTourUrl": "",
      "images": [""],
      "rating": 0,
      "reviews": [""],
      "Host": {
        "id": "",
        "userId": "",
        "contactNumber": "",
        "alternateContact": "",
        "whatsApp": "",
        "Address": "",
        "createdAt": "",
        "updatedAt": ""
      },
      "furnitures": [
        {
          "id": "",
          "type": "",
          "pgDataId": ""
        }
      ],
      "amenities": [
        {
          "id": "",
          "type": "",
          "pgDataId": ""
        }
      ],
      "sharingTypes": [
        {
          "id": "",
          "createdAt": "",
          "updatedAt": "",
          "type": "",
          "description": "",
          "price": 0,
          "availability": 0,
          "pgDataId": "",
          "pricePerMonth": 0,
          "pricePerDay": 0,
          "deposit": 0,
          "refundableDeposit": true,
          "refundableAmount": 0,
          "maintainanceCharges": 0,
          "electricityCharges": 0,
          "waterCharges": 0,
          "maintenanceIncluded": true
        }
      ]
    }
  ]
}

 ```