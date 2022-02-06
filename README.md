## Project Contains:

### Public routes

 <li> /login </li>
 <li> /register </li>
 <li> /forgot-password </li>
 <li> /guitars </li>
 <li> page not found (*)</li>

### Private routes
<li> /profile </li>
<li> /shopping-cart </li>

### Reusable Components

<li> GuitarCard </li>
<li> TopSection (Navbar) </li>

### State Manager
<li> React Redux (for shopping cart)</li>
<li> Context Hook (for authentication)</li>

### API
<li> Firebase </li>

## Functionalities

<li> User can register / login / view their profile. In case the user forgot their password, they can enter their email and will receive a generated link (on email) to set a new password.  </li>
<li> In the guitars page, the user can view the brands, prices and types of the guitars. The user can also search guitars by their brand or model and can filter them.
<li> The guitars can be added to the shopping cart. </li>
<li> In the shopping cart page there is a total price automatically calculated based on the products in the cart. </li>
<li> Each product can be removed from the cart.</li>
<li> Once the user picked the wanted products, after entering the delivery address, they can place an order that will be saved in the database.  </li>
<li> There is also a 404 Not Found page, in case the user enters a bad request.</li>
