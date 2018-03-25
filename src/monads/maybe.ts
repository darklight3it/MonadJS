import { setoid, functor, apply, chain } from './common';

const isSome = (value: any) => value !== null && value !== undefined;
const isNone = (value: any) => !isSome(value);

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
  isSome = isSome;
  isNone = isNone;
}

class None<T> implements IMonad<T> {
  private _value: T;

  constructor(value: T) {
    if (isSome(value))
      throw 'A None monad cannot be created from ' + value;

    this._value = value;
  }

  lift = () => this._value;
  of = (value: any) => new None(value);
  map = functor;
  ap = apply;
  flatMap = chain;
  equals = setoid;
  isSome = isSome;
  isNone = isNone;
}
export class MaybeStatic implements IMonadStatic<any> {
  of =(value:any) => isSome(value) ? new Some(value) : new None(value);
  some = (value:any) => new Some(value);
  none = (value:any) => new None(value);
}

const maybeStatic = new MaybeStatic();

export { maybeStatic as Maybe, Some, None };
