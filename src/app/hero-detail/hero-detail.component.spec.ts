import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroDetailComponent} from "./hero-detail.component";
import {HeroService} from "../hero.service";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute;
  let mockHeroService;
  let mockLocation;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3'
          }
        }
      }
    }
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [FormsModule],
      providers: [
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocation},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}));

  })

  it('should render a Hero name in a h2 tag', function () {
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toContain('SUPERDUDE');
  });
})
