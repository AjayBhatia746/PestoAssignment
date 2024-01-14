Hi,

In Ecommerce project, we are following one Repo Multiple Service approach(Meta uses this  for facebook).

Here we have one repository that contains:-

1. auth-service
2. product-service
3. order-managment-service

1. auth-service:- 

In our ecommerce store to access any route you need to have jwt token. Token is generated when some user comes to
/login api. For login user must be registered.

2. product-service:- 

In this service user with jwt token only can perform CRUD operations on products.
There are some validation on Porduct structure.

3. In this service user with jwt token only can perform CRUD operations on Orders.
There are some validation on Order structure.


In this we have utilised docker and kubernetes, each service have its own deployment/service yaml file and each service 
can run different pods.



                                                           auth-service     
   Client       ->    Ingress/nginix(load Balancer)  ->    product-service
                                                           order-service



CURL collection :- https://api.postman.com/collections/32305726-52cab050-5550-49d8-a4a9-f0c82f1054a2?access_key=PMAT-01HM47Q454JCQ4VH67KX5NCW8E 