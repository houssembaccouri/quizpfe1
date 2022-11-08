import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  } from '@sweetalert2/ngx-sweetalert2';

import { interval } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';



interface questions{
  question:String;
  answers:Array<String>;
}


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  
  questions1 : questions = {
    question : "what is the version of docker?",
    answers:["Docker version 20.10.21","Docker version 20.10.18","Docker version 20.10.17","Docker version 20.10.16"]
  } 
  questions2 : questions = {
    question : "How many containers are running?",
    answers:["2","3","4","5"]
  } 
  questions3 : questions = {
    question : "which the last port exposed for the last container are running",
    answers:["8080","3000","4200","22"]
  } 
  questions4 : questions = {
    question : "how many images docker?",
    answers:[" 2","3","4","5"]
  } 
  questions5 : questions = {
    question : "what is the name of the last image running?",
    answers:["wetty","nginx","CSS","JAVASCRIPT"]
  } 
  questions6 : questions = {
    question : "What is the name of network by default?",
    answers:["bridge","docker network","docker net","network"]
  } 
  questions7 : questions = {
    question : "what is version of jenkins?",
    answers:["Libanon","Algeria","Tunisia","Palestaine"]
  } 
  questions8 : questions = {
    question : "What is the version of git?",
    answers:["git version 2.17.1","git version 2.17.2","git version 2.17.3","git version 2.17.4"]
  } 
  questions9 : questions = {
    question : "what is the version of node?",
    answers:["v14.21.1","v14.21.11","v14.21.13","v14.21.15"]
  } 
  
  
  
  Allquestion : questions[] = [this.questions1,this.questions2,this.questions3,this.questions4,this.questions5,this.questions6
    ,this.questions7,this.questions8,this.questions9]
  
  i=0;
  correct=0;
  buttonDisabled:boolean = false;
  second: number = 59;
  minute: number = 8;
  maxtime: number = 60;
  ids:string = `road${this.i+1}`
  constructor( private router: Router ) {}

  ngOnInit(){
    
    interval(1000).subscribe(()=>{
      
      this.second -= 1
      this.maxtime -=1
      if(this.minute == 0 && this.second == 0)
      {
        this.router.navigateByUrl("/launch")
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonText: 'Relaunch Quizz',
          cancelButtonText:'EXIT',
          showCancelButton: true,
          text: `Time is up! Result of your test ${this.correct}/${this.Allquestion.length}`,
        }).then((result)=>{
          if(result.isConfirmed)
        {
          location.reload();
        }
        else
        {
          this.router.navigateByUrl("/launch")
        }
        })
      } 
      else if(this.second <= 0)
      {
        this.minute -= 1
        this.second = 60
      }
      if(this.maxtime <= 0)
      {
        this.SkipQuestion() ;
      }
      
     
    })
    
    
    this.currentQuestion()
    
    
    
  }

  CheckAnswer(idname:any,answer:any)
  {
    this.buttonDisabled = true;
    let elem: HTMLElement = document.getElementById(idname)!;
    let questionList: HTMLElement = document.getElementById(this.ids)!;

    if(answer == 'Docker version 20.10.21' || answer == '3000' || answer == 'bridge' || answer == 'nginx' || answer == '2' || answer == '4'|| answer == 'git version 2.17.1'|| answer == 'v14.21.1')
    {
      elem.style.backgroundColor = "green";
      questionList.style.backgroundColor = "green"
      this.correct +=1
    }
    else
    {
      elem.style.backgroundColor = "red";
      questionList.style.backgroundColor = "red";
    }
    this.nextQuestion(idname);
  }
  
  nextQuestion(idname:any)
  {
    let elem: HTMLElement = document.getElementById(idname)!;
    elem.style.backgroundColor = "rgba(95, 95, 95, 0.795)";
    this.i+= 1;
    this.maxtime = 60;
    this.buttonDisabled = false;
    this.ids = `road${this.i+1}`

    this.currentQuestion()
    
  }
  
  SkipQuestion()
  {
    let questionList: HTMLElement = document.getElementById(this.ids)!;
    questionList.style.backgroundColor = "red";
    this.i +=1;
    this.maxtime = 60;
    this.ids = `road${this.i+1}`
    this.currentQuestion()
    
  }  

  currentQuestion()
  {
    if(this.i < 9)
    {
      let questionList: HTMLElement = document.getElementById(this.ids)!;
      questionList.style.backgroundColor = "rgb(158, 158, 4)";
    }
    else
    {
      Swal.fire({
        title: `Result of your test ${this.correct}/${this.Allquestion.length}`,
        confirmButtonText: 'Relaunch Quizz',
        cancelButtonText:'EXIT',
        showCancelButton: true,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result)=>{
        if(result.isConfirmed)
        {
          location.reload();
        }
        else
        {
          this.router.navigateByUrl("/launch")
        }
      })
    }
  }

  confirmBox(){
    
  }

  confirmSkip()
  {
    Swal.fire({
      title: 'Are you sure?<br>That jump will be a incorrect question!!',
      showCancelButton: true,
      confirmButtonText: 'NEXT',
      icon: 'warning',
      confirmButtonColor: 'red',
      cancelButtonColor: 'green',
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.SkipQuestion()
      } 
    })
  }
  
  confirmExit()
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You will certainly leave this tour!',
      showCancelButton: true,
      confirmButtonText: 'EXIT',
      confirmButtonColor: 'red',
      cancelButtonColor: 'green',
    }).then((result)=>{
      if(result.isConfirmed)
      {
        Swal.fire('Sorry ,We Hope you enjoy our quiz next time 🥺🥺', '', 'info')
        this.router.navigateByUrl("/launch")
      }
      else
      {
        Swal.fire("We are glad you don't let that happen! 😍😍", '', 'success')
      }
    })
  }
  confirmResult()
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will not be able to answer the remaining questions !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, skip it!'
    }).then((result) => {
      if (result.isConfirmed) 
      {
        Swal.fire(`Result of your test ${this.correct}/${this.Allquestion.length}`,'','success')
        this.router.navigateByUrl("/launch")
      }
    })
  }
}
