import { Component } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'cc-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects = [
    {
      images: [
        { src: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3', title: 'Memory' },
        { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', title: 'Wedding' }
      ]
    },
    {
      images: [
        { src: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3', title: 'Portrait' },
        { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', title: 'Travel' }
      ]
    },
    {
      images: [
        { src: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3', title: 'Wedding' },
        { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', title: 'Memory' }
      ]
    },
    {
      images: [
        { src: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3', title: 'Fashion' },
        { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', title: 'Portrait' }
      ]
    }
  ];

  constructor(private lightbox: Lightbox) {}

  ngOnInit(): void {
  }

  openLightbox(index: number, image: any): void {
    const album = this.projects[index].images.map((img: any) => ({
      src: img.src,
      caption: img.title,
      thumb: img.src
    }));
    this.lightbox.open(album, 0);
  }

  closeLightbox(): void {
    this.lightbox.close();
  }
}
