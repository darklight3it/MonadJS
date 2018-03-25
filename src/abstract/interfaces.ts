/**
 * Algebraic structure Definition https://github.com/fantasyland/fantasy-land
 */
/*

/**
 * Setoid could be useful https://github.com/fantasyland/fantasy-land#setoid
 */
interface ISetoid<T> {
  equals(other: ISetoid<T>): boolean;
}

interface IFunctor<T> {
  <U>(fn: (val: T) => U): IMonad<U>;
}

interface IApply<T> {
  <U>(afn: IMonad<(val: T) => U>): IMonad<U>;
}

interface IApplication<T> {
  (val: T): IMonad<T>;
}

interface IChain<T> {
  <U>(fn: (val: T) => IMonad<U>): IMonad<U>;
}

/**
 * Monads should implement at least Applicative and Chain standards https://github.com/fantasyland/fantasy-land
 * Added also some other functionalities Functor, Applicative, Chain, Join
 */
interface IMonad<T> extends ISetoid<T> {
  lift: () => T;
  of: IApplication<T>;
  ap: IApply<T>;
  map: IFunctor<T>;
  flatMap: IChain<T>;
}

/**
 * Interface for static class that creates the Monad (e.g. Monad.of())
 */
interface IMonadStatic<T> {
   of: IApplication<T>; // alias for unit
}
