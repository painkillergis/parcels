# lattice

Lattice is a rudimentary game about building radio infrastructure to meet the needs of customers that are geographically distributed.

## High-Level Direction

The gameplay is pretty broken since it's so easy to accumulate customers in many clusters. It might add some backpressure to require the player to build a backhaul network originating at their first tower or a prescribed demarcation point.

## Feature Queue

1. First tower is linked while subsequent towers are not. Customers are not serviced by inactive towers
1. Backhauls can be created between two towers within range. Backhauls share linkage between towers and can bring inactive towers online. Backhauls have additional upkeep
1. Backhauls have enough bandwidth for 100 customers. Attempting to oversubscribe the backhaul will cause oversubscribed customers to lose service
1. Backhauls can be upgraded to service more customers

