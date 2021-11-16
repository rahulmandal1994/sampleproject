import { Component, OnInit } from '@angular/core';
import {
	Http,
	Headers
  } from '@angular/http';
import { MatTableDataSource } from '@angular/material/table';
  export interface PeriodicElement {
    id: number;
  }
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  BreweriesList:any=[];
  dataSource = new MatTableDataSource<PeriodicElement>(this.BreweriesList);
  displayedColumns: string[] = ['name', 'brewery_type', 'phone','city','created_at'];
  title = 'sample-angular';
  cityList:any=[];
  nameList:any=[];
  selectedcity:string='Knox';
  constructor(
		private http: Http
	){

  }
  ngOnInit() {
    this.getAllBriewrdata();
  }
  prepareMatTable() {
   this.dataSource = new MatTableDataSource<PeriodicElement>(this.BreweriesList);
	}
  getAll(url:any){
		let headers=new Headers();
		return this.http.get(url,{
			headers: headers
		  })
	}
  getAllBriewrdata(){
    this.getAll('https://api.openbrewerydb.org/breweries').subscribe(res => {
      var obj_data = JSON.parse((<any>res)._body);  
      this.BreweriesList=obj_data;
      this.BreweriesList.forEach((element: any) => {
        this.cityList.push(element.city)
      });
      this.BreweriesList.forEach((element: any) => {
        this.nameList.push(element.name)
      });      
      this.prepareMatTable();
    });
  }
  cityChange(event:any){
    this.getAll(`https://api.openbrewerydb.org/breweries?by_city=`+event.value).subscribe(res => {
      var obj_data = JSON.parse((<any>res)._body);  
      this.BreweriesList=obj_data; 
      this.prepareMatTable();
    });
  }
  nameChange(event:any){
    this.selectedcity='';
    this.getAll(`https://api.openbrewerydb.org/breweries?by_name=`+event.value).subscribe(res => {
      var obj_data = JSON.parse((<any>res)._body);  
      this.BreweriesList=obj_data; 
      this.prepareMatTable();
    });
  }
}
