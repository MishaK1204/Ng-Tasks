import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-string-matcher',
  standalone: true,
  imports: [],
  templateUrl: './string-matcher.component.html',
  styleUrl: './string-matcher.component.scss'
})
export class StringMatcherComponent implements OnInit {
  @Input() baseString = 'ქონება';
  @Input() stringsToMatch = ['ქონება', 'ქონების პრივატიზება',
    'ქონების გასხვისება', 'საქონლის გასხვისება'];

  ngOnInit() {
  }

  simpleMatchPercentage(str1: string, str2: string) {
    let count = 0;
    for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
      if (str1[i] === str2[i]) {
        count++;
      }
    }
    return ((count / Math.min(str1.length, str2.length)) * 100).toFixed(2);
  }
}
