import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-myreview',
  templateUrl: './myreview.component.html',
  styleUrls: ['./myreview.component.css']
})
export class MyreviewComponent implements OnInit {
  reviews: Review[] = [];
  showProductModal: boolean = false;
  showDeleteModal: boolean = false;
  selectedProduct: Product | null = null;
  selectedReview: Review | null = null;
  constructor(private reviewService: ReviewService, private userStoreService: UserStoreService, private toastr:ToastrService) { }

  ngOnInit(): void {
    const userId = this.userStoreService.getUserId();
    console.log("id: ",userId);

    this.loadReviews(userId);
  }

  loadReviews(userId: number): void {
    this.reviewService.getReviewsByUserId(userId).subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    });
  }

  viewProduct(product: Product): void {
    this.selectedProduct = product; this.toggleProductModal();
  }

  confirmDeleteReview(review: Review): void {
    this.selectedReview = review;
    this.toggleDeleteModal();
  }

  deleteReview(review: Review): void {
    this.reviewService.deleteReview(review.reviewId).subscribe(() => {
      // this.toastr.success('Review Deleted successfully!', 'Success');
    });
    this.toastr.success('Review Deleted successfully!', 'Success');
    const userId = this.userStoreService.getUserId();
    this.loadReviews(userId);
    this.toggleDeleteModal();
  }

  toggleProductModal(): void {
    this.showProductModal = !this.showProductModal;
  }

  toggleDeleteModal(): void {
    this.showDeleteModal = !this.showDeleteModal;
  }

}
