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
  expand: boolean = false;

  @Input() link: LinkData;

  constructor(private optionsService: OptionsService,
    private ecaService: ExpandCollapseAllService,
    private linkService: LinkService) { }

  ngOnInit(): void {
    this.optionsService.regexStr.subscribe((str) => this.regex = str);
    this.ecaService.expandCollapseAll$.subscribe((expand: boolean) => {
      this.expand = expand;
    });
  }

  toggle(): void {
    this.expand = !this.expand;
  }

  highlight(): void {
    this.linkService.highlightLink(this.link)
        .then(() => this.link.highlighted = !this.link.highlighted)
        .catch((error: string) => {
          console.log(error);
          if (error === 'highlight conflict') {
            this.link.highlighted = true;
            console.error('This link has already been highlighted');
          } else {
            console.error(error);
          }
        });
  }
}
