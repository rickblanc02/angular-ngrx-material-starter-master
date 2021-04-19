import { ComponentFixture, TestBed } from '@angular/core/testing';
//import { TranslateModule } from '@ngx-translate/core';
//import { SharedModule } from '../../../shared/shared.module';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

 

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [       
        //SharedModule,
        //TranslateModule.forRoot()
      ],
      declarations: [ ProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
