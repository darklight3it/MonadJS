import { setoid, functor, apply } from './common';

const isSome = (value: any) => value !== null && value !== undefined;
const isNone = (value: any) => !isSome(value);

const chain = function<T, U>(fn: (val: T) => IMonad<U>) {  
  const val = fn(this.lift());

  if(this.isSome())
    return val ;
  
  return isSome(val) ? val : this;
};

class Some<T> implements IMonad<T> {
  private _value: T;

  constructor(value: T) {
    if (isNone(value))
      throw 'A Some monad cannot be created from ' + value;

    this._value = value;
  }

  lift = () => this._value;
  of = (value: any) => new Some(value);
  map = functor;
  ap = apply;
  flatMap = chain;
  equals = setoid;
  isSome = () => true
  isNone = () => false
}

class None<T> implements IMonad<T> {
  private _value: T;

  constructor(value: T) {
    if (isSome(value)) throw 'A None monad cannot be created from ' + value;

    this._value = value;
  }

  lift = () => this._value;
  of = (value: any) => new None(value);
  map = functor;
  ap = apply;
  flatMap = chain;
  equals = setoid;
  isSome = () => false;
  isNone = () => true
}
class MaybeStatic implements IMonadStatic<any> {
  of =(value:any) => isSome(value) ? new Some(value) : new None(value);
  some = (value:any) => new Some(value);
  none = (value:any) => new None(value);
}

const maybeStatic = new MaybeStatic();

export { maybeStatic as Maybe, Some, None, MaybeStatic };
