import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { CloudinaryService } from 'src/app/services/cloudinaryService.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup;
  imageUrl: string;
  isEdit: boolean = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private cloudinaryService: CloudinaryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      coverImage: ['']
    });

    this.route.paramMap.subscribe(params => {
      const productId = +params.get('id');
      if (productId) {
        this.productService.getProductById(productId).subscribe(product => {
          this.productForm.patchValue(product);
          this.isEdit = true;
          this.productId = product.productId;
        });
      }
    });
  }

  uploadImage(event): void {
    const file = event.target.files[0];
    if (file) {
      this.cloudinaryService.uploadImage(file).subscribe(response => {
        this.imageUrl = response.secure_url;
        this.toastr.success('Image uploaded successful!', 'Success');
        this.productForm.patchValue({
          coverImage: this.imageUrl
        });
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if (this.isEdit) {
        this.productService.updateProduct(this.productId, product).subscribe(() => {
          this.toastr.success('Product updated successfully!', 'Success');
          this.router.navigate(['/adminviewproduct']);
        },
          error => {
            console.error('Error updating product:', error);
          });
      } else {
        this.productService.addProduct(product).subscribe(() => {
          this.toastr.success('Product created successfully', 'Success');
          this.router.navigate(['/adminviewproduct']);
        },
          error => {
            console.error('Error creating product:', error);
          });
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/adminviewproduct']);
  }
}
