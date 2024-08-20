import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search-toolbar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, SplitButtonModule, InputTextModule, MatIconModule, MatButtonModule],
  templateUrl: './search-toolbar.component.html',
  styleUrl: './search-toolbar.component.css'
})
export class SearchToolbarComponent implements OnInit  {
  items: MenuItem[] | undefined;

  constructor(private route: ActivatedRoute, private router: Router) { }


    ngOnInit() {
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Delete',
                icon: 'pi pi-times'
            }
        ];
    }
    
  navigateToCreateEvent() {
    console.log("+ button clicked!");
    this.router.navigate(['events/create/subevent']);

    // const currentPath = this.router.url;
    // console.log(currentPath)
    // this.router.navigate([`${currentPath}/edit`], { relativeTo: this.route });

  }
}