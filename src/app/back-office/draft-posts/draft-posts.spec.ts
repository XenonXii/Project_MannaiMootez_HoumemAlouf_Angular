import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftPosts } from './draft-posts';

describe('DraftPosts', () => {
  let component: DraftPosts;
  let fixture: ComponentFixture<DraftPosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftPosts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftPosts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
