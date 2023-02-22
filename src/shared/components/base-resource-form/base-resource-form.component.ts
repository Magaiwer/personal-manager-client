import {ActivatedRoute, Router} from '@angular/router';
import {NbComponentStatus, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Component, EventEmitter, Inject, Injector, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {switchMap} from 'rxjs/operators';

import {BaseResourceModel} from '../../model/base-resource.model';
import {BaseResourceService} from '../../service/base-resource.service';
import {interval} from 'rxjs';

@Component({
  template: '',
})
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, OnDestroy {
  resourceForm: FormGroup;
  currentAction: string;
  protected route: ActivatedRoute;

  protected router: Router;
  protected formBuilder: FormBuilder;
  protected renderer: Renderer2;
  private toastService: NbToastrService;
  public resource: T;

  static resourceLoadedEmitter = new EventEmitter();

  protected constructor(protected injector: Injector,
                        protected resourceService: BaseResourceService<T>,
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
    this.toastService = this.injector.get(NbToastrService);
    this.renderer = this.injector.get(Renderer2);
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngOnDestroy(): void {

  }

  setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  async loadResource() {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(
          switchMap(params => this.resourceService.findById(+params.get('id'))),
        )
        .subscribe(
          resource => {
            BaseResourceFormComponent.resourceLoadedEmitter.emit(resource);
            this.resource = resource;
            // @ts-ignore
            this.resource?.date = this.textToDate(this.resource?.date);
            this.resourceForm.patchValue(resource, {emitEvent: true});
          },
          error => this.showToast('danger', 'Ocorreu um erro no servidor, tente mais tarde.'),
        )
      ;
    }
  }

  onSubmit(): void {
    if (this.resourceForm.valid) {
      const resource: T = this.resourceForm.value;
      if (resource.id) {
        this.update(resource);
      } else {
        this.save(resource);
      }
    }
  }

  private save(resource: T) {
    this.resourceService.save(resource)
      .subscribe(
        () => this.actionsForSuccess('Item salvo com sucesso'),
        error => this.actionsForError(error),
      );
  }

  private update(resource: T) {
    this.resourceService.update(resource)
      .subscribe(
        () => this.actionsForSuccess('Item atualizado com sucesso'),
        error => this.actionsForError(error),
      );
  }

  protected actionsForSuccess(message: string) {
    this.showToast('success', message);
    this.reset();
    /*    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
        this.router.navigateByUrl(baseComponentPath, {skipLocationChange: false}).then(
          () => this.router.navigate([baseComponentPath]),
        );*/
  }

  protected actionsForError(error) {
    let message = 'Ocorreu um erro ao processar a sua solicitação!';
    if (error.status === 401) {
      /*
      this.router.navigate(["/401"]);
      */
    } else if (error.status === 400) {
      message = error.error.userMessage ? error.error.userMessage : message;
      this.showToast('danger', message);
    } else {
      this.showToast('danger', message);
    }
  }

  protected showToast(status: NbComponentStatus, message: String) {
    this.toastService.show(message, null, {status});
  }

  protected setFocus(attr: String) {
    this.renderer.selectRootElement(`#${attr}`).focus();
  }

  private textToDate(dateStr: string) {
    return new Date(dateStr);
  }

  protected abstract buildResourceForm(): void;

  protected abstract reset(): void;

}
