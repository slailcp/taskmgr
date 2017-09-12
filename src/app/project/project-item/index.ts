import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';
import {cardAnim} from '../../anim';
import {Project} from '../../domain';

@Component({
  selector: 'app-project-item',
  template: `
    <md-card (click)="onClick($event)">
      <md-card-header>
        <md-card-title>
          <span>
            {{item.name}}
          </span>
        </md-card-title>
      </md-card-header>
      <img mdCardImage [src]="item.coverImg">
      <md-card-content>
        <p>{{item.desc}}</p>
      </md-card-content>
      <md-card-actions>
        <button md-button (click)="openUpdateDialog($event)">
          <md-icon>note</md-icon>
          <span>编辑</span>
        </button>
        <button md-button (click)="openInviteDialog($event)">
          <md-icon>group_add</md-icon>
          <span>邀请</span>
        </button>
        <button md-button (click)="openDeleteDialog($event)">
          <md-icon>delete</md-icon>
          <span>删除</span>
        </button>
      </md-card-actions>
    </md-card>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [cardAnim],
})
export class ProjectItemComponent {
  @Input() item: Project;
  @Output() itemSelected = new EventEmitter<void>();
  @Output() launchUpdateDialog = new EventEmitter<void>();
  @Output() launchInviteDailog = new EventEmitter<void>();
  @Output() launchDeleteDailog = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }

  onClick(ev: Event) {
    ev.preventDefault();
    this.itemSelected.emit();
  }

  openUpdateDialog(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    this.launchUpdateDialog.emit();
  }

  openInviteDialog(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    this.launchInviteDailog.emit();
  }

  openDeleteDialog(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    this.launchDeleteDailog.emit();
  }

  constructor() {}
}
