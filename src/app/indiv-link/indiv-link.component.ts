import { Component, OnInit, Input } from '@angular/core';
import { RegexService } from '../regex.service';
import { LinkData } from '../link.service';

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

  @Input() link: LinkData;

  constructor(private regexService: RegexService) { }

  ngOnInit(): void {
    this.regexService.regexStr.subscribe((str) => this.regex = str);
  }

}
