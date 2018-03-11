/**
 * Algebraic structure Definition https://github.com/fantasyland/fantasy-land
 */
/*

/**
 * Setoid could be useful https://github.com/fantasyland/fantasy-land#setoid
 */
interface ISetoid<T> {
  equals(other: T): boolean;
}

/**
 * Monads should implement at least Applicative and Chain standards https://github.com/fantasyland/fantasy-land
 * Added also some other functionalities Functor, Applicative, Chain, Join
 */
interface IMonad<T> {
  value: T
  equals(val:T):boolean
  ap<U>(afn: IMonad<(val: T) => U>): IMonad<U>;
  map<U>(fn: (val: T) => U): IMonad<U>;
  flatMap<U>(fn: (val: T) => IMonad<U>): IMonad<U>;
}

/**
 * Factory Interface that creates a Monad
 */
interface IMonadFactory extends Function {
  <T>(val: T): IMonad<T>;
}

/**
 * Interface for static class that creates the Monad (e.g. Monad.of())
 */
interface IMonadStatic extends IMonadFactory{
  of: IMonadFactory; // alias for unit
}