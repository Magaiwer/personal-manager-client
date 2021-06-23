import {Category} from '../../category/shared/category.model';
import {BaseResourceModel} from '../../../../shared/model/base-resource.model';

export class Transaction extends BaseResourceModel {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public type?: string,
    public amount?: number,
    public date?: string,
    public enabled?: boolean,
    public categoryId?: number,
    public category?: Category,
  ) {
    super();
  }

  static TYPES = {
    DESPESA: 'EXPENSE',
    RECEITA: 'INCOME',
  };
}


