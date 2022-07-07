import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroService} from "../hero.service";
import {of} from "rxjs";
import {HeroesComponent} from "./heroes.component";
import {By} from "@angular/platform-browser";
import {HeroComponent} from "../hero/hero.component";
import {Directive, Input} from "@angular/core";

@Directive({
  selector: '[routerLink]',
  host: {'(click)' : 'onClick()'}
})
export class RouterLinkDirectiveStub{

  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
describe('HeroesComponent (Deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55},
    ]
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent,
        RouterLinkDirectiveStub
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ]
    })
    fixture = TestBed.createComponent(HeroesComponent);
  })

  it('should render each hero as a hero component', function () {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDEs.length).toEqual(3);

    for (let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero.name).toEqual(HEROES[i].name);
    }
  });

  it(`should call heroService.deleteHero when the Hero Component's
      delete button is clicked`, function () {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponentDEs[0].query(By.css('button'))
      .triggerEventHandler('click', {
        stopPropagation: () => {
        }
      });

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

  });

  it(`should call heroService.deleteHero when the Hero Component's
      delete event is called `, function () {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    (<HeroComponent>heroComponentDEs[0].componentInstance).delete.emit(undefined);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

  });

  it('should add a new hero to the hero list when the add button is clicked', function () {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();
    const name = 'Mr. Ice';

    mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 4}));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('ul')).nativeElement.textContent).toContain(name);

  });

  it('should have the correct route for the first hero', function () {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    let routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click',null);

    expect(routerLink.navigatedTo).toBe('/detail/1');
  });
})
