import { Observable, Observer } from "rxjs";

const observer: Observer<string> = {
  next: (data) => {
    console.log(data);
  },
  error: (err) => {
    console.error(err);
  },
  complete: () => {
    console.info("completed");
  },
};

const obs$ = new Observable<string>((subs) => {
  subs.next("taka");
  subs.next("taka 2");

  subs.complete();

  subs.next("taka");
});

obs$.subscribe(observer);
