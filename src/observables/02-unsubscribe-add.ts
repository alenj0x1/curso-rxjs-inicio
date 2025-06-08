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

  setTimeout(() => {
    subscriber.complete();
  }, 2500);

  return () => {
    clearInterval(interval);
    console.log("interval destroyed");
  };
});

const sub1 = interval$.subscribe(observer);
const sub2 = interval$.subscribe(observer);
const sub3 = interval$.subscribe(observer);

sub1.add(sub2);
sub1.add(sub3);

setTimeout(() => {
  sub1.unsubscribe();
  console.log("completed timeout");
}, 6000);
