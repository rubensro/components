import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy{
  
  ngOnInit(): void {
    this.startCountdown();
  }
  ngOnDestroy(): void {
    this.cleanTimeout();
  }

  @Input() init:number = null;
  public counter:number = 0;
  private countdownTimerRef: any = null;
  constructor() { }

  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  startCountdown(){
    if(this.init && this.init > 0){
      this.cleanTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown(){
    this.countdownTimerRef = setTimeout(()=>{
      this.counter -= 1;
      this.processCountdown();
    }, 1000);
  }

  private cleanTimeout(){
    if(this.countdownTimerRef){
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

  processCountdown(){
    // emit event Count
    this.onDecrease.emit(this.counter)
    console.log("counter is "+ this.counter);

    if(this.counter == 0){
      // emit event end count
      this.onComplete.emit();
      console.log("counter finished!");
    }else{
      // volvemos a correr la cuenta atras
      this.doCountdown();
    }
  }



}
