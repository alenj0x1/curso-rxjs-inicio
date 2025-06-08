import { Observable, Observer, Subject } from "rxjs";

const observer: Observer<number> = {
  next: (data) => {
    console.log("next: ", data);
  },
  error: (err) => {
    console.error("error", err);
  },
  complete: () => {
    console.info("completed");
  },
};

const intervals$ = new Observable<number>((sub) => {
  const intervalId = setInterval(() => {
    sub.next(Math.floor(Math.random() * 100 - 1));
  }, 1000);

  return () => {
    clearInterval(intervalId);
  };
});

/**
 * 1. Casteo múltiple
 * 2. También es un Observer
 * 3. Next, error y complete
 */
const subject$ = new Subject<number>();
const subscription = intervals$.subscribe(subject$);

// const sub1 = intervals$.subscribe((rnd) => console.log("sub1", rnd));
// const sub2 = intervals$.subscribe((rnd) => console.log("sub2", rnd));

subject$.subscribe(observer);
subject$.subscribe(observer);

setTimeout(() => {
  subject$.next(10);
  subject$.complete();
  subscription.unsubscribe();
}, 3500);
