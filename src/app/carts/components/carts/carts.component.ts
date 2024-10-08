import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule,RouterModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponent implements OnInit {
  totalPrice: number = 0;
  afterDiscound: number = 0;
  form!:FormGroup
  httpClient=inject(HttpClient);
  cartProducts: any[] = [];
  success: boolean = false;
  submitted = false;

  constructor(private build:FormBuilder) {
    this.getCartProducts();
  }

  ngOnInit(): void {
    this.getCartProducts();
    this.form=this.build.group({
      title: ['',[Validators.required]],
      Phone: ['',[Validators.required]],
      email: ['',[Validators.required]],
    })
  }

  getCartProducts() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
    console.log(this.cartProducts);
    this.getTotalPrice();
    this.Discound();
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    console.log(this.cartProducts);
    this.getTotalPrice();
    this.Discound();
  }

  deleteAll() {
    this.cartProducts = [];
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.getTotalPrice();
    this.Discound();
  }

  getTotalPrice() {
    this.totalPrice = 0; // reset total price before recalculating
    for (let x in this.cartProducts) {
      this.totalPrice += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  Discound() {
    this.afterDiscound = this.totalPrice - 16.99;
  }

  // New method to send the cart to the API
  sendCart() {
    const cartData = {
      userId: 5,
      date: new Date().toISOString().split('T')[0], // current date
      products: this.cartProducts.map(product => ({
        productId: product.item.id, // assuming the product has an 'id' property
        quantity: product.quantity
      }))
    };
  
    // If the form is invalid, return early
    this.submitted = true;
  
    fetch('https://fakestoreapi.com/carts', {
      method: "POST",
      body: JSON.stringify(cartData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.success = true;
  
        // Optionally, show a message after successful submission
        setTimeout(() => {
          alert('Done'); // You can replace this with any UI element to show the message.
        }, 100); // Delay to simulate a "done" message
  
      })
      .catch(err => console.error('Error submitting cart:', err));
  }
  
}
