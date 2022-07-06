import {StrengthPipe} from "./strength.pipe";

describe('strength pipe ', () => {
  it('should display weak if strength is 5', function () {
    let pipe = new StrengthPipe();

    let value  = pipe.transform(5);

    expect(value).toEqual('5 (weak)');
  });

  it('should display strong if strength is in between >=10 and <20', function () {
    let pipe = new StrengthPipe();

    let value = pipe.transform(10);

    expect(value).toEqual('10 (strong)');
  });

  it('should display strong if strength is > 20', function () {
    let pipe = new StrengthPipe();

    let value = pipe.transform(20);

    expect(value).toEqual('20 (unbelievable)');
  });
})
