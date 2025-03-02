import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviewText: string = '';
  rating: number = 0;
  stars: boolean[] = [false, false, false, false, false];
  product: Product | null = null;

  constructor(private reviewService: ReviewService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private userStoreService: UserStoreService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  setRating(rating: number): void {
    this.rating = rating;
    this.stars = this.stars.map((_, i) => i < rating);
  }

  submitReview(): void {
    const user: User = this.userStoreService.getUser();
    const id = +this.route.snapshot.paramMap.get('id');

    this.productService.getProductById(id).subscribe(product => {
      this.product = product;

      const review: Review = {
        reviewText: this.reviewText,
        rating: this.rating,
        date: new Date().toISOString(),
        user: user,
        product: this.product
      };

      this.reviewService.addReview(review).subscribe(response => {
        this.toastr.success('Review Added Successfully!', 'Success');
        this.reviewText = '';
        this.rating = 0;
        this.stars = [false, false, false, false, false];
      }, error => {
        console.error('Error submitting review:', error);

        this.toastr.error('Failed to submit review. Please try again.', 'Error');
      });
    }, error => {
      console.error('Error fetching product:', error);
      alert('Failed to fetch product. Please try again.');
    });
  }
}
