# lattice

Lattice is a rudimentary game about building radio infrastructure to meet the needs of customers that are geographically distributed.

## High-Level Direction

Lattice now has the customer and tower game objects as well as panning and zooming for getting around. The next step is to add some constraints to the game for the player to wrangle and make it fun for a few minutes. 

At the moment, the infrastructure component is very boring: click to place a tower with a range of 64. By making towers sufficiently expensive, we can add some variation to the towers to allow players to better optimize how particular towers service customers and how many towers come together to work as a whole. Bandwidth between customers and towers is currently assumed to be infinite; adding a constraint here will necessitate using these variations to tailor local networks to local customers.

## Feature Queue

1. Aid placement with ghost tower
1. Aid placement by highlighting potential customers in ghost tower range
