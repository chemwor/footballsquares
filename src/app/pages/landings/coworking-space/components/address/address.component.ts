import { Component } from '@angular/core'
import { LeafletModule } from '@bluehalo/ngx-leaflet'
import { latLng, tileLayer } from 'leaflet'
@Component({
  selector: 'coworking-space-address',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './address.component.html',
  styles: ``,
})
export class AddressComponent {
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
        position: [51.59, 0.3338],
        popup:
          '<div class=&#39;p-3&#39;><h6>Hi, we are in London</h6><p class=&#39;fs-sm pt-1 mt-n3 mb-0&#39;>Lorem ipsum dolor sit amet elit.</p></div>',
      },
      {
        position: [51.4074, 0.1838],
        popup:
          '<div class=&#39;p-3&#39;><h6>Hi, we are in London</h6><p class=&#39;fs-sm pt-1 mt-n3 mb-0&#39;>Lorem ipsum dolor sit amet elit.</p></div>',
      },
    ],
    center: latLng(51.5074, 0.29),
  }

  options1 = {
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
        position: [51.59, 0.3338],
        popup:
          '<div class=&#39;p-3&#39;><h6>Hi, we are in London</h6><p class=&#39;fs-sm pt-1 mt-n3 mb-0&#39;>Lorem ipsum dolor sit amet elit.</p></div>',
      },
      {
        position: [51.4074, 0.1838],
        popup:
          '<div class=&#39;p-3&#39;><h6>Hi, we are in London</h6><p class=&#39;fs-sm pt-1 mt-n3 mb-0&#39;>Lorem ipsum dolor sit amet elit.</p></div>',
      },
    ],
    center: latLng(51.5074, 0.29),
  }
}
