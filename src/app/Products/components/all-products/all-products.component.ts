import { Component, inject, OnInit } from '@angular/core';
import { HomeImageComponent } from '../../../shared/home-image/home-image.component';
import { HomeTextComponent } from '../../../shared/home-text/home-text.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [HomeImageComponent,HomeTextComponent,HttpClientModule,SpinnerComponent,RouterModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit{
products:any[]=[]
   categories:any[]=[]
   loading:boolean=true
   amount:number=1
   httpClient=inject(HttpClient);
   ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories()
   }

   getAllProducts(){
    this.loading=false
    this.httpClient.get("https://fakestoreapi.com/products").subscribe((res:any)=>{
      console.log(res);
      this.products=res;
      this.loading=true
    },error=>{
      alert("Error")
    })
   }

   getAllCategories(){
    this.loading=false
    this.httpClient.get('https://fakestoreapi.com/products/categories').subscribe((res:any)=>{
      console.log(res);
      this.categories=res;
      this.loading=true
    },error=>{
      alert("Error")
    })
   }

   getProductByCategory(category:string){
    this.loading=false
    this.httpClient.get('https://fakestoreapi.com/products/category/'+category).subscribe((res:any)=>{
      console.log(res);
      this.products=res;
      this.loading=true
    })
   }

   filterCategory(event:any){
    let value=event.target.value;
    if(value=="all"){
      this.getAllProducts()
    }else{
      this.getProductByCategory(value)
    }
    console.log(value)
   }

   addToCart(item: any, quantity: number) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exist = cart.find((i: any) => i.id === item.id);
  
    if (!exist) {
      // Push an object containing both item and quantity
      cart.push({ item, quantity });
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Product added to cart', item,quantity);
      console.log('quantityquantityquantity',quantity);
    } else {
      console.log('Product already in cart', item,quantity);
    }
  }
}
