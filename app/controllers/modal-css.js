import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ModalCssController extends Controller {
  @tracked showModal = false;
}
