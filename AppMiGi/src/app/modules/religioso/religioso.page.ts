import { Component } from '@angular/core';

@Component({
  selector: 'app-religioso',
  templateUrl: './religioso.page.html',
  styleUrls: ['./religioso.page.scss'],
})
export class ReligiosoPage  {
  mainPredictionArray: { header: string; predictionImageURL: string; subject: string; title: string; id: string; chatResponse: any[]; }[];
  loginProfilePic: any;
  constructor() {
    this.showSlides();
   }
showSlides() {
  this.mainPredictionArray = [
      { "header": "Keyur Lasan", "predictionImageURL": "../../assets/img_catedral.jpg", "subject": " Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836. ", "title": " Founded in 1829", "id": "Keyur", "chatResponse": [] },

      { "header": "Milan Marvadi", "predictionImageURL": "../../assets/img_senorcaido.jpg", "subject": " Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836. ", "title": " Founded in 1829", "id": "Milan", "chatResponse": [] },

      { "header": "Shailesh Kotho", "predictionImageURL": "../../assets/img_procesion.jpg", "subject": " Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836. ", "title": " Founded in 1829", "id": "Shailesh", "chatResponse": [] }
    ]
}

}
