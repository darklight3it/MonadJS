import { setoid, functor, apply, chain } from './common';

const isSome = (value: any) => value !== null && value !== undefined;
const isNone = (value: any) => !isSome(value);

class Some<T> implements IMonad<T> {
  private _value: T;

  constructor(value: T) {
    if (isNone(value))
      throw 'A Some monad cannot be created from' + value.toString();

    this._value = value;
  }

  lift = () => this._value;
  of = (value: any) => new Some(value);
  map = functor;
  ap = apply;
  flatMap = chain;
  equals = setoid;
}

class None<T> implements IMonad<T> {
  private _value: T;

  constructor(value: T) {
    if (isSome(value))
      throw 'A None monad cannot be created from' + value.toString();

    this._value = value;
  }

  lift = () => this._value;
  of = (value: any) => new None(value);
  map = functor;
  ap = apply;
  flatMap = chain;
  equals = setoid;
}



const MaybeStatic = (function(): IMonadStatic {
  let maybeStatic = <IMonadStatic>function(value: any) {};

  maybeStatic.of = (value: any) =>
    isSome(value) ? new Some(value) : new None(value);
    

  return maybeStatic;
})();

export { MaybeStatic as Maybe, Some, None};
