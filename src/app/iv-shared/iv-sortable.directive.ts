import { Directive, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { IvCollection }   from '../iv-collection/iv-collection.class';
declare var JQuery: any;
declare var $: any;
@Directive({ selector: '[iv-sortable]' })
export class IvSortableDirective {

    @Output() itemMoved = new EventEmitter();

    private el: HTMLElement;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
        let newIndex;
        let oldIndex;
        JQuery(this.el).sortable({
            handle: '.move-item-button',
            cancel: '.cancel-sort',
            start: (event, ui) => {
                 $(this).attr('data-previndex', ui.item.index());
            },
            update: (event, ui) => {
                newIndex = ui.item.index();
                oldIndex = $(this).attr('data-previndex');
                $(this).removeAttr('data-previndex');
            },
            stop: (event, ui) => {
                this.itemMoved.emit({
                    value: {oldIndex: oldIndex, newIndex: newIndex}
                })
            }
        }).disableSelection();
    }
}
