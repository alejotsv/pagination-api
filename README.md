# Pagination API

Pagination is a technique frequently seen in HTTP API's to make working with large data sets more manageable.

This API was designed using Javascript, MongoDB, Mongoose, Express.js, and Node.js. The endpoint for this API has been deployed and is ready to use from https://md-my-apps.herokuapp.com/apps.

This tool was built according to the following parameters:

* The key "by" is required and the only values permitted are "id" and "name".
* Both "start" and "end" identifiers can be omitted, in which case the start identifier is assumed to be the first in the data set.
* Even if the "start" identifier is included, the "end" identifier can be omitted, in which case the program queries with no ending bound, but will still return results account for "max" page size.
* The "max" page size can be omitted, in which case the default of 50 is assumed.
* For cases where the "end" identifier extends beyond what can fit inside the maximum page, the page sizes takes precedence.
* The behavior in other corner cases can be safely assumed to be undefined.

When the endpoint is requested with a "range", it should modify its response to appropriately include only the items bounded by that range request.

## Implementation

To implement this solution, variables for each paramater were set to a) verify their presence in the request and b) set a default value when applicable. After checking the parameters a Promise-based call to the database is made, the id of each document removed from the results. The results are then subsequently delimited according to the parameters in the request.

Finally, the results are sorted ascendingly or descendingly in the response, according to the parameter "order".

The database has been populated with 600 documents for testing purposes.



