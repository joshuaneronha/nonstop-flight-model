const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 650;

let svg_1 = d3.select("#map")
    // creating object for first graph
    .append("svg")
    .attr("width", MAX_WIDTH)
    .attr("height", MAX_HEIGHT)
    .append("g")
    .attr("transform", `translate(${0},${75})`);

var map = d3.map()
// var map_proj = d3.geoMercator().scale(300).center([-50,20])
var map_proj = d3.geoAlbers()
var path = d3.geoPath().projection(map_proj)

let tiitle = svg_1.append("text")
//creating a blank title object -- blank for now because it shows how many countries are displayed!
    .attr("x", MAX_WIDTH/6)
    .attr("y", -15)
    .style("text-anchor", "center")
    .style("font-size", 25)
    .text("U.S. Commercial Non-Stop Flight Projections")

let airport_one = svg_1.append("text")
//creating a blank title object -- blank for now because it shows how many countries are displayed!
    .attr("x", 920)
    .attr("y", 170)
    .style("text-anchor", "center")
    .style("font-size", 25)

let intro = svg_1.append("text")
    //creating a blank title object -- blank for now because it shows how many countries are displayed!
        .attr("x", 920)
        .attr("y", 170)
        .style("text-anchor", "center")
        .style("font-size", 20)
        .text("Click on two")

let intro_2 = svg_1.append("text")
//creating a blank title object -- blank for now because it shows how many countries are displayed!
    .attr("x", 920)
    .attr("y", 200)
    .style("text-anchor", "center")
    .style("font-size", 20)
    .text("airports!")

let arrow = svg_1.append("text")
    //creating a blank title object -- blank for now because it shows how many countries are displayed!
        .attr("x", 985)
        .attr("y", 169)
        .style("text-anchor", "center")
        .style("font-size", 25)
    

let airport_two = svg_1.append("text")
    //creating a blank title object -- blank for now because it shows how many countries are displayed!
    .attr("x", 1025)
    .attr("y", 170)
    .style("text-anchor", "center")
    .style("font-size", 25)

let nonstop_label = svg_1.append("text")
    //creating a blank title object -- blank for now because it shows how many countries are displayed!
    .attr("x", 920)
    .attr("y", 200)
    .style("text-anchor", "center")
    .style("font-size", 15)
    .text("Nonstop PDEW:")
    .style("opacity",0)

let nonstop = svg_1.append("text")
    //creating a blank title object -- blank for now because it shows how many countries are displayed!
    .attr("x", 920)
    .attr("y", 230)
    .style("text-anchor", "center")
    .style("font-size", 25)

let total_label = svg_1.append("text")
    //creating a blank title object -- blank for now because it shows how many countries are displayed!
    .attr("x", 920)
    .attr("y", 265)
    .style("text-anchor", "center")
    .style("font-size", 15)
    .text("Total PDEW:")
    .style("opacity",0)

let total = svg_1.append("text")
    //creating a blank title object -- blank for now because it shows how many countries are displayed!
    .attr("x", 920)
    .attr("y", 295)
    .style("text-anchor", "center")
    .style("font-size", 25)

let predicted_label = svg_1.append("text")
    //creating a blank title object -- blank for now because it shows how many countries are displayed!
    .attr("x", 920)
    .attr("y", 330)
    .style("text-anchor", "center")
    .style("font-size", 15)
    .text("Predicted Nonstop PDEW:")
    .style("opacity",0)

let regression_label = svg_1.append("text")
    //creating a blank title object -- blank for now because it shows how many countries are displayed!
    .attr("x", 920)
    .attr("y", 365)
    .style("text-anchor", "center")
    .style("font-size", 15)
    .text("Regression:")
    .style("opacity",100)

let nn_label = svg_1.append("text")
    //creating a blank title object -- blank for now because it shows how many countries are displayed!
    .attr("x", 920)
    .attr("y", 400)
    .style("text-anchor", "center")
    .style("font-size", 15)
    .text("Neural Network:")
    .style("opacity",100)

let predicted = svg_1.append("text")
    //creating a blank title object -- blank for now because it shows how many countries are displayed!
    .attr("x", 1020)
    .attr("y", 365)
    .style("text-anchor", "center")
    .style("font-size", 25)

let predicted_nn = svg_1.append("text")
    //creating a blank title object -- blank for now because it shows how many countries are displayed!
    .attr("x", 1020)
    .attr("y", 400)
    .style("text-anchor", "center")
    .style("font-size", 25)

let info_box = svg_1.append("rect")
    .attr("x", 900)
    .attr("y", 130)
    .attr("height", 300)
    .attr("width", 200)
    .attr('stroke', '#2378ae')
    .attr('fill','transparent')
    .attr('stroke-width', '3');

d3.json("./resources/us-states.json", function(data){
d3.csv("./resources/airports_withloc.csv", function(airports) {
d3.csv("./resources/model_output_new_35k.csv", function(model) {

    // Filter data
    // data.features = data.features.filter( function(d){return d.properties.name=="France"} )

    // Draw the map
    svg_1.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
          .attr("fill", "#b8b8b8")
          .attr("d", d3.geoPath()
              .projection(map_proj)
          )
        .style("stroke", "black")
        .style("opacity", .3)

    var Tooltip = d3.select("#map")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 1)
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style('font-size', '10px')

    var mouseover = function(d) {
        Tooltip.style("opacity", 1)
        
      }

    var mouseover_2 = function(d) {
        
    
    }

    var mousemove = function(d) {
    Tooltip
        .html(d.ORIGIN)
        .style("left", (d3.mouse(this)[0]+10) + "px")
        .style("top", (d3.mouse(this)[1] + 100) + "px")
    }
    var mouseleave = function(d) {
    Tooltip.style("opacity", 0)
    }

    var marker_color = d3.scaleSequential(d3.interpolateGnBu).domain([d3.min(airports, function(d) {return d.PASSENGERS}), d3.max(airports, function(d) {return d.PASSENGERS})])
    var line_color = d3.scaleSequential(d3.interpolateOrRd).domain([d3.min(model, function(d) {return d.pred}), 500])
    // console.log([airports.long, airports.lat])
    var myCircles = svg_1
        .selectAll("myCircles")
        .data(airports)
        .enter()
        .append("circle")
        .attr("cx", function(d){ return map_proj([d.long, d.lat])[0] })
        .attr("cy", function(d){ return map_proj([d.long, d.lat])[1] })
        .attr("r", 4)
        .style("opacity",1)
        .style("stroke","black")
        .style("fill", function(d){ return marker_color([d.PASSENGERS]) })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)



        var counter = 0
        

        myCircles.on('click', function(d, i) {
            if (counter == 0) {
                a_one_n = d.ORIGIN
                a_one_la = d.lat
                a_one_lo = d.long

                intro.style("opacity",0)
                intro_2.style("opacity",0)

                airport_one.text(d.ORIGIN)
                arrow.text("→")
                counter += 1


            }
            else if (counter == 1) {

                model_val = model.filter(function(row) {
                    return (row['origin'] == a_one_n) && (row['dest'] == d.ORIGIN);
                })

                total_label.style("opacity",1)
                nonstop_label.style("opacity",1)
                predicted_label.style("opacity",1)

                airport_two.text(d.ORIGIN)
                var link = {type: "LineString", coordinates: [[a_one_lo, a_one_la], [d.long, d.lat]]}

                liny2 = svg_1.append("path")
                    .attr("d", path(link))
                    .style("fill", "none")
                    .style("stroke", "black")
                    .style("stroke-width", 6)

                liny = svg_1.append("path")
                    .attr("d", path(link))
                    .style("fill", "none")
                    .style("stroke", line_color([model_val[0].pred]))
                    .style("stroke-width", 4)



                nonstop.text(Math.round(model_val[0].nonstop))
                total.text(Math.round(model_val[0].total))
                predicted.text(Math.round(model_val[0].pred))
                predicted_nn.text(Math.round(model_val[0].pred_n))
                counter += 1            
            }
            else {
                counter = 1
                a_one_n = d.ORIGIN
                a_one_la = d.lat
                a_one_lo = d.long                
                airport_one.text(d.ORIGIN)
                airport_two.text("")
                liny.remove()
                liny2.remove()
                // svg_1.append("path").style("opacity",0)
            }

        })



    })
})
})
