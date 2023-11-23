import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRedirectComponent } from './user-redirect.component';

describe('UserRedirectComponent', () => {
  let component: UserRedirectComponent;
  let fixture: ComponentFixture<UserRedirectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRedirectComponent]
    });
    fixture = TestBed.createComponent(UserRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
