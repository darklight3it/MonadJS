
const concreteMap : IFunctor = <T,U>(fn: (val:T)=>U) => new IdentityMonad<any>(fn(this.value));
const concreteApply : IApply = <T,U>(afn: IMonad<(val: T) => U>) => afn.map<T,U>(this.value());


class IdentityMonad<T> implements IMonad<T> {
  public value: T;

  constructor(value: T) {
    this.value = value;
    this.map = concreteMap;
    this.ap = concreteApply;
  }

  map: IFunctor;
  ap: IApply;
  equals = (other: T) => other === this.value;

  flatMap = <U>(fn: (val: T) => IMonad<U>): IMonad<U> => fn(this.value);
}


var Identity = function(): IMonadStatic {
  let identityStatic = <IMonadStatic>function(value: any) {};

  identityStatic.of = (value: any) => new IdentityMonad(value);

  return identityStatic;
};

export default Identity();
