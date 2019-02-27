define([], function() {

    return {
        drawHistoryBarChart: function (historyBarChartDivIdSelector, scoreHistory) {
            //size
            var margin = {top: 80, right: 80, bottom: 80, left: 80},
                width = 1000 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            // scale and range
            var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
            var y = d3.scale.linear().range([height, 0]);

            var darkGreen = "#4F612C",
                lightGreen = "#8ac832",
                orange = "#f99400",
                lightRed = "#c32527",
                darkRed = "#763430";

            // color range
            var color = d3.scale.ordinal().range([darkGreen, lightGreen,orange,lightRed,darkRed]).domain(["A", "B", "C","D","E"]);

            // create axis
            var xAxis = d3.svg.axis().scale(x).orient("bottom");
            var yAxis = d3.svg.axis().scale(y).orient("left");

            // create the svg
            var svg = d3.select(historyBarChartDivIdSelector).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // x range based on score name
            x.domain(scoreHistory.map(function (score) { return score.month; }));

            // y range fixed from 0 to 100
            y.domain([0, 100]);

            // draw x axis
            svg.append("g")
                .attr("class", "x barChartAxis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // draw y axis
            svg.append("g")
                .attr("class", "y barChartAxis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em");


            // draw bars
            var bar = svg.selectAll(".bar")
                .data(scoreHistory)
                .enter();

            // bars
            bar.append("rect")
                .style("fill", function(score) { return color(score.clazz);})
                .attr("x", function (score) { return x(score.date); })
                .attr("width", x.rangeBand())
                .attr("y", function (score) { return y(score.value); })
                .attr("height", function (score) { return height - y(score.value); });

            // label on top of each bar
            bar.append("text")
                .text(function(score) {return score.value;})
                .attr("text-anchor", "middle")
                .attr("x", function (score,i) { return x(i) + 30;})
                .attr("y", function (score) { return height - (height- y(score.value) +5); });
        },

        drawHistoryLineChart: function (scoreHistory, $container, options) {
            var color = d3.scale.ordinal().range(options.colorRange).domain(["A", "B", "C","D","E"]);

            // var colorThresholds = [4, 11, 78,90];
            var colorThresholds = [7, 15, 83, 90];

            var classLegend = [
                {name : "A", position : 3},
                {name : "B", position : 11},
                {name : "C", position : 45},
                {name : "D", position : 86.5},
                {name : "E", position : 95}];

            // Default options
            var margin = {top: 80, right: 80, bottom: 80, left: 80},
                width = 1000,
                height = 500;

            if (options) {
                for (var pos in options.margin) {
                    if (options.margin[pos] != undefined) {
                        margin[pos] = options.margin[pos];
                    }
                }
                width = options.width ? options.width : width;
                height = options.height ? options.height : height;
            }

            width = width - margin.left - margin.right;
            height = height - margin.top - margin.bottom;

            // scale and range
            var x = d3.time.scale().range([0, width]);
            // x range based on date
            x.domain(d3.extent(scoreHistory, function (score) {
                return moment(score.date);
            }));

            // y range fixed from 0 to 100
            var y = d3.scale.linear().range([height, 0]);
            y.domain([0, 100]);

            //create axis
            var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format("%b %y")).ticks(scoreHistory.length),
                yAxis = d3.svg.axis().scale(y).orient("left");

            // create the svg
            var svg = d3.select($container.get(0)).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // draw horizontal line separator
            svg.selectAll(".hline").data(colorThresholds).enter()
                .append("line")
                .attr("y1", function (threshold) {
                    return y(threshold);
                })
                .attr("y2", function (threshold) {
                    return y(threshold);
                })
                .attr("x1", 0)
                .attr("x2", width + 30)
                .style("stroke", "#A4A4A4")
                .style("stroke-width","1px")
                .style("stroke-dasharray", ("3, 3"));

            // draw legend on the right
            var legendPoints = svg.selectAll(".point")
                .data(classLegend)
                .enter();

            legendPoints.append("svg:circle")
                .attr("fill", function(classElement) { return color(classElement.name); })
                .attr("cx", width + 20)
                .attr("cy", function(classElement) { return y(classElement.position); })
                .attr("r", 9);

            // draw x axis
            svg.append("g")
                .attr("class", "x lineChartAxis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // draw y axis
            svg.append("g")
                .attr("class", "y lineChartAxis")
                .call(yAxis);

            // draw lines
            var lines = d3.svg.line()
                .x(function (score) { return x(moment(score.date)); })
                .y(function (score) { return y(score.value); });

            svg.append("path")
                .datum(scoreHistory)
                .attr("class", "lineChartLine")
                .attr("d", lines);

            // draw points
            var points = svg.selectAll(".point")
                .data(scoreHistory)
                .enter();

            points.append("svg:circle")
                .attr("fill", function(score) { return color(score.clazz); })
                .attr("cx", function(score) { return x(moment(score.date)); })
                .attr("cy", function(score) { return y(score.value); })
                .attr("r", 5);

            // label with te value on top of each point
            points.append("text")
                .text(function(score) {return score.value;})
                .attr("class","pointChartLabel")
                .attr("text-anchor", "middle")
                .attr("x", function (score,i) { return i==0 ? x(moment(score.date)) + 10 : x(moment(score.date)) ;})
                .attr("y", function (score) { return height - (height- y(score.value) + 12); });
        },

        drawDevelopmentForecastChart: function ($container, data) {
            var trendsGrossValues = this._transformDevelopmentData(data);
            var currentIndustryGroup = _.findWhere(trendsGrossValues, {industry_group: data.industry_group});
            var currentText = {};

            // prepare calculations for chart
            var margin = {top: 20, right: 35, bottom: 10, left: 10},
                width = 525 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom,
                industryTextHeight = 200,
                chartHeight = height - industryTextHeight;

            var svg = d3.select($container.get(0))
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);

            var container = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            var xScale = d3.scale.ordinal()
                .domain(trendsGrossValues.map(function (d) { return d.industry_group }))
                .rangeBands([0, width], 0.2, 1);

            var yScaleMin = -2;
            var yScale = d3.scale.linear()
                .domain([yScaleMin, d3.max(trendsGrossValues, function (d) { return d.value })])
                .range([chartHeight, 0]);

            var y2Scale = d3.scale.linear()
                .domain([0, d3.max(trendsGrossValues, function (d) { return d.futureDevelopment }) * 1.75])
                .range([yScale(0), -17]); // magic number '-17' to make y2Scale's ticks have same division distance with yScale's ticks

            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom')
                .tickSize(-height)
                .tickPadding(0)
                .tickFormat(function (d) {
                    return $.i18n.map.industry.group[d]
                });

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left')
                .ticks(6)
                .innerTickSize(-width)
                .tickPadding(0);

            var y2Axis = d3.svg.axis()
                .scale(y2Scale)
                .orient('left')
                .ticks(4)
                .innerTickSize(-width)
                .tickFormat(function (d) {
                    return d + '%'
                })
                .tickPadding(0);

            // axis X
            container.append('g')
                .attr('class', 'axis-x')
                .attr('transform', 'translate(0,' + chartHeight + ')')
                .call(xAxis)
                .call(function (g) {
                    g.select('.domain').remove();
                    currentText = g.selectAll('.tick')
                        .filter(function (d) {
                            return d === currentIndustryGroup.industry_group
                        })
                        .select('text');
                })
                .selectAll('text')
                .style('text-anchor', 'start')
                .attr('width', industryTextHeight)
                .attr('dx', '10')
                .attr('dy', (xScale.rangeBand() / 2) - 2) // magic number 2 for center text
                .attr('transform', 'rotate(90)')
                .each(this._wrapLongText);

            // axis Y
            container.append('g')
                .attr('class', 'axis-y')
                .call(yAxis)
                .call(function (g) {
                    g.select('.domain').remove();
                    g.selectAll('.tick line')
                        .attr('stroke', '#D4D8DA')
                        .attr('x1', 5);

                    g.selectAll('.tick')
                        .filter(function (d) {
                            return d === 0
                        })
                        .select('line')
                        .attr('class', 'bottom-x-axis')
                        .style('stroke', 'black')
                        .style('stroke-width', 1);
                });

            // axis Y2
            container.append('g')
                .attr('class', 'axis-y2')
                .attr('transform', 'translate(' + (width + 5) + ' ,0)')
                .call(y2Axis)
                .call(function (g) {
                    g.select('.domain').remove();
                    g.selectAll('text')
                        .style('text-anchor', 'start')
                });

            // bars
            container.selectAll('bar')
                .data(trendsGrossValues)
                .enter().append('rect')
                .style('fill', function (d) {
                    var color = '#706F6F'
                    if (d.value > 0.5) {
                        color = '#007b9a'
                    } else if (d.value < -0.5) {
                        color = '#da2323'
                    }

                    return color
                })
                .attr('x', function (d) { return xScale(d.industry_group) })
                .attr('y', function (d) {
                    var value = d.value > 0 ? d.value : 0;
                    return yScale(value)
                })
                .attr('width', xScale.rangeBand())
                .attr('height', function (d) {
                    return Math.abs(yScale(d.value) - yScale(0))
                });

            // highlight bar
            var yAxisBarHeight = Math.abs(yScale(currentIndustryGroup.value > 0 ? currentIndustryGroup.value : 0) - yScale(yScaleMin)),
                xAxisPadding = 10,
                textPadding = 5,
                highlightHeight = yAxisBarHeight + xAxisPadding + currentText[0][0].getBBox().width + textPadding;

            var ratio = 1.35,
                highlightWidth = xScale.rangeBand() * ratio,
                distanceToCenter = (highlightWidth - xScale.rangeBand()) / 2;

            container.append('rect')
                .attr('x', xScale(currentIndustryGroup.industry_group) - distanceToCenter)
                .attr('y', function () {
                    var value = currentIndustryGroup.value > 0 ? currentIndustryGroup.value : 0;
                    return yScale(value) - 3;
                })
                .attr('class', 'current-industry-group')
                .attr('width', highlightWidth)
                .attr('height', highlightHeight)
                .style('fill', 'grey')
                .style('fill-opacity', '0.4')
                .append('title')
                .text($.i18n.map.industry.group[currentIndustryGroup.industry_group]);

            // circle
            this._drawScatterplot(container, trendsGrossValues, xScale, y2Scale);

            container.selectAll('.tick text')
                .attr('fill', '#575756')
                .attr('font-size', '12px');
        },

        drawEmploymentTrendsChart: function ($container, swissData, industryData) {
            var margin = {top: 20, right: 30, bottom: 30, left: 70},
                width = 525 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom,
                tickAxisPadding = 12,
                yTickCount = 5;

            var swissEmployment = this._getAdjustedEmploymentData(swissData),
                industryEmployment = this._getAdjustedEmploymentData(industryData),
                dataMerged = swissEmployment.concat(industryEmployment);

            var minDate = moment(swissEmployment[0].date).startOf('year'),
                maxDate = moment(_.last(swissEmployment).date).subtract(1).endOf('year'),
                xScale = d3.time.scale().range([0, width]).domain([minDate, maxDate]).nice();

            var yScale = d3.scale.linear()
                .range([height - margin.top, 0])
                .domain(d3.extent(dataMerged, function (d) {
                    return d.value;
                }))
                .nice(yTickCount);

            var xLineChartAxis = d3.svg.axis().scale(xScale)
                .ticks(d3.time.month, 3)
                .tickSize(0, 0)
                .orient('bottom')
                .tickFormat(function (d) {
                    return moment(d).month() === 6 ? moment(d).format('YYYY') : ''; // month starts from 0
                })
                .tickPadding(tickAxisPadding);

            var yLineChartAxis = d3.svg.axis().scale(yScale)
                .ticks(yTickCount)
                .tickSize(tickAxisPadding, 0)
                .orient('left')
                .tickFormat(function (d) {
                    var signFirst = d > 100 ? '+' : '';
                    return (d === 100 ? d : signFirst + (d - 100)) + '%';
                });

            var xGridAxis = d3.svg.axis().scale(xScale)
                .ticks(d3.time.month, 3)
                .tickSize(-(height - margin.bottom), 0)
                .tickPadding(10)
                .tickFormat('');

            var yGridAxis = d3.svg.axis().scale(yScale)
                .ticks(5)
                .orient('left')
                .tickSize(-(width + tickAxisPadding), 0)
                .tickFormat('');

            var svg = d3.select($container.get(0))
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);

            this._drawGridChart(svg, height, margin, xGridAxis, yGridAxis, tickAxisPadding);

            this._drawXAxisBarBackground(svg, width, height, margin, tickAxisPadding);

            var gLineChartContent = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            this._drawLineChart(gLineChartContent, height, margin, xLineChartAxis, yLineChartAxis, tickAxisPadding);

            var lineGenerator = d3.svg.line()
                .x(function (d) {
                    return xScale(d.date);
                })
                .y(function (d) {
                    return yScale(d.value);
                });

            this._drawEmploymentTrendsLine(gLineChartContent, lineGenerator, margin, swissEmployment, industryEmployment);
            this._drawTooltip(svg, margin);
            this._drawEventArea(svg, margin, width, height);
            this._handleActionOnEmploymentTrendsChart($container.find('.event-area'), margin, xScale, yScale, dataMerged);
        },

        _drawGridChart: function (svg, height, margin, xGridAxis, yGridAxis, tickAxisPadding) {
            var gGridChart = svg.append('g')
                .attr('class', 'grid')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            gGridChart.append('g')
                .attr('class', 'x-axis')
                .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
                .call(xGridAxis)
                .call(function (g) {
                    g.select('.domain').remove();
                    g.selectAll('.tick line')
                        .attr('y1', margin.bottom)
                        .filter(function (d, i) {
                            return i % 4 !== 0;
                        })
                        .style({
                          'opacity': 0.15,
                          'stroke-width': 1,
                          'stroke-dasharray': (3, 3)
                        });
                });

            gGridChart.append('g')
                .attr('class', 'y-axis')
                .attr('transform', 'translate(' + -(tickAxisPadding) + ',0)')
                .call(yGridAxis)
                .call(function (g) {
                    g.select('path').remove();
                    g.selectAll('.tick')
                        .filter(function (d) {
                            return d !== 100;
                        })
                        .select('line')
                        .style({'opacity': 0.2, 'stroke-width': 1});
                });
        },

        _drawLineChart: function (gLineChartContent, height, margin, xLineChartAxis, yLineChartAxis, tickAxisPadding) {
            gLineChartContent.append('g')
                .attr('class', 'x-axis')
                .attr('transform', 'translate(0,' + (height - margin.top) + ')')
                .call(xLineChartAxis)
                .select('.domain').remove();

            gLineChartContent.append('g')
                .attr('class', 'y-axis')
                .attr('transform', 'translate(' + -(tickAxisPadding * 2) + ',0)')
                .call(yLineChartAxis);
        },

        _drawEmploymentTrendsLine: function (gLineChartContent, lineGenerator, margin, swissEmployment, industryEmployment) {
            gLineChartContent.append('path')
                .attr('class', 'line-swiss-employment')
                .attr('d', lineGenerator(swissEmployment));

            gLineChartContent.append('path')
                .attr('class', 'line-industry-employment')
                .attr('d', lineGenerator(industryEmployment));
        },

        _drawXAxisBarBackground: function (svg, width, height, margin, tickAxisPadding) {
            var heightOfRect = 15;
            var xTextOfYAxis = svg.select('.grid .y-axis').selectAll('.tick text')
                .filter(function (d, i) {
                    return i === 0
                })
                .attr('x');

            var xOfRect = xTextOfYAxis - tickAxisPadding;
            var yOfRect = svg.select('.grid .x-axis').selectAll('.tick text')
                .filter(function (d, i) {
                    return i === 0
                }).attr('y');

            var widthOfRect = width + margin.left - xOfRect;

            var gRectMask = svg.append('g')
                .attr('transform', 'translate(' + (margin.left / 4) + ',' + height + ')');

            this._drawRectangle(gRectMask,
                {x: xOfRect, y: yOfRect - 8, color: 'white', width: widthOfRect, height: heightOfRect * 2});
            this._drawRectangle(gRectMask,
                {x: xOfRect, y: yOfRect - 1, color: '#F1F1F1', width: widthOfRect, height: heightOfRect})
        },

        _drawRectangle: function ($container, data) {
            $container.append('rect')
                .attr('x', data.x)
                .attr('y', data.y)
                .attr('fill', data.color)
                .attr('width', data.width)
                .attr('height', data.height);
        },

        _getAdjustedEmploymentData: function (data) {
            return _.chain(data)
                .map(function (value, key) {
                    return {
                        date: moment(key).add(3, 'months'), // increase month to end date of current quarter
                        value: value * 100
                    }
                })
                .sortBy(function (o) {
                    return o.date;
                })
                .value();
        },

        _drawScatterplot: function (container, data, xScale, yScale) {
            var circleContainer = container.append('g')
                .attr('transform', 'translate(' + xScale.rangeBand() / 2 + ' ,0)')
                .attr('class', 'circle-container');

            circleContainer.selectAll('dot')
                .data(data)
                .enter().append('circle')
                .attr('r', 2.5)
                .attr('cx', function (d) { return xScale(d.industry_group) })
                .attr('cy', function (d) { return yScale(d.futureDevelopment) })
                .style({
                    'stroke': '#8ABE2C',
                    'stroke-width': '1px',
                    'fill': '#8ABE2C'
                });
        },

        _wrapLongText: function () {
            var element = d3.select(this),
                isWrapped = false,
                textLength = element.node().getComputedTextLength(),
                originText = element.text(),
                text = element.text(),
                padding = 2;

            while (textLength > (element.attr('width') - padding) && text.length > 0) {
                text = text.slice(0, -1);
                element.text(text + '...');
                textLength = element.node().getComputedTextLength();
                isWrapped = true;
            }

            if (isWrapped) {
                element.append('title').text(originText);
            }
        },

        _transformDevelopmentData: function (data) {
            return _.chain(data.trends_gross_value_added)
                .mapObject(function (value, key) {
                    return {
                        industry_group: key,
                        futureDevelopment: data.trends_index_future_development[key] * 100,
                        value: value
                    };
                })
                .sortBy(function (entry) {
                    return entry.value * -1;
                })
                .value();
        },

        _drawTooltip: function (svg, margin) {
            var gTooltipContent = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            // draw hover line
            gTooltipContent.append('line').attr('class', 'hover-line');
            // draw circle swiss employer
            this._drawCircle(gTooltipContent, 'swiss');
            // draw circle industry employer
            this._drawCircle(gTooltipContent, 'industry');
        },

        _drawCircle: function (container, className) {
            container.append('circle')
                .attr('class', 'point ' + className)
                .attr('r', 6.5);
        },

        _drawEventArea: function (svg, margin, width, height) {
            svg.append('rect')
                .attr('class', 'event-area')
                .attr('y', margin.top)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height - margin.top)
                .style({'fill': 'none', 'pointer-events': 'all'});
        },

        _handleActionOnEmploymentTrendsChart: function ($eventArea, margin, xScale, yScale, dataMerged) {
            this._handleMousemove($eventArea, margin, xScale, yScale, dataMerged);
            this._handleMouseleave($eventArea);
        },

        _handleMousemove: function ($eventArea, margin, xScale, yScale, dataMerged) {
            var that = this;
            $eventArea.on('mousemove', function (event) {
                var offsetX = event.offsetX - margin.left,
                    // increase 1 month and 15 days for processing when current position of mouse in between two quarters
                    currentMousePos = moment(xScale.invert(offsetX)).add({days: 15, months: 1}).format('YYYY-MM-01 0:0:0'),
                    currentPosData = _.filter(dataMerged, function (d) {
                        var monthDiff = moment(currentMousePos).diff(d.date, 'months');
                        return Math.floor(monthDiff / 3) === 0; // in the same quarter
                    });

                if (currentPosData.length > 0) {
                    that._showChartTooltip(currentPosData, margin, xScale, yScale);
                } else {
                    that._hideChartTooltip();
                }
            });
        },

        _handleMouseleave: function ($eventArea) {
            var that = this;
            $eventArea.on('mouseleave', function () {
                that._hideChartTooltip();
            });
        },

        _showChartTooltip: function (currentPosData, margin, xScale, yScale) {
            var $toolTipContent = $('.ai-employment-trends .chart-tooltip'),
                dateMoment = moment(currentPosData[0].date).subtract(1, 'days'), // 2010-01-01 => Q4 (2009-10-01 => 2009-12-31)
                textYearQuarter = dateMoment.format('YYYY') + ' Q' + Math.ceil((dateMoment.month() + 1) / 3),
                textSwiss = this._getQuarterInfo(currentPosData[0].value),
                textIndustry = this._getQuarterInfo(currentPosData[1].value),
                maxObj = _.max(currentPosData, 'value');

            // Update content and position of tooltip
            $toolTipContent.find('.text-year-quarter').text(textYearQuarter);
            $toolTipContent.find('.text-swiss div').text(textSwiss);
            $toolTipContent.find('.text-industry div').text(textIndustry);
            $toolTipContent.css({
                opacity: 1,
                top: (yScale(maxObj.value) - (margin.top / 2)) + 'px',
                left: (xScale(maxObj.date) + margin.left) + 'px'
            });

            // customize position hover line
            d3.select('.employment-trends-chart .hover-line')
                .attr('x1', xScale(currentPosData[0].date))
                .attr('y1', yScale(currentPosData[0].value))
                .attr('x2', xScale(currentPosData[1].date))
                .attr('y2', yScale(currentPosData[1].value))
                .style('visibility', 'visible');

            this._updatePositionDisplayCircle('.employment-trends-chart .swiss', xScale(currentPosData[0].date), yScale(currentPosData[0].value));
            this._updatePositionDisplayCircle('.employment-trends-chart .industry', xScale(currentPosData[1].date), yScale(currentPosData[1].value));
            this._swapDisplayQuarterInfo($toolTipContent, currentPosData);
        },

        _updatePositionDisplayCircle: function (container, cx, cy) {
            d3.select(container)
                .attr('cx', cx)
                .attr('cy', cy)
                .style('visibility', 'visible');
        },

        _hideChartTooltip: function () {
            $('.ai-employment-trends .chart-tooltip').css('opacity', 0);
            d3.selectAll('.employment-trends-chart circle').style('visibility', 'hidden');
            d3.select('.employment-trends-chart .hover-line').style('visibility', 'hidden');
        },

        _getQuarterInfo: function (value) {
            value -= 100;
            return (value > 0 ? '+' : '') + $.fn.localisedNumberFormat(parseFloat(value), 2) + '%';
        },

        _swapDisplayQuarterInfo: function ($container, data) {
            if (data[0].value > data[1].value) {
                $container.find('.text-industry').before($container.find('.text-swiss'));
            } else {
                $container.find('.text-swiss').before($container.find('.text-industry'));
            }
        }
    }
});