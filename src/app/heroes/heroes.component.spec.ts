import {HeroesComponent} from "./heroes.component";
import {of} from "rxjs";

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55},
    ]

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockHeroService);
  })

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', function () {
      //arrange
      component.heroes = HEROES;
      mockHeroService.deleteHero.and.returnValue(of(true));

      //act
      component.delete(HEROES[2]);

      //assert
      expect(component.heroes.length).toBe(2);
      expect(component.heroes).not.toContain(jasmine.objectContaining(HEROES[2]));
    });

    it('should call deleteHero with the correct HERO', function () {
      //arrange
      component.heroes = HEROES;
      mockHeroService.deleteHero.and.returnValue(of(true));

      //act
      component.delete(HEROES[2]);

      //assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });

    it('should call deleteHero and subscribe to it', function () {
      //arrange
      component.heroes = HEROES;
      const restMock = of(true);
      spyOn(restMock, 'subscribe');
      mockHeroService.deleteHero.and.returnValue(restMock);

      //act
      component.delete(HEROES[2]);

      //assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
      expect(restMock.subscribe).toHaveBeenCalledWith();
    });
  })
})
