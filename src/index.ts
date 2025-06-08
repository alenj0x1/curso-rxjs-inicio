import { Observable } from "rxjs";

const obs$ = new Observable<string>((subs) => {
  subs.next("taka");
  subs.next("taka 2");

  subs.complete();

  subs.next("taka");
});

obs$.subscribe((resp) => console.log(resp));
