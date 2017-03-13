
var m = {t:50,r:50,b:50,l:50},
    w = document.getElementById('canvas').clientWidth - m.l - m.r,
    h = document.getElementById('canvas').clientHeight - m.t - m.b;

var plot = d3.select('.canvas')
  .append('svg')
  .attr('id','plot-size')
  .attr('width', w)
  .attr('height', h + m.t + m.b)
  .append('g').attr('class','plot');

//scale
var scaleX = d3.scaleLinear()
  .domain([0,100])
  .range([0,w]);
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

d3.csv('week_8_phone_addiction.csv',parse,function(err,rows){

  //group rows by circle
  var circles = d3.nest()
    .key(function(d){return d.place_situation})
    .entries(rows);

  var instanceArray = [];

  //add radius and description to data
  circles.forEach(function(group){
    var total = group.values.length;
    var radius = ((total + 2) * 8) / (2 * Math.PI);
    var i = 1;
    var adj = 15;

    group.values.forEach(function(instance){

      // if(instance.place_situation == 'walking'){instance.desc = 'while walking'}
      // else if(instance.place_situation == 'working'){instance.desc = 'while working'}
      // else if(instance.place_situation == 'waiting'){instance.desc = 'while waiting for something or somebody'}
      // else if(instance.place_situation == 'bathroom'){instance.desc = 'in the bathroom'}
      // else if(instance.place_situation == 'couch'){instance.desc = 'on the couch'}
      // else if(instance.place_situation == 'bed'){instance.desc = 'on the bed'}
      // else if(instance.place_situation == 'home_other'){instance.desc = 'other places at home'}
      // else if(instance.place_situation == 'restaurants_shops'){instance.desc = 'cafe/restaurants, shops...'}
      // else if(instance.place_situation == 'public_transportation'){instance.desc = 'public transportation'};
      //
      // if(instance.interaction_type == 'text_email'){instance.interaction_desc = 'text/email'}
      // else if(instance.interaction_type == 'social_media'){instance.interaction_desc = 'social media'}
      // else if(instance.interaction_type == 'other_app'){instance.interaction_desc = 'other apps'}
      // else if(instance.interaction_type == 'time'){instance.interaction_desc = 'check the time'}
      // else if(instance.interaction_type == 'weather'){instance.interaction_desc = 'check the weather'}
      // else if(instance.interaction_type == 'call'){instance.interaction_desc = 'phone call'}
      // else if(instance.interaction_type == 'text_in_room'){instance.interaction_desc = 'text with somebody who was in the room'}
      // else if(instance.interaction_type == 'charge'){instance.interaction_desc = 'to charge it'}
      // else if(instance.interaction_type == 'text_email_stefanie'){instance.interaction_desc = 'text/email you'}
      // else if(instance.interaction_type == 'photo_postcards'){instance.interaction_desc = 'take pictures of our postcards!'}
      // else if(instance.interaction_type == 'turned_face_down'){instance.interaction_desc = 'turned the phone facing the table not to see it'}
      // else if(instance.interaction_type == 'no_report'){instance.interaction_desc = 'didn\'t pick it because I didn\'t want to report it'}
      // else if(instance.interaction_type == 'thought_rang'){instance.interaction_desc = 'thought it was ringing but wasn\'t!'};
      instance.r = radius;
      instance.total = total;
      instance.id = i;
      // instance.x = instance.x + 5;

      if(instance.place_situation == 'working'){
        instance.x = instance.x + 3;
        instance.y = instance.y + 3;
      }
      else if(instance.place_situation == 'bathroom'){
        instance.x = instance.x - 2;
        instance.y = instance.y + 5;
      }
      else if(instance.place_situation == 'restaurants_shops'){
        instance.y = instance.y + 2;
      }
      else if(instance.place_situation == 'couch'){
        instance.x = instance.x - 4;
        instance.y = instance.y - 2;
      }
      else if(instance.place_situation == 'walking'){
        instance.x = instance.x + 1;
      }
      else if(instance.place_situation == 'bedroom'){
        instance.x = instance.x + 4;
        instance.y = instance.y - 4;
      }
      else if(instance.place_situation == 'home_other'){
        instance.y = instance.y - 2;
      }
      else{};

      if(instanceArray.includes(instance.interaction_type)==false){
        instanceArray.push(instance.interaction_type);
      }
      else{};
      i++;
    });
  });

  console.log(circles);
  console.log(instanceArray);


/*------------------------------------------------------------------------------*/

  // create key

  keyGroup = d3.select('.key').selectAll('.key-group')
    .data(circles)
    .enter()
    .append('g')
    .attr('id',function(d){return d.key})
    .attr('class','key-group')
    .style('display','block');

  keyGroup.append('text')
    .text(function(d){
      if(d.key == 'walking'){return 'while walking'}
      else if(d.key == 'working'){return 'while working'}
      else if(d.key == 'waiting'){return 'while waiting'}
      else if(d.key == 'bathroom'){return 'in the bathroom'}
      else if(d.key == 'couch'){return 'on the couch'}
      else if(d.key == 'bed'){return 'on the bed'}
      else if(d.key == 'home_other'){return 'other places at home'}
      else if(d.key == 'restaurants_shops'){return 'cafe/restaurants, shops...'}
      else if(d.key == 'public_transportation'){return 'public transportation'};
    })
    .style('color','#636466');

  keyInstance = d3.select('.key').selectAll('.key-instance')
    .data(instanceArray)
    .enter()
    .append('g')
    .attr('id',function(i){return i})
    .attr('class','key-instance')
    .style('display','block');

  keyInstance.append('text')
    .text(function(i){
      if(i == 'text_email'){return 'text/email'}
      else if(i == 'social_media'){return 'social media'}
      else if(i == 'other_app'){return 'other apps'}
      else if(i == 'time'){return 'check the time'}
      else if(i == 'weather'){return 'check the weather'}
      else if(i == 'call'){return 'phone call'}
      else if(i == 'text_in_room'){return 'text with somebody in the room'}
      else if(i == 'charge'){return 'to charge it'}
      else if(i == 'text_email_stefanie'){return 'text/email you'}
      else if(i == 'photo_postcards'){return 'take pictures of our postcards!'}
      else if(i == 'turned_face_down'){return 'turned the phone not to see it'}
      else if(i == 'no_report'){return 'I didn\'t want to report it'}
      else if(i == 'thought_rang'){return 'thought it rang but it didn\'t!'};
    })
    .style('color',function(i){
      if (i == 'text_email'){return '#f9a980';}
      else if (i == 'social_media'){return '#ac5e93';}
      else if (i == 'other_app'){return '#7777a4';}
      else if (i == 'time'){return '#b9d086';}
      else if (i == 'weather'){return '#7cc4cb';}
      else if (i == 'call'){return '#3683a4'}
      else if (i == 'text_in_room'){return '#76b88f';}
      else if (i == 'charge'){return '#f04e6e';}
      else if (i == 'text_email_stefanie' || i == 'photo_postcards'){return '#f48f9f';}
      else {return '#636466';}
    });

  d3.select('.key')
    .append('g')
    .attr('id','with-others')
    .attr('class','key-attr')
    .style('display','block')
    .append('text')
    .text('with others')
    .style('color','#636466');

  d3.select('.key')
    .append('g')
    .attr('id','other-phone')
    .attr('class','key-attr')
    .append('text')
    .style('display','block')
    .text('used someone else\'s phone')
    .style('color','#636466');

  d3.select('.key')
    .append('g')
    .attr('id','picked-purposely')
    .attr('class','key-attr')
    .append('text')
    .style('display','block')
    .text('picked purposely')
    .style('color','#636466');

  d3.select('.key')
    .append('g')
    .attr('id','picked-alert')
    .attr('class','key-attr')
    .append('text')
    .style('display','block')
    .text('picked because of an alert')
    .style('color','#636466');

  //create <g> for each group
  var groups = plot.selectAll('.groups')
    .data(circles)
    .enter()
    .append('g')
    .attr('class','groups');

  //append symbols
  var symbolR = circles[8].values[0].r;
  function addSymbol(filterKey, fileName){
    var symbol = groups.data(circles)
      .filter(function(d){return d.key == filterKey})
      .append('image')
      .attr('href','./icons/' + fileName + '.svg')
      .attr('class','symbols')
      .attr('x',function(d){return scaleX(d.values[0].x)-(symbolR/2)})
      .attr('y',function(d){
        if(d.key == 'walking' || d.key == 'couch' || d.key == 'restaurants_shops'){
          return scaleY(d.values[0].y)-d.values[0].r-lineH-5-symbolR
        }
        else{
          return scaleY(d.values[0].y)-d.values[0].r-lineH-10-symbolR
        }
      })
      .attr('height',0)
      .attr('width',0);
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
    .delay(function(d){return (d.values[0].circle_id-1)*200})
    .duration(2000)
    // .attr('x',function(d){return scaleX(d.values[0].x)-(symbolR/2)})
    // .attr('y',function(d){
    //   if(d.key == 'public_transportation'){
    //     return scaleY(d.values[0].y)-d.values[0].r+lineH-5
    //   }
    //   else{
    //     return scaleY(d.values[0].y)-d.values[0].r+lineH+5
    //   }
    // })
    .attr('height',symbolR*2)
    .attr('width',symbolR*2)
    .transition()
    .duration(2000)
    // .attr('transform',rotateSymbol)
    .attr('height',symbolR)
    .attr('width',symbolR);

    function rotateSymbol(d){
      var findCx = scaleX(d.values[0].x);
      var findCy = scaleY(d.values[0].y);
      var angle = (360/(d.values[0].total+3));
      return 'rotate('+ angle +','+ findCx +','+ findCy +')';
    };

    /*------------------------------------------------------------------------------*/
      // append beginning and end circle attributes
      var bracketL = groups.data(circles)
         .filter(function(d){return d.key != 'public_transportation'})
         .append('path')
         .attr('d',function(d){
           return 'M' +(scaleX(d.values[0].x)+5)+ ' ' +(scaleY(d.values[0].y)-d.values[0].r-lineH-5)+ ' H ' +(scaleX(d.values[0].x))+ ' V ' +(scaleY(d.values[0].y)-d.values[0].r+lineH+5);
         })
         .attr('class','details-start')
         .style('stroke','#636466')
         .style('stroke-width',1.5)
         .style('fill','none')
        //  .style('opacity',0)
         .attr('transform',rotateSymbol);

      groups.data(circles)
        .filter(function(d){return d.key != 'public_transportation'})
        .append('path')
        .attr('d',function(d){
          return 'M' +(scaleX(d.values[0].x)-5)+ ' ' +(scaleY(d.values[0].y)-d.values[0].r+lineH+5)+ ' H ' +(scaleX(d.values[0].x))+ ' V ' +(scaleY(d.values[0].y)-d.values[0].r-lineH-5);
        })
        .attr('class','details-end')
        .style('stroke','#636466')
        .style('stroke-width',1.5)
        .style('fill','none')
        // .style('opacity',0)
        .attr('transform',function(d){
            return 'rotate('+ (360/(d.values[0].total+3))*(d.values[0].total+2) +','+ scaleX(d.values[0].x)+','+ scaleY(d.values[0].y) +')';
        });

      var bracketS = groups.data(circles)
         .filter(function(d){return d.key == 'public_transportation'})
         .append('path')
         .attr('d',function(d){
           return 'M' +(scaleX(d.values[0].x)+5)+ ' ' +(scaleY(d.values[0].y)-d.values[0].r-lineH-5)+ ' H ' +(scaleX(d.values[0].x))+ ' V ' +(scaleY(d.values[0].y)-d.values[0].r+(lineH)-5);
         })
         .attr('class','details-start')
         .style('stroke','#636466')
         .style('stroke-width',1.5)
         .style('fill','none')
        //  .style('opacity',0)
         .attr('transform',rotateSymbol);

      groups.data(circles)
        .filter(function(d){return d.key == 'public_transportation'})
        .append('path')
        .attr('d',function(d){
          return 'M' +(scaleX(d.values[0].x)-5)+ ' ' +(scaleY(d.values[0].y)-d.values[0].r+(lineH)-5)+ ' H ' +(scaleX(d.values[0].x))+ ' V ' +(scaleY(d.values[0].y)-d.values[0].r-lineH-5);
        })
        .attr('class','details-end')
        .style('stroke','#636466')
        .style('stroke-width',1.5)
        .style('fill','none')
        // .style('opacity',0)
        .attr('transform',function(d){
            return 'rotate('+ (360/(d.values[0].total+3))*(d.values[0].total+2) +','+ scaleX(d.values[0].x)+','+ scaleY(d.values[0].y) +')';
        });

    var lengthL = bracketL.node().getTotalLength();
    var lengthS = bracketS.node().getTotalLength();

      groups.selectAll('.details-start')
        .attr('stroke-dasharray',function(d){
          if(d.key == 'public_transportation'){return lengthS + ' ' + lengthS}
          else{return lengthL + ' ' + lengthL}
        })
        .attr("stroke-dashoffset", function(d){
          if(d.key == 'public_transportation'){return lengthS}
          else{return lengthL}
        })
        .transition()
        .delay(function(d){return 4000+((d.values[0].circle_id-1)*200)})
        .duration(2000)
        .attr("stroke-dashoffset", 0);

      groups.selectAll('.details-end')
        .attr('stroke-dasharray',function(d){
          if(d.key == 'public_transportation'){return lengthS + ' ' + lengthS}
          else{return lengthL + ' ' + lengthL}
        })
        .attr("stroke-dashoffset", function(d){
          if(d.key == 'public_transportation'){return lengthS}
          else{return lengthL}
        })
        .transition()
        .delay(function(d){return 4000+(((d.values[0].total+1)*150)+(d.values[0].circle_id-1)*200)})
        .duration(2000)
        .attr("stroke-dashoffset", 0);

/*------------------------------------------------------------------------------*/
  //append g element for every instance
  var instances = groups.selectAll('.instance')
    .data(function(d){return d.values})
    .enter()
    .append('g')
    .attr('class','instance-group');

  //append lines for each instance
  instances.data(function(d){return d.values})
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
    .delay(function(d){return cascade(d)})
    .style('stroke', color)
    .style('stroke-linecap','round')
    .style('stroke-dasharray',dash)
    .transition()
    .duration(2000)
    .attr('y2',positionEnd);


  //append circles for interaction_type == 'photo_postcards'
  instances.data(function(d){return d.values})
    .filter(function(d){return d.interaction_type == 'photo_postcards'})
    .append('circle')
    .attr('class','instances')
    .attr('cx',function(d){return scaleX(d.x)})
    .attr('cy',function(d){return scaleY(d.y)-d.r-2})
    .attr('r',2)
    .style('fill','none')
    .attr('transform',rotate)
    .transition()
    .delay(function(d){return cascade(d)})
    .duration(1000)
    .style('fill',color);

  //append double line for interaction_type == 'thought_rang'
  instances.data(function(d){return d.values})
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
    .delay(function(d){return cascade(d)})
    .style('stroke', color)
    .style('stroke-linecap','round')
    .transition()
    .duration(2000)
    .attr('y1',function(d){return scaleY(d.y)-d.r-(lineH/2);})
    .attr('y2',positionEnd);
  instances.data(function(d){return d.values})
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
    .delay(function(d){return cascade(d)})
    .style('stroke', color)
    .style('stroke-linecap','round')
    .transition()
    .duration(2000)
    .attr('y1',function(d){return scaleY(d.y)-d.r-(lineH/2);})
    .attr('y2',positionEnd);

  var path1 = instances.data(function(d){return d.values})
    .filter(function(d){return d.interaction_type == 'turned_face_down'})
    .append('path')
    .attr('class','instances')
    .attr('d',function(d){
      return 'M' +scaleX(d.x)+ ' ' +(scaleY(d.y)-d.r)+ ' Q ' +(scaleX(d.x)-5)+ ' ' +(scaleY(d.y)-d.r-((lineH/4))+ ' ' +scaleX(d.x)+ ' ' +(scaleY(d.y)-d.r-(lineH/2)));
    })
    .style('stroke-width',stroke)
    .style('stroke',color)
    .style('stroke-linecap','round')
    .style('fill','none')
    .attr('transform',rotate);

    var path2 = instances.data(function(d){return d.values})
      .filter(function(d){return d.interaction_type == 'turned_face_down'})
      .append('path')
      .attr('class','instances')
      .attr('d',function(d){
        return 'M' +scaleX(d.x)+ ' ' +(scaleY(d.y)-d.r)+ ' Q ' +(scaleX(d.x)+5)+ ' ' +(scaleY(d.y)-d.r+((lineH/4))+ ' ' +scaleX(d.x)+ ' ' +(scaleY(d.y)-d.r+(lineH/2)));
      })
      .style('stroke-width',stroke)
      .style('stroke',color)
      .style('stroke-linecap','round')
      .style('fill','none')
      .attr('transform',rotate);

  var totalLength = path1.node().getTotalLength();

  path1
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .delay(function(d){return cascade(d)})
    .duration(2000)
    .attr("stroke-dashoffset", 0);

  path2
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .delay(function(d){return cascade(d)})
    .duration(2000)
    .attr("stroke-dashoffset", 0);

/*------------------------------------------------------------------------------*/
      //append others_phone_in attribute
      instances.data(function(d){return d.values})
        .filter(function(d){return d.others_phone_in == 1})
        .append('line')
        .attr('class','details')
        .attr('x1',function(d){return scaleX(d.x)})
        .attr('x2',function(d){return scaleX(d.x)})
        .attr('y1',function(d){return scaleY(d.y)-d.r-lineH-5})
        .attr('y2',function(d){return scaleY(d.y)-d.r-lineH-5})
        .style('stroke-width',0)
        .style('stroke', '#636466')
        .style('stroke-linecap','round')
        .attr('transform',rotate)
        .transition()
        .delay(function(d){return cascade(d)+1500})
        .duration(500)
        .style('stroke-width',1.5)
        .transition()
        .duration(1000)
        .attr('x1',function(d){return scaleX(d.x)-2})
        .attr('x2',function(d){return scaleX(d.x)+2});

        // append with_others_ct attribute: iterated dynamically
        var max = d3.max(rows, function(d) { return d.with_others_ct; });
        var i;
        for(i = 1; i <= max; i++){
          instances.data(function(d){return d.values})
            .filter(function(d){return d.with_others_ct >= i})
            .append('circle')
            .attr('class','details')
            .attr('r',0)
            .attr('cx',function(d){return scaleX(d.x)})
            .attr('cy',function(d){
              if(d.interaction_type == 'photo_postcards'){
                return scaleY(d.y)-d.r-2-(6*i);
              }
              else if(d.reason_in == 1){
                if(d.others_phone_in == 1){
                  return scaleY(d.y)-d.r-lineH-4-(6*i);
                }
                else{
                  return scaleY(d.y)-d.r-lineH-(6*i);
                }
              }
              else if(d.reason_in == 2){
                return scaleY(d.y)-d.r-(6*i);
              }
              else{
                return scaleY(d.y)-d.r-(lineH/2)-(6*i);
              }
            })
            .style('fill','#636466')
            .attr('transform',rotate)
            .transition()
            .delay(function(d){return cascade(d)+2000+((i-1)*500)})
            .duration(1000)
            .attr('r',1);
        };

/*------------------------------------------------------------------------------*/
  // enable interactions
  instances.on('mouseenter',function(d){

        var thisLine = this;
        var thisType = d.interaction_type;
        var thisWithOthers = d.with_others_ct;
        var thisOtherPhone = d.others_phone_in;
        var thisKey = d.place_situation;
        var thisReason = d.reason_in;

        instances.transition()
          .duration(500)
          .style('opacity',function(d){
            if(d.interaction_type == thisType){return 1;}
            else{return .1;}
        });
        groups.selectAll('.details-start')
          .transition()
          .duration(500)
          .style('opacity',function(d){
            if(d.key == thisKey){return 1;}
            else{return .1;}
          });
        groups.selectAll('.details-end')
          .transition()
          .duration(500)
          .style('opacity',function(d){
            if(d.key == thisKey){return 1;}
            else{return .1;}
          });
          groups.selectAll('.symbols')
            .transition()
            .duration(500)
            .style('opacity',function(d){
              if(d.key == thisKey){return 1;}
              else{return .1;}
            });
          keyGroup.transition()
            .duration(500)
            .style('opacity',function(d){
              if(d.key == thisKey){return 1;}
              else{return .1;}
            })
          keyInstance.transition()
            .duration(500)
            .style('opacity',function(d){
              if(d == thisType){return 1;}
              else{return .1;}
            })
          d3.select('#with-others')
            .transition()
            .duration(500)
            .style('opacity',function(d){
              if(thisWithOthers > 0){return 1;}
              else{return .1;}
            })
          d3.select('#other-phone')
            .transition()
            .duration(500)
            .style('opacity',function(d){
              if(thisOtherPhone > 0){return 1;}
              else{return .1;}
            })
          d3.select('#picked-purposely')
            .transition()
            .duration(500)
            .style('opacity',function(d){
              if(thisReason == 1){return 1;}
              else{return .1;}
            })
          d3.select('#picked-alert')
            .transition()
            .duration(500)
            .style('opacity',function(d){
              if(thisReason == 2){return 1;}
              else{return .1;}
            })
      })
      .on('mouseleave',function(d){
        instances.transition()
          .duration(500)
          .style('opacity',1);
        groups.selectAll('.symbols')
          .transition()
          .duration(500)
          .style('opacity',1);
        groups.selectAll('.details-start')
          .transition()
          .duration(500)
          .style('opacity',1);
        groups.selectAll('.details-end')
          .transition()
          .duration(500)
          .style('opacity',1);
        keyGroup.transition()
          .duration(500)
          .style('opacity',1);
        keyInstance.transition()
          .duration(500)
          .style('opacity',1);
        d3.selectAll('.key-attr')
          .transition()
          .duration(500)
          .style('opacity',1);
    });

    keyGroup.on('mouseenter',function(d){
      var thisKey = this.id;

      // keyGroup.transition()
      //   .duration(500)
      //   .style('opacity',function(d){
      //     if(d.key == thisKey){return 1;}
      //     else{return .1;}
      //   });

        groups.selectAll('.symbols')
          .transition()
          .duration(500)
          .style('opacity',function(d){
            if(d.key == thisKey){return 1;}
            else{return .1;}
          })

        instances.transition()
          .duration(500)
          .style('opacity',function(d){
            if(d.place_situation == thisKey){return 1;}
            else{return .1;}
          })

        groups.selectAll('.details-start')
          .transition()
          .duration(500)
          .style('opacity',function(d){
            if(d.key == thisKey){return 1;}
            else{return .1;}
          })
        groups.selectAll('.details-end')
          .transition()
          .duration(500)
          .style('opacity',function(d){
            if(d.key == thisKey){return 1;}
            else{return .1;}
          })
        })
        .on('mouseleave',function(d){
        // keyGroup.transition()
        // .transition()
        // .duration(500)
        // .style('opacity',1)
        groups.selectAll('.symbols')
        .transition()
        .duration(500)
        .style('opacity',1)
        instances.transition()
        .duration(500)
        .style('opacity',1)
        groups.selectAll('.details-start')
        .transition()
        .duration(500)
        .style('opacity',1)
        groups.selectAll('.details-end')
        .transition()
        .duration(500)
        .style('opacity',1)
        });


    keyInstance.on('mouseenter',function(d){
        var thisType = this.id;
        // keyInstance.transition()
        //   .duration(500)
        //   .style('opacity',function(d){
        //     if(this.id == thisType){return 1;}
        //     else{return .1;}
        //   });
        instances.transition()
          .duration(500)
          .style('opacity',function(d){
            if(d.interaction_type == thisType){return 1;}
            else{return .1;}
          });
        groups.selectAll('.details-start')
          .transition()
          .duration(500)
          .style('opacity',.1);
        groups.selectAll('.details-end')
          .transition()
          .duration(500)
          .style('opacity',.1);
        groups.selectAll('.symbols')
          .transition()
          .duration(500)
          .style('opacity',.1);
    })
    .on('mouseleave',function(d){
        // instances.transition()
        //   .duration(500)
        //   .style('opacity',1);
        keyInstance.transition()
          .duration(500)
          .style('opacity',1)
        groups.selectAll('.details-start')
          .transition()
          .duration(500)
          .style('opacity',1)
        groups.selectAll('.details-end')
          .transition()
          .duration(500)
          .style('opacity',1)
        groups.selectAll('.symbols')
          .transition()
          .duration(500)
          .style('opacity',1);
    });

  d3.select('#with-others')
    .on('mouseenter',function(d){
      instances.transition()
        .duration(500)
        .style('opacity',function(d){
          if(d.with_others_ct > 0){return 1;}
          else{return .1;}
        })
      groups.selectAll('.details-start')
        .transition()
        .duration(500)
        .style('opacity',.1);
      groups.selectAll('.details-end')
        .transition()
        .duration(500)
        .style('opacity',.1);
      groups.selectAll('.symbols')
        .transition()
        .duration(500)
        .style('opacity',.1);
    })
    .on('mouseleave',function(d){
      instances.transition()
        .duration(500)
        .style('opacity',1);
      groups.selectAll('.details-start')
        .transition()
        .duration(500)
        .style('opacity',1);
      groups.selectAll('.details-end')
        .transition()
        .duration(500)
        .style('opacity',1);
      groups.selectAll('.symbols')
        .transition()
        .duration(500)
        .style('opacity',1);
    });

    d3.select('#picked-purposely')
      .on('mouseenter',function(d){
        // d3.select('#picked-alert')
        //   .transition()
        //   .duration(500)
        //   .style('opacity',.1)
        instances.transition()
          .duration(500)
          .style('opacity',function(d){
            if(d.reason_in == 1){return 1;}
            else{return .1;}
          })
        groups.selectAll('.details-start')
          .transition()
          .duration(500)
          .style('opacity',.1);
        groups.selectAll('.details-end')
          .transition()
          .duration(500)
          .style('opacity',.1);
        groups.selectAll('.symbols')
          .transition()
          .duration(500)
          .style('opacity',.1);
      })
      .on('mouseleave',function(d){
        // d3.selectAll('.key-attr')
        //   .duration(500)
        //   .style('opacity',1)
        instances.transition()
          .duration(500)
          .style('opacity',1);
        groups.selectAll('.details-start')
          .transition()
          .duration(500)
          .style('opacity',1);
        groups.selectAll('.details-end')
          .transition()
          .duration(500)
          .style('opacity',1);
        groups.selectAll('.symbols')
          .transition()
          .duration(500)
          .style('opacity',1);
      });

    d3.select('#picked-alert')
      .on('mouseenter',function(d){
        // d3.select('#picked-purposely')
        //   .transition()
        //   .duration(500)
        //   .style('opacity',.1)
        instances.transition()
          .duration(500)
          .style('opacity',function(d){
            if(d.reason_in == 2){return 1;}
            else{return .1;}
          })
        groups.selectAll('.details-start')
          .transition()
          .duration(500)
          .style('opacity',.1);
        groups.selectAll('.details-end')
          .transition()
          .duration(500)
          .style('opacity',.1);
        groups.selectAll('.symbols')
          .transition()
          .duration(500)
          .style('opacity',.1);
      })
      .on('mouseleave',function(d){
        // d3.selectAll('.key-attr')
        //   .duration(500)
        //   .style('opacity',1)
        instances.transition()
          .duration(500)
          .style('opacity',1);
        groups.selectAll('.details-start')
          .transition()
          .duration(500)
          .style('opacity',1);
        groups.selectAll('.details-end')
          .transition()
          .duration(500)
          .style('opacity',1);
        groups.selectAll('.symbols')
          .transition()
          .duration(500)
          .style('opacity',1);
      });

    d3.select('#other-phone')
      .on('mouseenter',function(d){
        instances.transition()
          .duration(500)
          .style('opacity',function(d){
            if(d.others_phone_in == 1){return 1;}
            else{return .1;}
          })
        groups.selectAll('.details-start')
          .transition()
          .duration(500)
          .style('opacity',.1);
        groups.selectAll('.details-end')
          .transition()
          .duration(500)
          .style('opacity',.1);
        groups.selectAll('.symbols')
          .transition()
          .duration(500)
          .style('opacity',.1);
      })
      .on('mouseleave',function(d){
        instances.transition()
          .duration(500)
          .style('opacity',1);
        groups.selectAll('.details-start')
          .transition()
          .duration(500)
          .style('opacity',1);
        groups.selectAll('.details-end')
          .transition()
          .duration(500)
          .style('opacity',1);
        groups.selectAll('.symbols')
          .transition()
          .duration(500)
          .style('opacity',1);
      });

  groups.selectAll('.symbols')
    .on('mouseenter',function(d){
      var thisKey = d.key;
      // console.log(thisKey);
      // function findKey(d){ return d.key == thisKey};
      // var thisIndex = circles.findIndex(findKey);
      // groupArray = rows.filter(function(d){return d.place_situation == thiskey});
      // console.log(groupArray);

      groups.selectAll('.symbols')
        .transition()
        .duration(500)
        .style('opacity',function(d){
          if(d.key == thisKey){return 1;}
          else{return .1;}
        })

      instances.transition()
        .duration(500)
        .style('opacity',function(d){
          if(d.place_situation == thisKey){return 1;}
          else{return .1;}
        })

      groups.selectAll('.details-start')
        .transition()
        .duration(500)
        .style('opacity',function(d){
          if(d.key == thisKey){return 1;}
          else{return .1;}
        })
      groups.selectAll('.details-end')
        .transition()
        .duration(500)
        .style('opacity',function(d){
          if(d.key == thisKey){return 1;}
          else{return .1;}
        })

      keyGroup.transition()
        .duration(500)
        .style('opacity',function(d){
          if(d.key == thisKey){return 1;}
          else{return .1;}
        })

        //doesn't work
        keyInstance.transition()
          .duration(500)
          .style('opacity',function(d){
            var x = 0;
            circles.forEach(function(group){
              if(group.key == thisKey){
                group.values.forEach(function(instance){
                  if(instance.interaction_type == d.interaction_type){
                    x++;
                  }
                })
              }
              console.log(x);
              if(x > 0){return 1;}
              else{return .1;}
            });
          })

      // keyInstance.transition()
      //   .duration(500)
      //   .style('opacity',function(d,i){
      //     if(d.place_situation == thisKey && circle[thisIndex].values[i].includes(d.interaction_type)){return 1;}
      //     else{return .1;}
      //   })

      // keyInstance.transition()
      //   .duration(500)
      //   .style('opacity',function(d){
      //     var x = 0;
      //     if(d.place_situation == thisKey && (rows[].place_situation == thisKey && rows[].interaction_type == d.interaction_type)){
      //       x++;
      //     };
      //     console.log(x);
      //     if(x>0){return 1;}
      //     else{return .1;}
      //   })

    })
    .on('mouseleave',function(d){

    groups.selectAll('.symbols')
      .transition()
      .duration(500)
      .style('opacity',1)
    instances.transition()
      .duration(500)
      .style('opacity',1)
    groups.selectAll('.details-start')
      .transition()
      .duration(500)
      .style('opacity',1)
    groups.selectAll('.details-end')
      .transition()
      .duration(500)
      .style('opacity',1)
    keyGroup.transition()
      .duration(500)
      .style('opacity',1)
    });

/*------------------------------------------------------------------------------*/
  //functions
  function cascade(d){
    return 4000+(d.id*150)+((d.circle_id-1)*200)
  };

  function rotate(d){
    var findCx = scaleX(d.x);
    var findCy = scaleY(d.y);
    var angle = (360/(d.total+3))*(d.id+1);
    return 'rotate('+ angle +','+ findCx +','+ findCy +')';
  };

  function positionStart(d){
      return scaleY(d.y)-d.r;
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

});

/*------------------------------------------------------------------------------*/

function parse(d){
  return {
    id: +d.id,
    x: +d.x,
    y: +d.y,
    circle_id: +d.circle_id,
    place_situation: d.place_situation,
    interaction_type: d.interaction_type,
    reason_in: +d.reason_in,
    with_others_ct: +d.with_others_ct,
    others_phone_in: +d.others_phone_in
  };
};
