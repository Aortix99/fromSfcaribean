import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterColaborator'
})
export class FilterColaboratorPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '' || arg.length < 3)
      return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.cdusuario.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      }
    };
    return resultPosts;
  }

}
