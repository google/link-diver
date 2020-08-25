import { Component, OnInit, Input } from '@angular/core';
import { ChromeLinkService } from '../chrome-api.service';
import { CrossComponentDataService } from '../cross-component-data.service';
import { LinkData } from '../interfaces';

/**
 * Responsible for displaying information about one individual link within
 * the link-list component
 */
@Component({
  selector: 'app-indiv-link',
  templateUrl: './indiv-link.component.html',
  styleUrls: ['./indiv-link.component.css']
})
export class IndivLinkComponent implements OnInit {

  regex: string;
  expand: boolean;
  showDOMSource: boolean;

  @Input() link: LinkData;

  constructor(private ccdService: CrossComponentDataService,
    private chromeLinkService: ChromeLinkService) { }

  ngOnInit(): void {
    this.ccdService.regexStr.subscribe((str) => this.regex = str);
    this.ccdService.expandCollapseAll$.subscribe((expand: boolean) => {
      this.expand = expand;
    });
    this.ccdService.showDOMSource$.subscribe((showSource: boolean) => {
      this.showDOMSource = showSource;
    });
  }

  toggle(): void {
    this.expand = !this.expand;
  }

  highlight(): void {
    this.chromeLinkService.highlightLink(this.link)
        .then((newHighlight: boolean) => this.link.highlighted = newHighlight)
        .catch((error: string) => {
          if (error === 'link not found') {
            alert('Could not find the selected link on the original page. ' +
            'Link Diver\'s data could be out of date, ' +
            'please try reloading Link Diver to get the most current links.');
          }
          console.error('Error Highlighting Link: ' + error);
        });
  }
}
