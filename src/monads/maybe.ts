import { setoid, functor, apply } from './common';

const isEmpty = (value: any) => value !== null || value !== undefined;

const chain = function<T, U>(fn: (val: T) => IMonad<U>) {  
  return this.isNone() ? this : fn(this.lift());
};

class Some<T> implements IMonad<T> {
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  lift = () => this._value;
  of = (value: T) => new Some(value);
  map = functor;
  ap = apply;
  flatMap = chain;
  equals = setoid;
  isSome = () => true
  isNone = () => false
}

class None implements IMonad<any> {
  constructor() {}

  lift = () => { throw "Cannot get a value from None" };
  of = (value: any) => new None();
  map = functor;
  ap = apply;
  flatMap = chain;
  equals = setoid;
  isSome = () => false;
  isNone = () => true;
}


class MaybeStatic implements IMonadStatic<any> {
  of = (value:any) => !isEmpty(value) ? new Some(value) : new None();
}

const maybeStatic = new MaybeStatic();

export { maybeStatic as Maybe, Some, None, MaybeStatic };
