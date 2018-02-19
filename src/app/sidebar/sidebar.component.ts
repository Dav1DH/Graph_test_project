import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // @ViewChild('svg') private svg: ElementRef;
  // @Input() private data: Array<any>;
  private _that = this;
  svgVar: any;
  width: number;
  height: number;
  color: any;
  simulation;
  link: any;
  node: any;
  constructor() { }
  ngOnInit() {
    var that = this;
    this.svgVar = d3.select('svg');
    this.width = +this.svgVar.attr('width');
    this.height = +this.svgVar.attr('height');

    this.color = d3.scaleOrdinal(d3.schemeCategory10);

    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(function (d: { id: string , group: number}) {
        return d.id;
      }))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.width / 2, this.height / 2));

    d3.json('./assets/miserables.json', function(error, graph) {
      if (error) {
        throw error;
      }
      console.log(that.svgVar);

      that.link = that.svgVar.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(graph.links)
        .enter().append('line')
        .attr('stroke-width', function(d) { return Math.sqrt(d.value); })
        .attr('style', 'stroke: #999; stroke-opacity: 0.6');

      that.node = that.svgVar.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(graph.nodes)
        .enter().append('circle')
        .attr('r', 5)
        .attr('fill', function(d) { return that.color(d.group); })
        .call(d3.drag()
          .on('start', that.dragstarted)
          .on('drag', that.dragged)
          .on('end', that.dragended));

      that.node.append('title')
        .text(function(d) { return d.id; });

      that.simulation
        .nodes(graph.nodes)
        .on('tick', ticked);

      that.simulation.force('link')
        .links(graph.links);

      function ticked() {
        that.link
          .attr('x1', function(d) { return d.source.x; })
          .attr('y1', function(d) { return d.source.y; })
          .attr('x2', function(d) { return d.target.x; })
          .attr('y2', function(d) { return d.target.y; });

        that.node
          .attr('cx', function(d) { return d.x; })
          .attr('cy', function(d) { return d.y; });
      }
    });
    //

  }
   dragstarted(d) {
    if (!d3.event.active) {
      this.simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
  }

   dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

   dragended(d) {
    if (!d3.event.active) {
      this.simulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
  }
}
