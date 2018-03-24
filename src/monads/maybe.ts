import { setoid, functor, apply, chain } from './common';

const application: IApplication<any> = (value: any) => value ? new SomeMonad(value) : new NoneMonad(value);

class SomeMonad<T> implements IMonad<T> {
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

var Maybe = function(): IMonadStatic {
  let maybeStatic = <IMonadStatic>function(value: any) {};

  maybeStatic.of = application;

  return maybeStatic;
};

class NoneMonad<T> implements IMonad<T> {
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

var Maybe = function(): IMonadStatic {
  let maybeStatic = <IMonadStatic>function(value: any) {};

  maybeStatic.of = application;

  return maybeStatic;
};


export default Maybe();
