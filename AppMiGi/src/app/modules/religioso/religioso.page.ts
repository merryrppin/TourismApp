import { Component } from '@angular/core';

@Component({
  selector: 'app-religioso',
  templateUrl: './religioso.page.html',
  styleUrls: ['./religioso.page.scss'],
})
export class ReligiosoPage  {
  mainPredictionArray: { header: string; predictionImageURL: string; subject: string; }[];
  loginProfilePic: any;
  constructor() {
    this.showSlides();
   }
showSlides() {
  this.mainPredictionArray = [
      { "header": "Catedral nuestra señora del rosario", "predictionImageURL": "../../assets/img_catedral.jpg", "subject": "Un maravilloso lugar lleno de magia, paz y sobre todo de una devoción religiosa única. Con un estilo único e inigualable es uno de los lugares mas frecuentado en girardota" },

      { "header": "Milan Marvadi", "predictionImageURL": "../../assets/img_senorcaido.jpg", "subject": " Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836. " },

      { "header": "Shailesh Kotho", "predictionImageURL": "../../assets/img_procesion.jpg", "subject": " Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836. "}
    ]
}

}
