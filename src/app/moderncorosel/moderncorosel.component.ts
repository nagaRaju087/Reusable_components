import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-moderncorosel',
  templateUrl: './moderncorosel.component.html',
  styleUrls: ['./moderncorosel.component.css']
})
export class ModerncoroselComponent {
  currentIndex: number = 0;
  cards!: NodeListOf<Element>;

  constructor() { }

  ngOnInit(): void {
    // Initialize cards and add event listeners
    this.cards = document.querySelectorAll('.carousel-card') as NodeListOf<Element>;
  
    // Calculate the initial currentIndex for centering the active card
    const numCards = this.cards.length;
    this.currentIndex = Math.floor(numCards / 2);
  
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
  
    if (prevButton && nextButton) {
      prevButton.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.updateCarousel();
      });
  
      nextButton.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.updateCarousel();
      });
    }
  
    // Initially center the active card
    this.updateCarousel();
  }
  
  updateCarousel() {
    const offset = -this.currentIndex * (100 + 2 * 10) + ((100 + 2 * 10) / 2); // Centered offset
    const carousel = document.querySelector('.carousel') as HTMLElement;
  
    // Use `style.transform` to update the CSS transform property
    carousel.style.transform = `translateX(${offset}px)`;
  
    // Remove the 'active' class from all cards and add it to the current card
    this.cards.forEach(card => card.classList.remove('active'));
    this.cards[this.currentIndex].classList.add('active');
  }
  prevCard() {
    this.currentIndex = (this.currentIndex - 0 + this.cards.length) % this.cards.length;
    this.updateCarousel();
  }
  
  nextCard() {
    this.currentIndex = (this.currentIndex + 0) % this.cards.length;
    this.updateCarousel();
  }
  
  
}
