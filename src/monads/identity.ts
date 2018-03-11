class IdentityMonad<T> implements IMonad<T> {
  public value: T;

  constructor(value:T){
    this.value = value
  }
  
  equals = (other:T) => other === this.value;
  map = <U>(fn: (val: T) => U): IMonad<U> => new IdentityMonad(fn(this.value));
  flatMap = <U>(fn: (val: T) => IMonad<U>): IMonad<U> => fn(this.value);
  ap = <U>(afn: IMonad<(val:T) => U>) : IMonad<U> => afn.map(fn => fn(this.value));
}

var Identity = function(): IMonadStatic {
  let identityStatic = <IMonadStatic>function(value: any) {};

  identityStatic.of = (value: any) => new IdentityMonad(value);

  return identityStatic;
};

export default Identity();
