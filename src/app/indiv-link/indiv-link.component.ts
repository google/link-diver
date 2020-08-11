import { Component, OnInit, Input } from '@angular/core';
import { LinkData, LinkService } from '../link.service';
import { ExpandCollapseAllService } from '../expand-collapse-all.service';
import { OptionsService } from '../options.service';

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
  showFullContent: boolean;

  @Input() link: LinkData;

  constructor(private optionsService: OptionsService,
    private ecaService: ExpandCollapseAllService,
    private linkService: LinkService) { }

  ngOnInit(): void {
    this.optionsService.regexStr.subscribe((str) => this.regex = str);
    this.ecaService.expandCollapseAll$.subscribe((expand: boolean) => {
      this.expand = expand;
    });
    this.optionsService.showFullContent$.subscribe((showFull: boolean) => {
      this.showFullContent = showFull;
    });
  }

  toggle(): void {
    this.expand = !this.expand;
  }

  highlight(): void {
    this.linkService.highlightLink(this.link)
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
