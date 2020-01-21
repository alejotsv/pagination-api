# Pagination API

Pagination is a technique frequently seen in HTTP API's to make working with large data sets more manageable.

This API was designed using Javascript, MongoDB, Mongoose, Express.js, and Node.js, and according to the following parameters:

* The key "by" is required and the only values permitted are "id" and "name".
* Both "start" and "end" identifiers can be omitted, in which case the start identifier is assumed to be the first in the data set.
* Even if the "start" identifier is included, the "end" identifier can be omitted, in which case the program queries with no ending bound, but will still return results account for "max" page size.
* The "max" page size can be omitted, in which case the default of 50 is assumed.
* For cases where the "end" identifier extends beyond what can fit inside the maximum page, the page sizes takes precedence.
* The behavior in other corner cases can be safely assumed to be undefined.

When the endpoint is requested with a "range", it should modify its response to appropriately include only the items bounded by that range request.




