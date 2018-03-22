import * as deepEqual from 'fast-deep-equal';

const setoid = function(other: ISetoid<any>) {
  if(this === other)
    return true;
    
  return deepEqual(this, other);
}

const functor: IFunctor<any> = function<U>(fn: (val: any) => U) {
  return this.of(fn(this.lift()));
};


const apply: IApply<any> = function<U>(afn: IMonad<((val: any) => U)>) {
    return this.map(afn.lift());
  };



export  {setoid, functor, apply} ;