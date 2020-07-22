import { Component, OnInit, Input } from '@angular/core';
import { RegexService } from '../regex.service';
import { LinkData } from '../link.service';
import { ExpandCollapseAllService } from '../expand-collapse-all.service';

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

  constructor(private regexService: RegexService,
    private ecaService: ExpandCollapseAllService) { }

  ngOnInit(): void {
    this.regexService.regexStr.subscribe((str) => this.regex = str);
    this.ecaService.expandCollapseAll$.subscribe((expand: boolean) => {
      this.expand = expand;
    });
  }

  toggle(): void {
    this.expand = !this.expand;
  }

}
