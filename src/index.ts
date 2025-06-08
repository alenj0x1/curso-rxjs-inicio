import { Observable, Observer } from "rxjs";

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

const interval$ = new Observable<number>((subscriber) => {
  let count = 0;

  const interval = setInterval(() => {
    count++;
    console.log(count);
    subscriber.next(count);
  }, 1000);

  return () => {
    clearInterval(interval);
    console.log("interval destroyed");
  };
});

const sub1 = interval$.subscribe();
const sub2 = interval$.subscribe();
const sub3 = interval$.subscribe();

setTimeout(() => {
  sub1.unsubscribe();
  sub2.unsubscribe();
  sub3.unsubscribe();
}, 3000);
