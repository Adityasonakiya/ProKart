import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-adminviewreviews',
  templateUrl: './adminviewreviews.component.html',
  styleUrls: ['./adminviewreviews.component.css']
})
export class AdminviewreviewsComponent implements OnInit {
  reviews: Review[] = [];
  filteredReviews: Review[] = [];
  searchText: string = '';
  sortOrder: string = 'ascending';
  showProductModal: boolean = false;
  showProfileModal: boolean = false;
  selectedProduct: Product | null = null;
  selectedUser: User | null = null;
  constructor(private reviewService: ReviewService) { }
  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getAllReviews().subscribe((reviews: Review[]) => {
      this.reviews = reviews;
      this.filteredReviews = reviews;
    });
  }

  filterReviews(): void {
    this.filteredReviews = this.reviews.filter(
      review => review.product.productName.toLowerCase().includes(this.searchText.toLowerCase())
        || review.reviewText.toLowerCase().includes(this.searchText.toLowerCase())
        || review.date.includes(this.searchText));
  }

  sortReviews(): void {
    this.filteredReviews.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return this.sortOrder === 'ascending' ? dateA - dateB : dateB - dateA;
    });
  }

  viewProduct(product: Product): void {
    this.selectedProduct = product;
    this.toggleProductModal();
  }

  viewProfile(user: User): void {
    this.selectedUser = user;
    this.toggleProfileModal();
  }

  toggleProductModal(): void {
    this.showProductModal = !this.showProductModal;
  }

  toggleProfileModal(): void {
    this.showProfileModal = !this.showProfileModal;
  }
}
