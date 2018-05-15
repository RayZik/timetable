import * as _ from 'underscore';


/**
 * Modal window service
 */
export class ModalService {
  /** array of modal windows */
  private modals: any[] = [];

  constructor() { }

  /**
   * Append modal window 
   * @param modal - modal window object
   */
  add(modal: any) {
    this.modals.push(modal);
  }

  /**
   * Remove modal window 
   * @param id - modal window id
   */
  remove(id: string) {
    const modalToRem = _.findWhere(this.modals, { id: id });

    if (typeof modalToRem !== 'undefined') {
      this.modals = _.without(this.modals, modalToRem);
    }
  }

  /**
   * Open modal window
   * @param id - modal window id
   */
  open(id: string) {
    const modal = _.findWhere(this.modals, { id: id });

    if (typeof modal !== 'undefined') {
      modal.open();
    }
  }

  /**
   * Close modal window
   * @param id - modal window id
   */
  close(id: string) {
    const modal = _.findWhere(this.modals, { id: id });

    if (typeof modal !== 'undefined') {
      modal.close();
    }
  }
}