import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-graph-chart-data',
  templateUrl: './graph-chart-data.component.html',
  styleUrls: ['./graph-chart-data.component.css']
})
export class GraphChartDataComponent implements OnInit {

  data: any = {
    nodes: [
      {
        id: '',
        group: 0
      }
    ],
    links: [
      {
        source: '',
        target: '',
        value: 0
      }
    ]
  };
  nodeNames: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getDatas().subscribe( res => {
      if ( !res.error) {
        if(res.data[0].nodes){
          this.data = res.data[0];
          for (let i = 0; i < res.data[0].nodes.length; i++) {
            this.nodeNames[i] = res.data[0].nodes[i].id;
            console.log("nodes:" , this.nodeNames[i]);
          }
        } else {
          for (let i = 0; i < this.data.nodes.length; i++) {
            this.nodeNames[i] = this.data.nodes[i].id;
            console.log("nodes:" , this.nodeNames[i]);
          }
        }
      }
    });
  }

  addNode() {
    this.data.nodes.push({id: '',
      group: 0
    });
  }

  editNodeId(nodeName, index) {
    console.log(nodeName, index, this.nodeNames[index])
      for ( let i = 0; i < this.data.links.length; i++) {
        if (this.data.links[i].target === this.nodeNames[index]) {
          this.data.links[i].target = nodeName;
        } else {
          continue;
        }
      }
  }

  addLink() {
    this.data.links.push({
      source: '',
      target: '',
      value: 0
    });
  }

  removeNode(nodeId, index) {
    this.data.nodes.splice(index, 1);
    if ( nodeId.length > 0) {
      this.data.links = this.data.links.filter( el => {
        return el.target !== nodeId;
      });
    }
  }

  removeLnk(index) {
    this.data.links.splice(index, 1);
  }

  saveData() {
    this.dataService.createData(this.data).subscribe( res => {
      if ( !res.error) {
        window.location.reload();
      } else {
        console.log(res.error);
      }
    });
  }

}
