import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringMatcherComponent } from './string-matcher.component';

describe('StringMatcherComponent', () => {
  let component: StringMatcherComponent;
  let fixture: ComponentFixture<StringMatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StringMatcherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StringMatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
