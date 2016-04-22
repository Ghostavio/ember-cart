import Ember from 'ember';

export function truncateWords(params) {
  if (params[0]) {
    let string = params[0].substr(0, params[1]);

    //truncate again if in the middle of a word
    string = string.substr(0, Math.min(string.length, string.lastIndexOf(' ')));
    return string;
  }
}

export default Ember.Helper.helper(truncateWords);
