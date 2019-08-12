import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private results:any[];
  loading = false;
  text = '';

  constructor(private http: HttpClient) {}

  handleSubmit(evt) {
    evt.preventDefault();

    this.loading = true;

    this.http.get(`https://us-central1-scraper-58e5f.cloudfunctions.net/widgets/posts/images/${this.text}`)
    .subscribe((res:any[]) => {
      this.results = res;
    });

  }

  handleChange(evt) {
    this.text = evt.target.value;
  }

}
