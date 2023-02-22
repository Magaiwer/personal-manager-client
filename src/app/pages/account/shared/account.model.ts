import {BaseResourceModel} from '../../../../shared/model/base-resource.model';

export class Account extends BaseResourceModel {
  constructor(public id?: number,
              public name?: String,
              public description?: String,
  ) {
    super();
  }

}

