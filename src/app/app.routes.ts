import { Routes } from '@angular/router';
import { AllProductsComponent } from './Products/components/all-products/all-products.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { ProductsDetailsComponent } from './Products/components/products-details/products-details.component';
import { CartsComponent } from './carts/components/carts/carts.component';

export const routes: Routes = [
    {path:"products",component:AllProductsComponent},
    {path:"productDetails/:id",component:ProductsDetailsComponent},
    {path:"productDetails/:id",component:ProductsDetailsComponent},
    {path:"cart",component:CartsComponent},
    {path:"",component:AllProductsComponent},
    {path:"**",component:NotfoundComponent}
];
