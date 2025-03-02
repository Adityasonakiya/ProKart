import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-adminviewproduct',
  templateUrl: './adminviewproduct.component.html',
  styleUrls: ['./adminviewproduct.component.css']
})
export class AdminviewproductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  searchText: string = '';
  selectedCategory: string = '';
  showDeleteModal: boolean = false;
  selectedProduct: Product;

  constructor(private productService: ProductService, private router: Router,private toastr:ToastrService) { }
  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        this.filteredProducts = products;
        this.categories = [...new Set(products.map(product => product.category))];
      });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(
      product => product.productName.toLowerCase().includes(this.searchText.toLowerCase())
        && (this.selectedCategory === '' || product.category === this.selectedCategory));
  }

  editProduct(product: Product): void {
    this.router.navigate(['/product-create', product.productId]);
  }


  confirmDelete(product: Product): void {
    this.selectedProduct = product; this.showDeleteModal = true;
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.selectedProduct.productId).subscribe(
      () => {
        this.products = this.products.filter(p => p.productId !== this.selectedProduct.productId);
        this.toastr.success('Product deleted!', 'Success');
        this.filteredProducts = this.filteredProducts.filter(p => p.productId !== this.selectedProduct.productId);
        this.showDeleteModal = false;
      });
  }

  cancelDelete(): void {
    this.showDeleteModal = false; this.selectedProduct = null;
  }
}
