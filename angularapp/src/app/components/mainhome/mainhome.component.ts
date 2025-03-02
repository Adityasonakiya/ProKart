import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.component.html',
  styleUrls: ['./mainhome.component.css']
})
export class MainhomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const map = L.map('map').setView([19.1183,73.0276], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    L.marker([19.1183,73.0276]).addTo(map).bindPopup('Base Location.<br> Mensa Campus.').openPopup();
  }

}
