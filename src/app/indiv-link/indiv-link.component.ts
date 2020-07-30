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

  readonly highlightColor: string = 'rgb(253, 255, 71)'
  nextBgColor: string = this.highlightColor;

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
    this.linkService.highlightLink(this.link, this.nextBgColor)
        .then((prevColor: string) => this.nextBgColor = prevColor)
        .catch((error: Error) => console.error(error));
  }
}
