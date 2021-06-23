import {BaseResourceModel} from '../../../../shared/model/base-resource.model';

export class Category extends BaseResourceModel {
  constructor(public id?: number,
              public name?: String,
              public description?: String,
  ) {
    super();
  }

}

