import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent implements OnInit {
  id:any
  loading:boolean=true
  product:any={}
  httpClient=inject(HttpClient);
  constructor(private route:ActivatedRoute){
   this.id=this.route.snapshot.paramMap.get("id")
   console.log(this.id)
  }
  ngOnInit(): void {
    this.getSingleProduct()
  }

  getSingleProduct(){
    this.loading=false
    this.httpClient.get("https://fakestoreapi.com/products/"+this.id).subscribe((res:any)=>{
      console.log(res);
      this.product=res;
      this.loading=true
    })
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
      alert('done')
    } else {
      console.log('Product already in cart', item,quantity);
      alert('Product already in cart')
    }
  }
}
