import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subevent } from '../../../../models/subevent.models';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from '../../../../models/area.models';
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import { Event } from '../../../../models/event.models';

@Component({
  selector: 'app-subevent-preview',
  standalone: true,
  imports: [],
  templateUrl: './subevent-preview.component.html',
  styleUrl: './subevent-preview.component.css'
})
export class SubeventPreviewComponent implements OnInit {

  subevent: Subevent = null;
  event: Event = null;

  constructor() { }

  ngOnInit(): void {
    this.subevent = history.state.subevent;
    console.log(this.subevent)
    this.event = history.state.event;
  }

  print() {
    console.log("Printing...");
    const input = document.querySelector("table");
  
    html2canvas(input, {
      logging: true,
      useCORS: true
    }).then((canvas) => {
      const margin = { top: 20, right: 20, bottom: 20, left: 20 };
      const imgWidth = 300 - margin.left - margin.right;
      const pageHeight = 295 - margin.top - margin.bottom;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = margin.top;
  
      const imgData = canvas.toDataURL('image/png');
  
      const pdf = new jsPDF('l', 'mm', 'a4');
  
      // Add image to the first page with margins and centering
      pdf.addImage(imgData, 'PNG', margin.left, position, imgWidth, imgHeight);
      heightLeft -= pageHeight  - 65;
  
      // Loop to add additional pages with margins and centering
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin.left, position, imgWidth, imgHeight);
        
        pdf.setFontSize(10);
        heightLeft -= pageHeight - 45;
      }
  
      pdf.save(`${this.event.eventname}_${this.subevent.subpatrollingname}.pdf`);
    });
  }


  getRowSpan(area: Area): number {
    let totalLocations = 0;
    // area.sectors.forEach(sector => {
    //   totalLocations += sector.locations.length;
    // });
    for (let sector of area.sectors) {
      totalLocations += sector.locations?.length;
    }
    console.log(area.areaName, totalLocations)
    return totalLocations;
  }

}
