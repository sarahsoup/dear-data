
var m = {t:50,r:50,b:50,l:50},
    w = document.getElementById('canvas').clientWidth - m.l - m.r,
    h = document.getElementById('canvas').clientHeight - m.t - m.b;

var plot = d3.select('.canvas')
  .append('svg')
  .attr('width', w + m.l + m.r)
  .attr('height', h + m.t + m.b)
  .append('g').attr('class','plot');

//scale
var scaleX = d3.scaleLinear()
  .domain([0,100])
  .range([0,w + m.l + m.r]);
var scaleY = d3.scaleLinear()
  .domain([0,100])
  .range([0,h + m.t + m.b]);

//axis
var axisX = d3.axisBottom()
  .scale(scaleX)
  .tickSize(0);
var axisY = d3.axisLeft()
  .scale(scaleY)
  .tickSize(0);

//height of lines
var lineH = 15;

//add title
// plot.append('text')
//   .text('dear data week 08: phone addiction')
//   .attr('x',function(d){return scaleX(90)})
//   .attr('y',function(d){return scaleY(10)})
//   .attr('fill','#3c3734')
//   .attr('font-size','20px')
//   .attr('text-anchor','end');

d3.csv('week_8_phone_addiction.csv',parse,function(err,rows){

  //group rows by circle
  var circles = d3.nest()
    .key(function(d){return d.place_situation})
    .entries(rows);

  //add radius and description to data
  circles.forEach(function(group){
    var total = group.values.length;
    var radius = ((total + 2) * 8) / (2 * Math.PI);
    var i = 1;

    // if(group.key == 'walking'){group.desc = 'while walking'}
    // else if(group.key == 'working'){group.desc = 'while working'}
    // else if(group.key == 'waiting'){group.desc = 'while waiting for something or somebody'}
    // else if(group.key == 'bathroom'){group.desc = 'in the bathroom'}
    // else if(group.key == 'couch'){group.desc = 'on the couch'}
    // else if(group.key == 'bed'){group.desc = 'on the bed'}
    // else if(group.key == 'home_other'){group.desc = 'other places at home'}
    // else if(group.key == 'restaurants_shops'){group.desc = 'caf&#233;/restaurants, shops...'}
    // else if(group.key == 'public_transportation'){group.desc = 'public transportation'};

    group.values.forEach(function(instance){

      if(instance.place_situation == 'walking'){instance.desc = 'while walking'}
      else if(instance.place_situation == 'working'){instance.desc = 'while working'}
      else if(instance.place_situation == 'waiting'){instance.desc = 'while waiting for something or somebody'}
      else if(instance.place_situation == 'bathroom'){instance.desc = 'in the bathroom'}
      else if(instance.place_situation == 'couch'){instance.desc = 'on the couch'}
      else if(instance.place_situation == 'bed'){instance.desc = 'on the bed'}
      else if(instance.place_situation == 'home_other'){instance.desc = 'other places at home'}
      else if(instance.place_situation == 'restaurants_shops'){instance.desc = 'cafe/restaurants, shops...'}
      else if(instance.place_situation == 'public_transportation'){instance.desc = 'public transportation'};

      if(instance.interaction_type == 'text_email'){instance.interaction_desc = 'text/email'}
      else if(instance.interaction_type == 'social_media'){instance.interaction_desc = 'social media'}
      else if(instance.interaction_type == 'other_app'){instance.interaction_desc = 'other apps'}
      else if(instance.interaction_type == 'time'){instance.interaction_desc = 'check the time'}
      else if(instance.interaction_type == 'weather'){instance.interaction_desc = 'check the weather'}
      else if(instance.interaction_type == 'call'){instance.interaction_desc = 'phone call'}
      else if(instance.interaction_type == 'text_in_room'){instance.interaction_desc = 'text with somebody who was in the room'}
      else if(instance.interaction_type == 'charge'){instance.interaction_desc = 'to charge it'}
      else if(instance.interaction_type == 'text_email_stefanie'){instance.interaction_desc = 'text/email you'}
      else if(instance.interaction_type == 'photo_postcards'){instance.interaction_desc = 'take pictures of our postcards!'}
      else if(instance.interaction_type == 'turned_face_down'){instance.interaction_desc = 'turned the phone facing the table not to see it'}
      else if(instance.interaction_type == 'no_report'){instance.interaction_desc = 'didn\'t pick it because I didn\'t want to report it'}
      else if(instance.interaction_type == 'thought_rang'){instance.interaction_desc = 'thought it was ringing but wasn\'t!'};
      instance.r = radius;
      instance.total = total;
      instance.id = i;
      i++;
    });
  });

  console.log(circles);

/*------------------------------------------------------------------------------*/
  //create <g> for each group
  var groups = plot.selectAll('.groups')
    .data(circles)
    .enter()
    .append('g')
    .attr('class','groups');

    groups.append('circle')
    .data(circles)
    .attr('cx',function(d){return scaleX(d.values[0].x)})
    .attr('cy',function(d){return scaleY(d.values[0].y)})
    .attr('r',0)
    // .style('stroke','#636466')
    .style('stroke','black')
    .style('opacity',.4)
    .style('stroke-width',3)
    .style('fill','none')
    .transition()
    .duration(4000)
    .attr('r',function(d){return d.values[0].r})
    .style('stroke-width',6)
    .transition()
    .duration(2000)
    .style('stroke-width',0);

  // groups.append('image')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'walking'})
  //   .attr('href','./icons/walking.svg')
  //   .attr('class','symbols')
  //   .attr('x',function(d){return scaleX(d.values[0].x)-(d.values[0].r/2)})
  //   .attr('y',function(d){return scaleY(d.values[0].y)-(d.values[0].r/2)})
  //   .attr('height',function(d){return d.values[0].r})
  //   .attr('width',function(d){return d.values[0].r})
  //   .style('opacity',.4);

  function addSymbol(filterKey, fileName){
    //appends for every circle
    var symbol = groups.append('image')
      .data(circles)
      .filter(function(d){return d.key == filterKey})
      .attr('href','./icons/' + fileName + '.svg')
      .attr('class','symbols')
      .attr('x',function(d){return scaleX(d.values[0].x)})
      .attr('y',function(d){return scaleY(d.values[0].y)})
      .attr('height',0)
      .attr('width',0)
      .style('opacity',.4);
    return symbol;
  }

  addSymbol('walking','walking');
  addSymbol('working','working');
  addSymbol('waiting','waiting');
  addSymbol('bathroom','bathroom');
  addSymbol('bed','bedroom');
  addSymbol('couch','couch');
  addSymbol('public_transportation','transport');
  addSymbol('home_other','home');
  addSymbol('restaurants_shops','cafe');

  d3.selectAll('.symbols')
    .transition()
    .duration(4000)
    .attr('x',function(d){return scaleX(d.values[0].x)-(d.values[0].r/2)})
    .attr('y',function(d){return scaleY(d.values[0].y)-(d.values[0].r/2)})
    .attr('height',function(d){return d.values[0].r})
    .attr('width',function(d){return d.values[0].r})
    .transition()
    .duration(2000)
    .style('opacity',.2);

  //append lines for each instance
  groups.selectAll('.instance')
    .data(function(d){return d.values})
    .enter()
    .filter(function(d){return d.interaction_type != 'photo_postcards' && d.interaction_type != 'thought_rang' && d.interaction_type != 'turned_face_down'})
    .append('line')
    .attr('class','instances')
    .attr('x1',function(d){return scaleX(d.x)})
    .attr('x2',function(d){return scaleX(d.x)})
    .attr('y1',positionStart)
    .attr('y2',positionStart)
    .attr('transform',rotate)
    .style('stroke-width',stroke)
    .transition()
    .delay(6000)
    .style('stroke', color)
    .style('stroke-linecap','round')
    .style('stroke-dasharray',dash)
    .transition()
    .duration(4000)
    .attr('y2',positionEnd);


  //append circles for interaction_type == 'photo_postcards'
  groups.selectAll('.instance')
    .data(function(d){return d.values})
    .enter()
    .filter(function(d){return d.interaction_type == 'photo_postcards'})
    .append('circle')
    .attr('class','instances')
    .attr('cx',function(d){return scaleX(d.x)})
    .attr('cy',function(d){return scaleY(d.y)-d.r-2})
    .attr('r',2)
    .style('fill','none')
    .attr('transform',rotate)
    .transition()
    .delay(6000)
    .duration(2000)
    .style('fill',color);

  //append double line for interaction_type == 'thought_rang'
  groups.selectAll('.instance')
    .data(function(d){return d.values})
    .enter()
    .filter(function(d){return d.interaction_type == 'thought_rang'})
    .append('line')
    .attr('class','instances')
    .attr('x1',function(d){return scaleX(d.x)-1.5})
    .attr('x2',function(d){return scaleX(d.x)-1.5})
    .attr('y1',positionStart)
    .attr('y2',positionStart)
    .style('stroke-width',stroke)
    .attr('transform',rotate)
    .transition()
    .delay(6000)
    .style('stroke', color)
    .style('stroke-linecap','round')
    .transition()
    .duration(4000)
    .attr('y2',positionEnd);
  groups.selectAll('.instance')
    .data(function(d){return d.values})
    .enter()
    .filter(function(d){return d.interaction_type == 'thought_rang'})
    .append('line')
    .attr('class','instances')
    .attr('x1',function(d){return scaleX(d.x)+1.5})
    .attr('x2',function(d){return scaleX(d.x)+1.5})
    .attr('y1',positionStart)
    .attr('y2',positionStart)
    .style('stroke-width',stroke)
    .attr('transform',rotate)
    .transition()
    .delay(6000)
    .style('stroke', color)
    .style('stroke-linecap','round')
    .transition()
    .duration(4000)
    .attr('y2',positionEnd);

  //append curved line for interaction_type == 'turned_face_down'
  var path = groups.selectAll('.instance')
    .data(function(d){return d.values})
    .enter()
    .filter(function(d){return d.interaction_type == 'turned_face_down'})
    .append('path')
    .attr('class','instances')
    .attr('d',function(d){
      return 'M' +scaleX(d.x)+ ' ' +(scaleY(d.y)-d.r+(lineH/2))+ ' Q ' +(scaleX(d.x)+5)+ ' ' +(scaleY(d.y)-d.r+((lineH/4))+ ' ' +scaleX(d.x)+ ' ' +(scaleY(d.y)-d.r))+ ' T ' +scaleX(d.x)+ ' ' +(scaleY(d.y)-d.r-(lineH/2));
    })
    .style('stroke-width',stroke)
    .style('stroke',color)
    .style('stroke-linecap','round')
    .style('fill','none')
    .attr('transform',rotate);

  var totalLength = path.node().getTotalLength();

  path
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .delay(6000)
    .duration(4000)
    // .ease("linear")
    .attr("stroke-dashoffset", 0);


  // enable interaction for all instances
  groups.selectAll('.instances')
    .on('mouseenter',function(d){

        // var tooltip = d3.select('.custom-tooltip');
        // tooltip.select('.type')
        //     .html(d.interaction_desc)
        //     .style('font-size','12px');
        // tooltip.transition().style('opacity',1);

        var thisLine = this;
        var thisType = d.interaction_type;
        var thisWithOthers = d.with_others_ct;
        var thisOtherPhone = d.others_phone_in;
        var thisKey = d.place_situation;

        groups.selectAll('.instances')
          .transition()
          .duration(500)
          .style('opacity',function(d){
            if(d.interaction_type == thisType){
              return 1;
            }
            else{
              return .3;
            }
          });

        d3.select('#group')
          .text(function(){return d.desc});
        d3.select('#interaction')
          .text(function(){return d.interaction_desc});
        d3.select('#extras')
          .text(function(){
            if(d.with_others_ct == 1 && d.others_phone_in == 1){
              return 'used someone else\'s phone, with ' +d.with_others_ct+ ' person'
            }
            else if(d.with_others_ct == 1 && d.others_phone_in == 0){
              return 'with ' +d.with_others_ct+ ' person'
            }
            else if(d.with_others_ct > 1 && d.others_phone_in == 1){
              return 'used someone else\'s phone, with ' +d.with_others_ct+ ' people'
            }
            else if(d.with_others_ct > 1 && d.others_phone_in == 0){
              return 'with ' +d.with_others_ct+ ' people'
            }
            else if(d.with_others_ct == 0 && d.others_phone_in == 1){
              return 'used someone else\'s phone'
            }
            else{ return 'by myself'}
          });
          d3.selectAll('.info')
            .style('color',function(){
              if (d.interaction_type == 'text_email'){return '#f9a980';}
              else if (d.interaction_type == 'social_media'){return '#ac5e93';}
              else if (d.interaction_type == 'other_app'){return '#7777a4';}
              else if (d.interaction_type == 'time'){return '#b9d086';}
              else if (d.interaction_type == 'weather'){return '#7cc4cb';}
              else if (d.interaction_type == 'call'){return '#3683a4'}
              else if (d.interaction_type == 'text_in_room'){return '#76b88f';}
              else if (d.interaction_type == 'charge'){return '#f04e6e';}
              else if (d.interaction_type == 'text_email_stefanie' || d.interaction_type == 'photo_postcards'){return '#f48f9f';}
              else {return '#636466';}
            });

          groups.selectAll('.symbols')
            .transition()
            .duration(500)
            .style('opacity',function(d){
              if(d.key == thisKey){
                return .3;
              }
              else{
                return .05;
              }
            });

        //how do I specify attributes associated with a particular instance?
        // groups.selectAll('.details')
        //   .style('opacity',function(d){
        //     if()
        //   });
    })
    // .on('mousemove',function(d){
    //     var tooltip = d3.select('.custom-tooltip');
    //     var xy = d3.mouse( d3.select('.container').node() );
    //     tooltip
    //         .style('left',xy[0]+10+'px')
    //         .style('top',xy[1]+(-10)+'px');
    // })
    .on('mouseleave',function(d){
        var tooltip = d3.select('.custom-tooltip');
        tooltip.transition().style('opacity',0);
        groups.selectAll('.instances')
          .transition()
          .duration(500)
          .style('opacity',1);
        groups.selectAll('.symbols')
          .transition()
          .duration(500)
          .style('opacity',.2);
    });

  //append others_phone_in attribute
  groups.selectAll('.attribute')
    .data(function(d){return d.values})
    .enter()
    .filter(function(d){return d.others_phone_in == 1})
    .append('line')
    .attr('class','details')
    .attr('x1',function(d){return scaleX(d.x)-2})
    .attr('x2',function(d){return scaleX(d.x)+2})
    .attr('y1',function(d){return scaleY(d.y)-d.r-lineH-5})
    .attr('y2',function(d){return scaleY(d.y)-d.r-lineH-5})
    .style('stroke-width',1.5)
    .style('stroke', 'none')
    .style('stroke-linecap','round')
    .style('opacity',0)
    .attr('transform',rotate);

  //append with_others_ct attribute: iterated manually
  groups.selectAll('.attribute')
    .data(function(d){return d.values})
    .enter()
    .filter(function(d){return d.with_others_ct > 0})
    .append('circle')
    .attr('class','details')
    .attr('r',1)
    .attr('cx',function(d){return scaleX(d.x)})
    .attr('cy',function(d){
      if(d.interaction_type == 'photo_postcards'){
        return scaleY(d.y)-d.r-2-(6*1);
      }
      else if(d.reason_in == 1){
        if(d.others_phone_in == 1){
          return scaleY(d.y)-d.r-lineH-4-(6*1);
        }
        else{
          return scaleY(d.y)-d.r-lineH-(6*1);
        }
      }
      else if(d.reason_in == 2){
        return scaleY(d.y)-d.r-(6*1);
      }
      else{
        return scaleY(d.y)-d.r-(lineH/2)-(6*1);
      }
    })
    .style('fill','#636466')
    .style('opacity',0)
    .attr('transform',rotate);

  groups.selectAll('.attribute')
    .data(function(d){return d.values})
    .enter()
    .filter(function(d){return d.with_others_ct > 1})
    .append('circle')
    .attr('class','details')
    .attr('r',1)
    .attr('cx',function(d){return scaleX(d.x)})
    .attr('cy',function(d){
      if(d.interaction_type == 'photo_postcards'){
        return scaleY(d.y)-d.r-2-(6*2);
      }
      else if(d.reason_in == 1){
        if(d.others_phone_in == 1){
          return scaleY(d.y)-d.r-lineH-4-(6*2);
        }
        else{
          return scaleY(d.y)-d.r-lineH-(6*2);
        }
      }
      else if(d.reason_in == 2){
        return scaleY(d.y)-d.r-(6*2);
      }
      else{
        return scaleY(d.y)-d.r-(lineH/2)-(6*2);
      }
    })
    .style('fill','#636466')
    .style('opacity',0)
    .attr('transform',rotate);

  groups.selectAll('.attribute')
    .data(function(d){return d.values})
    .enter()
    .filter(function(d){return d.with_others_ct > 2})
    .append('circle')
    .attr('class','details')
    .attr('r',1)
    .attr('cx',function(d){return scaleX(d.x)})
    .attr('cy',function(d){
      if(d.interaction_type == 'photo_postcards'){
        return scaleY(d.y)-d.r-2-(6*3);
      }
      else if(d.reason_in == 1){
        if(d.others_phone_in == 1){
          return scaleY(d.y)-d.r-lineH-4-(6*3);
        }
        else{
          return scaleY(d.y)-d.r-lineH-(6*3);
        }
      }
      else if(d.reason_in == 2){
        return scaleY(d.y)-d.r-(6*3);
      }
      else{
        return scaleY(d.y)-d.r-(lineH/2)-(6*3);
      }
    })
    .style('fill','#636466')
    .style('opacity',0)
    .attr('transform',rotate);

  groups.selectAll('.attribute')
    .data(function(d){return d.values})
    .enter()
    .filter(function(d){return d.with_others_ct > 3})
    .append('circle')
    .attr('class','details')
    .attr('r',1)
    .attr('cx',function(d){return scaleX(d.x)})
    .attr('cy',function(d){
      if(d.interaction_type == 'photo_postcards'){
        return scaleY(d.y)-d.r-2-(6*4);
      }
      else if(d.reason_in == 1){
        if(d.others_phone_in == 1){
          return scaleY(d.y)-d.r-lineH-4-(6*4);
        }
        else{
          return scaleY(d.y)-d.r-lineH-(6*4);
        }
      }
      else if(d.reason_in == 2){
        return scaleY(d.y)-d.r-(6*4);
      }
      else{
        return scaleY(d.y)-d.r-(lineH/2)-(6*4);
      }
    })
    .style('fill','#636466')
    .style('opacity',0)
    .attr('transform',rotate);

  groups.selectAll('.attribute')
    .data(function(d){return d.values})
    .enter()
    .filter(function(d){return d.with_others_ct > 4})
    .append('circle')
    .attr('class','details')
    .attr('r',1)
    .attr('cx',function(d){return scaleX(d.x)})
    .attr('cy',function(d){
      if(d.interaction_type == 'photo_postcards'){
        return scaleY(d.y)-d.r-2-(6*5);
      }
      else if(d.reason_in == 1){
        if(d.others_phone_in == 1){
          return scaleY(d.y)-d.r-lineH-4-(6*5);
        }
        else{
          return scaleY(d.y)-d.r-lineH-(6*5);
        }
      }
      else if(d.reason_in == 2){
        return scaleY(d.y)-d.r-(6*5);
      }
      else{
        return scaleY(d.y)-d.r-(lineH/2)-(6*5);
      }
    })
    .style('fill','#636466')
    .style('opacity',0)
    .attr('transform',rotate);

    // append with_others_ct attribute: iterated dynamically, works but appends too many
    // circles.forEach(function(group){
    //   group.values.forEach(function(d){
    //     var i;
    //     for(i = 1; i <= d.with_others_ct; i++){
    //       groups.selectAll('.attribute')
    //         .data(function(d){return d.values})
    //         .enter()
    //         .filter(function(d){return d.with_others_ct >= i})
    //         .append('circle')
    //         .attr('class','details')
    //         .attr('r',1)
    //         .attr('cx',function(d){return scaleX(d.x)})
    //         .attr('cy',function(d){
    //           if(d.interaction_type == 'photo_postcards'){
    //             return scaleY(d.y)-d.r-2-(6*i);
    //           }
    //           else if(d.reason_in == 1){
    //             if(d.others_phone_in == 1){
    //               return scaleY(d.y)-d.r-lineH-4-(6*i);
    //             }
    //             else{
    //               return scaleY(d.y)-d.r-lineH-(6*i);
    //             }
    //           }
    //           else if(d.reason_in == 2){
    //             return scaleY(d.y)-d.r-(6*i);
    //           }
    //         })
            // .style('fill','none')
            // .attr('transform',rotate)
            // .transition()
            // .delay(6000)
            // .style('fill','#636466');
    //     }
    //   })
    // });

  //attribute functions
  function rotate(d){
    var findCx = scaleX(d.x);
    var findCy = scaleY(d.y);
    var angle = (360/(d.total+3))*(d.id+1);
    return 'rotate('+ angle +','+ findCx +','+ findCy +')';
  };

  function positionStart(d){
    if (d.reason_in == 0){
      return scaleY(d.y)-d.r-(lineH/2);
    }
    else if (d.reason_in == 1){
      return scaleY(d.y)-d.r;
    }
    else if (d.reason_in == 2){
      return scaleY(d.y)-d.r;
    }
  };

  function positionEnd(d){
    if (d.reason_in == 0){
      return scaleY(d.y)-d.r+(lineH/2);
    }
    else if (d.reason_in == 1){
      return scaleY(d.y)-d.r-lineH;
    }
    else if (d.reason_in == 2){
      return scaleY(d.y)-d.r+lineH;
    }
  };

  function stroke(d){
    if (d.interaction_type == 'no_report' || d.interaction_type == 'turned_face_down' || d.interaction_type == 'thought_rang'){
      return 1.5;
    }
    else {
      return 3;
    }
  };

  function dash(d){
    if (d.interaction_type == 'no_report'){
      return ('2,5');
    }
    else {
      return ('1,0');
    }
  };

  function color(d){
    if (d.interaction_type == 'text_email'){
      return '#f9a980';
    }
    else if (d.interaction_type == 'social_media'){
      return '#ac5e93';
    }
    else if (d.interaction_type == 'other_app'){
      return '#7777a4';
    }
    else if (d.interaction_type == 'time'){
      return '#b9d086';
    }
    else if (d.interaction_type == 'weather'){
      return '#7cc4cb';
    }
    else if (d.interaction_type == 'call'){
      return '#3683a4'
    }
    else if (d.interaction_type == 'text_in_room'){
      return '#76b88f';
    }
    else if (d.interaction_type == 'charge'){
      return '#f04e6e';
    }
    else if (d.interaction_type == 'text_email_stefanie' || d.interaction_type == 'photo_postcards'){
      return '#f48f9f';
    }
    else {
      return '#636466';
    }
  };

  function colorText(){
    if (d.interaction_type == 'text_email'){
      return '#f9a980';
    }
    else if (d.interaction_type == 'social_media'){
      return '#ac5e93';
    }
    else if (d.interaction_type == 'other_app'){
      return '#7777a4';
    }
    else if (d.interaction_type == 'time'){
      return '#b9d086';
    }
    else if (d.interaction_type == 'weather'){
      return '#7cc4cb';
    }
    else if (d.interaction_type == 'call'){
      return '#3683a4'
    }
    else if (d.interaction_type == 'text_in_room'){
      return '#76b88f';
    }
    else if (d.interaction_type == 'charge'){
      return '#f04e6e';
    }
    else if (d.interaction_type == 'text_email_stefanie' || d.interaction_type == 'photo_postcards'){
      return '#f48f9f';
    }
    else {
      return '#636466';
    }
  };

/*------------------------------------------------------------------------------*/
  // append beginning and end circle attributes
  groups.append('path')
     .data(circles)
     .filter(function(d){return d.key != 'public_transportation'})
     .attr('d',function(d){
       return 'M' +(scaleX(d.values[0].x)+5)+ ' ' +(scaleY(d.values[0].y)-d.values[0].r-lineH-5)+ ' H ' +(scaleX(d.values[0].x))+ ' V ' +(scaleY(d.values[0].y)-d.values[0].r+lineH+5);
     })
     .attr('class','details')
     .style('stroke','#636466')
     .style('stroke-width',1.5)
     .style('fill','none')
     .style('opacity',0)
     .attr('transform',rotateSymbol);

  groups.append('path')
    .data(circles)
    .filter(function(d){return d.key != 'public_transportation'})
    .attr('d',function(d){
      return 'M' +(scaleX(d.values[0].x)-5)+ ' ' +(scaleY(d.values[0].y)-d.values[0].r+lineH+5)+ ' H ' +(scaleX(d.values[0].x))+ ' V ' +(scaleY(d.values[0].y)-d.values[0].r-lineH-5);
    })
    .attr('class','details')
    .style('stroke','#636466')
    .style('stroke-width',1.5)
    .style('fill','none')
    .style('opacity',0)
    .attr('transform',function(d){
        return 'rotate('+ (360/(d.values[0].total+3))*(d.values[0].total+2) +','+ scaleX(d.values[0].x)+','+ scaleY(d.values[0].y) +')';
    });

  groups.append('path')
     .data(circles)
     .filter(function(d){return d.key == 'public_transportation'})
     .attr('d',function(d){
       return 'M' +(scaleX(d.values[0].x)+5)+ ' ' +(scaleY(d.values[0].y)-d.values[0].r-lineH-5)+ ' H ' +(scaleX(d.values[0].x))+ ' V ' +(scaleY(d.values[0].y)-d.values[0].r+(lineH)-5);
     })
     .attr('class','details')
     .style('stroke','#636466')
     .style('stroke-width',1.5)
     .style('fill','none')
     .style('opacity',0)
     .attr('transform',rotateSymbol);

  groups.append('path')
    .data(circles)
    .filter(function(d){return d.key == 'public_transportation'})
    .attr('d',function(d){
      return 'M' +(scaleX(d.values[0].x)-5)+ ' ' +(scaleY(d.values[0].y)-d.values[0].r+(lineH)-5)+ ' H ' +(scaleX(d.values[0].x))+ ' V ' +(scaleY(d.values[0].y)-d.values[0].r-lineH-5);
    })
    .attr('class','details')
    .style('stroke','#636466')
    .style('stroke-width',1.5)
    .style('fill','none')
    .style('opacity',0)
    .attr('transform',function(d){
        return 'rotate('+ (360/(d.values[0].total+3))*(d.values[0].total+2) +','+ scaleX(d.values[0].x)+','+ scaleY(d.values[0].y) +')';
    });

  groups.selectAll('.details')
    .transition()
    .delay(6000)
    .duration(4000)
    .style('opacity',1);

/*------------------------------------------------------------------------------*/
  // append individual symbols
  // groups.append('path')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'walking'})
  //   .attr('class','symbol')
  //   .attr('d',function(d){
  //     return 'M' +(scaleX(d.values[0].x)-5)+ ' ' +(scaleY(d.values[0].y)-d.values[0].r+lineH+5)+ ' Q ' +(scaleX(d.values[0].x+0.5))+ ' ' +(scaleY(d.values[0].y)-d.values[0].r+lineH+10)+ ' ' +(scaleX(d.values[0].x)-5)+ ' ' +(scaleY(d.values[0].y)-d.values[0].r+lineH+15);
  //   })
  //   .attr('transform',rotateSymbol);
  // groups.append('path')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'walking'})
  //   .attr('class','symbol')
  //   .attr('d',function(d){
  //     return 'M' +(scaleX(d.values[0].x)+5)+ ' ' +(scaleY(d.values[0].y)-d.values[0].r+lineH+5)+ ' Q ' +(scaleX(d.values[0].x-0.5))+ ' ' +(scaleY(d.values[0].y)-d.values[0].r+lineH+10)+ ' ' +(scaleX(d.values[0].x)+5)+ ' ' +(scaleY(d.values[0].y)-d.values[0].r+lineH+15);
  //   })
  //   .attr('transform',rotateSymbol);
  //
  // groups.append('line')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'working'})
  //   .attr('class','symbol')
  //   .attr('x1',function(d){return scaleX(d.values[0].x)})
  //   .attr('x2',function(d){return scaleX(d.values[0].x)})
  //   .attr('y1',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+5})
  //   .attr('y2',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+16})
  //   .attr('transform',rotateSymbol);
  // groups.append('line')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'working'})
  //   .attr('class','symbol')
  //   .attr('x1',function(d){return scaleX(d.values[0].x)-6})
  //   .attr('x2',function(d){return scaleX(d.values[0].x)+6})
  //   .attr('y1',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+10})
  //   .attr('y2',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+10})
  //   .attr('transform',rotateSymbol);
  // groups.append('line')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'working'})
  //   .attr('class','symbol')
  //   .attr('x1',function(d){return scaleX(d.values[0].x)-5})
  //   .attr('x2',function(d){return scaleX(d.values[0].x)+5})
  //   .attr('y1',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+5})
  //   .attr('y2',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+15})
  //   .attr('transform',rotateSymbol);
  // groups.append('line')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'working'})
  //   .attr('class','symbol')
  //   .attr('x1',function(d){return scaleX(d.values[0].x)+5})
  //   .attr('x2',function(d){return scaleX(d.values[0].x)-5})
  //   .attr('y1',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+5})
  //   .attr('y2',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+15})
  //   .attr('transform',rotateSymbol);
  //
  // groups.append('path')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'waiting'})
  //   .attr('class','symbol')
  //   .attr('d',function(d){
  //     return 'M' +(scaleX(d.values[0].x)-6)+ ' ' +(scaleY(d.values[0].y)-d.values[0].r+lineH+7)+ ' H ' +(scaleX(d.values[0].x)-1.5)+ ' V ' +(scaleY(d.values[0].y)-d.values[0].r+lineH+17)+ ' H ' +(scaleX(d.values[0].x)-6);
  //   })
  //   .attr('transform',rotateSymbol);
  // groups.append('path')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'waiting'})
  //   .attr('class','symbol')
  //   .attr('d',function(d){
  //     return 'M' +(scaleX(d.values[0].x)+6)+ ' ' +(scaleY(d.values[0].y)-d.values[0].r+lineH+7)+ ' H ' +(scaleX(d.values[0].x)+1.5)+ ' V ' +(scaleY(d.values[0].y)-d.values[0].r+lineH+17)+ ' H ' +(scaleX(d.values[0].x)+6);
  //   })
  //   .attr('transform',rotateSymbol);
  //
  // groups.append('circle')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'bathroom'})
  //   .attr('class','symbol-circle')
  //   .attr('cx',function(d){return scaleX(d.values[0].x)})
  //   .attr('cy',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+8})
  //   .attr('r',4)
  //   .style('stroke','#3c3734')
  //   .style('stroke-width',1.5)
  //   .style('fill','none')
  //   .attr('transform',rotateSymbol);
  // groups.append('line')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'bathroom'})
  //   .attr('class','symbol')
  //   .attr('x1',function(d){return scaleX(d.values[0].x)+6})
  //   .attr('x2',function(d){return scaleX(d.values[0].x)-6})
  //   .attr('y1',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+4})
  //   .attr('y2',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+12})
  //   .attr('transform',rotateSymbol);
  //
  // groups.append('circle')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'couch'})
  //   .attr('class','symbol-circle')
  //   .attr('cx',function(d){return scaleX(d.values[0].x)})
  //   .attr('cy',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+8})
  //   .attr('r',4)
  //   .style('stroke','#3c3734')
  //   .style('stroke-width',1.5)
  //   .style('fill','none')
  //   .attr('transform',rotateSymbol);
  //
  // groups.append('rect')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'bed'})
  //   .attr('class','symbol')
  //   .attr('x',function(d){return scaleX(d.values[0].x)-4})
  //   .attr('y',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+5})
  //   .attr('width',8)
  //   .attr('height',8)
  //   .attr('transform',rotateSymbol);
  // groups.append('circle')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'bed'})
  //   .attr('class','symbol-circle')
  //   .attr('cx',function(d){return scaleX(d.values[0].x)})
  //   .attr('cy',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+9})
  //   .attr('r',1)
  //   .style('fill','#3c3734')
  //   .attr('transform',rotateSymbol);
  //
  // groups.append('line')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'home_other'})
  //   .attr('class','symbol')
  //   .attr('x1',function(d){return scaleX(d.values[0].x)-5})
  //   .attr('x2',function(d){return scaleX(d.values[0].x)})
  //   .attr('y1',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+12})
  //   .attr('y2',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+5})
  //   .attr('transform',rotateSymbol);
  // groups.append('line')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'home_other'})
  //   .attr('class','symbol')
  //   .attr('x1',function(d){return scaleX(d.values[0].x)+5})
  //   .attr('x2',function(d){return scaleX(d.values[0].x)})
  //   .attr('y1',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+12})
  //   .attr('y2',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+5})
  //   .attr('transform',rotateSymbol);
  //
  // groups.append('line')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'restaurants_shops'})
  //   .attr('class','symbol')
  //   .attr('x1',function(d){return scaleX(d.values[0].x)})
  //   .attr('x2',function(d){return scaleX(d.values[0].x)})
  //   .attr('y1',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+5})
  //   .attr('y2',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+15})
  //   .attr('transform',rotateSymbol);
  // groups.append('circle')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'restaurants_shops'})
  //   .attr('class','symbol-circle')
  //   .attr('cx',function(d){return scaleX(d.values[0].x)+5})
  //   .attr('cy',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+7})
  //   .attr('r',2)
  //   .style('fill','#3c3734')
  //   .attr('transform',rotateSymbol);
  // groups.append('circle')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'restaurants_shops'})
  //   .attr('class','symbol-circle')
  //   .attr('cx',function(d){return scaleX(d.values[0].x)-5})
  //   .attr('cy',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+13})
  //   .attr('r',2)
  //   .style('fill','#3c3734')
  //   .attr('transform',rotateSymbol);
  //
  // groups.append('line')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'public_transportation'})
  //   .attr('class','symbol')
  //   .attr('x1',function(d){return scaleX(d.values[0].x)-5})
  //   .attr('x2',function(d){return scaleX(d.values[0].x)})
  //   .attr('y1',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+7})
  //   .attr('y2',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH})
  //   .attr('transform',rotateSymbol);
  // groups.append('line')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'public_transportation'})
  //   .attr('class','symbol')
  //   .attr('x1',function(d){return scaleX(d.values[0].x)+5})
  //   .attr('x2',function(d){return scaleX(d.values[0].x)})
  //   .attr('y1',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+7})
  //   .attr('y2',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH})
  //   .attr('transform',rotateSymbol);
  // groups.append('line')
  //   .data(circles)
  //   .filter(function(d){return d.key == 'public_transportation'})
  //   .attr('class','symbol')
  //   .attr('x1',function(d){return scaleX(d.values[0].x)-5})
  //   .attr('x2',function(d){return scaleX(d.values[0].x)+5})
  //   .attr('y1',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+10})
  //   .attr('y2',function(d){return scaleY(d.values[0].y)-d.values[0].r+lineH+10})
  //   .attr('transform',rotateSymbol);


  function rotateSymbol(d){
    var findCx = scaleX(d.values[0].x);
    var findCy = scaleY(d.values[0].y);
    var angle = (360/(d.values[0].total+3));
    return 'rotate('+ angle +','+ findCx +','+ findCy +')';
  };

});

function parse(d){
  return {
    id: +d.id,
    x: +d.x,
    y: +d.y,
    circle_id: d.circle_id,
    place_situation: d.place_situation,
    interaction_type: d.interaction_type,
    reason_in: +d.reason_in,
    with_others_ct: +d.with_others_ct,
    others_phone_in: +d.others_phone_in
  };
};


//append rectangles
  // groups.selectAll('.instance')
  //   .data(function(d){return d.values})
  //   .enter()
  //   .append('rect')
  //   .attr('x',function(d){return scaleX(d.x)})
  //   .attr('y',function(d){
  //     if (d.reason_in == 0){
  //       return scaleY(d.y)-d.r-(rectH/2);
  //     }
  //     else if (d.reason_in == 1){
  //       return scaleY(d.y)-d.r-rectH;
  //     }
  //     else if (d.reason_in == 2){
  //       return scaleY(d.y)-d.r;
  //     }
  //   })
  //   .attr('width',2)
  //   .attr('height',rectH)
  //   .attr('transform',function(d,i){
  //     var findCx = scaleX(d.x);
  //     var findCy = scaleY(d.y);
  //     var angle = (360/(d.total+2))*(d.id+1);
  //     return 'rotate('+ angle +','+ findCx +','+ findCy +')';
  //   })
  //   .style('fill',);
