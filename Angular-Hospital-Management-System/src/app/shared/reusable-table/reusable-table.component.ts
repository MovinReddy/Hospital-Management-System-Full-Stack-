import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reusable-table',
  standalone: false,
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.css']
})
export class ReusableTableComponent implements OnInit, OnChanges {
  @Input() tableData: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() showActions = false;
  @Input() tableTitle: string = '';

  @Output() delete = new EventEmitter<any>();
  searchExpanded = false;
  hovered: any = null;
  dataSource = new MatTableDataSource<any>([]);

  ngOnInit() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const search = filter.trim().toLowerCase();
      return (
        (data.firstName && data.firstName.toLowerCase().includes(search)) ||
        (data.middleName && data.middleName.toLowerCase().includes(search)) ||
        (data.lastName && data.lastName.toLowerCase().includes(search)) ||
        (data.email && data.email.toLowerCase().includes(search)) ||
        (data.phone && data.phone.toLowerCase().includes(search))
      );
    };
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  get displayedColumnsWithActions(): string[] {
    return [...this.displayedColumns, 'actions'];
  }

  ngOnChanges() {
    this.dataSource.data = this.tableData;
  }

  private customFilterPredicate = (data: any, filter: string): boolean => {
    const concatenatedName = `${data.firstName || ''} ${data.middleName || ''} ${data.lastName || ''}`.toLowerCase();
    return concatenatedName.includes(filter) ||
           data.email?.toLowerCase().includes(filter) ||
           data.phone?.includes(filter);
  };


  onDelete(item: any) {
    this.delete.emit(item);
  }
}
