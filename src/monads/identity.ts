import { setoid, functor, apply, chain } from './common';

const application: IApplication<any> = (value: any) => new IdentityMonad(value);

class IdentityMonad<T> implements IMonad<T> {
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  lift = () => this._value;
  of = application;
  map = functor;
  ap = apply;
  flatMap = chain;
  equals = setoid;
}

const Identity = function(): IMonadStatic {
  let identityStatic = <IMonadStatic>function(value: any) {};

  identityStatic.of = application;

  return identityStatic;
}();

export default Identity;
