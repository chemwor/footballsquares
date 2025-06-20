import { Component } from '@angular/core'
import { LeafletModule } from '@bluehalo/ngx-leaflet'
import { latLng, tileLayer } from 'leaflet'

@Component({
  selector: 'contactv3-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styles: ``,
})
export class MapComponent {
  options = {
    layers: [
      tileLayer(
        'https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key=BO4zZpr0fIIoydRTOLSx',
        {
          maxZoom: 18,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        }
      ),
    ],
    zoom: 10,
    scrollWheelZoom: false,
    markers: [
      {
        position: [28.5384, -81.3789],
        popup:
          '<div class="p-3"><h6>We are in Orlando, FL</h6><p class="fs-sm pt-1 mt-n3 mb-0">514 Magnolia St. Orlando, FL 32806</p></div>',
      },
    ],
    center: latLng(28.5384, -81.3789),
  }
}
