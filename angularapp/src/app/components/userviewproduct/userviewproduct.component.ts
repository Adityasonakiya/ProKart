import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-userviewproduct',
  templateUrl: './userviewproduct.component.html',
  styleUrls: ['./userviewproduct.component.css']
})
export class UserviewproductComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchText: string = '';
  quantity: { [key: number]: number } = {};

  showReviewsModal: boolean = false;
  selectedProduct: Product | null = null;
  productReviews: Review[] = [];

  // Manage quantities separately
  constructor(private toastr:ToastrService, private productService: ProductService, private cartService: CartService, private reviewService:ReviewService) { }
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = products;
      this.initQuantities();
    });
  }

  initQuantities(): void {
    this.filteredProducts.forEach(product => {
      this.quantity[product.productId] = 1;
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(
      product => product.productName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  increaseQuantity(productId: number): void {
    if (this.quantity[productId] < this.getProductStock(productId)) {
      this.quantity[productId]++;
    }
  }

  decreaseQuantity(productId: number): void {
    if (this.quantity[productId] > 0) {
      this.quantity[productId]--;
    }
  }

  getProductStock(productId: number): number {
    const product = this.products.find(p => p.productId === productId);
    return product ? product.stockQuantity : 0;
  }

  addToCart(product: Product, quantity: number): void {
    if (quantity > 0 && quantity <= product.stockQuantity) {
      this.cartService.addToCart(product, quantity);
      this.toastr.success(`${product.productName} has been added to the cart!`, 'Success');
    }
  }

  viewReviews(product: Product): void {
    this.selectedProduct = product;
    this.reviewService.getReviewsByProductId(product.productId).subscribe(reviews => {
      this.productReviews = reviews;
      this.toggleReviewsModal();
    });
  }
  toggleReviewsModal(): void {
    this.showReviewsModal = !this.showReviewsModal;
  }

}
