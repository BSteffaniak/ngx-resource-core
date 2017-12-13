import { ResourceHelper } from './ResourceHelper';

export abstract class ResourceModel {

  abstract readonly $resource: any = null;

  $resolved: boolean = true;
  $promise: Promise<any> = null;
  $abort: () => void;

  public $setData(data: any) {
    Object.assign(this, data);

    return this;
  }

  public $save() {

    if (this.isNew()) {
      return this.$create();
    } else {
      return this.$update();
    }

  }

  public $create() {
    return this.$resource_method('create');
  }

  public $update() {
    return this.$resource_method('update');
  }

  public $remove() {
    return this.$resource_method('remove');
  }

  public toJSON(): any {
    return ResourceHelper.cleanData(this);
  }

  protected isNew(): boolean {
    return !(<any>this)['id'];
  }

  private $resource_method(methodName: string) {

    if (!this.$resource) {
      console.error(`Your Resource is not defined`);

      return this;
    }

    const restInstance = this.$resource.instance;

    if (!restInstance) {
      console.error(`Your Resource is not defined or not created`);

      return this;
    }

    if (!restInstance[methodName]) {
      console.error(`Your Resource has no implemented ${methodName} method.`);

      return this;
    }

    restInstance[methodName](this);

    return this;
  }


}
